import {Component, AfterViewInit} from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
    selector: 'app-recentsongs',
    styleUrls: ['./recentsongs.component.css'],
    templateUrl: './recentsongs.component.html'
})
export class RecentSongsComponent implements AfterViewInit {
    menuOptions: object = {
        profile: '',
        playlists: '',
        topartists: '',
        toptracks: '',
        recentsongs: 'active'
    };

    constructor() {}
    ngAfterViewInit() {
        Feather.replace();
    }
}
