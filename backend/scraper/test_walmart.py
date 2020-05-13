import requests
import scrape_walmart

def test_searching_for_products_works(monkeypatch):
    # arrange
    class MockText:
        text = open('walmart_lettuce_search.html').read()
    def mock_parse_link(_):
        return {'product-title' : 'Lettuce', 'price' : '3.45', 'rating' : '3.9'}

    monkeypatch.setattr(requests, 'get', lambda _ : MockText())
    monkeypatch.setattr(scrape_walmart, 'parseLink', mock_parse_link)

    # act
    products = scrape_walmart.getProducts('apple')

    # assert
    assert len(products) == 40
