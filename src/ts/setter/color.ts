import { Color } from 'gl2d/struct/color';
import * as $ from 'jquery';
import 'spectrum-colorpicker';

export type OnColorSet = (color: Color) => any;

export class ColorSetter {

    private unconfirmedAlpha: number;

    private constructor (
        public input: JQuery,
        public onColorSet: OnColorSet,
        public alpha: number,
    ){ this.unconfirmedAlpha = alpha; }

    static create(id: string, initialColor: string, onColorSet: OnColorSet){

        let input = $('#' + id);
        let color = Color.fromArgbString(initialColor);
        let setter = new ColorSetter(input, onColorSet, color.a / 0xff);

        input.spectrum({
            color: initialColor,
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
                    setter.confirmAlpha();
                    tinycolor.setAlpha(setter.alpha);
                    // Extract color
                    let argb = tinycolor.toHex8String();
                    let color = Color.fromArgbString(argb);
                    setter.setColor(color);
                }
            },
            hide: function (tinycolor) {
                setter.denyAlpha();
            }
        })

        input.on("dragstop.spectrum", function (e, tinyColor) {
            // Value will be confirmed if change event is called; denied if hide event is called.
            setter.unconfirmedAlpha = tinyColor.getAlpha();
        });

        onColorSet(color);

        return setter;
    }

    confirmAlpha(){
        this.alpha = this.unconfirmedAlpha;
    }

    denyAlpha(){
        this.unconfirmedAlpha = this.alpha;
    }

    setRandomColor(){
        let color = Color.random();
        color.a = (this.alpha * 0xff) | 0;
        this.setColor(color);
    }

    setColor(color: Color){
        let { input, onColorSet } = this;
        input.spectrum("set", color.toArgbString());
        onColorSet(color);
    }
}
