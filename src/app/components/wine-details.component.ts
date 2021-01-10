import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-wine-details',
  templateUrl: './wine-details.component.html',
  styleUrls: ['./wine-details.component.css']
})
export class WineDetailsComponent implements OnInit {

  result : any = {}
  emptyWineName: boolean = false
  emptyCountry: boolean = false
  emptyDescription: boolean = false

  constructor(private httpSvc: HttpService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.result = await this.httpSvc.getWineDetails(this.httpSvc.wineID)

    this.emptyWineName = Object.keys(this.result).length === 0
    this.emptyCountry = Object.keys(this.result).length === 0
    this.emptyDescription = Object.keys(this.result).length === 0
    // console.info(Object.keys(this.result).length === 0)
    

  }

}
