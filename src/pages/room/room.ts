import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import * as firebase from 'Firebase';
/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

	rooms = [];
	emptyonly=[];
	ref = firebase.database().ref('chatrooms/');
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.ref.on('value', resp => {
  		console.log(resp);
    this.rooms = [];
    this.rooms = snapshotToArray(resp);
    this.emptyonly.forEach(
    	anak => {
    		if (anak.chats == undefined) {
    			console.log(anak.roomname + " kosong");
    		this.rooms.push(anak);
    	}
    	}
    	);
    console.log(this.rooms);
  });
  }

addRoom() {
  this.navCtrl.push(AddRoomPage);
}

joinRoom(key) {
  this.navCtrl.setRoot(HomePage, {
    key:key,
    nickname:this.navParams.get("nickname")
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
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

//experiment
export const snapshotToArray2 = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
