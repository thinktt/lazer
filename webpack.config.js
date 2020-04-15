const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {index: './src/js/main.js', fun: './src/js/fun.js'},
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      components: path.resolve(__dirname, 'src/components/'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {loaders: {}}
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'body',
      chunks: ['index'],
    }),
    new CopyWebpackPlugin([{from: 'src/css', to: 'css'}]),
    new CopyWebpackPlugin([{from: 'src/img', to: 'img'}]),
    new CopyWebpackPlugin([{from: 'src/fonts', to: 'fonts'}]),
  ],

}

// creates static routes out of html files in src folder  
// and allows these pages to update automatically on dev server
fs.readdirSync(path.resolve('./src')).forEach(file => {
  if ( /\.(html)$/.test(file) && file !== 'index.html' ) { 
    const name = file.substring(0, file.lastIndexOf('.'));
    console.log('Creating html-webpack-plugin for ' + file);
    module.exports.plugins.push(
      new HtmlWebpackPlugin({
        filename: name + '/index.html',
        template: './src/' +  file,
        inject: 'body',
        chunks: ['fun'],
      })
    );
  }
});


if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin(['dist/*', 'dist/**/*']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ])

  module.exports.module.rules = (module.exports.module.rules || []).concat([
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }
  ]);
};


/* Still need for dev 
dev
  x vue loader
  x better folder structure
  x copy assets

production
  x separate dev and prod build 
  x babel 
  x uglifyjs
  x copy assets

Vue
  Router

*/
