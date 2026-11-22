/**
 * Formal Scientific Canvas: Multifractal Measure & Singularity Spectrum
 * Mathematical style inspired by academic research papers & GNUPlot/Matplotlib
 * Colors: Classical Academic Navy (#0f2b5c) and AMARUN Bordeaux (#991b1b)
 */

class MultifractalVisualizer {
  constructor() {
    this.densityCanvas = document.getElementById('densityCanvas');
    this.spectrumCanvas = document.getElementById('spectrumCanvas');
    
    if (!this.densityCanvas || !this.spectrumCanvas) return;
    
    this.dCtx = this.densityCanvas.getContext('2d');
    this.sCtx = this.spectrumCanvas.getContext('2d');
    
    this.sliderP = document.getElementById('paramP');
    this.sliderDepth = document.getElementById('paramDepth');
    this.valP = document.getElementById('valP');
    this.valDepth = document.getElementById('valDepth');
    
    this.alphaMinEl = document.getElementById('statAlphaMin');
    this.alphaMaxEl = document.getElementById('statAlphaMax');
    this.dimSupportEl = document.getElementById('statDimSupport');
    
    this.p = parseFloat(this.sliderP ? this.sliderP.value : 0.7);
    this.depth = parseInt(this.sliderDepth ? this.sliderDepth.value : 6);
    
    this.init();
  }

  init() {
    this.resizeCanvases();
    window.addEventListener('resize', () => {
      this.resizeCanvases();
      this.render();
    });

    if (this.sliderP) {
      this.sliderP.addEventListener('input', (e) => {
        this.p = parseFloat(e.target.value);
        if (this.valP) this.valP.textContent = this.p.toFixed(2);
        this.render();
      });
    }

    if (this.sliderDepth) {
      this.sliderDepth.addEventListener('input', (e) => {
        this.depth = parseInt(e.target.value);
        if (this.valDepth) this.valDepth.textContent = this.depth;
        this.render();
      });
    }

    this.render();
  }

  resizeCanvases() {
    const dRect = this.densityCanvas.parentElement.getBoundingClientRect();
    const sRect = this.spectrumCanvas.parentElement.getBoundingClientRect();
    
    const dWidth = Math.max(dRect.width - 24, 280);
    const sWidth = Math.max(sRect.width - 24, 280);
    const height = 210;

    const dpr = window.devicePixelRatio || 1;

    this.densityCanvas.width = dWidth * dpr;
    this.densityCanvas.height = height * dpr;
    this.densityCanvas.style.width = `${dWidth}px`;
    this.densityCanvas.style.height = `${height}px`;
    this.dCtx.resetTransform();
    this.dCtx.scale(dpr, dpr);

    this.spectrumCanvas.width = sWidth * dpr;
    this.spectrumCanvas.height = height * dpr;
    this.spectrumCanvas.style.width = `${sWidth}px`;
    this.spectrumCanvas.style.height = `${height}px`;
    this.sCtx.resetTransform();
    this.sCtx.scale(dpr, dpr);
  }

  isDarkMode() {
    return document.documentElement.classList.contains('dark');
  }

  render() {
    const isDark = this.isDarkMode();
    const colors = {
      bg: isDark ? '#111c38' : '#ffffff',
      grid: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
      axis: isDark ? '#94a3b8' : '#334155',
      text: isDark ? '#cbd5e1' : '#475569',
      navyBar: isDark ? '#60a5fa' : '#0f2b5c',
      crimsonCurve: isDark ? '#f87171' : '#991b1b',
      peakDot: isDark ? '#fbbf24' : '#b45309'
    };

    this.drawDensity(colors);
    this.drawSpectrum(colors);
    this.updateStats();
  }

  getBinomialMeasures(k, p) {
    const n = Math.pow(2, k);
    const weights = new Float64Array(n);
    weights[0] = 1.0;

    for (let step = 0; step < k; step++) {
      const len = Math.pow(2, step);
      for (let i = len - 1; i >= 0; i--) {
        const current = weights[i];
        weights[2 * i] = current * p;
        weights[2 * i + 1] = current * (1 - p);
      }
    }
    for (let i = 0; i < n; i++) {
      weights[i] *= n;
    }
    return weights;
  }

  drawDensity(colors) {
    const ctx = this.dCtx;
    const w = parseFloat(this.densityCanvas.style.width);
    const h = parseFloat(this.densityCanvas.style.height);
    const pad = { top: 20, right: 20, bottom: 30, left: 45 };

    ctx.clearRect(0, 0, w, h);

    const weights = this.getBinomialMeasures(this.depth, this.p);
    const n = weights.length;
    let maxWeight = 0;
    for (let i = 0; i < n; i++) {
      if (weights[i] > maxWeight) maxWeight = weights[i];
    }
    if (maxWeight === 0) maxWeight = 1;

    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    // Grid & Axis
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    ctx.font = '10px monospace';
    ctx.fillStyle = colors.text;

    // Y Ticks
    for (let i = 0; i <= 4; i++) {
      const yVal = (maxWeight * (4 - i)) / 4;
      const py = pad.top + (plotH * i) / 4;
      ctx.beginPath();
      ctx.moveTo(pad.left, py);
      ctx.lineTo(w - pad.right, py);
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.fillText(yVal.toFixed(1), pad.left - 6, py + 3);
    }

    // X Ticks
    const xTicks = [0, 0.25, 0.5, 0.75, 1.0];
    xTicks.forEach(tick => {
      const px = pad.left + tick * plotW;
      ctx.beginPath();
      ctx.moveTo(px, pad.top);
      ctx.lineTo(px, pad.top + plotH);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillText(tick.toString(), px, h - pad.bottom + 14);
    });

    // Draw Histogram Bars in Formal Academic Navy
    const barW = Math.max(plotW / n, 0.8);
    ctx.fillStyle = colors.navyBar;

    for (let i = 0; i < n; i++) {
      const barH = (weights[i] / maxWeight) * plotH;
      const x = pad.left + (i * plotW) / n;
      const y = pad.top + plotH - barH;
      ctx.fillRect(x, y, barW, barH);
    }

    // Bounding Box
    ctx.strokeStyle = colors.axis;
    ctx.lineWidth = 1;
    ctx.strokeRect(pad.left, pad.top, plotW, plotH);
  }

  drawSpectrum(colors) {
    const ctx = this.sCtx;
    const w = parseFloat(this.spectrumCanvas.style.width);
    const h = parseFloat(this.spectrumCanvas.style.height);
    const pad = { top: 20, right: 25, bottom: 30, left: 45 };

    ctx.clearRect(0, 0, w, h);

    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    const p = this.p;
    const q = 1 - p;

    const pMax = Math.max(p, q);
    const pMin = Math.min(p, q);
    
    const aMin = -Math.log2(pMax);
    const aMax = -Math.log2(pMin);
    
    const xMin = Math.max(0, aMin - 0.2);
    const xMax = Math.max(1.6, aMax + 0.3);

    // Grid lines & labels
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    ctx.font = '10px monospace';
    ctx.fillStyle = colors.text;

    // Y Ticks (0 to 1.0)
    for (let i = 0; i <= 4; i++) {
      const val = (1.0 * (4 - i)) / 4;
      const py = pad.top + (plotH * (1.0 - val));
      ctx.beginPath();
      ctx.moveTo(pad.left, py);
      ctx.lineTo(w - pad.right, py);
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.fillText(val.toFixed(2), pad.left - 6, py + 3);
    }

    // X Ticks
    for (let i = 0; i <= 4; i++) {
      const val = xMin + (i * (xMax - xMin)) / 4;
      const px = pad.left + (i * plotW) / 4;
      ctx.beginPath();
      ctx.moveTo(px, pad.top);
      ctx.lineTo(px, pad.top + plotH);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillText(val.toFixed(2), px, h - pad.bottom + 14);
    }

    // Generate Points for f(alpha)
    const points = [];
    const steps = 100;

    if (Math.abs(p - 0.5) < 0.005) {
      points.push({ a: 1.0, f: 1.0 });
    } else {
      for (let s = 1; s < steps; s++) {
        const beta = s / steps;
        const alpha = -beta * Math.log2(p) - (1 - beta) * Math.log2(q);
        const f = -beta * Math.log2(beta) - (1 - beta) * Math.log2(1 - beta);
        points.push({ a: alpha, f: Math.max(0, f) });
      }
    }

    // Draw Spectrum Curve in AMARUN Bordeaux / Crimson
    if (points.length > 1) {
      ctx.beginPath();
      const firstX = pad.left + ((points[0].a - xMin) / (xMax - xMin)) * plotW;
      const firstY = pad.top + (1 - points[0].f) * plotH;
      ctx.moveTo(firstX, firstY);

      for (let i = 1; i < points.length; i++) {
        const px = pad.left + ((points[i].a - xMin) / (xMax - xMin)) * plotW;
        const py = pad.top + (1 - points[i].f) * plotH;
        ctx.lineTo(px, py);
      }

      ctx.strokeStyle = colors.crimsonCurve;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Soft scholarly fill under the curve
      const lastX = pad.left + ((points[points.length - 1].a - xMin) / (xMax - xMin)) * plotW;
      ctx.lineTo(lastX, pad.top + plotH);
      ctx.lineTo(firstX, pad.top + plotH);
      ctx.closePath();
      ctx.fillStyle = this.isDarkMode() ? 'rgba(248, 113, 113, 0.12)' : 'rgba(153, 27, 27, 0.08)';
      ctx.fill();

      // Peak Indicator
      const aPeak = 0.5 * (aMin + aMax);
      const pxPeak = pad.left + ((aPeak - xMin) / (xMax - xMin)) * plotW;
      ctx.beginPath();
      ctx.arc(pxPeak, pad.top, 4, 0, 2 * Math.PI);
      ctx.fillStyle = colors.peakDot;
      ctx.fill();
    } else if (points.length === 1) {
      const px = pad.left + ((1.0 - xMin) / (xMax - xMin)) * plotW;
      ctx.beginPath();
      ctx.arc(px, pad.top, 5, 0, 2 * Math.PI);
      ctx.fillStyle = colors.crimsonCurve;
      ctx.fill();
    }

    // Bounding Box
    ctx.strokeStyle = colors.axis;
    ctx.lineWidth = 1;
    ctx.strokeRect(pad.left, pad.top, plotW, plotH);
  }

  updateStats() {
    const p = this.p;
    const q = 1 - p;
    const aMin = -Math.log2(Math.max(p, q));
    const aMax = -Math.log2(Math.min(p, q));

    if (this.alphaMinEl) this.alphaMinEl.textContent = aMin.toFixed(3);
    if (this.alphaMaxEl) this.alphaMaxEl.textContent = aMax.toFixed(3);
    if (this.dimSupportEl) this.dimSupportEl.textContent = "1.000";
  }
}

window.MultifractalVisualizer = MultifractalVisualizer;

