import { Component, OnInit } from '@angular/core';
import {  Router} from '@angular/router';
import {DataService} from '../data.service';
import { FormGroup, FormControl, Validators,  FormBuilder } from '@angular/forms';
import {LoginTemplate} from '../template/LoginTemplate'
import {Employee} from '../template/Employee'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  private registeredForm: FormGroup;
  
  submitted = false;
  verified = false;
  user: LoginTemplate;
  users: LoginTemplate[];
  selectedEmployee: Employee
  constructor(private formBuilder: FormBuilder,private router:Router,private dataService: DataService) {
    
  }
  
  ngOnInit()  {
    this.registeredForm = this.formBuilder.group({
      Email: new FormControl('', [Validators.required,Validators.minLength(8), Validators.maxLength(35), Validators.pattern('[a-zA-Z0-9]+'+ '@'+ '[a-zA-Z]*'+'.'+'[a-zA-Z]*')]),
   Password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(35), Validators.pattern('[a-zA-Z0-9]*')])
  
  })
  
  
  }

  Login():void{
    this.submitted = true;
    this.getVerify()
    if (!this.dataService.getVerifiedStatus()){
      return
    }
    this.verified = true;
    // this.router.navigateByUrl('/employee-list');
    this.router.navigateByUrl('/employee-list');

  }
  getVerify(): void{
    this.dataService.getVerify(this.registeredForm.get("Email").value, this.registeredForm
    .get("Password").value);
  }
  get f() { 
    return this.registeredForm.controls; }}
