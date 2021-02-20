import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {
  platformFilterSelection: string[] = [];
  categoryFilterSelection: string[] = [];
  constructor(
    private popover: PopoverController
  ) { }

  ngOnInit() {}
  selectPlatformFilter(ev:any):void{
    this.platformFilterSelection = ev.detail.value;
    
  }
  selectCategoryFilter(ev:any):void{
    this.categoryFilterSelection = ev.detail.value;
  }

  sendFilters(){
    
    this.popover.dismiss({
      platform: this.platformFilterSelection,
      category: this.categoryFilterSelection
    })
  }

}
