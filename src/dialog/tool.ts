import { Option } from '../option/option';
import * as $ from 'jquery';

export type OnToolPick = (id: ToolType) => any;
export type ToolType = "select" | "pan" ;

export class ToolDialog {
    
    thickness: Option<number>;
    toolType: Option<ToolType>;
    onToolPick: OnToolPick;

    private constructor(){}

    static create(buttonId: string, onToolPick: OnToolPick){

        let options = new ToolDialog();
        options.toolType = Option.str("tool", "select") as Option<ToolType>;
        options.onToolPick = onToolPick;

        onToolPick(options.toolType.val);

        $(buttonId)
            .click(() => {
                options.onToolPick(options.toolType.val);
            })
            .children("i")
                .addClass("icon-" + options.toolType.val);

        $("#tool-settings > a").click(function(){
            let toolType = $(this).attr("id") as ToolType;
            // Set stroke as button icon
            $(buttonId).children("i")
                .removeClass("icon-" + options.toolType.val)
                .addClass("icon-" + toolType);
            // Update setting and send callback
            options.toolType.val = toolType;
            options.onToolPick(toolType);
        })

        return options;
    }
}
