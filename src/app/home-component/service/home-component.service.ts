import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})

export class HomeComponentService {
    memberJsonString="assets/jsons/member-list.json";
    constructor( private readonly http: HttpClient,
        private readonly router: Router ) {}

    getPatList() {
        return this.http.get(this.memberJsonString);
    }

    goToHome() {
        this.router.navigate(['home-page']).catch(()=>{})
    }
}