import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Feather from 'feather-icons';
import {SpotifyService} from '../../core/services/spotify/spotify.service';
declare var jQuery: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
    menuOptions: object = {
        profile: 'active',
        playlists: '',
        topartists: '',
        toptracks: '',
        recentsongs: ''
    };

    profileData: any;
    toptracksData: any[];

    constructor(private spotifyService: SpotifyService) {
        this.profileData = {
            followerCount: 0,
            followingCount: 0,
            playlistCount: 0,
            profileImage: null,
            displayName: null
        };

        this.toptracksData = [];
    }
    ngOnInit() {
       this.getProfileData();
       this.getFollowedArtist();
       this.getUserPlaylists();
       this.getTopTracks();

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
            }
        );
    }

    getFollowedArtist() {
        this.spotifyService.getUsersFollowedArtists(null).subscribe(
            (res) => {
                this.profileData.followingCount = res.artists.total;
            },
            (err) => {
                console.log('Profile: Unable to load following data.');
            }
        );
    }

    getUserPlaylists() {
        this.spotifyService.getUsersPlaylist(null).subscribe(
            (res) => {
                this.profileData.playlistCount = res.total;
            },
            (err) => {
                console.log('Profile: Unable to load playlist data');
            }
        );
    }


    getTopTracks() {
        this.spotifyService.getTopTracks(null, 'tracks').subscribe(
            (res) => {
                const item = res.items;
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < item.length; i++) {
                    const track = {
                        duration: this.spotifyService.parseDurationFromMs(parseInt(item[i].duration_ms, 10)),
                        trackName: item[i].name,
                        albumName: item[i].album.name,
                        artists: this.spotifyService.parseArtistsFromTopTrack(item[i].artists),
                        albumImage: item[i].album.images[2].url
                    };
                    this.toptracksData.push(track);
                }
            },
            (err) => {
                console.log('Profile: Unable to load top tracks');
            }
        );
    }

    ngAfterViewInit() {
        Feather.replace();
    }
}
