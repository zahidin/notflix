# -*- coding: utf-8 -*-
from scrapy import Spider
from scrapy.http import Request

import MySQLdb
import re
import os
import csv
import glob


class SeriesSpider(Spider):
    name = 'series'
    allowed_domains = ['bioskopkeren.fun']
    start_urls = ['http://bioskopkeren.fun/tv-series']

    def parse(self, response):
        series_url = response.xpath('.//div[@class="filmcontent"]/div[@class="moviefilm"]/a/@href').extract()
        for serial in series_url:
            serial_url = response.urljoin(serial)
            yield Request(serial_url, callback=self.parse_series)
        
        next_url = response.xpath('.//div[@class="filmcontent"]/div[@class="wp-pagenavi"]/a[@class="nextpostslink"]/@href').extract_first()
        absolute_next_url = response.urljoin(next_url)
        yield Request(absolute_next_url, callback=self.parse)


    def parse_series(self, response):
        title = response.xpath(".//div[@class='filmcontent']/h1/text()").extract_first()
        video = response.css('iframe::attr(src)').extract_first()
        genre = response.xpath(".//div[@class='filmaltiaciklama']/p/a/text()").extract()[1]
        episode = response.xpath(".//div[@class='rbgw_part']/span/text()").extract()[1]
        director = response.xpath(".//div[@class='filmaltiaciklama']/p").extract()[2]
        image = response.xpath(".//div[@class='filmcontent']/div[@class='filmalti']/div[@class='filmaltiimg']/img/@src").extract_first()
        rating = response.xpath(".//div[@class='filmaltiaciklama']/p").extract()[1]
        sinopsis = response.xpath(".//div[@class='filmicerik']/p/span").extract()[1]
        views = response.xpath("//div[@class='ok']/text()").extract_first()

        title_fix = self.clean_text(title)
        series = title_fix
        rating_fix = self.clean_text(rating)
        sinopsis_fix = self.clean_text(sinopsis)
        sinopsis_ab = sinopsis_fix.encode('utf-8')
        director_fix = self.clean_text(director)
        views_fix = self.clean_text(views)
        views_ab = int(views_fix)

        yield {
            "title" : title_fix,
            "serial" : series,
            "genre" : genre,
            "director" : director_fix,
            "episode" : episode,
            "sinopsis" : sinopsis_ab,
            "rating" : rating_fix,
            "views" : views_ab,
            "image" : image,
            "video" : video,
        }

        episodes_url = response.xpath('.//div[@class="rbgw_part"]/a/@href').extract()

        for episode_url in episodes_url:
            next_episode = response.urljoin(episode_url)
            yield Request(next_episode, callback=self.parse_episode)
    

    def parse_episode(self, response):
        title = response.xpath(".//div[@class='filmcontent']/h1/text()").extract_first()
        video = response.css('iframe::attr(src)').extract_first()
        episode = response.xpath(".//div[@class='rbgw_part']/span/text()").extract()[1]

        title_fix = self.clean_text(title)
        series = title_fix

        yield {
            "title" : title_fix,
            "serial" : series,
            "video" : video,
            "episode" : episode
        }

    def close(self, reason):
        csv_file = max(glob.iglob('*.csv'), key=os.path.getctime)

        mydb = MySQLdb.connect(host='localhost', user='root', password='root', db='movies_list', charset='utf8')
        cursor = mydb.cursor()

        csv_data = csv.reader(open(csv_file))

        row_count = 0
        for row in csv_data:
            if row_count != 0:
                cursor.execute(
                    'INSERT INTO series (title, serial, genre, director, episode, sinopsis, rating, views, image, video, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())', row)
            row_count += 1

        mydb.commit()
        cursor.close() 

    def clean_text(self, text):
        text = re.sub(r"<.*?>", "", text)
        text = re.sub(r"Nonton", "", text)
        text = re.sub(r"2018", "", text)
        text = re.sub(r"Subtitle", "", text)
        text = re.sub(r"Indonesia", "", text)
        text = re.sub(r"Film", "", text)
        text = text.replace("Director: ", "")
        text = text.replace(".", "")   
        text = text.strip()

        return text