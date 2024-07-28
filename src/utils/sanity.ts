import {createClient, SanityClient} from "@sanity/client";

export const client: SanityClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION,
    // Set to `true` for production environments
    useCdn: false,
    token: process.env.SANITY_TOKEN,
});