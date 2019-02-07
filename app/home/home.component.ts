import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    balance: number;
    amount: number;

    twoThousandNotesDispansed  : number;
    fiveHundredNotesDispansed  : number;
    oneHundredNotesDispansed   : number;




    constructor(private userService: UserService,private fb: FormBuilder ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
         this.balance =this.currentUser.balance;
        this.createForm();
    }
    createForm() {
        this.withdrawalForm = this.fb.group({
            amount: ['', Validators.required ]
        });

    }


    withdrawalForm = new FormGroup ({
        amount: new FormControl()

    });

    withdraw() {
                console.log('withdraw Initiated !'+this.withdrawalForm.value);
                var withdrawAmount = JSON.stringify(this.withdrawalForm.value.amount);
                console.log(withdrawAmount);
                this.amount = parseInt(withdrawAmount);
        this.checkNotesCount();
    }


    checkNotesCount(){
       console.log('inside check balance');
       this.checkBalance();

    }

    checkBalance(){
    console.log('inside check balance limit & insufficient');
    if(this.amount%100!=0){
        alert('Incorrect Withdrawal Amount ( Enter Multiple of 100 )');
    }
   else if(this.amount>this.balance){
        alert('Not Sufficient Balance To Withdraw');
    }
 else if(this.amount>10000){
        alert('One Time Max. Limit is 10k. Please enter b/w 100-10k.');
    }

    else{
        this.commitTransaction();
        this.checkNotes();


    }

}

    checkNotes(){

        var rupees = new Array(2000, 500, 100);
        var count = new Array(0, 0, 0);
        var i;

        for (i = 0; i < rupees.length; i++) {
            if (rupees[i] < this.amount || rupees[i] == this.amount) {
                count[i] = this.amount / rupees[i];
                this.amount = this.amount % rupees[i];
            }
        }
        for ( i = 0; i < count.length; i++) {
            if (count[i] != 0) {

                alert(rupees[i] + "  : Notes : " + Math.floor(count[i]) + " = "
                    + (rupees[i] * Math.floor(count[i])));
                this.twoThousandNotesDispansed = Math.floor(count[0]);
                this.fiveHundredNotesDispansed = Math.floor(count[1]);
                this.oneHundredNotesDispansed = Math.floor(count [2]);
            }
        }

    }


    commitTransaction(){
        this.balance= this.balance- this.amount;
        console.log('Updating Balance .........');
        setTimeout(function(){ alert('Thank You For Using Ranbanka ATM .'); }, 3000);
    }

    resetCounter(){
        this.twoThousandNotesDispansed = null;
        this.fiveHundredNotesDispansed = null;
        this.oneHundredNotesDispansed = null;
    }

/*    withdrawal(form: ngForm ) {
        console.log('withdrawal request Initiated');

    }*/
    ngOnInit() {
/*        this.loadAllUsers();*/
    }

/*    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }*/

/*    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }*/
}