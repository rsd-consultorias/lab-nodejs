/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import assert from 'assert';
import 'mocha';
import { buildTransacaoInicialComValor, buildTransacaoInicialMinima } from '../src/builders/transacao.builder';
import { DEPOSITO_INICIAL_MINIMO } from '../src/constants';

describe('Criar Transações - Testar builders', () => {
    describe('Criar transacao mínima', () => {
        let transacaoMinima = buildTransacaoInicialMinima('434535345');

        it('Transação deve ser criada', () => {
            assert.equal(transacaoMinima == undefined, false);
        });

        it('Transação mínima deve ser R$ 50,00', () => {
            assert.equal(transacaoMinima.valor, DEPOSITO_INICIAL_MINIMO);
        });
    });

    describe('Criar transacao inicial com valor', () => {
        let transacaoInicial = buildTransacaoInicialComValor('434535345', 50000);

        it('Transação deve ser criada com o valor informado', () => {
            assert.equal(transacaoInicial == undefined, false);
            assert.equal(transacaoInicial.valor, 50000);
        });
    });
});