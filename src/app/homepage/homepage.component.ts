import { Component, OnInit } from '@angular/core';
import { GithubUser } from '../model/user';
import {GithubService} from '../services/github-service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  payload: GithubUser[] = [];
  loading: boolean = false;
  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.loading = true;
    this.githubService.getRepositoryList().then((res : any) => {
      this.payload = [res.data];
      this.loading = false;
    })
  }
}
