import { Component, OnInit } from '@angular/core';
import { Repos } from '../model/repos';
import { GithubUser } from '../model/user';
import { GithubService } from '../services/github-service';

const defaultTitle = 'LISTE OF YOUR REPOSITORIES';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  githubBg: any = 'assets/github-bg.png';
  githubReps: any = 'assets/github-reps.png';
  user: GithubUser = new GithubUser();
  loading: boolean = false;
  loadingRepo: boolean = false;
  userRepos: Repos[] = [];
  search: any = '';
  searchResults : Repos[] = [];
  title: string = defaultTitle;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.loadUserRepos();
  }

  loadUserRepos(){
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

  doSearch(evt: any){
    evt.preventDefault();

    if(this.search.length === 0){
      this.title = defaultTitle;

      return this.loadUserRepos();
    }

    this.loadingRepo = true;

    this.githubService.searchRepository(this.search).then(res => {
      this.userRepos = res.data.items;
      this.loadingRepo = false;
      this.title = 'SEARCH RESULTS'
    });
  }
}
