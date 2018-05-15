import { Component } from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class PopupComponent {

    public alerts: any = [];

    /**
     * Show up a popup message and remove it after a little delay
     * type: can be succes, danger, info, warning
     * message: the message to show
     */
    public add(type: string, msg: string): void {
        this.alerts.push({
            type,
            msg,
            timeout: 5000
        });
    }

}
