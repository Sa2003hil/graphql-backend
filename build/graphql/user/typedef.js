"use strict";
//  It is the schema definition for the user module
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
    Type Query{
        user(id: ID!): User
        users: [User]
    }

`;
