from bs4 import BeautifulSoup
import requests

# The goal is to have a get_products functions that returns a list of prices given a string query,
# Parse_link function that gets the name, price,
# price per unit, and image URL of a specific item. See Ryan's Walmart scraper for examples.

# HEB Scraper Class
class HEBScraper():
    def __init__(self):
        pass

    def getProudcts(self, product):
        # Get the links of all items of this type
        product_links = []
        self.getLinks(product, product_links)

        # Use the links to parse and obtain information
        item_details = []
        for product in product_links:
            item_details.append(self.parseLink(product))

        return item_details

    def getLinks(self, link_name, url_links):
        # Link to the given bs4, making sure that it isn't the first page
        if '/search' in link_name:
            url = "https://www.heb.com" + link_name
        else:
            url = "https://www.heb.com/search/?q=" + link_name

        page = requests.get(url)
        # Check if the page was opened successfully
        print(page)

        soup = BeautifulSoup(page.text, 'html.parser')
        # Get URL's of each item
        for links in soup.find_all("li", {'class': 'responsivegriditem product-grid-large-fifth product-grid-small-6'}):
            url_links.append("https://www.heb.com/" + links.a.get('href'))

        # Check if there are more pages
        new_page = soup.find('nav', {'class': 'paging-container'})
        page_links = new_page.find_all('div')

        for page in page_links:
            if 'Next' in page.text:
                next_link = page.a.get('href')
                self.getLinks(next_link, url_links)

    def parseLink(self, url):
        # Open url-link
        page = requests.get(url)
        soup = BeautifulSoup(page.text, 'html.parser')

        # Find values of each attribute

        # Get the products name
        try:
            title_section = soup.find('h1', {'itemprop': 'name'})
            product_title = title_section.text
        except:
            product_title = "N/A"
            pass

        # Get the products price
        try:
            price = soup.find('div', {'class': 'sale2'})
            priceString = ' '.join(price.text.split())
        except:
            priceString = "N/A"
            pass

        # Get the products image
        try:
            image = soup.find('div', {'class' : 'pdp-mobile-image-container'})
            image_link = image.img.get('src')
        except:
            image_link = 'N/A'
            pass

        # Get the products rating
        ratingString = "N/A"


        # #Return dictionary of product information
        product_details = {'product-title': product_title, 'price': priceString, 'image': image_link, 'rating': ratingString}
        return product_details

# Execution of Main Program
scraper = HEBScraper()
product_name = 'lettuce'
item_list = scraper.getProudcts(product_name)

# Printing results
for item in item_list:
    print("Item Name: " + item['product-title'])
    print("Price: " + item['price'])
    print("Image: " + item['image'])
    print("Rating: " + item['rating'])
    print ("")