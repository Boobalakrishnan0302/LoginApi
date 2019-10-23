import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import{UserService} from '../user.service';
import { Router } from '@angular/router';

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
export class HomePage {
  value=false;

  user = new User('','');



  constructor(private userser:UserService,private route:Router) {}

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



}
