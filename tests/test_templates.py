import pytest
from bs4 import BeautifulSoup

def test_index_template(client):
    """Vérifie que le template 'index.html' affiche le titre correct."""
    response = client.get('/')
    assert response.status_code == 200
    soup = BeautifulSoup(response.data, 'html.parser')
    title = soup.find('title').text
    assert "WildLens - Détection d'empreintes de mammifères" in title

def test_navbar_links(client):
     """Vérifie que la barre de navigation contient les liens attendus."""
     response = client.get('/')
     assert response.status_code == 200
     soup = BeautifulSoup(response.data, 'html.parser')
     navbar = soup.find('nav', class_='navbar')
     assert navbar is not None
     links = navbar.find_all('a', class_='nav-link')
     link_texts = [link.text.strip() for link in links] 
     assert "Accueil" in link_texts
     assert "Détecter" in link_texts
     assert "Galerie" in link_texts
     assert "À propos" in link_texts

def test_hero_section_content(client):
     """Vérifie que la section 'hero' affiche le texte principal."""
     response = client.get('/')
     assert response.status_code == 200
     soup = BeautifulSoup(response.data, 'html.parser')
     hero_section = soup.find('section', class_='hero-section')
     assert hero_section is not None
     heading = hero_section.find('h1', class_='display-4')
     assert heading is not None
     assert "Identifiez les empreintes de mammifères" in heading.text

def test_footer_copyright(client):
     """Vérifie que le pied de page affiche les informations de copyright."""
     response = client.get('/')
     assert response.status_code == 200
     soup = BeautifulSoup(response.data, 'html.parser')
     footer = soup.find('footer', class_='footer')
     assert footer is not None
     copyright_text = footer.find('p', class_='mb-0').text
     assert "© 2025 WildLens. Tous droits réservés." in copyright_text

def test_scan_template_csrf_token(client):
     """Vérifie que le template scan.html inclut un champ CSRF."""
     response = client.get('/')
     assert response.status_code == 200
     soup = BeautifulSoup(response.data, 'html.parser')
     csrf_token_input = soup.find('input', {'name': 'csrfToken'})
     assert csrf_token_input is not None
     assert csrf_token_input.get('type') == 'hidden'