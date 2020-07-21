from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import requests

# HEB Scraper Class
class HEBScraper():
    def __init__(self):
        browser = webdriver.Chrome(ChromeDriverManager().install())
        browser.get('https://www.heb.com/')
        # Get cookies for request session
        cookies = browser.get_cookies()
        browser.quit()
        # Creating a session 
        self.s = requests.Session()
        # PLace cookies in the session cookie jar
        [self.s.cookies.set(cookie['name'], cookie['value']) for cookie in cookies]

    def getProduct(self, product):
        # Get the links of all items of this type (Page 1 - 60 items)
        product_links = []
        self.getLinks(product, product_links)
        # Use the links to parse and obtain information
        item_details = [self.parseLink(product) for product in product_links]

        return item_details

    def getLinks(self, link_name, url_links):
        # Link to the given bs4, first page (60 items)
        url = "https://www.heb.com/search/?q=" + link_name

        page = self.s.get(url)
        # Check if the page was opened successfully (<Response [200]>)
        print(page)

        soup = BeautifulSoup(page.text, 'html.parser')
        # Get URL's of each item
        for links in soup.find_all("li", {'class': 'responsivegriditem product-grid-large-fifth product-grid-small-6'}):
            url_links.append("https://www.heb.com/" + links.a.get('href'))

    def parseLink(self, url):
        # Open url-link
        page = self.s.get(url)
        soup = BeautifulSoup(page.text, 'html.parser')

        # Find values of each attribute

        # Get the products name
        try:
            title_section = soup.find('h1', {'itemprop': 'name'})
            product_title = title_section.text
        except:
            product_title = None
            pass

        # Get the products price
        try:
            price = soup.find('div', {'class': 'sale2'})
            price_string = ' '.join(price.text.split())
        except:
            price_string = None
            pass

        # Get the products image
        try:
            image = soup.find('div', {'class' : 'pdp-mobile-image-container'})
            image_link = image.find('img', {'class' : 'pdp-mobile-image'})
            image_link = image_link.get('src')
        except:
            image_link = None
            pass

        # Get the products rating
        rating_string = None

        # Get the page.text, if everything pulls up as None
        if((product_title and price_string and image_link) is None):
            page_text = page.text
        else:
            page_text = None

        # Return dictionary of product information
        product_details = {'product-title': product_title, 'price': price_string, 'image': image_link, 'rating': rating_string, 'error_page': page_text}
        return product_details

# Execution of Main Program with a __name__ guard
if __name__ == "__main__":
    scraper = HEBScraper()
    product_name = 'lettuce'
    item_list = scraper.getProduct(product_name)

    # Printing results
    for item in item_list:
        # Check if TypeNone and print a statement

        if (item['product-title'] is None):
            print('Item Name: Could not find the information')
        else:
            print("Item Name: " + item['product-title'])

        if (item['price'] is None):
            print('Price: Could not find the information')
        else:
            print("Price: " + item['price'])

        if (item['image'] is None):
            print('Image: Could not find the information')
        else:
            print("Image: " + item['image'])

        if (item['rating'] is None):
            print('Rating: Could not find the information')
        else:
            print("Rating: " + item['rating'])

        if (item['error_page'] is None):
            print('Page: Could not find the information')
        else:
            print("Page: " + item['error_page'])

        print()
