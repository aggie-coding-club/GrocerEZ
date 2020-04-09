from bs4 import BeautifulSoup
import requests

res = requests.get('https://www.walmart.com/ip/Pink-Lady-Apple-each/44390980')

soup = BeautifulSoup(res.text, 'html.parser')
print(soup.title)

#Checks if the item is in stock
#Can be improved in efficiency
#Binary search for in stock element if stock is not first tag
stock = list(soup.findAll('span', {'class': 'font-bold'}))
for s in stock:
  if "In stock" in str(s):
    print("In Stock")


#Finds the cloeset location of the item
#Can be improved by implenting a regex match
loc = list(soup.findAll('span', {'class': None}))
location = ""
for l in loc:
  if "at" in str(l.text):
    location = str(l.text)
    break
location = location[3:]
print(location)


#Finds the extra info of the item
#e.g Dairy Free, Gluten Free, Nut Free
extraInfo = list(soup.find('ul', {'class': 'product-health360-highlights'}))
extraInfoList = []
for info in extraInfo:
  extraInfoList.append(info.text)
print(extraInfoList)


dollars = soup.find('span', {'class': 'price-characteristic'}).text
cents = soup.find('span', {'class': 'price-mantissa'}).text
price = float(dollars + '.' + cents)
print(price)

#Finds the price per pound of the item
pricePerPound = soup.find('div', {'class': 'prod-ProductOffer-ppu'}).text
print(pricePerPound)
print(float(pricePerPound[1:5]))
