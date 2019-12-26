import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {SpotifyService} from '../../core/services/spotify/spotify.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as Feather from 'feather-icons';

@Component({
    selector: 'app-topartists',
    templateUrl: './topartists.component.html',
    styleUrls: ['./topartists.component.css']
})
export class TopArtistsComponent implements OnInit, AfterViewChecked {

    menuOptions = {
        topartists: 'active'
    };

    topArtistsData: any[];
    loadingStatus: string;
    map: Map<string, number>;

    constructor(private routes: ActivatedRoute, private router: Router, private spotifyService: SpotifyService) {
        this.loadingStatus = '';
        this.map = new Map<string, number>();
        this.topArtistsData = [];
        this.map.set('getTopArtists', 0);
    }

    ngOnInit() {
        this.getTopArtists(null, null, 'artists', []);
    }

    ngAfterViewChecked() {
        Feather.replace();
    }

    getTopArtists(addr: string, opts: any, type: string, results: any[]) {
        this.spotifyService.getTopAnalytics(addr, opts, type).subscribe(
            (res) => {
                const items = res.items;
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < items.length; i++) {
                    const artist = {
                        name: items[i].name,
                        image: items[i].images[1].url,
                        id: items[i].id
                    };
                    results.push(artist);
                }

                if (res.next === null) {
                    this.topArtistsData = results;
                    console.log('R:' + JSON.stringify(this.topArtistsData));
                } else {
                    this.getTopArtists(res.next, null, 'artists', results);
                }
            },
            (err) => {
                console.log('Profile: Unable to load top artists');
            }
        ).add(() => {
            this.map.delete('getTopArtists');
            this.checkLoadingStatus();
        }
        );
    }

    checkLoadingStatus() {
        if (this.map.size === 0) {
            this.loadingStatus = 'hide-content';
        }
    }

    onClickArtist(id: string) {
        this.router.navigate(['/artist'], {queryParams: {
            id}
        });
    }

}
