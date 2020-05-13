from bs4 import BeautifulSoup
import requests

def parseLink(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')

    product_title = soup.find(class_='prod-ProductTitle font-normal').get_text()
    rating = soup.find(class_='ReviewsHeader-ratingPrefix font-bold').get_text()
    dollars = soup.find('span', {'class': 'price-characteristic'}).get_text()
    cents = soup.find('span', {'class': 'price-mantissa'}).get_text()
    price = float(dollars + '.' + cents)

    #Return dictionary of product information
    product_details = {'product-title' : product_title, 'price' : str(price), 'rating' : rating}
    return product_details

def getProducts(query):
    url = "http://www.walmart.com/search/?query=" + query
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    products = []
    #Find links for each search result, and parse
    for links in soup.find_all("a", class_='search-result-productimage gridview display-block'):
        products.append(parseLink("https://walmart.com" + links.get('href')))
    #Return list of dictionaries
    return products

'''    
# Execution of Main Program
test_query = "lettuce"
products = getProducts(test_query)

for item in products:
    print("Item Name: " + item['product-title'])
    print("Price: " + item['price'])
    print("Rating: " + item['rating'])
    print("")
'''
