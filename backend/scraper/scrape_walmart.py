from selenium import webdriver
from bs4 import BeautifulSoup
import requests

from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time

import sys

class WalmartScraper():
    zipSet = False
    def __init__(self):
        if len(sys.argv) != 2:
            raise ValueError('Please enter a browser driver to use (Chrome or Firefox)')

        browser = sys.argv[1]
        if browser.lower() == 'chrome':
            chrome_options = Options()
            chrome_options.add_argument('--headless')
            try:
                self.driver = webdriver.Chrome(ChromeDriverManager().install())
                self.driver.get("https://www.walmart.com/")
                #self.driver.get = webdriver.Chrome(driver, options=chrome_options)
                # Get cookies for request session - needed for getting each product
                cookies = self.driver.get_cookies()
                self.driver.quit()
                 # Creating a session
                self.session = requests.Session()
                # PLace cookies in the session cookie jar
                [self.session.cookies.set(cookie['name'], cookie['value']) for cookie in cookies]
                
                
            except:
                sys.exit('Chrome web driver is missing')
        # elif browser.lower() == 'firefox':
        #     try:
        #         self.driver = webdriver.Firefox(executable_path=r'.\geckodriver.exe')
        #     except:
        #         sys.exit("Web Driver is missing")
        else:
            sys.exit('Choose either chrome or firefox for browser.')

    def get_product(self, product_name, zip_code):
        self.session.get('https://www.walmart.com/search/?query=' + product_name)

        URLS = self.get_product_urls(product_name)

        product_information = [] #List of dictionaries, containing product information

        session = requests.Session()
        session.put('https://www.walmart.com/account/api/location',
                    data={'postalCode': zip_code, 'clientName': 'Web-Header-NDToggleBar', 'persistLocation': 'true'})

        for url in URLS:
            product_information.append(self.parse_product_link(url,session))

        return product_information

    def get_product_urls(self, queryString):
        self.session.get('https://www.walmart.com/search/?query=' + queryString)
        URLS = []
        for link in self.driver.find_element_by_class_name('search-product-result').find_elements_by_tag_name('a'):
            if (link.get_attribute('class') == 'search-result-productimage gridview display-block'):
                URLS.append(link.get_attribute('href'))
        return URLS

    #Requests + selenium combo?
    def parse_product_link(self, url, session):
        print('Opening url: ' + url) #debugging
        page = session.get(url, headers={"User-Agent": "Mozilla/5.0"})
        soup = BeautifulSoup(page.text, 'lxml')

        # Product Title
        try:
            product_title = soup.find(class_='prod-ProductTitle prod-productTitle-buyBox font-bold').get_text()
        except:
            product_title = 'N/A'
            print('    ERROR PRODUCT TITLE NOT FOUND: ' + url)

        # Rating
        try:
            rating = soup.find(class_='ReviewsHeader-ratingPrefix font-bold').get_text()
        except:
            rating = 'N/A'
            print('    ERROR RATING NOT FOUND: ' + url)

        # Price
        dollar = soup.select_one(
            '#price > div > span.hide-content.display-inline-block-m > span > span.price-group > span.price-characteristic')
        cent = soup.select_one(
            '#price > div > span.hide-content.display-inline-block-m > span > span.price-group > span.price-mantissa')

        if (dollar != None and cent != None):
            price = dollar.text + '.' + cent.text
        else:
            price = 'N/A'
            print('    ERROR PRICE NOT FOUND: ' + url)

        # Return dictionary of product information
        information = {
            'product_title': product_title,
            #'product_identifier': 'requests-version',
            'price': price,
            'ratings': rating,
            #'stock_status': 'requests-version'
        }
        return information

    def __del__(self):
        try:
            self.driver.close()
        except:
            print('Driver does not exist')

if __name__ == "__main__":
    scraper = WalmartScraper()
    apples = scraper.get_product('apples', '77840')
    for item in apples:
        print("Item Name: " + item['product_title'])
        #print("Product ID: " + item['product_identifier'])
        print("Price: " + item['price'])
        print("Rating: " + item['ratings'])
        #print("Stock Status: " + item['stock_status'])
        print()