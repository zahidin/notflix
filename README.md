#TEAM B : MOVIE

## Contributor : 
* **Arham Abiyan** - *Scrapping*
* **Muhammad Zahidin Nur** - *Backend*
* **Furwadi Pung** - *Backend*
* **Bayu Permana Putra** - *Mobile*
* **Raden Arya** - *Mobile*
* **Syukri Husaibatul Khairi HSB** - *Web*
* **Zulfan** - *Web*

#Scrap
## Install Library

Scraping menggunakan bahasa pemrograman Python 3.6 dengan Framework Scrapy

> conda install -c scrapinghub scrapy
or
> pip install Scrapy

## Run Spider

Run Spider, secara otomatis akan memasukkan item ke db dan membuat file item.csv
List Spider yg tersedia
1. series
2. movies
3. series_list
4. category
	
> scrapy crawl (spider) -o item.csv

#Backend

Api Notflix menggunakan framework adonis js dan menggunakan database mysql

## Installation

> cd backend
> npm install

## Installasion Database

> adonis migration:run

## Run Server Adonis

> adonis serve --dev

## Endpoint 
Endpoint yang tersedia bisa cek disini :

[Postman](https://documenter.getpostman.com/view/5526317/Rzn6vi31)

#Mobile

## Prerequisites

- Xcode or Android Studio installed and exported on your ~/.bash_profile or similar
- npm > v4
- JDK 1.8
- Node >= 8.*
- react-native-cli

## Installation

open terminal and change directory to your desired folder, then:

$ git clone https://github.com/radenaryayusuf/movieCloneApp

$ cd movieCloneApp

$ npm install

$ react-native link


## Running Your App

Make sure to open your emulator first, then

$ react-native run-android

or

$ react-native run-ios


##cons (On progress)

$ Login Auth

$ Play Video Streaming

$ Search

$ Category

$ Drawer

$ One Signal


#Web

## Installation

> npm install

## Setting Ip Backend

> cd src/configip.js

## Run Web

> npm start


 
