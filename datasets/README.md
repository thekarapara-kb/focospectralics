# Datasets

Dataset specifications and payloads for the framework's empirical layers.
Every dataset is a specification of what the layer reads against — the
actual archives are public and remain governed by their original licenses.

## Files


| File             | Domain                        | Source |
| ------------------ | ------------------------------- | -------- |
| `astronomy.md`   | Astronomy / planetary defense | STScI MAST and NASA JPL Horizons/CNEOS |
| `astronomy.json` | Astronomy / planetary defense | STScI MAST and NASA JPL Horizons/CNEOS |
| `cosmology.md`   | Cosmology                     | Planck CMB baseline and framework parameters |
| `cosmology.json` | Cosmology                     | Numerical cosmology parameters; provenance is not specified in this payload |

## Data sources

The astronomy specification names the Space Telescope Science Institute's
MAST archive and NASA JPL Horizons/CNEOS. Cosmology materials refer to a Planck
CMB baseline; the comparison document also discusses the SH0ES distance
ladder. The gravitational layer names LIGO/Virgo strain data, but this
directory does not contain a dedicated GWOSC dataset payload. No raw archive
data are bundled here. Obtain any third-party data from its provider and follow
the provider's applicable terms and license; those terms are not replaced by
the license for this repository.

The framework does not relicense third-party data.

## License

Documentation and derivations are licensed under Apache 2.0; see
[`../COPYING`](../COPYING).
