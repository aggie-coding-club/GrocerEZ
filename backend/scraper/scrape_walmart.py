from selenium import webdriver
from bs4 import BeautifulSoup
import requests

from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
import time

ZIPCODE = '77841'

driver_path = r'C:/Users/Ryan/Desktop/Web Drivers/chromedriver.exe'

class WalmartScraper:
    zipSet = False
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        self.driver = webdriver.Chrome(driver_path, options=chrome_options)

    def getProduct(self, productName):
        self.driver.get('https://www.walmart.com/search/?query=' + productName)
        URLS = self.getProductUrls(productName)

        productInformation = [] #List of dictionaries, containing product information

        session = requests.Session()
        session.put('https://www.walmart.com/account/api/location',
                    data={'postalCode': ZIPCODE, 'clientName': 'Web-Header-NDToggleBar', 'persistLocation': 'true'})

        for url in URLS:
            productInformation.append(self.parseProductLink(url,session))

        return productInformation

    def getProductUrls(self, queryString):
        self.driver.get('https://www.walmart.com/search/?query=' + queryString)
        URLS = []
        for link in self.driver.find_element_by_class_name('search-product-result').find_elements_by_tag_name('a'):
            if (link.get_attribute('class') == 'search-result-productimage gridview display-block'):
                URLS.append(link.get_attribute('href'))
        return URLS

    #Requests + selenium combo?
    def parseProductLink(self, url, session):
        print('Opening url: ' + url) #debugging
        page = session.get(url, headers={"User-Agent": "Mozilla/5.0"})
        soup = BeautifulSoup(page.text, 'lxml')
        try:
            product_title = soup.find(class_='prod-ProductTitle font-normal').get_text()
        except:
            product_title = 'ERROR: ' + url
        try:
            rating = soup.find(class_='ReviewsHeader-ratingPrefix font-bold').get_text()
        except:
            rating = 'ERROR: ' + url
        dollar = soup.select_one(
            '#price > div > span.hide-content.display-inline-block-m > span > span.price-group > span.price-characteristic')
        cent = soup.select_one(
            '#price > div > span.hide-content.display-inline-block-m > span > span.price-group > span.price-mantissa')

        if (dollar != None and cent != None):
            price = dollar.text + '.' + cent.text
        else:
            price = 'ERROR: ' + url

        # Return dictionary of product information
        information = {
            'product_title': product_title,
            'product_identifier': 'requests-version',
            'price': price,
            'ratings': rating,
            'stock_status': 'requests-version'
        }
        return information

    def destructor(self):
        self.driver.close()

scraper = WalmartScraper()
apples = scraper.getProduct('apples')
scraper.destructor()
for item in apples:
    print("Item Name: " + item['product_title'])
    print("Product ID: " + item['product_identifier'])
    print("Price: " + item['price'])
    print("Rating: " + item['ratings'])
    print("Stock Status: " + item['stock_status'])
    print()
