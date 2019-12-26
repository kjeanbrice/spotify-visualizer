import {Component, AfterViewInit, AfterViewChecked, OnInit} from '@angular/core';
import * as Feather from 'feather-icons';
import {Router} from '@angular/router';
import {SpotifyService} from '../../core/services/spotify/spotify.service';


@Component({
    selector: 'app-playlists',
    styleUrls: ['./playlists.component.css'],
    templateUrl: './playlists.component.html'
})
export class PlaylistsComponent implements AfterViewInit, AfterViewChecked, OnInit {
    menuOptions: object = {
        profile: '',
        playlists: 'active',
        topartists: '',
        toptracks: '',
        recentsongs: ''
    };

    loadingStatus: string;
    map: Map<string, number>;
    playlistData: any[];


    constructor(private spotifyservice: SpotifyService, private router: Router) {
        this.loadingStatus = '';
        this.map = new Map<string, number>();

        this.map.set('getPlaylists', 0);
        this.playlistData = [];
    }

    ngOnInit() {
        this.getPlaylists(null, [], { limit: 1 });
    }

    getPlaylists(link: string, data: any[], options: any) {
        this.spotifyservice.getUsersPlaylist(link, options).subscribe(
             (res) => {
                const items = res.items;

                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < items.length; i++) {
                    const item = {
                        playlistID: items[i].id,
                        playlistImage: items[i].images[0].url,
                        playlistName: items[i].name,
                        totalTracks: items[i].tracks.total
                    };

                    data.push(item);
                }

                if (res.next === null) {
                    this.playlistData = data;
                    return;
                }
                this.getPlaylists(res.next, data, null);
             },
             (err) => {
                 console.log('Playlist: playlists are unable to be loaded');
             }
        ).add(() => {
            this.map.delete('getPlaylists');
            this.checkLoadingStatus();
        });
    }

    ngAfterViewInit() {
        Feather.replace();
    }

    ngAfterViewChecked(): void {
        Feather.replace();
    }

    checkLoadingStatus() {
        if (this.map.size === 0) {
            this.loadingStatus = 'hide-content';
        }
    }

    onClickPlaylist(id: string) {
        this.router.navigate(['/playlist'], {queryParams: {
            id
        }});
    }
}
