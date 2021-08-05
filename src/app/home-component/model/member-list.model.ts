export interface MemberListModel {
    "lastName"?: string,
    "firstName": string,
    "alternateName"?: string,
    "picture":string,
    "gender"?:string,
    "phone": string,
    "address"?:string,
    "admitCardNumber": number,
    "abilities"?: Array<string>,
    "disabilities": Array<string>,
    "powers"?: Array<{power:string, detail: string}>,
    "age": string,
    "dob": string,
    "height"?: string,
    "weight"?: string,
    "status"?: string,
    "selfOccupation"?:string,
    "fatherName"?: string,
    "fatherOccupation"?: string,
    "motherName"?: string,
    "motherOccupation"?: string,
    "maritalStatus"?: string,
    "spouseName"?:string,
    "spouseOccupation"?: string,
    "children"?: string,
    "race"?:string
    "healthCondition": Array<hc>;
}
 export interface hc {
     "title"?: string,
     "description"?: string,
     "cause"?: string,
     "symptoms"?: Array<string>
 }
export interface MemberListArray {
    "memberList"?: Array<MemberListModel>
}