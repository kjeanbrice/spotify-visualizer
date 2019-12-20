import {Component, OnInit, AfterViewInit} from '@angular/core';
import * as Feather from 'feather-icons';


@Component({
    selector: 'app-track',
    templateUrl: './track.component.html',
    styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit, AfterViewInit {
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
