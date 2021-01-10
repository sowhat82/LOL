import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private auth: AuthService, private httpSvc: HttpService) { }

  async ngOnInit(): Promise<void> {

    this.userName = this.auth.userName

    this.favouriteWines = await this.httpSvc.getFavourites(this.userName)

    console.info('fav wintes ', this.favouriteWines)
  }

}
