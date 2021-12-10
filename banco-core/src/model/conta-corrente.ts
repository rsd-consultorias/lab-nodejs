/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import { EntidadeBase } from "../interfaces/entidade.base";

export class ContaCorrente extends EntidadeBase {
    agencia: string;
    numero: string;
    limiteCredito: number;
    tipo: string;

    constructor(agencia: string, numero: string, limiteCredito: number, tipo: string) {
        super();
        this.agencia = agencia;
        this.numero = numero;
        this.limiteCredito = limiteCredito;
        this.tipo = tipo;
    }
}