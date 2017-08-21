module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

	var productionBuild = !!(grunt.cli.tasks.length && grunt.cli.tasks[0] === 'build');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // uglify:{
    //   options:{
    //     banner: '/*<%= pkg.name %> V<%= pkg.version %> made on <%= grunt.template.today("yyyy-mm-dd") %>*/\r',
    //     mangle: false,
    //     beautify: true,
		// 		sourceMap: true
    //   },
    //   app:{
    //     files:{
    //       'build/app.js': [
		// 				'node_modules/stats.js/build/stats.min.js',
    //         'node_modules/pixi.js/dist/pixi.js',
		// 				'node_modules/array2d/Array2D.js',
		// 				'node_modules/jquery/dist/jquery.js',
		// 				'src/js/game.js',
		// 				'src/js/index.js'
    //       ]
    //     }
    //   }
    // },

    copy: {
      build:{
        files:[{
          cwd: 'src/',
          src: ['**', '!**/js/*.js', '!**/*.less'],
          dest: 'build/',
          nonull: false,
          expand: true,
          flatten: false,
          filter: 'isFile'
        },]
      }
    },

		less: {
			live: {
				options: {
					strictMath: true,
					sourceMap: false,
					outputSourceFiles: true,
					sourceMapURL: 'style.css.map',
					sourceMapFilename: 'www/css/style.css.map'
				},
				src: 'src/less/style.less',
				dest: 'build/css/style.css'
			}
		},

    watch:{
      options: {
  		  livereload: 1337,
        spawn: false
  		},
      // js:{
      //   files: ['src/js/**.js'],
      //   tasks: ['uglify:app']
      // },
			less:{
				files: 'src/less/*.less',
				tasks: ['less']
			},
      html:{
        files: ['src/**.html', 'src/**/**.json'],
        tasks: ['copy:build']
      }
    },

		browserSync: {
			dev: {
				bsFiles: {
					src : 'build/scripts.js'
				},
				options: {
					server: {
						baseDir: "build"
					},
					baseDir: "./build",
					watchTask: true
				}
			}
		},

		browserify:{
      app:{
        src: [
          'src/js/index.js'
        ],
        dest: 'build/app.js',
        options:{
          transform: ['browserify-shim'],
          watch: true,
          browserifyOptions:{
            debug: !productionBuild
          }
        }
      }
    },

		mochaTest: {
		  test: {
				require: 'mocha-jsdom',
		    src: ['tests/game.js']
		  }
		},

		jshint: {
			options: {
				expr: true
			},
			all: ['Gruntfile.js', 'src/**/*.js']
		}

  });

  // our default task, others will come later
  grunt.registerTask('default', [
		'copy:build',
		'less',
		'browserify',
		'browserSync',
    'watch'
  ]);

	grunt.registerTask('serve', [
		'browserSync',
		'watch'
	]);

	//
	grunt.registerTask('test', [
		'jshint',
		'mochaTest'
	]);

};
