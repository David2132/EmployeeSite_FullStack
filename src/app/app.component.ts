import { Component } from '@angular/core';
import SampledJson from './MockData/dataMock.json'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data; 
  constructor(){
    var data = JSON.stringify(SampledJson)
    var obj = JSON.parse(data)
    
  
  }  title = 'Employee Login Page';
}
