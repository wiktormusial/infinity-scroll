import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    launches: offsetLimitPagination()
                }
            }
        }
    })
})

export default client