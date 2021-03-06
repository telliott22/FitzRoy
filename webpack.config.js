module.exports = {
    entry: ["babel-polyfill", __dirname + "/src/js/app.js"],
    output: {
        path: __dirname + "/dist",
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(s*)css$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: "html-loader"
                }
            }
        ]
    }
};
