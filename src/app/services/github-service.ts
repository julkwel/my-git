import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Octokit } from '@octokit/core';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class GithubService {
    constructor(private httpClient: HttpClient) { }
    
    getOctokit(){
        return new Octokit({
            auth: environment.GITHUB_TOKEN,
            baseUrl: "https://api.github.com",
        });
    }

    async getRepositoryList(){
        const octokit = this.getOctokit();

        return octokit.request('GET /user');
    }
}