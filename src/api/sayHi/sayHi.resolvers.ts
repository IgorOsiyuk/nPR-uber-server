import { SayHelloResponse } from "src/types/graph"

const resolvers = {
    Query: {
        sayHi: (): SayHelloResponse => {
            return {
                text: "asda",
                error: false
            }
        }
    }
}

export default resolvers