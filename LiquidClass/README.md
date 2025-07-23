# Liquid Class Effect

A modern JavaScript library for creating stunning liquid glass style effects with customizable displacement maps. Add beautiful, interactive liquid effects to your web applications with minimal setup.

## Features

- 🎨 Beautiful glass effect with customizable properties
- 🌊 Multiple displacement types (image, turbulence, noise)
- 🖱️ Interactive dragging support
- 🎯 Easy to customize and implement
- 🎭 SVG filter-based effects
- ✨ Inner glow and shadow effects
- 📱 Mobile-friendly

## Installation

- Download `LiquidClass/src/liquidClass.js`

- ```bash 
npm i liquid-class
 ```

## Basic Usage

```javascript
// Include the script in your HTML
<script src="path/to/liquidClass.js"></script>

// Get your element
const element = document.querySelector('.my-glass-element');

// Initialize with default options
const liquidEffect = new LiquidClass(element);

// Or initialize with custom options
const liquidEffect = new LiquidClass(element, {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '28px',
    blur: '2px',
    brightness: 1.1,
    displacementScale: 100,
    draggable: true
});
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| backgroundColor | string | 'rgba(255, 255, 255, 0.2)' | Background color with opacity |
| borderRadius | string | '28px' | Border radius of the glass effect |
| blur | string | '2px' | Blur intensity |
| brightness | number | 1.1 | Brightness level |
| displacementScale | number | 100 | Intensity of the displacement effect |
| draggable | boolean | true | Enable/disable dragging |
| displacementType | string | 'image' | Type of displacement ('image', 'turbulence', 'noise') |
| displacementImage | string | '/assets/LiquidGlassDisplacement.png' | Path to displacement image |
| turbulenceFrequency | number | 0.01 | Frequency for turbulence/noise effect |
| turbulenceOctaves | number | 2 | Number of octaves for turbulence/noise |
| dropShadowOpacity | number | 0.37 | Opacity of the drop shadow |
| dropShadowX | number | -8 | Horizontal offset of the drop shadow |
| dropShadowY | number | -10 | Vertical offset of the drop shadow |
| shadowStrength | number | 1.0 | Overall shadow intensity multiplier |
| shadowLayers | array | See description | Array of shadow layer configurations for multi-layered shadows |

### Shadow Layers Configuration
The `shadowLayers` option accepts an array of objects with the following structure:
```javascript
[
    { x: 1, y: 1, blur: 46, opacity: 1 },      // Top shadow
    { x: 0, y: -3.75, blur: 40, opacity: 1.89 }, // Middle shadow
    { x: 0, y: -1.875, blur: 20, opacity: 1.08 }  // Bottom shadow
]
```
Each layer object has the following properties:
- `x`: Horizontal offset multiplier relative to dropShadowX
- `y`: Vertical offset multiplier relative to dropShadowY
- `blur`: Blur radius in pixels
- `opacity`: Opacity multiplier relative to dropShadowOpacity

## Methods

### updateOptions(newOptions)
Update multiple options at once:
```javascript
liquidEffect.updateOptions({
    backgroundColor: 'rgba(200, 200, 255, 0.3)',
    blur: '3px'
});
```

### setDisplacementScale(scale)
Adjust the displacement effect intensity:
```javascript
liquidEffect.setDisplacementScale(150);
```

### setBackgroundColor(color, opacity)
Change the background color and opacity:
```javascript
liquidEffect.setBackgroundColor('#ffffff', 0.2);
```

### setDisplacementType(type, options)
Change the displacement effect type:
```javascript
liquidEffect.setDisplacementType('turbulence', {
    turbulenceFrequency: 0.02,
    turbulenceOctaves: 3
});
```

### setTurbulenceParameters(frequency, octaves)
Adjust turbulence parameters when using turbulence or noise displacement:
```javascript
liquidEffect.setTurbulenceParameters(0.02, 3);
```

### setDropShadowParameters(x, y, opacity, strength)
Adjust the drop shadow parameters:
```javascript
liquidEffect.setDropShadowParameters(-8, -10, 0.37, 1.0);
```

### setShadowStrength(strength)
Adjust the overall shadow intensity:
```javascript
liquidEffect.setShadowStrength(1.5);
```

## Browser Support and Compatibility

The Liquid Class Effect provides different experiences based on browser capabilities:

### Chrome-based Browsers (Chrome, Edge, Opera)
- Full support for all features including:
  - Advanced glass refraction effects
  - SVG displacement filters
  - Complex shadow effects
  - All displacement types (image, turbulence, noise)

### Firefox and Safari
- Fallback experience with:
  - Basic glass effect
  - Blur and brightness
  - Simplified shadows
  - Basic backdrop filters
  - No displacement effects (due to SVG filter limitations)

The fallback version automatically activates in Firefox and Safari to ensure a consistent and stable experience across all platforms.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). This means that any modifications to the code, as well as any network service that uses this code, must be made available under the same license. See the LICENSE file for details.
