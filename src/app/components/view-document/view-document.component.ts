import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-document',
  standalone: true,
  imports: [],
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.css'
})
export class ViewDocumentComponent implements OnInit {
  nomeContratante: string = '';
  nomeContratado: string = '';
  valorContrato: number = 0;

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
}
