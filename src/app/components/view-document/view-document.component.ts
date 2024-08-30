import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-view-document',
  standalone: true,
  imports: [],
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.scss'
})
export class ViewDocumentComponent implements AfterViewInit {
  @ViewChild('asContentContract', { static: false }) htmlContentValue!: ElementRef;

  @ViewChildren('nomeContratante', { read: ElementRef }) nomesContratantes!: QueryList<ElementRef>;
  @ViewChildren('nomeContratado', { read: ElementRef }) nomesContratados!: QueryList<ElementRef>;
  @ViewChildren('valorContrato', { read: ElementRef }) valoresContratos!: QueryList<ElementRef>;

  htmlContent?: any;

  nomeContratante: string = '';
  nomeContratado: string = '';
  valorContrato: number = 9999;

  constructor(private documentService: DocumentService, private renderer: Renderer2) { }


  ngAfterViewInit(): void {
    this.documentService.nomeContratante.subscribe(
      (nomeContratante) => {
        this.nomesContratantes.forEach((nomeElement: ElementRef) => {
          this.renderer.setProperty(nomeElement.nativeElement, 'innerHTML', nomeContratante);
        })
        this.htmlContent = this.htmlContentValue.nativeElement.innerHTML;
        this.documentService.updateHtmlContent(this.htmlContent);
      }

    );

    this.documentService.nomeContratado.subscribe(
      (nomeContratado) => {
        this.nomesContratados.forEach((nomeElement: ElementRef) => {
          this.renderer.setProperty(nomeElement.nativeElement, 'innerHTML', nomeContratado);
        })
        this.htmlContent = this.htmlContentValue.nativeElement.innerHTML;
        this.documentService.updateHtmlContent(this.htmlContent);
      }
    );

    this.documentService.valorContrato.subscribe(
      (valorContrato) => {
        this.valoresContratos.forEach((nomeElement: ElementRef) => {
          this.renderer.setProperty(nomeElement.nativeElement, 'innerHTML', valorContrato);
        })
        this.htmlContent = this.htmlContentValue.nativeElement.innerHTML;
        this.documentService.updateHtmlContent(this.htmlContent);
      }
    );
  }
}
