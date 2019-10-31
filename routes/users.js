var express = require('express');
var router = express.Router();
var Passwords = require('machinepack-passwords');
let Procedure = require('../procedures/user');
// const dbConection = require('./../services/conexion');

let login = async (req, res, next)=>{
  let resultado    = Object()
      resultado    = await Procedure.login(req.body);
      // console.log(22, resultado);
      if(!resultado) res.status(500).send('Error Interno')
      else   res.status(200).send(resultado)

}

router.post('/login', login);


module.exports = router;
