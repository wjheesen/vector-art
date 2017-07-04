import * as $ from 'jquery';

export type OnCursorSet = (id: string) => void;

export class CursorSetter {
    
    private constructor(
        public cursor: string,
        public onCursorSet: OnCursorSet
    ){}

    static create(initialCursor: string, onCursorSet: OnCursorSet){

        let setter = new CursorSetter(initialCursor, onCursorSet);

        $("#cursor-settings > button").click(function() {
            let type = $(this).attr("id");
            setter.toggleCursor(type);
        })

        setter.toggleCursor(initialCursor);

        return setter;
    }

    disableCursor(){
        let cursor = this.cursor;
        if(cursor){
            $('#'+cursor).children("i").addClass("md-inactive")
            this.cursor = null;
        }
        this.onCursorSet(null);
    }

    toggleCursor(cursor: string){
        // Disable previous cursor (if any)
        let previous = this.cursor;
        if(previous && cursor !== previous){
            $('#'+previous).children("i").addClass("md-inactive")
        }
        // Enable specified cursor (if any)
        if(cursor){
            let icon = $('#'+cursor).children("i");
            icon.toggleClass("md-inactive");
            if(icon.hasClass("md-inactive")){
                cursor = null;
            }
        }
        // Invoke callback
        this.cursor = cursor;
        this.onCursorSet(cursor);
    }
}
