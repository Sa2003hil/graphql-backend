"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typedef_1 = require("./typedef");
const muatations_1 = require("./muatations");
const queries_1 = require("./queries");
const resolvers_1 = require("./resolvers");
exports.User = { typeDefs: typedef_1.typeDefs, mutations: muatations_1.mutations, queries: queries_1.queries, resolvers: resolvers_1.resolvers };
