# Liquid Class Effect

A modern JavaScript library for creating stunning liquid glass style effects with customizable displacement maps. Add beautiful, interactive liquid effects to your web applications with minimal setup.

![Liquid Class Effect Demo](LiquidGlassGradient.png)

## Features

- 🎨 Beautiful glass effect with customizable properties
- 🌊 Multiple displacement types (image, turbulence, noise)
- 🖱️ Interactive dragging support
- 🎯 Easy to customize and implement
- 🎭 SVG filter-based effects
- ✨ Inner glow and shadow effects
- 📱 Mobile-friendly

## Installation

```bash
npm install liquid-class-effect
```

## Basic Usage

```javascript
import { LiquidClass } from 'LiquidClass';

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

This project is licensed under the MIT License - see the LICENSE file for details.
