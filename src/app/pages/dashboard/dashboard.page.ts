import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  selectedPath=''
  pages=[
    {
      title:'Dashboard',
      url:'/dashboard/first'
    },{
      title:'MyProfile',
      url:'/dashboard/second'
    }
  ]
  value1="fasle";

  constructor(private router:Router) {
    this.router.events.subscribe((event:RouterEvent)=>{
      if(event && event.url){
        this.selectedPath=event.url;
      }
    });
   }

  ngOnInit() {
  }

}
