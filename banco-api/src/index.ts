import express, { Request } from 'express';
import cors from 'cors';
import 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import { ApplicationServices } from 'banco-core';
import { ICorrentistaRepository, ITransacaoRepository } from 'banco-core/interfaces';
import { CorrentistaRepository } from './repositories/correntista.repository';
import { IAnaliseCreditoService } from 'banco-core/interfaces/services/analise-credito.service';
import { IComunicacaoService } from 'banco-core/interfaces/services/comunicacao.service';
import { TransacaoRepository } from './repositories/transacao.repository';
import { AnaliseCreditoService } from './services/analise-credito.service';
import { EmailService } from './services/email.service';
import { NovaContaCorrenteRequest } from './view-model/conta-corrente.request';

const API_VERSION = 'v1';
const swaggerFile = require('./public/swagger.json');
const correntistaRepository: ICorrentistaRepository = new CorrentistaRepository();
const transacaoRepository: ITransacaoRepository = new TransacaoRepository();
const analiseCreditoService: IAnaliseCreditoService = new AnaliseCreditoService();
const emailService: IComunicacaoService = new EmailService();

const contaCorrenteAppService: ApplicationServices.ContaCorrenteAppService = new ApplicationServices.ContaCorrenteAppService(
    correntistaRepository,
    transacaoRepository,
    analiseCreditoService,
    emailService);

    const corsOptions = {
    origin: [
        'http://localhost:4200'
    ]
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.post<NovaContaCorrenteRequest>(`/api/${API_VERSION}/conta-corrente`, (req, res) => {
    /* #swagger.description = 'Cadastro de Conta Corrente'*/
    /* #swagger.parameters['request'] = {
        description: 'Request de cadastro',
        type: 'json',
        required: true,
        in: 'body',
        schema: {
            "nome": "<string>",
            "cpf": "<string>",
            "dataNascimento": "<Date>",
            "bairro": "<string>",
            "rua": "<string>",
            "email": "<string>",
            "depositoInicial": "<number>"
        },
    }
    #swagger.responses[200] = {
        description: 'Retorno se sucesso',
        schema: {
            "success": true,
            "result": {
                "_validacoes": [],
                "id": "<string>",
                "agencia": "<string>",
                "numero": "<string>",
                "limiteCredito": "<number>",
                "tipo": "<string>"
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Retorno se erro',
        schema: {
            "success": false,
            "mensagem": "<string>"
        }
    }
    */
    let request: NovaContaCorrenteRequest = req.body;
    let result = contaCorrenteAppService.abrirContaCorrente({
        nome: request.nome,
        cpf: request.cpf,
        dataNascimento: request.dataNascimento,
        bairro: request.bairro,
        rua: request.rua,
        email: request.email
    }, request.depositoInicial)
    res.status(200).json(result);
});

app.listen(4201, () => {
    console.log(`${new Date()}: banco-api: iniciado`)
});
