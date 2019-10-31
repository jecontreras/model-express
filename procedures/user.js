let Procedure = Object();
var Passwords = require('machinepack-passwords');
let Crud = require('./../middleware/crud');

// Busqueda por todo los usuarios //////////////////////////////////////////////////////////////////////////////////
Procedure.index = async ()=>{
	var resultado = await Crud('user').index();
	// console.log(13,"<<<--",resultado);
	return resultado
}

//login del usuario
Procedure.passworddes = async(pass, user)=>{
	let
		resultado = Object()
	;
	// console.log(170,pass.passwor, user.passwor);
	return new Promise(resolve=>{
		resultado = Passwords.checkPassword({
				passwordAttempt: pass.passwor,
				encryptedPassword: user.passwor,
				}).exec({
				error: function (err) {
					resolve({status: 500, data: "error del servidor"})
				},
				incorrect: function () {
					resolve({status: 400, data: "Contraseña Incorrecta"})
				},
				success: function () {
					// console.log("bien");
					resolve({status:200, data: "contraseña correcta"});
				},
			});
	});
}
Procedure.login = async (user)=>{
	const
    query 		= user
  ;
	let
		resultado = Object(),
		resultadopass = Object(),
		sql 			= `SELECT * FROM user WHERE username = '${query.username}'`
	;
	// console.log(sql);
  if(query.username && query.passwor){
		resultado = await consulta(sql);
		if (!resultado) return resultado = {status: 400, data: "error el usuario no existe"}
		resultadopass = await Procedure.passworddes(query, resultado[0])
		if(resultadopass.status===500 || resultadopass.status===500){
			return resultadopass;
		}
		delete user.passwor;
		resultado = {
			success: true,
			message: "peticione realizada",
			data: resultado[0]
		};
		return resultado;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  Exportar Clase /////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = Procedure
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
