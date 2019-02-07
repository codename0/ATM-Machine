import { Component } from '@angular/core';
import { User } from './_models/index';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {


    currentUser: User;
    users: User[] = [];

}