import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {DataService} from '../data.service';
import {EmployeeInfo} from '../template/EmployeeInfo';
import { FormGroup, FormControl, Validators,  FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  selectedEmployee: EmployeeInfo;
  constructor(    
    private fb: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
    ) {
      this.getEmployee();
    
   }
   private registeredForm: FormGroup;
   employees: EmployeeInfo[];
   count: number;
   employee: EmployeeInfo;
   Existing = false;
   submitted = false;
  addEmployee():void{
    this.submitted = true;
    if (this.registeredForm.invalid){
      return; 
    }
    let temp = {
      id: -1,
      first_NAME: this.registeredForm.get('First_Name').value,
      last_NAME: this.registeredForm.get('Last_Name').value,
      address: this.registeredForm.get('Address').value,
      city: this.registeredForm.get('City').value,
      state: this.registeredForm.get('State').value,
      zip: this.registeredForm.get('Zip').value,
      home_PHONE: this.registeredForm.get('Home_Phone').value,
      cell_PHONE: this.registeredForm.get('Cell_Phone').value,
      email: this.registeredForm.get('Email').value,

    }
    console.log(temp)
        this.dataService.addEmployee(temp).subscribe(resp => {console.log(resp), this.router.navigateByUrl('/employee-list');
      }, error=>console.log(error));
        this.dataService.getEmployees();

    
   
  }
  
  getEmployee():void  {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id != -1)
      this.Existing = true;
    this.dataService.getEmployee(id).subscribe(resp => this.selectedEmployee =resp);

    }  

  goCancel():void{
    this.router.navigateByUrl('/employee-list');
  }
  Save(): void{
    this.submitted = true;
    if (!this.registeredForm.valid){
      return; 
    }
    let temp = {
      id: this.selectedEmployee.id,
      first_NAME: this.registeredForm.get('First_Name').value,
      last_NAME: this.registeredForm.get('Last_Name').value,
      address: this.registeredForm.get('Address').value,
      city: this.registeredForm.get('City').value,
      state: this.registeredForm.get('State').value,
      zip: this.registeredForm.get('Zip').value,
      home_PHONE: this.registeredForm.get('Home_Phone').value,
      cell_PHONE: this.registeredForm.get('Cell_Phone').value,
      email: this.registeredForm.get('Email').value,

    }
   
    this.dataService.saveEmployee(temp).subscribe(resp => {console.log("Upload"),this.router.navigateByUrl('/employee-list');
  },error=>console.log('NOT UPLOADED'));
    this.dataService.getEmployees();
    this.router.navigateByUrl('/employee-list');

    
  }
 
  ngOnInit(): void {
    this.getEmployee();
    if (this.Existing){
    this.registeredForm = this.fb.group({
      
      First_Name: new FormControl((this.selectedEmployee.first_NAME),[
        Validators.required,
        Validators.maxLength(35),
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*')
      ]),
      Last_Name: new FormControl(this.selectedEmployee.last_NAME,[
        Validators.required,
        Validators.maxLength(35),
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*')
      ]),
      Address: new FormControl(this.selectedEmployee.address,[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10),
        Validators.pattern("[A-Za-z\\'\\- 0-9]*")
      ]),
      City: new FormControl(this.selectedEmployee.city,[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        Validators.pattern("[A-Za-z\\'\\- A-Za-z]*")
      ]),
      State: new FormControl(this.selectedEmployee.state),
      Zip: new FormControl(this.selectedEmployee.zip,[
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(5),
        Validators.pattern('[0-9]+')
      ]),
      Cell_Phone: new FormControl(this.selectedEmployee.cell_PHONE,[
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('[0-9]+')
      ]),
      Home_Phone: new FormControl(this.selectedEmployee.home_PHONE,[
        Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('[0-9]+')
      ]),
      Email: new FormControl(this.selectedEmployee.email,[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10),
        Validators.pattern('[a-zA-Z0-9]+'+ '@'+ '[a-zA-Z]*'+'.'+'[a-zA-Z]*')
      ])
      
    })
  }
    else {
      this.registeredForm = this.fb.group({
      
        First_Name: new FormControl((''),[
          Validators.required,
          Validators.maxLength(35),
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*')
        ]),
        Last_Name: new FormControl('',[
          Validators.required,
          Validators.maxLength(35),
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*')
        ]),
        Address: new FormControl("",[
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(10),
          
        ]),
        City: new FormControl('',[
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5),
          Validators.pattern('[a-zA-Z]*'+ " "+ '[a-zA-Z]*')
        ]),
        State: new FormControl(''),
        Zip: new FormControl('',[
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(5),
          Validators.pattern('[0-9]*')
        ]),
        Cell_Phone: new FormControl('',[
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('[0-9]*')
        ]),
        Home_Phone: new FormControl('',[
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]*')
        ]),
        Email: new FormControl('',[
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(10),
          Validators.pattern('[a-zA-Z0-9]+'+ '@'+ '[a-zA-Z]+'+'.'+'[a-zA-Z]*')
        ])
    })}
    
  }
  get f() { 
    return this.registeredForm.controls; }

  

}
