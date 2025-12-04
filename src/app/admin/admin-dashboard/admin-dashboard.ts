import { Component, inject } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Apiservices } from '../../services/apiservices';
import { Router } from 'express';
@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  selected = new Date()
  chartOptions: Highcharts.Options = {}; // Required
  api = inject(Apiservices)
  router=inject(Router)
  isSidebarOpen: boolean = true

  usercount: number = 0
  recipeCount: number = 0
  downloadCount: number = 0
  notification: number = 0

  constructor() {
    if(localStorage.getItem("chart")){
const chartData=JSON.parse(localStorage.getItem("chart")||"")
this.chartOptions = {
      chart: {
        type: "bar"
      },
      title: {
        text: "Analysis of download recipes based on cuisines"
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        title: {
          text: "Total Download Recipe Count"
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: "cuisine",
          colorByPoint: true,
          type: "bar",
          data:chartData
         
        }
      ],

    }
    }
  }

  ngOnInit() {
    this.getUser()
    this.getRecipe()
    this.getDownloads()
    this.getNotification()
  }
  getUser() {
    this.api.getAllUserApi().subscribe((res: any) => {
      this.usercount = res.length
    })
  }

  getRecipe() {
    this.api.getallrecipesAPI().subscribe((res: any) => {
      this.recipeCount = res.length
    })
  }

  getDownloads() {
    this.api.getUserDownloadrecipi().subscribe((res: any) => {
      this.downloadCount = res.map((item: any) => item.count).reduce((acc: any, curr: any) => acc + curr)
    })
  }
  getNotification() {
    this.api.getAllFeedbackApi().subscribe((res: any) => {
      this.notification = res.length
    })
  }
logout(){
  sessionStorage.clear()
  this.router.naviagateByUrl('/')
}




  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }
}
