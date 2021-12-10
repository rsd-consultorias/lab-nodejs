import { ICorrentistaRepository } from 'banco-core/interfaces';
import { Correntista } from 'banco-core/model/correntista';

export class CorrentistaRepository implements ICorrentistaRepository {
    listarInadimplentes(): Correntista[] {
        throw new Error('Method not implemented.');
    }
    inserir(model: Correntista): boolean {
        console.log(`CorrentistaRepository:inserir ${JSON.stringify(model)}`);
        return true;
    }
    alterar(model: Correntista): boolean {
        throw new Error('Method not implemented.');
    }
    excluir(id: string): boolean {
        throw new Error('Method not implemented.');
    }
    listarTodos(): Correntista[] {
        throw new Error('Method not implemented.');
    }
    buscarPorId(id: string): Correntista {
        throw new Error('Method not implemented.');
    }
}