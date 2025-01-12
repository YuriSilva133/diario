
import { useParams } from 'react-router-dom';

import { useEffect, useState} from 'react'
import './index.scss'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';


export default function Consultar() {
    const [token, setToken] = useState(null);
    const [listaNegra, setListaNegra] = useState([]);

    const { id } = useParams();

    const navigate = useNavigate()

    async function buscar() {
        const url = `http://localhost:5011/consultarDiario/${id}?x-access-token=${token}`;
        let resp = await axios.get(url);
        setListaNegra(resp.data);
    }

    async function excluir(id) {
        const url = `http://localhost:5011/deletarDiario/${id}?x-access-token=${token}`;
        await axios.delete(url)

        await buscar()
    }

    async function sair() {
        localStorage.setItem('USUARIO', null)
        navigate('/')
    }
    

    // funcao que executa assim que a pagina carrega
    useEffect(() => {
        let usu = localStorage.getItem('USUARIO')
        setToken(usu)

        if (usu === undefined) {
            navigate('/')
        }
    }, [])
    

    return (
        <div className='pagina-consultar'>
            <h2>Bem-vindo {token?.nome}</h2>
            <button onClick={sair}>Sair</button>
            <h1> CONSULTAR </h1>

            <button onClick={buscar}>Buscar</button>
            <button><Link to={'/cadastrar'}>Cadastrar</Link></button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Conteudo</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {listaNegra.map(item => 
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.conteudo}</td>
                            <td>{new Date(item.data).toLocaleDateString()}</td>
                            
                            <td>
                                <Link to={`/cadastrar/${item.id}`}>Alterar</Link>
                                <Link onClick={() => excluir(item.id)}>Deletar</Link>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>

        </div>
    )
}
