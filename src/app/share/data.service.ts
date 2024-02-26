import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from '../model/employee';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }


  
  addEmployee(employee:Employee){
    employee.id = this.afs.createId()
    return this.afs.collection('employee').add(employee)

  }

  getAllEmployee(){
    return this.afs.collection('employee').snapshotChanges()

  }


  deleteEmployee(employee:Employee){
    // return this.afs.doc('employee'+employee.id).delete()
    return this.afs.collection('employee').doc(employee.id).delete();
  }


  updateEmployee(employee: Employee) {
    // const id = employee.id;
    return this.afs.collection('employee').doc(employee.id).update(employee);
  }
  
}
