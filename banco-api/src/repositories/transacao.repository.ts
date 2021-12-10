import { ITransacaoRepository } from "banco-core/interfaces";
import { Transacao } from "banco-core/model/transacao";

export class TransacaoRepository implements ITransacaoRepository{
    inserir(model: Transacao): boolean {
        console.log(`TransacaoRepository:inserir ${JSON.stringify(model)}`);
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