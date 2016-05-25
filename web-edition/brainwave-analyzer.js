"use strict";


/*---- Top-level functions ----*/

var analysisResults;


function doClear() {
	clearResults();
	var inputTextElem = document.getElementById("input-text");
	inputTextElem.value = "";
	inputTextElem.className = "";
}


function doAnalyze() {
	var samples = readFormInput();
	if (samples == null)
		return;
	
	// Do the work after the CSS animation finishes
	setTimeout(function() {
		analysisResults = computeAndAnalyze(samples);
		displayAnalysis(analysisResults);
	}, 250);
}


/*---- Middle-level application functions ----*/

function clearResults() {
	analysisResults = null;
	removeAllChildren(document.getElementById("results"));
}


// Reads the textarea with ID "input-text", then returns an array of numeric samples or null.
function readFormInput() {
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
				return null;
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
	return samples;
}


var SAMPLES_PER_SECOND = 512;

// Returns an array of dictionaries, one per second.
function computeAndAnalyze(samples) {
	var result = [];
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
		
		result.push({
			electrode: block,
			fftReal: real,
			fftImag: imag,
			fftAmplitude: amplitude,
			delta: sumAmplitudesEnergy(amplitude.slice( 0,  4)),
			theta: sumAmplitudesEnergy(amplitude.slice( 4,  8)),
			alpha: sumAmplitudesEnergy(amplitude.slice( 8, 14)),
			beta : sumAmplitudesEnergy(amplitude.slice(14, 32)),
			gamma: sumAmplitudesEnergy(amplitude.slice(32, amplitude.length)),
		});
	}
	return result;
}


function displayAnalysis(analysis) {
	clearResults();
	var resultsElem = document.getElementById("results");
	
	var tableElem = createElement("table");
	var trElem = createElement("tr");
	var columns = [
		"Time", "Electrode", "FFT", "FFTimag", "Amplitude", "FreqIndex", "Seconds",
		"Delta", "Theta", "Alpha", "Beta", "Gamma"];
	columns.forEach(
		function(name) {
			trElem.appendChild(createElement("th", name));
		});
	tableElem.appendChild(createElement("thead", trElem));
	var tbodyElem = createElement("tbody");
	tableElem.appendChild(tbodyElem);
	
	// Process each second (block) of data
	analysis.forEach(function(data, i) {
		var h3 = createElement("h3", "Time = " + i + " seconds");
		resultsElem.appendChild(h3);
		
		var p = createElement("p", "Brainwave:");
		resultsElem.appendChild(p);
		
		var graphElem = createElement("div");
		graphElem.className = "wavegraph";
		var minBlock = Math.min.apply(null, data.electrode);
		var maxBlock = Math.max.apply(null, data.electrode);
		for (var j = 0; j < data.electrode.length; j++) {
			var fullHeight = 4;
			var dotOffset = (maxBlock - data.electrode[j]) / (maxBlock - minBlock) * fullHeight;
			var dotElem = createElement("div");
			dotElem.style.top = "calc(" + dotOffset.toFixed(3) + "em - 1px)";
			dotElem.title = (i + j / SAMPLES_PER_SECOND).toFixed(3) + " s";
			graphElem.appendChild(dotElem);
		}
		resultsElem.appendChild(graphElem);
		
		p = createElement("p", "Frequency spectrum:");
		resultsElem.appendChild(p);
		
		var maxAmplitude = Math.max.apply(null, data.fftAmplitude);
		graphElem = createElement("div");
		graphElem.className = "freqgraph";
		for (var j = 0; j < data.fftAmplitude.length; j++) {
			var fullHeight = 10;
			var barHeight = data.fftAmplitude[j] / maxAmplitude * fullHeight;
			var barElem = createElement("div");
			barElem.style.height = barHeight.toFixed(3) + "em";
			barElem.title = j + " Hz";
			graphElem.appendChild(barElem);
		}
		resultsElem.appendChild(graphElem);
		
		for (var j = 0; j < SAMPLES_PER_SECOND; j++) {
			var trElem = createElement("tr");
			trElem.appendChild(createElement("td", (i + j / SAMPLES_PER_SECOND).toFixed(3)));
			trElem.appendChild(createElement("td", data.electrode[j].toString()));
			trElem.appendChild(createElement("td", j < data.fftAmplitude.length ? data.fftReal[j].toFixed(3) : ""));
			trElem.appendChild(createElement("td", j < data.fftAmplitude.length ? data.fftImag[j].toFixed(3) : ""));
			trElem.appendChild(createElement("td", j < data.fftAmplitude.length ? data.fftAmplitude[j].toFixed(3) : ""));
			trElem.appendChild(createElement("td", j < data.fftAmplitude.length ? j.toString() : ""));
			trElem.appendChild(createElement("td", i.toString()));
			trElem.appendChild(createElement("td", data.delta.toFixed(3)));
			trElem.appendChild(createElement("td", data.theta.toFixed(3)));
			trElem.appendChild(createElement("td", data.alpha.toFixed(3)));
			trElem.appendChild(createElement("td", data.beta .toFixed(3)));
			trElem.appendChild(createElement("td", data.gamma.toFixed(3)));
			tbodyElem.appendChild(trElem);
		}
	});
	
	var p = createElement("p", "Numbers:");
	resultsElem.appendChild(p);
	resultsElem.appendChild(tableElem);
}


/*---- Low-level utility functions ----*/

function sumAmplitudesEnergy(amplitudes) {
	var sum = 0;
	amplitudes.forEach(function(x) {
		sum += x * x;
	});
	return Math.sqrt(sum);
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


// Polyfill for environments with missing features
if (!("hypot" in Math)) {
	Math.hypot = function(x, y) {
		return Math.sqrt(x * x + y * y);
	};
}
