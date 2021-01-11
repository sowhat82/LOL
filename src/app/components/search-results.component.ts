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
  OFFSET = 0
  LIMIT = 10
  notstartofpage = false 
  notendofpage =  true


  constructor(private httpSvc: HttpService, private router: Router, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {

    this.searchField = this.httpSvc.searchField
    this.wineName = this.httpSvc.wineName
    this.result = await this.httpSvc.searchWines(this.httpSvc.searchField, this.OFFSET, this.LIMIT)

    // to show/hide buttons
    this.notstartofpage = !(this.OFFSET==0)
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
    this.OFFSET += this.LIMIT
    this.result = await this.httpSvc.searchWines(this.httpSvc.wineName, this.OFFSET, this.LIMIT)

    this.notstartofpage = !(this.OFFSET==0)
    this.notendofpage = !(this.result.items.length < 10)
  }

  async prevPage(){
    this.OFFSET -= this.LIMIT
    this.result = await this.httpSvc.searchWines(this.httpSvc.wineName, this.OFFSET, this.LIMIT)

    this.notstartofpage = !(this.OFFSET==0)
    this.notendofpage = !(this.result.items.length < 10)  }
}