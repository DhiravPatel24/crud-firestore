import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../share/auth.service';


import { inject } from '@angular/core';



@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  

  email:string=''
  password:string=''

  constructor(private auth: AuthService){}

  login(){
    if(this.email ==''){
      // alert('please enter email')
    }
    if(this.password ==''){
      // alert('please enter password')
    }
 
    this.auth.login(this.email,this.password)
    this.email=''
    this.password=''
  }
  signInWithGoogle(){
    this.auth.googleSignIn()
  }

}
