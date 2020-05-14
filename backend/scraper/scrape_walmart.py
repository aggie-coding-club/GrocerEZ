from bs4 import BeautifulSoup
import requests
import psycopg2

con = psycopg2.connect("dbname='ddjr78vh1cvcc4' user='xpcdulaqqancpa' host='ec2-34-200-72-77.compute-1.amazonaws.com' password='0616d8130a659a869dacb11768aaf0d8f87f741b19fc8bf46d3af34c78f5ca85'")
cur = con.cursor()

def parseLink(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')

    product_title = soup.find(class_='prod-ProductTitle font-normal').get_text()

    rating = soup.find(class_='ReviewsHeader-ratingPrefix font-bold')
    if(rating != None):
        rating = rating.text
    else:
        rating = "N/A"

    dollars = soup.find('span', {'class': 'price-characteristic'})
    if(dollars != None):
        dollars = dollars.text
    else:
        dollars = "0"
    
    cents = soup.find('span', {'class': 'price-mantissa'})
    if(cents != None):
        cents = cents.text
    else:
        cents = "0"

    price = float(dollars + '.' + cents)

    #Return dictionary of product information
    product_details = { 'product-title' : product_title, 'price' : str(price), 'rating' : rating}
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

    
# Execution of Main Program
query = "broccoli"
products = getProducts(query)
#print('\n', products, '\n')
print(len(products))
count = 0


cur.execute("delete from \"Item\"")
con.commit()


for item in products:
    try:
        #variables
        name = item['product-title']
        store = "Walmart"
        pricee = float(item['price'])
        ppu = 0.00
        #end Variables

        cur.execute('INSERT INTO "Item" (name, price, priceperunit, store) VALUES(%s, %s, %s, %s)', [name, pricee, ppu, store])
        con.commit()

        #print("Item Name: " + name)
        #print("Price: " + pricee)
        #print("Rating: " + item['rating'])
        #print("")
        count += 1
    except Exception as e:
        print(e)
        continue

print(count)
