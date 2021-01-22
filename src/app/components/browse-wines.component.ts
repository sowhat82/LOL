import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-browse-wines',
  templateUrl: './browse-wines.component.html',
  styleUrls: ['./browse-wines.component.css']
})
export class BrowseWinesComponent implements OnInit {

  result: any
  imageResult: any
  category = ""

  constructor(private httpSvc: HttpService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.category = this.httpSvc.category
    this.result = await this.httpSvc.getWineByCategory(this.httpSvc.categoryCode)
    for (let i = 0; i < this.result.items.length; i++){
      this.imageResult = await this.httpSvc.getImages(this.result.items[i].Name +' '+ this.result.items[i].Varietal)
      this.result.items[i].image = this.imageResult[0]
    }

  }

  async getWineDetails(wineID){

    //store wineID in the wine service
    this.httpSvc.wineID = wineID
    this.router.navigate(['/wineDetails'])

  }

}
