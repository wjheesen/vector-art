import { Option } from '../option/option';
import * as $ from 'jquery';

export type OnCursorPick = (id: CursorType) => any;
export type CursorType = "select" | "pan" ;

export class CursorDialog {
    
    cursorType: Option<CursorType>;
    onCursorPick: OnCursorPick;

    private constructor(){}

    static create(buttonId: string, onToolPick: OnCursorPick){

        let options = new CursorDialog();
        options.cursorType = Option.str("cursor", "select") as Option<CursorType>;
        options.onCursorPick = onToolPick;

        $(buttonId)
            .click(() => {
                options.onCursorPick(options.cursorType.val);
            })
            .children("i")
                .addClass("icon-" + options.cursorType.val);

        $("#cursor-settings > a").click(function(){
            let toolType = $(this).attr("id") as CursorType;
            // Set stroke as button icon
            $(buttonId).children("i")
                .removeClass("icon-" + options.cursorType.val)
                .addClass("icon-" + toolType);
            // Update setting and send callback
            options.cursorType.val = toolType;
            options.onCursorPick(toolType);
        })

        return options;
    }
}
