import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7151/api/User/"
  constructor(private http: HttpClient) { }

  signUp(user: any) {
    return this.http.post<any>(`${this.baseUrl}register`, user);
  }

  login(login: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, login);
  }
}
