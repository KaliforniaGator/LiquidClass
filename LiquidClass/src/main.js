import './style.css'
import { LiquidClass } from './liquidClass.js'

document.querySelector('#app-content').innerHTML = `
  <div>
    <h1>Liquid Class</h1>
    <div class="wrapper">
      <p>A modern JS framework for creating liquid glass effects.</p>
      <div class="card">
        <div class="card-content">
          <h3>Liquid Glass Effect</h3>
          <p>This is a demonstration of CSS Liquid Glass</p>
        </div>
      </div>
      <!-- New demo containers -->
      <div class="demo-container">
        <div id="demo1" class="demo-card">
          <h3>Demo 1</h3>
          <img src="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/4a2f1b4c5001a04f4cd2e54f7116d16c_low_res_Finder_Beta_2__Liquid_Glass_.png" alt="Demo 1 Image" class="icon">
        </div>
        <div id="demo2" class="demo-card">
          <h3>Demo 2</h3>
          <p>Draggable: true</p>
        </div>
      </div>
    </div>
  </div>
`
document.querySelector('#controls').innerHTML = `
  <div class="wrapper">
    <div class="control-group">
      <label>Background Color: 
        <input type="color" id="bgColor" value="#ffffff">
      </label>
      <label>Opacity: 
        <input type="range" id="opacity" min="0" max="100" value="10">
      </label>
      <label>Displacement Scale: 
        <input type="range" id="dispScale" min="0" max="500" value="100">
      </label>
      <label>Displacement Type:
        <select id="dispType">
          <option value="image">Image</option>
          <option value="turbulence">Turbulence</option>
        </select>
      </label>
      <label>Turbulence Frequency:
        <input type="range" id="turbFreq" min="0.001" max="0.05" step="0.001" value="0.01">
      </label>
      <label>Turbulence Octaves:
        <input type="range" id="turbOct" min="1" max="5" step="1" value="2">
      </label>
    </div>
  </div>
`

const card = new LiquidClass(document.querySelector('.card'), {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    blur: '3px',
    brightness: 1.2,
    displacementScale: 80,
    draggable: true
});

// Initialize liquid glass instances
const demo1 = new LiquidClass(document.querySelector('#demo1'), {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    blur: '8px',
    brightness: 1.2,
    displacementScale: 80,
    draggable: false
});

const demo2 = new LiquidClass(document.querySelector('#demo2'), {
    backgroundColor: 'rgba(100, 108, 255, 0.1)',
    borderRadius: '12px',
    blur: '2px',
    brightness: 1.3,
    displacementScale: 120,
    dropShadowOpacity: 0.5
});

// Control handlers
const bgColorInput = document.querySelector('#bgColor');
const opacityInput = document.querySelector('#opacity');
const dispScaleInput = document.querySelector('#dispScale');
const dispTypeSelect = document.querySelector('#dispType');
const turbFreqInput = document.querySelector('#turbFreq');
const turbOctInput = document.querySelector('#turbOct');

function updateCardStyle() {
    const color = bgColorInput.value;
    const opacity = opacityInput.value / 100;
    demo1.setBackgroundColor(color, opacity);
    demo2.setBackgroundColor(color, opacity);
}

function updateDisplacementScale() {
    const scale = dispScaleInput.value;
    demo1.setDisplacementScale(scale);
    demo2.setDisplacementScale(scale);
}

function updateDisplacementType() {
    const type = dispTypeSelect.value;
    demo1.setDisplacementType(type, {
        turbulenceFrequency: parseFloat(turbFreqInput.value),
        turbulenceOctaves: parseInt(turbOctInput.value)
    });
    demo2.setDisplacementType(type, {
        turbulenceFrequency: parseFloat(turbFreqInput.value),
        turbulenceOctaves: parseInt(turbOctInput.value)
    });
}

function updateTurbulence() {
    if (['turbulence', 'noise'].includes(dispTypeSelect.value)) {
        const frequency = parseFloat(turbFreqInput.value);
        const octaves = parseInt(turbOctInput.value);
        demo1.setTurbulenceParameters(frequency, octaves);
        demo2.setTurbulenceParameters(frequency, octaves);
    }
}

bgColorInput.addEventListener('input', updateCardStyle);
opacityInput.addEventListener('input', updateCardStyle);
dispScaleInput.addEventListener('input', updateDisplacementScale);
dispTypeSelect.addEventListener('change', updateDisplacementType);
turbFreqInput.addEventListener('input', updateTurbulence);
turbOctInput.addEventListener('input', updateTurbulence);

// Initial style application
updateCardStyle();
updateDisplacementScale();
