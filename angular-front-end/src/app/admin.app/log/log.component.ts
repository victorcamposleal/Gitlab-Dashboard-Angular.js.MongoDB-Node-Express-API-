import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router'; 
import { Response } from '../interfaces/response';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  model: User = { username: '', password: '' }
  errorMessage: string = "";
  messageLogIn: Response;

  constructor(private apiService:ApiService, private router:Router) {}
  
  async onSubmitAsync(){
    this.messageLogIn = await this.apiService.logInAsync(this.model);
    console.log(this.messageLogIn);
    this.errorMessage = this.messageLogIn.message;
    this.router.navigate(['admin/preferences']);
  }
  
  ngOnInit(): void {
  }
  
}
