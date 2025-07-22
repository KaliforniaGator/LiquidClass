import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1> Liquid Glass CSS</h1>
    <div class="wrapper">
      <p> A modern CSS framework for creating liquid glass effects.</p>
      <div class="card">
        <div class="card-content">
          <p>This is a demonstration of CSS Liquid Glass</p>
        </div>
        <svg style="display:none;">
        <filter id="displacementFilter">
            <feImage id="displacementMap"
                      href="../public/assets/LiquidGlassDisplacement.png"
                      preserveAspectRatio="none" />
    
            <feDisplacementMap in="SourceGraphic"
                            scale="100" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </svg>
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
    </div>
  </div>
`

const card = document.querySelector('.card');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

card.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === card) {
        isDragging = true;
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, card);
    }
}

function dragEnd() {
    isDragging = false;
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

// Control handlers
const bgColorInput = document.querySelector('#bgColor');
const opacityInput = document.querySelector('#opacity');
const dispScaleInput = document.querySelector('#dispScale');

function updateCardStyle() {
    const color = bgColorInput.value;
    const opacity = opacityInput.value;
    const hexOpacity = Math.round(opacity * 2.55).toString(16).padStart(2, '0');
    card.style.backgroundColor = `${color}${hexOpacity}`;
}

function updateDisplacementScale() {
    const scale = dispScaleInput.value;
    const filter = document.querySelector('#displacementFilter feDisplacementMap');
    filter.setAttribute('scale', scale);
}

bgColorInput.addEventListener('input', updateCardStyle);
opacityInput.addEventListener('input', updateCardStyle);
dispScaleInput.addEventListener('input', updateDisplacementScale);

// Initial style application
updateCardStyle();
updateDisplacementScale();
