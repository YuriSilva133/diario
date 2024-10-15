import { Router } from "express";
const endpoints = Router()

import * as db from '../repository/usuarioRepository.js'
import {gerarToken} from '../utils/jwt.js'

endpoints.post('/inserir', async (req,resp) =>{
    try {
        let pessoa = req.body

        let resposta = await db.inserirUsuario(pessoa)
        
        resp.send({
            idInserido: resposta
        })

    } catch (error) {
        resp.send({
            Error: error.message
        })
    }

})

endpoints.post('/entrar', async (req,resp) => {
    try {
        let pessoa = req.body

        let usuario = await db.validarUsuario(pessoa)

        if (usuario == null) {
            resp.send({
                Error: 'usuário não encontra'
            })
        }else{
            let token = gerarToken(usuario)

            resp.send({
                token: token
            })
        }
    } catch (err) {
        resp.send({
            Error: err.message
        })        
    }
})

export default endpoints;