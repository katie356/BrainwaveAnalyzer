/* 
 * Brainwave Analyzer
 * https://github.com/katie356/BrainwaveAnalyzer
 * Open source under the MIT License
 */

"use strict";


/*---- Application initialization ----*/

function initialize() {
	var bandConfigContainerElem = document.querySelector("#band-config tbody");
	
	function renumberBandRows() {
		var elems = bandConfigContainerElem.querySelectorAll("td:nth-child(1)");
		for (var i = 0; i < elems.length; i++)
			setElemText(elems[i], (i + 1).toString());
	}
	
	function addBandRow(name, start, end, color) {
		// Row number
		var trElem = createElement("tr", createElement("td"));
		// Band name
		var inputElem = createElement("input");
		inputElem.type = "text";
		inputElem.value = name;
		trElem.appendChild(createElement("td", inputElem));
		// Minimum frequency
		inputElem = createElement("input");
		inputElem.type = "number";
		inputElem.min = "1";
		inputElem.max = (SAMPLES_PER_SECOND / 2).toString();
		inputElem.step = "1";
		inputElem.value = start;
		trElem.appendChild(createElement("td", inputElem));
		// Maximum frequency
		inputElem = inputElem.cloneNode(true);
		inputElem.value = end;
		trElem.appendChild(createElement("td", inputElem));
		// Graph color
		var inputElem = createElement("input");
		inputElem.type = "text";
		inputElem.value = color;
		trElem.appendChild(createElement("td", inputElem));
		// Delete button
		inputElem = createElement("input");
		inputElem.type = "button";
		inputElem.value = "(\u2212)";
		inputElem.onclick = function() {
			trElem.parentNode.removeChild(trElem);
			renumberBandRows();
		};
		trElem.appendChild(createElement("td", inputElem));
		// Miscellaneous
		bandConfigContainerElem.appendChild(trElem);
		renumberBandRows();
	}
	
	var DEFAULT_BANDS = [
		["Delta",  1,   3, "#0000A0"],
		["Theta",  4,   7, "#00A000"],
		["Alpha",  8,  13, "#D0D000"],
		["Beta" , 14,  31, "#FFA000"],
		["Gamma", 32, 256, "#FF4040"],
	];
	DEFAULT_BANDS.forEach(function(band) {
		addBandRow(band[0], band[1].toString(), band[2].toString(), band[3]);
	});
	
	var bottomButtonElems = document.querySelectorAll("#band-config tfoot input[type=button]");
	bottomButtonElems[0].onclick = function() {  // Add band button
		addBandRow("", "", "", "#B0B0B0");
	};
	
	// Import/export button
	bottomButtonElems[1].onclick = function() {
		// First export the data
		var data = [];
		var inputElems = bandConfigContainerElem.querySelectorAll("input");
		for (var i = 0; i < inputElems.length; i += 5) {
			data.push([
				inputElems[i + 0].value,  // Band name
				inputElems[i + 1].value,  // Start freq
				inputElems[i + 2].value,  // End freq
				inputElems[i + 3].value,  // Graph color
			]);
		}
		var s = prompt("Import/export the frequency band configuration:", JSON.stringify(data));
		
		// Then try to import the data
		if (s == null)
			return;
		try {
			clearChildren(bandConfigContainerElem);
			data = JSON.parse(s);
			if (!Array.isArray(data))
				throw "Expected an array";
			data.forEach(function(row) {
				if (!Array.isArray(row) || row.length != 4)
					throw "Expected a 4-tuple";
				addBandRow(row[0], row[1], row[2], row[3]);
			});
		} catch (e) {
			clearChildren(bandConfigContainerElem);
			alert("Import failed: Invalid data format");
		}
	};
}



/*---- Top-level application functions and state ----*/

var analysisResults = null;  // Set by doAnalyze(), cleared by doClear()


// Clears some or all of the HTML elements and JavaScript state variables, depending on the level argument (1 to 3).
// The clearing options are cumulative - for example clearing level 2 implies also clearing level 1.
function doClear(level) {
	if (level == undefined)
		level = 3;
	
	// Helper function to cut down on repetition.
	function destroyChart(chart) {
		if (chart != null)
			chart.destroy();
		return null;
	}
	
	switch (level) {  // Uses fall-through
		case 3:
			document.getElementById("input-file").value = "";
		case 2:
			analysisResults = null;
			document.getElementById("results").style.display = "none";
			perSecondBandsChart   = destroyChart(perSecondBandsChart);
			perMinuteBandsChart   = destroyChart(perMinuteBandsChart);
			medianAmplitudesChart = destroyChart(medianAmplitudesChart);
			clearChildren(document.querySelector("#power-distribution tbody"));
			clearChildren("file-name-display");
			clearChildren("time-offset");
			var thElems = document.querySelectorAll("#numbers thead th");
			for (var i = 7; i < thElems.length; i++)
				thElems[i].parentNode.removeChild(thElems[i]);
		case 1:
			brainwaveChart = destroyChart(brainwaveChart);
			frequencySpectrumChart = destroyChart(frequencySpectrumChart);
			clearChildren(document.querySelector("#numbers tbody"));
			break;
		default:
			throw "Illegal argument";
	}
}


// The main action handler that drives everything:
// - Reads the text file
// - Performs analysis
// - Stores the results
// - Initializes UI elements
// - Creates the graphs
function doAnalyze() {
	// Parse the frequency band configuration form inputs
	// bandConfig is a list of objects with specific properties,
	// e.g.: [{name:"Delta",start:1,end:3,color:"#0000A0"}, {name:"Theta",...}, ...]
	var bandConfig = [];
	var bandConfigInputElems = document.querySelectorAll("#band-config tbody input");
	for (var i = 0; i < bandConfigInputElems.length; i += 5) {
		bandConfig.push({
			name : bandConfigInputElems[i + 0].value,
			start: parseInt(bandConfigInputElems[i + 1].value, 10),
			end  : parseInt(bandConfigInputElems[i + 2].value, 10),
			color: bandConfigInputElems[i + 3].value,
		});
	}
	
	// Handle the input file
	var inputFileElem = document.getElementById("input-file");
	if (inputFileElem.files.length != 1)  // No file or multiple files selected
		return;
	var file = inputFileElem.files[0];
	var reader = new FileReader();
	reader.onload = function() {
		parseFileTextAndAnalyze(file.name, reader.result, bandConfig);
	};
	reader.readAsText(file);
}


// Continuation of doAnalyze() after the file data is available.
function parseFileTextAndAnalyze(filename, text, bandConfig) {
	// Preprocessing and column detection
	text = text.replace(/\n+$/g, "");  // Strip trailing newlines
	var lines = text.split("\n");
	
	var samples = [];
	var skippedRows = 0;
	var invalidValues = 0;
	
	if (lines[0].indexOf(";") != -1) {  // OpenVibe format
		var header = lines[0].split(";");
		var electrodeColIndex = header.indexOf("Electrode");
		if (header.indexOf("Electrode", electrodeColIndex + 1) != -1) {
			alert('Error: Duplicate column "Electrode"');
			return;
		}
		
		// Parse each line as one electrode sample
		for (var i = 1; i < lines.length; i++) {
			var columns = lines[i].split(";");
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
		
	} else {  // Mindwave format
		var header = lines[0].split(/,\s*/);
		var rawColIndex = header.indexOf("Raw");
		if (header.indexOf("Raw", rawColIndex + 1) != -1) {
			alert('Error: Duplicate column "Raw"');
			return;
		}
		
		// Parse each line as one electrode sample
		for (var i = 1; i < lines.length; i++) {
			var columns = lines[i].split(",");
			if (columns.length != header.length) {
				if (1 < i && i < lines.length - 1) {
					// Only increment for invalid middle rows, because the first
					// and last data rows being invalid is a normal occurrence
					skippedRows++;
				}
			} else {
				var strValue = columns[rawColIndex];
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
	}
	
	if (skippedRows > 0)
		alert("Warning: Skipped " + skippedRows + " rows in the input data due to invalid format");
	if (invalidValues > 0)
		alert("Warning: Replaced " + invalidValues + " invalid electrode values in the input data");
	
	// Continue with the rest of the main program logic
	doClear(2);
	analysisResults = computeAndAnalyze(filename, samples, bandConfig);
	displayResults();
}


// Steps back the per-second display to the previous second of data, if possible.
function doDisplayPreviousSecond() {
	var selectElem = document.getElementById("time-offset");
	if (analysisResults == null || selectElem.selectedIndex - 1 < 0)
		return;
	selectElem.selectedIndex--;
	displayAnalysis(selectElem.selectedIndex);
}


// Advances the per-second display to the next second of data, if possible.
function doDisplayNextSecond() {
	var selectElem = document.getElementById("time-offset");
	if (analysisResults == null || selectElem.selectedIndex + 1 >= selectElem.length)
		return;
	selectElem.selectedIndex++;
	displayAnalysis(selectElem.selectedIndex);
}


// Takes the current analysis results, creates CSV data, and initiates a file download.
function downloadBandsCsv() {
	if (analysisResults == null)
		return;
	var s = "Time,";
	s += analysisResults.overall.bandConfig.map(function(band) { return band.name; }).join(",");
	s += "\n";
	analysisResults.perSecond.forEach(function(data, i) {
		s += i;
		data.bandAmplitudes.forEach(function(val) {
			s += "," + val.toFixed(3);
		});
		s += "\n";
	});
	
	var anchor = document.getElementById("downloader");
	anchor.href = "data:text/plain;charset=utf-8," + encodeURIComponent(s);
	anchor.download = document.getElementById("export-bands-file-name").value;
	anchor.click();
}


// Takes the current analysis results, creates CSV data, and initiates a file download.
function downloadNumbersCsv() {
	if (analysisResults == null)
		return;
	var s = "Time,Electrode,FFT,FFTimag,Amplitude,FreqIndex,Seconds,";
	s += analysisResults.overall.bandConfig.map(function(band) { return band.name; }).join(",");
	s += "\n";
	analysisResults.perSecond.forEach(function(data, timeOffset) {
		for (var i = 0; i < SAMPLES_PER_SECOND; i++) {
			s += (timeOffset + i / SAMPLES_PER_SECOND).toFixed(6) + ",";
			s += data.electrode[i] + ",";
			s += (i < data.fftAmplitude.length ? data.fftReal[i].toFixed(3) : "") + ",";
			s += (i < data.fftAmplitude.length ? data.fftImag[i].toFixed(3) : "") + ",";
			s += (i < data.fftAmplitude.length ? data.fftAmplitude[i].toFixed(3) : "") + ",";
			s += (i < data.fftAmplitude.length ? i.toString() : "") + ",";
			s += timeOffset;
			data.bandAmplitudes.forEach(function(val) {
				s += "," + val.toFixed(3);
			});
			s += "\n";
		}
	});
	
	var anchor = document.getElementById("downloader");
	anchor.href = "data:text/plain;charset=utf-8," + encodeURIComponent(s);
	anchor.download = document.getElementById("export-numbers-file-name").value;
	anchor.click();
}


function doChangePerMinuteBandsYScaleTop() {
	var value = parseFloat(document.getElementById("per-minute-bands-top").value);
	if (isNaN(value) || value <= 0)
		return;
	perMinuteBandsChart  .options.scales.yAxes[0].ticks.max = value;
	medianAmplitudesChart.options.scales.yAxes[0].ticks.max = value;
	perMinuteBandsChart  .update(400, false);
	medianAmplitudesChart.update(400, false);
}



/*---- Middle-level application functions and state ----*/

var perSecondBandsChart = null;
var perMinuteBandsChart = null;
var medianAmplitudesChart = null;
var brainwaveChart = null;
var frequencySpectrumChart = null;


var SAMPLES_PER_SECOND = 512;

// Returns an array of dictionaries, one per second.
function computeAndAnalyze(filename, samples, bandConfig) {
	// Note: All helper functions contained here are pure. They take arguments and return new values.
	// They do not have side effects, and do not read or write variables from the enclosing scope.
	
	function computePerSecond(bandConfig, samples) {
		var result = [];
		var numSeconds = Math.floor(samples.length / SAMPLES_PER_SECOND);
		for (var i = 0; i < numSeconds; i++) {
			var startIndex = (i + 0) * SAMPLES_PER_SECOND;  // Inclusive
			var endIndex   = (i + 1) * SAMPLES_PER_SECOND;  // Exclusive
			var block = samples.slice(startIndex, endIndex);
			
			var real = block.slice();  // Clone
			var imag = real.map(function() { return 0; });  // Same length, but all zeros
			fastFourierTransform(real, imag);
			real[0] = 0;  // Cancel the DC offset coefficient
			
			var amplitude = [];
			for (var j = 0; j <= real.length / 2; j++)
				amplitude.push(Math.hypot(real[j], imag[j]));
			
			var bandAmplitudes = [];
			bandConfig.forEach(function(band) {
				bandAmplitudes.push(sumAmplitudesEnergy(amplitude.slice(band.start, band.end + 1)));
			});
			
			result.push({
				electrode: block,  // Array of SAMPLES_PER_SECOND numbers
				fftReal: real,     // Array of SAMPLES_PER_SECOND numbers
				fftImag: imag,     // Array of SAMPLES_PER_SECOND numbers
				fftAmplitude: amplitude,  // Array of (SAMPLES_PER_SECOND/2)+1 numbers
				bandAmplitudes: bandAmplitudes,  // Array of bandConfig.length numbers
			});
		}
		return result;
	}
	
	function computePerMinute(bandConfig, perSecond) {
		var result = [];
		for (var i = 0; i < perSecond.length; i += 60) {
			var subdata = perSecond.slice(i, i + 60);
			var bandMedians = [];
			for (var j = 0; j < bandConfig.length; j++)
				bandMedians.push(getMedian(subdata.map(function(data) { return data.bandAmplitudes[j]; })));
			result.push({
				bandMedians: bandMedians,  // Array of bandConfig.length numbers
			});
		}
		return result;
	}
	
	function computeOverall(filename, bandConfig, perSecond) {
		var bandMedians = [];
		for (var i = 0; i < bandConfig.length; i++)
			bandMedians.push(getMedian(perSecond.map(function(data) { return data.bandAmplitudes[i]; })));
		return {
			filename: filename,  // String value
			bandConfig: bandConfig,  // Array of objects
			bandMedians: bandMedians,  // Array of bandConfig.length numbers
		};
	}
	
	var result = {};
	result.perSecond = computePerSecond(bandConfig, samples);
	result.perMinute = computePerMinute(bandConfig, result.perSecond);
	result.overall = computeOverall(filename, bandConfig, result.perSecond);
	return result;
}


// Based on the value of 'analysisResults', this function builds and shows the
// overall brainwave graph, and shows the per-second data for the 0th second.
function displayResults() {
	// Create <option>s for the <select> element
	var selectElem = document.getElementById("time-offset");
	analysisResults.perSecond.forEach(function(_, i) {
		var optionElem = createElement("option", i.toString());
		optionElem.value = i.toString();
		selectElem.appendChild(optionElem);
	});
	selectElem.onchange = function() {
		displayAnalysis(parseInt(this.value, 10));
	};
	
	// Display the per-second data
	if (analysisResults.perSecond.length >= 1)
		displayAnalysis(0);
	
	// Build the data for the brainwave power graph
	var labels = [];
	var datasets = analysisResults.overall.bandConfig.map(function(band) {
		return {
			label: band.name,
			borderColor: band.color,
			pointBackgroundColor: band.color,
			backgroundColor: band.color,
			data: [],
			fill: false,
		};
	});
	analysisResults.perSecond.forEach(function(data, i) {
		labels.push(i.toString());
		data.bandAmplitudes.forEach(function(val, j) {
			datasets[j].data.push(val);
		});
	});
	
	// Create the overall brainwave power graph
	perSecondBandsChart = new Chart(document.getElementById("per-second-bands"), {
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
	
	labels = [];
	datasets = analysisResults.overall.bandConfig.map(function(band) {
		return {
			label: band.name,
			borderColor: band.color,
			pointBackgroundColor: band.color,
			backgroundColor: band.color,
			data: [],
			fill: false,
		};
	});
	analysisResults.perMinute.forEach(function(data, i) {
		labels.push(i.toString());
		data.bandMedians.forEach(function(val, j) {
			datasets[j].data.push(val);
		});
	});
	perMinuteBandsChart = new Chart(document.getElementById("per-minute-bands"), {
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
						labelString: "Time (min)",
					},
				}],
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Amplitude",
					},
					ticks: {
						max: parseFloat(document.getElementById("per-minute-bands-top").value),
						beginAtZero: true,
					},
				}],
			},
		},
	});
	
	datasets = [{
		label: "Amplitude",
		data: analysisResults.overall.bandMedians,
		backgroundColor: analysisResults.overall.bandConfig.map(function(band) { return band.color; }),
		borderWidth: 0,
	}];
	medianAmplitudesChart = new Chart(document.getElementById("median-amplitudes"), {
		type: "bar",
		data: {
			labels: analysisResults.overall.bandConfig.map(function(band) { return band.name; }),
			datasets: datasets,
		},
		options: {
			responsive: false,
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Band name",
					},
				}],
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Amplitude",
					},
					ticks: {
						max: parseFloat(document.getElementById("per-minute-bands-top").value),
						beginAtZero: true,
					},
				}],
			},
		},
	});
	
	// Display median power per band
	analysisResults.overall.bandConfig.forEach(function(band, index) {
		var trElem = createElement("tr", createElement("td", band.name));
		trElem.appendChild(createElement("td", analysisResults.overall.bandMedians[index].toFixed(0)));
		document.querySelector("#power-distribution tbody").appendChild(trElem);
	});
	
	setElemText("file-name-display", analysisResults.overall.filename);
	
	analysisResults.overall.bandConfig.forEach(function(band) {
		document.querySelector("#numbers thead tr").appendChild(
			createElement("th", band.name));
	});
	
	document.getElementById("results").style.removeProperty("display");
}


// Based on the value of 'analysisResults', this function shows the per-second data for the given second.
// timeOffset is an integer in the range [0, analysisResults.perSecond.length).
function displayAnalysis(timeOffset) {
	doClear(1);
	var data = analysisResults.perSecond[timeOffset];
	
	// Create brainwave time series chart
	var color = "#B00000";
	brainwaveChart = new Chart(document.getElementById("brainwave"), {
		type: "line",
		data: {
			labels: data.electrode.map(function() { return ""; }),
			datasets: [{
				label: "Electrode",
				data: data.electrode.slice(),
				borderColor: color,
				backgroundColor: color,
				fill: false,
				pointRadius: 0,
			}],
		},
		options: {
			animation: {
				duration: 0,
			},
			responsive: false,
			showLines: true,
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Time",
					},
				}],
				yAxes: [{
					animate: false,
					scaleLabel: {
						display: true,
						labelString: "Value",
					},
					ticks: {
						beginAtZero: false,
					},
				}],
			},
		},
	});
	
	// Create frequency spectrum chart
	var color = "#4000A0";
	frequencySpectrumChart = new Chart(document.getElementById("frequency-spectrum"), {
		type: "bar",
		data: {
			labels: data.fftAmplitude.map(function(_, i) { return i + " Hz"; }),
			datasets: [{
				label: "Amplitude",
				data: data.fftAmplitude.slice(),
				borderColor: color,
				backgroundColor: color,
				borderWidth: 0,
			}],
		},
		options: {
			animation: {
				duration: 0,
			},
			responsive: false,
			categoryPercentage: 1.0,
			barPercentage: 1.0,
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Frequency",
					},
				}],
				yAxes: [{
					animate: false,
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
	
	// Create table of numbers
	var tbodyElem = document.querySelector("#numbers tbody");
	for (var i = 0; i < SAMPLES_PER_SECOND; i++) {
		var cellTexts = [
			(timeOffset + i / SAMPLES_PER_SECOND).toFixed(3),
			data.electrode[i].toString(),
			i < data.fftAmplitude.length ? data.fftReal[i].toFixed(3) : "",
			i < data.fftAmplitude.length ? data.fftImag[i].toFixed(3) : "",
			i < data.fftAmplitude.length ? data.fftAmplitude[i].toFixed(3) : "",
			i < data.fftAmplitude.length ? i.toString() : "",
			timeOffset.toString(),
		];
		data.bandAmplitudes.forEach(function(val) {
			cellTexts.push(val.toFixed(3));
		});
		
		var trElem = createElement("tr");
		cellTexts.forEach(function(text) {
			trElem.appendChild(createElement("td", text));
		});
		tbodyElem.appendChild(trElem);
	}
}



/*---- Low-level utility functions ----*/

// Returns sqrt(ampl[0]^2 + ampl[1]^2 + ... + ampl[n-1]^2).
function sumAmplitudesEnergy(amplitudes) {
	var sum = 0;
	amplitudes.forEach(function(x) {
		sum += x * x;
	});
	return Math.sqrt(sum);
}


// Returns the median of the given array of numbers. The array must have at least 1 element. Calling this
// function will permute the given array as a side effect; this works best for arrays that will be discarded.
function getMedian(arr) {
	arr.sort(function(x, y) { return x - y; });
	if (arr.length == 0)
		throw "Zero length";
	else if (arr.length % 2 == 1)
		return arr[(arr.length - 1) / 2];
	else
		return (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2;
}


// Returns a new HTML element with the given tag name, and option content (text string or child element).
function createElement(tagName, content) {
	var result = document.createElement(tagName);
	if (content != undefined) {
		if (typeof content == "string")
			content = document.createTextNode(content);
		result.appendChild(content);
	}
	return result;
}


// Sets the content of the given DOM element to the given text.
function setElemText(elemOrId, text) {
	if (typeof elemOrId == "string")
		elemOrId = document.getElementById(elemOrId);
	clearChildren(elemOrId);
	elemOrId.appendChild(document.createTextNode(text));
}


// Removes all the children of the given DOM element node or ID string.
function clearChildren(node) {
	if (typeof node == "string")
		node = document.getElementById(node);
	while (node.firstChild != null)
		node.removeChild(node.firstChild);
}


// Polyfill for environments with missing features
if (!("hypot" in Math)) {
	Math.hypot = function(x, y) {
		return Math.sqrt(x * x + y * y);
	};
}


initialize();



/*---- Fast Fourier transform library (stripped down) ----*/

/* 
 * Free FFT and convolution (JavaScript)
 * 
 * Copyright (c) 2016 Project Nayuki
 * https://www.nayuki.io/page/free-small-fft-in-multiple-languages
 * 
 * (MIT License)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */


// Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
// The vector's length must be a power of 2. Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
function fastFourierTransform(real, imag) {
    // Initialization
    if (real.length != imag.length)
        throw "Mismatched lengths";
    var n = real.length;
    if (n == 1)  // Trivial transform
        return;
    var levels = -1;
    for (var i = 0; i < 32; i++) {
        if (1 << i == n)
            levels = i;  // Equal to log2(n)
    }
    if (levels == -1)
        throw "Length is not a power of 2";
    var cosTable = new Array(n / 2);
    var sinTable = new Array(n / 2);
    for (var i = 0; i < n / 2; i++) {
        cosTable[i] = Math.cos(2 * Math.PI * i / n);
        sinTable[i] = Math.sin(2 * Math.PI * i / n);
    }
    
    // Bit-reversed addressing permutation
    for (var i = 0; i < n; i++) {
        var j = reverseBits(i, levels);
        if (j > i) {
            var temp = real[i];
            real[i] = real[j];
            real[j] = temp;
            temp = imag[i];
            imag[i] = imag[j];
            imag[j] = temp;
        }
    }
    
    // Cooley-Tukey decimation-in-time radix-2 FFT
    for (var size = 2; size <= n; size *= 2) {
        var halfsize = size / 2;
        var tablestep = n / size;
        for (var i = 0; i < n; i += size) {
            for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
                var tpre =  real[j+halfsize] * cosTable[k] + imag[j+halfsize] * sinTable[k];
                var tpim = -real[j+halfsize] * sinTable[k] + imag[j+halfsize] * cosTable[k];
                real[j + halfsize] = real[j] - tpre;
                imag[j + halfsize] = imag[j] - tpim;
                real[j] += tpre;
                imag[j] += tpim;
            }
        }
    }
    
    // Returns the integer whose value is the reverse of the lowest 'bits' bits of the integer 'x'.
    function reverseBits(x, bits) {
        var y = 0;
        for (var i = 0; i < bits; i++) {
            y = (y << 1) | (x & 1);
            x >>>= 1;
        }
        return y;
    }
}
