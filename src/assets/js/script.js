"use sctrict";
const inputMetric = document.querySelectorAll(".js-metricInput");
const metricSystem = document
	.querySelectorAll("input[name=js-metric_system]")
	.forEach((item) => {
		item.addEventListener("click", (event) => {
			if (item.value == "metric") {
				inputMetric.forEach((item) => {
					item.classList.add("js-metric");
					item.classList.remove("js-imperial");
				});
			} else if (item.value == "imperial") {
				inputMetric.forEach((item) => {
					item.classList.remove("js-metric");
					item.classList.add("js-imperial");
				});
			}
		});
	});
