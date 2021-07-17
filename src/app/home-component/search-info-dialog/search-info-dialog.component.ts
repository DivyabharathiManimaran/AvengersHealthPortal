
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from "moment";

@Component({
   selector:'search-info-dialog-component',
   templateUrl: './search-info-dialog.component.html',
   styleUrls: ['./search-info-dialog.component.scss']
})

export  class SearchInfoDialogComponent implements OnInit{
    currentTime = moment().format("MM/DD/YYYY hh:mm A");
    message = '';

    constructor(private dialogRef: MatDialogRef<SearchInfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: {message: string}) {

        this.message = data.message;
    }

    ngOnInit(){ }

    close() {
        this.dialogRef.close();
    }
}