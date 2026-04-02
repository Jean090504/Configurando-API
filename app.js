/*******************************************************************************************************************************************
* Objetivo: Arquivo responsável pela API do projeto de estados e cidades do Brasil
* Data: 01/04/2026
* Autor: Jean Costa
* Versão 1.0
*  
*  Instalação do EXPRESS - npm install express --save
*   Express é um protocolo HTTP para criar uma API
*
*  Intalação do CORS - npm install cors --saves
*   CORS é um protocolo de segurança para liberar o acesso a API 
*
********************************************************************************************************************************************/

//Importando dependências para criação da API
const express = require('express')
const cors = require('cors')

//Criando objeto para configurar a API
const app = express()

//Configurações do CORS para liberar o acesso a API
const corsOptions = {
    origin: ['*'], //Origem da requisiçao, podendo ser um ip ou * (TODOS)
    methods: 'GET', //Métodos de requisição que a API irá aceitar (GET, POST, PUT, DELETE)
    allowedHeaders: ['Content-Type, Authorization'] //Permisões do cabeçalhos
}

//Habilitando o CORS para a API
app.use(cors(corsOptions))

//Importando as funções de manipulação de dados
const estados = require('./model/manipulacao.js')

//Criando endpoint 

//Retorna os dados dos estados filtrados pela sigla
app.get('/v1/senai/dados/estado/:uf', function(request, response){
    let siglaBusca = request.params.uf
    let estado = estados.getDadosEstado(siglaBusca)

    if(estado){
    response.json({
        "status": "true",
        "status_code": 200,
        "Desenvolvedor": "Jean Costa",
        estado: estado
    })}else{
        response.json({
            "status": "false",
            "status_code": 404,
            "Desenvolvedor": "Jean Costa",
            "message": "O estado inforado não foi encontrado!"
        })
    }
})

//Retorna os dados da capital do estado filtrados pela sigla
app.get('/v1/senai/capital/estado/:uf', function(request, response){
    let siglaEstado = request.params.uf 
    let estado = estados.getCapitalEstado(siglaEstado)

    if(estado){
        response.json({
            "status": "true",
            "status_code": 200,
            "Desenvolvedor": "Jean Costa",
            capital: estado
        })}else{
            response.json({
                "status": "false",
                "status_code": 404,
                "Desenvolvedor": "Jean Costa",
                "message": "A capital informada não foi encontrado!"
            })
        }
})

//Retorna os estados filtrados pela região
app.get('/v1/senai/estados/regiao', function(request, response){
    let regiaoBusca = request.query.regiao
    let regiao = estados.getEstadosRegiao(regiaoBusca)

    if(!regiao){
        response.json({
            "status": "false",
            "status_code": 404,
            "Desenvolvedor": "Jean Costa",
            "message": "Região não encontrada!"
        })
    }else{
    response.json({
        "status": "true",
        "status_code": 200,
        "Desenvolvedor": "Jean Costa",
        "estado": estados.getEstadosRegiao(regiaoBusca)
    })}
})

//Retorna as capitais do Brasil
app.get('/v1/senai/estados/capital/brasil', function(request, response){
    let capital = estados.getCapitalPais()

    if(capital){
        response.json({
            "status": "true",
            "status_code": 200,
            "Desenvolvedor": "Jean Costa",
            capital: capital
        })}else{
            response.json({
                "status": "false",
                "status_code": 404,
                "Desenvolvedor": "Jean Costa",
                "message": "A capital do Brasil não foi encontrado!"
            })
        }
})

//Retorna as cidades do estado filtrados pela sigla
app.get('/v1/senai/cidades/estado/:uf' , function(request, response){
    let siglaEstado = request.params.uf
    let cidades = estados.getCidades(siglaEstado)

    if(cidades){
        response.json({
            "status": true,
            "status_code": 200,
            "Desenvolvedor": "Jean Costa",
            cidades: cidades
        })}else{
            response.json({
                "status": false,
                "status_code": 404,
                "Desenvolvedor": "Jean Costa",
                "message": "As cidades do estado informado não foram encontrado!"
            })
        }
})

//Retorna a lista de estados do Brasil
app.get('/v1/senai/estados', function(request, response){
    response.json({
        "Desenvolvedor": "Jean Costa",
        estados: estados.getListaDeEstado(),
        "status": 200
    })
})

//Iniciando o servidor da API
app.listen(8080, function(){
    console.log('Servidor rodando na porta 8080')
})