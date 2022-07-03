import { Injectable } from '@angular/core';
import {ServiceConstants} from '../constants/service-constants';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GithubUsersOperationsService {
    private githubEndpoint: string = ServiceConstants.GITHUB_ENDPOINT;

    constructor(private http: HttpClient) { }

    callJsonGetRestApi(githubUsername: string):Observable<any> {
        return this.http.get(this.githubEndpoint + githubUsername)
            .pipe(
                map((data: any) => {
                    return data;
                }),
                catchError((error) => {
                    return of({
                        username: githubUsername
                    });
                })
            );
    }
}