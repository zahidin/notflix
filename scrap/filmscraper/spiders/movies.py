# -*- coding: utf-8 -*-
import scrapy
from scrapy.http import Request

import re
import os
import csv
import glob
import MySQLdb



class MoviesSpider(scrapy.Spider):
    name = 'movies'
    allowed_domains = ['bioskopkeren.fun']
    start_urls = ['http://bioskopkeren.fun/movie/']

    def parse(self, response):
        movies_url = response.xpath('//div[@class="moviefilm"]/a/@href').extract()
        for movie in movies_url:
            movie_url = response.urljoin(movie)
            yield Request(movie_url, callback=self.parse_movie)

        next_url = response.xpath('.//div[@class="filmcontent"]/div[@class="wp-pagenavi"]/a[@class="nextpostslink"]/@href').extract_first()
        absolute_next_url = response.urljoin(next_url)
        yield Request(absolute_next_url, callback=self.parse)

    def parse_movie(self, response):
        title = response.xpath(".//div[@class='filmcontent']/h1/text()").extract_first()
        genre = response.xpath(".//div[@class='filmaltiaciklama']/p/a/text()").extract()[1]
        star = response.xpath(".//div[@class='filmicerik']/p/span/text()").extract()[7]
        director = response.xpath(".//div[@class='filmicerik']/p/span/text()").extract()[5]
        sinopsis = response.xpath(".//div[@class='filmicerik']/p/span").extract()[1]
        rating = response.xpath(".//div[@class='filmaltiaciklama']/p").extract()[1]
        views = response.xpath('.//div[@class="ok"]/text()').extract_first()
        image = response.xpath(".//div[@class='filmcontent']/div[@class='filmalti']/div[@class='filmaltiimg']/img/@src").extract_first()
        video = response.css('iframe::attr(src)').extract_first()

        title_fix = self.clean_text(title)
        star_fix = self.clean_text(star)
        director_fix = self.clean_text(director)
        sinopsis_fix = self.clean_text(sinopsis)
        rating_fix = self.clean_text(rating)
        views_fix = self.clean_text(views)

        yield {
            "title" : title_fix,
            "genre" : genre,
            "stars" : star_fix,
            "director" : director_fix,
            "sinopsis" : sinopsis_fix,
            "rating" : rating_fix,
            "views" : views_fix,
            "image" : image,
            "video" : video 
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
                    'INSERT INTO movies (title, genre, stars, director, sinopsis, rating, views, image, video, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())', row)
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
        text = text.replace("Stars: ", "")
        text = text.replace(".", "")   
        text = text.strip()

        return text
