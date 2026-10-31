
# Layers

Applied examples in astronomy, cosmology, and gravitational-wave analysis.
The two JavaScript layers call the core JavaScript kernel; the Python
cosmology experiment is a standalone script.

## Files


| File                                 | Domain                        | What it does |
| -------------------------------------- | ------------------------------- | -------------- |
| `Focospectralics_ASTRONOMY_v1.js`    | Astronomy / planetary science | Applies radial zero-mode folding to sub-threshold pixels in a 2D image and runs a zero-mode audit on NEO observation streams. |
| `Focospectralics_HUBBLE_FRAME_v1.js` | Gravitational / relativistic  | Audits sub-threshold residuals in gravitational-wave strain series and compares early- and late-time Hubble values. |
| `big_bang_asymptote_experiment.py`   | Cosmology                     | Prints geometric partitions, horizon and closure calculations, and zero-mode derivative and power values over sample cosmic times. |

## Dependencies

The JavaScript layers load the core kernel from `engines/`:

```js
require('../engines/focospectralics_engine')
```

The Python cosmology experiment imports NumPy and does not import the
JavaScript kernel.
