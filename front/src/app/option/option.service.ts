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
    return this.httpService.get<Volume>(this.baseUrl + "/volume/");
  }


  setVolume(volume: Volume): Observable < Volume > {
    let body = JSON.stringify(volume); // Stringify payload
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
          var newVolume = this.httpService.post<Volume>(this.baseUrl + "/volume/", body, {
        headers: headers
      });
    return newVolume;
  }

  getBackup(): Observable <Backup[]> {
    return this.httpService.get<Backup[]>(this.baseUrl + "/backup/");
  }

}
