import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { IssuesCreated } from '../interfaces/issuesCreated';
import { Chart } from '../interfaces/chart';
@Component({
  selector: 'app-most-issues-closed',
  templateUrl: './most-issues-closed.component.html',
  styleUrls: ['./most-issues-closed.component.css', '../viewers-style.css']
})
export class MostIssuesClosedComponent implements OnInit {
  @Input() backgroundColors: string[];
  @Input() borderColors:string[];

  mostIssuesClosed: IssuesCreated[];

  chart:Chart = {
    type: "",
    data: {},
    options: {}
  };

  constructor(private apiService: ApiService) {}

  async newDataAsync() {
    let data = await this.apiService.getDataAsync()
    this.mostIssuesClosed = data.data.issues.mostIssuesClosed;
    let projects = this.mostIssuesClosed.map(project => project.name);  
    let issues = this.mostIssuesClosed.map(project => project.datos.statistics.counts.closed);
    let chartBackgroundColors = this.backgroundColors.slice(0, this.mostIssuesClosed.length); 
    let chartBorderColors = this.borderColors.slice(0, this.mostIssuesClosed.length); 
    
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
