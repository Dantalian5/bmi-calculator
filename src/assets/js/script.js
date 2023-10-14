"use strict";
const bmiCalculator = document.getElementById("js-bmiCalculator"); // The BMI calculator itself.
const inputMetric = document.querySelectorAll(".js-metricInput"); // metric system selector input
const bmiDataHeight = document.getElementById("js-bmiDataHeight"); // height cm input.
const bmiDataHeightIn = document.getElementById("js-bmiDataHeightIn"); // height inches input.
const bmiDataWeight = document.getElementById("js-bmiDataWeight"); // weight kg input.
const bmiDataWeightLbs = document.getElementById("js-bmiDataWeightLbs"); // weight lbs input.
let metricState = true; // metric system state - default true on metric.
const inputData = document.querySelectorAll(".js-inputData"); // input data
const bmiResult = document.getElementById("js-bmiResult"); //html output

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
function bmiOutput(res) {
	let result;
	let height1 = Array.from(inputData).filter((item) => {
		return item.dataset.type === "height" && item.dataset.order === "1";
	})[0].value;
	let weight1 = Array.from(inputData).filter((item) => {
		return item.dataset.type === "weight" && item.dataset.order === "1";
	})[0].value;
	if (height1 == "") {
		height1 = 0;
	}
	if (weight1 == "") {
		weight1 = 0;
	}
	result = weight1 / (height1 * 0.01) ** 2;
	console.log(result);
	bmiResult.value = result.toFixed(1);
}

const metricSystem = document
	.querySelectorAll("input[name=js-metric_system]")
	.forEach((item) => {
		item.addEventListener("change", (event) => {
			if (item.value == "metric") {
				metricStateSelection(true);
				toggleMetricUnit(true);
			} else if (item.value == "imperial") {
				metricStateSelection(false);
				toggleMetricUnit(false);
			}
		});
	});

inputData.forEach((inputItem) => {
	inputItem.addEventListener("input", (event) => {
		if (inputItem.value != 0) {
			bmiOutput(1);
		} else {
			bmiOutput(3);
		}
	});
});
