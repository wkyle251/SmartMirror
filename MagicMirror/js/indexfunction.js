const socket = io("http://127.0.0.1:8080/google-assistant"); // open a port
socket.on("connect", function (msg) {
	/// if connect, print message
	console.log("Server connected!");
});

socket.on("google-assistant-action", function (msg) {
	/// reciving msg from server
	message_data = JSON.parse(msg);
	console.log("Google assistant action: ", message_data.event);
	switch (message_data.event) {
		case "swap_page":
			switch (message_data.action) {
				case "EMAIL":
					showhideframe("2");
					break;

				case "HOMEPAGE":
					showhideframe("0");
					break;

				case "CALENDAR":
					showhideframe("1");
					break;
			}
			break;

		case "play_music":
			switch (message_data.action) {
				case "PLAY_SONG":
					let check = document.querySelector("#breakbetween");
					if (check.innerHTML == "") {
						check.innerHTML = "-";
						nextTrack();
					} else {
						playpauseTrack();
					}
					break;

				case "PAUSE_SONG":
					playpauseTrack();
					break;

				case "PREVIOUS_SONG":
					prevTrack();
					break;

				case "NEXT_SONG":
					nextTrack();
					break;
			}
			break;

		case "check_email":
			switch (message_data.action) {
				case "FIRST_EMAIL":
					showEmail("0");
					break;
				case "SECOND_EMAIL":
					showEmail("1");
					break;
				case "THIRD_EMAIL":
					showEmail("2");
					break;
				case "FORTH_EMAIL":
					showEmail("3");
					break;
				case "FIFTH_EMAIL":
					showEmail("4");
					break;
				case "NEXT_EMAIL":
					nextEmail();
					break;
				case "PREVIOUS_EMAIL":
					preEmail();
					break;
			}
			break;

		default:
			console.log("couldn't find message action");
	}
});

//keyboard action which click which button on keyboard
keyjson = {
	0: "home",
	1: "calendar",
	2: "email",
	6: "presong",
	7: "play/pause",
	8: "next song",
	n: "next email",
	p: "previous email"
};

document.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "0":
			showhideframe("0");
			break;
		case "1":
			showhideframe("1");
			break;
		case "2":
			showhideframe("2");
			break;
		case "6":
			prevTrack();
			break;
		case "7":
			let check = document.querySelector("#breakbetween");
			if (check.innerHTML == "") {
				check.innerHTML = "-";
				nextTrack();
			} else {
				playpauseTrack();
				document.querySelector("audio").muted = false;
			}
			break;
		case "8":
			nextTrack();
			break;
		case "n":
			nextEmail();
			break;
		case "p":
			preEmail();
			break;

		default:
			console.log(keyjson);
	}
});

var currentframe;

function showhideframe(number) {
	// console.log("running");
	currentframe = number;
	let store = document.querySelectorAll(".pageframe"); // get all the page
	// console.log(store);S
	for (i = 0; i < store.length; i++) {
		// if page[num] == num , page [num] display, else hide
		if (i == number) {
			store[i].style.display = "block";
		} else {
			store[i].style.display = "none";
		}
	}
}

var trackEmailCount = 0;

function showEmail(number) {
	trackEmailCount = number;
	let allemail = document.querySelectorAll(".emailrightdom");
	let mailbg = document.querySelectorAll(".emailsmalldom");
	for (i = 0; i < allemail.length; i++) {
		// if page[num] == num , page [num] display, else hide
		store.set("countemail", trackEmailCount);
		if (i == trackEmailCount) {
			allemail[i].style.display = "grid";
			mailbg[i].style.backgroundColor = "#3b3b3b";
		} else {
			allemail[i].style.display = "none";
			mailbg[i].style.backgroundColor = "transparent";
		}
	}
}

function nextEmail() {
	if (trackEmailCount < 4) {
		let allemail = document.querySelectorAll(".emailrightdom");
		let mailbg = document.querySelectorAll(".emailsmalldom");
		for (i = 0; i < allemail.length; i++) {
			// if page[num] == num , page [num] display, else hide
			store.set("countemail", trackEmailCount + 1);
			if (i == trackEmailCount + 1) {
				allemail[i].style.display = "grid";
				mailbg[i].style.backgroundColor = "#3b3b3b";
			} else {
				allemail[i].style.display = "none";
				mailbg[i].style.backgroundColor = "transparent";
			}
		}
		trackEmailCount++;
	}
}
function preEmail() {
	let allemail = document.querySelectorAll(".emailrightdom");
	let mailbg = document.querySelectorAll(".emailsmalldom");
	if (trackEmailCount > 0) {
		for (i = 0; i < allemail.length; i++) {
			// if page[num] == num , page [num] display, else hide
			store.set("countemail", trackEmailCount - 1);
			if (i == trackEmailCount - 1) {
				allemail[i].style.display = "grid";
				mailbg[i].style.backgroundColor = "#3b3b3b";
			} else {
				allemail[i].style.display = "none";
				mailbg[i].style.backgroundColor = "transparent";
			}
		}
		trackEmailCount--;
	}
}

///// gesture detection
const socketgesture = io("http://127.0.0.1:8080/gesture-detection"); // open a port

socketgesture.on("gesture-detection", (e) => {
	data = JSON.parse(e);
	console.log(data, e, "gesture detection data");
	switch (currentframe) {
		case "0":
			switch (data) {
				case "LEFT":
					prevTrack();
					break;
				case "RIGHT":
					nextTrack();
					break;
				case "UP":
					let check = document.querySelector("#breakbetween");
					if (check.innerHTML == "") {
						check.innerHTML = "-";
						nextTrack();
					} else {
						playpauseTrack();
					}
					break;
				case "DOWN":
					playpauseTrack();
					break;
				case "FIVE":
					showhideframe("2");
					break;
				case "BUNNY":
					showhideframe("1");
					break;
				default:
					console.log("no such action", data);
			}
			break;

		case "1":
			switch (data) {
				case "OKAY":
					showhideframe("0");
					break;
				case "FIVE":
					showhideframe("2");
					break;
			}
			break;
		case "2":
			switch (data) {
				case "LEFT":
					preEmail();
					break;
				case "UP":
					preEmail();
					break;
				case "RIGHT":
					nextEmail();
					break;
				case "DOWN":
					nextEmail();
					break;
				case "ONE":
					showEmail("0");
					break;
				case "TWO":
					showEmail("1");
					break;
				case "THREE":
					showEmail("2");
					break;
				case "FOUR":
					showEmail("3");
					break;
				case "FIVE":
					showEmail("4");
					break;
				default:
					console.log("no such action", data);
			}
			break;
	}
});
