var stud;
var nucleo;

function Studente(matricola, nome, cognome, dataNascita) {
	"use strict";
	this.matricola = matricola;
	this.nome = nome;
	this.cognome = cognome;
	this.dataNascita = dataNascita;
	
	this.info = function() {
		return this.matricola + ", " + this.nome + ", " + this.cognome + ", " + this.dataNascita;
	};
	
}

function startCalcolo(mat, nome, cognome, nascita){
	"use strict";
	stud = new Studente(mat, nome, cognome, nascita);
	$(".calcoloISEE").css("display", "block");
	$("#calcoloISEE").hide();
	$("#studente").html(stud.nome + " " + stud.cognome + " (" + stud.matricola + ")");
}

function setNucleo(){
	"use strict";
	nucleo = $("#nucleo").val();
	var html;
	for(var i=1; i<=nucleo; i++){
		html = '';
		html += '<tr>';
		html += '	<th>REDDITO del componente ' + i + ':</th>';
		html += '	<td><input type="text" class="reddito" /></td>';
		html += '</tr>';
		html += '<tr>';
		html += '	<th>PATRIMONIO del componente ' + i + ':</th>';
		html += '	<td><input type="text" class="patrimonio" /></td>';
		html += '</tr>';
		$("#valori").append(html);
	}
	$("#setNucleo").hide();
	$("#calcoloISEE").show();
}

function parseFloatCommas(number){
	"use strict";
	var tmp = number.replace(',', '.');
	return parseFloat(tmp);
}

function calcoloISEE(){
	"use strict";
	var componentiReddito = $(".reddito");
	var componentiPatrimonio = $(".patrimonio");
	var ISR = 0;
	var ISP = 0;
	for(var i=0; i<nucleo; i++){
		ISR += parseFloatCommas(componentiReddito[i].value);
		ISP += parseFloatCommas(componentiPatrimonio[i].value);
	}
	var ISE = ISR + ISP * 20/100;
	var scaleEquivalenza = {
		"1" : 1,
		"2" : 1.57,
		"3" : 2.04,
		"4" : 2.46,
		"5" : 2.85
	};
	var calcolaSE = function(){
		if(nucleo <= 5){
			return scaleEquivalenza[nucleo];
		}else{
			return (2.85 + 0.2 * nucleo);
		}
	};
	var SE = calcolaSE();
	var ISEE = ISE / SE;
	var html = '<tr>';
	html += '	<th>ISR:</th>';
	html += '	<td>' + ISR + '</td>';
	html += '</tr>';
	html += '<tr>';
	html += '	<th>ISP:</th>';
	html += '	<td>' + ISP + '</td>';
	html += '</tr>';
	html += '<tr>';
	html += '	<th>ISE:</th>';
	html += '	<td>' + ISE + '</td>';
	html += '</tr>';
	html += '<tr>';
	html += '	<th>Scala di Equivalenza:</th>';
	html += '	<td>' + SE + '</td>';
	html += '</tr>';
	html += '<tr>';
	html += '	<th>ISEE:</th>';
	html += '	<td>' + ISEE + '</td>';
	html += '</tr>';
	$("#risultato").append(html);
}