import {Component, AfterViewInit, OnInit, AfterViewChecked} from '@angular/core';
import {SpotifyService} from '../../core/services/spotify/spotify.service';
import {Router} from '@angular/router';
import * as Feather from 'feather-icons';

@Component({
    selector: 'app-recentsongs',
    styleUrls: ['./recentsongs.component.css'],
    templateUrl: './recentsongs.component.html'
})
export class RecentSongsComponent implements AfterViewInit, OnInit, AfterViewChecked {
    menuOptions: object = {
        profile: '',
        playlists: '',
        topartists: '',
        toptracks: '',
        recentsongs: 'active'
    };

    recentlyPlayedTracksData: any[];
    loadingStatus: string;
    map: Map<string, number>;

    constructor(private spotifyService: SpotifyService, private router: Router) {
        this.recentlyPlayedTracksData = [];
        this.loadingStatus = '';
        this.map = new Map();
        this.map.set('getRecentlyPlayedTracks', 0);

    }
    ngAfterViewInit() {
        Feather.replace();
    }

    ngOnInit() {
        this.getRecentlyPlayedTracks(null, {limit: 30}, 'tracks', []);
        Feather.replace();
    }

    ngAfterViewChecked(): void {
        Feather.replace();
    }


    getRecentlyPlayedTracks(addr: string, opts: any, type: string, results: any[]) {
        this.spotifyService.getUsersRecentlyPlayedTracks(addr, opts).subscribe(
            (res) => {
                const item = res.items;
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < item.length; i++) {
                    const track = {
                        duration: this.spotifyService.parseDurationFromMs(parseInt(item[i].track.duration_ms, 10)),
                        trackName: item[i].track.name,
                        albumName: item[i].track.album.name,
                        artists: this.spotifyService.parseArtistsFromTopTrack(item[i].track.artists),
                        albumImage: item[i].track.album.images[2].url,
                        trackID: item[i].track.id
                    };
                    results.push(track);
                }

                if (res.next === null) {
                    this.recentlyPlayedTracksData = results;
                } else {
                    this.getRecentlyPlayedTracks(res.next, null, 'tracks', results);
                }
            },
            (err) => {
                console.log('Profile: Unable to load top tracks');
            }
        ).add(() => {
            this.map.delete('getRecentlyPlayedTracks');
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
