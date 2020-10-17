'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    REDIRECT_URL: '"http://client.gitgraph.com"',
    CLIENT_ID: '"65a55bc139f61553c7a6"',
    OAUTH_URL: '"http://auth.gitgraph.com"'
})
