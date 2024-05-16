// produitMicroservice.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Charger le fichier produit.proto
const produitProtoPath = 'produit.proto';
const produitProtoDefinition = protoLoader.loadSync(produitProtoPath, {
keepCase: true,
longs: String,
enums: String,
defaults: true,
oneofs: true,
});
const produitProto = grpc.loadPackageDefinition(produitProtoDefinition).produit;
// Implémenter le service produit
const produitService = {
getproduit: (call, callback) => {
// Récupérer les détails du film à partir de la base de données
const produit = {
id: call.request.produit_id,
title: 'Exemple de film',
description: 'Ceci est un exemple de film.',
// Ajouter d'autres champs de données pour le film au besoin
};
callback(null, { produit });
},
searchproduits: (call, callback) => {
const { query } = call.request;
// Effectuer une recherche de films en fonction de la requête
const produits = [
{
id: '1',
title: ' produit 1',
description: 'produit alimentaire',
},
{
id: '2',
title: 'produit 2',
description: 'produit biologique',
},

];
callback(null, { produits });
},

};
// Créer et démarrer le serveur gRPC
const server = new grpc.Server();
server.addService(produitProto.produitService.service, produitService);
const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(),
(err, port) => {
if (err) {
console.error('Échec de la liaison du serveur:', err);
return;
}
console.log(`Le serveur s'exécute sur le port ${port}`);
server.start();
});
console.log(`Microservice de films en cours d'exécution sur le port ${port}`);