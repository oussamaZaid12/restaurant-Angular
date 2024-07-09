// src/app/services/menu.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = 'http://localhost:8091/api/menus';

  constructor(private http: HttpClient) { }

  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.baseUrl}`);
  }

  getMenu(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.baseUrl}/${id}`);
  }

  createMenu(menu: FormData): Observable<Menu> {
    return this.http.post<Menu>(`${this.baseUrl}`, menu);
  }

  updateMenu(id: number, menu: FormData): Observable<Menu> {
    return this.http.put<Menu>(`${this.baseUrl}/${id}`, menu);
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
