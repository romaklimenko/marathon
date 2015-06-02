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
	var dist5km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)");
	var dist10km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(2)");
	var dist15km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(2)");
	var dist20km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(5) > td:nth-child(2)");
	var dist25km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(7) > td:nth-child(2)");
	var dist30km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(8) > td:nth-child(2)");
	var dist35km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(9) > td:nth-child(2)");
	var dist40km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(10) > td:nth-child(2)");
	var dist42km = getValue("body > table > tbody > tr > td > table:nth-child(13) > tbody > tr > td > table > tbody > tr:nth-child(11) > td:nth-child(2)");

	if (!name || !race_no) {
		return;
	}

	return {
		"name"    : name,
		"race_no" : race_no,
		"dist5km" : dist5km,
		"dist10km": dist10km,
		"dist15km": dist15km,
		"dist20km": dist20km,
		"dist25km": dist25km,
		"dist30km": dist30km,
		"dist35km": dist35km,
		"dist40km": dist40km,
		"dist42km": dist42km
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