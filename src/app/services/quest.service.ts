import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quest } from 'app/models/QuestModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  private quest = new BehaviorSubject<string>("");
  currentQuest = this.quest.asObservable();
  private baseUrl: string = "https://localhost:7151/api/Quest/";
  constructor(private http: HttpClient) { }

  sendQuest(quest: any) {
    this.quest.next(quest);
  }

  getCommonQuests(quest: any) {
    return this.http.get<any>(`${this.baseUrl}getcommonquests`, quest);
  }

  addNewQuest(quest: Quest): Observable<Quest> {
    return this.http.post<Quest>(`${this.baseUrl}addnewquest`, quest);
  }

  getUserQuest(quest: any) {
    return this.http.get<any>(`${this.baseUrl}getuserquest`, quest);
  }

  editUserQuest(quest: any) {
    return this.http.put<any>(`${this.baseUrl}edituserquest`, quest);
  }

  deleteUserQuest(questId: number) {
    return this.http.delete(`${this.baseUrl}deleteuserquest/${questId}`);
  }
}
