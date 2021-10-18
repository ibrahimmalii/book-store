import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  islogged: boolean = false;

  constructor(
    private _formBulider: FormBuilder,
    private apiService: ApiService,
    private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.form = this._formBulider.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
          Validators.email,
        ],
      ],
      // Password :['',[Validators.required,  Validators.minLength(8),Validators.maxLength(15) ,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')]]
      Password: ['', [Validators.required]],
    }); 
  }

  login() {
    this.islogged = true;
    if(this.form.valid){
      console.log(this.form.value);
      this.apiService
        .post('http://localhost:8080/api/auth/login', this.form.value)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

}
