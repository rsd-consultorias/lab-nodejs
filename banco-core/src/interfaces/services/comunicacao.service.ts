/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
export interface IComunicacaoService {
    enviarEmailBoasVindas(detinatario: string): void;
    enviarRecuperacaoSenha(detinatario: string): void;
    enviarJustificativaContaNaoCriada(detinatario: string, justificativa: string): void;
}