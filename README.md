#### ⚠️ Disclaimer : Ce code a été généré par Cursor et n’est pas du tout optimal. Il peut servir de base, mais n’hésite pas à l’adapter et l’améliorer. Amuse-toi bien 🙂

# Visualisation des Jointures SQL

Ce projet est une application Electron simple pour visualiser et expérimenter avec différents types de jointures SQL (INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, etc.). Il permet de modifier les données de deux tables d'exemple (Table A et Table B), de sélectionner un type de jointure et de voir le résultat en temps réel, ainsi que la requête SQL correspondante et un diagramme de Venn illustrant la jointure.

## Comment lancer l'application

1. Assurez-vous d'avoir Node.js et npm installés.
2. Clonez ce dépôt sur votre machine locale.
3. Ouvrez un terminal dans le répertoire racine du projet.
4. Installez les dépendances :
   ```bash
   npm install
   ```
5. Lancez l'application :
   ```bash
   npm start
   ```

## Schémas des Jointures SQL

Voici un schéma illustrant les différents types de jointures SQL:

<!-- REMPLACEZ LE CHEMIN CI-DESSOUS PAR LE CHEMIN RÉEL DE VOTRE IMAGE DANS LE DÉPÔT OU UNE URL PUBLIQUE -->
![Schémas des Jointures SQL](images/sql_joins.jpg)

## Fonctionnalités

* Visualisation interactive des différents types de jointure.
* Modification des données des tables A et B.
* Affichage du résultat de la jointure en temps réel.
* Affichage de la requête SQL correspondante.
* Diagrammes de Venn illustrant les jointures.
* Bouton pour réinitialiser les tables aux données d'exemple.

## Prompt de Génération du Projet

"Créez une application Electron qui permet de visualiser et d'expérimenter avec différents types de jointures SQL. L'application devrait :
1. Avoir une interface utilisateur avec deux tables modifiables (A et B).
2. Permettre de visualiser les différents types de jointures SQL (INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, LEFT JOIN WHERE B.key IS NULL, RIGHT JOIN WHERE A.key IS NULL).
3. Afficher le résultat de la jointure en temps réel.
4. Montrer la requête SQL correspondante.
5. Permettre d'ajouter/supprimer des lignes dans les tables.
6. Permettre de réinitialiser les tables aux données d'exemple initiales.
7. Avoir un design moderne et intuitif."

Le projet utilise Electron comme framework, HTML/CSS pour l'interface et JavaScript pour la logique, avec un accent sur un design moderne. 
