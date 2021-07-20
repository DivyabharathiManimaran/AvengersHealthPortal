
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { HomeComponentService } from "./service/home-component.service";
import { PatientListArray, PatientListModel } from "./model/patient-list.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SearchInfoDialogComponent } from "./search-info-dialog/search-info-dialog.component";

@Component({
   selector:'home-component',
   templateUrl: './home-component.html',
   styleUrls: ['./home-component.scss']
})

export  class HomeComponent implements AfterViewInit, OnInit{
    currentTime = moment().format("MM/DD/YYYY hh:mm A");
    dataSource!: PatientListModel[];
    displayedColumns = ['admitNo', 'name', 'altName', 'gender', 'phone', 'address'];
    patientSearchForm !: FormGroup;
    admitCardNo!: string;
    firstNameVal!: string;
    lastNameVal!: string;
    phoneNo!: string;
    @ViewChild('admitNum') firstFormElement!: ElementRef;

    constructor(readonly homeComponentService: HomeComponentService,
        private dialog: MatDialog,
        private readonly router: Router,
        private readonly fb: FormBuilder ) {
            this.patientSearchForm = this.fb.group({
                admitNo:['', [Validators.pattern("[0-9]*$")]],
                fName: ['',[Validators.pattern("[a-zA-Z][A-Za-z .-]*")]],
                lName:['',[Validators.pattern("[a-zA-Z][A-Za-z .-]*")]],
                phone:['', [Validators.pattern("[0-9][0-9-]*$")]],
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
    ngAfterViewInit() {
        this.firstFormElement && this.firstFormElement.nativeElement && this.firstFormElement.nativeElement.focus();
    }

    get getForm(){
        return this.patientSearchForm.controls;
    }

    hasValue() {
        console.log(this.patientSearchForm.value);
    }

    // admitNumChange(val: string) {
    //     this.admitCardNo = val;
    // }
    // firstNameChange(val: string) {
    //     this.firstNameVal = val;
    // }
    // lastNameChange(val: string) {
    //     this.lastNameVal = val;
    // }
    // phoneNumChange(val: string) {
    //     this.phoneNo = val;
    // }

    search() {
        let message='';
        const record = this.dataSource.filter(item => item.firstName.toLowerCase() === this.firstNameVal.toLowerCase() || 
        item.lastName?.toLowerCase() === this.lastNameVal || item.admitCardNumber.toString() === this.admitCardNo || 
        item.phone === this.phoneNo);
             
       if(record.length == 1) {
            this.router.navigate(['details-page'], {state:{record:record[0]}}).catch(()=>{})
        }
        else  if(record.length == 0) {
            message = 'No record found!';
            this.openErrDialog(message);
        }
        else if(record.length > 1) {
            message = 'Multiple records found, refine search criteria.';
            this.openErrDialog(message);
        }
    }
    openErrDialog(msg:string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width='400px';
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = 'dialog-border';
        dialogConfig.data = { message: msg };
        this.dialog.open(SearchInfoDialogComponent, dialogConfig);
    }

    clear() {
        this.patientSearchForm.reset();
    }
}