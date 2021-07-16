export interface PatientListModel {
    "lastName"?: string,
    "firstName": string,
    "gender"?:string,
    "phone": string,
    "address"?:string,
    "admitCardNumber": number,
    "abilities"?: Array<string>
}

export interface PatientListArray {
    "patientList"?: Array<PatientListModel>
}