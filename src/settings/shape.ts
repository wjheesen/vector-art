import { Option } from '../option/option';
import * as $ from 'jquery';

export type OnAspectPick = (maintainAspect: boolean) => any;
export type OnShapePick = (id: ShapeType) => any;
export type ShapeType = "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "circle" | "star" | "star6" | "star8" | "star16" | "heart" | "flower" | "bat" | "spray";

export class ShapeSettings {
    
    shape: Option<ShapeType>;
    onShapePick: OnShapePick;

    private constructor(){}

    static create(onShapePick: OnShapePick){

        let settings = new ShapeSettings();
        settings.shape = Option.str("shape", "triangle") as Option<ShapeType>;
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
            let shape = $(this).attr("id") as ShapeType;
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
