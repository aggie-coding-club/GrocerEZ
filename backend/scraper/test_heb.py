
import requests
import os
import scrape_heb

def test_searching_for_products_works(monkeypatch):
    # arrange
    # mock requests
    class MockText:
        text = open(os.path.join(os.path.dirname(__file__), 'heb_lettuce_search.html')).read()
    monkeypatch.setattr(requests, 'get', lambda _, headers : MockText())

    # mock parsing individual links
    scraper = scrape_heb.HEBScraper()
    def mock_parse_link(_):
        return {'product-title' : 'Lettuce', 'price' : '1.22'}
    monkeypatch.setattr(scraper, 'parseLink', mock_parse_link)

    # act
    products = scraper.getProduct('lettuce')

    # assert
    assert len(products) == 60
