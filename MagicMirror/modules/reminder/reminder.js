Module.register("reminder", {
	// Default module config.
	defaults: {},
	getStyles: function () {
		return [this.file("reminder.css")];
	},
	getDom: function () {
		var wrapper = document.createElement("div");

		var reminderdom = document.createElement("div");
		reminderdom.setAttribute("id", "reminderdom");

		//add weather remind
		var weather = document.createElement("div");
		weather.setAttribute("id", "weatherRemind");
		weather.innerHTML = this.checkweather();

		reminderdom.appendChild(weather);
		wrapper.appendChild(reminderdom);

		store.set("testjs", "print");
		// wrapper.innerHTML = this.teammate();
		return wrapper;
	},
	checkweather() {
		let weather = store.get("weatherAPI");
		switch (weather.weather[0].main) {
			case "Thunderstorm":
				return "Thunderstorm day. Stay at home is safe.";
			case "Drizzle":
				return "Drizzle day. Bring your umbrella.";
			case "Rain":
				return "Rainny day. Bring your umbrella.";
			case "Snow":
				return "Snow outside. So cold.";
			case "Fog":
				return "So wet! Becareful";
			case "Clear":
				return "Nice weather today!";
			case "Clouds":
				return "So cloudy.";
			default:
				return "Stay at home is better.It's " + weather.weather[0].description + " outside.";
		}
	}
});
