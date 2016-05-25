"use strict";


function doClear() {
	document.getElementById("input-text").value = "";
	removeAllChildren(document.getElementById("results"));
	inputTextElem.className = "";
}


function doAnalyze() {
	var inputTextElem = document.getElementById("input-text");
	var text = inputTextElem.value;
	text = text.replace(/\n+$/g, "");  // Strip trailing newlines
	var lines = text.split("\n");
	
	var header = lines[0].split(",");
	var electrodeColIndex = -1;
	for (var i = 0; i < header.length; i++) {
		if (header[i] == "Electrode") {
			if (electrodeColIndex != -1) {
				alert("Error: Duplicate column \"Electrode\"");
				return;
			} else {
				electrodeColIndex = i;
			}
		}
	}
	
	var skippedRows = 0;
	var invalidValues = 0;
	var samples = [];
	for (var i = 1; i < lines.length; i++) {
		var columns = lines[i].split(",");
		if (columns.length != header.length) {
			skippedRows++;
		} else {
			var strValue = columns[electrodeColIndex];
			var numValue;
			if (/^[+-]?\d+(?:\.\d*)?$/.test(strValue))
				numValue = parseFloat(strValue)
			else {
				invalidValues++;
				numValue = 0;
			}
			samples.push(numValue);
		}
	}
	if (skippedRows > 0)
		alert("Warning: Skipped " + skippedRows + " rows in the input data due to invalid format");
	if (invalidValues > 0)
		alert("Warning: Replaced " + invalidValues + " invalid electrode values in the input data");
	inputTextElem.className = "minimize";
	
	setTimeout(function() {
		doComputation(samples);
	}, 250);
}


var SAMPLES_PER_SECOND = 512;

function doComputation(samples) {
	var resultsElem = document.getElementById("results");
	removeAllChildren(resultsElem);
	
	var tableElem = createElement("table");
	var trElem = createElement("tr");
	["Time", "Electrode", "FFT", "FFTimag", "Amplitude", "FreqIndex", "Seconds"].forEach(
		function(name) {
			trElem.appendChild(createElement("th", name));
		});
	tableElem.appendChild(createElement("thead", trElem));
	var tbodyElem = createElement("tbody");
	tableElem.appendChild(tbodyElem);
	
	var numSeconds = Math.floor(samples.length / SAMPLES_PER_SECOND);
	for (var i = 0; i < numSeconds; i++) {
		var startIndex = (i + 0) * SAMPLES_PER_SECOND;  // Inclusive
		var endIndex   = (i + 1) * SAMPLES_PER_SECOND;  // Exclusive
		var block = samples.slice(startIndex, endIndex)
		var real = block.slice();  // Clone
		var imag = real.map(function() { return 0; });  // Same length, but all zeros
		transform(real, imag);  // FFT
		real[0] = 0;  // Cancel the DC offset coefficient
		var amplitude = [];
		for (var j = 0; j <= real.length / 2; j++)
			amplitude.push(Math.hypot(real[j], imag[j]));
		var maxAmplitude = Math.max.apply(null, amplitude);
		
		var h3 = createElement("h3", "Time = " + i + " seconds");
		resultsElem.appendChild(h3);
		
		var p = createElement("p", "Brainwave:");
		resultsElem.appendChild(p);
		
		var graphElem = createElement("div");
		graphElem.className = "wavegraph";
		var minBlock = Math.min.apply(null, block);
		var maxBlock = Math.max.apply(null, block);
		for (var j = 0; j < block.length; j++) {
			var fullHeight = 4;
			var dotOffset = (maxBlock - block[j]) / (maxBlock - minBlock) * fullHeight;
			var dotElem = createElement("div");
			dotElem.style.top = "calc(" + dotOffset.toFixed(3) + "em - 1px)";
			dotElem.title = (i + j / SAMPLES_PER_SECOND).toFixed(3) + " s";
			graphElem.appendChild(dotElem);
		}
		resultsElem.appendChild(graphElem);
		
		p = createElement("p", "Frequency spectrum:");
		resultsElem.appendChild(p);
		
		graphElem = createElement("div");
		graphElem.className = "freqgraph";
		for (var j = 0; j <= real.length / 2; j++) {
			var fullHeight = 10;
			var barHeight = amplitude[j] / maxAmplitude * fullHeight;
			var barElem = createElement("div");
			barElem.style.height = barHeight.toFixed(3) + "em";
			barElem.title = j + " Hz";
			graphElem.appendChild(barElem);
		}
		resultsElem.appendChild(graphElem);
		
		for (var j = 0; j < SAMPLES_PER_SECOND; j++) {
			var trElem = createElement("tr");
			trElem.appendChild(createElement("td", (i + j / SAMPLES_PER_SECOND).toFixed(3)));
			trElem.appendChild(createElement("td", block[j].toString()));
			trElem.appendChild(createElement("td", j < amplitude.length ? real[j].toFixed(3) : ""));
			trElem.appendChild(createElement("td", j < amplitude.length ? imag[j].toFixed(3) : ""));
			trElem.appendChild(createElement("td", j < amplitude.length ? amplitude[j].toFixed(3) : ""));
			trElem.appendChild(createElement("td", j < amplitude.length ? j.toString() : ""));
			trElem.appendChild(createElement("td", i.toString()));
			tbodyElem.appendChild(trElem);
		}
	}
	
	var p = createElement("p", "Numbers:");
	resultsElem.appendChild(p);
	resultsElem.appendChild(tableElem);
}


function createElement(tagName, content) {
	var result = document.createElement(tagName);
	if (content != undefined) {
		if (typeof content == "string")
			content = document.createTextNode(content);
		result.appendChild(content);
	}
	return result;
}


function removeAllChildren(node) {
	while (node.firstChild != null)
		node.removeChild(node.firstChild);
}


// Polyfill
if (!("hypot" in Math)) {
	Math.hypot = function(x, y) {
		return Math.sqrt(x * x + y * y);
	};
}
