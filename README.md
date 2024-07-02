# Récapitulatif

## Création d'une API JSON en local de type REST.

### Installation

```bash
pnpm i json-server

# ou

npm i json-server
```

### Utilisation

Les endpoints (points d'accès) sont définis dans le fichier `db.json`.

### Opérations

Il est possible de faire les même opérations de CRUD classique : 

| Opérations | HTTP |
| --------- | ---- |
| Création | POST |
| Récupération | GET |
| Modification | PUT |
| Suppression | DELETE |

#### Exemple avec GET

| Objectif | Endpoint | Paramètres |
| -------- | -------- | ---------- |
| Accès à tous les docteurs | /doctors | aucun|
| Accès à un docteur donné | /doctors/:id | id : int |
| Tri de par ville | /doctors?_sort=city | `_sort` |
| Tri de par ville et  de Z à A | /doctors?_sort=city&_order=desc | `_sort`, `_order` |
| Docteurs par ville | /doctors?city=Paris | donnée du schéma |
| Pagination par 10 | /doctors?_page=1 | `_page` |
| Limite de résultats | /doctors?_limit=7 | `_limit` |

# Backend avec Express

## Installation

```bash
pnpm i express

# ou

npm i express
```

## Utilisation

Pour mette en place un serveur backend avec Express, il faut créer un fichier `index.js` et y mettre le code suivant :

```js
const express = require('express');
const app = express();
const port = 4000;

app.listen(port, () => {
    console.log(`
        Le serveur est en écoute sur le port ${port}
        ctrl+clic (cmd+clic) : http://localhost:${port}
    `);
});
```

Ce code minimal permet de créer et de démarrer un serveur Express sur le port 4000.

Pour lancer le serveur, il faut exécuter le fichier `index.js` :

```bash
node index.js
```

Cependant, il est trop contraignant de couper et relancer le serveur à chaque fois que l'on veut tester quelque chose.

La solution est l'installtion de `nodemon` :

```bash
pnpm i nodemon

# ou

npm i nodemon
```

Une fois nodemon installé, nous allons nous faliciter la vie avec un commande `nodemon` dans le fichier `package.json` :

```json
"scripts": {
    "api": "json-server --watch db.json",
    "start": "nodemon index.js",
    "react": "cd doctomap && pnpm run dev"
  },
```

La commande `pnpm api` va lancer le serveur avec `json-server` et `pnpm nodemon` va lancer le serveur Express.

La commande `npm react` va lancer le serveur `vite` de `/doctomap`.


### Routes

Voici un exemple de route simple avec Express :

#### GET

```js
app.get('/', (req, res) => {
    res.send('Hello World!');
});

Cette route va renvoyer le message "Hello World!" lorsque l'on accède à l'URL `/`. Il est possible de retouner du JSON mais aussi des issues de template avec `ejs`, `jsx`, `hbs` ou `pug`.

Pour cela il faut installer le package `ejs` :

```bash
pnpm i ejs

# ou

npm i ejs
```

Puis, il faut définir l'engine de template `ejs` :

```js
app.set('view engine', 'ejs');
```

Ensuite, il faut créer un fichier `views/home.ejs` avec le contenu suivant :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Serveur Express</title>
</head>
<body>
    <%- include('partials/nav.ejs'); %>
        CONTENU DE HOME
    <%- include('partials/footer.ejs'); %>
</body>
</html>
```

Ce fichier `home.ejs` va contenir le contenu de la page d'accueil, ainsi que les partials `nav.ejs` et `footer.ejs` qui seront définis dans un sous dossier `partials`.