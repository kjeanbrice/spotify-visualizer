import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Feather from 'feather-icons';
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

    constructor() { }
    ngOnInit() {
    }

    ngAfterViewInit() {
        Feather.replace();
    }
}
