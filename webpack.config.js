// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('src/assets/component/Home.tsx');
// eslint-disable-next-line no-undef
module.exports = {
    entry: './src/index.js', // Replace with the entry file of your application
    output: {
        filename: 'bundle.js',
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, 'dist'), // Replace with the output directory of your choice
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
            // Add any additional loaders for CSS, images, etc. if needed
        ],
    },
};
