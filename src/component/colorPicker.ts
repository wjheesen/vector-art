import { Color } from "gl2d/struct/color";
import { ColorOption } from '../option/color';
import * as $ from 'jquery';
(<any> window).jQuery = $;
import * as tether from 'tether';
(<any> window).Tether = tether;
import 'bootstrap';
import 'spectrum-colorpicker';

export type OnColorPick = (color: Color) => any;

export class ColorPicker{
    
    // pickedColor: ColorOption;
    // alpha: number;
    // onColorPick: OnColorPick

    private constructor(){}

    static create(id: string, onColorPick: OnColorPick){

        let colorPicker = $(id);
        let pickedColor = ColorOption.create("drawColor", Color.create$(39, 78, 19, 255));
        let alpha = pickedColor.val.a / 0xff;

        onColorPick(pickedColor.val);

        colorPicker.spectrum({
            color: pickedColor.unparsed.val,
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
                    tinycolor.setAlpha(alpha);
                    // Update UI component
                    let argb = tinycolor.toHex8String();
                    $(this).spectrum("set", argb);
                    // Update color
                    pickedColor.val.setFromArgbString(argb);
                    pickedColor.unparsed.val = argb;
                    // Update renderer color
                    onColorPick(pickedColor.val);
                }
            },
            hide: function (tinycolor) {
                // Set unconfirmed alpha back to alpha
                alpha = pickedColor.val.a / 0xff;
            }
        });

        colorPicker.on("dragstop.spectrum", function (e, tinyColor) {
            // Value confirmed if change event is called.
            // Otherwise reverts to alpha when color picker is hidden.
            alpha = tinyColor.getAlpha();
        });
    }
}
