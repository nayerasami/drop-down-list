import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems(baseUrl:string,page: number, limit: number,search:string) {
    return this.http.get(`${baseUrl}?page=${page}&limit=${limit}&search=${search}`)
  }

}
