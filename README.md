# SQL Joins Visualizer | Visualiseur de Jointures SQL

<div align="center">

![SQL Joins](images/sql_joins.jpg)

*An interactive Electron application for visualizing SQL joins with real-time Venn diagrams and query generation*

[![Electron](https://img.shields.io/badge/Electron-28.2.3-blue.svg)](https://electronjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-Required-green.svg)](https://nodejs.org/)

</div>

## 🌐 Language | Langue

- [English](#english)
- [Français](#français)

---

## English

### 📋 Overview

SQL Joins Visualizer is an interactive desktop application built with Electron that helps users understand and visualize different types of SQL joins. The application provides real-time visual feedback through Venn diagrams, editable sample tables, and dynamically generated SQL queries.

### ✨ Features

- **Interactive Join Types**: Support for all major SQL join operations
  - INNER JOIN
  - LEFT JOIN
  - RIGHT JOIN
  - FULL OUTER JOIN
  - LEFT JOIN WHERE B.key IS NULL
  - RIGHT JOIN WHERE A.key IS NULL

- **Real-time Visualization**: 
  - Dynamic Venn diagrams showing join relationships
  - Live result tables updating as you modify data
  - Generated SQL queries for each join type

- **Editable Tables**: 
  - Modify sample data in real-time
  - Add and remove rows dynamically
  - Reset to default sample data

- **Modern UI**: Dark theme with intuitive design and smooth interactions

### 🚀 Quick Start

#### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

#### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd jointures-sql
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the application:
   ```bash
   npm start
   ```

### 🏗️ Architecture

#### Project Structure

```
jointures-sql/
├── main.js          # Electron main process
├── index.html       # Application UI structure
├── renderer.js      # Application logic and join algorithms
├── style.css        # Styling and themes
├── package.json     # Project configuration
├── images/          # Assets and documentation images
└── README.md        # This documentation
```

#### Technical Stack

- **Framework**: Electron 28.2.3
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Graphics**: SVG for Venn diagrams
- **Architecture**: Single-page application with renderer process

#### Core Components

1. **Join Engine** (`renderer.js`): Implements all SQL join algorithms in JavaScript
2. **Venn Renderer**: SVG-based visualization of join relationships
3. **Table Manager**: Dynamic table editing and data management
4. **SQL Generator**: Creates SQL queries corresponding to selected joins

### 🔧 Usage

#### Basic Operations

1. **Select Join Type**: Click on any join type in the left sidebar
2. **View Results**: The result table updates automatically
3. **Modify Data**: Click on table cells to edit values
4. **Add Rows**: Use "Add Row" buttons to expand tables
5. **Remove Rows**: Click the "×" button next to any row
6. **Reset Data**: Use "Reset Examples" to restore default data

#### Understanding Join Types

- **INNER JOIN**: Returns only matching records from both tables
- **LEFT JOIN**: Returns all records from left table and matching from right
- **RIGHT JOIN**: Returns all records from right table and matching from left
- **FULL OUTER JOIN**: Returns all records when there's a match in either table
- **LEFT EXCLUDING JOIN**: Returns records from left table with no match in right
- **RIGHT EXCLUDING JOIN**: Returns records from right table with no match in left

### 🎨 Customization

#### Modifying Sample Data

Edit the initial data in `renderer.js`:

```javascript
const initialTableA = [
  { id: 1, nom: 'Alice' },
  { id: 2, nom: 'Bob' },
  { id: 3, nom: 'Chloé' }
];
```

#### Styling

Customize the appearance by modifying `style.css`. The application uses a dark theme with purple accents.

#### Adding Join Types

To add new join types, extend the `joinTypes` object and `computeJoin` function in `renderer.js`.

### 🐛 Troubleshooting

#### Common Issues

- **Application won't start**: Ensure Node.js and npm are installed correctly
- **Black screen**: Check browser console for JavaScript errors
- **Performance issues**: Restart the application or clear cache

#### Development Mode

Enable developer tools by modifying `main.js`:

```javascript
win.webContents.openDevTools();
```

### 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

### 📄 License

This project is open source. Please check the repository for license details.

---

## Français

### 📋 Aperçu

Le Visualiseur de Jointures SQL est une application de bureau interactive construite avec Electron qui aide les utilisateurs à comprendre et visualiser différents types de jointures SQL. L'application fournit un retour visuel en temps réel à travers des diagrammes de Venn, des tables d'exemple modifiables et des requêtes SQL générées dynamiquement.

### ✨ Fonctionnalités

- **Types de Jointures Interactives** : Support pour toutes les opérations de jointure SQL principales
  - INNER JOIN
  - LEFT JOIN  
  - RIGHT JOIN
  - FULL OUTER JOIN
  - LEFT JOIN WHERE B.key IS NULL
  - RIGHT JOIN WHERE A.key IS NULL

- **Visualisation en Temps Réel** :
  - Diagrammes de Venn dynamiques montrant les relations de jointure
  - Tables de résultats en direct se mettant à jour lors de la modification des données
  - Requêtes SQL générées pour chaque type de jointure

- **Tables Modifiables** :
  - Modifier les données d'exemple en temps réel
  - Ajouter et supprimer des lignes dynamiquement
  - Réinitialiser aux données d'exemple par défaut

- **Interface Moderne** : Thème sombre avec design intuitif et interactions fluides

### 🚀 Démarrage Rapide

#### Prérequis

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- npm (fourni avec Node.js)

#### Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-dépôt>
   cd jointures-sql
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez l'application :
   ```bash
   npm start
   ```

### 🏗️ Architecture

#### Structure du Projet

```
jointures-sql/
├── main.js          # Processus principal Electron
├── index.html       # Structure de l'interface utilisateur
├── renderer.js      # Logique applicative et algorithmes de jointure  
├── style.css        # Styles et thèmes
├── package.json     # Configuration du projet
├── images/          # Assets et images de documentation
└── README.md        # Cette documentation
```

#### Stack Technique

- **Framework** : Electron 28.2.3
- **Frontend** : HTML5, CSS3, JavaScript Vanilla
- **Graphiques** : SVG pour les diagrammes de Venn
- **Architecture** : Application monopage avec processus de rendu

### 🔧 Utilisation

#### Opérations de Base

1. **Sélectionner le Type de Jointure** : Cliquez sur n'importe quel type de jointure dans la barre latérale gauche
2. **Voir les Résultats** : La table de résultats se met à jour automatiquement
3. **Modifier les Données** : Cliquez sur les cellules du tableau pour éditer les valeurs
4. **Ajouter des Lignes** : Utilisez les boutons "Ajouter une ligne" pour étendre les tables
5. **Supprimer des Lignes** : Cliquez sur le bouton "×" à côté de n'importe quelle ligne
6. **Réinitialiser les Données** : Utilisez "Réinitialiser les exemples" pour restaurer les données par défaut

### 🎨 Personnalisation

#### Modifier les Données d'Exemple

Éditez les données initiales dans `renderer.js` :

```javascript
const initialTableA = [
  { id: 1, nom: 'Alice' },
  { id: 2, nom: 'Bob' },
  { id: 3, nom: 'Chloé' }
];
```

#### Style

Personnalisez l'apparence en modifiant `style.css`. L'application utilise un thème sombre avec des accents violets.

### 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des pull requests ou à ouvrir des issues pour les bugs et demandes de fonctionnalités.

---

## ⚠️ Disclaimer

Ce code a été généré avec l'aide de Cursor et peut ne pas être optimal. Il peut servir de base, mais n'hésitez pas à l'adapter et l'améliorer. Amusez-vous bien ! 🙂

### 🔗 Ressources Utiles

- [Documentation Electron](https://electronjs.org/docs)
- [Guide des Jointures SQL](https://www.w3schools.com/sql/sql_join.asp)
- [Diagrammes de Venn pour SQL](https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/) 
