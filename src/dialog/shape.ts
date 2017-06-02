import { Option } from '../option/option';
import * as $ from 'jquery';

export type OnAspectPick = (maintainAspect: boolean) => any;
export type OnShapePick = (id: ShapeType) => any;
export type ShapeType = "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "circle" | "star" | "star6" | "star8" | "star16" | "heart" | "flower" | "bat" | "spray";

export class ShapeDialog {
    
    aspect: Option<boolean>;
    shape: Option<ShapeType>;
    onAspectChange: OnAspectPick;
    onShapePick: OnShapePick;

    private constructor(){}

    static create(buttonId: string, onAspectChange: OnAspectPick, onShapePick: OnShapePick){

        let options = new ShapeDialog();
        options.aspect = Option.bool("maintain-aspect", true);
        options.shape = Option.str("shape", "triangle") as Option<ShapeType>;
        options.onAspectChange = onAspectChange;
        options.onShapePick = onShapePick;

        onAspectChange(options.aspect.val);

        $(buttonId)
            .click(() => {
                options.onShapePick(options.shape.val);
            })
            .children("i")
                .addClass("icon-" + options.shape.val)

        $("input[name=maintain-aspect]")
            .prop('checked', options.aspect.val)
            .change(function(){
                let aspect = this.checked ? true : false;
                options.aspect.val = aspect;
                options.onAspectChange(aspect);
            }
        );

        $("#shape-settings > a").click(function(){
            let shape = $(this).attr("id") as ShapeType;
            // Set shape as button icon
            $(buttonId).children("i")
                .removeClass("icon-" + options.shape.val)
                .addClass("icon-" + shape);
            // Update option and send callback
            options.shape.val = shape;
            options.onShapePick(shape);
        })

        return options;
    }
}
