import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
import pytest
from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()


@pytest.fixture
def client():
    app.config["TESTING"] = True  # Active le mode test
    with app.test_client() as client:
        yield client  # Fournit le client de test
