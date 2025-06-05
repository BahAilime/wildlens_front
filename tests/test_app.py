import pytest

def test_index_route(client):
    """Vérifie que la route '/' renvoie une réponse 200 OK et le template correct."""
    response = client.get('/')
    assert response.status_code == 200
    assert b"Identifiez les empreintes de mammif" in response.data

def test_home_route(client):
    response = client.get('/home')
    assert response.status_code == 200
    assert b"couvrez les animaux sauvages en scannant leurs empreintes." in response.data

def test_scan_route(client):
    response = client.get('/scan')
    assert response.status_code == 200
    assert b"Scannez une empreinte" in response.data