var y = 6; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer = null;
var timerGasolina = null;
var fuel = 100;
var motor = true;
var motorApagado = true;
// g gravedad, a aceleracion, v velocidad, 

//funcion que se empieza cuando la pantalla carga.
window.onload = function(){
	
// Pulsando opciones, accedemos al menu y desaparecen los botones.

    document.getElementById("opciones").onclick = function () {
				motor = false;
				document.getElementById("play").style.display = "block";
				document.getElementById("reiniciar").style.display = "block";
				document.getElementById("info").style.display = "block";
				document.getElementById("acercade").style.display = "block";
				document.getElementById("parar").style.display = "block";
				document.getElementById("pause").style.display = "none";
				stop();
				motorOff();
	}	


//pulsando el "acercade" en el menu accedemos a los creditos.
	document.getElementById("acercade").onclick = function() {
				document.getElementById("creditos").style.display = "block";
				var boton = document.getElementsByClassName("boton");
				for (var i=0;i<boton.length; i++) {
					boton[i].style.display = "none";
				}
	}

//Vuelve al juego desde los creditos.
			document.getElementById("creditosVolver").onclick = function() {
						document.getElementById("creditos").style.display = "none";
						var boton = document.getElementsByClassName("boton");
						for (var i=0;i<boton.length; i++) {
							if (i != 3){
								boton[i].style.display = "block";
							}else{
								boton[i].style.display = "none";
							}
						}
	}

//Pulsando "info" accedemos a las instrucciones.
	document.getElementById("info").onclick = function() {
				document.getElementById("instrucciones").style.display = "block";
				var boton = document.getElementsByClassName("boton");
				for (var i=0;i<boton.length; i++) {
					boton[i].style.display = "none";
				}
	}	
				document.getElementById("instruccionesVolver").onclick = function() {
						document.getElementById("instrucciones").style.display = "none";
						var boton = document.getElementsByClassName("boton");
						for (var i=0;i<boton.length; i++) {
							if (i != 3){
								boton[i].style.display = "block";
							}else{
								boton[i].style.display = "none";
							}
						}

				}



//Pulsando el boton play desaparecen los botones.
	document.getElementById("play").onclick = function() {
				motor = true;
				document.getElementById("reiniciar").style.display = "none";
				document.getElementById("info").style.display = "none";
				document.getElementById("acercade").style.display = "none";
				document.getElementById("play").style.display = "none";
				document.getElementById("pause").style.display = "block";
				document.getElementById("parar").style.display = "none";
				start();
				motorOn();
	}


//pulsando el boton pause, desaparece el boton play.
	document.getElementById("pause").onclick = function() {
				motor = false;
				document.getElementById("play").style.display = "block";
				document.getElementById("pause").style.display = "none";
				document.getElementById("parar").style.display = "block";
				stop();
				motorOff();
		
	}


//Pulsando el boton reiniciar se refresca la pagina.
	document.getElementById("reiniciar").onclick = function() {
			location.reload();
	}


//funciones de motor
	function motorOn(){
		if (motor == true){
			a = -g;
			document.getElementById("naveApagada").style.display = "none";
			document.getElementById("navEncendida").style.display = "block";
			if (timerGasolina == null)
				timerGasolina=setInterval(function(){ moverGasolina(); }, 100	);
		}
		if (fuel <= 0) {
            motorOff();
            document.getElementById("fuel").innerHTML = 0;
            document.getElementById("imgNave").src = "img/nave.png";
        }
	}
	function motorOff(){
			if (motorApagado == true){
				a = g;
				document.getElementById("naveApagada").style.display = "block";
				document.getElementById("navEncendida").style.display = "none";
				clearInterval(timerGasolina);
				timerGasolina=null;
			}
	}



//Empezar a mover nave
	start();

	document.onclick = function(){
		if (a==g){
			motorOn();
		}else {
			motorOff();
		}
}

// BOTONES
	addEventListener("keydown", function(event) {
		//SPACE encender motor
		if (event.keyCode == 32){ 
			motorOn();
		}
	});
// Dejar de propulsar al soltar el boton SPACE
	addEventListener("keyup", function(event) {
		event.keyCode == 32;
		motorOff();
	});
	

}

//Enciende la nave
function start(){
	// funcion que ejecuta moverNave cada dt*1000 milisegundos
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}
//Apaga la nave
function stop(){
	clearInterval(timer);

}
function moverGasolina(){
	if (fuel > 0 || y > 74){
		fuel -= 1;
		document.getElementById("contadorGasolina").style.height = cGasolina+"%";
	}else {
		motor = false;
		motorOff()	
	}
}	
function moverNave(){
	//Velocidad
	v +=(a*dt);
	document.getElementById("velocidad").innerHTML = Math.round(v);
	//Altura
	y +=v*dt;
	document.getElementById("altura").innerHTML = Math.round(70 - y);
	//Si la altura es menor de 75%
	if (y <= 5) {
		a = g;
		v = 1;
	}else if (y < 75){
		document.getElementById("naveDiv").style.top = y+"%";
	//Si la nave llega a la luna
	}else if (y >= 75 && v >5) {
		stop();
		motor = false;
		motorApagado = false;
		document.getElementById("naveApagada").style.display = "none";
		var boton = document.getElementsByClassName("boton");
		for (var i=0;i<boton.length; i++) {
				boton[i].style.display = "none";
		}
		document.getElementById("navEncendida").style.display = "none";
		document.getElementById("navExplosion").style.display = "block";
		document.getElementById("perder").style.display = "block";
	}else {
		stop();
		motor = false;
		motorApago = false;
		document.getElementById("navEncendida").style.display = "none";
		document.getElementById("naveApagada").style.display = "block";
		document.getElementById("ganar").style.display = "block";
		document.getElementById("navExplosion").style.display = "none";
		var boton = document.getElementsByClassName("boton");
		for (var i=0;i<boton.length; i++) {
				boton[i].style.display = "none";
		}
	}
}
