import { UserService } from './user.service'; // Adjust the import path
import { ChatClientService } from 'stream-chat-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class signout {

  constructor(
    private userService: UserService,
    private chatClientService: ChatClientService
  ) {}

  log_out(userId: string) {
    this.userService.revokeUserToken(userId).subscribe(
      (response) => {
        console.log('Token revoked successfully:', response);
        localStorage.removeItem('userId');  // If you're storing user ID in localStorage
        sessionStorage.removeItem('userToken'); // Clear the user token if stored in session storage

        console.log('User logged out and data cleared');
      },
      (error) => {
        console.error('Error during token revocation or logout:', error);
      }
    );
  }
}