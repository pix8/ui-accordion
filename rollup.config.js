/* eslint-disable */
'use strict';

import alias from 'rollup-plugin-alias'
import paths from 'rollup-plugin-includepaths'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'							//https://github.com/rollup/rollup-plugin-babel
import vue from 'rollup-plugin-vue'								//https://github.com/vuejs/rollup-plugin-vue
//import sass from 'rollup-plugin-scss'							//https://github.com/thgh/rollup-plugin-scss
import postcss from 'rollup-plugin-postcss'						//https://github.com/egoist/rollup-plugin-postcss //DEVNOTE: postcss can use preprocessors i.e. node-sass
import url from 'rollup-plugin-url' 							//https://github.com/rollup/rollup-plugin-url
//import image from 'rollup-plugin-image'						//https://github.com/rollup/rollup-plugin-image [official but seems unsupported]
//import svg from 'rollup-plugin-svg'							//https://github.com/antony/rollup-plugin-svg#readme
import json from 'rollup-plugin-json'							//https://github.com/rollup/rollup-plugin-json
import { uglify } from "rollup-plugin-uglify"

import pkg from './package.json'


const 	ENV = process.env.NODE_ENV;

export default {
	input: 'src/assets/_js/index.js', //'src/index.js',
	
	output: [
		{
			file: 'src/assets/scripts/roll.app.bundle.js', //'dist/'+pkg.main,
			format: 'iife',
			compact: true
		}
	],

	watch:{
		chokidar: {
			paths: 'src/**'
		},
		exclude: 'node_modules/**'
	},

	external: [					//treat as external dependencies and do not bundled with module
		'react',
		'react-dom',
		'prop-types',
		'styled-components',
		'vue'
	],

	plugins: [
		resolve(),
		babel({
			exclude: 'node_modules/**',
			runtimeHelpers: true,
			externalHelpers: true
		}),
		commonjs(),
		vue(),
		postcss(),
		// sass({
		// 	output: false
		// }),
		url({
			limit: 10 * 1024//, 	//convert(base64/data-uri) and inline files that are  < 10k, copy files > 10k; else copied to destination folder and hashed filename generated + inserted
			//include: [] 			//default .svg, .png, .jpg and .gif
		}),
		//image(),
		//svg(),
		json(),
		uglify(),

		paths({
			paths: ['src'],
			external: [],
			extensions: ['.js', '.jsx']
		}),
		
		alias({
			resolve: ['.jsx', '.js'],
			components: './src/components'
		})
	]
}
