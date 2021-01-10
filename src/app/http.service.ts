import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()

export class HttpService {

    wineName = ""
    wineID = ""

    constructor (private http: HttpClient){}

    async searchWines(wineName, OFFSET, LIMIT){

        console.info(wineName)
        wineName = this.wineName

        const params = new HttpParams()
        .set('wineName', wineName)
        .set('offset', OFFSET)
        .set('limit', LIMIT)

        const results = await this.http.get<any>(`/searchResults`, {params: params}).toPromise()
        return results
    }

    async getWineDetails(wineID) {
        const results = await this.http.get<any>('/getWineDetails/'+wineID).toPromise()
        return results

    }

}