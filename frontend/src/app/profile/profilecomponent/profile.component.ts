import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
declare var jQuery: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
    constructor() { }
    ngOnInit() {
    }

    ngAfterViewInit() {
        Feather.replace();
    }
}
