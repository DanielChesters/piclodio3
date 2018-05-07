export class WebRadio {
    id: number;
    name = '';
    url = '';
    is_default = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
