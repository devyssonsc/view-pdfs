import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Subscription } from 'rxjs';
import { Document } from '../../models/document.model';

@Component({
  selector: 'app-view-document',
  standalone: true,
  imports: [],
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.css'
})
export class ViewDocumentComponent {
  nomeContratante: string = '';
  nomeContratado: string = '';
  valorContrato: number = 0;

  constructor(private documentService: DocumentService){}

  refresh() {
    this.nomeContratante = this.documentService.document.getNomeContratante();
    this.nomeContratado = this.documentService.document.getNomeContratado();
    this.valorContrato = this.documentService.document.getValorContrato();
  }
}
