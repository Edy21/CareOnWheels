
	var data = [];
	var ip=0;
	var bpm;
	var tel;
	var clicked=0;
	var send_alert=0;
  var table=0;
	var pos;
	var key = "278fc6950e7f4f78354ce81ea8e2099ca65c90e680b78c";

	var patientData = function() {
		$.get('http://localhost:3000/?key='+key+'&type=5&patient='+ip, function(response){ //se face requestul
			let data = response.split("*");
			if(data[0]) $("#myBPM").html(data[0]);
			if(data[1]) $("#temp").html(data[1] + " " +"C");
			if(data[2]) $("#umd").html(data[2] + "%");
			if(data[3]) $("#tempBody").html(data[3] + " " + "C")
    }
			bpm = data[0];
			console.log(bpm)
			if((bpm < 60 || bpm > 100) && clicked == 1){
				if(send_alert == 0){
					alert("Pulsul pacientului nu este in paramatrii normali!");
					send_alert=1;
					setTimeout(function() {
						send_alert = 0;
					}, 30 * 1000);
				}
				$("#exclamation").removeClass("exclamation-hide");
			}else{
				console.log(bpm);
				$("#exclamation").addClass("exclamation-hide");
			}
		});
	}

	setInterval(function(){ //sa se repete requestul dupa un interval de timp
		patientData();
	}, 5000);

	var forward = function() {
		$.get('http://localhost:3000/?key='+key+'&type=1&speed=1&patient='+ip);
	}

	var backward = function() {
		$.get('http://localhost:3000/?key='+key+'&type=2&speed=1&patient='+ip);
	}

	var left = function() {
		$.get('http://localhost:3000/?key='+key+'&type=3&speed=1&patient='+ip);
	}

	var right = function() {
		$.get('http://localhost:3000/?key='+key+'&type=4&speed=1&patient='+ip);
	}

 $(document).ready(function() {
	patientData();
    let canDoAction = 1;
	let btnDoAction = 1;

	setInterval(function(){
		canDoAction = 1;
	}, 150);

	$(document).keydown(function(event){
	   if(canDoAction === 0) return;

	   if(event.keyCode === 87){
	         canDoAction = 0;
			 forward();
	   }

	   if(event.keyCode === 65){
	         canDoAction = 0;
			 left();
	   }

	   if(event.keyCode === 83){
	         canDoAction = 0;
			 backward();
	   }

	   if(event.keyCode === 68){
	         canDoAction = 0;
			 right();
	   }
	})


	var timeout1;
	$("#btn-forward").click(function(){
		forward();
	});
	$("#btn-forward").mousedown(function(){
		timeout1 = setInterval(function(){
			forward();
		}, 150);
		return false;
	});
	$(document).mouseup(function(){
		clearInterval(timeout1);
		return false;
	});


	var timeout2;
	$("#btn-left").click(function(){
		left();
	});
    $("#btn-left").mousedown(function(){
		timeout2 = setInterval(function(){
			left();
		}, 150);
		return false;
	});
	$(document).mouseup(function(){
		clearInterval(timeout2);
		return false;
	});


	var timeout3;
	$("#btn-backward").click(function(){
		backward();
	});
    $("#btn-backward").mousedown(function(){
		timeout3 = setInterval(function(){
			backward();
		}, 150);
		return false;
	});
	$(document).mouseup(function(){
		clearInterval(timeout3);
		return false;
	});


	var timeout4;
	$("#btn-right").click(function(){
		right();
	});
    $("#btn-right").mousedown(function(){
		timeout4 = setInterval(function(){
			right();
		}, 150);
		return false;
	});
	$(document).mouseup(function(){
		clearInterval(timeout4);
		return false;
	});


	var width;
  var hide = 0;
	var patients = 1;
	var smallscreen = 0;
	setInterval(function(){
		width = $(window).width();
		if(width < 600 && patients == 0){
			$(".col-xs-12").removeClass("next");
			$(".col-xs-9").removeClass("width");
		}
		if(width > 600 && patients == 0){
			$(".col-xs-12").addClass("next");
			$(".col-xs-9").addClass("width");
		}

	}, 150);

	$(".btn-toggle").click(function(){
		 width = $(window).width();
		$(".toggle").toggle();
		if(width > 600){
			$(".col-xs-12").toggleClass("next");
			$(".col-xs-9").toggleClass("width");
		}
		if(patients == 1){
			patients = 0;
		}else{
			patients = 1;
		}

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

  $(".fa-list-alt").click(function(){
      $(".col-xs-12").addClass('hidden');
      $(".blur-container").addClass('blur');
      $(".overlay").removeClass('hidden');
  });
  $(".exit").click(function(){
    $(".col-xs-12").removeClass('hidden');
    $(".blur-container").removeClass('blur');
    $(".overlay").addClass('hidden');

 });
 $(".ok").click(function(){
   table=1;
   var string=(document.getElementById("inp").value).split(" ");
	 for(i=0; i<string.length; i++){
		 	if(jQuery.type(string[i]) !== 'number'){
			console.log("ok")
		}
	 }
	 var content = "<table class='tb'>"

   content += "<tr>"
   content += "<th> Pacient </th> <th> Temperatura Corp </th> <th>Puls</th> <th>Temperatura</th>  <th> Umiditate </th>"
   content += "</tr>"
	 var y=0;
   for(i=0; i<string.length; i++){
		 if(y==0){
	content += '<tr> <td>' + string[i] + '</td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>';
 }
		 if(string[i]==1){
			 pos=i;
			 content += '<tr> <td>' + string[i] + '</td> <td id="1" > </td> <td id="2"> </td> <td id="3"> </td> <td id="4"> </td> </tr>';
			 var y=1;
			 y=0;
		 }

	 }
   content += "</table>"
   $('#table').append(content);
   $(".blur-container").removeClass('blur');
   $(".overlay").addClass('hidden');
   $(".fa-list-alt").addClass('hidden');
   $(".fa-long-arrow-left").removeClass('hidden');

 });
 $(".fa-long-arrow-left").click(function(){
     $('#table').empty();
     $(".col-xs-12").removeClass('hidden');
     $(".fa-long-arrow-left").addClass('hidden');
     $(".fa-list-alt").removeClass('hidden');

 });

 });
