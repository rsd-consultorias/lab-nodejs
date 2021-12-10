/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import { ContaCorrente } from "../model/conta-corrente";

export function buildNovaContaCorrente(tipo: string): ContaCorrente {
    let contaCorrente = new ContaCorrente(
        '243234',
        '4343',
        0,
        tipo);

    return contaCorrente;
}