import usuarioController from './controller/usuarioController.js'
import diarioController from './controller/diarioController.js'

export default function adicionarRotas(servidor) {
    servidor.use(usuarioController)
    servidor.use(diarioController)
}