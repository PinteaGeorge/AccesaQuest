import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'app/models/UserModel';
import { AuthService } from 'app/services/auth.service';
import { QuestService } from 'app/services/quest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.scss']
})
export class QuestsComponent implements OnInit {
  user: User[] = [];
  points: number = 0;
  quest: any;
  questList: any;
  userQuestList: any;
  randomUserQuestList: any;
  randomQuest: any;
  questForm!: FormGroup;
  constructor(private questService: QuestService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.questForm = this.formBuilder.group({
      userId: [''],
      questName: ['', Validators.required],
      questBody: ['', Validators.required],
      questXp: ['10', Validators.required],
      questPoints: ['', Validators.required]
    })
    this.getQuests();
    this.getUserProfile();
    this.getUserQuest();
    this.questService.currentQuest.subscribe(res => this.quest = res);
  }

  getQuests() {
    this.questService.getCommonQuests(this.questList).subscribe({
      next: res => {
        this.questList = res;
        this.randomQuest = this.getRandomQuest(this.questList, 3);
      },
      error: err => err.error.message
    })
  }

  getRandomQuest(arr: any, num: any) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  sendToDashboard(item: any) {
    this.questService.sendQuest(item);
  }

  getUserProfile() {
    var token = this.authService.decodedToken();
    this.authService.getUserProfile(token.nameid).subscribe({
      next: res => {
        this.points = res.points;
        this.user.push(res);
      },
      error: err => err.error.message
    })
  }

  onSubmit() {
    this.questForm.get('userId')?.patchValue(this.user[0].id);
    if (this.points >= this.questForm.value.questPoints) {
      this.questService.addNewQuest(this.questForm.value).subscribe({
        next: res => {
          this.userQuestList.push(res);
          this.toastr.success('Quest created with success!', 'Succes', {
            positionClass: 'toast-bottom-right'
          });
        },
        error: err => err.error.message
      })
    } else {
      this.toastr.error('You do not have enough points to create a new quest!', 'Danger', {
        positionClass: 'toast-bottom-right'
      });
    }
  }

  getUserQuest() {
    this.questService.getUserQuest(this.userQuestList).subscribe({
      next: res => {
        this.userQuestList = res;
        this.randomUserQuestList = this.getRandomQuest(this.userQuestList, 3);
      },
      error: err => err.error.message
    })
  }

  editUserQuest(item: any) {

  }

  cancelUserQuest(item: any) {
    console.log(this.randomUserQuestList);
    this.randomUserQuestList.splice(1, 0);
    this.questService.deleteUserQuest(item.id).subscribe({
      next: res => {
        this.toastr.warning('Quest deleted with success!', 'warning', {
          positionClass: 'toast-bottom-right'
        });
      },
      error: err => err.error.message
    })
  }
}
