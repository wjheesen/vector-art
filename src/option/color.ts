import { ArgbRegex } from 'gl2d/struct/util';
import { Option } from "./option";
import { Color } from "gl2d/struct/color";

export class ColorOption {

    public unparsed: Option<string>;

    private value: Color;

    private constructor(unparsed: Option<string>, value: Color) {
        this.unparsed = unparsed;
        this.value = value;
    }

    static create(key: string, initial: Color) {
        let src = Option.str(key, null);
        let val: Color;
        if (src.val && ArgbRegex.test(src.val)) {
            val = Color.fromArgbString(src.val);
        } else {
            val = initial;
            src.val = initial.toArgbString();
        }
        return new ColorOption(src, val);
    }

    get val() {
        return this.value;
    }

    set val(value: Color) {
        this.value = value;
        this.unparsed.val = value.toArgbString();
    }
}