import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchField = ""
  wineName = ""
  result: any = {}
  imageResult: any = {}
  notstartofpage = false 
  notendofpage =  true


  constructor(private httpSvc: HttpService, private router: Router, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {

    this.auth.lastVisitedPage = "/searchResults"

    this.searchField = this.httpSvc.searchField
    this.wineName = this.httpSvc.wineName
    this.result = await this.httpSvc.searchWines(this.httpSvc.searchField, this.auth.OFFSET, this.auth.LIMIT)
    for (let i = 0; i < this.result.items.length; i++){
      this.imageResult = await this.httpSvc.getImages(this.result.items[i].Name +' '+ this.result.items[i].Varietal)
      this.result.items[i].image = this.imageResult[0]
    }


    // to show/hide buttons
    this.notstartofpage = !(this.auth.OFFSET==0)
    this.notendofpage = !(this.result.items.length < 10)
  }

  async getWineDetails(wineID){

    if (await this.auth.verifyToken() != 200){
      window.alert ('Log in expired')
      this.router.navigate(['/login'])
      return
    }

    //store wineID in the wine service
    this.httpSvc.wineID = wineID
    console.info(wineID)
    this.router.navigate(['/wineDetails'])

  }

  async nextPage(){
    this.auth.OFFSET += this.auth.LIMIT
    this.result = await this.httpSvc.searchWines(this.httpSvc.searchField, this.auth.OFFSET, this.auth.LIMIT)

    this.notstartofpage = !(this.auth.OFFSET==0)
    this.notendofpage = !(this.result.items.length < 10)
  }

  async prevPage(){
    this.auth.OFFSET -= this.auth.LIMIT
    this.result = await this.httpSvc.searchWines(this.httpSvc.searchField, this.auth.OFFSET, this.auth.LIMIT)

    this.notstartofpage = !(this.auth.OFFSET==0)
    this.notendofpage = !(this.result.items.length < 10)  }
}