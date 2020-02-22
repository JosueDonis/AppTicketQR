import { Component } from "@angular/core";
import { TicketService } from "../services/ticket.service";
import { LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

declare let window: any;
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(private ticketService: TicketService, public loadingController: LoadingController, private barcodeScanner: BarcodeScanner) {
    this.User = {};
  }

  showAlert: boolean;
  User: any = {};

  async scanner() {
    this.showAlert = false;
    const result = await this.barcodeScanner.scan();
    if(result) {
      console.log('result: ', result);
      if (typeof result.text !== "undefined" && result.text !== "") {
        const loading = await this.loadingController.create({
          message: 'Espere...',
          duration: 2000
        });
        await this.ticketService.getOne({ code: result.text }).subscribe(
          (data: any) => {
            this.User = data;
            const tmpObj = JSON.parse(this.User.owner);
            this.User.name = tmpObj.name;
            this.User.email = tmpObj.email;
            this.User.phone = tmpObj.phone;
            this.showAlert = this.User.statusId != null ? true : false;
          },
          err => {
            console.log(`Error: `, err);
          }
        );
        await loading.present();
        const { role, data } = await loading.onDidDismiss();
      }
    }
  }

  validateTicket() {
    this.User.statusId = 1;
    this.ticketService.update(this.User).subscribe(
      data => {
        this.showAlert = true;
      },
      err => {
        console.error(err);
      }
    );
  }
}
