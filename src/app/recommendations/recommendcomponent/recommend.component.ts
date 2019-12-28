import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {SpotifyService} from '../../core/services/spotify/spotify.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as Feather from 'feather-icons';

@Component({
    selector: 'app-recommend',
    templateUrl: './recommend.component.html',
    styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit, AfterViewChecked {

    menuOptions = {
        playlists: 'active'
    };

    loadingStatus: string;
    map: Map<string, number>;
    playlistData: any;
    playlistTracks: any[];
    recommendedTracks: any[];

    constructor(private route: ActivatedRoute, private router: Router, private spotifyService: SpotifyService) {
        this.loadingStatus = '';
        this.map = new Map<string, number>();

        this.playlistData = {};
        this.playlistTracks = [];
        this.recommendedTracks = [];

        this.map.set('getPlaylistTracks', 0);
        this.map.set('getPlaylist', 0);
        this.map.set('getRecommendedTracks', 0);
    }

    async ngOnInit() {
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
                    playlistImage: res.images[0].url,
                    playlistName: res.name,
                    totalTracks: res.tracks.total,
                    playlistOwner: res.owner.display_name
                };
            },
            (err) => {
                console.log('Recommended: Unable to load playlist data');
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

                    const seed = this.spotifyService.getSeedTracks(this.playlistTracks, 1);
                    this.getRecommendedTracks({
                        limit: 20,
                        seed_tracks: seed,
                        max_instrumentalness: 0.35
                    });
                    return;
                }
                this.getPlaylistTracks(res.next, playlistid, null, data);
            },
            (err) => {
                this.map.delete('getRecommendedTracks');
                this.checkLoadingStatus();
            }
        ).add(() => {
            this.map.delete('getPlaylistTracks');
            this.checkLoadingStatus();
        });

    }

    getRecommendedTracks(opts: any) {
        this.spotifyService.getRecommendedTracks(opts).subscribe(
            (res) => {
                const items = res.tracks;
                const data = [];
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < items.length; i++) {
                    const track = {
                        duration: this.spotifyService.parseDurationFromMs(parseInt(items[i].duration_ms, 10)),
                        trackName: items[i].name,
                        albumName: items[i].album.name,
                        artists: this.spotifyService.parseArtistsFromTopTrack(items[i].artists),
                        albumImage: items[i].album.images[2].url,
                        trackID: items[i].id
                    };
                    data.push(track);
                }
                this.recommendedTracks = data;
            },
            (err) => {
                console.log('Recommended: Unabled to get recommended tracks');
            }
        ).add(() => {
            this.map.delete('getRecommendedTracks');
            this.checkLoadingStatus();
        });

    }

    ngAfterViewChecked() {
        Feather.replace();
    }

    onClickTrack(id: string) {
        this.router.navigate(['/track'], {queryParams: {
            id
        }});
    }

    checkLoadingStatus() {
        if (this.map.size === 0) {
            this.loadingStatus = 'hide-content';
        }
    }
}
