import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Router } from '@angular/router';
import {GoogleAuthProvider} from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;


  constructor(private fireauth: AngularFireAuth, private router:Router, private firestore:AngularFirestore) {}


   login(email: string, password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
      localStorage.setItem('token','true');
      this.isAuthenticated = true;
      this.router.navigate(['employee'])
    }, err=>{
      alert("Please Check Credentials Or Register")
      this.router.navigate(['login'])
    })
  }

  register(email:string, password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then((userCredential)=>{
      alert('Registration Successful')
      this.isAuthenticated = false;
      this.router.navigate(['login'])
      return this.firestore.collection('users').doc(userCredential.user?.uid).set({
        email:email,
        password:password
      })
    },err =>{
      alert(err.message)
      this.router.navigate(['register'])
    })
  }

  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token')
      this.router.navigate(['login'])
    }, err=>{
      alert(err.message)
    })
  }

  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res)=>{
      this.router.navigate(['employee'])
      localStorage.setItem('token', JSON.stringify(res.user?.uid))

    },err=>{
      alert(err.message)
    })
  }

  
}
