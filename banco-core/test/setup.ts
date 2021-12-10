/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import { ContaCorrenteAppService } from "../src";
import { ICorrentistaRepository } from "../src/interfaces/repositories/correntista.repository";
import { ITransacaoRepository } from "../src/interfaces/repositories/transacao.repository";
import { IAnaliseCreditoService } from '../src/interfaces/services/analise-credito.service';
import { IComunicacaoService } from "../src/interfaces/services/comunicacao.service";
import { ContaCorrente } from '../src/model/conta-corrente';
import { Correntista } from "../src/model/correntista";
import { Transacao } from "../src/model/transacao";

//
let correntistaDb: Correntista = new Correntista();
export class CorrentistaRepository implements ICorrentistaRepository {
    listarInadimplentes(): Correntista[] {
        throw new Error("Method not implemented.");
    }
    inserir(model: Correntista): boolean {
        correntistaDb = model;
        return true;
    }
    alterar(model: Correntista): boolean {
        throw new Error("Method not implemented.");
    }
    excluir(id: string): boolean {
        throw new Error("Method not implemented.");
    }
    listarTodos(): Correntista[] {
        throw new Error("Method not implemented.");
    }
    buscarPorId(id: string): Correntista {
        return correntistaDb;
    }
}

export class TransacaoRepository implements ITransacaoRepository {
    inserir(model: Transacao): boolean {
        return true;
    }
    alterar(model: Transacao): boolean {
        throw new Error("Method not implemented.");
    }
    excluir(id: string): boolean {
        throw new Error("Method not implemented.");
    }
    listarTodos(): Transacao[] {
        throw new Error("Method not implemented.");
    }
    buscarPorId(id: string): Transacao {
        throw new Error("Method not implemented.");
    }

}

export class AnaliseCredito implements IAnaliseCreditoService {
    analisar(cpf: string, dataNascimento: Date): number {
        return Math.random();
    }
}

export class EmailService implements IComunicacaoService {
    enviarJustificativaContaNaoCriada(detinatario: string, justificativa: string): void {
        // console.log(`\t==>enviarJustificativaContaNaoCriada: ${justificativa}`);
    }
    enviarEmailBoasVindas(detinatario: string): void {
        // console.log(`\t==>enviarEmailBoasVindas:`);
    }
    enviarRecuperacaoSenha(detinatario: string): void {
        // console.log(`\t==>enviarRecuperacaoSenha:`);
    }
}
//

export const correntistaRepository = new CorrentistaRepository();
export const transacaoRepository = new TransacaoRepository();
export const analiseCreditoService = new AnaliseCredito();
export const emailService = new EmailService();

export const contaCorrenteAppService = new ContaCorrenteAppService(
    correntistaRepository,
    transacaoRepository,
    analiseCreditoService,
    emailService);