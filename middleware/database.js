////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const mysql    = require('mysql')
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

global.consulta =  async function(sql,obj ={})
{
    return new Promise(resolve => {
        db.getConnection(async (err, connection)=>{
            if(err)console.log("Error -> al Intentar Conectar Con Mysql...")
            else
            {
                connection.query(sql,obj, async (error, results, fields)=> {

                    connection.release()
                    // console.log(20, "database", results);
                    if (error)
                    {
                        console.log("Error-> Sql",sql,error)
                        resolve(false)
                    }
                    else resolve(results)
                })
            }
        })
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = new Promise(resolve=>{

    let db_configure            = Object()
        db_configure.host       = '192.168.88.59'
        db_configure.user       = 'desarrollo'
        db_configure.password   = 'cluster.001'
        db_configure.database   = 'gs'

    let conexion_database =  mysql.createConnection(db_configure)  /*Conexion Bandera*/
        conexion_database.connect(  (err)=>{
                if(err)resolve("Error-> Conectando Con La Database")
                else
                {
                    conexion_database.destroy() /*Cierro Conexion Bandera */
                    global.db =  mysql.createPool(db_configure)
                    resolve("Correcto-> Conectado Con La Database")
                }
        })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
