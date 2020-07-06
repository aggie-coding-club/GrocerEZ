
import requests
import final_scrape_heb

def test_searching_for_products_works(monkeypatch):
    # arrange
    class MockText:
        text = open('heb_lettuce_search_full.html').read()
    def mock_parse_link(_):
        return {'product-title' : 'Lettuce', 'price' : '1.22'}

    monkeypatch.setattr(requests, 'get', lambda _ : MockText())
    monkeypatch.setattr(final_scrape_heb, 'parseLink', mock_parse_link)

    # act
    scraper = final_scrape_heb.HEBScraper()
    products = scraper.getProduct('apple')

    # assert
    assert len(products) == 60
