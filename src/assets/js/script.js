"use strict";
const bmiCalculator = document.getElementById("js-bmiCalculator"); // The BMI calculator itself.
const inputMetric = document.querySelectorAll(".js-metricInput"); // metric system selector input
const bmiDataHeight = document.getElementById("js-bmiDataHeight"); // height cm input.
const bmiDataHeightIn = document.getElementById("js-bmiDataHeightIn"); // height inches input.
const bmiDataWeight = document.getElementById("js-bmiDataWeight"); // weight kg input.
const bmiDataWeightLbs = document.getElementById("js-bmiDataWeightLbs"); // weight lbs input.
let metricState = true; // metric system state - default true on metric.

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
