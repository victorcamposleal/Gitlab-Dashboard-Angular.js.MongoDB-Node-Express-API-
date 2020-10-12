import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Preferences } from '../interfaces/preferences';
import { Token } from '../interfaces/token';
import { ProjectId } from '../interfaces/projectId';
import { SelectedGroup } from '../interfaces/selectedGroup';
import { Response } from '../interfaces/response';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  tokenSaved: string = "";
  viewersSaved: string = "";
  groupSaved: string = "";
  selectedProject: string;
  selectedGroupID: string;
  selectedGroup: string;
  messageLogOut: Response;
  ProjectId: ProjectId[];
  
  preferences: Preferences = {
    mostCommitsUser: false,
    mostCollaborativeProjects: false,
    mostCommitsLastWeek: false,
    totalIssues: false,
    mostIssuesCreated: false,
    mostIssuesOpen: false,
    mostIssuesClosed: false,
    bestClosingRatio: false,    
    chosenProject: false
  };
  
  model: Token = {
    token: ''
  }; 
  
  selectedProjID = {
    value: "",
    setID: function(newValue){
      this.value = newValue;
    }
  };

  constructor(private apiService:ApiService, private router: Router) {}

  changeProject(value: string){
    this.selectedProjID.setID(value);
    this.preferences.chosenProject = true;
  }

  removeProject(value: string){
    this.selectedProjID.setID(value);
    this.preferences.chosenProject = false;
  }

  changeValue(value: boolean): void {
    value = !value;
  }

  onNavigate(){
    window.open("/", "_blank");
  }

  async savePreferencesAsync(){    
    let resultPref = await this.apiService.savePreferencesAsync(this.preferences);   
    let resultID = await this.apiService.saveprojIDAsync(this.selectedProjID);
    if (resultPref.nModified === 1 || resultID.nModified === 1){
      this.viewersSaved = 'Modificado correctamente';
      setTimeout(()=>{this.viewersSaved="";}, 1000)
    }
  }

  async saveGroupIDAsync(){
    let newGroup:SelectedGroup = {
      value: this.selectedGroupID
    }
    let resultGroup = await this.apiService.saveGroupIDAsync(newGroup);
    if (resultGroup.nModified ===1){
      this.groupSaved = 'Modificado correctamente';
      this.selectedGroup = this.selectedGroupID;
      setTimeout(()=>{this.groupSaved="";}, 1000)
    }    
  }

  async saveTokenAsync(){
    let resultToken = await this.apiService.saveTokenAsync(this.model);
    if (resultToken.nModified ===1){
      this.tokenSaved = 'Modificado correctamente';
      setTimeout(()=>{this.tokenSaved="";}, 1000)
    }
  }

  async logOutAsync(){
    this.messageLogOut = await this.apiService.logOutAsync();
    this.router.navigate(['/admin/login']);
  }

  async dataAsync() {
    let data = await this.apiService.getDataAsync()
    this.ProjectId = data.data.projects;
    this.selectedGroup = data.data.chosenGroup;
  }
  
  ngOnInit(): void {
    this.dataAsync();
  }

}
