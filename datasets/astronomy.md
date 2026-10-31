
# Astronomy — Empirical datasets

**Layer:** [Near-Earth Object trajectory recovery](../monographs/astronomy.html)
**Asymptote:** Optical survey sub-threshold residuals (SNR < 1.0)
**Closure:** `R = 1.000000`

Demo payload: [astronomy.json](astronomy.json)

---

## Primary source A — Space Telescope archives

- **Provider:** STScI Mikulski Archive for Space Telescopes (MAST)
- **Local benchmark file:** `STScI-01EVVCFQQJEH75APX7EQSDAGD9.jpg`
- **Target:** Proxima Centauri (HST WFC3/UVIS exposure, 2000 × 1539)
- **Format:** Raw 2D FITS CCD frames · high-resolution TIFF

### Parameters

Flux counts, exposure duration, gain, zero-point magnitude, diffraction
spike geometry.

---

## Primary source B — Close-approach ephemerides

- **Provider:** NASA JPL Horizons · CNEOS
- **Format:** REST JSON
- **Target:** Near-Earth Object 2019 OK

### Parameters

Orbital state vectors, absolute magnitude `H`, optical flux uncertainty,
sub-noise survey residuals (`SNR < 1.0`).

---

## Related

- [Engine hub](../engine.html)
- [Layer monograph](../monographs/astronomy.html)
- [Math master](../schemas/math.master.json)
- [Empiricism master](../schemas/empiricism.master.json)
- [Dataset register](index.md)
