import { IAnaliseCreditoService } from "banco-core/interfaces/services/analise-credito.service";

export class AnaliseCreditoService implements IAnaliseCreditoService {
    analisar(cpf: string, dataNascimento: Date): number {
        return Math.random();
    }

}