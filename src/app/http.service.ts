import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()

export class HttpService {

    searchField = ""
    wineName = ""
    wineVarietal = ""
    wineID = ""
    country=""
    favourites = []
    constructor (private http: HttpClient, private auth: AuthService){}

    async searchWines(searchField, OFFSET, LIMIT){

        // console.info(wineName)
        // wineName = this.wineName

        const params = new HttpParams()
        .set('wineName', searchField)
        .set('offset', OFFSET)
        .set('limit', LIMIT)

        const results = await this.http.get<any>(`/searchResults`, {params: params}).toPromise()
        return results
    }

    async getWineDetails(wineID) {
        const results = await this.http.get<any>('/getWineDetails/'+wineID).toPromise()
        return results
    }

    async getFavourites(userName){
      this.favourites = await this.http.get<any>('/favourites/'+userName).toPromise() 
      console.info(this.favourites)
      return (this.favourites)
    }

    async getCountryCount(userName){
      const countryCount = await this.http.get<any>('/countryCount/'+userName).toPromise() 
      console.info(countryCount)
      return (countryCount)
    }

    async deleteSavedWine(ID){
        const params = new HttpParams()
        .set('ID', ID)
    
        const httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        console.info(params)
        await this.http.post('/deleteSavedWine', params.toString(), {headers: httpHeaders}).toPromise().then(
          function() {
            // success callback
          },
          function(response) {
            // failure callback,handle error here
    
            window.alert(response.error.message)
          })
    
    }

}