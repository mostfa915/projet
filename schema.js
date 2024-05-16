const { gql } = require('@apollo/server');
// Définir le schéma GraphQL
const typeDefs = `#graphql
type Produit {
id: String!
title: String!
description: String!
}
type categorie {
id: String!
title: String!
description: String!
}
type Query {
Produit(id: String!): Produit
Produits: [Produit]
categorie(id: String!): categorie
categories: [categorie]
}
`;
module.exports = typeDefs