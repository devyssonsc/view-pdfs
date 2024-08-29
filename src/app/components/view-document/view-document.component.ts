import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-view-document',
  standalone: true,
  imports: [],
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.css'
})
export class ViewDocumentComponent implements AfterViewInit {
  @ViewChild('asContentContract', {static: false}) htmlContentValue!: ElementRef;

  @ViewChildren('nomeContratante', {read: ElementRef}) nomesContratantes!: QueryList<ElementRef>;
  @ViewChildren('nomeContratado', {read: ElementRef}) nomesContratados!: QueryList<ElementRef>;
  @ViewChildren('valorContrato', {read: ElementRef}) valoresContratos!: QueryList<ElementRef>;

  nomeContratante: string = '';
  nomeContratado: string = '';
  valorContrato?: number;

  constructor(private documentService: DocumentService, private renderer: Renderer2){}
  
  
  ngAfterViewInit(): void {
    this.documentService.nomeContratante.subscribe(
      (nomeContratante) => {
        console.log(nomeContratante);
        console.log(this.nomesContratantes);
        this.nomesContratantes.forEach((nomeElement: ElementRef) => {
          this.renderer.setProperty(nomeElement.nativeElement, 'innerHTML', nomeContratante);
        })
      }
    );

    this.documentService.nomeContratado.subscribe(
      (nomeContratado) => {
        console.log(nomeContratado);
        console.log(this.nomesContratados);
        this.nomesContratados.forEach((nomeElement: ElementRef) => {
          this.renderer.setProperty(nomeElement.nativeElement, 'innerHTML', nomeContratado);
        })
      }
    );

    this.documentService.valorContrato.subscribe(
      (valorContrato) => {
        console.log(valorContrato);
        console.log(this.valoresContratos);
        this.valoresContratos.forEach((nomeElement: ElementRef) => {
          this.renderer.setProperty(nomeElement.nativeElement, 'innerHTML', valorContrato);
        })
      }
    );

    const htmlContent = this.htmlContentValue.nativeElement.innerHTML;
    this.documentService.updateHtmlContent(htmlContent)
  }
}
