import { GlobalVariable } from './../globals';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRadio } from './web-radio';

@Injectable()
export class WebRadioService {
 
  baseUrl: string = GlobalVariable.BASE_API_URL;

  constructor(private httpService: HttpClient) {}

  // GET /webradios
  getAllWebRadios(): Observable < WebRadio[] > {    
    return this.httpService.get<WebRadio[]>(this.baseUrl + "/webradio/"); 
  }

  // GET /webradios/:id
  getWebRadioById(id: number): Observable < WebRadio > {
    return this.httpService.get<WebRadio>(this.baseUrl + "/webradio/" + id);
  }

  // POST /webradios
  addWebRadio(webradio: WebRadio): Observable < WebRadio > {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
          var returnedWebRadio = this.httpService.post<WebRadio>(this.baseUrl + "/webradio/", webradio, {
        headers: headers
      });
    return returnedWebRadio;
  }

  // DELETE /webradios/:id
  deleteWebRadioById(id: number): Observable < any > {
    console.log("call delete service, delete webradio id " + id);
    return this.httpService.delete(this.baseUrl + "/webradio/" + id);
  }

  //  PUT /todos/:id
  updateWebRadioById(id: number, values: Object = {}): Observable < WebRadio > {

    let body = JSON.stringify(values); // Stringify payload
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
          var returnedWebRadio = this.httpService.put<WebRadio>(this.baseUrl + "/webradio/" + id, body, {
        headers: headers
      });
    return returnedWebRadio;
  }
}
