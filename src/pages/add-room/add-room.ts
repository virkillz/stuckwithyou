import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';


@IonicPage()
@Component({
  selector: 'page-add-room',
  templateUrl: 'add-room.html',
})
export class AddRoomPage {

	data = { roomname:'' };
	ref = firebase.database().ref('chatrooms/');
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

	addRoom() {
	  let newData = this.ref.push();
	  newData.set({
	    roomname:this.data.roomname
	  });
	  this.navCtrl.pop();
	}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
  }

}
