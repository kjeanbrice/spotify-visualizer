import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify/spotify.service';
import { ActivatedRoute } from '@angular/router';
import * as Feather from 'feather-icons';

@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit, AfterViewChecked {

    menuOptions = {
        topartists: 'active'
    };

    loadingStatus: string;
    map: Map<string, number>;

    artistData: any;
    isFollowing: boolean;

    constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {
        this.loadingStatus = '';
        this.map = new Map<string, number>();

        this.isFollowing = false;
        this.artistData = {};
        this.map.set('getArtist', 0);
        this.map.set('isFollowingArtist', 0);
    }

    ngOnInit() {
        const artistid = this.route.snapshot.queryParamMap.get('id');
        this.getArtist(artistid);
        this.isFollowingArtist(artistid);
    }

    public getArtist(artistid: string) {
        this.spotifyService.getArtist(artistid).subscribe(
            (res) => {
                console.log(JSON.stringify(res));
                this.artistData = {
                    followerCount: res.followers.total,
                    image: res.images[0].url,
                    name: res.name,
                    popularity: res.popularity,
                    genres: res.genres
                };
            },
            (err) => {
                console.log('Artist: cannot load artist data');
            }
        ).add(() => {
            this.map.delete('getArtist');
            this.checkLoadingStatus();
        }
        );

    }

    public isFollowingArtist(artistid: string) {

        const data = [];
        data.push(artistid);
        this.spotifyService.isFollowingArtistsOrUsers(data, 'artist').subscribe(
            (res) => {
                console.log('T:' + JSON.stringify(res));
            },
            (err) => {
                console.log('Artist: unable to determine if user if following artist');
            }
        ).add(() => {
            this.map.delete('isFollowingArtist');
            this.checkLoadingStatus();
        });
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
