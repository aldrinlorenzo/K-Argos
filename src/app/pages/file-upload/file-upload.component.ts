import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


import {FileUploadService} from "../../services/file-upload.service";
import {Item} from "../../models/item";
import {PandoraIntelligenceService} from "../../services/pandora-intelligence.service";
import {ITEMS} from "../../models/mock-preload";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: [ './file-upload.component.css', './bootstrap.min.css' ],
})
export class FileUploadComponent implements OnInit {
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  pageOfItems?: Array<any>;
  items: Item[] = [];
  uploaded: boolean = false;

  constructor(
    private uploadService: FileUploadService,
    private pandoraService: PandoraIntelligenceService) {

  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.progress = 0;
    this.message = '';
    this.currentFile = event.target.files.item(0);
    this.items = ITEMS;
    this.uploaded = true;
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  upload(): void {
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          console.log(err);

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
          this.progress = 0;
        },
        complete: () => {
          this.currentFile = undefined;
        }
      });
    }
  }

  getRiskInspectionProbability(id: string) {
    // upload the item for pandora analysis then
    // check the status if completed and retrieve @response.riskLevel
    return this.pandoraService.getInvestigationStatus(id).subscribe((response) => {
      return response;
    });
  }

}
