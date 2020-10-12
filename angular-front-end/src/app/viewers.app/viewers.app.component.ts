import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Data } from './interfaces/data';

@Component({
  selector: 'app-viewers-app',
  animations: [
    trigger('stepAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', position: 'absolute' }),
        animate('1.7s 0.3s ease', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)', position: 'absolute' }),
        animate('1s ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])],
  templateUrl: './viewers.app.component.html',
  styleUrls: ['./viewers.app.component.css'],
})
export class ViewersComponent implements OnInit {
  Data: Data;
  Preferences: string[];
  message: string;
  viewerType: String;
  counter: number = 0;
  backgroundColors = ['rgb(254,110,112)', 'rgb(185,234,62)', 'rgb(73,186,230)', 'rgb(231,228,70)', 'rgb(206,82,236)'];
  borderColors = ['rgb(231, 60,62)', 'rgb(173,233,21)', 'rgb(28,174,231)', 'rgb(230,226,24)', 'rgb(198,42,236)'];
  error:any;

  constructor(private apiService: ApiService, private router: Router) {}

  async newDataAsync() {
    try{
      this.Data = await this.apiService.getDataAsync();
      this.message = this.Data.data.status.message;
      this.preferences();
      this.changeViewer(this.Preferences);
    }catch(error){
      this.error = error;
    }
  }

  changeViewer(viewers: string[]) {
    if (this.Preferences.length === 0) {
      setTimeout(() => this.newDataAsync(), 5000);
    } else if (this.Preferences.length === 1) {
      this.viewerType = this.Preferences[0];
      setTimeout(() => this.newDataAsync(), 5000);
    } else {
      this.viewerType = this.Preferences[this.counter]
      let interval = setInterval(() => {
        this.viewerType = this.Preferences[this.counter + 1]
        this.counter++;
        if (this.counter === (viewers.length)) {
          this.counter = 0;
          clearInterval(interval);
          this.newDataAsync();
        }
      }, 5000);
    }

  }

  setPreferences(values: Data["data"]["preferences"]) {
    let preferences: string[] = []
    for (let props in values) {
      if (values[props]) {
        preferences.push(props)
      }
    }
    return preferences;
  };

  async preferences() {
    this.Preferences = this.setPreferences(this.Data.data.preferences);
  };

  goToPreferences() {
    this.router.navigate(['admin/preferences']);
  };

  ngOnInit(): void {
    this.newDataAsync();
  };
}
