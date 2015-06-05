/* global moment */
/* global Snap */
var xmlhttp = new XMLHttpRequest();
var url = "./data.json";

xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var data = JSON.parse(xmlhttp.responseText);
		main(data);
	}
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function main(data) {
	var height = 600;
	var width = window.innerWidth - 50;
	
	var pxPerMeter = width / (42195 - 5000);
	var pxPerKmH = height / (19 - 6);

	var hshift = pxPerMeter * -5000 + 35;
	var vshift = pxPerKmH * -6;
	
	var s = Snap(width, height);
	
	for (var i = 0; i < data.length; i++) {
		var element = data[i];
		if (!element || !element.time05km || !element.time10km || !element.time15km || !element.time20km || !element.time25km || !element.time30km || !element.time35km || !element.time40km || !element.time42km) {
			continue;
		}
		
		var time05km = getTime(element.time05km);
		var time10km = getTime(element.time10km);
		var time15km = getTime(element.time15km);
		var time20km = getTime(element.time20km);
		var time25km = getTime(element.time25km);
		var time30km = getTime(element.time30km);
		var time35km = getTime(element.time35km);
		var time40km = getTime(element.time40km);
		var time42km = getTime(element.time42km);
		
		if (!time05km || !time10km || !time15km || !time20km || !time25km || !time30km || !time35km || !time40km || !time42km) {
			continue;
		}
		
		var speed05 = getSpeed(5,  time05km);
		var speed10 = getSpeed(10, time10km);
		var speed15 = getSpeed(15, time15km);
		var speed20 = getSpeed(20, time20km);
		var speed25 = getSpeed(25, time25km);
		var speed30 = getSpeed(30, time30km);
		var speed35 = getSpeed(35, time35km);
		var speed40 = getSpeed(40, time40km);
		var speed42 = getSpeed(42, time42km);
		
		var info = element.race_no + " " + element.name + " " + element.time42km;
		
		var p = s
			.path(
				("M" +  ((5000 * pxPerMeter) + hshift) + " " + (height - (speed05 * pxPerKmH + vshift))) +
				("L" + ((10000 * pxPerMeter) + hshift) + " " + (height - (speed10 * pxPerKmH + vshift))) +
				("L" + ((15000 * pxPerMeter) + hshift) + " " + (height - (speed15 * pxPerKmH + vshift))) +
				("L" + ((20000 * pxPerMeter) + hshift) + " " + (height - (speed20 * pxPerKmH + vshift))) +
				("L" + ((25000 * pxPerMeter) + hshift) + " " + (height - (speed25 * pxPerKmH + vshift))) +
				("L" + ((30000 * pxPerMeter) + hshift) + " " + (height - (speed30 * pxPerKmH + vshift))) +
				("L" + ((35000 * pxPerMeter) + hshift) + " " + (height - (speed35 * pxPerKmH + vshift))) +
				("L" + ((40000 * pxPerMeter) + hshift) + " " + (height - (speed40 * pxPerKmH + vshift))) +
				("L" + ((42195 * pxPerMeter) + hshift) + " " + (height - (speed42 * pxPerKmH + vshift))))
			.attr({ fill: "none", stroke: "#000000", opacity: 0.01, info: info });
	}
	
	document.getElementById("info").innerHTML = "&nbsp;";
	
	s.text((pxPerMeter * 5000) - 10 + hshift, height - 10, "5K");
	s.text((pxPerMeter * 10000) - 10 + hshift, height - 10, "10K");
	s.text((pxPerMeter * 15000) - 10 + hshift, height - 10, "15K");
	s.text((pxPerMeter * 20000) - 10 + hshift, height - 10, "20K");
	s.text((pxPerMeter * 25000) - 10 + hshift, height - 10, "25K");
	s.text((pxPerMeter * 30000) - 10 + hshift, height - 10, "30K");
	s.text((pxPerMeter * 35000) - 10 + hshift, height - 10, "35K");
	s.text((pxPerMeter * 40000) - 10 + hshift, height - 10, "40K");
	
	s.text(0, (height - (16.9 * pxPerKmH + vshift)), "2:30");
	s.text(0, (height - (14.06 * pxPerKmH + vshift)), "3:00");
	s.text(0, (height - (12.04 * pxPerKmH + vshift)), "3:30");
	s.text(0, (height - (10.56 * pxPerKmH + vshift)), "4:00");
	s.text(0, (height - (9.38 * pxPerKmH + vshift)), "4:30");
	s.text(0, (height - (8.43 * pxPerKmH + vshift)), "5:00");
}

function getSpeed(distance, time) {
	return distance / (time.hours() + (time.minutes() / 60) + (time.seconds() / 3600));
}

function getTime(str) {
	if (str.length === "0:00:00".length) {
		return new moment(str, "H:mm:ss");
	}
	
	if (str.length === "00:00".length) {
		return new moment(str, "mm:ss");
	}
}