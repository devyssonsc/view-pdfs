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

  imageString: string | null = null;

  urlApi: string = "http://localhost:8080/api";

  htmlContent: string = '';
  pdfUrl?: string;

  constructor(private documentService: DocumentService, private httpClient: HttpClient, private renderer: Renderer2, private el: ElementRef){}

  onSubmit() {
    const contractorName: string = this.inputContractorName.nativeElement.value;
    const hiredName: string = this.inputHiredName.nativeElement.value;
    const contractValue: number = Number(this.inputContractValue.nativeElement.value);

    const formattedContractValue = contractValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', currencyDisplay: 'symbol' });

    this.documentService.changeValues(contractorName, hiredName, formattedContractValue);
    if(this.imageString){
      this.documentService.setImage(this.imageString);
    }

    const generateButton = this.el.nativeElement.querySelector('#bt-generate') as HTMLButtonElement;
    this.renderer.setProperty(generateButton, 'disabled', false);
  }

  onFileSelected(e: Event) {
    const imageFile = (e.target as HTMLInputElement).files?.[0];
    if(imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageString = reader.result as string;
      };
      reader.readAsDataURL(imageFile);
    }
  }

  generateContract() {
    this.documentService.htmlContent$.subscribe(
      (htmlContent) => {
      this.htmlContent = htmlContent
      }
    );

    console.log(this.htmlContent);

    const headers = new HttpHeaders({ 'Content-Type': 'text/html' });
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

    this.httpClient.get(`${this.urlApi}/download/20`, { headers, responseType: 'blob' }).subscribe(
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
