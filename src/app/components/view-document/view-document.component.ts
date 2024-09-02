import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, SecurityContext, ViewChild, ViewChildren } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import DOMPurify from 'dompurify';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-document',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.scss'
})
export class ViewDocumentComponent implements AfterViewInit {
  @ViewChild('asContentContract', { static: false }) htmlContentValue!: ElementRef;

  @ViewChildren('nomeContratante', { read: ElementRef }) nomesContratantes!: QueryList<ElementRef>;
  @ViewChildren('nomeContratado', { read: ElementRef }) nomesContratados!: QueryList<ElementRef>;
  @ViewChildren('valorContrato', { read: ElementRef }) valoresContratos!: QueryList<ElementRef>;

  htmlContent?: any;

  image: string | null = null;

  nomeContratante: string = '';
  nomeContratado: string = '';
  valorContrato: number = 9999;

  constructor(private documentService: DocumentService, private renderer: Renderer2) { }


  ngAfterViewInit(): void {
    this.documentService.image$.subscribe(
      (image) => {
        this.image = image;
        this.sanitizeAndUpdateHtml();
      }
    )

    this.documentService.nomeContratante$.subscribe(
      (nomeContratante) => {
        this.nomesContratantes.forEach((nomeElement: ElementRef) => {
          this.renderer.setProperty(nomeElement.nativeElement, 'innerText', nomeContratante);
        })
        this.sanitizeAndUpdateHtml();
      }

    );

    this.documentService.nomeContratado$.subscribe(
      (nomeContratado) => {
        this.nomesContratados.forEach((nomeElement: ElementRef) => {
          this.renderer.setProperty(nomeElement.nativeElement, 'innerText', nomeContratado);
        });
        this.sanitizeAndUpdateHtml();
      }
    );

    this.documentService.valorContrato$.subscribe(
      (valorContrato) => {
        this.valoresContratos.forEach((nomeElement: ElementRef) => {
          this.renderer.setProperty(nomeElement.nativeElement, 'innerText', valorContrato);
        });
        this.sanitizeAndUpdateHtml();
      }
    );
  }

  private sanitizeAndUpdateHtml() {
    this.htmlContent = this.htmlContentValue.nativeElement.innerHTML;

    this.htmlContent = this.htmlContent.replace("background-image: url(&quot;null&quot;);", `background-image: url(${this.image});`)

    const sanitizedContent = DOMPurify.sanitize(this.htmlContent, {
      ALLOWED_TAGS: ['div', 'p', 'b', 'h2', 'span'],
      ALLOWED_ATTR: ['style']
    });

    if(sanitizedContent) {
      this.documentService.updateHtmlContent(sanitizedContent);
    } else{
      console.error("Sanitized content is null");
    }
  }
}
