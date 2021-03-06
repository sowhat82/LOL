import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ChatMessage, ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatForm : FormGroup
  messages: ChatMessage[] = []
  event$: Subscription
  userName = ""
  connected = false


  constructor(private fb: FormBuilder, private chatSvc: ChatService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.chatForm = this.fb.group({
      message: this.fb.control('', [Validators.required]),
    })    

    this.userName = this.auth.userName
    this.connected = this.chatSvc.connected
    // this.conn()
    this.messages = this.chatSvc.messages

    this.event$ = this.chatSvc.event.subscribe(
      (chat) => {
        // this.chatSvc.messages.unshift(chat)
        this.messages = this.chatSvc.messages
      }
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // if (this.event$ != null){
    //   this.event$.unsubscribe()
    //   this.event$ = null
    // }
  }
      
  async conn(){
    
    if (this.chatSvc.connected){
      this.chatSvc.leave()
      await this.chatSvc.delay(1000)
      this.event$.unsubscribe()
      this.event$ = null
    }
    else{
      this.chatSvc.join(this.auth.userName)
      this.event$ = this.chatSvc.event.subscribe(
        (chat) => {
          // this.chatSvc.messages.unshift(chat)
          this.messages = this.chatSvc.messages
        }
      )
    }
    this.chatSvc.connected = !this.chatSvc.connected
    this.connected = this.chatSvc.connected
  }

  send(){
    const message = this.chatForm.get('message').value
    this.chatForm.get('message').reset()
    this.chatSvc.send(message)
  }

  async back(){
    
    if (this.chatSvc.connected){
      this.chatSvc.leave()
      await this.chatSvc.delay(1000)
      this.event$.unsubscribe()
      this.event$ = null
    }

    this.router.navigate(['/home'])
  }

}
