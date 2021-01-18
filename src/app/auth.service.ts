import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()

export class AuthService {

    token: any
    userName = ""
    lastVisitedPage = "/searchResults"
    OFFSET = 0
    LIMIT = 10

    constructor(private http: HttpClient){}

    async login(username: string, password:string){

        var success = false

        const loginDetails = new HttpParams()
        .set('username', username)
        .set('password', password);
        
        const  httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

        console.info(environment.herokuUrl+'/login')
        await this.http.post(environment.herokuUrl+'/login', loginDetails.toString(),
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

      await this.http.get<any>(environment.herokuUrl+'/protected/secret', {headers: headers, observe: 'response'}).toPromise().then(
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

    async createAccount(username: string, password:string){


      var success = false

      const loginDetails = new HttpParams()
      .set('username', username)
      .set('password', password);
      
      const  httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
      
      await this.http.post(environment.herokuUrl+'/createAccount', loginDetails.toString(),
      { headers: httpHeaders, observe: 'response'})
      .toPromise()
      .then(
        () => {
          success = true
        }
      )
      .catch((error) => {
          window.alert("Username already exists. Please try another. Error Code: " + error.status)
          success = false
      })
      return (success)
  }

}