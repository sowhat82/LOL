import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { count } from 'rxjs-compat/operator/count';
import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-favourite-wines',
  templateUrl: './favourite-wines.component.html',
  styleUrls: ['./favourite-wines.component.css']
})
export class FavouriteWinesComponent implements OnInit {

  userName = ""
  favouriteWines: any
  countryCount: any = []

  constructor(private auth: AuthService, private httpSvc: HttpService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.auth.lastVisitedPage = "/favouriteWines"
    this.userName = this.auth.userName

    this.favouriteWines = await this.httpSvc.getFavourites(this.userName)

    this.countryCount = await this.httpSvc.getCountryCount(this.userName)
  }

  async deleteSavedWine(ID){
    console.info(ID)
    await this.httpSvc.deleteSavedWine(ID)

    this.favouriteWines = await this.httpSvc.getFavourites(this.userName)

    this.countryCount = await this.httpSvc.getCountryCount(this.userName)

  }

  async getWineDetails(wineID){

    if (await this.auth.verifyToken() != 200){
      window.alert ('Log in expired')
      this.router.navigate(['/login'])
      return
    }

    //store wineID in the wine service
    this.httpSvc.wineID = wineID
    this.router.navigate(['/wineDetails'])

  }
}
