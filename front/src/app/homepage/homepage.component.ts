
import {interval as observableInterval} from 'rxjs';
import { AlarmClock } from '../alarm-clock/alarm-clock';
import { AlarmClockService } from './../alarm-clock/alarm-clock.service';
import { Player } from './../player/player';
import { PlayerService } from '../player/player.service';
import { WebRadio } from './../web-radios/web-radio';
import { SystemDateService } from './systemdate.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {SystemDate} from '../system-date';
import { WebRadioService } from '../web-radios/web-radio.service';
import { Observable, Subscription } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
        selector: 'app-homepage',
        templateUrl: './homepage.component.html',
        styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
        clock: Date;
        clockString: string;
        active_webradios: Array<any>;
        active_alarms: Array<AlarmClock>;
        all_webradios: Array<any>;
        systemDateSubscribption: Subscription;
        clockIncrementSubscription: Subscription;
        player: Player;
        playerLoaded = false;

        constructor(private webRadioService: WebRadioService,
                    private systemDateService: SystemDateService,
                    private playerService: PlayerService,
                    private alarmClockService: AlarmClockService) {

        }

        ngOnInit(): void {
                // get the backend server time and date
                this.systemDateSubscribption = this.systemDateService
                .getSystemDate()
                .subscribe(this.setClockCallback.bind(this));
                // get the active web radio
                this.webRadioService.getAllWebRadios()
                .subscribe(this.filterDefaultWebRadio.bind(this));
                // get the player status
                this.playerService.getPlayerStatus()
                .subscribe(this.setPlayerStatus.bind(this));
                // get the list of activated Alarm
                this.alarmClockService.getAllAlarmClocks()
                .subscribe(this.setActiveAlarmClocks.bind(this));

        }
        // subcribe return the target object
        setClockCallback(date: Date): void {
                this.clock = date;
                this.clockIncrementSubscription = observableInterval(1000)
                .subscribe(this.incrementDate.bind(this));

        }

        incrementDate(): void {
                this.clock.setSeconds(this.clock.getSeconds() + 1);
                this.clockString = moment()
                .format('dddd D MMMM YYYY, H:mm:ss');
        }

        ngOnDestroy(): void {
                this.systemDateSubscribption.unsubscribe();
                if (this.clockIncrementSubscription) {
                        this.clockIncrementSubscription.unsubscribe();
                }

        }

        /**
         * Filter the received list of webradios to keep only the active one (is_default)
         */
        filterDefaultWebRadio(webradios: Array<WebRadio>): void {
                this.all_webradios = webradios;
                console.log(webradios);
                this.active_webradios = this.all_webradios.filter(
                        webradio => webradio.is_default === true
                )
        }

        setPlayerStatus(player: Player): void {
                console.log(`Player: ${player}`);
                this.player = player;
                this.playerLoaded = true;
        }

        switchPlayerStatus(): void {
                this.player.status = this.player.status === 'on' ? 'off' : 'on';
                this.playerService.updatePlayer(this.player)
                .subscribe(this.setPlayerStatus.bind(this));
        }

        setActiveAlarmClocks(alarmclocks: Array<AlarmClock>): void {
                this.active_alarms = alarmclocks.filter(
                        alarms => alarms.is_active === true
                )

        }

}
