# Engines

The core computational kernels of the Focospectralics framework. The JavaScript
engine has no external dependencies; the Python math engines use NumPy, while
the structural boundary parser uses only the Python standard library.

## Files

| File                          | Language   | Role |
| ------------------------------- | ------------ | ------ |
| `focospectralics_engine.js`   | JavaScript | Geometry and thermodynamic engine with frame reconciliation, zero-mode filtering, and closure calculations. |
| `agnostic_engine.py`          | Python     | Core invariants, epistemic partitioning, phase-vector dynamics, thermodynamic relations, information geometry, and a validation suite. |
| `boundary_parser.py`          | Python     | Regex-based structural boundary tokenization and character-conservation checks. |
| `scale_invariant_geometry.py` | Python     | Conic state-vector projection, closure checks, and a connection-matrix pruning layer. |
| `empirical-parser.json`       | JSON       | Parser configuration metrics, including delimiters, conservation rate, and closure. |

## Running

From the repository root, load the JavaScript engine in Node.js:

```sh
node -e "const { Engine } = require('./engines/focospectralics_engine'); const engine = new Engine(); console.log(engine.executeModeA());"
```

The Python math engines require NumPy. Run the agnostic engine's self-tests with:

```sh
python engines/agnostic_engine.py
```

The boundary parser and scale-invariant geometry modules also include runnable
test suites in their source files.

## Attribution

The core source headers name the following originators and results:

- Euclid — solid-angle geometry.
- Shannon (1948) — information entropy and its correspondence with statistical entropy.
- Boltzmann (1877) — statistical entropy.
- Gibbs (1902) — free energy.
- Kullback and Leibler (1951) — divergence.
- Fisher (1925) and Rao (1945) — information metrics.
- Amari (1985) and Chentsov (1972) — information geometry and invariant structure of statistical manifolds.
- Landauer (1961) — bit-energy floor.
- Bekenstein (1973) and Hawking (1974) — horizon entropy.

The Python engine also mentions von Neumann entropy and Lyapunov-Schmidt
reduction in its technical discussion. The framework contributes the
arrangement, not the components.


## License

Code is licensed under AGPLv3; see [`../LICENSE`](../LICENSE).
