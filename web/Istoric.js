
	var key = "278fc6950e7f4f78354ce81ea8e2099ca65c90e680b78c";

//History
	$.get('http://localhost:3000/history/?key='+key+'&graph=4', function(response){
		$('textarea').html(response)
	})
var chart = {}
$(document).ready(function() {

	$(".btn-toggle").click(function(){
		$(".toggle").toggle();
		$(".col-xs-9").toggleClass("width");
		$(".col-xs-9").toggleClass("reposition");
		chart.update();
	});

	$(".ct-chart").hide();

	$(".btn-temp").click(function(){
		$(".history").hide();
		$(".ct-chart").show();
	});
	$(".btn-umd").click(function(){
		$(".history").hide();
		$(".ct-chart").show();
	});
	$(".btn-myBPM").click(function(){
		$(".history").hide();
		$(".ct-chart").show();
	});
	$(".btn-tempBody").click(function(){
		$(".history").hide();
		$(".ct-chart").show();
	});

	var lineData = [];
	var dataElem = [];
	var elements = [];
	var i;

	var dataRecieved = function(param){
		$.get('http://localhost:3000/history/?key='+key+'&graph=' + param, function(response){ //trimitem request si asteptam raspuns cu o variabila pentru diferentiere actiuni
			let lineData = response.split("\n");
			for(i=0; i<5; i++){
				let dataElem = lineData[i].split(" ");
				elements.push(dataElem[0]);
				console.log(elements);
			}
			console.log(param);
			chart = new Chartist.Line('.ct-chart', {
				labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				series: [
					[elements[0], elements[1], elements[2], elements[3], elements[4]],
				]
			}, {
				fullWidth: true,
				chartPadding: {
					right: 40
				}
			});
			elements = [];
		})
	}

	$(".btn-temp").click(function(){
		dataRecieved(0);
	});
	$(".btn-umd").click(function(){
		dataRecieved(1);
	});
	$(".btn-myBPM").click(function(){
		dataRecieved(2);
	});
	$(".btn-tempBody").click(function(){
		dataRecieved(3);
	});

	$.get('http://localhost:3000/data?key='+key, function(response){
		let alarmData = response.split(" ");
		$("#tel").val(alarmData[0]);
		tel=alarmData[0];
		console.log(alarmData);
		if(alarmData[1] == 1){
			$(".btn-sw").removeClass("btn-sw-off");
			$(".btn-sw").addClass("btn-sw-on");
			$(".btn-sw").html("ON");
			clicked = 1;
		}else{
			$(".btn-sw").removeClass("btn-sw-on");
			$(".btn-sw").addClass("btn-sw-off");
			$(".btn-sw").html("OFF");
			clicked = 0;
		}
	});

	var tel;
	var clicked=0;
	var ip=0;

	$(".btn-tel").click(function(){
		tel = document.getElementById("tel").value;
		if(tel.length == 10){
			$.get('http://localhost:3000/data/?key='+key+'&tel='+ tel +'&sw=' + clicked + '&patient=' + ip);
			console.log(tel);
		}else{
			alert("Formatul numarului nu este bun! Numarul trebuie sa fie de forma 07XXXXXXXX");
		}

	});

	$(".btn-sw").click(function(){
		if(clicked == 1){
			$(".btn-sw").removeClass("btn-sw-on");
			$(".btn-sw").addClass("btn-sw-off");
			$(".btn-sw").html("OFF");
			clicked = 0;
		}else{
			$(".btn-sw").removeClass("btn-sw-off");
			$(".btn-sw").addClass("btn-sw-on");
			$(".btn-sw").html("ON");
			clicked = 1;
		}
		$.get('http://localhost:3000/data/?key='+key+'&tel='+ tel +'&sw=' + clicked + '&patient=' + ip);
	});

});
