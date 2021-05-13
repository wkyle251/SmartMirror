function initnow() {
	let count = store.get("countemail");
	document.querySelectorAll(".emailrightdom")[count].style.display = "grid";
	document.querySelectorAll(".emailsmalldom")[count].style.backgroundColor = "#3b3b3b";
	setInterval((e) => {
		var wrapper = document.querySelector("#emailcontainer");
		//init big dome
		var emaildom = document.createElement("div");
		emaildom.setAttribute("id", "emaildom");

		var bodydom = document.createElement("div");
		bodydom.setAttribute("id", "bodydom");
		// get email details
		var request = new requestData("get-email");
		request.getData().then((res) => {
			if (res.success == true) {
				data = res.data;

				for (i = 0; i < 5; i++) {
					// left all display email
					//init dom to include data
					let smalldom = document.createElement("div");
					smalldom.setAttribute("class", "emailsmalldom");
					// init email title, from, date, content
					let title = document.createElement("div");
					title.setAttribute("class", "emailtitle");
					let from = document.createElement("div");
					from.setAttribute("class", "emailfrom");
					let date = document.createElement("div");
					date.setAttribute("class", "emaildate");
					let content = document.createElement("div");
					content.setAttribute("class", "emailcontent");

					// append data
					title.innerText = data[i].subject;
					from.innerText = data[i].from;
					date.innerText = data[i].date;
					content.innerHTML = data[i].summary;

					//append to small dom(grouping)
					smalldom.appendChild(title);
					smalldom.appendChild(date);
					smalldom.appendChild(from);
					smalldom.appendChild(content);

					// append to bigdom
					emaildom.appendChild(smalldom);

					//*************

					//init dom to include data
					let rightdom = document.createElement("div");
					rightdom.setAttribute("class", "emailrightdom");
					rightdom.setAttribute("style", "display:none");

					// init email title, from, date, body
					let btitle = document.createElement("div");
					btitle.setAttribute("class", "remailtitle");
					let bfrom = document.createElement("div");
					bfrom.setAttribute("class", "remailfrom");
					let bdate = document.createElement("div");
					bdate.setAttribute("class", "emaildate");
					let body = document.createElement("div");
					body.setAttribute("class", "remailbody");

					// append data
					btitle.innerText = data[i].subject;
					bfrom.innerText = data[i].from;
					bdate.innerText = data[i].date;
					body.innerHTML = data[i].body;

					//append to small dom(grouping)
					rightdom.appendChild(btitle);
					rightdom.appendChild(bdate);
					rightdom.appendChild(bfrom);
					rightdom.appendChild(body);

					// append to bigdom
					bodydom.appendChild(rightdom);
				}

				wrapper.innerHTML = "";
				wrapper.appendChild(emaildom);
				wrapper.appendChild(bodydom);
				let count = store.get("countemail");
				document.querySelectorAll(".emailrightdom")[count].style.display = "grid";
				document.querySelectorAll(".emailsmalldom")[count].style.backgroundColor = "#3b3b3b";
			} else {
				console.log("email api error", res);
			}
		});
	}, 5000);
}
