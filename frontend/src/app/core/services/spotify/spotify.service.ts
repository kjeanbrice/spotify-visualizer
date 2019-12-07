import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    TOKEN_TIMESTAMP = 'spotify_token_timestamp';
    ACCESS_TOKEN = 'spotify_access_token';
    EXPIRATION_TIME = 1800 * 1000;


    constructor(private http: HttpClient) {}

    public setAccessToken(token: string): void {
        window.localStorage.setItem(this.TOKEN_TIMESTAMP, Date.now() + '');
        window.localStorage.setItem(this.ACCESS_TOKEN, token);
    }


    public getAccessToken(): string {
        return window.localStorage.getItem(this.ACCESS_TOKEN);
    }

    public refreshAccessToken(): boolean {
        const token = this.getAccessToken();
        if (token === null || token === undefined) {
            return false;
        }
        const httpOptions = {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token
            })
        };


    }

}
