# Focospectralics

Focospectralics is a mathematical framework for analyzing observational measurements using geometric partitions, information accounting, and conservation checks. This repository contains JavaScript and Python engines, astronomy and gravitational-wave layers, standalone cosmology and image-processing tools, example dataset specifications, and technical documentation.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Docs: Apache 2.0](https://img.shields.io/badge/Docs-Apache--2.0-lightgrey.svg)](https://www.apache.org/licenses/LICENSE-2.0)

## What this is

The framework organizes geometric and information-theoretic calculations around an active 1/3 partition and a complementary 2/3 partition, with engine methods for boundary pinning, frame comparisons, signal filtering, and closure calculations. The repository is for analysts and developers exploring those calculations against observational data; the included layers and examples are implementations, not claims that the example outputs have been independently validated.

## What's here


| Folder                         | Contents                                               |
| -------------------------------- | -------------------------------------------------------- |
| [`engines/`](./engines/)       | Core kernels and the empirical parser bundle           |
| [`layers/`](./layers/)         | Applied domain layers built on the kernel              |
| [`standalone/`](./standalone/) | Self-contained engines that don't depend on the kernel |
| [`datasets/`](./datasets/)     | Dataset specifications and payloads                    |
| [`docs/`](./docs/)             | Monographs and comparative benchmark audits            |

## Quick start

The JavaScript core has no external package dependencies and can be loaded with Node.js:

```sh
node -e "const { Engine } = require('./engines/focospectralics_engine'); const engine = new Engine(); console.log(engine.executeModeA());"
```

The Python math engines use NumPy. With NumPy installed, run the agnostic engine's built-in validation suite from the repository root:

```sh
python engines/agnostic_engine.py
```

## Attribution

Every named result belongs to its originator. The framework contributes the
arrangement, not the components. The source headers name Euclid, Shannon,
Boltzmann, Gibbs, Kullback, Leibler, Fisher, Rao, Amari, Chentsov, Landauer,
Bekenstein, and Hawking; full details are in [`engines/README.md`](./engines/README.md).


## Licensing

- **Code:** AGPLv3 — see [`LICENSE-AGPL`](./LICENSE-AGPL)
- **Documentation and derivations:** Apache 2.0 — see [`LICENSE-APACHE`](./LICENSE-APACHE)
- **Consultancy layers:** not included in this repository

## Links

- **Website:** https://tropologic.online
- **Knowledge Base:** https://thekarapara.com
- **Companion site:** https://halfherent.online
