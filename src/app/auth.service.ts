import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthService {

    token: any
    userName = ""

    constructor(private http: HttpClient){}

    async login(username: string, password:string){

        var success = false

        const loginDetails = new HttpParams()
        .set('username', username)
        .set('password', password);
        
        const  httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');
        
        await this.http.post('/login', loginDetails.toString(),
        { headers: httpHeaders, observe: 'response'})
        .toPromise()
        .then(
          (token) => {
            this.token = token.body
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
        this.userName = username
        return (success)
    }

    async verifyToken(){        

      var status = 0

      const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token.token}`)

      await this.http.get<any>('/protected/secret', {headers: headers, observe: 'response'}).toPromise().then(
        function(result) {
          // success callback
          status = result.status
        },
        function(result) {
          // failure callback,handle error here
          // response.data.message will be "This is an error!"
          status = result.status
        }
        )

      return (status)

    }

}