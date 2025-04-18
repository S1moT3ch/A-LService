const express = require('express');
const app= express;
let $ = require('cheerio').load('dashboard.ejs')

var nome="";

function NomeBenvenuto(username){
    nome=username;
    return nome;
}

$('lol').replaceWith('ok');
console.log($('p1').text());
module.exports = NomeBenvenuto;