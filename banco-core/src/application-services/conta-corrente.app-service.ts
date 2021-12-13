/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
import { buildNovaContaCorrente } from "../builders/conta-corrente.builder";
import { buildCorrentista } from "../builders/correntista.builder";
import { buildTransacaoInicialMinima, buildTransacaoInicialComValor } from "../builders/transacao.builder";
import { CONTA_CORRENTE_VAREJO, CONTA_CORRENTE_VIP, DEPOSITO_INICIAL_MINIMO, DEPOSITO_INICIAL_MINIMO_VIP, LIMITE_CREDITO_INICIAL } from "../constants";
import { CorrentistaDomainService } from "../domain-services/correntista.domain-service";
import { ApplicationResultDTO } from "../dto/application-result.dto";
import { ICorrentistaRepository } from "../interfaces/repositories/correntista.repository";
import { ITransacaoRepository } from "../interfaces/repositories/transacao.repository";
import { IAnaliseCreditoService } from "../interfaces/services/analise-credito.service";
import { IComunicacaoService } from "../interfaces/services/comunicacao.service";
import { ContaCorrente } from "../model/conta-corrente";
import { Transacao } from "../model/transacao";

export namespace ApplicationServices {
    export class ContaCorrenteAppService {
        private correntistaDomainService: CorrentistaDomainService

        constructor(
            private correntistaRepository: ICorrentistaRepository,
            private transacaoRepository: ITransacaoRepository,
            private analiseCreditoService: IAnaliseCreditoService,
            private comunicacaoService: IComunicacaoService) {
            this.correntistaDomainService = new CorrentistaDomainService(analiseCreditoService);
        }

        abrirContaCorrente(pessoaFisica: { nome: string, cpf: string, dataNascimento: Date, email?: string, rua?: string, bairro?: string },
            depositoInicial: number = DEPOSITO_INICIAL_MINIMO): ApplicationResultDTO<ContaCorrente> {

            // Verificar se o CPF é válido
            if (!this.correntistaDomainService.validarCpfValido(pessoaFisica.cpf)) {
                return new ApplicationResultDTO<ContaCorrente>({
                    success: false,
                    message: `CPF informado não é válido`
                });
            }

            // Verificar se atende depósito inicial mínimo
            if (depositoInicial < DEPOSITO_INICIAL_MINIMO) {
                // Envia comunicação
                this.comunicacaoService.enviarJustificativaContaNaoCriada(pessoaFisica.email!, `Depósito mínimo inicial deve ser de R$ ${(DEPOSITO_INICIAL_MINIMO / 100).toFixed(2)}`);

                return new ApplicationResultDTO<ContaCorrente>({
                    success: false,
                    message: `Depósito mínimo inicial deve ser de R$ ${(DEPOSITO_INICIAL_MINIMO / 100).toFixed(2)}`
                });
            }

            // Verifica eligibilidade para abertura de conta
            if (this.correntistaDomainService.validarElegibilidadeParaCorrentista(pessoaFisica)) {
                // Cadastra correntista
                let correntista = buildCorrentista(pessoaFisica);

                // Gera numero da conta
                let contaCorrente = buildNovaContaCorrente(depositoInicial > DEPOSITO_INICIAL_MINIMO_VIP ? CONTA_CORRENTE_VIP : CONTA_CORRENTE_VAREJO);

                correntista.contasCorrentes.push(contaCorrente);

                // Analisa risco de crédito
                if (contaCorrente.tipo == CONTA_CORRENTE_VAREJO) {
                    let risco = this.correntistaDomainService.analisarRiscoCredito(pessoaFisica.cpf, pessoaFisica.dataNascimento);
                    contaCorrente.limiteCredito = Math.round(LIMITE_CREDITO_INICIAL * (1 - risco));
                } else {
                    contaCorrente.limiteCredito = LIMITE_CREDITO_INICIAL;
                }

                // Credita depósito inicial
                let transacaoInicial: Transacao;
                if (depositoInicial == DEPOSITO_INICIAL_MINIMO) {
                    transacaoInicial = buildTransacaoInicialMinima(contaCorrente.id);
                } else {
                    transacaoInicial = buildTransacaoInicialComValor(contaCorrente.id, depositoInicial);
                }

                // Persiste os dados em um repositório
                if (correntista.ehValido()) {
                    this.correntistaRepository.inserir(correntista);
                } else {
                    this.comunicacaoService.enviarJustificativaContaNaoCriada(pessoaFisica.email!, `Nome deve ser de uma pessoa real`);

                    return new ApplicationResultDTO<ContaCorrente>({
                        success: false,
                        message: `Nome deve ser de uma pessoa real`
                    });
                }
                this.transacaoRepository.inserir(transacaoInicial);

                // Envia comunicação de boas vindas
                this.comunicacaoService.enviarEmailBoasVindas(pessoaFisica.email!);

                return new ApplicationResultDTO<ContaCorrente>({
                    success: true,
                    result: contaCorrente
                });
            } else {
                // Envia comunicação de cadastro não elegível
                this.comunicacaoService.enviarJustificativaContaNaoCriada(pessoaFisica.email!, `Cadastro não elegível para abertura de conta`);

                return new ApplicationResultDTO<ContaCorrente>({
                    success: false,
                    message: `Cadastro não elegível para abertura de conta`
                });
            }
        }
    }
}