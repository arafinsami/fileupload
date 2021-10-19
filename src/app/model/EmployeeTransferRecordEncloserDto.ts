import { EmployeeTransferRecordEncloserProfile } from "./EmployeeTransferRecordEncloserProfile";

export class EmployeeTransferRecordEncloserDto {

    employeeId: Number;
    
    recordId: Number;

    files : EmployeeTransferRecordEncloserProfile[];
}