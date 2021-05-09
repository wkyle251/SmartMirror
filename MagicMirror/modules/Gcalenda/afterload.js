function loadcalendar() {
	this.mySpecialProperty = "So much wow!";
	var requestCal = new requestData("calendar-event");

	requestCal.getData().then((res) => {
		if (res.success == true) {
			let today = store.get("setID");
			let data = res.data;
			let myevent = data.events;
			let holiday = data.holiday;
			document.querySelectorAll(".calendar_holiday,.holiday_name,.calendar_activity,.activity_name,.todayAct,.todayholiday").forEach((e) => e.parentNode.removeChild(e));

			//////calculate date
			var dat = new Date();
			var thismonth = dat.getMonth();
			var thisyear = dat.getFullYear();
			//////////////////////

			var newtoday = dat.getDate();
			parsedate = dateadd0(parseInt(thismonth) + 1);
			let setID = "calendar" + thisyear + parsedate + dateadd0(newtoday);
			if (today != setID) {
				store.set("setID", setID);
				today = setID;
				document.querySelector(".Datetoday").className = "day";
				document.querySelector("#" + setID).className = "Datetoday";
			}

			holiday.forEach((e) => {
				let activity = document.createElement("div");
				let summary = document.createElement("div");

				activity.setAttribute("class", "calendar_holiday");
				summary.setAttribute("class", "holiday_name");

				summary.innerText = e.summary;

				activity.appendChild(summary);
				try {
					var date = "#calendar" + e.start.date.split("-").join("");
					try {
						document.querySelector(date).appendChild(activity);
					} catch (err) {}
				} catch (err) {
					let tempdate = "";
					for (i = 0; i < 10; i++) {
						tempdate += e.start.dateTime[i];
					}
					var date = "#calendar" + tempdate.split("-").join("");
					try {
						document.querySelector(date).appendChild(activity);
					} catch (err) {}
				}
				if ("#" + today == date) {
					let reminder = document.querySelector("#reminderdom");

					let todayHol = document.createElement("div");
					todayHol.setAttribute("class", "todayholiday");
					todayHol.innerText = e.summary + "<div style='display:inline;color:transparent'>tr</div>";
					reminder.appendChild(todayHol);
				}
			});

			myevent.forEach((e) => {
				let activity = document.createElement("div");
				let summary = document.createElement("div");

				activity.setAttribute("class", "calendar_activity");
				summary.setAttribute("class", "activity_name");

				summary.innerText = e.summary;

				activity.appendChild(summary);
				try {
					var date = "#calendar" + e.start.date.split("-").join("");
				} catch (err) {
					let tempdate = "";
					for (i = 0; i < 10; i++) {
						tempdate += e.start.dateTime[i];
					}
					var date = "#calendar" + tempdate.split("-").join("");
				}
				try {
					document.querySelector(date).appendChild(activity);
				} catch (err) {}
				// append activity to reminder
				if ("#" + today == date) {
					let reminder = document.querySelector("#reminderdom");

					let todayAct = document.createElement("div");
					todayAct.setAttribute("class", "todayAct");
					todayAct.innerHTML = e.summary + "<div style='display:inline;color:transparent'>tr</div>";
					reminder.appendChild(todayAct);
				}
			});
		} else {
			console.log("Get Icalendar error");
		}
		document.querySelector("#module_4_weatherforecast > header").style = "isplay: block;width: 260px;float: right;";
		console.log("result calendar: ", res);
	});

	setInterval((e) => {
		requestCal.getData().then((res) => {
			if (res.success == true) {
				let today = store.get("setID");
				let data = res.data;
				let myevent = data.events;
				let holiday = data.holiday;
				document.querySelectorAll(".calendar_holiday,.holiday_name,.calendar_activity,.activity_name,.todayAct,.todayholiday").forEach((e) => e.parentNode.removeChild(e));

				//////calculate date
				var dat = new Date();
				var thismonth = dat.getMonth();
				var thisyear = dat.getFullYear();
				//////////////////////

				var newtoday = dat.getDate();
				parsedate = dateadd0(parseInt(thismonth) + 1);
				let setID = "calendar" + thisyear + parsedate + dateadd0(newtoday);
				if (today != setID) {
					store.set("setID", setID);
					today = setID;
					document.querySelector(".Datetoday").className = "day";
					document.querySelector("#" + setID).className = "Datetoday";
				}

				holiday.forEach((e) => {
					let activity = document.createElement("div");
					let summary = document.createElement("div");

					activity.setAttribute("class", "calendar_holiday");
					summary.setAttribute("class", "holiday_name");

					summary.innerText = e.summary;

					activity.appendChild(summary);
					try {
						var date = "#calendar" + e.start.date.split("-").join("");
						try {
							document.querySelector(date).appendChild(activity);
						} catch (err) {}
					} catch (err) {
						let tempdate = "";
						for (i = 0; i < 10; i++) {
							tempdate += e.start.dateTime[i];
						}
						var date = "#calendar" + tempdate.split("-").join("");
						try {
							document.querySelector(date).appendChild(activity);
						} catch (err) {}
					}
					if ("#" + today == date) {
						let reminder = document.querySelector("#reminderdom");

						let todayHol = document.createElement("div");
						todayHol.setAttribute("class", "todayholiday");
						todayHol.innerHTML = e.summary + "<div style='display:inline;color:transparent'>tr</div>";
						reminder.appendChild(todayHol);
					}
				});

				myevent.forEach((e) => {
					let activity = document.createElement("div");
					let summary = document.createElement("div");

					activity.setAttribute("class", "calendar_activity");
					summary.setAttribute("class", "activity_name");

					summary.innerText = e.summary;

					activity.appendChild(summary);
					try {
						var date = "#calendar" + e.start.date.split("-").join("");
					} catch (err) {
						let tempdate = "";
						for (i = 0; i < 10; i++) {
							tempdate += e.start.dateTime[i];
						}
						var date = "#calendar" + tempdate.split("-").join("");
					}
					try {
						document.querySelector(date).appendChild(activity);
					} catch (err) {}
					// append activity to reminder
					if ("#" + today == date) {
						let reminder = document.querySelector("#reminderdom");

						let todayAct = document.createElement("div");
						todayAct.setAttribute("class", "todayAct");
						todayAct.innerHTML = e.summary + "<div style='display:inline;color:transparent'>tr</div>";
						reminder.appendChild(todayAct);
					}
				});
			} else {
				console.log("Get Icalendar error");
			}
			console.log("result calendar: ", res);
		});
	}, 8000);
}

function dateadd0(date) {
	let backdata;
	date = date.toString();
	if (date.length == 1) {
		backdata = "0" + date;
	} else {
		backdata = date;
	}
	return backdata;
}
