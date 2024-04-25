import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CompanyInDto, UserBaseInfoDto } from '@common'
import { jwtDecode } from 'jwt-decode';


@Injectable({
    providedIn: 'root',
})
export class RegisterService {
  
    constructor(
        private http: HttpClient,
    ){ }
      
    registerUser(user: UserBaseInfoDto) {
        let token = ''
        this.http.post<{token: string}>("http://localhost:3000/api/auth/signUp", user).subscribe({
            next: (res) => {
                token = res.token
                const data = jwtDecode<{email: string, id: number}>(res.token)
                this.addCompany({
                    name: user.companyName,
                    ceo: data.id,
                    departments: [],
                    employees: []
                })
            },
            error: (err) => console.log(err)
        })
        return token
    }

    addCompany(company: CompanyInDto) {
        return this.http.post("http://localhost:3000/api/auth/signUp", company)
    }
}