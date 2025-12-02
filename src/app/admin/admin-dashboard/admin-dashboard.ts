import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
selected = new Date()
chartOptions: Highcharts.Options = {}; // Required

isSidebarOpen:boolean=true

constructor(){
  this.chartOptions={
    
  }
}
toggleSidebar(){
  this.isSidebarOpen=!this.isSidebarOpen
}
}
