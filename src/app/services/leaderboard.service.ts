import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  private baseUrl: string = "https://localhost:7151/api/LeaderboardTable/";
  constructor(private http: HttpClient) { }

  getLeaderboardTable() {
    return this.http.get(`${this.baseUrl}getleaderboard`);
  }
}
