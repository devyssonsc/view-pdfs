import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-document',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './update-document.component.html',
  styleUrl: './update-document.component.scss'
})
export class UpdateDocumentComponent{
  @ViewChild('asContractorName', {static: false}) inputContractorName!: ElementRef;
  @ViewChild('asHiredName', {static: false}) inputHiredName!: ElementRef;
  @ViewChild('asContractValue', {static: false}) inputContractValue!: ElementRef;

  urlApi: string = "http://localhost:8080/api";

  htmlContent: string = '';
  pdfUrl?: string;

  constructor(private documentService: DocumentService, private httpClient: HttpClient, private renderer: Renderer2, private el: ElementRef){}

  onSubmit() {
    const contractorName: string = this.inputContractorName.nativeElement.value;
    const hiredName: string = this.inputHiredName.nativeElement.value;
    const contractValue: number = this.inputContractValue.nativeElement.value;

    this.documentService.changeValues(contractorName, hiredName, contractValue);

    const generateButton = this.el.nativeElement.querySelector('#bt-generate') as HTMLButtonElement;
    this.renderer.setProperty(generateButton, 'disabled', false);
  }

  generateContract() {
    this.documentService.htmlContent.subscribe(
      (htmlContent) => this.htmlContent = htmlContent
    );

    console.log(this.htmlContent);

    const headers = { 'Content-Type': 'text/html' };
    this.httpClient.post(`${this.urlApi}/upload`, this.htmlContent, { headers, responseType: 'text' }).subscribe(
      (resultado) => {
        console.log(resultado);
        const downloadButton = this.el.nativeElement.querySelector('#bt-download') as HTMLButtonElement;
        this.renderer.setProperty(downloadButton, 'disabled', false);
      },
      (error) => {
        console.log(error);
      }
    )

  }

  downloadPdf() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/pdf',
    });

    this.httpClient.get(`${this.urlApi}/download/10`, { headers, responseType: 'blob' }).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'arquivo.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    );
  }
}
