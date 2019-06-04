import { Component, OnInit } from '@angular/core';
//import {Employees} from '../Mock-Employees';
import {DataService} from '../data.service';
import {EmployeeInfo} from '../template/EmployeeInfo'



@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})

export class AddEditComponent implements OnInit {
  
  employees: EmployeeInfo[];
  selectedEmployee: EmployeeInfo;

  
  constructor(private dataService: DataService) { }
 getEmployees(): void {
    this.dataService.getEmployees().subscribe(employees => this.employees = employees);
  }
  ngOnInit() {
    this.getEmployees();
    this.dataService.setEmployees(this.employees)
  }
  onSelect(employee: EmployeeInfo): void{
    this.dataService.setEmployees(this.employees)
    this.selectedEmployee = employee;
  }

  
}

