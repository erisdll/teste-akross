<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
  <a href="https://typeorm.io/" target="blank"><img src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" width="200" alt="TypeORM Logo" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://www.postgresql.org/media/img/about/press/elephant.png" width="100" alt="PostgreSQL Logo" /></a>
</p>
<p align="center">
  <a href="https://swagger.io/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" width="100" alt="Swagger Logo" /></a>
  <a href="https://www.docker.com/" target="blank"><img src="./assets/dockerlogo.png" height="100" alt="Docker Logo" /></a>
</p>


  <p align="center"><a href="https://akross-test.onrender.com/api" target="_blank">Esta API</a> de gerenciamento de squads e collaboradores foi desenvolvida como um desafio técnico para uma vaga de estágio em desenvolvimento back-end na Akross.</p>

## Tecnologias utilizadas:
- Typescript
- Nestjs
- TypeORM
- PostgreSQL
- Swagger
- Docker

## Sobre a Aplicação:

### Arquitetura

  - A aplicação segue o padrão de design repository, bem como as práticas de modularização sugeridas pelo NestJS. Cada módulo possui seus próprios serviços, controllers, DTOs, entidades e interfaces, promovendo a coesão e reduzindo acoplamentos. Há uma separação clara de responsabilidades, desde o *handling* dos dados de chegada até a lógica de negócio, facilitando a escalabilidade e manutenabilidade do código.
  
  - A injeção de dependência foi amplamente utilizada para promover a modularidade necessária e facilitar a substituição de componentes.

### Gerenciamento de Colaboradores e Squads

<p align="center">
  <img src="./assets/DBDiagram.png" width="500" alt="Diagrama" /></a>
</p>

### Persistência de dados
  Foi utilizada uma DB PostgreSQL para a realização da persistência dos dados. A DB está disponível tanto localmente via docker-compose, com um volume próprio, quanto na versão live da applicação, hosteada como um serviço diretamente no Render.

  Para o caso do desenvolvimento e processo de testes local, foi adicionado um container do Adminer, permitindo também a gestão da DB por uma GUI.
  
  Acesso via: http://localhost:8080

### Documentação dos Endpoins
  Foi utilizado o Swagger e SwaggerUI para gerar uma documentação e interface de testes que atenda aos requisitos da especificação OAS 3.0. Todos os enpoints são testáveis de modo intuitivo através da GUI produzida pelo Swagger. Cada endpoint já especificando automaticamente suas operações, parâmetros e propriedades esperadas.

### Deployment via Render
  A Aplicação está deployada e conectada a uma DB em nuvem, já disponível para uso: https://akross-test.onrender.com/api

  (Pode ser necessário alguns segundos de espera inicla até o *spool up* do app, visto que está hosteada em tier free)

### Diagrama de Entidades:

## Instalação

```bash
$ npm install
```

## Ativando o App
Primeiro é necessário ativar a database:
```bash
$ docker-compose up -d
```
Depois pode ser ativada aplicação em si:

```bash
# development watch mode
$ npm run start:dev

# ou production mode
$ npm run start:prod
```
## Testando o App
Toda a documentação necessária para realizar os testes pode ser encontrada no endpoint de documentação da API:

- teste local: http://localhost:3000/api
- acesso à DB local via Adminer: http://localhost:8080
- deploy no Render: https://akross-test.onrender.com/api

  (é necessário esperar alguns segundos
até o spool up do app, está hospedado na tier free)


## Contato

### [Github](https://github.com/erisdll)

### [LinkedIn](https://linkedin.com/in/erika-mello)
