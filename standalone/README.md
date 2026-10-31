# Standalone engines

Self-contained JavaScript engines for bounded-origin cosmology calculations
and zero-mode image or time-series filtering. Neither module imports the core
kernel.

## Files

| File | What it does |
|---|---|
| `big_bang_asymptote.js` | Evaluates a bounded Kretschmann scalar and a time-dependent Big Bang asymptote using a Planck-time floor. |
| `zero_mode_super_res.js` | Applies a radial fold kernel to sub-threshold 2D pixel values and computes active/vault totals for image or residual-series inputs. |

## Usage

Both files export a constructor through CommonJS. For example, from the
repository root:

```sh
node -e "const Engine = require('./standalone/big_bang_asymptote'); console.log(new Engine().evaluateBigBangAsymptote(1));"
node -e "const Engine = require('./standalone/zero_mode_super_res'); console.log(new Engine().evaluateFoldKernel(10));"
```

## License

AGPLv3; see [`../LICENSE`](../LICENSE).
