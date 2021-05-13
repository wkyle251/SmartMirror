Module.register("hotnews", {
	// Default module config.
	defaults: {},

	// Override dom generator.
	getDom: function () {
		let that = this;
		var wrapper = document.createElement("div");
		wrapper.setAttribute("id", "hotnewsDom");
		new requestData("get-news").getData().then((res) => {
			if (res.code == 1001) {
				setInterval(function () {
					that.updateDom();
				}, 3600000);
				this.display3loop(res.content);
			} else {
				console.log("unable to recieve news,code", res.code);
			}
		});
		return wrapper;
	},
	getStyles: function () {
		return ["hotnews.css"];
	},
	display3loop(list) {
		let hotnewsdom = document.querySelector("#hotnewsDom");
		for (i = 0; i < 3; i++) {
			let news = document.createElement("div");
			let title1 = document.createElement("div");
			let content = document.createElement("div");
			let content_marquee = document.createElement("div");
			let author = document.createElement("div");
			let url = document.createElement("div");
			let time = document.createElement("div");
			let hr = document.createElement("hr");

			news.setAttribute("class", "hotnews_bar");
			title1.setAttribute("class", "newstitle");
			content.setAttribute("class", "content");
			content.setAttribute("disabled", "true");
			content_marquee.setAttribute("class", "result_marquee");
			time.setAttribute("class", "newstime");
			author.setAttribute("class", "newsauthor");
			// url.setAttribute('class','newsurl');
			title1.innerHTML = list[i].title;
			content.innerHTML = list[i].news_content;
			time.innerHTML = list[i].date;
			author.innerHTML = list[i].author;
			// url.innerHTML = i.url;

			news.appendChild(title1);
			content_marquee.appendChild(content);
			news.appendChild(content_marquee);
			news.appendChild(author);
			news.appendChild(time);
			news.appendChild(hr);

			hotnewsdom.appendChild(news);
		}
		let loopcount = 3;
		setInterval(function () {
			hotnewsdom.style = "opacity: 0;";
			setTimeout(() => {
				hotnewsdom.innerHTML = "";
				for (i = loopcount; i < loopcount + 3; i++) {
					let news = document.createElement("div");
					let title1 = document.createElement("div");
					let content = document.createElement("div");
					let content_marquee = document.createElement("div");
					let author = document.createElement("div");
					let url = document.createElement("div");
					let time = document.createElement("div");
					let hr = document.createElement("hr");
					news.setAttribute("class", "hotnews_bar");
					title1.setAttribute("class", "newstitle");
					content.setAttribute("class", "content");
					content.setAttribute("disabled", "true");
					content_marquee.setAttribute("class", "result_marquee");
					time.setAttribute("class", "newstime");
					author.setAttribute("class", "newsauthor");
					// url.setAttribute('class','newsurl');
					title1.innerHTML = list[i].title;
					content.innerHTML = list[i].news_content;
					time.innerHTML = list[i].date;
					author.innerHTML = list[i].author;
					// url.innerHTML = i.url;

					news.appendChild(title1);
					content_marquee.appendChild(content);
					news.appendChild(content_marquee);
					news.appendChild(author);
					news.appendChild(time);
					news.appendChild(hr);

					hotnewsdom.appendChild(news);
				}
				hotnewsdom.style = "opacity: 1";
			}, 2000);
			loopcount += 3;

			// clear and reset
			if (loopcount == list.length) {
				loopcount = 0;
			}
		}, 30000);
	}
});
