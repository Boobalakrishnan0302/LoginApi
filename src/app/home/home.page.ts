import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import{UserService} from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';

import { AlertController } from '@ionic/angular';

class User {
  email: string;
  constructor(
    email : string,
    password : string
  ) {  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  value=false;
  pushes: any = [];
  mytoken:any = {};

  price:string = '';

  user = new User('','');



  constructor(private userser:UserService,private route:Router,public fcm: FCM, public plt: Platform, public alet:AlertController, 
              public activeRoute : ActivatedRoute ) {

    this.plt.ready()
    .then(()=>{
      this.getToken();

      
      this.fcm.onNotification().subscribe(data =>{

        console.log("received notifivcation",data);
    
       
        if(data.wasTapped){
          
          this.price = JSON.stringify(data.price);
          
          console.log("myprice",this.price)


          console.log("Received in background");
        }
        else{
         
          this.price = JSON.stringify(data.price);
          
          console.log("myprice",this.price)
          this.presentAlert()
        
          console.log("Received in foreground");
        }
      });

      this.fcm.onTokenRefresh().subscribe(data =>{

      });

    });
}
  
ngOnInit(){
  let id = this.activeRoute.snapshot.paramMap.get('id');
  if(id == '1') {
    this.callMyNotify();
  }
}

  onSubmit(f: NgForm) {
  console.log("myfor", f.value)


  
    
}
myval(){
console.log(this.user);

  this.userser.login(this.user).subscribe(
    ( res : any) => {
      if(res.status== 200){
        localStorage.setItem('myDataKey',(this.user.email));
        localStorage.setItem('userName',(res.username));
        console.log(localStorage.getItem('myDataKey'));
        console.log(localStorage.getItem('userName'));
        this.route.navigateByUrl('/dashboard/first');
      }
      else{
        this.user= new User('','');
        this.value=true;
      }
      console.log(res);
    },
    err => {

    }
  )

}



callMyNotify(){
  console.log(this.mytoken)
  this.mytoken.mytoken = localStorage.getItem("myToken");
  this.userser.pusyyh(this.mytoken).subscribe(res =>{
    console.log(res);
  })
  }

  
    async presentAlert() {
    const alert = await this.alet.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: this.price,
      buttons: ['OK']
    });

    await alert.present();
  }

subscribeToTopic() {
  this.fcm.subscribeToTopic('enappd');
}
getToken() {
  this.fcm.getToken().then(token => {

    localStorage.setItem('myToken',token);

    console.log(token);
    this.mytoken.mytoken =token;
    console.log(this.mytoken)
    // Register your new token in your back-end if you want
    // backend.registerToken(token);
  });
}
unsubscribeFromTopic() {
  this.fcm.unsubscribeFromTopic('enappd');
}



}
