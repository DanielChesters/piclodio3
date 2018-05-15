import { Router } from '@angular/router';
import { platform } from 'os';
import { Player } from '../player/player';
import { PlayerService } from './../player/player.service';
import { Component, OnInit } from '@angular/core';
import { WebRadioService } from './web-radio.service';
import { WebRadio } from './web-radio';

@Component({
    selector: 'app-web-radios',
    templateUrl: './web-radios.component.html',
    styleUrls: ['./web-radios.component.css']
})
export class WebRadiosComponent implements OnInit {

    webradios: Array<WebRadio> = [];
    webRadioToDelete: WebRadio;
    modalConfirmDeleteWebRadioIsVisible: Boolean = false;
    message: String;

    constructor(private webRadioService: WebRadioService, private playerService: PlayerService, private router: Router) {}

    ngOnInit(): void {
        this.refreshWebRadioList();
    }

    deleteWebRadio(webRadioToDelete: WebRadio): void {
        console.log(`Deleting ${webRadioToDelete}`);
        this.webRadioService.deleteWebRadioById(webRadioToDelete.id)
        .subscribe(success => this.refreshWebRadioList(),
            error => console.log(`error: ${error}`))

    }

    confirmDeleteWebRadio(webradio: WebRadio): void {
        console.log('confirmDeleteWebRadio clicked');
        this.modalConfirmDeleteWebRadioIsVisible = true;
        this.webRadioToDelete = webradio;
        this.message = `Are you sure you want to delete ${this.webRadioToDelete.name}`
    }

    onConfirm(agreed: boolean): void {
        this.modalConfirmDeleteWebRadioIsVisible = false;
        if (agreed) {
            this.deleteWebRadio(this.webRadioToDelete);
        }
    }

    setWebRadios(webradios: Array<WebRadio>): void {
        console.log(webradios);
        this.webradios = webradios;
    }

    refreshWebRadioList(): void {
        console.log('Refresh the web radio list');
        this.webRadioService.getAllWebRadios()
        .subscribe(this.setWebRadios.bind(this));
    }

    playWebRadio(webradio: WebRadio): void {
        console.log(`Play web radio id ${webradio.id}`);
        const player = new Player();
        player.status = 'on';
        player.webradio = webradio.id;
        this.playerService.updatePlayer(player)
        .subscribe(
            success => {
                this.router.navigate(['homepage']);
            },
            error => console.log(`Error ${error}`)
        );

    }

}
