# Install Library

Scraping menggunakan bahasa pemrograman Python 3.6 dengan Framework Scrapy

> conda install -c scrapinghub scrapy
or
> pip install Scrapy

# Run Spider

Run Spider, secara otomatis akan memasukkan item ke db dan membuat file item.csv
List Spider yg tersedia
1. series
2. movies
3. series_list
4. category

> scrapy crawl (spider) -o item.csv
