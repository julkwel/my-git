import { Component, OnInit } from '@angular/core';
import { Repos } from '../model/repos';
import { GithubUser } from '../model/user';
import { GithubService } from '../services/github-service';

const defaultTitle = 'LIST OF YOUR REPOSITORIES';
const searchTitle =  'SEARCH RESULTS';
const errorTitle = 'COULD NOT LOAD RESULTS';

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
  errorTitle: string = errorTitle;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.loadUserRepos();
  }

  loadUserRepos(){
    this.getUser().then((res: any) => {
      this.setUser(res.data);
      this.isLoading(false);

      this.isReposLoading(true)
      this.getRepos(this.user.repos_url);
    })
  }

  async getUser() {
    return await this.githubService.getUserProfile();
  }

  async getRepos(url: string) {
    const res = await this.githubService.getUserRepositoryList(url);
    this.setUserRepos(res.data);
    this.isReposLoading(false);
  }

  doSearch(evt: any){
    evt.preventDefault();

    if(this.search.length === 0){
      this.setTitle(defaultTitle);

      return this.loadUserRepos();
    }

    this.isReposLoading(true);
    this.githubService.searchRepository(this.search).then(res => {
      this.setUserRepos(res.data.items);
      this.isReposLoading(false);
      this.setTitle(searchTitle);
    });
  }

  setUser(userpayload : GithubUser){
    this.user = userpayload;
  }

  setUserRepos(userRepos: Repos[] = []){
    this.userRepos = userRepos;
  }

  isLoading(state: boolean = false){
    this.loading = state;
  }

  isReposLoading(state: boolean = false){
    this.loadingRepo = state;
  }

  setTitle(title: string = defaultTitle){
      this.title = title;
  }
}
