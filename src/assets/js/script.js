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
function bmiOutput() {
	let result = 0;
	let cont = 1;
	let height1 = Array.from(inputData).filter((item) => {
		return item.dataset.type === "height" && item.dataset.order === "1";
	})[0].value;
	height1 = height1 !== "" ? +height1 : 0;
	let weight1 = Array.from(inputData).filter((item) => {
		return item.dataset.type === "weight" && item.dataset.order === "1";
	})[0].value;
	weight1 = weight1 !== "" ? +weight1 : 0;
	if (!metricState) {
		let height2 = Array.from(inputData).filter((item) => {
			return item.dataset.type === "height" && item.dataset.order === "2";
		})[0].value;
		height2 = height2 !== "" ? +height2 : 0;
		let weight2 = Array.from(inputData).filter((item) => {
			return item.dataset.type === "weight" && item.dataset.order === "2";
		})[0].value;
		weight2 = weight2 !== "" ? +weight2 : 0;
		height1 = height1 * 12 + height2;
		weight1 = weight1 * 14 + weight2;
		cont = 703;
	}
	result = (weight1 / height1 ** 2) * cont;
	bmiResult.value = result.toFixed(1);
	if (isNaN(bmiResult.value) || !isFinite(bmiResult.value)) {
		bmiCalculator.classList.remove("js-bmiActive");
	} else {
		bmiCalculator.classList.add("js-bmiActive");
	}
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
			bmiOutput();
		} else {
			bmiOutput();
		}
	});
});
