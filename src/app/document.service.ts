import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Document } from './models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  document: Document = new Document();

  constructor() { }

  updateDocument(contractorName: string, hiredName: string, contractValue: number) {
    if(contractorName != this.document.getNomeContratante()){
      this.document.setNomeContratante(contractorName);
    }
    if(hiredName != this.document.getNomeContratado()){
      this.document.setNomeContratado(hiredName);
    }
    if(contractValue != this.document.getValorContrato()){
      this.document.setValorContrato(contractValue);
    }
  }
}
