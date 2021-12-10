export interface NovaContaCorrenteRequest {
    nome: string;
    cpf: string;
    dataNascimento: Date;
    email?: string;
    rua?: string;
    bairro?: string;
    depositoInicial?: number;
}