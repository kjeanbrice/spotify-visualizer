import { Component, OnInit, Input } from '@angular/core';
import {SpotifyService} from '../../core/services/spotify/spotify.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    @Input() menuOptions: any;

    constructor(private spotifyService: SpotifyService, private router: Router) {
        if (this.menuOptions === undefined || this.menuOptions === null) {
            this.menuOptions = {
                profile: '',
                playlists: '',
                topartists: '',
                toptracks: '',
                recentsongs: ''
            };
        }
    }

    ngOnInit(): void {}

    onLogout(): void {
        this.spotifyService.deleteAccessToken();
        this.router.navigate(['']);
    }
}
