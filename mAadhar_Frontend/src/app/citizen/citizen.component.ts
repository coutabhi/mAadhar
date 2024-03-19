import { Component, OnInit } from '@angular/core';
import { AadharService } from '../aadhar.service';
import { Citizen } from '../classes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-citizen',
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.css']
})
export class CitizenComponent implements OnInit {
  private readonly CITIZEN_DETAILS = "";
  citizenForm!: FormGroup;
  constructor(private service: AadharService, private router: Router, private formBuilder: FormBuilder, private authService: AuthServiceService) {
    this.citizenForm = this.formBuilder.group({
      emailId: ['', Validators.required], // Define form controls with validators
      mobileNo: ['', Validators.required]
    });
  }
  message = '';
  aadharStatus = '';
  citizen: Citizen = new Citizen();
  showDashboard = false;
  ngOnInit(): void {
    const isLoggedIn = this.authService.isCitizenLoggedIn();
    if (isLoggedIn) {
      this.showDashboard = true;
    }
  }

  loginAsCitizen(): void {
    this.service.checkCitizenLoginCreds(this.citizen.emailId, this.citizen.mobileNo).subscribe(
      response => {
        console.log("Login as citizen response:", response);

        if (response =='1') {
          // If login is successful, retrieve citizen details
          console.log("Citizen details:");
          this.service.getCitizen(this.citizen.emailId).subscribe(
            citizenDetails => {
              console.log("Citizen details:", citizenDetails);
              // Assign citizen details to the citizen object
              this.citizen = citizenDetails;
              localStorage.setItem(this.CITIZEN_DETAILS, JSON.stringify(citizenDetails));
              this.authService.setCitizenLoggedIn();
              // Show the dashboard
              this.showDashboard = true;
            },
            error => {
              console.error("Error fetching citizen details:", error);
              this.message = "Error fetching citizen details";
            }
          );
        } else {
          // Handle invalid credentials
          this.message = "Invalid Credentials!";
        }
      },
      error => {
        console.error("Error logging in as citizen:", error);
        this.message = "Error logging in as citizen";
      }
    );
  }
  public logout() {
    this.service.citizenLogout(this.citizen.emailId).subscribe();
    this.router.navigate(['']);
    this.authService.clearCitizenLoggedIn();
  }
  public getAadharStatus(emailId: string, password: string) {
    this.service.getAadharStatus(emailId, password).subscribe(response => this.aadharStatus = response)
    console.log(this.aadharStatus);
  }

  getImageUrl(photoData: any): string {
    if (!photoData) return ''; // If no photo data is available, return empty string
    return 'data:image/jpeg;base64,' + photoData; // Assuming the photo data is in JPEG format
  }

}
