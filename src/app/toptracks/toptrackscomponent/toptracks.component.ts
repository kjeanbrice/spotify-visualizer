import {Component, AfterViewInit, OnInit} from '@angular/core';
import * as Feather from 'feather-icons';


@Component({
    selector: 'app-toptracks',
    templateUrl: './toptracks.component.html',
    styleUrls: ['./toptracks.component.css']
})
export class TopTracksComponent implements AfterViewInit, OnInit {
    menuOptions: object = {
        profile: '',
        playlists: '',
        topartists: '',
        toptracks: 'active',
        recentsongs: ''
    };

    constructor() { }
    ngOnInit() {
    }

    ngAfterViewInit() {
        Feather.replace();
    }
}
