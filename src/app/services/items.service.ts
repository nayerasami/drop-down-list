import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems(page: number, limit: number) {
    return this.http.get(`http://localhost:4000/api/v1/items?page=${page}&limit=${limit}`)
  }

}
