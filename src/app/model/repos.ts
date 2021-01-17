export class Repos {
    name!: string;
    full_name!: string;
    private!: boolean;
    html_url!: string;
    description!: string;
    fork!: boolean;
    stargazers_count!: number;
    watchers_count!: number;
    forks_count!: number;
    archived!: boolean;
    license!: {
        key: string,
        name: string,
        url: string;
    };
    forks!: number;
    open_issues!: number;
    watchers!: number;
}