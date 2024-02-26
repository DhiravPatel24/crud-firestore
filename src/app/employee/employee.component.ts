import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../share/auth.service';
import { DataService } from '../share/data.service';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  empForm: FormGroup;

  empDetails: any[] = [];

  emp: any = {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    education: '',
    company: '',
    experience: '',
    package: '',
  };

  empObj: any = {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    education: '',
    company: '',
    experience: '',
    package: '',
  };

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  dob: string = '';
  gender: string = '';
  // education:string=''
  company: string = '';
  experience: string = '';
  package: string = '';

  localresult: string | null = '';

  empresult: any[] = [];

  showForm: boolean = false;

  id = 0;

  isUpdateMode: boolean = false;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  displayedColumns: any[] = [
    'firstName',
    'lastName',
    'email',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'Operations',
  ];
  dataSource = this.empDetails;

  constructor(
    private _fb: FormBuilder,
    private auth: AuthService,
    private data: DataService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }
  ngOnInit() {
    this.data.getAllEmployee().subscribe(
      (res) => {
        this.empDetails = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error while fetching data');
      }
    );
  }

  private getNextId(): number {
    return this.empDetails.length > 0
      ? this.empDetails[this.empDetails.length - 1].id + 1
      : 1;
  }

  openAddEditEmpForm() {
    this.showForm = true;
  }
  closeAddEditEmpForm() {
    this.showForm = false;
    this.empForm.reset();
    this.isUpdateMode = false;
  }

  onedit(empDetails: any): void {
    this.emp = empDetails;
    this.empForm.patchValue(empDetails);
    this.showForm = true;
    this.isUpdateMode = true;
  }

  logout() {
    this.auth.logout();
  }

  addEmployee() {
    const formData = this.empForm.value;
    this.data
      .addEmployee(formData)
      .then(() => {
        alert('Employee added successfully!');
        this.empForm.reset();
        this.showForm = false;
      })
      .catch((error) => {
        console.error('Error adding employee: ', error);
      });
  }

  updateEmployee() {
    const updatedEmpData = { ...this.emp, ...this.empForm.value };
    const index = this.empDetails.findIndex((emp) => emp.id === this.emp.id);
    if (index !== -1) {
      this.data.updateEmployee(updatedEmpData);
      this.showForm = false;
      this.isUpdateMode = false;
    }
  }

  deleteEmployee(employee: Employee) {
    this.data
      .deleteEmployee(employee)
      .then(() => {
        alert('Employee deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting employee: ', error);
        alert('Error deleting employee');
      });
  }
}
