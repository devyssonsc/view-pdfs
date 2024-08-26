export class Document {
    private _nomeContratante: string;
    private _nomeContratado: string;
    private _valorContrato: number;

    constructor() {
        this._nomeContratante = '';
        this._nomeContratado = '';
        this._valorContrato = 0;
    }

    getNomeContratante(): string {
        return this._nomeContratante;
    }

    setNomeContratante(value: string) {
        this._nomeContratante = value;
    }

    getNomeContratado(): string {
        return this._nomeContratado;
    }

    setNomeContratado(value: string) {
        this._nomeContratado = value;
    }

    getValorContrato(): number {
        return this._valorContrato;
    }

    setValorContrato(value: number) {
        this._valorContrato = value;
    }
}