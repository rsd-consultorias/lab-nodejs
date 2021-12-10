/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import { v4 } from "uuid";

export class EntidadeBase {
    id: string;
    private _validacoes: Array<() => {}> = [];

    constructor() {
        this.id = v4();
    }

    adicionarValidacao(validacao: () => {}) {
        this._validacoes.push(validacao);
    }

    ehValido(): boolean {
        let resultadoValidacao = true;
        this._validacoes.forEach(validacao => {
            if (!validacao()) {
                resultadoValidacao = false;
            }
        });
        return resultadoValidacao;
    }
}