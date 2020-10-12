import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './viewers.app/interfaces/data';
import { Preferences } from './admin.app/interfaces/preferences';
import { selectedID } from './admin.app/interfaces/selectedID';
import { SelectedGroup } from './admin.app/interfaces/selectedGroup';
import { Token } from './admin.app/interfaces/token';
import { User } from './admin.app/interfaces/user';
import { UserMessage } from './admin.app/interfaces/userMessage';
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  responseLog: any;
  responsePref: any;
  responseProjID: any;
  responseGroupID: any;
  responseTok: any;
  responseOut: any;

  constructor(private http: HttpClient) {}

  async logInAsync(model: User) {
    this.responseLog = await this.http.post(`${environment.apiBaseUrl}api/users/login`, model)
      .toPromise();
      return this.responseLog;
  }

  async logOutAsync(){
    this.responseOut = await this.http.get(`${environment.apiBaseUrl}api/users/logout`).toPromise();
    return this.responseOut;
  }

  async searchUserAsync():Promise<UserMessage>{
    return await this.http.get<UserMessage>(`${environment.apiBaseUrl}api/users/user`).toPromise();
  }

  async savePreferencesAsync(model: Preferences) {
    this.responsePref = await this.http.put(`${environment.apiBaseUrl}api/admin/mod-viewers`, model)
      .toPromise();
      return this.responsePref;
  }

  async saveprojIDAsync(model: selectedID) {
    this.responseProjID = await this.http.put(`${environment.apiBaseUrl}api/admin/mod-selected-project-ID`, model)
      .toPromise();
      return this.responseProjID;
  }

  async saveGroupIDAsync(model: SelectedGroup) {
    this.responseGroupID = await this.http.put(`${environment.apiBaseUrl}api/admin/mod-selected-group-ID`, model)
      .toPromise();
      return this.responseGroupID;
  }

  async saveTokenAsync(model: Token) {
    this.responseTok = await this.http.put(`${environment.apiBaseUrl}api/admin/mod-token`, model)
      .toPromise();
      return this.responseTok;
  }

  async getDataAsync() {
    try {
      let data = await this.http.get<Data>(`${environment.apiBaseUrl}api/info/data`).toPromise();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}



