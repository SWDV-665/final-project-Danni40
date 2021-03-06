import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { EasyOutServiceProvider } from '../../providers/easy-out-service/easy-out-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "EasyOut";
  screen: any;
  state: boolean = false;
  userScreenshot: string;
  items = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: EasyOutServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing, private platform: Platform) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    this.loadItems();
  }
  loadItems(){
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error
        );
  }

  removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(item);
  }

  shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    let message = "Manager: " + item.name + "\nMessage: " + item.message + "\nRemarks: " + item.remarks;
    let subject = "Shared via EasyOut App"

     //sharing via email

    this.socialSharing.shareViaEmail(message, subject, ['dslewis40@outlook.com']).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Error while sharing", error);
      // Sharing via email is not possible
    });
  }

  editItem(item, index) {
    console.log("Edit Item - ", item.name);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    //this.inputDialogService.showPrompt(item, index);
    this.inputDialogService.openModal(item, index);

  }

  addItem() {
    console.log("Adding Item");
    //this.inputDialogService.showPrompt();
    this.inputDialogService.openModal();
  }
  
  showPlatform() {
    let text = 'I run on: ' + this.platform.platforms();
    let alert = this.alertCtrl.create({
      title: 'My Home',
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present();
  }
 
}
