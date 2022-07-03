import { Component, OnInit } from '@angular/core';
import { GithubUsersOperationsService } from './services/githubusers-operations.service'; 
import { GithubUsersLocalStorageService } from './services/githubusers-localstorage.service'; 
import { GithubUser } from './interface/github-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'github-user-app';
  githubData: Array<GithubUser> = [];
  githubHistoryData: Array<GithubUser> = [];
  columns: string[] = ['github-user', 'name'];
  historyColumns: string[] = ['github-user', 'name', 'is-present'];

  constructor(
    private githubUsersOperationsService: GithubUsersOperationsService,
    private githubUsersLocalStorageService: GithubUsersLocalStorageService
  ) {}

  ngOnInit(): void {}

  searchGithubUser(username: string) {
    if (!username || (!username && username.length > 2)) {
      return;
    }

    const alreadyPresentUser = this.githubUsersLocalStorageService.getGithubUserByUsername(username);
    this.githubHistoryData = [];
    if (alreadyPresentUser) {
      this.githubData = [alreadyPresentUser];
    } else {
      this.githubUsersOperationsService.callJsonGetRestApi(username)
        .subscribe((userData) => {
          const githubUsers = this.githubUsersLocalStorageService.getGithubUsers();
          githubUsers.push({
            githubUser: username,
            name: userData.name,
            isPresent: userData.id ? 'Present' : 'Not Present'
          });
          this.githubUsersLocalStorageService.setGithubUserByUsername(githubUsers);
          
          if (userData.id) {
            this.githubData = [{
              githubUser: username,
              name: userData.name,
              isPresent: userData ? 'Present' : 'Not Present'
            }];
          } else {
            this.githubData = [];
          }
          
        })
    }
    

  }

  searchGithubUserHistory() {
    const githubUsers = this.githubUsersLocalStorageService.getGithubUsers();
    this.githubData = [];
    this.githubHistoryData =  githubUsers;
  }

  clearGithubUserHistory() {
    this.githubUsersLocalStorageService.clearGithubUserSearchList();
    this.githubHistoryData = [];
  }

}
