import {map} from 'rxjs/operators';
import { GlobalVariable } from './../globals';
import { Observable } from 'rxjs';
import * as url from 'url';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SystemDateService {

        baseUrl: string = GlobalVariable.BASE_API_URL;

        constructor(private httpService: HttpClient) {}

        // GET /alarmclocks
        getSystemDate(): Observable < Date > {
                return this.httpService.get<Date>(`${this.baseUrl}/systemdate/`);
        }
}
