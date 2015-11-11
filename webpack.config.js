
module.exports = {
    entry: './index.jsx',
    output: {
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/assets'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                // use jsx-loader for all .jsx files
                test: /\.jsx$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
        ]
    },
    externals: {
        // ignores the 'react' npm package, but gets from global React
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    node: {
        console: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};