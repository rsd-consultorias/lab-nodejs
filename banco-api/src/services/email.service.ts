import { IComunicacaoService } from "banco-core/interfaces/services/comunicacao.service";

export class EmailService implements IComunicacaoService {
    enviarEmailBoasVindas(detinatario: string): void {
        console.log('Email boas vindas');
        // throw new Error("Method not implemented.");
    }
    enviarRecuperacaoSenha(detinatario: string): void {
        console.log('Email recuperacao senha');
        // throw new Error("Method not implemented.");
    }
    enviarJustificativaContaNaoCriada(detinatario: string, justificativa: string): void {
        console.log(`Email conta nao criada: ${justificativa}`);
        // throw new Error("Method not implemented.");
    }

}