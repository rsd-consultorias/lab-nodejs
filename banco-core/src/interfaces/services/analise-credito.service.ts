/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
export interface IAnaliseCreditoService {
    analisar(cpf: string, dataNascimento: Date): number;
}