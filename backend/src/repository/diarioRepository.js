import con from './connection.js'


export async function consultarDiario(id) {
    let comando = `
        select dt_dia, ds_conteudo
        from tb_diario
        where id_usuario = ?;
    `
    let resposta = await con.query(comando, [id])

    let info = resposta[0]

    return info;
}

export async function inserirDiario(diario, id) {
    let comando =`
        insert into tb_diario(dt_dia, ds_conteudo, id_usuario) values
        (?, ?, ?);
    `

    let resposta = await con.query(comando, [diario.data, diario.conteudo, id])

    let info = resposta[0]

    return info.insertId;
}

export async function AtualizarDiario(diario, id) {
    let comando = `
        update tb_diario
        set 
	        dt_dia = ?,
            ds_conteudo = ?
        where id_diario = ?
    `
    let resposta = await con.query(comando, [diario.data, diario.conteudo, id])

    let info = resposta[0]

    return info.affectedRows
}

export async function deletarDiario(id) {
    let comando = `
    delete from tb_diario
    where id_diario = ?;
    `

    let resposta = await con.query(comando,[id])

    let info = resposta[0]

    return info.affectedRows
}