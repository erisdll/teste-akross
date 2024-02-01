<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
  <a href="https://swagger.io/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" width="100" alt="Swagger Logo" /></a>
  <a href="https://typeorm.io/" target="blank"><img src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" width="200" alt="TypeORM Logo" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://www.postgresql.org/media/img/about/press/elephant.png" width="100" alt="PostgreSQL Logo" /></a>
</p>
  <p align="center"><a href="https://akross-test.onrender.com/api" target="_blank">Esta API</a> foi desenvolvida com NestJS, Swagger, TypeORM e PostgreSQL como um teste técnico para uma vaga de estágio.</p>

## Descrição

### Diagrama:
<p align="center">
  <img src="./assets/DBDiagram.png" width="500" alt="Diagrama" /></a>
</p>

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
- deploy no Render: https://akross-test.onrender.com/api

  (é necessário esperar alguns segundos
até o spool up do app, está hospedado na tier free)


## Contato

### [Github](https://github.com/erisdll)

### [LinkedIn](https://linkedin.com/in/erika-mello)
