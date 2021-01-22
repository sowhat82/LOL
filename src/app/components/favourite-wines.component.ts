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
  imageResult: any
  countryCount: any = []

  constructor(private auth: AuthService, private httpSvc: HttpService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.auth.lastVisitedPage = "/favouriteWines"
    this.userName = this.auth.userName

    this.countryCount = await this.httpSvc.getCountryCount(this.userName)

    this.favouriteWines = await this.httpSvc.getFavourites(this.userName)
    for (let i = 0; i < this.favouriteWines.length; i++){
      if(this.favouriteWines[i].digitalOceanKey == null){
        this.imageResult = await this.httpSvc.getImages(this.favouriteWines[i].wineName)
        this.favouriteWines[i].image = this.imageResult[0]  
      }
    }

  }

  async deleteSavedWine(ID){
    await this.httpSvc.deleteSavedWine(ID)

    this.countryCount = await this.httpSvc.getCountryCount(this.userName)

    this.favouriteWines = await this.httpSvc.getFavourites(this.userName)
    for (let i = 0; i < this.favouriteWines.length; i++){
      if(this.favouriteWines[i].digitalOceanKey == null){
        this.imageResult = await this.httpSvc.getImages(this.favouriteWines[i].wineName)
        this.favouriteWines[i].image = this.imageResult[0]  
      }
    }


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
