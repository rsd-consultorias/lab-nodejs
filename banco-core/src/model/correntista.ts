/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import { EntidadeBase } from "../interfaces/entidade.base";
import { EnderecoVO } from "../value-objects/endereco.vo";
import { ContaCorrente } from "./conta-corrente";

export class Correntista extends EntidadeBase {
    cpf?: string;
    nome?: string;
    dataNascimento?: Date;
    endereco?: EnderecoVO;
    contasCorrentes: Array<ContaCorrente> = [];

    constructor() {
        super();
        this.adicionarValidacao(
            (): boolean => {
                return !this.nome!.includes('Teste');
            });
    }
}