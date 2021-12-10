import { Component, OnInit } from '@angular/core';
import { AbrirContaService } from './services/abrir-conta.service';

class Cadastro {
  nome?: string;
  cpf?: string;
  depositoInicial?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  cadastro: Cadastro = {};
  mensagem?: string;

  constructor(private abrirContaService: AbrirContaService) { }

  ngOnInit(): void {
  }

  enviar() {
    this.abrirContaService.enviar(this.cadastro).subscribe(
      (data) => {
        if (!data.success) {
          this.mensagem = data.message;
        } else {
          this.mensagem = `Conta aberta com sucesso: Ag: ${data.result.agencia} Conta: ${data.result.numero} Cliente ${data.result.tipo} com limite de crédito de R$ ${(data.result.limiteCredito / 100).toFixed(2)}`;
        }
      });
  }
}
