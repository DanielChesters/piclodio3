import {WebRadio} from '../web-radios/web-radio';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
        selector: 'app-confirm-delete-modal',
        templateUrl: './confirm-delete-modal.component.html',
        styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent {

        @Input() message: String;
        @Input() modalConfirmDeleteIsVisible: Boolean;
        @Output() onConfirm = new EventEmitter<boolean>();

        canceldeleteWebRadio(): void {
                this.modalConfirmDeleteIsVisible = false;
                this.onConfirm.emit(false);
        }

        confirmDeleteWebRadio(): void {
                this.modalConfirmDeleteIsVisible = false;
                this.onConfirm.emit(true);

        }

}
