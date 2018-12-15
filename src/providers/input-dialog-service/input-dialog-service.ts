//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EasyOutServiceProvider } from '../easy-out-service/easy-out-service';
import { AlertController,  ModalController, Select, ItemSliding} from 'ionic-angular';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {
  modalPage;
  /*
  showPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      title: item ? 'Edit Notification Details' : 'Add Item',
      message: item ? "Please edit information..." : 'Please enter information',
      inputs: [
        {
          name: 'manager',
          placeholder: 'manager',
          value: item ? item.manager : null
        },
        {
          name: 'message',
          placeholder: 'message',
          value: item ? item.message : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            if (index != undefined) {
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(item);
            }
            this.dataService.editItem(item, index);
          }
        }
      ]
    });
    prompt.present();
  }
*/
  //constructor(public http: HttpClient) {
  constructor(public dataService: EasyOutServiceProvider, public alertCtrl: AlertController, public modalCtrl : ModalController) {
    console.log('Hello InputDialogServiceProvider Provider');
  }
  public openModal(item?, index?){
    console.log('open');
    var data = { 
        modalTitle : item ? 'Edit Report Details' : 'Add Report Details',
        modalMessage : item ?  "Please edit information..." : "Please enter information..", 
        name : item ? item.name : null, 
        message : item ? item.message : null, 
        remarks : item ? item.remarks : null,
        _id : item ? item._id : null, 
      };
    this.modalPage = this.modalCtrl.create('ModalPage',data); 
    this.modalPage.onDidDismiss(returnedDataFromModal =>{
      if(returnedDataFromModal!=undefined){ //Save data
        if(index != undefined){
          this.dataService.editItem(returnedDataFromModal,index);
        }else{
          this.dataService.addItem(returnedDataFromModal);
        }
      }
    });
    this.modalPage.present();
  }
}
