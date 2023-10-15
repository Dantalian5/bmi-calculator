"use strict";
const bmiCalculator = document.getElementById("js-bmiCalculator"); // The BMI calculator itself.
const inputMetric = document.querySelectorAll(".js-metricInput"); // metric system selector input
let metricState = true; // metric system state - default true on metric.
const inputData = document.querySelectorAll(".js-inputData"); // input data
const bmiResult = document.getElementById("js-bmiResult"); //html output
let height = 0;
let weight = 0;

function metricStateSelection(state) {
	metricState = state;
	if (!state) {
		bmiCalculator.classList.add("js--imperial");
	} else {
		bmiCalculator.classList.remove("js--imperial");
	}
}
function toggleMetricUnit(state) {
	if (state) {
		document.getElementById("js-heightLabel").innerText = "cm";
		document.getElementById("js-weightLabel").innerText = "kg";
	} else {
		document.getElementById("js-heightLabel").innerText = "ft";
		document.getElementById("js-weightLabel").innerText = "st";
	}
}
function updateData(state) {
	if (!state) {
		if (document.getElementById("js-bmiDataHeight").value > 0) {
			document.getElementById("js-bmiDataHeightIn").value = (
				(+document.getElementById("js-bmiDataHeight").value / 2.54) %
				12
			).toFixed(1);
			document.getElementById("js-bmiDataHeight").value = Math.floor(
				+document.getElementById("js-bmiDataHeight").value / 2.54 / 12
			);
		}
		if (document.getElementById("js-bmiDataWeight").value > 0) {
			document.getElementById("js-bmiDataWeightLbs").value = (
				(+document.getElementById("js-bmiDataWeight").value * 2.205) %
				14
			).toFixed(1);
			document.getElementById("js-bmiDataWeight").value = Math.floor(
				(+document.getElementById("js-bmiDataWeight").value * 2.205) / 14
			);
		}
		//document.getElementById("js-bmiDataWeight").value = "";
	} else {
		if (
			document.getElementById("js-bmiDataHeight").value > 0 ||
			document.getElementById("js-bmiDataHeightIn").value > 0
		) {
			document.getElementById("js-bmiDataHeight").value = (
				(+document.getElementById("js-bmiDataHeight").value * 12 +
					+document.getElementById("js-bmiDataHeightIn").value) *
				2.54
			).toFixed(1);
		}
		document.getElementById("js-bmiDataHeightIn").value = "";
		if (
			document.getElementById("js-bmiDataWeight").value > 0 ||
			document.getElementById("js-bmiDataWeightLbs").value > 0
		) {
			document.getElementById("js-bmiDataWeight").value = (
				(+document.getElementById("js-bmiDataWeight").value * 14 +
					+document.getElementById("js-bmiDataWeightLbs").value) /
				2.205
			).toFixed(1);
		}
		document.getElementById("js-bmiDataWeightLbs").value = "";
	}
	bmiOutput();
}

function bmiOutput() {
	let result = 0;
	let cont = 1;

	height = +document.getElementById("js-bmiDataHeight").value;
	weight = +document.getElementById("js-bmiDataWeight").value;
	if (!metricState) {
		height = height * 12 + +document.getElementById("js-bmiDataHeightIn").value;
		weight =
			weight * 14 + +document.getElementById("js-bmiDataWeightLbs").value;
		cont = 703;
	} else {
		height = height * 0.01;
	}
	result = (weight / height ** 2) * cont;
	if (isNaN(result) || !isFinite(result)) {
		bmiCalculator.classList.remove("js-bmiActive");
	} else {
		bmiCalculator.classList.add("js-bmiActive");
	}

	if (result > 100) {
		bmiResult.value = "100+";
	} else {
		bmiResult.value = result.toFixed(1);
	}
	updateWeightType(bmiResult.value);
	updateWeightIdeal(height, cont);
}

function updateWeightType(data) {
	if (data < 18.5) {
		document.getElementById("js-weightType").innerText = "underweight";
	} else if (data >= 18.5 && data < 25) {
		document.getElementById("js-weightType").innerText = "a healthy weight";
	} else if (data >= 25 && data < 30) {
		document.getElementById("js-weightType").innerText = "overweight";
	} else if (data >= 30) {
		document.getElementById("js-weightType").innerText = "obese";
	}
}
function updateWeightIdeal(dataHeight, dataCont) {
	let minWeight;
	let maxWeight;
	minWeight = (18.5 / dataCont) * dataHeight ** 2;
	maxWeight = (24.9 / dataCont) * dataHeight ** 2;
	if (metricState) {
		document.getElementById("js-weightIdeal").innerText =
			minWeight.toFixed(1) + "kgs" + " - " + maxWeight.toFixed(1) + "kgs";
	} else {
		document.getElementById("js-weightIdeal").innerText =
			Math.floor(minWeight / 14) +
			"st" +
			" " +
			Math.floor(minWeight % 14) +
			"lbs" +
			" - " +
			Math.floor(maxWeight / 14) +
			"st" +
			" " +
			Math.floor(maxWeight % 14) +
			"lbs";
	}
}

const metricSystem = document
	.querySelectorAll("input[name=js-metric_system]")
	.forEach((item) => {
		item.addEventListener("change", (event) => {
			if (item.value == "metric") {
				metricStateSelection(true);
				toggleMetricUnit(true);
				updateData(true);
			} else if (item.value == "imperial") {
				metricStateSelection(false);
				toggleMetricUnit(false);
				updateData(false);
			}
		});
	});

inputData.forEach((inputItem) => {
	inputItem.addEventListener("input", (event) => {
		bmiOutput();
	});
});
