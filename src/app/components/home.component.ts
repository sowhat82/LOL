import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { logWarnings } from 'protractor/built/driverProviders';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  homeForm: FormGroup
  file = ""
  digitalOceanKey = ""
  userName = ""

  constructor(private fb: FormBuilder, private router: Router, private httpSvc: HttpService, private auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.homeForm = this.fb.group({
      search: this.fb.control('', [Validators.required]),
    })

    this.userName = this.auth.userName
    this.auth.OFFSET = 0

  }

  async search(textSearch){

    // if (await this.auth.verifyToken() != 200){
    //   window.alert ('Log in expired')
    //   this.router.navigate(['/login'])
    //   return
    // }
    if (textSearch){
      this.httpSvc.searchField = this.homeForm.get('search').value
    }
    this.router.navigate(['/searchResults'])
  }

  async onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }

    this.uploadImage()
  }

  async uploadImage(){
    var searchText = ""

    const formData = new FormData();

    formData.set('name', 'temp pic for recognition');
    formData.set('image-file', this.file);

    const result = await this.http.post<any>(environment.herokuUrl+'/uploadPictureRecognition', formData).toPromise()  

    if (result.type == 'google'){
      // google image recognition handling
      searchText = await (result?.response.description.replace(/[\W_]+/g," ").replace(/\r?\n|\r/," "))
      searchText = searchText.trim()
      this.httpSvc.searchField = searchText
    }
    else{
      // IBM result handling
      const resultArray = (result.response.result.images[0].classifiers[0].classes)
      for (let i = 0; i < resultArray.length; i++){
        searchText = searchText + resultArray[i].class + " "
      }
      searchText = searchText.trim()
    
      // remove duplicate words
      var uniqueSearchText=searchText.split(' ').filter(function(item,i,allItems){
        return i==allItems.indexOf(item);
      }).join(' ');

      this.httpSvc.searchField = uniqueSearchText
    }

    this.homeForm.reset()
    this.search(false)

    // OR IBM image recognition if google image fails
    // if (searchText == undefined){
    //   searchText = ""
    //   const result = await this.http.get<any>('/IbmPictureRecognition/'+this.digitalOceanKey).toPromise()
    //   const resultArray = (result.result.images[0].classifiers[0].classes)
    //   for (let i = 0; i < resultArray.length; i++){
    //     searchText = searchText + resultArray[i].class + " "
    //   }
    //   searchText = searchText.trim()
    // }

    // var uniqueSearchText=searchText.split(' ').filter(function(item,i,allItems){
    //   return i==allItems.indexOf(item);
    // }).join(' ');

    // this.httpSvc.searchField = uniqueSearchText


  }
}