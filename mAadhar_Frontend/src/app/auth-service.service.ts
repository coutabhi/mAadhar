import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly CITIZEN_KEY = 'citizenLoggedIn';

  constructor() { }

  // Method to set citizen login state in local storage
  setCitizenLoggedIn(): void {
    localStorage.setItem(this.CITIZEN_KEY, 'true');
  }

  isCitizenLoggedIn(): boolean {
    return localStorage.getItem(this.CITIZEN_KEY) === 'true';
  }

  // Method to clear citizen login state
  clearCitizenLoggedIn(): void {
    localStorage.removeItem(this.CITIZEN_KEY);
  }
}
