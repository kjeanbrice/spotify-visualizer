import {Component, AfterViewInit, OnInit} from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
    selector: 'app-playerlistviewer',
    templateUrl: './playlistviewer.component.html',
    styleUrls: ['./playlistviewer.component.css']
})
export class PlaylistViewerComponent implements AfterViewInit, OnInit {
    menuOptions: object = {
        profile: '',
        playlists: 'active',
        topartists: '',
        toptracks: '',
        recentsongs: ''
    };
    ngAfterViewInit() {
        Feather.replace();
    }
    ngOnInit() {}
    constructor() {}
 }
