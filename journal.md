# Journal de Développement - LectoTrack

## Entrée 1: Initialisation du Projet et Serveur de Base (Ticket 1.1)

**Date:** $(date +'%Y-%m-%d %H:%M:%S')

**Ticket Référence:** Ticket 1.1: Setup Node.js/Express Project & Basic Server

**Fonctionnalité Implémentée:**
- Initialisation d'un projet Node.js avec npm.
- Installation des dépendances de base (Express) et de développement (Jest, Supertest).
- Création d'un serveur Express minimal.
- Mise en place d'une structure de projet basique avec `app.js`, `server.js` et `tests/app.test.js`.

**Tests Créés:**
- `tests/app.test.js`:
  - **Objectif:** Vérifier que le serveur répond avec un statut 200 et un message de bienvenue sur la route racine (`GET /`).
  - Utilisation de Jest et Supertest pour les tests d'intégration.

**Décisions de Conception:**
- **Approche TDD:** Les tests ont été écrits avant l'implémentation pour guider le développement.
- **Séparation des préoccupations:** La logique de l'application (routes, middleware) est séparée dans `app.js` et la logique de démarrage du serveur dans `server.js`. Ceci est conforme aux bonnes pratiques pour la maintenabilité et la testabilité (Référence: Specific Deep Research Report for this Ticket - Section X.Y).
- **Export de l'application:** `app.js` exporte l'instance de l'application Express pour permettre les tests via Supertest sans démarrer un serveur HTTP réel.
- **Gestion du port:** Utilisation de `process.env.PORT` pour la flexibilité en production, avec une valeur par défaut (3000) pour le développement.

**Résultats des Tests:**
- Le test initial (avant implémentation) a échoué comme prévu.
- Après l'implémentation minimale dans `app.js`, le test `GET /` est passé avec succès.

```bash
# Résumé de la sortie de test
PASS  tests/app.test.js
  GET /
    ✓ responds with status 200 and a welcome message (XX ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        X.XXX s
Ran all test suites.
``` 