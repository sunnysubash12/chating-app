import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators'; // Ensure pluck is imported



interface User {
  _id: string;
  name?: string; // Add more properties as needed
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})


export class UserService {

  public users: User[] = [];
  public user: User | null = null;
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


  // Fetch all users from MongoDB
  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  // ✅ Load users and store them in the 'users' array
  loadUsers(): Observable<User[]> {
    return this.getUsers().pipe(
      map((users) => {
        console.log('Users fetched:', users);
        this.users = Array.isArray(users) ? users : [];
        console.log('Stored Users:', this.users);
        return this.users;
      }),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]); // Return an empty array if there's an error
      })
    );
  }
  // Find a specific user by ID
  findUserById(userId: string): void {
    console.log('Attempting to find user with ID:', userId);

    console.log('Stored Users:', this.users);
    if (this.users.length === 0) {
      console.warn('User list is empty. Load users first.');
      this.loadUsers(); // Load users first
      return;
    }

    this.user = this.users.find((u) => u._id === userId) || null;

    if (this.user) {
      console.log('User found:', this.user);
      this.generateToken().subscribe(
        (token) => console.log('Token generated:', token),
        (error) => console.error('Error generating token:', error)
      );
    } else {
      console.log('User not found');
    }
  }

  // Generate User Token
  generateToken(): Observable<string> {
    if (!this.user || !this.user._id) {
      console.error('No valid user selected for token generation.');
      return of(''); // Emits an empty string instead of an undefined observable
    }

    return this.http.post<{ token: string }>(`${this.apiUrl}/createStreamToken`, {
      _id: this.user._id
    }).pipe(pluck('token'))
  };

  // Revoke the Stream user token
  revokeUserToken(userId: string) {
    return this.http
      .post(`${this.apiUrl}/revokeStreamUserToken`, { _id: userId })
      .pipe(
        map(response => {
          console.log('Token revoked successfully', response);
          return response;
        }),
        catchError(error => {
          console.error('Error revoking token:', error);
          return of(error); // Return the error as observable
        })
      );
  }

}


