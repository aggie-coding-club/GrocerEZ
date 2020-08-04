import bs4 as bs
import sys
import urllib
from PyQt5.QtWebEngineWidgets import QWebEnginePage
from PyQt5.QtWidgets import QApplication
from PyQt5.QtCore import QUrl

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time
import requests

PATH = "A:\chrome driver\chromedriver.exe"
driver = webdriver.Chrome(PATH)

query = input("Enter item: ")

driver.get('https://www.target.com/s?searchTerm=' + query)
time.sleep(8)
 
page = driver.page_source

class Page(QWebEnginePage):

    def __init__(self, url):
        self.app = QApplication(sys.argv)
        QWebEnginePage.__init__(self)
        self.loadd(url)
        
    def loadd(self, url):
        self.html = ''
        self.loadFinished.connect(self._on_load_finished)
        self.load(QUrl(url))
        self.app.exec_()


    def _on_load_finished(self):
        self.html = self.toHtml(self.Callable)
        print('Load finished')

    def Callable(self, html_str):
        self.html = html_str
        self.app.quit()

def get_products_urls():
  product_urls = []
  for m in re.finditer('href="/p/', page):
    index = m.end()
    while page[index] != '"':
      index += 1
    product_urls.append('https://www.target.com' + page[m.start() + 6:index])
  return product_urls

def printShit(urll, page):
    #page = Page(urll)
    soup = bs.BeautifulSoup(page.html, 'html.parser')
    print(soup.find(class_ = "bThsQu").text)
    print(soup.find(class_ = "cAIbCF").text)
    print(soup.find(class_ = "eRRxtM").text)
    return 'done'

urls = list(set(get_products_urls()))
page = Page(urls[0])
count = 0

for urll in urls:
    page.loadd(urls[count])
    print(printShit(urll, page))
    print()
    count += 1
sg915Today at 5:21 PM
import bs4 as bs
import sys
import urllib
from PyQt5.QtWebEngineWidgets import QWebEnginePage
from PyQt5.QtWidgets import QApplication
from PyQt5.QtCore import QUrl

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time
import requests

PATH = "C:\webdrivers\chromedriver.exe"
driver = webdriver.Chrome(PATH)

query = 'apples'

driver.get('https://www.target.com/s?searchTerm=' + query)
time.sleep(8)
 
page = driver.page_source

class Page(QWebEnginePage):

    def __init__(self, url):
        self.app = QApplication(sys.argv)
        QWebEnginePage.__init__(self)
        self.loadd(url)
        
    def loadd(self, url):
        self.html = ''
        self.loadFinished.connect(self._on_load_finished)
        self.load(QUrl(url))
        self.app.exec_()


    def _on_load_finished(self):
        self.html = self.toHtml(self.Callable)
        print('Load finished')

    def Callable(self, html_str):
        self.html = html_str
        self.app.quit()

def get_products_urls():
  product_urls = []
  for m in re.finditer('href="/p/', page):
    index = m.end()
    while page[index] != '"':
      index += 1
    product_urls.append('https://www.target.com' + page[m.start() + 6:index])
  return product_urls

def printShit(urll, page):
    #page = Page(urll)
    soup = bs.BeautifulSoup(page.html, 'html.parser')
    print(soup.find(class_ = "bThsQu").text)
    print(soup.find(class_ = "cAIbCF").text)
    return 'done'

urls = list(set(get_products_urls()))
page = Page(urls[0])


for urll in urls:
    page.loadd(urll)
    time.sleep(1)
    print(printShit(urll, page))
    print()