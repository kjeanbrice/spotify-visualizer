import {Component, AfterViewInit, OnInit, AfterViewChecked} from '@angular/core';
import {SpotifyService} from '../../core/services/spotify/spotify.service';
import {Router} from '@angular/router';
import * as Feather from 'feather-icons';


@Component({
    selector: 'app-toptracks',
    templateUrl: './toptracks.component.html',
    styleUrls: ['./toptracks.component.css']
})
export class TopTracksComponent implements AfterViewInit, OnInit, AfterViewChecked {
    menuOptions: object = {
        profile: '',
        playlists: '',
        topartists: '',
        toptracks: 'active',
        recentsongs: ''
    };

    searchOptions: object = {
        longterm: 'active',
        mediumterm: '',
        shortterm: ''
    };

    currentSearchFilter: string;
    loadingStatus: string;
    map: Map<string, number>;

    topTracksData: any[];
    constructor(private spotifyService: SpotifyService, private router: Router) {
        this.topTracksData = [];
        this.currentSearchFilter = 'long_term';
        this.loadingStatus = '';
        this.map = new Map();
        this.map.set('getTopTracks', 0);
    }
    ngOnInit() {
        this.getTopTracks(null, {limit: 30, time_range: this.currentSearchFilter}, 'tracks', []);
    }

    ngAfterViewInit() {
        Feather.replace();
    }

    ngAfterViewChecked(): void {
        Feather.replace();
    }

    changeSearchFilter(newFilter: string) {
        if (this.currentSearchFilter === newFilter) {
            return;
        }

        switch (newFilter) {
            case 'long_term':
                this.searchOptions = {
                    longterm: 'active',
                    mediumterm: '',
                    shortterm: ''
                };
                this.currentSearchFilter = 'long_term';
                break;
            case 'medium_term':
                this.searchOptions = {
                    longterm: '',
                    mediumterm: 'active',
                    shortterm: ''
                };
                this.currentSearchFilter = 'medium_term';
                break;
            case 'short_term':
                this.searchOptions = {
                    longterm: '',
                    mediumterm: '',
                    shortterm: 'active'
                };
                this.currentSearchFilter = 'short_term';
                break;
        }
    }

    getTopTracks(addr: string, opts: any, type: string, results: any[]) {
        this.spotifyService.getTopAnalytics(addr, opts, type).subscribe(
            (res) => {
                const item = res.items;
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < item.length; i++) {
                    const track = {
                        duration: this.spotifyService.parseDurationFromMs(parseInt(item[i].duration_ms, 10)),
                        trackName: item[i].name,
                        albumName: item[i].album.name,
                        artists: this.spotifyService.parseArtistsFromTopTrack(item[i].artists),
                        albumImage: item[i].album.images[2].url,
                        trackID: item[i].id
                    };
                    results.push(track);
                }

                if (res.next === null) {
                    this.topTracksData = results;
                } else {
                    this.getTopTracks(res.next, null, 'tracks', results);
                }
            },
            (err) => {
                console.log('Profile: Unable to load top tracks');
            }
        ).add(() => {
            this.map.delete('getTopTracks');
            this.checkLoadingStatus();
        }
        );
    }

    checkLoadingStatus() {
        if (this.map.size === 0) {
            this.loadingStatus = 'hide-content';
        }
    }
    onClickTrack(id: string) {
        this.router.navigate(['/track'], {queryParams: {
            id
        }});
    }
}
