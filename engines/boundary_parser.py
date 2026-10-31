"""
STRUCTURAL BOUNDARY PARSER & TOKEN CONSERVATION ENGINE (boundary_parser.py)
=============================================================================
A domain-agnostic, purely empirical text parsing and tokenization module.

PURPOSE:
--------
Standard subword tokenizers (e.g., BPE, WordPiece, Unigram) frequently mangle or 
split custom delimiter tags, structural operators, and boundary markers.

This module provides a deterministic, regex-driven pre-tokenization isolator that:
  1. Detects and isolates configured structural boundary tags ([...], //...//, (...)).
  2. Protects enclosed content as non-splittable atomic tokens.
  3. Verifies empirical token conservation (0% character loss / exact reconstruction).

MODULE STRUCTURE:
-----------------
  - BoundaryRule: Configuration for custom delimiter pairs and tags.
  - StructuralBoundaryParser: Core parsing and token protection pipeline.
  - EmpiricalConservationTester: Automated verification suite for text integrity.
"""

import re
from typing import List, Dict, Tuple, Any, Optional

class BoundaryRule:
    """Defines a structural boundary pattern using regex delimiters."""
    def __init__(self, name: str, open_delim: str, close_delim: str, pattern: Optional[str] = None):
        self.name = name
        self.open_delim = open_delim
        self.close_delim = close_delim
        
        # Escaping delimiters for safe regex compilation
        escaped_open = re.escape(open_delim)
        escaped_close = re.escape(close_delim)
        
        if pattern:
            self.pattern = pattern
        else:
            # Matches open_delim + non-greedy inner text + close_delim
            self.pattern = f"{escaped_open}.*?{escaped_close}"
        
        self.compiled_regex = re.compile(self.pattern, re.DOTALL)

    def find_matches(self, text: str) -> List[Tuple[int, int, str]]:
        """Returns list of (start_index, end_index, matched_string)."""
        return [(m.start(), m.end(), m.group()) for m in self.compiled_regex.finditer(text)]


class StructuralBoundaryParser:
    """
    Empirical pre-tokenization engine that isolates structural boundary markers
    and protects enfolded tokens from downstream subword fragmentation.
    """
    DEFAULT_RULES = [
        BoundaryRule("bracket_boundary", "[", "]"),
        BoundaryRule("slash_boundary", "//", "//"),
        BoundaryRule("paren_boundary", "(", ")"),
        BoundaryRule("angle_boundary", "<", ">")
    ]

    def __init__(self, rules: Optional[List[BoundaryRule]] = None):
        self.rules = rules if rules is not None else self.DEFAULT_RULES
        # Master regex combining all boundary patterns
        combined_pattern = "|".join([r.pattern for r in self.rules])
        self.master_regex = re.compile(f"({combined_pattern})", re.DOTALL)

    def parse_to_tokens(self, text: str) -> List[Dict[str, Any]]:
        """
        Parses text into a sequence of token dictionaries.
        Each token is tagged as either 'boundary' (atomic) or 'text' (standard).
        """
        tokens = []
        last_idx = 0
        
        for match in self.master_regex.finditer(text):
            start, end = match.span()
            matched_str = match.group()
            
            # Non-boundary text preceding the match
            if start > last_idx:
                raw_segment = text[last_idx:start]
                tokens.append({
                    "type": "text",
                    "content": raw_segment,
                    "atomic": False
                })
            
            # Identify which rule matched
            rule_name = "unknown_boundary"
            for rule in self.rules:
                if rule.compiled_regex.fullmatch(matched_str):
                    rule_name = rule.name
                    break
            
            # Boundary token (atomic)
            tokens.append({
                "type": "boundary",
                "rule": rule_name,
                "content": matched_str,
                "atomic": True
            })
            
            last_idx = end
            
        # Trailing text segment
        if last_idx < len(text):
            tokens.append({
                "type": "text",
                "content": text[last_idx:],
                "atomic": False
            })
            
        return tokens

    def serialize_atomic_tokens(self, tokens: List[Dict[str, Any]], placeholder_prefix: str = "__ATOMIC_") -> Tuple[str, Dict[str, str]]:
        """
        Replaces atomic boundary tokens with safe placeholder markers 
        for downstream text processing.
        """
        mask_map = {}
        masked_text_parts = []
        
        atomic_count = 0
        for token in tokens:
            if token["atomic"]:
                placeholder = f"{placeholder_prefix}{atomic_count}__"
                mask_map[placeholder] = token["content"]
                masked_text_parts.append(placeholder)
                atomic_count += 1
            else:
                masked_text_parts.append(token["content"])
                
        return "".join(masked_text_parts), mask_map

    def deserialize_atomic_tokens(self, masked_text: str, mask_map: Dict[str, str]) -> str:
        """Restores original atomic boundary tokens from placeholder map."""
        reconstructed = masked_text
        for placeholder, original_content in mask_map.items():
            reconstructed = reconstructed.replace(placeholder, original_content)
        return reconstructed

    def verify_conservation(self, original_text: str) -> Dict[str, Any]:
        """
        Performs an empirical audit testing 100% character conservation 
        and structural boundary preservation.
        """
        tokens = self.parse_to_tokens(original_text)
        masked_text, mask_map = self.serialize_atomic_tokens(tokens)
        reconstructed = self.deserialize_atomic_tokens(masked_text, mask_map)
        
        char_count_orig = len(original_text)
        char_count_recon = len(reconstructed)
        boundary_count = sum(1 for t in tokens if t["atomic"])
        
        is_conserved = (original_text == reconstructed)
        
        return {
            "is_conserved": is_conserved,
            "original_char_count": char_count_orig,
            "reconstructed_char_count": char_count_recon,
            "boundary_tokens_found": boundary_count,
            "total_token_segments": len(tokens),
            "conservation_error_rate": 0.0 if is_conserved else abs(char_count_orig - char_count_recon) / char_count_orig
        }


def run_test_suite():
    print("==================================================================")
    print("RUNNING STRUCTURAL BOUNDARY PARSER EMPIRICAL TEST SUITE")
    print("==================================================================")
    
    parser = StructuralBoundaryParser()
    
    test_samples = [
        "Standard sentence with [isolated_boundary_tag] and //secondary_operator// inside.",
        "Nested context (control group) with <data_node_12> and [tag_alpha].",
        "Multiple boundary markers: [A] text [B] text //C// end."
    ]
    
    all_passed = True
    for idx, sample in enumerate(test_samples, 1):
        print(f"\n[Test {idx}] Parsing Input Sample...")
        print(f"  Input: '{sample}'")
        
        audit = parser.verify_conservation(sample)
        tokens = parser.parse_to_tokens(sample)
        
        print(f"  - Total Segments Identified: {audit['total_token_segments']}")
        print(f"  - Atomic Boundaries Isolated: {audit['boundary_tokens_found']}")
        print(f"  - Character Conservation: {audit['original_char_count']} -> {audit['reconstructed_char_count']} chars")
        print(f"  - Perfect Match (Conservation = 1.0): {audit['is_conserved']}")
        
        if not audit["is_conserved"]:
            all_passed = False
            print("  ❌ TEST FAILED: Character loss or mismatch detected.")
        else:
            print("  ✓ TEST PASSED: 100% Exact Conservation Verified.")

    print("\n==================================================================")
    if all_passed:
        print("ALL STRUCTURAL PARSER CONSERVATION TESTS PASSED SUCCESSFULLY.")
    print("==================================================================")

if __name__ == "__main__":
    run_test_suite()
