import * as $ from 'jquery';

export type OnMeshSet = (mesh: string) => any;

export class MeshSetter {
    
    private constructor(
        public mesh: string,
        public onMeshSet: OnMeshSet,
    ){}

    static create(initialMesh: string, onMeshSet: OnMeshSet){

        let setter = new MeshSetter(initialMesh, onMeshSet);

        $("#mesh-settings > a").click(function(){
            let mesh = $(this).attr("id");
            setter.setMesh(mesh);
        })

        setter.setMesh(initialMesh);

        return setter;
    }

    setMesh(mesh: string){
        let icon = $("#mesh-button > i");
        // Remove previous mesh icon
        let previousMesh = this.mesh;
        if(previousMesh){
            icon.removeClass("icon-" + previousMesh);
        }
        // Add specified mesh icon
        icon.addClass("icon-" + mesh);
        this.mesh = mesh;
        // Invoke callback
        this.onMeshSet(mesh);
    }
}
