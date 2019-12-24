import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ERROR_INVALID_TOKEN } from '../../../constants/constants.export';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    TOKEN_TIMESTAMP = 'spotify_token_timestamp';
    ACCESS_TOKEN = 'spotify_access_token';
    EXPIRATION_TIME = 1800 * 1000;


    constructor(private http: HttpClient) { }

    public setAccessToken(token: string): void {
        window.localStorage.setItem(this.TOKEN_TIMESTAMP, Date.now() + '');
        window.localStorage.setItem(this.ACCESS_TOKEN, token);
    }


    public getAccessToken(): string {
        return window.localStorage.getItem(this.ACCESS_TOKEN);
    }

    public authenticate(token: string): Observable<any> {
        if (token === null || token === undefined) {
            return this.errorHandler(ERROR_INVALID_TOKEN);
        }

        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        };

        const results = this.http.get('https://api.spotify.com/v1/me', httpOptions).pipe(
            map((response) => {
                this.setAccessToken(token);
                return response;
            }),
            catchError((err) => {
                return this.errorHandler(err);
            })
        );

        return results;
    }

    public getUserProfile(): Observable<any> {
        const token = this.getAccessToken();

        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        };

        const results = this.http.get('https://api.spotify.com/v1/me', httpOptions).pipe(
            map((response) => {
                return response;
            }),
            catchError((err) => {
                return this.errorHandler(err);
            })
        );

        return results;
    }


    public getTopAnalytics(link: string, opt: any, type: string): Observable<any> {

        if (opt === undefined || opt === null) {
            opt = {};
        }

        const token = this.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            }),
            params: opt
        };


        let addr = 'https://api.spotify.com/v1/me/top/' + type;
        if (link !== null) {
            addr = link;
        }
        const results = this.http.get(addr, httpOptions).pipe(
            map(response => {
                return response;
            }),
            catchError((err) => {
                return this.errorHandler(err);
            })
        );

        return results;
    }


    public getUsersPlaylist(opts: any): Observable<any> {
        if (opts === undefined || opts === null) {
            opts = {};
        }

        const token = this.getAccessToken();

        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            }),
            params: opts
        };

        const addr = 'https://api.spotify.com/v1/me/playlists';

        const results = this.http.get(addr, options).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                return this.errorHandler(error);
            })
        );

        return results;
    }

    public getUsersRecentlyPlayedTracks(link: string, opts: any): Observable<any> {
        if (opts === undefined || opts === null) {
            opts = {};
        }

        const token = this.getAccessToken();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            }),
            params: opts
        };

        let addr = 'https://api.spotify.com/v1/me/player/recently-played';
        if (link !== null) {
            addr = link;
        }

        const results = this.http.get(addr, options).pipe(
            map(response => {
                return response;
            }),
            catchError(err => {
                return this.errorHandler(err);
            })
        );

        return results;
    }

    public parseArtistsFromTopTrack(obj): string {
        let result = '';
        for (let i = 0; i < obj.length; i++) {
            if (i === obj.length - 1) {
                result += obj[i].name;
            } else {
                result += obj[i].name + ', ';
            }
        }

        return result;
    }

    public parseDurationFromMs(duration: number): string {
        duration = Math.floor(duration / 1000);
        return Math.floor(duration / 60)  + ':' + (duration % 60);
    }



    public getTrack(trackid: string) {
        const token = this.getAccessToken();

        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer' + token
            })
        };

        const addr = 'https://api.spotify.com/v1/tracks/' + trackid;
        const results = this.http.get(addr, options).pipe(
            map(response => {
                return response;
            }),
            catchError(err => {
                return this.errorHandler(err);
            })
        );

        return results;
    }



    public getUsersFollowedArtists(opts: any): Observable<any> {
        const token = this.getAccessToken();

        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            }),
            params: opts === null || opts === undefined ? {} : opts
        };

        const results = this.http.get('https://api.spotify.com/v1/me/following?type=artist', options).pipe(
            map(res => {
                return res;
            }),
            catchError(err => {
                return this.errorHandler(err);
            })
        );

        return results;
    }

    public refreshAccessToken(): Observable<any> {
        const token = this.getAccessToken();
        if (token === null || token === undefined) {
            return this.errorHandler(ERROR_INVALID_TOKEN);
        }
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        };

        const body = {
            params: {
                grant_type: 'refresh_token',
                refresh_token: token
            }
        };

        const results = this.http.post('https://accounts.spotify.com/api/token', body, httpOptions).pipe(
            map(response => {
                return response;
            }),
            catchError((err) => {
                return this.errorHandler(err);
            })
        );

        return results;

    }

    public errorHandler(err: any) {
        if (err) {
            return throwError(err);
        }

        return throwError('Server Error');
    }

}
