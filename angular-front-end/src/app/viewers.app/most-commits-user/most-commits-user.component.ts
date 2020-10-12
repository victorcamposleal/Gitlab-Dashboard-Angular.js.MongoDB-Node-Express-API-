import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Users } from '../interfaces/users';
import { Chart } from '../interfaces/chart';

@Component({
  selector: 'app-most-commits-user',
  templateUrl: './most-commits-user.component.html',
  styleUrls: ['./most-commits-user.component.css', '../viewers-style.css']
})
export class MostCommitsUserComponent implements OnInit {
  @Input() backgroundColors;
  @Input() borderColors;

  mostCommits: Users[];
  commits: string[];
  chart:Chart = {
    type: "", 
    data: {}, 
    options: {}
  };

  constructor(private apiService: ApiService) {}

  async newDataAsync() {
    let data = await this.apiService.getDataAsync()
    this.mostCommits = data.data.users.mostCommits;
    let users = this.mostCommits.map(project => project.user);  
    let commits = this.mostCommits.map(project => project.commits);
    let chartBackgroundColors = this.backgroundColors.slice(0, this.mostCommits.length); 
    let chartBorderColors = this.borderColors.slice(0, this.mostCommits.length); 
    
    this.chart = {
      type: 'horizontalBar',
      data: {
        labels: [...users],
        datasets: [
          {
            data: [...commits],
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
  
  ngOnInit(): void {
    this.newDataAsync();
  }

}
