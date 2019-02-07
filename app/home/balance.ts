import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class Balance {

    constructor(private router: Router) {
    }

}