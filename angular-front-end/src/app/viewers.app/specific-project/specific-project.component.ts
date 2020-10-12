import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { Chart } from '../interfaces/chart';
import { Member } from '../interfaces/members';
import { Issues } from '../interfaces/issuesSpecificProject'

@Component({
  selector: 'app-specific-project',
  templateUrl: './specific-project.component.html',
  styleUrls: ['./specific-project.component.css', '../viewers-style.css']
})
export class SpecificProjectComponent implements OnInit {
  @Input() backgroundColors: string[];
  @Input() borderColors:string[];

  issuesStatusPerProject: Issues;
  mostCollaborativePerProject: Member[];
  chosenProjectName: string;
  message: string;

  chart: Chart = {
    type: "",
    data: {},
    options: {}
  };

  chart2: Chart = {
    type: "",
    data: {},
    options: {}
  };

  constructor(private apiService: ApiService, private router: Router) { }

  async newDataAsync() {
    let data = await this.apiService.getDataAsync()
    this.message = data.data.status.message;

    this.issuesStatusPerProject = data.data.chosenProject.issues.statistics.counts;
    this.mostCollaborativePerProject = data.data.chosenProject.members.sort((a, b) => b.commits - a.commits).slice(0, 5);
    this.chosenProjectName = data.data.chosenProject.name;

    let mostCollaborativeProjectName = this.mostCollaborativePerProject.map(value =>(value.name))
    let mostCollaborativeProjectCommit = this.mostCollaborativePerProject.map(value =>(value.commits))
    let chartBackgroundColors = this.backgroundColors.slice(0, this.mostCollaborativePerProject.length); 
    let chartBorderColors = this.borderColors.slice(0, this.mostCollaborativePerProject.length); 

    this.chart = {
      type: 'pie',
      data: {
        datasets: [{
          fillOpacity: .5,
          data: [this.issuesStatusPerProject.opened, this.issuesStatusPerProject.closed],
          backgroundColor: [
            'rgb(231, 75, 77)',
            'rgb(133, 220, 89)'
          ],
          borderColor: [
            'white',
            'white'
          ],
          borderWidth: 2
        }]
      },
      options: {
        legend : {
          display: false
        }      
      }
    };
    this.chart2 = {
      type: 'horizontalBar',
      data: {
        labels: [...mostCollaborativeProjectName],
        datasets: [
          {
            data: [...mostCollaborativeProjectCommit],
            backgroundColor: [...chartBackgroundColors],
            borderColor: [...chartBorderColors],
            borderWidth: 2,
            borderSkipped: 'false',
            barPercentage: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'white', fontSize: 15, fontFamily: "'Asap', sans-serif", padding: 20
            },
            gridLines: false,
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true, display: false
            }, gridLines: false,
          }]
        }
      }
    };
  }

  goToPreferences() {
    this.router.navigate(['admin/preferences']);
  }


  ngOnInit(): void {
    this.newDataAsync();
  }

}
