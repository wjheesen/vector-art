import { Option } from '../option/option';
import * as $ from 'jquery';
var Slider = require('bootstrap-slider');

export type OnStrokeThicknessPick = (strokeThickness: number) => any;
export type OnStrokePick = (id: StrokeType) => any;
export type StrokeType = "brush" | "line" ;

export class StrokeDialog {
    
    thickness: Option<number>;
    strokeType: Option<StrokeType>;
    onStrokeThicknessPick: OnStrokeThicknessPick;
    onStrokePick: OnStrokePick;

    private constructor(){}

    static create(buttonId: string, onStrokeThicknessPick: OnStrokeThicknessPick, onStrokePick: OnStrokePick){

        let options = new StrokeDialog();
        options.thickness = Option.num("stroke-thickness", 500, 1, 1000);
        options.strokeType = Option.str("stroke", "brush") as Option<StrokeType>;
        options.onStrokeThicknessPick = onStrokeThicknessPick;
        options.onStrokePick = onStrokePick;

        onStrokeThicknessPick(options.thickness.val);

        $(buttonId)
            .click(() => {
                options.onStrokePick(options.strokeType.val);
            })
            .children("i")
                .addClass("icon-" + options.strokeType.val);

        let slider = new Slider("input[name=stroke-thickness]", {
            min: 1,
            max: 100,
            step: 1,
            value: options.thickness.val,
            tooltip: 'show'
        });

        slider.on('slideStop', function () {
            let val = slider.getValue();
            options.thickness.val = val;
            options.onStrokeThicknessPick(val);
        });

        $("#stroke-settings > a").click(function(){
            let strokeType = $(this).attr("id") as StrokeType;
            // Set stroke as button icon
            $(buttonId).children("i")
                .removeClass("icon-" + options.strokeType.val)
                .addClass("icon-" + strokeType);
            // Update setting and send callback
            options.strokeType.val = strokeType;
            options.onStrokePick(strokeType);
        })

        return options;
    }
}
