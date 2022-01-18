export const typeDefs = ["type SayHelloResponse {\n  text: String!\n  error: Boolean!\n}\n\ntype Query {\n  sayHi: SayHelloResponse!\n}\n"];
/* tslint:disable */

export interface Query {
  sayHi: SayHelloResponse;
}

export interface SayHelloResponse {
  text: string;
  error: boolean;
}
