import * as stream from 'stream';
import * as through2 from 'through2';
import * as File from 'vinyl';
import * as ast from 'ts-type-info';

function meshify(): stream.Transform{
    return through2.obj(function (file: File, encoding, callback) {

        let mesh = JSON.parse(file.contents.toString());
        mesh.id = file.relative.replace(".json","");

        let tsFile = ast.createFile();

        tsFile.addVariable({
            documentationComment: `The mesh data for a ${mesh.id}, generated from ${file.relative}.`,
            isExported: true,
            declarationType: "const",
            name: mesh.id,
            defaultExpression: JSON.stringify(mesh),
        })

        file.contents = new Buffer(tsFile.write());

        callback(null, file);
    });
};

export = meshify ;