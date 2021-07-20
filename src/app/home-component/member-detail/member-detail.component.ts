
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { PatientListModel } from "../model/patient-list.model";
import { HomeComponentService } from "../service/home-component.service";

@Component({
   selector:'member-detail-component',
   templateUrl: './member-detail.component.html',
   styleUrls: ['./member-detail.component.scss']
})

export  class MemberDetailComponent implements OnInit{
    currentTime = moment().format("MM/DD/YYYY hh:mm A");
    memberDetailsFor = '';
    item !: PatientListModel;
    constructor(
        private readonly router: Router,
        readonly homeComponentService: HomeComponentService,) {}

    ngOnInit(){
        if(history && history.state && history.state.record) {
            const record = history.state.record;
            this.memberDetailsFor = record.firstName;
            this.item = record;
        }
    }

    

}