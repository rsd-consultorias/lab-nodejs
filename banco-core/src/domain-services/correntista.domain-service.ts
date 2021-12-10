/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import { IAnaliseCreditoService } from "../interfaces/services/analise-credito.service";

export class CorrentistaDomainService {

    constructor(private analiseCreditoService: IAnaliseCreditoService) { }

    /** Valida as regras que tornam uma pessoa elegível a abrir uma conta */
    validarElegibilidadeParaCorrentista(candidato: { nome: string, cpf: string, dataNascimento: Date }): boolean {
        return candidato.cpf.length == 11;
    }

    validarCpfValido(cpf: string): boolean {
        return cpf.length == 11;
    }

    /** Retorna o risco no intervalo de 0 à 1 (0 à 100%) */
    analisarRiscoCredito(cpf: string, dataNascimento: Date): number {
        return this.analiseCreditoService.analisar(cpf, dataNascimento);
    }
}