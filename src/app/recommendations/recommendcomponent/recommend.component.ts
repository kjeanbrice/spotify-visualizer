import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {SpotifyService} from '../../core/services/spotify/spotify.service';
import {ActivatedRoute} from '@angular/router';
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

    constructor(private routes: ActivatedRoute, private spotifyService: SpotifyService) {
        this.loadingStatus = 'hide-content';
        this.map = new Map<string, number>();
    }

    ngOnInit() {
    }

    ngAfterViewChecked() {
        Feather.replace();
    }

}
