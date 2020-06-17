from bs4 import BeautifulSoup
import requests

# Header for bypassing bot checking (Working - 06/16, 9:33 pm)
headers = {'user-agent' : 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Mobile Safari/537.36',
           'accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
           'accept-encoding' : 'gzip, deflate, br',
           'accept-language': 'en-US,en;q=0.9',
           'cache-control' : 'max-age=0',
           'cookie' : 'userPrefLanguage=en_US; USER_SELECT_STORE=false; CURR_SESSION_STORE=92; _gcl_au=1.1.1379124136.1589985347; _ga=GA1.2.1106097113.1589985347; _scid=dc251918-0e04-4953-ba08-6cc5f6250ee4; sandy-client-id=3d38f697b082ddbd; gig_bootstrap_3_iM4mpNrwf3TKCmiahX3u_YoED0yBUws0tIuBqaMdM-wZHCNhNGPHTcO7-nApNhEK=_gigya_ver3; kampyle_userid=d7f4-d40f-7e82-ff86-e285-8b05-090c-71bd; cd_user_id=17232931f803a4-0ec868ab9feb26-f7d1d38-384000-17232931f819d2; _pin_unauth=dWlkPU9EVm1NR05rTmpZdE56Wm1NaTAwT0dFNExXSTFPVGd0WldWaFpHUmtaalZtWlRWaA; kampyleUserSession=1591916200826; kampyleUserSessionsCount=33; kampyleSessionPageCounter=1; recentlyViewedProducts=2060014,757057,985092,2839071,1339604,895547,1738263,1592225,320662,1810018; visid_incap_2302070=XfnPjGAcQriaWghF1yM/zpa24l4AAAAAQkIPAAAAAACAcu2UAWMHIT3SpTCkEYdqgEOmS3acyPfx; _sctr=1|1592197200000; sessionContext=curbside; JSESSIONID=LyVOdL4FZR56hZIDWxhCgvCNjc2bkc7Bd3vNAXyP; incap_ses_980_2302070=LrbgVow89yGhvTbH1aiZDYp06V4AAAAAGHceyuD2dOSOGIX+FwaeRw==; AMP_TOKEN=%24NOT_FOUND; _gid=GA1.2.1188689239.1592358030; _derived_epik=dj0yJnU9WUtoaTE0RHN1VFhrUm9jYmk4UGFXVy04VFNfaVIzNk0mbj14UWRVMTdFUmh5UnBMY3NCdWRRYkRBJm09NyZ0PUFBQUFBRjdwZkNN; _uetsid=37dde321-ed2d-3407-59c3-ad2dcc0bb9a3; _uetvid=8cff1516-10d8-dac4-a955-20c927973172; AWSALB=kE2/cu/Ip1vT84SCVssbZVLe1P1l75w3XfgmhbwCgZSWotG6nFOAvvEaPULH+WxfotUUhKtyPuEEXKwfHamXbHuoyUuFyyKTSa/m59nw8PioAp5mGbBk+LQtzvYX; AWSALBCORS=kE2/cu/Ip1vT84SCVssbZVLe1P1l75w3XfgmhbwCgZSWotG6nFOAvvEaPULH+WxfotUUhKtyPuEEXKwfHamXbHuoyUuFyyKTSa/m59nw8PioAp5mGbBk+LQtzvYX',
           'referer' : 'https://www.google.com/',
           'sec-fetch-dest' : 'document',
           'sec-fetch-mode' : 'navigate',
           'sec-fetch-site' : 'same-origin',
           'sec-fetch-user' : '?1',
           'upgrade-insecure-requests' : '1'
          }

# HEB Scraper Class
class HEBScraper():
    def __init__(self):
        pass

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

        page = requests.get(url, headers=headers)
        # Check if the page was opened successfully (<Response [200]>)
        print(page)

        soup = BeautifulSoup(page.text, 'html.parser')
        # Get URL's of each item
        for links in soup.find_all("li", {'class': 'responsivegriditem product-grid-large-fifth product-grid-small-6'}):
            url_links.append("https://www.heb.com/" + links.a.get('href'))

    def parseLink(self, url):
        # Open url-link
        page = requests.get(url, headers=headers)
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
