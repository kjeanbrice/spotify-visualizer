import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    @Input() menuOptions: object;

    constructor() {
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
}
