import {Component, OnInit, AfterViewInit, AfterViewChecked} from '@angular/core';
import {SpotifyService} from '../../core/services/spotify/spotify.service';
import {ActivatedRoute} from '@angular/router';
import * as Feather from 'feather-icons';
import { stringify } from 'querystring';


@Component({
    selector: 'app-track',
    templateUrl: './track.component.html',
    styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit, AfterViewInit, AfterViewChecked {
    menuOptions: object = {
        profile: '',
        playlists: '',
        topartists: '',
        toptracks: 'active',
        recentsongs: ''
    };

    loadingStatus: string;
    map: Map<string, number>;
    trackData: any;

    constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {
        this.map = new Map<string, number>();
        this.map.set('getTrack', 0);
        this.trackData = {};
    }

    ngOnInit() {
        const trackid = this.route.snapshot.queryParamMap.get('id');
        this.getTrack(trackid);
    }

    getTrack(trackid: string) {
        this.spotifyService.getTrack(trackid).subscribe(
            (res) => {
                this.trackData = {
                    album: res.album.name,
                    artists: this.spotifyService.parseArtistsFromTopTrack(res.artists),
                    trackName: res.name,
                    albumImage: res.album.images[0].url,
                    playLink: res.external_urls.spotify,
                    albumLink: res.album.external_urls.spotify
                };
            },
            (err) => {
                console.log('Profile: Unable to load track');
            }
        ).add(() => {
            this.map.delete('getTrack');
            this.checkLoadingStatus();
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


}
