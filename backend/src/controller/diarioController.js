import { Router } from "express";
const endpoints = Router()

import * as db from '../repository/diarioRepository.js'

//todos as anotações de um usuario
endpoints.get('/diario/:id', async (req,resp) =>{
    try {
        let idUsuario = req.params.id

        let registros = await db.consultarDiario(idUsuario)

        if (idUsuario == null) {
            resp.send({
                erro: "O id de usuario é obrigatorio"
            })
        }
        else {
            resp.send(registros)
        }

    } catch (err) {
        resp.send({
            Erro: err.message
        })
    }
})

endpoints.post('/diario/inserir', async (req,resp) =>{
    try {
        let id = req.query.id
        let registros = req.body
        
        if (id == null) {
            resp.send({
                erro: "O id de usuario é obrigatorio"
            })
        } else{
            let resposta = await db.inserirDiario(registros, id)

            resp.send({
                idInserido: resposta
            })
        }
        
    } catch (err) {
        resp.send({
            Error: err.message
        })
    }
})

endpoints.put('/diario/atualizar/:id', async (req,resp) =>{
    try {
        let id = req.params.id
        let registros = req.body

        let resposta = await db.AtualizarDiario(registros, id)
        
        if (resposta >= 1) {
            resp.send({
                linhasAfetadas: resposta
            })
        } else {
            resp.send({
                Erro: "Nenhuma linha foi afetada"
            })
        }
    } catch (err) {
        resp.send({
            error:err.message
        })
    }
})

endpoints.delete('/diario/deletar/:id', async (req, resp) => {
    try {
        let id = req.params.id

        let resposta = await db.deletarDiario(id)
        
        if (resposta >= 1) {
            resp.send({
                linhasAfetadas: resposta
            })
        } else {
            resp.send({
                Erro: "Nenhuma linha foi afetada"
            })
        }
        
    } catch (err) {
        resp.send({
            error: err.message
        })
    }
})

export default endpoints;