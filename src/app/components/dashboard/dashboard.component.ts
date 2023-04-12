import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/models/UserModel';
import { AuthService } from 'app/services/auth.service';
import { QuestService } from 'app/services/quest.service';
import { UserStoreService } from 'app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User[] = [];
  userQuestList: any;
  quest: any;
  otherUserQuestList: any;
  randomOtherUserQuestList: any;
  randomQuest: any;
  public fullName: string = "";
  constructor(private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userStore: UserStoreService,
    private questService: QuestService) { }

  ngOnInit(): void {
    this.userStore.getFullNameFromStore().subscribe(res => {
      let fullNameFromToken = this.authService.getFullNameFromToken();
      this.fullName = res || fullNameFromToken;
    });
    this.questService.currentQuest.subscribe(res => this.quest = res);
    this.getUserProfile();
    this.getOtherUserQuest();
  }

  logout() {
    this.authService.logout();
  }

  getUserProfile() {
    var token = this.authService.decodedToken();
    this.authService.getUserProfile(token.nameid).subscribe({
      next: res => {
        this.user.push(res);
        console.log(this.user);
      },
      error: err => err.error.message
    })
  }

  getRandomQuest(arr: any, num: any) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  getUserQuest() {
    this.questService.getUserQuest(this.userQuestList).subscribe({
      next: res => {
        this.userQuestList = res;
        this.randomQuest = this.getRandomQuest(this.userQuestList, 3);
      },
      error: err => err.error.message
    })
  }

  getOtherUserQuest() {
    var token = this.authService.decodedToken();
    this.questService.getOtherUserQuest(token.nameid).subscribe({
      next: res => {
        this.otherUserQuestList = res;
        this.randomOtherUserQuestList = this.getRandomQuest(this.otherUserQuestList, 3);
      },
      error: err => err.error.message
    })
  }

  questCompleted() {

  }

  takeQuest(item: any) {

  }
}
