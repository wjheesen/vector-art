import { Color } from "gl2d/struct/color";
import { ColorOption } from '../option/color';
import * as $ from 'jquery';
import 'spectrum-colorpicker';

export type OnColorPick = (color: Color) => any;

export class ColorPicker{
    
    alpha: number;
    color: ColorOption;
    callback: OnColorPick;
    input: JQuery;

    private constructor(){}

    pickRandom(){
        this.color.val.setRandom();
        this.color.unparsed.val = this.color.val.toArgbString();
        this.input.spectrum("set", this.color.unparsed.val);
        this.callback(this.color.val);
    }

    static create(id: string, onColorPick: OnColorPick){

        let picker = new ColorPicker();
        picker.input = $(id);
        picker.color = ColorOption.create("drawColor", Color.create$(39, 78, 19, 255));
        picker.alpha = picker.color.val.a / 0xff;
        picker.callback = onColorPick;

        onColorPick(picker.color.val);

        picker.input.spectrum({
            color: picker.color.unparsed.val,
            flat: false,
            showInput: false,
            showInitial: false,
            allowEmpty: false,
            showAlpha: true,
            disabled: false,
            showPalette: true,
            showPaletteOnly: true,
            togglePaletteOnly: true,
            showSelectionPalette: false,
            clickoutFiresChange: true,
            hideAfterPaletteSelect: true,
            preferredFormat: "rgb",
            palette: [
                ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
            ],
            change: function (tinycolor) {
                if (tinycolor) {
                    // Override alpha (in case of palette selection)
                    tinycolor.setAlpha(picker.alpha);
                    // Update UI component
                    let argb = tinycolor.toHex8String();
                    picker.input.spectrum("set", argb);
                    // Update color
                    picker.color.val.setFromArgbString(argb);
                    picker.color.unparsed.val = argb;
                    // Update renderer color
                    onColorPick(picker.color.val);
                }
            },
            hide: function (tinycolor) {
                // Set unconfirmed alpha back to alpha
                picker.alpha = picker.color.val.a / 0xff;
            }
        });

        picker.input.on("dragstop.spectrum", function (e, tinyColor) {
            // Value confirmed if change event is called.
            // Otherwise reverts to alpha when color picker is hidden.
            picker.alpha = tinyColor.getAlpha();
        });

        return picker;
    }
}
