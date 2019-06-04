import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import JSONData from './MockData/dataMock.json';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import JSONLogin from './MockData/usernameMock.json';
import {EmployeeInfo} from './template/EmployeeInfo'

@Injectable({
  providedIn: 'root'
  }
)

export class DataService {
  Employees: EmployeeInfo[]
  logindata=JSON.parse(JSON.stringify(JSONLogin))
  Users = this.logindata;
  Employee:EmployeeInfo;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
   }
  private Verified = false;
  constructor(private httpClient:HttpClient) {
}
   setEmployees(x:EmployeeInfo[]): void{
     this.Employees = x;
   }
   setEmployee(x:EmployeeInfo):void{
     this.Employee = x;
   }
   getHTTPEmployees():void{
     this.httpClient
     .get<EmployeeInfo[]>("http://localhost:8080/employees").subscribe(resp => this.Employee = (JSON.parse(JSON.stringify(resp))));

   }

  getEmployees() {
    this.httpClient
    .get<EmployeeInfo[]>("http://localhost:8080/employees").subscribe(resp => this.Employees = (JSON.parse(JSON.stringify(resp))));
    return this.httpClient.get<EmployeeInfo[]>("http://localhost:8080/employees");
  }

  getEmployee(id: number): Observable<EmployeeInfo> {

    var i =0;
    for (; i < this.Employees.length;i++){
      if (this.Employees[i].id == id)
        break
    }

    return of(this.Employees[i]);
       
  }
  addEmployee(employee: EmployeeInfo){
    return this.httpClient.post<EmployeeInfo>(`http://localhost:8080/employees`,employee,this.httpOptions);
    }
  saveEmployee(employee: EmployeeInfo){
    return this.httpClient.put<EmployeeInfo>(`http://localhost:8080/employees/`+employee.id,employee,this.httpOptions);
  }
  getVerify(Email:string, Password:string) {
    
    for (var i = 0; i<this.Users.length;i++){
      if (this.Users[i].EMAIL === Email && this.Users[i].PASSWORD === Password){
        this.Verified = true;
        return this.Verified;
      }
    }
    return this.Verified;
    
  }
  getVerifiedStatus() {
    return this.Verified
  }
  
}
