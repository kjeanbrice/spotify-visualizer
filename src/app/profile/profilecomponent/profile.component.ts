import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import * as Feather from 'feather-icons';
import {SpotifyService} from '../../core/services/spotify/spotify.service';
import {Router} from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit, AfterViewChecked {
    menuOptions: object = {
        profile: 'active',
        playlists: '',
        topartists: '',
        toptracks: '',
        recentsongs: ''
    };

    loadingStatus: string;
    profileData: any;
    toptracksData: any[];
    topArtistsData: any[];
    map: Map<string, number>;

    constructor(private spotifyService: SpotifyService, private router: Router) {
        this.profileData = {
            followerCount: 0,
            followingCount: 0,
            playlistCount: 0,
            profileImage: null,
            displayName: null
        };

        this.toptracksData = [];
        this.topArtistsData = [];
        this.map = new Map();
        this.loadingStatus = '';

        this.map.set('getFollowedArtist', 0);
        this.map.set('getProfileData', 0);
        this.map.set('getUserPlaylists', 0);
        this.map.set('getTopTracks', 0);
        this.map.set('getTopArtists', 0);
    }
    ngOnInit() {
       this.getProfileData();
       this.getFollowedArtist();
       this.getUserPlaylists();
       this.getTopTracks();
       this.getTopArtists();

    }

    ngAfterViewChecked(): void {
        Feather.replace();
    }

    getProfileData() {
        this.spotifyService.getUserProfile().subscribe(
            response => {
                this.profileData.followerCount = response.followers.total;
                const imgs = response.images;
                if (imgs.length !== 0) {
                    this.profileData.profileImage = imgs[0].url;
                }
                this.profileData.displayName = response.display_name;
            },
            err => {
                console.log('Profile:Unable to load profile data.');
            },
        ).add( () => {
            this.map.delete('getProfileData');
            this.checkLoadingStatus();
        });
    }

    getFollowedArtist() {
        this.spotifyService.getUsersFollowedArtists(null).subscribe(
            (res) => {
                this.profileData.followingCount = res.artists.total;
            },
            (err) => {
                console.log('Profile: Unable to load following data.');
            }
        ).add(() => {
            this.map.delete('getFollowedArtist');
            this.checkLoadingStatus();
        });
    }

    getUserPlaylists() {
        this.spotifyService.getUsersPlaylist(null, null).subscribe(
            (res) => {
                this.profileData.playlistCount = res.total;
            },
            (err) => {
                console.log('Profile: Unable to load playlist data');
            }
        ).add(() => {
            this.map.delete('getUserPlaylists');
            this.checkLoadingStatus();
        });
    }


    getTopTracks() {
        this.spotifyService.getTopAnalytics(null, {limit: 10}, 'tracks').subscribe(
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
                    this.toptracksData.push(track);
                }
            },
            (err) => {
                console.log('Profile: Unable to load top tracks');
            }
        ).add(() => {
            this.map.delete('getTopTracks');
            this.checkLoadingStatus();
        });
    }


    getTopArtists() {
        this.spotifyService.getTopAnalytics(null, {limit: 10}, 'artists').subscribe(
            (res) => {
                const item = res.items;
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < item.length; i++) {
                    const artist = {
                        artistName: item[i].name,
                        artistImage: item[i].images[2].url,
                        artistID: item[i].id
                    };
                    this.topArtistsData.push(artist);
                }
            },
            (err) => {
                console.log('Profile: Unable to load top artist');
            }
        ).add(() => {
            this.map.delete('getTopArtists');
            this.checkLoadingStatus();
        });
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

    ngAfterViewInit() {
        Feather.replace();
    }
}
