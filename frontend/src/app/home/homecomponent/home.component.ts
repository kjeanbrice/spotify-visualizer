import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as Feather from 'feather-icons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const token = this.route.snapshot.queryParamMap.get('access_token');
    }



    ngAfterViewInit() {
        Feather.replace();
    }
}
