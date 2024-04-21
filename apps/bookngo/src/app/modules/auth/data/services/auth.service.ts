import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginDto } from '@common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
      
    constructor(private http: HttpClient){ }
      
    registerUser(user: UserLoginDto) {
        this.http.post("http://localhost:3000/api/auth/signIn", user).subscribe({next: (data:any) => console.log(data)})
    }
}