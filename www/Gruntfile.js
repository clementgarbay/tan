module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({

  	pkg: grunt.file.readJSON('package.json'),

		less: {
			all: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"dist/css/style.min.css": "src/less/style.less",
					//"dist/css/mobile-angular-ui-base.min.css": "src/less/mobile-angular-ui-base.less",
					//"dist/css/mobile-angular-ui-desktop.min.css": "src/less/mobile-angular-ui-desktop.less"
				}
			}
		},

		jshint: {
			all: ['Gruntfile.js', 'src/js/**/*.js']
		},

		concat: {
			options: {
				separator: ';',
			},
			all: {
				src: ['src/js/app/app.js', 'src/js/app/controllers/*.js', 'src/js/app/directives/*.js', 'src/js/app/services/*.js'],
				dest: 'tmp/app.concat.js',
			},
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.author %> | <%= grunt.template.today("dd/mm/yyyy HH:MM") %> */ \n\n'
			},
			all: {
				files: {
					'dist/js/app.min.js': 'tmp/app.concat.js'
				}
			}
		},

		watch: {
			styles: {
				files: ['src/less/**/*.less'],
				tasks: ['less'],
				options: {
					spawn: false
				}
			},
			scripts: {
				files: ['src/js/**/*.js'],
				tasks: ['jshint'],
				options: {
					spawn: false,
					interrupt: true
				}
			},
			scriptsApp: {
				files: ['src/js/app/**/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
				}
			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true
			},
      default: ['less', 'jshint', 'concat', 'uglify', 'watch:styles', 'watch:scripts', 'watch:scriptsApp'],
    }
  });

  grunt.registerTask('default', ['concurrent:default']);

};
