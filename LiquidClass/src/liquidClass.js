export class LiquidClass {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            backgroundColor: options.backgroundColor || 'rgba(255, 255, 255, 0.2)',
            borderRadius: options.borderRadius || '28px',
            blur: options.blur || '2px',
            brightness: options.brightness || 1.1,
            displacementScale: options.displacementScale || 100,
            draggable: options.draggable !== undefined ? options.draggable : true,
            // New displacement options
            displacementType: options.displacementType || 'image', // 'image', 'turbulence', or 'noise'
            displacementImage: options.displacementImage || '/assets/LiquidClassDisplacement.png',
            turbulenceFrequency: options.turbulenceFrequency || 0.01,
            turbulenceOctaves: options.turbulenceOctaves || 2
        };
        
        this.browser = this._detectBrowser();
        
        this.xOffset = 0;
        this.yOffset = 0;
        this.isDragging = false;
        
        this.init();
    }

    init() {
        // Add necessary styles
        this.element.style.position = 'relative';
        this.element.style.overflow = 'hidden';
        this.element.style.borderRadius = this.options.borderRadius;
        this.element.style.backgroundColor = this.options.backgroundColor;
        
        if (this.browser.supportsAdvancedEffects) {
            // Chrome and other supported browsers get the full effect
            this.element.style.filter = `
                drop-shadow(-8px -10px 46px #0000005f)
                drop-shadow(0 30px 40px rgba(0,0,0,0.7))
                drop-shadow(0 15px 20px rgba(0,0,0,0.4))
            `;
            this.element.style.backdropFilter = `
                brightness(${this.options.brightness})
                blur(${this.options.blur})
                url(#displacementFilter)
            `;
            this.element.style.boxShadow = '0 10px 25px -10px rgba(0,0,0,0.5)';
        } else {
            // Firefox and Safari fallback
            this.element.style.backdropFilter = `
                brightness(${this.options.brightness})
                blur(${this.options.blur})
            `;
            this.element.style.boxShadow = `
                0 8px 15px -8px rgba(0,0,0,0.3),
                -4px -6px 20px rgba(0,0,0,0.2),
                0 15px 20px rgba(0,0,0,0.25),
                0 8px 10px rgba(0,0,0,0.2)
            `;
            // Add a subtle gradient overlay for depth
            this.element.style.background = `
                linear-gradient(
                    145deg,
                    ${this._adjustOpacity(this.options.backgroundColor, 1.2)},
                    ${this._adjustOpacity(this.options.backgroundColor, 0.8)}
                )
            `;
        }
        
        // Add inner glow effect
        const before = document.createElement('div');
        before.style.content = '';
        before.style.position = 'absolute';
        before.style.inset = '0';
        before.style.zIndex = '0';
        before.style.overflow = 'hidden';
        before.style.borderRadius = this.options.borderRadius;
        before.style.boxShadow = `
            inset 4px 6px 0px -6px rgba(255, 255, 255, 0.7),
            inset 0 0 8px 1px rgba(255, 255, 255, 0.7)
        `;
        this.element.insertBefore(before, this.element.firstChild);

        // Add SVG filter if it doesn't exist or needs updating
        const existingFilter = document.querySelector('#displacementFilter');
        if (existingFilter) {
            existingFilter.remove();
        }

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.display = 'none';
        svg.innerHTML = this._createFilterMarkup();
        document.body.appendChild(svg);

        if (this.options.draggable) {
            this.setupDragging();
        }
    }

    setupDragging() {
        this.element.style.cursor = 'grab';
        this.element.style.userSelect = 'none';
        this.element.style.touchAction = 'none';

        const dragStart = (e) => {
            this.isDragging = true;
            this.element.style.cursor = 'grabbing';
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        };

        const drag = (e) => {
            if (this.isDragging) {
                e.preventDefault();
                const currentX = e.clientX - this.initialX;
                const currentY = e.clientY - this.initialY;
                this.xOffset = currentX;
                this.yOffset = currentY;
                this.setTranslate(currentX, currentY);
            }
        };

        const dragEnd = () => {
            this.isDragging = false;
            this.element.style.cursor = 'grab';
        };

        this.element.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
    }

    setTranslate(xPos, yPos) {
        this.element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    updateOptions(newOptions) {
        Object.assign(this.options, newOptions);
        this.init();
    }

    setDisplacementScale(scale) {
        this.options.displacementScale = scale;
        
        if (this.browser.supportsAdvancedEffects) {
            const filter = document.querySelector('#displacementFilter feDisplacementMap');
            if (filter) {
                filter.setAttribute('scale', scale);
            }
        }
    }

    setBackgroundColor(color, opacity = 1) {
        const rgba = this._hexToRGBA(color, opacity);
        this.element.style.backgroundColor = rgba;
    }

    _hexToRGBA(hex, opacity) {
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    _createFilterMarkup() {
        const { displacementType, displacementScale } = this.options;
        
        let displacementSource = '';
        if (displacementType === 'image') {
            displacementSource = `
                <feImage id="displacementMap"
                        href="${this.options.displacementImage}"
                        preserveAspectRatio="none" />`;
        } else if (displacementType === 'turbulence') {
            displacementSource = `
                <feTurbulence id="displacementMap"
                        type="turbulence"
                        baseFrequency="${this.options.turbulenceFrequency}"
                        numOctaves="${this.options.turbulenceOctaves}"
                        result="turbulence" />`;
        } else if (displacementType === 'noise') {
            displacementSource = `
                <feTurbulence id="displacementMap"
                        baseFrequency="${this.options.turbulenceFrequency}"
                        numOctaves="${this.options.turbulenceOctaves}" />`;
        }

        return `
            <filter id="displacementFilter">
                ${displacementSource}
                <feDisplacementMap in="SourceGraphic"
                                scale="${displacementScale}"
                                xChannelSelector="R"
                                yChannelSelector="G" />
            </filter>
        `;
    }

    setDisplacementType(type, options = {}) {
        if (!['image', 'turbulence', 'noise'].includes(type)) {
            console.error('Invalid displacement type. Use "image", "turbulence", or "noise"');
            return;
        }

        this.options.displacementType = type;
        
        if (options.displacementImage) {
            this.options.displacementImage = options.displacementImage;
        }
        if (options.turbulenceFrequency) {
            this.options.turbulenceFrequency = options.turbulenceFrequency;
        }
        if (options.turbulenceOctaves) {
            this.options.turbulenceOctaves = options.turbulenceOctaves;
        }

        if (this.browser.supportsAdvancedEffects) {
            // Recreate the filter with new settings
            const svg = document.querySelector('svg');
            if (svg) {
                svg.innerHTML = this._createFilterMarkup();
            }
        }
    }

    setTurbulenceParameters(frequency, octaves) {
        if (this.options.displacementType !== 'turbulence' && this.options.displacementType !== 'noise') {
            console.error('Turbulence parameters can only be set when using turbulence or noise displacement type');
            return;
        }

        this.options.turbulenceFrequency = frequency;
        this.options.turbulenceOctaves = octaves;

        if (this.browser.supportsAdvancedEffects) {
            // Update the filter
            const svg = document.querySelector('svg');
            if (svg) {
                svg.innerHTML = this._createFilterMarkup();
            }
        }
    }

    _detectBrowser() {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const safari = /^((?!chrome|android).)*safari/i.test(userAgent);
        const firefox = userAgent.indexOf('firefox') > -1;
        
        return {
            supportsAdvancedEffects: !(safari || firefox),
            isSafari: safari,
            isFirefox: firefox
        };
    }

    _adjustOpacity(rgba, factor) {
        const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
        if (match) {
            const [, r, g, b, a = "1"] = match;
            const newOpacity = Math.min(parseFloat(a) * factor, 1);
            return `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
        }
        return rgba;
    }
}
