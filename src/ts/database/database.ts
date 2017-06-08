import Dexie from 'dexie';
import { Canvas } from "./canvas";
import { Shape } from "./shape";
import { Stroke } from "./stroke";
import { ShapeBatch } from './shapeBatch';

type Table<T> = Dexie.Table<T, number>; // number = type of the primkey

export class Database extends Dexie {

    canvases: Table<Canvas>;
    shapes: Table<Shape>; 
    strokes: Table<Stroke>;
    shapeBatches: Table<ShapeBatch>;

    constructor () {
        super("VectorArtDatabase");

        // Define tables and indexes
        // (Here's where the implicit table props are dynamically created)
        this.version(1).stores({
            canvas: '++id, creationTime, lastAccessTime',
            strokes: '++id, color, vertices',
            shapes: '++id, type, color, matrix',
            shapeBatches: '++id, type, color, matrices'
        });
    }
}
