import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems(baseUrl:string,page: number, limit: number) {
    return this.http.get(`${baseUrl}?page=${page}&limit=${limit}`)
  }

}
