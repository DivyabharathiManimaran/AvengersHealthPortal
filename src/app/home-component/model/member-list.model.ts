export interface MemberListModel {
    "lastName"?: string,
    "firstName": string,
    "alternateName"?: string,
    "picture":string,
    "gender"?:string,
    "phone": string,
    "address"?:string,
    "admitCardNumber": number,
    "abilities"?: Array<string>
}

export interface MemberListArray {
    "memberList"?: Array<MemberListModel>
}