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
  category = ""

  constructor(private httpSvc: HttpService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.category = this.httpSvc.category
    this.result = await this.httpSvc.getWineByCategory(this.httpSvc.categoryCode)
    console.info(this.result)
  }

  async getWineDetails(wineID){

    //store wineID in the wine service
    this.httpSvc.wineID = wineID
    this.router.navigate(['/wineDetails'])

  }

}
