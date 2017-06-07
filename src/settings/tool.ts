import { Option } from '../option/option';
import * as $ from 'jquery';

export type OnToolPick = (id: ToolType) => any;
export type ToolType = "shape-aspect" | "shape" | "shape-stroke" | "shape-line" | "shape-spray"| "stroke"  | "line"  | "color-sampler" | "pan" | "select" ;

export class ToolSettings {
    
    tool: Option<ToolType>;
    onToolPick: OnToolPick;

    private constructor(){}

    static create(onToolPick: OnToolPick){

        let settings = new ToolSettings();
        settings.tool = Option.str("tool", "shape") as Option<ToolType>;
        settings.onToolPick = onToolPick;

        $("#tool-button")
            .click(() => {
                settings.onToolPick(settings.tool.val);
            })
            // Set initial button icon
            .children("i")
                .addClass("icon-" + settings.tool.val);

        // Set initial tool
        onToolPick(settings.tool.val);

        $("#tool-settings > a").click(function(){
            let toolType = $(this).attr("id") as ToolType;
            settings.pickToolType(toolType)
        })

        return settings;
    }

    pickToolType(toolType: ToolType){
        // Set stroke as button icon
        $("#tool-button").children("i")
            .removeClass("icon-" + this.tool.val)
            .addClass("icon-" + toolType);
        // Update setting and send callback
        this.tool.val = toolType;
        this.onToolPick(toolType);
    }
}
