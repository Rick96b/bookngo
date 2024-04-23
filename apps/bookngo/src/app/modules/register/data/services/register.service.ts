import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserBaseInfoDto } from '@common'

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
  
    constructor(private http: HttpClient){ }
      
    registerUser(user: UserBaseInfoDto) {
        this.http.post("http://localhost:3000/api/auth/signUp", user).subscribe({next: (data:any) => console.log(data)})
    }
}