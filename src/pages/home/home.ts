import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, Platform } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import * as firebase from 'Firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
@ViewChild(Content) content: Content;
data = { type:'', nickname:'', message:'' };
chats = [];
roomkey:string;
nickname:string;
offStatus:boolean = false;
action:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
	this.roomkey = this.navParams.get("key") as string;
  	this.nickname = this.navParams.get("nickname") as string;
  	this.action = this.navParams.get("action") as string;
  	this.data.type = 'message';
  	this.data.nickname = this.nickname;

	  let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
	  joinData.set({
	    type:'join',
	    user:this.nickname,
	    message:this.nickname+' has joined this room.',
	    sendDate:Date()
	  });

	if (this.action=='activate') {
		var d = new Date();
        var n = d.getTime();
	  let changeStatus = firebase.database().ref('chatrooms/'+this.roomkey);
	  changeStatus.update({
	    status:'active',
	    activetime:n
	  });		
	}	  
	  this.data.message = '';


	  firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {
	    this.chats = [];
	    this.chats = snapshotToArray(resp);
	    setTimeout(() => {
	      if(this.offStatus === false) {
	        this.content.scrollToBottom(300);
	      }
	    }, 1000);
	  });

	  platform.registerBackButtonAction(() => {
	        //sometimes the best thing you can do is not think, not wonder, not imagine, not obsess. 
	        //just breathe, and have faith that everything will work out for the best.
	      },1);
	  }

  sendMessage() {
  let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
  newData.set({
    type:this.data.type,
    user:this.data.nickname,
    message:this.data.message,
    sendDate:Date()
  });
  this.data.message = '';
}

exitChat() {
  let exitData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
  exitData.set({
    type:'exit',
    user:this.nickname,
    message:this.nickname+' has exited this room.',
    sendDate:Date()
  });

  this.offStatus = true;

  this.navCtrl.setRoot(SigninPage, {
    nickname:this.nickname
  });
}

}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
