import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  errorMessage = ""
  loginForm : FormGroup
  createAccountForm: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    })

    this.createAccountForm = this.fb.group({
      newUsername: this.fb.control('', [Validators.required]),
      newPassword: this.fb.control('', [Validators.required]),
    })

  }

  async login(){

    if (await this.auth.login(this.loginForm.get('username').value, this.loginForm.get('password').value)){
      this.router.navigate(['/home'])
    }
  }

  async createAccount(){

    if (await this.auth.createAccount(this.loginForm.get('username').value, this.loginForm.get('password').value)){
      window.alert('Account created! Please log in')
    }
    else{
      window.alert('There was an error creating your account.')      
    }
    
  }

}
