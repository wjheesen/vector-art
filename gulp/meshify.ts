import { MeshSpecification } from 'gl2d';
import * as stream from 'stream';
import * as File from 'vinyl';
import * as ast from 'ts-type-info';

let reduce = require('gulp-reduce-file');

function meshify(outFile = "specifications.ts"): stream.Transform {
    return reduce(outFile, collect, compile);
};

function collect(file: File, meshes: MeshSpecification[] | ""){
    if(meshes === ""){  meshes = [];  }
    let mesh = JSON.parse(file.contents.toString());
    mesh.id = file.relative.replace(".json", "");
    mesh.path = undefined;
    meshes.push(mesh);
    return meshes;
}

function compile(meshes: MeshSpecification[]){
    let tsFile = ast.createFile();

    tsFile.addVariable({
        isExported: true,
        declarationType: "const",
        name: "MeshSpecifications",
        defaultExpression: JSON.stringify(meshes),
    })

    return tsFile.write();
}

export = meshify;