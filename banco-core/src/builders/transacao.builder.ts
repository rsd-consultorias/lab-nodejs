/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import { DEPOSITO_INICIAL_MINIMO } from "../constants";
import { Transacao } from "../model/transacao";

export function buildTransacaoInicialMinima(idContaCorrente: string): Transacao {
    let transacao = new Transacao();
    transacao.contaCorrenteId = idContaCorrente;
    transacao.valor = DEPOSITO_INICIAL_MINIMO;
    transacao.data = new Date();
    transacao.natureza = 'C';

    return transacao;
}

export function buildTransacaoInicialComValor(idContaCorrente: string, valor: number): Transacao {
    let transacao = new Transacao();
    transacao.contaCorrenteId = idContaCorrente;
    transacao.valor = valor;
    transacao.data = new Date();
    transacao.natureza = 'C';

    return transacao;
}