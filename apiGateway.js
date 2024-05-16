// apiGateway.js
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require ('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Charger les fichiers proto pour les films et les séries TV
const produitProtoPath = 'produit.proto';
const categorieProtoPath = 'categorie.proto';
const resolvers = require('./resolvers');
const typeDefs = require('./schema');
// Créer une nouvelle application Express
const app = express();
const produitProtoDefinition = protoLoader.loadSync(produitProtoPath, {
keepCase: true,
longs: String,
enums: String,
defaults: true,
oneofs: true,
});
const categorieProtoDefinition = protoLoader.loadSync(categorieProtoPath, {
keepCase: true,
longs: String,
enums: String,
defaults: true,
oneofs: true,
});
const produitProto = grpc.loadPackageDefinition(produitProtoDefinition).produit;
const categorieProto = grpc.loadPackageDefinition(categorieProtoDefinition).categorie;
// Créer une instance ApolloServer avec le schéma et les résolveurs importés
const server = new ApolloServer({ typeDefs, resolvers });
// Appliquer le middleware ApolloServer à l'application Express
server.start().then(() => {
app.use(
cors(),
bodyParser.json(),
expressMiddleware(server),
);
});
app.get('/produits', (req, res) => {
    const client = new produitProto.produitService('localhost:50051',
    grpc.credentials.createInsecure());
    client.searchproduits({}, (err, response) => {
    if (err) {
    res.status(500).send(err);
    } else {
    res.json(response.produits);
    }
    });
    });
    app.get('/produits/:id', (req, res) => {
    const client = new produitProto.produitService('localhost:50051',
    grpc.credentials.createInsecure());
    const id = req.params.id;
    client.getproduit({ produitId: id }, (err, response) => {
    if (err) {
    res.status(500).send(err);
    } else {
    res.json(response.produit);
    }
    });
    });
    app.get('/categories', (req, res) => {
    const client = new categorieProto.categorieService('localhost:50052',
    grpc.credentials.createInsecure());
    client.searchcategories({}, (err, response) => {
    if (err) {
    res.status(500).send(err);
    } else {
    res.json(response.tv_shows);
    }
    });
    });
    app.get('/categories/:id', (req, res) => {
    const client = new categorieProto.categorieService('localhost:50052',
    grpc.credentials.createInsecure());
    const id = req.params.id;
    client.getcategorie({ categorieId: id }, (err, response) => {
    if (err) {
    res.status(500).send(err);
    } else {
    res.json(response.tv_show);
    }
    });
    });
    // Démarrer l'application Express
    const port = 3000;
    app.listen(port, () => {
    console.log(`API Gateway en cours d'exécution sur le port ${port}`);
    });