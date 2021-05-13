let requestData = class {
	constructor(direction) {
		let that = this;
		this.url = "http://127.0.0.1:8080/" + direction; //to the route
	}
	/////request to programz
	postData(data) {
		// Default options are marked with *
		var that = this;
		return new Promise(function (resolve, reject) {
			fetch(that.url, {
				body: JSON.stringify(data), // must match 'Content-Type' header
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, same-origin, *omit
				headers: {
					"content-type": "application/json"
				},
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, cors, *same-origin
				redirect: "follow", // manual, *follow, error
				referrer: "no-referrer" // *client, no-referrer
			}).then((response) => {
				resolve(response.json());
			}); // parses response to JSON
		});
	}

	getData(data) {
		// Default options are marked with *
		var that = this;
		var url = that.url;
		return new Promise(function (resolve, reject) {
			fetch(url, {
				body: JSON.stringify(data), // must match 'Content-Type' header
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, same-origin, *omit
				headers: {
					"content-type": "application/json"
				},
				method: "GET", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, cors, *same-origin
				redirect: "follow", // manual, *follow, error
				referrer: "no-referrer" // *client, no-referrer
			}).then((response) => {
				resolve(response.json());
			}); // parses response to JSON
		});
	}

	mylibrary() {
		console.log("good");
	}
};
