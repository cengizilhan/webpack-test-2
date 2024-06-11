const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')
const glob = require('glob')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')


// Find all .scss files
const scssFiles = glob.sync(paths.src + '/styles/**/*.scss', {
	posix: true,
	dotRelative: true
})

// Debugging: Log the found SCSS files
console.log('Found SCSS files:', scssFiles)

// Create an entry object for the SCSS files
const styleEntries = scssFiles.reduce((entries, filePath) => {
	// Use the absolute path as the entry key
	console.log('filePath', filePath)
	console.log('entries', entries)
	const entryKey = filePath
		.replace('./Static/src/styles', './Static/styles')
		.replace(/\\/g, '/')
		.replace('.scss', '')
		
	entries[entryKey] = filePath
	return entries
}, {})

// Debugging: Log the generated style entries
console.log('Generated style entries:', styleEntries)


const scriptEntries = {
	'./Static/scripts/aile/sawa.aile-app.min':
		paths.src + '/scripts/aile/sawa.aile-app.js',

	}

const styleTest = {
	'/Static/style/sawa': paths.src + '/styles/sawa.scss'
}

// Merge entries
console.log('styleentiries', styleEntries)
console.log('scriptEntries', scriptEntries)
const entries = {
	...styleEntries,
	...scriptEntries,
	//...styleTest
}
console.log('style test', styleTest)
module.exports = {
	// Where webpack looks to start building the bundle
	entry: entries,

	// Where webpack outputs the assets and bundles
	output: {
		path: paths.build,
		//path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/'
	},
	/*
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      extractComments: false,
      terserOptions: {
        nameCache: {},
        safari10: true,
        ie8: true,
        sourceMap: true,
        compress: {
          drop_console: true,
        },
      },
    })],
  },*/
  /*
  watch:true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
  },
  */
	// Customize the webpack build process
	plugins: [
		// Removes/cleans build folders and unused assets when rebuilding
		new CleanWebpackPlugin(),

		// Copies files from target to destination folder
		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.images,
					to: paths.build + '/Static/images',
					globOptions: {
						ignore: ['*.DS_Store']
					},
					noErrorOnMissing: true
				},
				{
					from: paths.fonts,
					to: paths.build + '/Static/fonts',
					globOptions: {
						ignore: ['*.DS_Store']
					},
					noErrorOnMissing: true
				}
			]
		}),

		// Generates an HTML file from a template
		// Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
		new HtmlWebpackPlugin({
			title: 'webpack Boilerplate',
			favicon: paths.src + '/images/favicon.png',
			template: paths.src + '/template.html', // template file
			filename: 'index.html' // output file
		})
	],

	// Determine how modules within the project are treated
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{ test: /\.js$/, use: ['babel-loader'] },
	  
			// Images: Copy image files to build folder
			{ test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
	  
			// Fonts and SVGs: Inline files
			{ test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
		  ],
	},
	externals: {
		jquery: 'jQuery'
	},
	resolve: {
		preferRelative: true,
		modules: [paths.src, 'node_modules'],
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'@': paths.src,
			assets: paths.build,
			jquery: path.resolve(__dirname, 'node_modules/jquery/src/jquery')
			//react: path.resolve(__dirname, 'Static/src/bower_components/react/react.js'),
		}
	}
}
