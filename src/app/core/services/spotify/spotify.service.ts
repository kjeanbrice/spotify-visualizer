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

    public getPlaylistImage(playlistid: string): Observable<any> {

        const token = this.getAccessToken();

        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        };


        const addr = 'https://api.spotify.com/v1/playlists/' + playlistid + '/images';
        const results = this.http.get(addr, options).pipe(
            map((res) => {
                return res;
            }),
            catchError((err) => {
                return this.errorHandler(err);
            })
        );

        return results;
    }

    public getPlaylist(playlistid: string, opts: any): Observable<any> {
        if (opts === null || opts === undefined) {
            opts = {};
        }

        const token = this.getAccessToken();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            }),
            params: opts
        };


        const addr = 'https://api.spotify.com/v1/playlists/' + playlistid;
        const results = this.http.get(addr, options).pipe(
            map((res) => {
                return res;
            }),
            catchError((err) => {
                return this.errorHandler(err);
            })
        );

        return results;

    }



    public getPlaylistTracks(link: string, playlistid: string, opts: any): Observable<any> {
        if (opts === null || opts === undefined) {
            opts = {};
        }

        const token = this.getAccessToken();

        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            }),
            params : opts
        };

        let addr = 'https://api.spotify.com/v1/playlists/' + playlistid + '/tracks';
        if (link !== null) {
            addr = link;
        }

        const results = this.http.get(addr, options).pipe(
            map((res) => {
                return res;
            }),
            catchError((err) => {
                return this.errorHandler(err);
            })
        );

        return results;
    }


    public getUsersPlaylist(link: string, opts: any): Observable<any> {
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

        let addr = 'https://api.spotify.com/v1/me/playlists';
        if (link !== null) {
            addr = link;
        }
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
        duration = duration / 1000;
        const hours = Math.floor(duration / 3600);
        duration = duration % 3600;

        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);



        let result = '';
        result += (hours === 0) ? '' : hours + ':';
        result += (hours !== 0 && minutes < 10) ? ('0' + minutes + ':') : minutes + ':';
        result += (seconds < 10) ? ('0' + seconds) : seconds;
        return result;
    }



    public getTrack(trackid: string): Observable<any> {
        const token = this.getAccessToken();

        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
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

    public getArtist(artistid: string): Observable<any> {
        const token = this.getAccessToken();

        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        };

        const addr = 'https://api.spotify.com/v1/artists/' + artistid;
        const results = this.http.get(addr, options).pipe(
            map((res) => {
                return res;
            }),
            catchError((err) => {
                return this.errorHandler(err);
            })
        );

        return results;
    }

    public followArtistsOrUsers(ids: string[], type: string): Observable<any> {
        const token = this.getAccessToken();
        console.log(token);
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            }),
            params: {
                type
            }
        };

        const body = {
            ids
        };


        const addr = 'https://api.spotify.com/v1/me/following';

        const results = this.http.put(addr, body, options).pipe(
            map((res) => {
                return res;
            }),
            catchError((err) => {
                return this.errorHandler(err);
            })
        );

        return results;
    }


    public unFollowArtistsOrUsers(ids: string[], type: string): Observable<any> {
        const token = this.getAccessToken();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            }),
            params: {
                type
            },
            body: {
                ids
            }
        };

        const addr = 'https://api.spotify.com/v1/me/following';
        const results = this.http.delete(addr, options).pipe(
            map((res) => {
                return res;
            }),
            catchError((err) => {
                return this.errorHandler(err);
            })
        );

        return results;
    }



    public isFollowingArtistsOrUsers(ids: string[], type: string): Observable<any> {
        const token = this.getAccessToken();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            }),
            params: {
                type,
                ids
            }
        };


        const addr = 'https://api.spotify.com/v1/me/following/contains';

        const results = this.http.get(addr, options).pipe(
            map((res) => {
                return res;
            }),
            catchError((err) => {
                return this.errorHandler(err);
            })
        );

        return results;
    }


    public formatNumber(num: number): string {

        let result = '';
        let count = 0;
        while (num !== 0) {
            if (count % 3 === 0 && count !== 0) {
                result = ',' + result;
            }
            result = num % 10 + result;
            num = Math.floor(num / 10);
            console.log(num);
            count++;
        }

        return result;
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
