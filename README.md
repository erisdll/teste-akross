<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
  <a href="https://typeorm.io/" target="blank"><img src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" width="200" alt="TypeORM Logo" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://www.postgresql.org/media/img/about/press/elephant.png" width="100" alt="PostgreSQL Logo" /></a>
  <a href="https://swagger.io/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" width="100" alt="Swagger Logo" /></a>
  <a href="https://www.docker.com/" target="blank"><img src="./assets/dockerlogo.png" height="100" alt="Docker Logo" /></a>
</p>


  <p align="center"><a href="https://akross-test.onrender.com/api" target="_blank">Esta API</a> de gerenciamento de squads e colaboradores foi desenvolvida para um desafio técnico para uma vaga de estágio em desenvolvimento back-end na Akross.</p>

## Tecnologias utilizadas
- [Typescript](https://www.typescriptlang.org/)
- [Nestjs](http://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)

## Sobre a Aplicação
### Arquitetura
  A aplicação segue o padrão de design repository, bem como as boas práticas de modularização sugeridas pelo NestJS. Cada módulo possui seus próprios serviços, controllers, DTOs, entidades e interfaces, promovendo coesão e reduzindo acoplamentos.
  
  A injeção de dependência foi amplamente utilizada para promover a modularidade necessária e facilitar a substituição dos componentes, melhorando a manutenabilidade do código.

### Features de Gerenciamento de Colaboradores e Squads
1. CRUD completo dos colaboradores
- Crie, persista, atualize e remova colaboradores, podendo adicioná-los aos squads disponíveis.
- Tenha acesso a quantos colaboradores existem. 
- Tenha acesso às informações do squad em que o colaborador está.

2. CRUD completo dos squads
- Crie, persista, atualize e remova squads.
- Tenha acesso a quantos squads existem. 
- Tenha acesso às informações dos colaboradores em um dado squad.

### Diagrama das Entidades
<p align="center">
  <img src="./assets/DBDiagram.png" width="500" alt="Diagrama" /></a>
</p>

### Persistência de dados
  Foi utilizada uma DB PostgreSQL para a realização da persistência dos dados. A DB está disponível tanto localmente via docker-compose, com um volume próprio, quanto na versão live da applicação, hosteada como um cloud service no Render.

  Para o caso do desenvolvimento e processo de testes local, foi adicionado um container com o Adminer, permitindo também a gestão da DB por GUI. Seguem os dados de acesso ao container:

| Login Options | Values      |
|---------------|-------------|
| System        | PostgreSQL  |
| Server        | postgres    |
| Username      | root        |
| Password      | pass        |
| Database      | akross-test |


### Documentação dos Endpoins
  Foi utilizado o Swagger e SwaggerUI para gerar uma documentação e interface de testes que atenda aos requisitos da especificação OAS 3.0. Todos os enpoints são testáveis de modo intuitivo através da GUI produzida pelo Swagger. Cada endpoint já especificando automaticamente suas operações, parâmetros e propriedades esperadas.

### Deployment via Render
  A Aplicação está deployada e conectada a uma DB em nuvem, [já disponível para uso](https://akross-test.onrender.com/api).
  No primeiro acesso pode ser necessário alguns segundos de espera inicial até o *spin up* do serviço, que está hosteado em tier free.

## Como usar
### Pré-requisitos
  Cerififique-se de possuir devidamente instalados:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/current)
- [Docker compose](https://docs.docker.com/compose/install/)

### Instalação
(Os passos seguites são referentes à versão local, a instância hosteada no render pode ser livremente acessada)

1. Clone o repositório:
```bash
git clone https://github.com/erisdll/teste-akross.git
```
2. Instale as dependências:
```bash
$ npm install
```

### Ativando a Aplicação
Após se certificar de que o docker-compose está instalado:
```bash
# development watch mode
$ npm run start:dev
```
### Testando a Aplicação
Toda a documentação necessária para realizar os testes pelo Swagger UI pode ser encontrada no endereço de documentação da API, tanto em sua versão local quando na versão live:

- [Endereço Local](http://localhost:3000/api)
- [Acesso à DB local via Adminer](http://localhost:8080)
- [Deploy no Render](https://akross-test.onrender.com/api)

### Exemplos de alguns endpoins
- Criar um Colaborador:
```http
POST /collaborators
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "test@example.com", // unique
  "role": "back-end",
  "squad": 1 // optional
}
```
- Criar uma Squad:
```http
POST /squads
{
  "squadName": "string",       // unique
  "description": "string",
  "project": "string"
}
```
- Buscar um Colaborador:
```http
GET /collaborators/:id         // collaboratorID: UUID

Response
{
  "id": "d0a8757f-b50a-4400-9daf-06f76a47da60",
  "firstName": "John",
  "lastName": "Doe",
  "email": "test@example.com",
  "role": "back-end",
  "squad": {
    "id": 1,
    "squadName": "back-end"
  }
}
```
- Buscar uma Squad:
```http
GET /squads/:id                // squadID: number

Response
{
  "id": 1,
  "squadName": "infra",
  "description": "main infrastructure squad",
  "project": "dockerize the printers!",
  "collaborators": [
    {
      "id": "d0a8757f-b50a-4400-9daf-06f76a47da60",
      "firstName": "Ana",
      "role": "devops"
    },
    {
      "id": "fde42c0b-646d-4f5a-9bd2-9021105e8f92",
      "firstName": "Bob",
      "role": "scrummaster"
    }
  ]
}
```

- Atualizar um Colaborador:
```http
PATCH /collaborators/:id       // collaboratorID: UUID
{
  "firstName": "John",         // optional
  "lastName": "Doe",           // optional
  "email": "test@example.com", // optional unique
  "role": "Backend",           // optional
  "squad": 1                   // optional
}
```
- Atualizar uma Squad:
```http
PATCH /squads/:id              // squadID: number
{
  "squadName": "string",       // optional unique
  "description": "string",     // optional
  "project": "string"          // optional
}
```
## Contato
### [Github](https://github.com/erisdll)
### [LinkedIn](https://linkedin.com/in/erika-mello)
