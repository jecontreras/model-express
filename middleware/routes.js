//////////////////////////////////////////////////////////////////

    global.listado_routes = Array()
    let routepath = require('path').join(__dirname, '../routes')
    fs.readdirSync(routepath).forEach((file)=> {
        let path = ''
        if(file =='index.js')path = '/'
        else path = '/'+file.replace('.js','')
        let ruta    = './routes/'+file
        // console.log(path, ruta);
        listado_routes.push({path:path,ruta:ruta})
    })

    module.exports =  "Correcto-> Cargar Rutas"

//////////////////////////////////////////////////////////////////
