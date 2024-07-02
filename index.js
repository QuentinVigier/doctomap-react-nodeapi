/**
 * Serveur Express pour la mise en place d'un back-end
 */

const express = require('express');     //Import express
const app = express();      //Application express
const port = 4000;      //Port de démarrage de l'application

app.set('view engine', 'ejs');      //Définir ejs comme moteur de template


//======================================================================
//Route accesible avec get
app.get('/', (req, res) => {
    //res, est une réponse HTTP
    //render, est une méthoden
    res.render('home');
})




//======================================================================
//Démarrage de l'application
app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}`);
});