
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { HomeComponentService } from "./service/home-component.service";
import { PatientListArray, PatientListModel } from "./model/patient-list.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
   selector:'home-component',
   templateUrl: './home-component.html',
   styleUrls: ['./home-component.scss']
})

export  class HomeComponent implements OnInit{
    currentTime = moment().format("MM/DD/YYYY hh:mm A");
    dataSource!: PatientListModel[];
    displayedColumns = ['admitNo', 'name', 'altName', 'gender', 'phone', 'address'];
    patientSearchForm !: FormGroup;

    constructor(private readonly homeComponentService: HomeComponentService,
        private readonly router: Router,
        private readonly fb: FormBuilder ) {
            this.patientSearchForm = this.fb.group({
                admitNo:['', [Validators.pattern("^[0-9]*$")]],
                fName: ['',[Validators.pattern("[a-zA-Z][A-Za-z .-]*")]],
                lName:['',[Validators.pattern("[a-zA-Z][A-Za-z .-]*")]],
                phone:['', [Validators.pattern("^[0-9]*$")]],
            });
        }

    ngOnInit(){
        this.homeComponentService.getPatList().subscribe((resp:PatientListArray) => {
            if(resp && resp.patientList) {
                this.dataSource = resp.patientList;
            }
        })
        this.hasValue();
    }

    get getForm(){
        return this.patientSearchForm.controls;
    }

    hasValue() {
        console.log(this.patientSearchForm.value);
    }

    admitNumChange(val: string) {
        console.log(val);
    }

    search() {
        this.router.navigate(['details-page']).catch(()=>{})
        // alert("search");
    }
    clear() {
        this.patientSearchForm.reset();
    }
}