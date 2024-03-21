import { Component, OnInit } from '@angular/core';
import {TrackAWBService} from "../../services/track.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-maps',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  panelOpenState = false;
  hasAWB = false;
  public focus;

  public trackForm = this.formBuilder.group({
    awb: '',
  });

  constructor(private trackAWBService : TrackAWBService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.trackAWBService.getAWB(250, 33122250).subscribe(
      data => {
        console.log(data);
      }
    );
  }


  onSearch(): void {
    if (this.trackForm.value.awb.trim() == "172-83932203"){
      this.hasAWB = true;
      const awb = this.trackForm.value.awb.trim().split('-');
      if (awb.length == 2 && !isNaN(parseFloat(awb[0])) && !isNaN(parseFloat(awb[1]))){
        this.trackAWBService.getAWB(Number(awb[0]), Number(awb[1])).subscribe(
          data => {
            //this.airWaybill = data;
            console.log(data);
          }
        );
      }
    } else {
      this.hasAWB = false;
    }

  }
}
