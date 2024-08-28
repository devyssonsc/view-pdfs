import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-view-document',
  standalone: true,
  imports: [],
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.css'
})
export class ViewDocumentComponent implements OnInit, AfterViewInit {
  @ViewChild('asContentContract', {static: false}) htmlContentValue!: ElementRef;

  nomeContratante: string = '';
  nomeContratado: string = '';
  valorContrato?: number;

  constructor(private documentService: DocumentService){}

  ngOnInit() {
    this.documentService.nomeContratante.subscribe(
      (nomeContratante) => {
        this.nomeContratante = nomeContratante;
      }
    );

    this.documentService.nomeContratado.subscribe(
      (nomeContratado) => {
        this.nomeContratado = nomeContratado;
      }
    );

    this.documentService.valorContrato.subscribe(
      (valorContrato) => {
        this.valorContrato = valorContrato;
      }
    );
  }

  ngAfterViewInit(): void {
    const htmlContent = this.htmlContentValue.nativeElement.innerHTML;
    this.documentService.updateHtmlContent(htmlContent)
  }
}
