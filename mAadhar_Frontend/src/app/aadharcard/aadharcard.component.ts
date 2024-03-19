import { Component } from '@angular/core';
import { AadharService } from '../aadhar.service';
import { Citizen } from '../classes';

@Component({
  selector: 'app-aadharcard',
  templateUrl: './aadharcard.component.html',
  styleUrls: ['./aadharcard.component.css']
})
export class AadharcardComponent {
  constructor(private service: AadharService){}
  aadharStatus = '';
  citizen: Citizen = new Citizen();
}
