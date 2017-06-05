import { Option } from '../option/option';
import * as $ from 'jquery';

export type OnToolPick = (id: ToolType) => any;
export type ToolType = "shape-aspect" | "shape" | "shape-stroke" | "shape-line" | "shape-spray"| "stroke"  | "line"  | "pan" | "select" ;

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
            // Set stroke as button icon
            $("#tool-button").children("i")
                .removeClass("icon-" + settings.tool.val)
                .addClass("icon-" + toolType);
            // Update setting and send callback
            settings.tool.val = toolType;
            settings.onToolPick(toolType);
        })

        return settings;
    }
}
