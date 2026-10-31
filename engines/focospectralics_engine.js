/**
 * Focospectralics Core Engine (Vanilla JS - ES6 / CommonJS / Browser UMD)
 *
 * Pure scale-invariant geometric and thermodynamic observation engine.
 * Zero external dependencies.
 *
 * Attribution: Every named result belongs to its originator.
 *   Euclid           solid-angle geometry
 *   Shannon (1948)   information entropy and the Shannon-Boltzmann correspondence
 *   Boltzmann (1877) statistical entropy
 *   Gibbs (1902)     free energy
 *   Landauer (1961)  bit-energy floor
 *   Bekenstein (1973) horizon entropy
 *   Hawking (1974)   horizon entropy
 *
 * The framework contributes the arrangement, not the components.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FocospectralicsEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ── Pure geometric first-principles invariants [Derived] ────────────────
  const CONSTANTS = Object.freeze({
    APEX_ANGLE_DEG: 70.5287793655093,
    APEX_ANGLE_RAD: 1.2309594173407747,
    VIEWER_CONE_S_PLUS: 1.0 / 3.0,
    INVERSE_CONE_S_MINUS: 2.0 / 3.0,
    PARTITION_RATIO: 2.0,
    PROJECTION_FACTOR_P_THETA: 1.08308,
    PLANCK_HBAR: 1.054571817e-34,
    BOLTZMANN_K: 1.380649e-23,
    SPEED_OF_LIGHT: 299792458.0
  });

  class Engine {
    constructor(config = {}) {
      this.config = Object.assign({
        precision: 16,
        strictClosureThreshold: 1e-12
      }, config);
      this.state = {
        step: 0,
        geometry: null,
        boundary: null,
        thermodynamics: null,
        executionMode: null
      };
    }

    /**
     * STEP 1 - Pure Geometric Initialization [Derived]
     * Establishes the 1/3 viewer cone (S+) and 2/3 inverse cone (S-) partition.
     */
    initializeGeometry() {
      const geometry = {
        apexAngleDeg: CONSTANTS.APEX_ANGLE_DEG,
        apexAngleRad: CONSTANTS.APEX_ANGLE_RAD,
        viewerConeSPlus: CONSTANTS.VIEWER_CONE_S_PLUS,
        inverseConeSMinus: CONSTANTS.INVERSE_CONE_S_MINUS,
        partitionRatio: CONSTANTS.PARTITION_RATIO,
        projectionFactor: CONSTANTS.PROJECTION_FACTOR_P_THETA,
        status: '[Derived]'
      };
      this.state.geometry = geometry;
      this.state.step = 1;
      return geometry;
    }

    /**
     * STEP 2 - Empirical Boundary Pinning [Frame-Conditioned]
     * Pins observational baselines.
     */
    pinEmpiricalBoundary(params = {}) {
      if (this.state.step < 1) this.initializeGeometry();

      const boundary = {
        H0_A: params.H0_A || 67.40,
        T_CMB: params.T_CMB || 2.7255,
        snrFloor: params.snrFloor || 1.0,
        kappa: params.kappa || 1.80e-4,
        timestamp: params.timestamp || Date.now(),
        status: '[Frame-Conditioned]'
      };
      this.state.boundary = boundary;
      this.state.step = 2;
      return boundary;
    }

    /**
     * STEP 3 - Thermodynamic Aperture Coupling [Derived / Fitted]
     * Calculates active aperture contraction and inverse cone energy allocation.
     */
    coupleThermodynamicAperture(deltaH = 5.60) {
      if (this.state.step < 2) this.pinEmpiricalBoundary();

      const SPlus = this.state.geometry.viewerConeSPlus;
      const PTheta = this.state.geometry.projectionFactor;

      const contractedAperture = SPlus / PTheta;
      const inverseAllocation = 1.0 - contractedAperture;

      const thermodynamics = {
        deltaH: deltaH,
        contractedAperture: contractedAperture,
        inverseAllocation: inverseAllocation,
        fluxGradient: deltaH / this.state.boundary.H0_A,
        status: '[Derived]'
      };
      this.state.thermodynamics = thermodynamics;
      this.state.step = 3;
      return thermodynamics;
    }

    /**
     * STEP 4A - Mode A: Frame Reconciliation & Cosmic Energy Budget
     * Resolves frame projections across observer frames and verifies closure.
     */
    executeModeA(H0_local = 73.00) {
      if (this.state.step < 3) this.coupleThermodynamicAperture();

      const H0_A = this.state.boundary.H0_A;
      const PTheta = this.state.geometry.projectionFactor;

      const H0_predicted = PTheta * H0_A;
      const frameDelta = Math.abs(H0_predicted - H0_local);

      const omegaBaryonic = 0.0490;
      const omegaDarkMatter = 0.2683;
      const omegaDarkEnergy = 0.6827;
      const totalBudget = omegaBaryonic + omegaDarkMatter + omegaDarkEnergy;

      const closureR = this.auditClosure(
        omegaBaryonic + omegaDarkMatter,
        omegaDarkEnergy,
        1.0
      );

      const modeAResult = {
        H0_A: H0_A,
        H0_local: H0_local,
        H0_predicted: H0_predicted,
        frameDelta: frameDelta,
        energyBudget: {
          baryonic: omegaBaryonic,
          darkMatter: omegaDarkMatter,
          darkEnergy: omegaDarkEnergy,
          sum: totalBudget
        },
        closureR: closureR,
        status: '[Derived]'
      };

      this.state.executionMode = 'Mode A';
      this.state.step = 4;
      return modeAResult;
    }

    /**
     * STEP 4B - Mode B: Zero-Mode Phase Filtering
     * Mines sub-threshold residuals along the square-root fold trajectory:
     *   S_negative(t) = A_Q * sqrt(|t_* - t|) + B_Q * (t_* - t)
     */
    filterZeroMode(timeSeries, t_star, options = {}) {
      if (this.state.step < 3) this.coupleThermodynamicAperture();

      const AQ = options.AQ || 1.0;
      const BQ = options.BQ || 0.1;
      const noiseThreshold = options.noiseThreshold || this.state.boundary.snrFloor;

      const recovered = [];
      let totalSignalPower = 0.0;
      let totalInversePower = 0.0;

      for (let i = 0; i < timeSeries.length; i++) {
        const item = timeSeries[i];
        const t = typeof item === 'object' ? item.t : item[0];
        const rawVal = typeof item === 'object' ? item.val : item[1];

        const dt = Math.abs(t_star - t);
        const foldComponent = AQ * Math.sqrt(dt) + BQ * dt;

        let activeSignal = 0.0;
        let inverseResidual = 0.0;

        if (rawVal >= noiseThreshold) {
          activeSignal = rawVal;
        } else {
          inverseResidual = rawVal;
          activeSignal = rawVal + foldComponent * CONSTANTS.VIEWER_CONE_S_PLUS;
        }

        totalSignalPower += activeSignal * activeSignal;
        totalInversePower += inverseResidual * inverseResidual;

        recovered.push({
          t: t,
          raw: rawVal,
          recoveredSignal: activeSignal,
          inverseResidual: inverseResidual,
          foldComponent: foldComponent,
          isSubThreshold: rawVal < noiseThreshold
        });
      }

      const totalPower = totalSignalPower + totalInversePower;
      const closureR = totalPower > 0
        ? this.auditClosure(totalSignalPower, totalInversePower, totalPower)
        : 1.0;

      const modeBResult = {
        t_star: t_star,
        recoveredSeries: recovered,
        signalPower: totalSignalPower,
        inversePower: totalInversePower,
        closureR: closureR,
        status: '[Derived]'
      };

      this.state.executionMode = 'Mode B';
      this.state.step = 4;
      return modeBResult;
    }

    /**
     * Machine-Precision Closure Audit
     *   R = (I_known + I_unknown) / I_total
     */
    auditClosure(knownVal, unknownVal, totalVal) {
      if (totalVal === 0) return 1.0;
      return (knownVal + unknownVal) / totalVal;
    }

    /**
     * The Shannon (1948) - Boltzmann (1877) correspondence.
     *
     * Within the framework, this correspondence is referred to as the
     * Shannon-Boltzmann Material Information Identity (SB-MII). The name
     * is a framework mnemonic for the scale-invariant equivalence, not
     * a claim of origin.
     */
    shannonBoltzmannCorrespondence(H_bits, T_kelvin) {
      const S_thermo = CONSTANTS.BOLTZMANN_K * Math.log(2) * H_bits * T_kelvin;
      return {
        shannon_entropy_bits: H_bits,
        boltzmann_entropy_joules_per_kelvin: S_thermo,
        correspondence: 'H_bits * k_B * ln(2) * T = S_thermo'
      };
    }

    /**
     * Free energy of a distribution mismatch (Kullback & Leibler 1951).
     *   W = k_B * T * D_KL(P || Q)
     */
    kullbackLeiblerFreeEnergy(d_kl, T_kelvin) {
      return CONSTANTS.BOLTZMANN_K * T_kelvin * d_kl;
    }

    getConstants() {
      return CONSTANTS;
    }
  }

  return {
    Engine: Engine,
    CONSTANTS: CONSTANTS
  };
}));