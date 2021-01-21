import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-taste-review',
  templateUrl: './taste-review.component.html',
  styleUrls: ['./taste-review.component.css']
})
export class TasteReviewComponent implements OnInit {

  wineID = ""

  constructor(private httpSvc: HttpService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.wineID = this.httpSvc.wineID
  }

  photoURL() {
    // return this.sanitizer.bypassSecurityTrustResourceUrl(
    //   "https://quiniwine.com/app/taste.html");
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        "https://quiniwine.com/app/taste.html#/wine/"+this.wineID);
        // return this.sanitizer.bypassSecurityTrustResourceUrl(
      //   "https://quiniwine.com/api/pub/wineReviews?mode=e&wine_id="+this.wineID);
    }


}
