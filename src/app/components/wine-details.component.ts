import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {DomSanitizer} from '@angular/platform-browser';

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

  file = ""

  constructor(private sanitizer: DomSanitizer, private httpSvc: HttpService, private router: Router, private auth: AuthService, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {

    this.result = await this.httpSvc.getWineDetails(this.httpSvc.wineID)
    console.info(this.result)
    this.httpSvc.wineName = this.result.aggregate?.wine.Name
    this.httpSvc.wineVarietal = this.result.aggregate?.wine.Varietal
    this.httpSvc.country = this.result.aggregate?.wine.Country

    this.emptyWineName = Object.keys(this.result).length === 0
    this.emptyCountry = Object.keys(this.result).length === 0
    this.emptyDescription = Object.keys(this.result).length === 0
    // console.info(Object.keys(this.result).length === 0)    
  }

  async addToFavourites(){

      const formData = new FormData();

      formData.set('name', this.httpSvc.wineName);
      formData.set('image-file', this.file);
  
      const params = new HttpParams()
			.set('userName', this.auth.userName)
			.set('wineID', this.httpSvc.wineID)
			.set('country', this.httpSvc.country)
			.set('wineName', this.httpSvc.wineName + " " + this.httpSvc.wineVarietal)

      await this.http.post<any>(environment.herokuUrl+'/saveWine', formData, {params: params}).toPromise()  
    
    // this.httpSvc.saveWine(this.auth.userName, this.httpSvc.wineID, this.httpSvc.wineName + " " + this.httpSvc.wineVarietal, digitalOceanKey.key)
    window.alert('Saved!')
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      window.alert('Image uploaded!')
    }
  }

  goBack(){
    this.router.navigate([this.auth.lastVisitedPage])
  }

  photoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      "https://quiniwine.com/api/pub/wineReviews?mode=e&wine_id="+this.result?.aggregate?.wine?.id);
  }

}