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
    "age": string,
    "dob": string,
    "height"?: string,
    "weight"?: string,
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
}

export interface MemberListArray {
    "memberList"?: Array<MemberListModel>
}