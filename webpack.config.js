const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackChunkHash = require("webpack-chunk-hash")
const CleanWebpackPlugin = require("clean-webpack-plugin")
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
        // open: true, // Open the page in browser
        overlay: true,
        stats: "errors-only", // Display only errors to reduce the amount of output.
        contentBase: path.resolve(__dirname, "src"),
        inline: true,
        watchContentBase: true
        // historyApiFallback: // for HTML5 History API based routing
    },
    entry: { main: "./src/index.js" },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "assets/js/[name].[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|svg|webp)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            // name: "[path][name].[ext]"
                            name: "[name].[ext]",
                            outputPath: "assets/images"
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)?$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "assets/fonts"
                }
            },
            {
                test: /favicon\.ico$/,
                loader: "file-loader",
                options: { name: "[name].[ext]" }
            },
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
        new CleanWebpackPlugin("dist", {}),
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            filename: path.resolve(__dirname, 'dist/index.html'),
            template: path.resolve(__dirname, 'src/index.html'),
        }),
        new WebpackChunkHash()
    ]
}
