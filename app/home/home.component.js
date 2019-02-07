"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var index_1 = require("../_services/index");
var HomeComponent = (function () {
    function HomeComponent(userService, fb) {
        this.userService = userService;
        this.fb = fb;
        this.users = [];
        this.withdrawalForm = new forms_1.FormGroup({
            amount: new forms_1.FormControl()
        });
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.balance = this.currentUser.balance;
        this.createForm();
    }
    HomeComponent.prototype.createForm = function () {
        this.withdrawalForm = this.fb.group({
            amount: ['', forms_1.Validators.required]
        });
    };
    HomeComponent.prototype.withdraw = function () {
        console.log('withdraw Initiated !' + this.withdrawalForm.value);
        var withdrawAmount = JSON.stringify(this.withdrawalForm.value.amount);
        console.log(withdrawAmount);
        this.amount = parseInt(withdrawAmount);
        this.checkNotesCount();
    };
    HomeComponent.prototype.checkNotesCount = function () {
        console.log('inside check balance');
        this.checkBalance();
    };
    HomeComponent.prototype.checkBalance = function () {
        console.log('inside check balance limit & insufficient');
        if (this.amount % 100 != 0) {
            alert('Incorrect Withdrawal Amount ( Enter Multiple of 100 )');
        }
        else if (this.amount > this.balance) {
            alert('Not Sufficient Balance To Withdraw');
        }
        else if (this.amount > 10000) {
            alert('One Time Max. Limit is 10k. Please enter b/w 100-10k.');
        }
        else {
            this.commitTransaction();
            this.checkNotes();
        }
    };
    HomeComponent.prototype.checkNotes = function () {
        var rupees = new Array(2000, 500, 100);
        var count = new Array(0, 0, 0);
        var i;
        for (i = 0; i < rupees.length; i++) {
            if (rupees[i] < this.amount || rupees[i] == this.amount) {
                count[i] = this.amount / rupees[i];
                this.amount = this.amount % rupees[i];
            }
        }
        for (i = 0; i < count.length; i++) {
            if (count[i] != 0) {
                alert(rupees[i] + "  : Notes : " + Math.floor(count[i]) + " = "
                    + (rupees[i] * Math.floor(count[i])));
                this.twoThousandNotesDispansed = Math.floor(count[0]);
                this.fiveHundredNotesDispansed = Math.floor(count[1]);
                this.oneHundredNotesDispansed = Math.floor(count[2]);
            }
        }
    };
    HomeComponent.prototype.commitTransaction = function () {
        this.balance = this.balance - this.amount;
        console.log('Updating Balance .........');
        setTimeout(function () { alert('Thank You For Using Ranbanka ATM .'); }, 3000);
    };
    HomeComponent.prototype.resetCounter = function () {
        this.twoThousandNotesDispansed = null;
        this.fiveHundredNotesDispansed = null;
        this.oneHundredNotesDispansed = null;
    };
    /*    withdrawal(form: ngForm ) {
            console.log('withdrawal request Initiated');
    
        }*/
    HomeComponent.prototype.ngOnInit = function () {
        /*        this.loadAllUsers();*/
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'home.component.html'
        }),
        __metadata("design:paramtypes", [index_1.UserService, forms_1.FormBuilder])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map