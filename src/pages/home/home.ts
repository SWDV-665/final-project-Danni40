import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { EasyOutServiceProvider } from '../../providers/easy-out-service/easy-out-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "EasyOut";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: EasyOutServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {

  }

  loadItems(){
    return this.dataService.getItems();
  }

  removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    let message = "Manager: " + item.manager + "\nMessage: " + item.message;
    let subject = "Shared via EasyOut App"

        // Check if sharing via email is supported
    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Error while sharing", error);
      // Sharing via email is not possible
    });
  }

  editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    //this.inputDialogService.showPrompt(item, index);
    this.inputDialogService.openModal(item,index);

  }

  addItem() {
    console.log("Adding Item");
    //this.inputDialogService.showPrompt();
    this.inputDialogService.openModal();
  }

}
