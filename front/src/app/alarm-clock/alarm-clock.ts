import { INT_TYPE } from '@angular/compiler/src/output/output_ast';
import { WebRadio } from '../web-radios/web-radio';

export class AlarmClock {
    id: number;
    name = '';
    monday  = false;
    tuesday  = false;
    wednesday  = false;
    thursday  = false;
    friday  = false;
    saturday  = false;
    sunday  = false;
    hour: number;
    minute: number;
    auto_stop_minutes: number;
    is_active = false;
    webradio: WebRadio;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
