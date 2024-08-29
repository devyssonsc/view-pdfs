import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documentNomeContratante = new BehaviorSubject<string>("");
  public nomeContratante = this.documentNomeContratante.asObservable();

  private documentNomeContratado = new BehaviorSubject<string>("");
  public nomeContratado = this.documentNomeContratado.asObservable();

  private documentValorContrato = new BehaviorSubject<number>(9999);
  public valorContrato = this.documentValorContrato.asObservable();

  private documentHtmlContent = new BehaviorSubject<string>("");
  public htmlContent = this.documentHtmlContent.asObservable();

  constructor() { }

  changeValues(nomeContratante: string, nomeContratado: string, valorContrato: number) {
    this.documentNomeContratante.next(nomeContratante);
    this.documentNomeContratado.next(nomeContratado);
    this.documentValorContrato.next(valorContrato);
  }

  updateHtmlContent(htmlContent: string) {
    this.documentHtmlContent.next(htmlContent);
  }
}
