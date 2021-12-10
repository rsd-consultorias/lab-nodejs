/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import { EntidadeBase } from "../interfaces/entidade.base";

export class Transacao extends EntidadeBase {
    contaCorrenteId?: string;
    data?: Date;
    natureza?: string;
    valor?: number;
}