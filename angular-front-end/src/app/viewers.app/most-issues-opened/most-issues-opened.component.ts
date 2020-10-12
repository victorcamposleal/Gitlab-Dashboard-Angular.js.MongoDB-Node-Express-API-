import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { IssuesCreated } from '../interfaces/issuesCreated';
import { Chart } from '../interfaces/chart';

@Component({
  selector: 'app-most-issues-opened',
  templateUrl: './most-issues-opened.component.html',
  styleUrls: ['./most-issues-opened.component.css', '../viewers-style.css']
})
export class MostIssuesOpenedComponent implements OnInit {
  @Input() backgroundColors: string[];
  @Input() borderColors:string[];

  mostIssuesOpened: IssuesCreated[];
  
  chart:Chart = {
    type: "",
    data: {},
    options: {}
  };

  constructor(private apiService: ApiService) {}

  async newDataAsync() {
    let data = await this.apiService.getDataAsync()
    this.mostIssuesOpened = data.data.issues.mostIssuesOpened;
    let projects = this.mostIssuesOpened.map(project => project.name);  
    let issues = this.mostIssuesOpened.map(project => project.datos.statistics.counts.opened);
    let chartBackgroundColors = this.backgroundColors.slice(0, this.mostIssuesOpened.length); 
    let chartBorderColors = this.borderColors.slice(0, this.mostIssuesOpened.length); 

    this.chart = {
      type: 'bar',
      data: {
        labels: [...projects],
        datasets: [
          {
            data: [...issues],
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
          xAxes: [{
            ticks: {
              fontColor: 'white', fontSize: 15, fontFamily: "'Asap', sans-serif", padding: 20
            },
            gridLines: false,
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true, display: false
            }, gridLines: false,
          }]
        }
      }
    };
  }

  ngOnInit(): void {
    this.newDataAsync();
  }

}
