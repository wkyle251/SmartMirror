Module.register("Gcalenda", {
	// Default module config.
	defaults: {},
	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		var mainbody = document.createElement("div");
		var parsedate;
		mainbody.setAttribute("id", "calendar");

		var sun = document.createElement("div");
		var mon = document.createElement("div");
		var tue = document.createElement("div");
		var wed = document.createElement("div");
		var thu = document.createElement("div");
		var fri = document.createElement("div");
		var sat = document.createElement("div");

		sun.setAttribute("class", "weekdays");
		mon.setAttribute("class", "weekdays");
		tue.setAttribute("class", "weekdays");
		wed.setAttribute("class", "weekdays");
		thu.setAttribute("class", "weekdays");
		fri.setAttribute("class", "weekdays");
		sat.setAttribute("class", "weekdays");

		sun.innerText = "Sunday";
		mon.innerText = "Monday";
		tue.innerText = "Tuesday";
		wed.innerText = "Wednesday";
		thu.innerText = "Thursday";
		fri.innerText = "Friday";
		sat.innerText = "Saturday";

		mainbody.appendChild(sun);
		mainbody.appendChild(mon);
		mainbody.appendChild(tue);
		mainbody.appendChild(wed);
		mainbody.appendChild(thu);
		mainbody.appendChild(fri);
		mainbody.appendChild(sat);
		////// all days display in this month

		var date = new Date();
		/////calcumate this month
		var thismonth = date.getMonth();
		var thisyear = date.getFullYear();
		var today = date.getDate();
		var countday = new Date(thisyear, thismonth + 1, 0).getDate();
		var countpreday = new Date(thisyear, thismonth, 0).getDate(); ///////calculate previous month
		var firstday = new Date(thisyear, thismonth, 1).getDay(); ////find the date of week

		/// start push last month
		for (i = firstday; i > 0; i--) {
			let day = document.createElement("div");
			let date = document.createElement("div");

			day.setAttribute("class", "day");
			parsedate = dateadd0(parseInt(thismonth));

			date.innerText = countpreday - i + 1;
			date.setAttribute("class", "predate");

			day.setAttribute("id", "calendar" + thisyear + parsedate + date.innerText);
			day.appendChild(date);
			mainbody.appendChild(day);
		}
		///start push this month
		for (i = 1; i < countday + 1; i++) {
			let day = document.createElement("div");
			let date = document.createElement("div");
			date.innerText = i;
			day.setAttribute("class", "day");

			date.setAttribute("class", "date");
			parsedate = dateadd0(parseInt(thismonth) + 1);
			let setID = "calendar" + thisyear + parsedate + dateadd0(i);
			day.setAttribute("id", setID);
			if (i == today) {
				day.setAttribute("class", "Datetoday");
				store.set("setID", setID);
			}
			day.appendChild(date);
			mainbody.appendChild(day);
		}
		temp = 43 - firstday - countday;
		for (i = temp; i > 1; i--) {
			let day = document.createElement("div");
			let date = document.createElement("div");
			date.innerText = temp - i + 1;
			day.setAttribute("class", "day");
			date.setAttribute("class", "postdate");
			parsedate = dateadd0(parseInt(thismonth) + 2);

			day.setAttribute("id", "calendar" + thisyear + parsedate + dateadd0(date.innerText));
			day.appendChild(date);
			mainbody.appendChild(day);
		}

		wrapper.appendChild(mainbody);
		// wrapper.innerHTML = this.teammate();
		loadcalendar();
		return wrapper;
	},
	getStyles: function () {
		return ["Gcalenda.css"];
	},
	getScripts: function () {
		return ["afterload.js"];
	},
	start: function () {},

	calendaMain() {
		var CLIENT_ID = "388227243623-mqr1flv73m8htut76rg2tmkv2drugu3n.apps.googleusercontent.com";
		var API_KEY = "AIzaSyCRp8cBCsa707bOBHcCFHCsH3S6AGokOxM";
	}
});
