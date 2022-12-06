import type { Config } from "jest";

const config: Config = {
    globals: {
        __MONGO_DB_URI__:'mongodb://localhost/allocation'
    }
}

export default config;