
import requests
import Scraper

def test_searching_for_products_works(monkeypatch):
    # arrange
    class MockText:
        text = open('heb_lettuce_search.html').read()
    def mock_parse_link(_):
        return {'product-title' : 'Lettuce', 'price' : '1.22'}

    monkeypatch.setattr(requests, 'get', lambda _ : MockText())
    monkeypatch.setattr(scrape_heb, 'parseLink', mock_parse_link)

    # act
    products = scrape_heb.getProduct('apple')

    # assert
    assert len(products) == 60