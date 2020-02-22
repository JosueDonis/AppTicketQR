import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getOne(input) {
    return this.http.get(`${environment.apiHost}/token/${input.code}`);
  }

  update(input) {
    return this.http.put(`${environment.apiHost}/tickets/${input.id}`, input);
  }
}
