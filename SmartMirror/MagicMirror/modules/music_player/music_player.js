Module.register("music_player", {
	// Default module config.
	defaults: {
		name: "music_player"
	},

	// Override dom generator.
	getStyles: function () {
		return [this.file("music_player.css")];
	},

	getScripts: function () {
		return [this.file("main.js")];
	},

	getDom: function () {
		var wrapper = document.createElement("div");

		// add element for audio player
		var audio_player = document.createElement("div");
		var marquee = document.createElement("marquee");
		var audio_details = document.createElement("div");
		var audio_button_container = document.createElement("div");
		var audio_duration = document.createElement("div");

		marquee.setAttribute("scrollamount", "3");
		marquee.setAttribute("width", "400px");
		audio_player.setAttribute("class", "player");
		audio_details.setAttribute("class", "details");
		audio_button_container.setAttribute("class", "buttons-container");
		audio_duration.setAttribute("class", "slider_container");

		// audio_details elements
		var track_name = document.createElement("div");
		var track_artist = document.createElement("div");
		var full_name = document.createElement("span");
		full_name.setAttribute("id", "breakbetween");
		// audio_details attribute
		track_name.setAttribute("class", "track-name");
		track_name.innerHTML = "Waiting for Music";
		full_name.innerHTML = "";
		full_name.style.paddingLeft = "10px";
		full_name.style.paddingRight = "10px";

		track_artist.setAttribute("class", "track-artist");
		track_artist.innerHTML = "";

		audio_details.appendChild(track_name);
		audio_details.appendChild(full_name);
		audio_details.appendChild(track_artist);
		marquee.appendChild(audio_details);

		// audio_button elements
		var prev_track = document.createElement("div");
		var play_pause = document.createElement("div");
		var next_track = document.createElement("div");
		var prev_logo = document.createElement("i");
		var play_logo = document.createElement("i");
		var next_logo = document.createElement("i");

		// audio_button attribute
		prev_track.setAttribute("class", "prev-track");
		play_pause.setAttribute("class", "playpause-track");
		next_track.setAttribute("class", "next-track");
		prev_logo.setAttribute("class", "fa fa-step-backward");
		play_logo.setAttribute("class", "fa fa-play");
		next_logo.setAttribute("class", "fa fa-step-forward");

		// audio_button events
		prev_track.addEventListener("click", prevTrack);
		play_pause.addEventListener("click", playpauseTrack);
		next_track.addEventListener("click", nextTrack);

		prev_track.appendChild(prev_logo);
		play_pause.appendChild(play_logo);
		next_track.appendChild(next_logo);

		audio_button_container.appendChild(prev_track);
		audio_button_container.appendChild(play_pause);
		audio_button_container.appendChild(next_track);

		// audio_duration elements
		var current_time = document.createElement("div");
		var seek_slider = document.createElement("input");
		var total_duration = document.createElement("div");

		// audio_duration attribute
		current_time.setAttribute("class", "current-time");
		current_time.innerHTML = "00:00";

		seek_slider.setAttribute("class", "seek_slider");
		seek_slider.setAttribute("type", "range");
		seek_slider.setAttribute("min", "1");
		seek_slider.setAttribute("max", "100");
		seek_slider.setAttribute("value", "0");
		seek_slider.addEventListener("change", this.seekTo);

		total_duration.setAttribute("class", "total-duration");
		total_duration.innerHTML = "00:00";

		// append all element in one container
		audio_button_container.appendChild(current_time);
		audio_button_container.appendChild(seek_slider);
		audio_button_container.appendChild(total_duration);

		audio_player.appendChild(marquee);
		audio_player.appendChild(audio_button_container);
		// audio_player.appendChild(audio_duration);

		var script = document.createElement("script");
		wrapper.appendChild(audio_player);

		return wrapper;
	}
});
