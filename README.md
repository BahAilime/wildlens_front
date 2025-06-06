# 🐾 Wildlens

Ce projet, développé dans le cadre du MSPR de l'EPSI (B3 DevIA, spécialité data sciences), utilise l'IA pour classifier des pattes de mammifères et propose une interface web pour interagir avec ce modèle.

## ✨ Fonctionnalités
(ceci concerne uniquement le projet dans son ensemble pas uniquement le frontend)

*   **Classification des Pattes de Mammifères 🧠:** Utilisation de techniques de machine learning pour identifier différents mammifères à partir de leurs empreintes.
*   **Interface Utilisateur Web 💻:** Front end développé avec Django pour faciliter l'utilisation du modèle.
*   **Gestion des Données 💾:**  Script Python pour importer et gérer les données d'animaux dans la base de données.

## 🚀 Installation et Lancement

**Méthode 1: Lancement en développement (Flask)**

1.  **Prérequis:** Assurez-vous d'avoir Python et pip installés.

2.  **Installation des dépendances:**

    ```bash
    pip install -r requirements.txt
    ```

3.  **Configuration:**

    *   Ce dépôt contient uniquement le front end.
    *   Le backend se trouve sur [github.com/bahailime/wildlens_back](https://github.com/bahailime/wildlens_back).
    *   Dans le fichier `.env` du frontend (ce dépôt), renseignez l'adresse IP du backend (voir .env.exemple)

4.  **Lancement du projet:**

    ```bash
    flask run
    ```

    Cela démarrera le serveur de développement.  Ouvrez votre navigateur à l'adresse indiquée par `flask run` (127.0.0.1:5000 probablement)

**Méthode 2: Lancement avec Docker**

1.  **Prérequis:** Docker installé et configuré.

2.  **Build de l'image Docker:**

    ```bash
    docker build -t wildlens-front .
    ```

3.  **Lancement du conteneur Docker:**

    ```bash
    docker run -p 5000:5000 wildlens-front
    ```

    Ouvrez votre navigateur à l'adresse `http://localhost:5000`.

## ⚠️ Dépendances

Le fichier `requirements.txt` contient toutes les dépendances Python nécessaires pour le lancement du frontend. Pensez à l'installer (voir étape 1 de la méthode development). Docker gère les dépendances pour le déploiement conteneurisé.

## 🧪 Tests

Pour lancer les tests, exécutez `pytest` à la racine du projet.

Pour lancer les tests avec le coverage, exécutez `pytest --cov-report xml:cov.xml --cov .` à la racine du projet.

## 🔗 Liens Utiles

*   **Backend:** [github.com/bahailime/wildlens](https://github.com/bahailime/wildlens)
