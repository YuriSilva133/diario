import con from "./connection.js"

export async function inserirUsuario(pessoa) {
    let comando = `
    insert into tb_usuario(nm_usuario, ds_senha) values
    (?, ?)
    `

    let resposta = await con.query(comando, [pessoa.nome, pessoa.senha])
    let info = resposta[0]

    return info.insertId
}

export async function validarUsuario(pessoa) {

    let comando = `
        select 
		    id_usuario id,
		    nm_usuario nome
        from tb_usuario
        where 
            nm_usuario = ?
            and ds_senha = ?;
    `

    let resposta = await con.query(comando, [pessoa.nome, pessoa.senha])
    let info = resposta[0][0]

    return info;
}
