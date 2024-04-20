import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserBaseInfoDto } from '@common'

@Injectable()
export class RegisterService {
  
    constructor(private http: HttpClient){ }
      
    registerUser(user: UserBaseInfoDto) {
        console.log(this.http.post("api/signUp", user))
    }
}