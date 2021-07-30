
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { HomeComponentService } from "./service/home-component.service";
import { MemberListArray, MemberListModel } from "./model/member-list.model";
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
    dataSource!: MemberListModel[];
    displayedColumns = ['admitNo', 'name', 'altName', 'gender', 'phone', 'address'];
    memberSearchForm !: FormGroup;
    admitCardNo!: string;
    firstNameVal!: string;
    lastNameVal!: string;
    phoneNo!: string;
    @ViewChild('admitNum') firstFormElement!: ElementRef;

    constructor(readonly homeComponentService: HomeComponentService,
        private dialog: MatDialog,
        private readonly router: Router,
        private readonly fb: FormBuilder ) {
            this.memberSearchForm = this.fb.group({
                admitNo:['', [Validators.pattern("[0-9]*$")]],
                fName: ['',[Validators.pattern("[a-zA-Z][A-Za-z .-]*")]],
                lName:['',[Validators.pattern("[a-zA-Z][A-Za-z .-]*")]],
                phone:['', [Validators.pattern("[0-9][0-9-]*$")]],
            });
        }

    ngOnInit(){
        this.homeComponentService.getPatList().subscribe((resp:MemberListArray) => {
            if(resp && resp.memberList) {
                this.dataSource = resp.memberList;
            }
        })
        this.hasValue();
    }
    ngAfterViewInit() {
        this.focusFirstEle();
    }
    focusFirstEle() {
        this.firstFormElement && this.firstFormElement.nativeElement && this.firstFormElement.nativeElement.focus();
    }

    get getForm(){
        return this.memberSearchForm.controls;
    }

    hasValue() {
        console.log(this.memberSearchForm.value);
    }

    search() {
        let message='';
        const record = [];
        // this.dataSource.filter((item) => item.firstName.toLowerCase() === this.firstNameVal?.toLowerCase() || 
        // item.lastName?.toLowerCase() === this.lastNameVal?.toLowerCase() || item.admitCardNumber?.toString() === this.admitCardNo || 
        // item.phone === this.phoneNo);

        for(const item of this.dataSource) {
            const arr:MemberListModel[] =[];
            arr[0] = item;
           
            /** One search field */
            if(this.firstNameVal && !this.lastNameVal && !this.admitCardNo  && !this.phoneNo) {
                const rec = arr.find( item => item.firstName.toLowerCase() === this.firstNameVal.toLowerCase());
                if(rec) record.push(rec);
            }
            else if(!this.firstNameVal && this.lastNameVal && !this.admitCardNo  && !this.phoneNo) {
                const rec = arr.find( item => item.lastName?.toLowerCase() === this.lastNameVal.toLowerCase());
                if(rec) record.push(rec);
            }
            else if(!this.firstNameVal && !this.lastNameVal && this.admitCardNo && !this.phoneNo) {
                const rec = arr.find( item => item.admitCardNumber.toString() === this.admitCardNo);
                if(rec) record.push(rec);
            }
            else if(!this.firstNameVal && !this.lastNameVal && !this.admitCardNo  && this.phoneNo) {
                const rec = arr.find( item => item.phone === this.phoneNo);
                if(rec) record.push(rec);
            }

            /** Two search fields  */
            else if(this.firstNameVal  && this.lastNameVal && !this.admitCardNo  && !this.phoneNo) {
                const rec = arr.find( item => item.firstName.toLowerCase() === this.firstNameVal.toLowerCase() && item.lastName?.toLowerCase() === this.lastNameVal.toLowerCase());
                if(rec) record.push(rec);
            }
            else if(this.firstNameVal  && !this.lastNameVal && this.admitCardNo && !this.phoneNo) {
                const rec = arr.find( item => item.firstName.toLowerCase() === this.firstNameVal.toLowerCase() && item.admitCardNumber.toString() == this.admitCardNo);
                if(rec) record.push(rec);
            }
            else if(this.firstNameVal  && !this.lastNameVal && !this.admitCardNo  && this.phoneNo) {
                const rec = arr.find( item => item.firstName.toLowerCase() === this.firstNameVal.toLowerCase() && item.phone === this.phoneNo);
                if(rec) record.push(rec);
            }
            else if(!this.firstNameVal && this.lastNameVal && this.admitCardNo && !this.phoneNo) {
                const rec = arr.find( item => item.lastName?.toLowerCase() === this.lastNameVal.toLowerCase() && item.admitCardNumber.toString() === this.admitCardNo);
                if(rec) record.push(rec);
            }
            else if(!this.firstNameVal && this.lastNameVal && !this.admitCardNo  && this.phoneNo) {
                const rec = arr.find( item => item.lastName?.toString() === this.lastNameVal && item.phone == this.phoneNo);
                if(rec) record.push(rec);
            }
            else if(!this.firstNameVal && !this.lastNameVal && this.admitCardNo && this.phoneNo) {
                const rec = arr.find( item => item.admitCardNumber.toString() === this.admitCardNo && item.phone === this.phoneNo);
                if(rec) record.push(rec);
            }
        }

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
        this.memberSearchForm.reset();
        this.focusFirstEle();
    }
}