import Dexie from 'dexie';
import { Canvas } from "./canvas";
import { Shape } from "./shape";
import { Stroke } from "./stroke";
import { ShapeBatch } from './shapeBatch';
import { Type } from "./type";

type Table<T> = Dexie.Table<T, number>; // number = type of the primkey

export class Database extends Dexie {

    canvases: Table<Canvas>;
    shapes: Table<Shape>; 
    types: Table<Type>
    shapeBatches: Table<ShapeBatch>;
    strokes: Table<Stroke>;

    constructor () {
        super("VectorArtDatabase");

        // Define tables and indexes
        // (Here's where the implicit table props are dynamically created)
        this.version(1).stores({
            canvases: '++id, creationTime, lastAccessTime',
            types: '++id, name',
            shapes: '++id, canvasId, typeId, zIndex, color, matrix',
            shapeBatches: '++id, canvasId, typeId, zIndex, color, matrices',
            strokes: '++id, canvasId, zIndex, color, vertices',
        });

        this.on("populate", () => {
            let time = Date.now();
            this.canvases.add({id: 1, creationTime: time, lastAccessTime: time })
        })
    }

    getTypeId(name: string){
        let search = { name: name };
        return this.types.get(search).then(type =>{
            return type? type.id : this.types.add(search);
        });
    }
}
