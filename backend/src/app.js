import 'dotenv/config'
import cors from 'cors'
import adicionarRotas from './rotas.js'
import express from 'express'

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

adicionarRotas(servidor);

servidor.listen(process.env.PORTA, () => console.log(`--> API subiu na porta ${process.env.PORTA}`));