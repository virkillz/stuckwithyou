import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'Firebase';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  data = { nickname:"" };
  ref = firebase.database().ref('chatrooms/');
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  enterNickname() {

    //Get 5 last room, check if any of them have status open
    this.ref.limitToLast(5).orderByChild("createdtime").once('value').then(snapshot => {
      var availableRoom=[];
      var rooms = snapshotToArray(snapshot);
      rooms.forEach(room =>{
        if (room.status=='open') {availableRoom.push(room)}
      });
      // console.log(availableRoom);

      if (availableRoom.length>0) {
        //join first room
        console.log(availableRoom[0].key);
                  this.navCtrl.setRoot(HomePage, {
                  nickname: this.data.nickname,
                  key: availableRoom[0].key,
                  action:"activate"
                });
      } else {
            //create new room
            var d = new Date();
            var n = d.getTime();
            // CREATE NEW ROOM AND ENTER
            let newData = this.ref.push({
                roomname: "Burmese",
                status: "open",
                createdtime:n
            }).then((snap)=>{
                this.navCtrl.setRoot(HomePage, {
                  nickname: this.data.nickname,
                  key: snap.key
                });
            });
      }
  });

}


  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
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
