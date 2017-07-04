/**
 * Option backed by local storage.
 */
export class Option<V> {

    public key: string;
    protected value: V;

    protected constructor(key: string, value: V) {
        this.key = key;
        this.value = value;
    }

    protected static get(key: string) {
        if (localStorage) {
            return localStorage.getItem(key);
        } else {
            return null;
        }
    }

    static bool(key: string, initial: boolean) {
        let str = Option.get(key);
        let val: boolean;
        if (str === 'true') {
            val = true;
        } else if (str === 'false') {
            val = false;
        } else {
            val = initial;
        }
        return new Option(key, val);
    }

    static num(key: string, initial: number, min: number, max: number) {
        let val = parseInt(Option.get(key));
        if (isNaN(val) || val < min || val > max) {
            val = initial;
        }
        return new Option(key, val);
    }

    static str(key: string, initial: string) {
        let str = Option.get(key);
        let val = str ? str : initial;
        return new Option(key, val);
    }

    get val() {
        return this.value;
    }

    set val(value: V) {
        this.value = value;
        if (localStorage) {
            localStorage.setItem(this.key, value? value.toString() : null);
        }
    }
}