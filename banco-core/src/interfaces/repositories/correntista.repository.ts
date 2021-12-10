/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import { Correntista } from "../../model/correntista";
import { RepositoryBase } from "../repository.base";

export interface ICorrentistaRepository extends RepositoryBase<Correntista> { 
    listarInadimplentes(): Array<Correntista>;
}