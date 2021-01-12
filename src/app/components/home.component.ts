import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  }

  async search(textSearch){
    if (await this.auth.verifyToken() != 200){
      window.alert ('Log in expired')
      this.router.navigate(['/login'])
      return
    }
    if (textSearch){
      this.httpSvc.searchField = this.homeForm.get('search').value
    }
    this.router.navigate(['/searchResults'])
  }

  async onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }

    const formData = new FormData();

    formData.set('name', 'temp pic for recognition');
    formData.set('image-file', this.file);

    // const params = new HttpParams()
    // .set('userName', this.auth.userName)

    this.digitalOceanKey = await this.http.post<any>('/uploadPictureRecognition', formData).toPromise()  

  }

  async uploadImage(){

    const result = await this.http.get<any>('/pictureRecognition/'+this.digitalOceanKey).toPromise()

    const resultArray = (result.result.images[0].classifiers[0].classes)
    var searchText = ""
    console.info(resultArray)
    
    for (let i = 0; i < resultArray.length; i++){
      searchText = searchText + resultArray[i].class + " "
    }
    searchText = searchText.trim()
    console.info(searchText)
    this.httpSvc.searchField = searchText
    this.homeForm.reset()
    this.search(false)
  }
}