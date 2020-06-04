from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
import selenium.common.exceptions as exc
from bs4 import BeautifulSoup
import urllib.request
import urllib.error
import requests
import re

class OrangeScraper(object):
    def __init__(self, item):
        self.item = item

        self.url = f"https://www.walmart.com/search/?query={item}"

        self.driver = webdriver.Firefox(executable_path=r'.\geckodriver.exe')
        self.delay = 7
    
    # Make sure the page is ready before anything can be extracted
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

    # Gets the urls from the search results page
    def get_urls(self):
        url_list = []
        for link in self.driver.find_elements_by_css_selector('a.product-title-link.line-clamp.line-clamp-2.truncate-title'):
            url_list.append(link.get_attribute("href"))
        return url_list
    
    # Grabs urls of the other search result pages
    def get_pages(self): 
        pass
    
    # Gets the price of the item from the individual pages
    def get_price(self, list):
        for link in list:
            try:
                page = urllib.request.urlopen(link)
                soup = BeautifulSoup(page, 'lxml')
                try:
                    price_dollar = soup.find('span', attrs={'class': re.compile('price-characteristic')}).text
                    price_cents = soup.find('span', attrs={'class': re.compile('price-mantissa')}).text
                    print('$' + price_dollar + '.' + price_cents)
                except AttributeError:
                    print('Price was not found')
            except urllib.error.HTTPError:
                print('Price was not found')

    # Closes the browser once it's done
    def quit(self):
        self.driver.close()

item = "oranges"

scraper = OrangeScraper(item)
scraper.load_walmart_url()
list = scraper.get_urls()
scraper.get_price(list)

scraper.quit()