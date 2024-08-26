import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentService } from '../../document.service';

@Component({
  selector: 'app-update-document',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-document.component.html',
  styleUrl: './update-document.component.css'
})
export class UpdateDocumentComponent{
  @ViewChild('asContractorName', {static: false}) inputContractorName!: ElementRef;
  @ViewChild('asHiredName', {static: false}) inputHiredName!: ElementRef;
  @ViewChild('asContractValue', {static: false}) inputContractValue!: ElementRef;

  constructor(private documentService: DocumentService){}

  onSubmit() {
    const contractorName: string = this.inputContractorName.nativeElement.value;
    const hiredName: string = this.inputHiredName.nativeElement.value;
    const contractValue: number = this.inputContractValue.nativeElement.value;



    this.documentService.updateDocument(contractorName, hiredName, contractValue);
  }
}
