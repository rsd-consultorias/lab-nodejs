/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import { Correntista } from "../model/correntista";

export function buildCorrentista(pessoaFisica: { nome: string, cpf: string, dataNascimento: Date, email?: string, rua?: string, bairro?: string }): Correntista {
    let correntista = new Correntista();
    correntista.cpf = pessoaFisica.cpf;
    correntista.dataNascimento = pessoaFisica.dataNascimento;
    correntista.nome = pessoaFisica.nome;
    correntista.endereco = {
        rua: pessoaFisica.rua!,
        bairro: pessoaFisica.bairro!
    };

    return correntista;
}