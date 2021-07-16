import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class HomeComponentService {
    patientJsonString="../../assets/jsons/patient-list.json";
    constructor( private readonly http: HttpClient ) {}

    getPatList() {
        return this.http.get(this.patientJsonString);
    }
}