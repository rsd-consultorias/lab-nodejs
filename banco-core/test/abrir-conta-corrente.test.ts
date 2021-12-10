/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import assert from 'assert';
import 'mocha';
import { CONTA_CORRENTE_VAREJO, CONTA_CORRENTE_VIP, DEPOSITO_INICIAL_MINIMO, LIMITE_CREDITO_INICIAL } from '../src/constants';
import { ApplicationResultDTO } from '../src/dto/application-result.dto';
import { ContaCorrente } from '../src/model/conta-corrente';
import { contaCorrenteAppService, correntistaRepository } from './setup';

describe('Cadastro de Correntista', () => {

    describe('Validar CPF', () => {
        let contaCorrente: ApplicationResultDTO<ContaCorrente>;
        before(() => {
            contaCorrente = contaCorrenteAppService.abrirContaCorrente({
                cpf: '1234567',
                dataNascimento: new Date(1984, 8, 8),
                nome: 'Correntista VIP',
                bairro: 'Suissa',
                rua: 'Panorama',
                email: 'teste@teste'
            }, 5456067);
        });
        
        it('Não pode validar a abertura da conta', () => {
            assert.equal(contaCorrente.success, false);
        });

        it('Deve retornar mensagem de CPF inválido', () => {
            assert.equal(contaCorrente.message, 'CPF informado não é válido');
        });
    });

    describe('Cadastrar correntista VIP - depósito inicial > R$ 5.000,00', () => {
        let contaCorrente: ContaCorrente | undefined;
        before(() => {
            contaCorrente = contaCorrenteAppService.abrirContaCorrente({
                cpf: '12345678901',
                dataNascimento: new Date(1984, 8, 8),
                nome: 'Correntista VIP',
                bairro: 'Suissa',
                rua: 'Panorama',
                email: 'teste@teste'
            }, 5456067).result;
        });

        it('Deve criar uma conta', () => {
            assert.equal(contaCorrente != undefined, true);
        });

        it('Conta deve ser VIP', () => {
            assert.equal(contaCorrente!.tipo, CONTA_CORRENTE_VIP);
        });

        it('Cliente VIP não tem análise de risco - limite de crédito deve ser R$ 20.0000,00', () => {
            assert.equal(contaCorrente!.limiteCredito, LIMITE_CREDITO_INICIAL);
        });
    });

    describe('Cadastrar correntista VAREJO - depósito inicial < R$ 50,00', () => {
        let contaCorrente: ContaCorrente | undefined;
        before(() => {
            contaCorrente = contaCorrenteAppService.abrirContaCorrente({
                cpf: '12345678901',
                dataNascimento: new Date(1984, 8, 8),
                nome: 'Correntista Varejo',
                bairro: 'Suissa',
                rua: 'Panorama',
                email: 'teste@teste'
            }, 15000).result;
        });

        it('Deve criar uma conta', () => {
            assert.equal(contaCorrente != undefined, true);
        });

        it('Conta deve ser VAREJO', () => {
            assert.equal(contaCorrente!.tipo, CONTA_CORRENTE_VAREJO);
        });
    });

    describe('Validar depósito inicial mínimo - default R$ 50,00', () => {
        let contaCorrente: ContaCorrente | undefined;
        before(() => {
            contaCorrente = contaCorrenteAppService.abrirContaCorrente({
                cpf: '12345678901',
                dataNascimento: new Date(1984, 8, 8),
                nome: 'Correntista Varejo 2',
                bairro: 'Suissa',
                rua: 'Panorama',
                email: 'teste@teste'
            }).result;
        });

        it('Deve criar uma conta', () => {
            assert.equal(contaCorrente != undefined, true);
        });
    });

    describe('Validar depósito inicial mínimo < R$ 50,00', () => {
        let contaCorrente: ContaCorrente | undefined;
        before(() => {
            contaCorrente = contaCorrenteAppService.abrirContaCorrente({
                cpf: '12345678901',
                dataNascimento: new Date(1984, 8, 8),
                nome: 'Correntista Varejo 3',
                bairro: 'Suissa',
                rua: 'Panorama',
                email: 'teste@teste'
            }, DEPOSITO_INICIAL_MINIMO - 1).result;
        });

        it('Não deve criar uma conta', () => {
            assert.equal(contaCorrente == undefined, true);
        });
    });

    describe('Correntista não pode ter a palavra teste no nome', () => {
        let contaCorrente: ContaCorrente | undefined;
        before(() => {
            contaCorrente = contaCorrenteAppService.abrirContaCorrente({
                cpf: '12345678901',
                dataNascimento: new Date(1984, 8, 8),
                nome: 'Correntista de Teste',
                bairro: 'Suissa',
                rua: 'Panorama',
                email: 'teste@teste'
            }).result;
        });

        it('Não deve criar uma conta', () => {
            assert.equal(contaCorrente == undefined, true);
        });
    });

    describe('Correntista deve ser elegível para abertura de conta', () => {
        let contaCorrente: ContaCorrente | undefined;
        before(() => {
            contaCorrente = contaCorrenteAppService.abrirContaCorrente({
                cpf: '123456789011',
                dataNascimento: new Date(1984, 8, 8),
                nome: 'Correntista de Teste 2',
                bairro: 'Suissa',
                rua: 'Panorama',
                email: 'teste@teste'
            }).result;
        });

        it('Não deve criar uma conta', () => {
            assert.equal(contaCorrente == undefined, true);
        });
    });
});

// afterEach(() => {
//     console.log(correntistaRepository.buscarPorId('dsds'));
// });