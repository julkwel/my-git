import { Component, OnInit } from '@angular/core';
import { Repos } from '../model/repos';
import { GithubUser } from '../model/user';
import { GithubService } from '../services/github-service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  githubBg: any = 'assets/github-bg.png';
  user: GithubUser = new GithubUser();
  loading: boolean = false;
  loadingRepo: boolean = false;
  userRepos: Repos[] = [];

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.getUser().then((res: any) => {
      this.user = res.data;
      this.loading = false;

      this.loadingRepo = true;
      this.getRepos(this.user.repos_url);
    })
  }

  async getUser() {
    return await this.githubService.getUserProfile();
  }

  async getRepos(url: string) {
    const res = await this.githubService.getUserRepositoryList(url);
    this.userRepos = res.data;
    this.loadingRepo = false;
  }
}
