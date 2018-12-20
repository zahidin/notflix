# -*- coding: utf-8 -*-
import scrapy

from scrapy.http import Request

import MySQLdb
import re
import os
import csv
import glob

class SeriesListSpider(scrapy.Spider):
    name = 'series_list'
    allowed_domains = ['bioskopkeren.fun']
    start_urls = ['http://bioskopkeren.fun/tv-series/']

    def parse(self, response):
        series = response.xpath('.//div[@class="moviefilm"]/div[@class="movief"]/a/text()').extract()
        for serial in series:
            serial = self.clean_text(serial)
            yield {
                "serial" : serial
            }

        next_url = response.xpath('.//div[@class="filmcontent"]/div[@class="wp-pagenavi"]/a[@class="nextpostslink"]/@href').extract_first()
        absolute_next_url = response.urljoin(next_url)
        yield Request(absolute_next_url, callback=self.parse)


    def close(self, reason):
        csv_file = max(glob.iglob('*.csv'), key=os.path.getctime)

        mydb = MySQLdb.connect(host='localhost', user='root', password='root', db='movies_list', charset='utf8')
        cursor = mydb.cursor()

        csv_data = csv.reader(open(csv_file))

        row_count = 0
        for row in csv_data:
            if row_count != 0:
                cursor.execute('INSERT INTO series_list (title) VALUES (%s)', row)
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
        text = text.strip()
        
        return text
