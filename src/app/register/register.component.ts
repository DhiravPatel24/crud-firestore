import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../share/auth.service';


@Component({
  selector: 'app-register',
  standalone:true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email:string=''
  password:string=''

  constructor(private auth : AuthService){}

  register(){
    if(this.email =='' && this.password ==''){
      alert('please check email or password')
    }
   

    this.auth.register(this.email,this.password)
    this.email=''
    this.password=''
  }

}
