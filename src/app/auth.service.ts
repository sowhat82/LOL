import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthService {

    token: any

    constructor(private http: HttpClient){}

    async login(username: string, password:string){

        var success = false

        const loginDetails = new HttpParams()
        .set('username', username)
        .set('password', password);
        
        const  httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');
        
        await this.http.post('/login', loginDetails.toString(),
        { headers: httpHeaders })
        .toPromise()
        .then(
          (token) => {
            console.info(token)
            this.token = token
            // window.alert("success ")
            success = true
          }
        )
        .catch((error) => {
          if (401 == error.status) {
            //handle incorrect login
            window.alert("ERROR " + error.status)
            success = false
            }
        })
        console.info(success)
        return (success)
    }

    async verifyToken(){        
        const headers = new HttpHeaders()
        .set('Authorization', this.token.token_type+this.token.access_token)

        await this.http.get<any>('/customer', {headers: headers}).toPromise() 
    }

}