import Dexie from 'dexie';
import { Canvas } from "./canvas";
import { Shape } from "./shape";
import { Stroke } from "./stroke";
import { ShapeBatch } from './shapeBatch';

type Table<T> = Dexie.Table<T, number>; // number = type of the primkey

export class Database extends Dexie {

    canvases: Table<Canvas>;
    shapes: Table<Shape>; 
    shapeBatches: Table<ShapeBatch>;
    strokes: Table<Stroke>;

    constructor () {
        super("VectorArtDatabase");

        // Define tables and indexes
        // (Here's where the implicit table props are dynamically created)
        this.version(1).stores({
            canvases: '++id, creationTime, lastAccessTime',
            shapes: 'zIndex, canvasId, type, color, matrix',
            shapeBatches: 'zIndex, canvasId, type, color, matrices',
            strokes: 'zIndex, canvasId, color, vertices',
        });
    }
}
