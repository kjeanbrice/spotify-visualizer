import {Component, AfterViewInit} from '@angular/core';
import * as Feather from 'feather-icons';
import {} from '@angular/common';

@Component({
    selector: 'app-playlists',
    styleUrls: ['./playlists.component.css'],
    templateUrl: './playlists.component.html'
})
export class PlaylistsComponent implements AfterViewInit {
    menuOptions: object = {
        profile: '',
        playlists: 'active',
        topartists: '',
        toptracks: '',
        recentsongs: ''
    };
    constructor() {}
    ngAfterViewInit() {
        Feather.replace();
    }
}
