import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { MemberDetailComponent } from './home-component/member-detail/member-detail.component';


const routes: Routes = [
  
{ path:'home-page', component:HomeComponent },
{ path: '', redirectTo:'/home-page',pathMatch: 'full'},
{ path: 'details-page', component: MemberDetailComponent },
{ path:'**', component:MemberDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
