"""Dependency-free structural checks: python3 -m unittest discover -s tests."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, urlsplit
import unittest

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.elements = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))


class SiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (ROOT / 'index.html').read_text()
        cls.page = Page(cls.html)

    def test_unique_ids(self):
        ids = [a['id'] for _, a in self.page.elements if 'id' in a]
        self.assertEqual([], [i for i, n in Counter(ids).items() if n > 1])

    def test_all_anchor_targets_exist(self):
        ids = {a['id'] for _, a in self.page.elements if 'id' in a}
        for tag, attrs in self.page.elements:
            href = attrs.get('href', '')
            if tag == 'a' and href.startswith('#'):
                self.assertIn(href[1:], ids)

    def test_local_assets_exist(self):
        for tag, attrs in self.page.elements:
            for key in ('src', 'href'):
                url = attrs.get(key, '')
                parsed = urlsplit(url)
                if url and not parsed.scheme and not url.startswith('#'):
                    self.assertTrue((ROOT / parsed.path).is_file(), url)

    def test_external_tabs_are_safe(self):
        for tag, attrs in self.page.elements:
            if tag == 'a' and attrs.get('target') == '_blank':
                self.assertIn('noopener', attrs.get('rel', '').split())

    def test_one_main_heading_and_one_video(self):
        self.assertEqual(1, sum(tag == 'h1' for tag, _ in self.page.elements))
        self.assertEqual(1, sum(tag == 'main' for tag, _ in self.page.elements))
        videos = [a for tag, a in self.page.elements if tag == 'iframe']
        self.assertEqual(1, len(videos))
        self.assertIn('player.vimeo.com/video/1045527155', videos[0]['src'])
        self.assertTrue(videos[0].get('title'))
        self.assertIn('allowfullscreen', videos[0])

    def test_verified_contact_destinations(self):
        links = [a.get('href', '') for tag, a in self.page.elements if tag == 'a']
        whatsapp = [urlsplit(u) for u in links if urlsplit(u).hostname == 'api.whatsapp.com']
        self.assertGreaterEqual(len(whatsapp), 3)
        for url in whatsapp:
            query = parse_qs(url.query)
            self.assertEqual(['5512991358013'], query['phone'])
            self.assertIn('PK Films', query['text'][0])
        self.assertIn('mailto:pkdrones34@gmail.com', links)
        self.assertIn('https://www.instagram.com/__pkfilms/', links)
        self.assertNotIn('pk_drones', self.html)
        self.assertNotIn('pkfotografia.fotto.com.br', self.html)
        self.assertNotIn('popup-container', self.html)
        self.assertNotIn('close-popup', (ROOT / 'js/index.js').read_text())

    def test_brand_metadata_and_age(self):
        self.assertIn('<title>PK Films', self.html)
        self.assertIn('name="description"', self.html)
        self.assertNotRegex(self.html, r'tenho\s+\d+\s+anos')
        self.assertNotIn('PK Drones', self.html)
        self.assertIn('AW-17087115255', self.html)
        self.assertIn('href="https://pkdrones.com.br/"', self.html)

    def test_images_have_accessible_alternatives(self):
        for tag, attrs in self.page.elements:
            if tag == 'img':
                self.assertIn('alt', attrs)
                self.assertIn('width', attrs)
                self.assertIn('height', attrs)

    def test_refresh_is_loaded_after_base_css(self):
        styles = [a['href'] for tag, a in self.page.elements
                  if tag == 'link' and a.get('rel') == 'stylesheet']
        self.assertLess(styles.index('css/style.css'), styles.index('css/refresh.css'))


if __name__ == '__main__':
    unittest.main()
