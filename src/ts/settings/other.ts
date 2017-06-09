import { Option } from '../option/option';
// import * as $ from 'jquery';
var Slider = require('bootstrap-slider');

export type onLineWidthPick = (strokeThickness: number) => any;
export type OnZoomSpeedPick = (zoomSpeed: number) => any;


export class OtherSettings {
    
    strokeThickness: Option<number>;
    onLineWidthPick: onLineWidthPick;

    zoomSpeed: Option<number>;
    onZoomSpeedPick: OnZoomSpeedPick;

    private constructor(){}

    static create(onStrokeThicknessPick: onLineWidthPick, onZoomSpeedPick: OnZoomSpeedPick){

        let settings = new OtherSettings();
        settings.strokeThickness = Option.num("line-width", 50, 1, 100);
        settings.onLineWidthPick = onStrokeThicknessPick;
        settings.zoomSpeed = Option.num("zoom-speed", 50, 1, 100);
        settings.onZoomSpeedPick = onZoomSpeedPick;

        // Set initial values
        onStrokeThicknessPick(settings.strokeThickness.val);
        onZoomSpeedPick(settings.zoomSpeed.val);

        // Init stroke thickness slider
        let strokeSlider = new Slider("input[name=line-width]", {
            min: 1,
            max: 100,
            step: 1,
            value: settings.strokeThickness.val,
            tooltip: 'show'
        });

        strokeSlider.on('slideStop', function () {
            let val = strokeSlider.getValue();
            settings.strokeThickness.val = val;
            settings.onLineWidthPick(val);
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
