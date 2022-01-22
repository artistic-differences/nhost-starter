import { NhostClient } from "@nhost/nhost-js";

const nhost = new NhostClient({
    backendUrl: process.env.NHOST_BACKEND_URL,
});

const makeRequest = async (query, variables) => {
    return nhost.graphql.request(query, variables,
        {
            headers: {
                "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET,
            }
        }
    );
}


export { nhost, makeRequest };