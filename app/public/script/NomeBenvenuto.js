const express = require('express');
const app= express;
var nome="";

function NomeBenvenuto(username){
    nome=username;
    console.log(nome);
    return nome;
}
module.exports = NomeBenvenuto;