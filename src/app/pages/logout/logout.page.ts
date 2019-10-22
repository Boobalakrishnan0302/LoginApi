import { Component, OnInit } from '@angular/core';
import{UserService} from '../../user.service';
import { ToastController } from '@ionic/angular';
class User {
  email: string;
  
  constructor(
    email : string,
    old_password: string,
    new_password:string,

  ) {  }
}

class Changeuser{
  email: string;

  constructor(
    email : string,
    userName: string,
   
  ) {  }

}

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
value=false;

  password = new User('','','');

  myuser= new Changeuser('','');

  public showPass = false;
  public type = 'password';
  public myemail=localStorage.getItem('myDataKey');
  public username=localStorage.getItem('userName');

  constructor(private userSer:UserService,private toast:ToastController) { }

  

  ngOnInit() {
  }
  async presentToast() {
    const toast = await this.toast.create({
      message: 'Your value have been updated',
      duration: 2000
    });
    toast.present();
  }
  changePassword(){
    this.password.email=localStorage.getItem('myDataKey');
    console.log(this.password);
    this.userSer.password(this.password).subscribe((val : any) =>{
      if(val.status== 200){
          localStorage.set
          this.presentToast()
      }
      else{
        this.value=true;
      }

    })
  
  }

  showHide(){
    this.showPass = !this.showPass;
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  changeUserName(){
    this.myuser.email=localStorage.getItem('myDataKey');
    console.log(this.myuser);

    this.userSer.userChange(this.myuser).subscribe( (val : any) =>{
      if(val.status==200){
        localStorage.setItem('userName',(val.updatedUser));
        this.username=localStorage.getItem('userName');
        console.log(this.username);
        this.presentToast();
      }
      else{
        this.value=true;
      }
    })

  }

}
