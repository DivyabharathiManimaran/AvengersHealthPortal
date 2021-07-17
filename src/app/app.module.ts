import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home-component/home-component';
import { HomeComponentService } from './home-component/service/home-component.service';
import { MemberDetailComponent } from './home-component/member-detail/member-detail.component';
import { OnlynumberDirective } from './home-component/directives/numberOnly.directive';
import { SearchInfoDialogComponent } from './home-component/search-info-dialog/search-info-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MemberDetailComponent,
    OnlynumberDirective,
    SearchInfoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    HttpClientModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MemberDetailComponent],
  providers: [HomeComponentService],
  entryComponents: [SearchInfoDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
