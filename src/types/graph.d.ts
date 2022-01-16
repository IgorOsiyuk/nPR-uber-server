export const typeDefs = ["type Query {\n  sayBye: String!\n  sayHello: Greetings!\n}\n\ntype Greetings {\n  text: String!\n  error: Boolean!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: string;
  sayHello: Greetings;
}

export interface Greetings {
  text: string;
  error: boolean;
}
