import * as $ from 'jquery';

export type OnToolSet = (id: string) => void;
export type OnMenuOpen = () => void;

export class ToolSetter {

    private constructor(
        public tool: string,
        public onToolSet: OnToolSet,
        public onMenuOpen?: OnMenuOpen,
    ){}

    static create(initialTool: string, onToolSet: OnToolSet, onMenuOpen?: OnMenuOpen){

        let setter = new ToolSetter(initialTool, onToolSet, onMenuOpen);

        $("#tool-settings > a").click(function(){
            let tool = $(this).attr("id");
            setter.setTool(tool)
        })

        setter.setTool(initialTool);

        return setter;
    }

    setTool(tool: string){
        let icon = $("#tool-button > i");
        // Remove previous tool icon
        let previous = this.tool;
        if(previous){
            icon.remove("icon-" + previous);
        }
        // Add new tool icon
        icon.addClass("icon-" + tool);
        this.tool = tool;
        // Invoke callback
        this.onToolSet(tool);
    }
}
