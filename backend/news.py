import requests
from datetime import datetime
import dateparser
import traceback
import logging
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s.%(msecs)03d %(levelname)s:\t%(message)s', datefmt='%Y-%m-%d %H:%M:%S')
logger = logging.getLogger(__name__)


class News_api():

    def __init__(self):
        self.host = f"https://newsapi.org"
        self.routing = f"v2/top-headlines"

    def fetch_news(self) -> dict:
        my_params = {"country": "hk",
                     "apiKey": "f06baec6d6094aaca16fe777e5a50629"}
        r = requests.get(self.host + "/" + self.routing, params=my_params)
        request_data = r.json()
        logger.debug(f"Request data: {request_data}")
        return request_data

    def news_process(self, request_data: dict) -> list:
        all_news = []
        articles = request_data["articles"][:18]
        logger.debug(f"Total of articles: {len(articles)}")
        for article in articles:
            url = article["url"]
            author = article["source"]["name"]
            title = article["title"]
            description = article["description"]
            date_time = article["publishedAt"]
            date_time = dateparser.parse(date_time)
            date = date_time.strftime("%Y-%m-%d %H:%M")
            logger.debug(f"Date return: {date}")
            news = {
                "title": title,
                "author": author,
                "news_content": description,
                "url": url,
                "date": date
            }
            all_news.append(news)
        logger.debug(f"All news: {all_news}")
        return all_news

    def get_all_news(self):
        try:
            request_data = self.fetch_news()
            all_news = self.news_process(request_data)
            data = {
                "code": 1001,
                "content": all_news
            }
            logger.info("Success to get News API!")
            return data

        except Exception:
            logger.error("Error: get_all_news()")
            logger.error(traceback.print_exc())
            return {"code": -1001, "message": traceback.print_exc()}


if __name__ == "__main__":
    news_api = News_api()
    data = news_api.get_all_news()
    print(data)
