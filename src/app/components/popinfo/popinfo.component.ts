import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}
  pulsado(value: string){
    console.log(value);
    this.popoverController.dismiss({
      item: value
    });
  }
}
