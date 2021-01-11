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

  constructor(private fb: FormBuilder, private router: Router, private httpSvc: HttpService, private auth: AuthService) { }

  ngOnInit(): void {
    this.homeForm = this.fb.group({
      search: this.fb.control('', [Validators.required]),
    })
  }

  async search(){
    if (await this.auth.verifyToken() != 200){
      window.alert ('Log in expired')
      this.router.navigate(['/login'])
      return
    }
    this.httpSvc.searchField = this.homeForm.get('search').value
    this.router.navigate(['/searchResults'])
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }

    console.info(this.file)


  }

}
