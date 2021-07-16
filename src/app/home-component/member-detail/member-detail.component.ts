
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";

@Component({
   selector:'member-detail-component',
   templateUrl: './member-detail.component.html',
   styleUrls: ['./member-detail.component.scss']
})

export  class MemberDetailComponent implements OnInit{
    currentTime = moment().format("MM/DD/YYYY hh:mm A");

    constructor() {}

    ngOnInit(){
    }

}