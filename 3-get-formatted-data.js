/* global phantom */
var fs = require("fs");
var path = "./raw-data/";
var list = fs.list(path);
var data = [];
var page = require("webpage").create();

var x = list.length;

function getDataFromPage() {
	function getValue(selector) {
		var elements = document.querySelectorAll(selector);
		
		if(!elements || !elements[0] || elements[0].innerHTML === " "){
			return;
		}
		return elements[0].innerHTML;
	}

	console.log("elements");

	var name = getValue("body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td:nth-child(1) > span");
	var race_no = getValue("body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td:nth-child(2) > span.participant_value_big");
	var time05km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)");
	var time10km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(2)");
	var time15km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(2)");
	var time20km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(5) > td:nth-child(2)");
	var time25km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(7) > td:nth-child(2)");
	var time30km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(8) > td:nth-child(2)");
	var time35km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(9) > td:nth-child(2)");
	var time40km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(10) > td:nth-child(2)");
	var time42km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(11) > td:nth-child(2)");

	if (!name || !race_no) {
		return;
	}

	return {
		"name"    : name,
		"race_no" : race_no,
		"time05km": time05km,
		"time10km": time10km,
		"time15km": time15km,
		"time20km": time20km,
		"time25km": time25km,
		"time30km": time30km,
		"time35km": time35km,
		"time40km": time40km,
		"time42km": time42km
	}
}

page.onLoadFinished = function (status) {
	var result = page.evaluate(getDataFromPage);
	
	if (result !== null) {
		data.push(page.evaluate(getDataFromPage));	
	}

	var file;

	while (!fs.isFile(file) && x >= 0) {
		var file = fs.absolute(path + list[x]);
		x--;
	}

	if (x < 1) {
		fs.write("data.json", JSON.stringify(data, null, 2), "w");
		phantom.exit();
	}
	else {
		parseData(file);
	}
};

function parseData(file) {
	page.open("file:///" + file, function (status) {
		console.log("open:" + status);
	});
}

function getFilePath(x) {
	return fs.absolute(path + list[x]); 
}

parseData(getFilePath(x));