from bs4 import BeautifulSoup
import requests

# HEB Scraper Class
class HEBScraper():
    def __init__(self):
        pass

    def getProduct(self, product):
        # Get the links of all items of this type
        product_links = []
        self.getLinks(product, product_links)

        # Use the links to parse and obtain information (Using List Comprehensions)
        item_details = [self.parseLink(product) for product in product_links]

        return item_details

    def getLinks(self, link_name, url_links):
        # Link to the given bs4, making sure that it isn't the first page
        # Pages differ in No=__ & Ntt=__&q=__
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
        # Fixed issue where the code picked up the image tag instead of the actual item image
        try:
            image = soup.find('div', {'class' : 'pdp-mobile-image-container'})
            image_link = image.find('img', {'class' : 'pdp-mobile-image'})
            image_link = image_link.get('src')
        except:
            image_link = None
            pass

        # Get the products rating
        rating_string = None


        # Return dictionary of product information
        product_details = {'product-title': product_title, 'price': priceString, 'image': image_link, 'rating': ratingString}
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

        print()
