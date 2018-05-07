import { GlobalVariable } from './../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AlarmClock} from './alarm-clock';
import { Injectable } from '@angular/core';

@Injectable()
export class AlarmClockService {

  baseUrl: string = GlobalVariable.BASE_API_URL;

  constructor(private httpService: HttpClient) { }

  // GET /alarmclocks
  getAllAlarmClocks(): Observable <Array<AlarmClock>> {
          return this.httpService.get<Array<AlarmClock>>(this.baseUrl + '/alarms/');
  }

  // DELETE /alarms/:id
  deleteAlarmClockById(id: number): Observable < any > {
    console.log('call delete service, delete alarm id ' + id);
    return this.httpService.delete(this.baseUrl + '/alarms/' + id);
  }

  // POST /alarms/new
  addAlarmClock(alarmClock: AlarmClock): Observable <AlarmClock> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const returnedAlarmClock = this.httpService.post<AlarmClock>(this.baseUrl + '/alarms/', alarmClock, {
        headers
      });
    return returnedAlarmClock;
  }

  // GET /alarms/:id
  getAlarmClockById(id: number): Observable <AlarmClock> {
          return this.httpService.get<AlarmClock>(this.baseUrl + '/alarms/' + id);
  }

  updateAlarmClockById(id: number, values: Object = {}): Observable <AlarmClock> {
    const body = JSON.stringify(values); // Stringify payload
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const returnedAlarmClock = this.httpService.put<AlarmClock>(this.baseUrl + '/alarms/' + id, body, {
            headers
        });
    return returnedAlarmClock;
  }

}
