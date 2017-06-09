import { Option } from '../option/option';
// import * as $ from 'jquery';
var Slider = require('bootstrap-slider');

export type OnStrokeWidthPick = (strokeWidth: number) => any;
export type OnZoomSpeedPick = (zoomSpeed: number) => any;


export class OtherSettings {
    
    strokeWidth: Option<number>;
    onStrokeWidthPick: OnStrokeWidthPick;

    zoomSpeed: Option<number>;
    onZoomSpeedPick: OnZoomSpeedPick;

    private constructor(){}

    static create(onStrokeThicknessPick: OnStrokeWidthPick, onZoomSpeedPick: OnZoomSpeedPick){

        let settings = new OtherSettings();
        settings.strokeWidth = Option.num("stroke-width", 50, 1, 100);
        settings.onStrokeWidthPick = onStrokeThicknessPick;
        settings.zoomSpeed = Option.num("zoom-speed", 50, 1, 100);
        settings.onZoomSpeedPick = onZoomSpeedPick;

        // Set initial values
        onStrokeThicknessPick(settings.strokeWidth.val);
        onZoomSpeedPick(settings.zoomSpeed.val);

        // Init stroke thickness slider
        let strokeSlider = new Slider("input[name=stroke-width]", {
            min: 1,
            max: 100,
            step: 1,
            value: settings.strokeWidth.val,
            tooltip: 'show'
        });

        strokeSlider.on('slideStop', function () {
            let val = strokeSlider.getValue();
            settings.strokeWidth.val = val;
            settings.onStrokeWidthPick(val);
        });

        // Init zoom speed slider
        let zoomSlider = new Slider("input[name=zoom-speed]",  {
            min: 1,
            max: 100,
            step: 1,
            value: settings.zoomSpeed.val,
            tooltip: 'show'
        })

        zoomSlider.on('slideStop', function () {
            let val = zoomSlider.getValue();
            settings.zoomSpeed.val = val;
            settings.onZoomSpeedPick(val);
        });

        return settings;
    }
}
