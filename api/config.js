const environments = {

    staging: {
        port: 3000,
        name: 'staging'
    },

    production: {
        port: 5000,
        name: 'production'
    }
};

const userSetEnvironment = process.env.NODE_ENV || 'staging';
const envKey = userSetEnvironment.toLowerCase();
const isEnvValid = environments[envKey] !== undefined;
module.exports = isEnvValid ? environments[envKey] : environments['staging'];