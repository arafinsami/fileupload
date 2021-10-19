import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EmployeeTransferRecordEncloserDto } from "../model/EmployeeTransferRecordEncloserDto";


@Injectable()
export class EncloserService {

    constructor(private http: HttpClient) { }

    public save(dto: EmployeeTransferRecordEncloserDto): Observable<any> {
        return this.http.post(environment.BASE_URL + "api/v1/employee-mpo-transfer-record/save/preferred/encloser", dto);
    }
}