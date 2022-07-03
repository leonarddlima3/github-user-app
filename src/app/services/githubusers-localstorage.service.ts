import { Injectable } from '@angular/core';
import {ServiceConstants} from '../constants/service-constants';
import {LocalConstants} from '../constants/local-constants';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GithubUsersLocalStorageService {
    
    constructor() { }

    getGithubUserByUsername(username: string): any {
        const githubUsersList = this.getGithubUsers();
        return githubUsersList.find((githubUserObj: any) => githubUserObj.githubUser === username );
    }

    getGithubUsers(): Array<{ githubUser: string; name: string; isPresent: string }> {
        const githubUsersList = localStorage.getItem(LocalConstants.LOCALSTORAGE_GITHUB_KEY);
        return githubUsersList ? JSON.parse(githubUsersList) : [];
    }

    setGithubUserByUsername(userName: Array<{ githubUser: string; name: string; isPresent: string }>) {
        return localStorage.setItem(LocalConstants.LOCALSTORAGE_GITHUB_KEY, JSON.stringify((userName)));
    }

    clearGithubUserSearchList() {
        return localStorage.removeItem(LocalConstants.LOCALSTORAGE_GITHUB_KEY);
    }
}