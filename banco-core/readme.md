# Lab de Arquitetura - Core da Aplicação
Modelo de arquitetura para isolar as `regras de negócio` de uma aplicação.

## Application Services
Casos de usos

```typescript
class ExemploAppService {
    private exemploDomaninService: ExemploDomaninService;
    constructor(private exemploRepository: IExemploRepository, emailService: IEmailService){
        this.exemploDomaninService = new ExemploDomaninService();
    }
    ...
    casoDeUsoA() {
        ...
        this.exemploDomainService.regraNegocioA();
        this.emailService.metodoA();
        ...
        this.exemploDomainService.regraNegocioN();
        this.exemploRepository.inserir(...);
    }

    casoDeUsoB() {
        ...
        this.exemploDomainService.regraNegocioB();
        ...
    }

    casoDeUsoN() {
        ...
    }
}
```

## Domain Services
Regras de negócio

```typescript
class ExemploDomaninService {
    regraNegocioA() {}

    regraNegocioB() {}

    regraNegocioN() {}
}
```

## Model
Entidades do negócio

```typescript
class Entidade {
    atributoA: any;
    atributoB: any;
    atrubutoN: AgregadoVO;

    // Evitar entidades anêmicas. Entidades devem se autovalidar
    validar(): boolean {
        ...
    }
}
```

## Value Objects
Agregados

```typescript
class AgregadoVO {
    atributoA: any;
    atributoB: any;
    atributoN: any;
}
```

## DTO
```typescript
class ClasseDTO {
    atributoA: any;
    atributoB: any;
    atributoN: any;
}
```

## Builders
Ao invés de `criar instâncias de classes diretamente`, opte por usar métodos builders ou factories

```typescript
// Ruim
let instancia = new Classe();

// Melhor
let instancia = buildInstanciaDaClasse(parametros: {par1: any, par2: any});
```

## Interfaces

```typescript
interface IExemploRepository {

}

interface IEmailService {

}
```

# Comandos

## Build
```
npm run build
```

## Test
```
npm test
```