import { Backup } from './backup';
import { Volume } from './volume';
import { GlobalVariable } from './../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class OptionService {

  baseUrl: string = GlobalVariable.BASE_API_URL;

  constructor(private httpService: HttpClient) { }

  getVolume(): Observable <Volume> {
    return this.httpService.get<Volume>(this.baseUrl + '/volume/');
  }

  setVolume(volume: Volume): Observable < Volume > {
    const body = JSON.stringify(volume); // Stringify payload
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const newVolume = this.httpService.post<Volume>(this.baseUrl + '/volume/', body, {
        headers
      });
    return newVolume;
  }

  getBackup(): Observable <Array<Backup>> {
    return this.httpService.get<Array<Backup>>(this.baseUrl + '/backup/');
  }

}
