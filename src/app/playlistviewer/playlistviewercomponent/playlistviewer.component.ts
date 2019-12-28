import { Component, AfterViewInit, AfterViewChecked, OnInit } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify/spotify.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as Feather from 'feather-icons';

@Component({
    selector: 'app-playerlistviewer',
    templateUrl: './playlistviewer.component.html',
    styleUrls: ['./playlistviewer.component.css']
})
export class PlaylistViewerComponent implements AfterViewInit, OnInit, AfterViewChecked {
    menuOptions: object = {
        profile: '',
        playlists: 'active',
        topartists: '',
        toptracks: '',
        recentsongs: ''
    };

    loadingStatus: string;
    map: Map<string, number>;
    playlistData: any;
    playlistTracks: any[];

    constructor(private router: Router, private spotifyService: SpotifyService, private route: ActivatedRoute) {
        this.loadingStatus = '';
        this.map = new Map<string, number>();
        this.playlistData = [];
        this.playlistTracks = [];

        this.map.set('getPlaylistTracks', 0);
        this.map.set('getPlaylist', 0);

    }

    ngOnInit() {
        const playlistid = this.route.snapshot.queryParamMap.get('id');

        this.getPlaylist(playlistid);
        this.getPlaylistTracks(null, playlistid, null, []);
     }

    getPlaylist(playlistid: string) {
        this.spotifyService.getPlaylist(playlistid, { limit: 1}).subscribe(
            (res) => {
                this.playlistData = {
                    playlistID: res.id,
                    description: res.description,
                    externalURL: res.external_urls.spotify,
                    playlistImage: res.images[0].url,
                    playlistName: res.name,
                    totalTracks: res.tracks.total,
                    playlistOwner: res.owner.display_name
                };
            },
            (err) => {
                console.log('Playlist: Unable to load playlist data');
            }
        ).add(() => {
            this.map.delete('getPlaylist');
            this.checkLoadingStatus();
        });

    }

    getPlaylistTracks(link: string, playlistid: string, opts: any, data: any) {
        this.spotifyService.getPlaylistTracks(link, playlistid, opts).subscribe(
            (res) => {
                const item = res.items;
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < item.length; i++) {
                    if (item[i].track === null) {
                        continue;
                    }
                    const track = {
                        duration: this.spotifyService.parseDurationFromMs(parseInt(item[i].track.duration_ms, 10)),
                        trackName: item[i].track.name,
                        albumName: item[i].track.album.name,
                        artists: this.spotifyService.parseArtistsFromTopTrack(item[i].track.artists),
                        albumImage: item[i].track.album.images[2].url,
                        trackID: item[i].track.id
                    };
                    data.push(track);
                }

                if (res.next === null) {
                    this.playlistTracks = data;
                    return;
                }
                this.getPlaylistTracks(res.next, playlistid, null, data);
            },
            (err) => {
                console.log('Playlist:Unable to load playlist tracks');
            }
        ).add(() => {
            this.map.delete('getPlaylistTracks');
            this.checkLoadingStatus();
        });

    }

    onClickRecommedations(playlistid: string, playlistName: string) {
        this.router.navigate(['/recommended'], {
            queryParams: {
                name: playlistName,
                id: playlistid
        }
    });
    }
    ngAfterViewInit() {
        Feather.replace();
    }

    ngAfterViewChecked() {
        Feather.replace();
    }

    checkLoadingStatus() {
        if (this.map.size === 0) {
            this.loadingStatus = 'hide-content';
        }
    }

    onClickTrack(id: string) {
        this.router.navigate(['/track'], {
            queryParams: {
                id
            }
        });
    }

}
