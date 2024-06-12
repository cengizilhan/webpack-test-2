const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin')
const paths = require('./paths')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	// Where webpack outputs the assets and bundles
	output: {
		path: paths.build,
		//path: path.resolve(__dirname, 'dist'),
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

		// Generates an HTML file from a template
		new HtmlBundlerPlugin({
			// Using the bundler plugin, the entrypoint is any template file, not JS
			// all source styles and script files must be defined directly in HTML.
			// The source image and font files can be defined directly in HTML and in SCSS/CSS.
			// All source files will be resolved, processed and placed into output directory,
			// so you don't need to use the copy plugin.
			entry: [
				{
					import: paths.src + '/template.html', // template file
					filename: 'index.html', // output file
					data: {
						// external data passed into template
						title: 'webpack Boilerplate',
					},
				},
			],
			js: {
        // JS output filename, used if `inline` option is false (defaults)
        filename: 'js/[name].[contenthash:8].js',
        //inline: true, // inlines JS into HTML
      },
      css: {
        // CSS output filename, used if `inline` option is false (defaults)
        filename: 'css/[name].[contenthash:8].css', // filename for styles defined in HTML
				chunkFilename: 'css/[name].[id].css', // filename for styles imported in JS
        //inline: true, // inlines CSS into HTML
      },
		})
	],

	// Determine how modules within the project are treated
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{ test: /\.js$/, use: ['babel-loader'] },

			{
        test: /\.(sass|scss|css)$/,
        use: [
					'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
	  
			// Images: Copy image files to build folder
			{ test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
	  
			// Fonts and SVGs: Inline files
			{ test: /\.(woff(2)?|eot|ttf|otf|svg)$/, type: 'asset/inline' },
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
			jquery: path.resolve(__dirname, 'node_modules/jquery/src/jquery'),
			//react: path.resolve(__dirname, 'Static/src/bower_components/react/react.js'),

			// alaises used in HTML, JS, SCSS
			'@images': path.join(paths.src, 'images'),
			'@fonts': path.join(paths.src, 'fonts'),
			'@scripts': path.join(paths.src, 'scripts'),
			'@styles': path.join(paths.src, 'styles'),
		}
	}
}
