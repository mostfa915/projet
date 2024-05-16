// resolvers.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Charger les fichiers proto pour les films et les séries TV
const ProduitProtoPath = 'Produit.proto';
const categorieProtoPath = 'categorie.proto';
const ProduitProtoDefinition = protoLoader.loadSync(ProduitProtoPath, {
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
const ProduitProto = grpc.loadPackageDefinition(ProduitProtoDefinition).Produit;
const categorieProto = grpc.loadPackageDefinition(categorieProtoDefinition).categorie;
// Définir les résolveurs pour les requêtes GraphQL
const resolvers = {
Query: {
Produit: (_, { id }) => {
// Effectuer un appel gRPC au microservice de films
const client = new ProduitProto.ProduitService('localhost:50051',
grpc.credentials.createInsecure());
return new Promise((resolve, reject) => {
client.getProduit({ ProduitId: id }, (err, response) => {
if (err) {
reject(err);
} else {
resolve(response.Produit);
}
});
});
},
Produits: () => {
// Effectuer un appel gRPC au microservice de films
const client = new ProduitProto.ProduitService('localhost:50051',
grpc.credentials.createInsecure());
return new Promise((resolve, reject) => {
client.searchProduits({}, (err, response) => {
if (err) {
reject(err);
} else {
resolve(response.Produits);
}
});
});
},



categorie: (_, { id }) => {
// Effectuer un appel gRPC au microservice de séries TV
const client = new categorieProto.categorieService('localhost:50052',
grpc.credentials.createInsecure());
return new Promise((resolve, reject) => {
client.getcategorie({ categorieId: id }, (err, response) => {
if (err) {
reject(err);
} else {
resolve(response.tv_show);
}
});
});
},
categories: () => {
// Effectuer un appel gRPC au microservice de séries TV
const client = new categorieProto.categorieService('localhost:50052',
grpc.credentials.createInsecure());
return new Promise((resolve, reject) => {
client.searchcategories({}, (err, response) => {
if (err) {
reject(err);
} else {
resolve(response.tv_shows);
}
});
});
},
},
};
module.exports = resolvers;