import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginDto } from '@common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn: boolean = false
    constructor(private http: HttpClient) {
        this.isLoggedIn = false
        if(localStorage.getItem('token')) {
            this.isLoggedIn = true
        }
    }

    login(user: UserLoginDto) {
        return this.http.post<{token: string}>('http://localhost:3000/api/auth/signIn', user)
        .subscribe({
            next:(res) => {
                localStorage.setItem('token', res.token)
                this.isLoggedIn = true
            }
        })
    }         

    logout() {
        localStorage.removeItem("token");
        this.isLoggedIn = false
    }
}