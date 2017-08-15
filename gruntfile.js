module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify:{
      options:{
        banner: '/*<%= pkg.name %> V<%= pkg.version %> made on <%= grunt.template.today("yyyy-mm-dd") %>*/\r',
        mangle: false,
        beautify: true,
				sourceMap: true
      },
      app:{
        files:{
          'build/app.js': [
            'node_modules/pixi.js/dist/pixi.js',
						'node_modules/jquery/dist/jquery.js',
						'src/js/game.js',
						'src/js/index.js'
          ]
        }
      }
    },

    copy: {
      build:{
        files:[{
          cwd: 'src/',
          src: ['**', '!**/js/*.js'],
          dest: 'build/',
          nonull: false,
          expand: true,
          flatten: false,
          filter: 'isFile'
        },]
      }
    },

    watch:{
      options: {
  		  livereload: 1337,
        spawn: false
  		},
      js:{
        files: ['src/js/**.js'],
        tasks: ['uglify:app']
      },
      html:{
        files: ['src/**.html', 'src/**/**.json', 'src/**/**.css'],
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
		}



  });

  // our default task, others will come later
  grunt.registerTask('default', [
		'copy:build',
		'uglify',
		'browserSync',
    'watch'
  ]);

};
