import { Option } from '../option/option';
import * as $ from 'jquery';

export type OnAspectPick = (maintainAspect: boolean) => any;
export type OnShapePick = (shape: string) => any;

export class ShapeSettings {
    
    shape: Option<string>;
    onShapePick: OnShapePick;

    private constructor(){}

    static create(onShapePick: OnShapePick){

        let settings = new ShapeSettings();
        settings.shape = Option.str("shape", "triangle");
        settings.onShapePick = onShapePick;

        $("#shape-button")
            .click(() => {
                settings.onShapePick(settings.shape.val);
            })
            // Set initial icon
            .children("i").addClass("icon-" + settings.shape.val);

        // Set initial shape
        onShapePick(settings.shape.val);

        $("#shape-settings > a").click(function(){
            let shape = $(this).attr("id");
            // Set shape as button icon
            $("#shape-button").children("i")
                .removeClass("icon-" + settings.shape.val)
                .addClass("icon-" + shape);
            // Update option and send callback
            settings.shape.val = shape;
            settings.onShapePick(shape);
        })

        return settings;
    }
}
