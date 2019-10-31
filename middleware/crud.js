///////////////////////////////////////////////////////////////////////////////////

function Crud (entidad)
{
    this.entidad = entidad
}

///////////////////////////////////////////////////////////////////////////////////

Crud.prototype.create = async function create (data,key = 'id'){

    let sql       = String()
    let resultado = Object()
    let colum     = Array()

    for(let key of Object.keys(data))
    {
        let dupla = `${key}="${  data[key] }"`
            dupla = dupla.split("'").join()
        colum.push(dupla)
    }
    colum = colum.join(',')

    //sql = `INSERT INTO ${this.entidad} SET ${colum} ON DUPLICATE KEY UPDATE ${colum}`
    sql = `INSERT INTO ${this.entidad} SET ${colum}`
    resultado  =  await consulta(sql,data)
    if(!resultado)return false

    if(resultado.insertId  > 0)return resultado.insertId
    else if(resultado.affectedRows > 0)return resultado.affectedRows
    else return true
}

///////////////////////////////////////////////////////////////////////////////////

Crud.prototype.read = async function read (id){

    let sql       = String()
    let resultado = Object()

    sql = `SELECT * FROM ${this.entidad} WHERE id="${id}"`
    resultado  =  await consulta(sql)
    if(!resultado)return false
    return resultado
}

Crud.query = async function(query){
  let resultado;
  let sql;
  sql = `SELECT * FROM ${this.entidad} where?`;
  if(query){
    sql = query;
  }
  resultado = await consulta(sql, query);
  return resultado
}

///////////////////////////////////////////////////////////////////////////////////

Crud.prototype.update = async function update (data,key = 'id'){

    let sql       = String()
    let resultado = Object()
    sql = `UPDATE ${this.entidad} SET ? WHERE ${key}=${data[key]}`

    resultado  =  await consulta(sql,data)
    if(!resultado)return false
    return resultado.affectedRows
}

///////////////////////////////////////////////////////////////////////////////////

Crud.prototype.delete = async function del(id){

	let sql          = String()
 	let resultado    = Object()

    sql = `UPDATE ${this.entidad} SET estado = "INACTIVO" WHERE id=${id}`
 	resultado  =  await consulta(sql)
    if(!resultado)return false
    return true
}

///////////////////////////////////////////////////////////////////////////////////

module.exports = Crud
