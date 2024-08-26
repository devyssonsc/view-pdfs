import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documentNomeContratante = new BehaviorSubject<string>("Contratante");
  public nomeContratante = this.documentNomeContratante.asObservable();

  private documentNomeContratado = new BehaviorSubject<string>("Contratado");
  public nomeContratado = this.documentNomeContratado.asObservable();

  private documentValorContrato = new BehaviorSubject<number>(9999);
  public valorContrato = this.documentValorContrato.asObservable();

  constructor() { }

  changeValues(nomeContratante: string, nomeContratado: string, valorContrato: number) {
    this.documentNomeContratante.next(nomeContratante);
    this.documentNomeContratado.next(nomeContratado);
    this.documentValorContrato.next(valorContrato);
  }
}
