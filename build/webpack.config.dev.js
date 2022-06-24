const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const { VueLoaderPlugin } = require('vue-loader');

const env = dotenv.config({ path: path.resolve(process.cwd(), 'config/dev.env.js') }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next])
      return prev
}, {});

module.exports = {
    entry: './src/Vue/app.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin(envKeys),
    ]
};
