import { Option } from '../option/option';
// import * as $ from 'jquery';
var Slider = require('bootstrap-slider');

export type OnStrokeThicknessPick = (strokeThickness: number) => any;

export class OtherSettings {
    
    strokeThickness: Option<number>;
    onStrokeThicknessPick: OnStrokeThicknessPick;

    private constructor(){}

    static create(onStrokeThicknessPick: OnStrokeThicknessPick){

        let settings = new OtherSettings();
        settings.strokeThickness = Option.num("stroke-thickness", 500, 1, 1000);
        settings.onStrokeThicknessPick = onStrokeThicknessPick;

        // Set initial value
        onStrokeThicknessPick(settings.strokeThickness.val);

        let slider = new Slider("input[name=stroke-thickness]", {
            min: 1,
            max: 100,
            step: 1,
            value: settings.strokeThickness.val,
            tooltip: 'show'
        });

        slider.on('slideStop', function () {
            let val = slider.getValue();
            settings.strokeThickness.val = val;
            settings.onStrokeThicknessPick(val);
        });

        return settings;
    }
}
