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
import time

class OrangeScraper(object):
    def __init__(self, item, zip):
        self.item = item
        self.zip = zip

        self.url = f"https://www.walmart.com/search/?query={item}"

        self.driver = webdriver.Firefox(executable_path=r'.\geckodriver.exe')
        self.delay = 7

        #Browser session variables
        session_url = None
        session_id = None
    
    # Make sure the page is ready before anything can be extracted
    def load_search(self):
        self.driver.get(self.url)
        try:
            wait = WebDriverWait(self.driver, self.delay)
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button.button.button--primary.elc-icon.elc-icon-down-arrow")))
            print("Page is ready")
        except TimeoutException:
            print("Loading took too much time")

    # Sets the walmart store location based on the zip code
    def set_location(self):
        url = f"https://www.walmart.com/store/finder?location={self.zip}&distance=50"
        self.driver.get(url)
        try:
            wait = WebDriverWait(self.driver, self.delay)
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "span.store-icon-link-text")))
            print("Page is ready")
        except TimeoutException:
            print("Loading took too much time")
        
        button = self.driver.find_element_by_css_selector('span.store-icon-link-text')
        button.click()
        button = self.driver.find_element_by_css_selector('button.make-your-store.font-bold')
        button.click()
        button = self.driver.find_elements_by_css_selector('span.button-wrapper')
        button[1].click()
        # Make sure page is loaded before item is inputted into search bar
        try:
            wait = WebDriverWait(self.driver, self.delay)
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "a.nav-panel-link.font-bold.current-page")))
            print("Page is ready")
        except TimeoutException:
            print("Loading took too much time") 
        # Enter item into search bar
        input = self.driver.find_element_by_css_selector('input.field-input.field-input--primary')
        input.send_keys(self.item)
        button = self.driver.find_element_by_css_selector('span.icon.elc-icon.elc-icon-search-nav')
        button.click()

        #Saving browser session
        session_url = self.driver.command_executor._url  
        session_id = self.driver.session_id
        

    # Gets the urls from the search results page
    def get_urls(self):
        url_list = []
        # Make sure page is loaded before extracting urls
        try:
            wait = WebDriverWait(self.driver, self.delay)
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "a.display-block")))
            print("Page is ready")
        except TimeoutException:
            print("Loading took too much time") 

        for link in self.driver.find_elements_by_css_selector('a.display-block'):
            #print(link.get_attribute("href"))
            url_list.append(link.get_attribute("href"))        

        return url_list
    
    # Gets the price of the item from the individual pages
    def get_price(self, list):
        for link in list:
            print(link)
            # Make sure the link is working
            try:
                page = urllib.request.urlopen(link)
                soup = BeautifulSoup(page, 'lxml')
            except urllib.error.HTTPError:
                print('Broken Link')
                continue

            # Gets the price 
            try:
                dollar = soup.select_one(
                    '#price > div > span.hide-content.display-inline-block-m > span > span.price-group > span.price-characteristic').text
                cent = soup.select_one(
                    '#price > div > span.hide-content.display-inline-block-m > span > span.price-group > span.price-mantissa').text
            except AttributeError:
                    print('Price was not found')
                    dollar = '-1'
                    cent = ''
            
            # Get product title
            try:
                product_title = soup.find('h1', class_='prod-ProductTitle prod-productTitle-buyBox font-bold').text
            except: 
                print('Product title could not be found')
                product_title = 'None'
                    
            print(product_title)
            print('$' + dollar + '.' + cent)
                
            
    
    # Closes the browser once it's done
    def quit(self):
        self.driver.close()

item = "oranges"
zip = "77840"

scraper = OrangeScraper(item, zip)
scraper.set_location()
list = scraper.get_urls()
scraper.get_price(list)

#scraper.quit()