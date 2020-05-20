from bs4 import BeautifulSoup
import requests

def parseLink(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')

    ##find values of each attribute
    product_title = soup.find('h1', {'class': 'pdp-product-name'}).get_text()


    # rating = soup.find(class_='ReviewsHeader-ratingPrefix font-bold').get_text()
    ##putting together string for price
    price = soup.find('span', {'id': 'addToCartPrice'}).get_text()
    #Return dictionary of product information
    product_details = { 'product-title' : product_title, 'price' : str(price)}
    return product_details

def getProducts(query):
    url = "https://www.heb.com/search/?q=" + query
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    products = []
    #Find links for each search result, and parse
    for links in soup.find_all("a", class_='search-result-productimage gridview display-block'):
        products.append(parseLink("https://www.heb.com" + links.get('href')))
    #Return list of dictionaries
    return products

# Execution of Main Program
query = "lettuce"
products = getProducts(query)

for item in products:
    print("Item Name: " + item['product-title'])
    print("Price: " + item['price'])
    ##print("Rating: " + item['rating'])
