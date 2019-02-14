const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackMd5Hash = require("webpack-md5-hash")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const WebpackNotifierPlugin = require("webpack-notifier")
// const nodeExternals = require("webpack-node-externals") // for target: "node"

module.exports = {
    target: "web",
    // externals: [nodeExternals()],  // for target: "node"
    devServer: {
        // Parse host and port from env to allow customization.
        host: process.env.HOST || "localhost", // Defaults to `localhost`
        port: process.env.PORT || 8080, // Defaults to 8080
        // If you use Docker, Vagrant or Cloud9, set
        // host: options.host || "0.0.0.0"; // 0.0.0.0 is available to all network devices
        open: true, // Open the page in browser
        overlay: true,
        stats: "errors-only" // Display only errors to reduce the amount of output.
        // historyApiFallback: // for HTML5 History API based routing
    },
    entry: { main: "./src/index.js" },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.[chunkhash].js"
        // filename: "[name].[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new WebpackNotifierPlugin(),
        new CleanWebpackPlugin("dist", {}),
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: "./src/index.html",
            filename: "index.html"
        }),
        new WebpackMd5Hash()
    ]
}
