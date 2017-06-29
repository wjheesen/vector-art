import 'spectrum-colorpicker';
import { ColorOption } from '../option/color';
import { Color } from 'gl2d/struct/color';
import * as $ from 'jquery';
import { ColorFStruct } from "gl2d/struct/colorF";

export type OnColorPick = (color: Color) => any;

export class ColorSettings {

    private constructor(
        public fillColorPicker: ColorPicker,
        public strokeColorPicker: ColorPicker
    ){}

    static create(onFillColorPick: OnColorPick, onStrokeColorPick: OnColorPick){
        return new ColorSettings(
            ColorPicker.create(
                $("#fill-color"),
                onFillColorPick,
                ColorOption.create("fillColor", new Color(39, 78, 19, 0xff))
            ),
            ColorPicker.create(
                $("#stroke-color"),
                onStrokeColorPick,
                ColorOption.create("strokeColor", new Color(0, 0, 0, 0xff))
            )
        )
    }
}

export class ColorPicker {

    private constructor (
        public input: JQuery,
        public onColorPick: OnColorPick,
        public colorOption: ColorOption,
        public alpha = colorOption.val.a / 0xff
    ){}

    static create(input: JQuery, onColorPick: OnColorPick, colorOption: ColorOption){
        let picker = new ColorPicker(input, onColorPick, colorOption);

        input.spectrum({
            color: colorOption.unparsed.val,
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
                    let { input, colorOption, alpha } = picker;
                    // Override alpha (in case of palette selection)
                    tinycolor.setAlpha(alpha);
                    // Update UI component
                    let argb = tinycolor.toHex8String();
                    input.spectrum("set", argb);
                    // Update color setting
                    colorOption.val.setFromArgbString(argb);
                    colorOption.unparsed.val = argb;
                    // Send callback
                    onColorPick(colorOption.val);
                }
            },
            hide: function (tinycolor) {
                // Set unconfirmed alpha back to alpha
                picker.alpha = picker.colorOption.val.a / 0xff;
            }
        })

        input.on("dragstop.spectrum", function (e, tinyColor) {
            // Value confirmed if change event is called.
            // Otherwise reverts to alpha when color picker is hidden.
            picker.alpha = tinyColor.getAlpha();
        });

        onColorPick(colorOption.val);

        return picker;
    }

    pickRandomColor(){
        this.colorOption.val.setRandom();
        this.saveColorUpdateInputAndInvokeCallback();
    }

    pickColor(color: ColorFStruct){
        this.colorOption.val.setFromColorF(color);
        this.saveColorUpdateInputAndInvokeCallback();
    }

    private saveColorUpdateInputAndInvokeCallback(){
        let { colorOption, input, onColorPick } = this;
        colorOption.unparsed.val = colorOption.val.toArgbString();
        input.spectrum("set", colorOption.unparsed.val);
        onColorPick(colorOption.val);
    }

}
