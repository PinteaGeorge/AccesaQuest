import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/UserModel';
import { LeaderboardService } from 'app/services/leaderboard.service';


@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {
  dataSource: any;
  constructor(private leaderboardService: LeaderboardService) { }
  user: User[] = [];
  ngOnInit(): void {
    this.getLeaderboardTable();
  }

  getLeaderboardTable() {
    this.leaderboardService.getLeaderboardTable().subscribe({
      next: res => {
        this.dataSource = res;
        console.log(res);
      },
      error: err => err.error.message
    })
  }
}
