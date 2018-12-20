# -*- coding: utf-8 -*-
import scrapy

import MySQLdb
import re
import os
import csv
import glob


class CategoriesSpider(scrapy.Spider):
    name = 'categories'
    allowed_domains = ['bioskopkeren.fun']
    start_urls = ['http://bioskopkeren.fun/']

    mydb = MySQLdb.connect(host='localhost', user='root', password='root', db='movies_list', charset='utf8')
    cursor = mydb.cursor()

    def parse(self, response):
        categories = response.xpath('.//ul[@class="mccw-col-last mccw-col-2"]/li/a/@href').extract()
        for category in categories:
            category = self.clean_text(category)
            
            # self.cursor.execute('INSERT INTO category_list (name_category) VALUES (%s)', (category_fix))
            # self.mydb.commit()
            # self.cursor.close()

            yield {
                "Category" : category
            }

    def close(self, reason):
        csv_file = max(glob.iglob('*.csv'), key=os.path.getctime)

        mydb = MySQLdb.connect(host='localhost', user='root', password='root', db='movies_list', charset='utf8')
        cursor = mydb.cursor()

        csv_data = csv.reader(open(csv_file))

        row_count = 0
        for row in csv_data:
            if row_count != 0:
                cursor.execute('INSERT INTO category_list (name_category) VALUES (%s)', row)
            row_count += 1

        mydb.commit()
        cursor.close() 

    def clean_text(self, text):
        text = text.replace('https://bioskopkeren.fun/', '')
        text = text.replace('/','')
        text = text.capitalize()

        return text