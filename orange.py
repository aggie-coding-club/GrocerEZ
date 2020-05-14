from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException

from bs4 import BeautifulSoup
import urllib.request

class OrangeScraper(object):
    def __init__(self, item):
        self.item = item

        #item = "oranges"
        self.url = f"https://www.walmart.com/search/?query={item}"

        self.driver = webdriver.Firefox(executable_path=r'.\geckodriver.exe')
        #driver.get(self.url)
        self.delay = 7

    def test(self):
        print(self.url)
    
    def load_walmart_url(self):
        self.driver.get(self.url)
        try:
            wait = WebDriverWait(self.driver, self.delay)
            wait.until(EC.presence_of_element_located((By.ID, "search-server-content")))
            print("Page is ready")
        except TimeoutException:
            print("Loading took too much time")

    def extract_post_titles(self):
        all_items = self.driver.find_elements_by_class_name("search-result-gridview-item-wrapper")
        post_title_list = []
        for item in all_items:
            #print(item.text)
            post_title_list.append(item.text)
        return post_title_list


    def extract_post_urls(self):
        url_list = []
        html_page = urllib.request.urlopen(self.url)
        soup = BeautifulSoup(html_page, "lxml")
        for link in soup.findAll("a", {"class": "product-title-link line-clamp line-clamp-2 truncate-title"}):
            print("https://www.walmart.com" + link["href"])
            url_list.append("https://www.walmart.com" + link["href"])
        return url_list

    def get_prices(self, list):
        for url in list:
            #html_page = urllib.request.urlopen(url)
            #soup = BeautifulSoup(html_page, "lxml")
            self.driver.get(url)
            price_dollar = self.driver.find_element_by_class_name("price-characteristic")
            price_cent = self.driver.find_element_by_class_name("price-mantissa")
            print("$" + price_dollar.text + price_cent.text)
            #for price in soup.findAll("span", {"id": "price"}):
            #    print("Price: " + price["class"])


    def quit(self):
        self.driver.close()

item = "oranges"

scraper = OrangeScraper(item)
scraper.load_walmart_url()
#scraper.test()
scraper.extract_post_titles()
list = scraper.extract_post_urls()
scraper.get_prices(list)

scraper.quit()