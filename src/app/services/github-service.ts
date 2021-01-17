import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Octokit } from '@octokit/core';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class GithubService {
    octokit: any;
    constructor(private httpClient: HttpClient) { 
        this.octokit = new Octokit({
            auth: environment.GITHUB_TOKEN,
            baseUrl: "https://api.github.com",
        });
    }

    async getUserProfile(){
        return this.octokit.request('GET /user');
    }

    async getUserRepositoryList(url: string){
        return this.octokit.request(`GET ${url}`, {
            'sort' : 'createdAt',
            'per_page' : 100
        });
    }

    async searchRepository(label: string){
        return this.octokit.request('GET /search/repositories',{
            q: label
        })
    }
}