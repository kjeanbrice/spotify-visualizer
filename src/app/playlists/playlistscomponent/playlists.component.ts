import {Component, AfterViewInit, AfterViewChecked} from '@angular/core';
import * as Feather from 'feather-icons';
import {} from '@angular/common';

@Component({
    selector: 'app-playlists',
    styleUrls: ['./playlists.component.css'],
    templateUrl: './playlists.component.html'
})
export class PlaylistsComponent implements AfterViewInit, AfterViewChecked {
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

    ngAfterViewChecked(): void {
        Feather.replace();
    }
}
