"use strict";


/*---- Top-level functions ----*/

var analysisResults;


function doClear(level) {
	if (level == undefined)
		level = 3;
	
	switch (level) {  // Uses fall-through
		case 3:
			var inputTextElem = document.getElementById("input-text");
			inputTextElem.value = "";
			inputTextElem.className = "";
			
		case 2:
			analysisResults = null;
			document.getElementById("results").style.display = "none";
			removeAllChildren(document.getElementById("time-offset"));
		
		case 1:
			removeAllChildren(document.getElementById("brainwave"));
			removeAllChildren(document.getElementById("frequency-spectrum"));
			removeAllChildren(document.getElementById("numbers-table"));
			break;
		
		default:
			throw "Assertion error";
	}
}


function doAnalyze() {
	var samples = readFormInput();
	if (samples == null)
		return;
	
	// Do the work after the CSS animation finishes
	setTimeout(function() {
		doClear(2);
		analysisResults = computeAndAnalyze(samples);
		displayResults();
	}, 250);
}


/*---- Middle-level application functions ----*/

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


function displayResults() {
	var selectElem = document.getElementById("time-offset");
	analysisResults.forEach(function(data, i) {
		var optionElem = createElement("option", i.toString());
		optionElem.value = i.toString();
		selectElem.appendChild(optionElem);
	});
	document.getElementById("results").style.display = "";
	
	selectElem.onchange = function() {
		displayAnalysis(parseInt(this.value, 10));
	};
	doClear(1);
	if (analysisResults.length >= 1)
		displayAnalysis(0);
	
	var labels = [];
	var dataSeriesConfig = [
		["Delta", "#0000A0"],
		["Theta", "#00A000"],
		["Alpha", "#D0D000"],
		["Beta" , "#FFA000"],
		["Gamma", "#FF4040"],
	];
	var datasets = dataSeriesConfig.map(function(tuple) {
		return {
			label: tuple[0],
			borderColor: tuple[1],
			pointBackgroundColor: tuple[1],
			backgroundColor: tuple[1],
			data: [],
			fill: false,
		};
	});
	analysisResults.forEach(function(data, i) {
		labels.push(i.toString());
		datasets[0].data.push(data.delta);
		datasets[1].data.push(data.theta);
		datasets[2].data.push(data.alpha);
		datasets[3].data.push(data.beta );
		datasets[4].data.push(data.gamma);
	});
	
	new Chart(document.getElementById("overall-bands"), {
		type: "line",
		data: {
			labels: labels,
			datasets: datasets,
		},
		options: {
			responsive: false,
			showLines: true,
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Time (s)",
					},
				}],
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Amplitude",
					},
					ticks: {
						beginAtZero: true,
					},
				}],
			},
		},
	});
}


function displayAnalysis(timeOffset) {
	doClear(1);
	var data = analysisResults[timeOffset];
	
	var graphElem = document.getElementById("brainwave");
	var minBlock = Math.min.apply(null, data.electrode);
	var maxBlock = Math.max.apply(null, data.electrode);
	for (var j = 0; j < data.electrode.length; j++) {
		var fullHeight = 4;
		var dotOffset = (maxBlock - data.electrode[j]) / (maxBlock - minBlock) * fullHeight;
		var dotElem = createElement("div");
		dotElem.style.top = "calc(" + dotOffset.toFixed(3) + "em - 1px)";
		dotElem.title = (timeOffset + j / SAMPLES_PER_SECOND).toFixed(3) + " s";
		graphElem.appendChild(dotElem);
	}
	
	var maxAmplitude = Math.max.apply(null, data.fftAmplitude);
	graphElem = document.getElementById("frequency-spectrum");
	for (var j = 0; j < data.fftAmplitude.length; j++) {
		var fullHeight = 10;
		var barHeight = data.fftAmplitude[j] / maxAmplitude * fullHeight;
		var barElem = createElement("div");
		barElem.style.height = barHeight.toFixed(3) + "em";
		barElem.title = j + " Hz";
		graphElem.appendChild(barElem);
	}
	
	var tbodyElem = document.getElementById("numbers-table");
	for (var j = 0; j < SAMPLES_PER_SECOND; j++) {
		var trElem = createElement("tr");
		trElem.appendChild(createElement("td", (timeOffset + j / SAMPLES_PER_SECOND).toFixed(3)));
		trElem.appendChild(createElement("td", data.electrode[j].toString()));
		trElem.appendChild(createElement("td", j < data.fftAmplitude.length ? data.fftReal[j].toFixed(3) : ""));
		trElem.appendChild(createElement("td", j < data.fftAmplitude.length ? data.fftImag[j].toFixed(3) : ""));
		trElem.appendChild(createElement("td", j < data.fftAmplitude.length ? data.fftAmplitude[j].toFixed(3) : ""));
		trElem.appendChild(createElement("td", j < data.fftAmplitude.length ? j.toString() : ""));
		trElem.appendChild(createElement("td", timeOffset.toString()));
		trElem.appendChild(createElement("td", data.delta.toFixed(3)));
		trElem.appendChild(createElement("td", data.theta.toFixed(3)));
		trElem.appendChild(createElement("td", data.alpha.toFixed(3)));
		trElem.appendChild(createElement("td", data.beta .toFixed(3)));
		trElem.appendChild(createElement("td", data.gamma.toFixed(3)));
		tbodyElem.appendChild(trElem);
	}
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
