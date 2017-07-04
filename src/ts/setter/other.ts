var Slider = require('bootstrap-slider');

export type OnLineWidthSet = (strokeWidth: number) => any;
export type OnZoomSpeedSet = (zoomSpeed: number) => any;


export class OtherSetter {
    
    private constructor(
        public onLineWidthSet: OnLineWidthSet,
        public onZoomSpeedSet: OnZoomSpeedSet,
    ){}

    static create(initialLineWidth: number, initialZoomSpeed: number, onLineWidthSet: OnLineWidthSet, onZoomSpeedSet: OnZoomSpeedSet){

        let setter = new OtherSetter(onLineWidthSet, onZoomSpeedSet);

        // Init stroke thickness slider
        let lineWidthSlider = new Slider("input[name=line-width]", {
            min: 0,
            max: 100,
            step: 1,
            value: initialLineWidth,
            tooltip: 'show'
        });

        lineWidthSlider.on('slideStop', function () {
            let val = lineWidthSlider.getValue();
            setter.onLineWidthSet(val);
        });

        // Init zoom speed slider
        let zoomSpeedSlider = new Slider("input[name=zoom-speed]",  {
            min: 1,
            max: 100,
            step: 1,
            value: initialZoomSpeed,
            tooltip: 'show'
        })

        zoomSpeedSlider.on('slideStop', function () {
            let val = zoomSpeedSlider.getValue();
            setter.onZoomSpeedSet(val);
        });

        // Set initial values
        onLineWidthSet(initialLineWidth);
        onZoomSpeedSet(initialZoomSpeed);

        return setter;
    }
}
