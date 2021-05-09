# -*- coding: utf-8 -*-
import pafy
import requests
from youtubesearchpython import VideosSearch
from concurrent.futures import ThreadPoolExecutor
from bs4 import BeautifulSoup
import traceback
import logging
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s.%(msecs)03d %(levelname)s:\t%(message)s', datefmt='%Y-%m-%d %H:%M:%S')
logger = logging.getLogger(__name__)


class Fetch_music():

    def __init__(self):
        self.rank_url = "https://www.billboard.com"
        self.rank_url_routing = "charts/billboard-global-200?rank=1"

    def get_music_rank(self):
        result = []
        r = requests.get(self.rank_url + "/" + self.rank_url_routing)
        soup = BeautifulSoup(r.content, "html.parser")
        billboard = soup.find("ol", {"class": "chart-list__elements"})
        all_song = billboard.findAll("li")[0:10]
        logger.debug(f"All song: {all_song}")
        return all_song

    def search_youtube(self, keyword=""):
        videosearch = VideosSearch(keyword, limit=1).result()
        youtube_url = videosearch["result"][0]["link"]
        logger.debug(f"Youtube url: {youtube_url}")
        return youtube_url

    def get_stream_url(self, yt_link="https://www.youtube.com/watch?v=ZmDBbnmKpqQ&ab_channel=OliviaRodrigo-Topic"):
        video = pafy.new(yt_link)
        best = video.getbestaudio()
        logger.debug(f"Streaming url: {best.url}")
        return best.url

    def search_get_track(self, keyword=""):
        url = self.search_youtube(keyword)
        stream_url = self.get_stream_url(url)
        track = {
            "name": keyword.split("-")[0],
            "artist": keyword.split("-")[1],
            "path": stream_url
        }
        return track

    def get_track_list(self, all_song):
        all_track_list = []
        search_list = []

        for song in all_song:
            title = song.find(
                "span", {"class": "chart-element__information__song"}).text
            artist = song.find(
                "span", "chart-element__information__artist").text
            search_list.append(f"{title}-{artist}")

        with ThreadPoolExecutor() as e:
            track_list = list(e.map(self.search_get_track, search_list))
        logger.debug(f"Track list: {track_list}")

        return track_list

    def main(self):
        all_music_rank = self.get_music_rank()
        track_list = self.get_track_list(all_music_rank)
        return track_list


if __name__ == "__main__":
    music_api = Fetch_music()
    track_list = music_api.main()
    print(track_list)
