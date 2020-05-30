from bs4 import BeautifulSoup
import requests

def parseLink(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')

    ##find values of each attribute

    try:
        title_section = soup.find('h1', {'itemprop': 'name'})
        product_title = title_section.text
    except:
        product_title = " "
        pass
    try:
        price = soup.find('div', {'class': 'sale2'})
        priceString = ' '.join(price.text.split())
    except:
        priceString = " "
        pass
    ##Try looking at alt text
    # #counting the amount of full/half stars and adding to obtain the rating of the product
    rating = 0
    fullstars = []
    for stars in soup.find_all("li", {'class': 'star active'}):
        fullstars.append(stars)

    halfs =[]  
    for halfstars in soup.find_all("li", {'class': 'star active-50'}):
        halfs.append(halfstars)

    rating = rating+len(fullstars)
    rating = rating+len(halfs)
    ratingString = str(rating)

    # #Return dictionary of product information
    product_details = { 'product-title' : product_title, 'price' : priceString, 'rating' : ratingString}
    return product_details

def getProducts(query):
    url = "https://www.heb.com/search/?q=" + query
    page = requests.get(url)
    print(page)
    soup = BeautifulSoup(page.text, 'html.parser')
    products = []
    #Find links for each search result, and parse
    for links in soup.find_all("li", {'class' : 'responsivegriditem product-grid-large-fifth product-grid-small-6'}):
        products.append(parseLink("https://www.heb.com/" + links.a.get('href')))
    #Return list of dictionaries
    return products

# Execution of Main Program
query = "lettuce"
products = getProducts(query)

for item in products:
    print("Item Name: " + item['product-title'])
    print("Price: " + item['price'])
    print("Rating: " + item['rating'])
    print ("")
    print("")
