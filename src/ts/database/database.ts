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
            strokes: '++id, canvasId, zIndex, color, vertices, matrix',
        });
    }

    getCanvas(id: number){
        return this.canvases.where("id").equals(id).first();
    }

    createCanvas(){
        let time = Date.now();
        return this.canvases.add({
            creationTime: time,
            lastAccessTime: time
        });
    }

    /**
     * Removes all the drawables from a canvas.
     * @param id the id of the canvas to clear.
     */
    clearCanvas(id: number){
        let { shapes, shapeBatches, strokes } = this;
        for(let table of [shapes, shapeBatches, strokes]){
            table.where("canvasId").equals(id).delete();
        }
    }

    /**
     * Removes a canvas and all its drawables from the database.
    * @param id the id of the canvas to remove.
     */
    removeCanvas(id: number){
        let { canvases, shapes, shapeBatches, strokes } = this;
        return this.transaction("rw", canvases, shapes, shapeBatches, strokes, () => {
            // Delete all the drawables on the canvas
            this.clearCanvas(id);
            // Delete the canvas itself
            canvases.delete(id);
        })
    }

    getTypeId(name: string){
        let search = { name: name };
        return this.types.get(search).then(type =>{
            return type? type.id : this.types.add(search);
        });
    }
}
