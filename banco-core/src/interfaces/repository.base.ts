/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
export interface RepositoryBase<T> {
    inserir(model: T): boolean;
    alterar(model: T): boolean;
    excluir(id: string): boolean;
    listarTodos(): Array<T>;
    buscarPorId(id: string): T;
}