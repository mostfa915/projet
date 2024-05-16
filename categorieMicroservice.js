// categorieMicroservice.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Charger le fichier categorie.proto
const categorieProtoPath = 'categorie.proto';
const categorieProtoDefinition = protoLoader.loadSync(categorieProtoPath, {
keepCase: true,
longs: String,
enums: String,
defaults: true,
oneofs: true,
});
const categorieProto = grpc.loadPackageDefinition(categorieProtoDefinition).categorie;
// Implémenter le service de séries TV
const categorieService = {
getcategorie: (call, callback) => {
// Récupérer les détails de la série TV à partir de la base de données
const tv_show = {
id: call.request.tv_show_id,
title: 'Exemple de série TV',
description: 'Ceci est un exemple de série TV.',
// Ajouter d'autres champs de données pour la série TV au besoin
};
callback(null, { tv_show });
},
searchcategories: (call, callback) => {
const { query } = call.request;
// Effectuer une recherche de séries TV en fonction de la requête
const tv_shows = [
{
id: '1',
title: 'Exemple de série TV 1',
description: 'Ceci est le premier exemple de série TV.',
},
{
id: '2',
title: 'Exemple de série TV 2',
description: 'Ceci est le deuxième exemple de série TV.',
},
// Ajouter d'autres résultats de recherche de séries TV au besoin
];
callback(null, { tv_shows });
},
// Ajouter d'autres méthodes au besoin
};
// Créer et démarrer le serveur gRPC
const server = new grpc.Server();
server.addService(categorieProto.categorieService.service, categorieService);
const port = 50052;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(),
(err, port) => {
if (err) {
console.error('Échec de la liaison du serveur:', err);
return;
}
console.log(`Le serveur s'exécute sur le port ${port}`);
server.start();
});
console.log(`Microservice de séries TV en cours d'exécution sur le port
${port}`);