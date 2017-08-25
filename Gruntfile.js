module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'dist/assets/css/main.css' : 'assets/scss/main.scss'
				}
			}
		},
		watch: {
			css: {
                files: 'assets/scss/*.scss',
                tasks: ['clean:css','sass','copy:styles']
            },
            styles: {
                files: 'assets/css/*.css',
                tasks: ['copy:styles']
            },
            js: {
				files: 'assets/js/**/*.js',
				tasks: ['clean:js','copy:js']
			},
            fonts: {
				files: 'assets/fonts/**/*',
				tasks: ['clean:fonts','copy:fonts']
			},
            images: {
				files: 'assets/images/*',
				tasks: ['clean:images','copy:images']
			},
            html:{
				files: 'html/**/*.html',
				tasks: ['clean:html','zetzer']
			},
		},
        zetzer: {
            main:{
                options: {
                    partials: "html/partials",
                    templates: "html/templates",
                    env: {
                      title: "Zetzer",
                    },
                },
                files: [{
                    expand: true,
                    cwd: "html/pages",
                    src: "**/*.html",
                    dest: "dist",
                    ext: ".html",
                    flatten: false
                }]
            }
        },
        copy: {
            js: {
                expand: true,
                src: 'assets/js/**/*',
                dest: 'dist/',
            },
            fonts: {
                expand: true,
                src: 'assets/fonts/*',
                dest: 'dist/',
            },
            images: {
                expand: true,
                src: 'assets/images/**/*',
                dest: 'dist/',
            },
            styles: {
                expand: true,
                src: 'assets/css/*',
                dest: 'dist/',
            }
        },
        clean: {
            html:['dist/*.html'],
            js:['dist/assets/js/*'],
            css:['dist/assets/css/*'],
            images:['dist/assets/images/*'],
            fonts:['dist/assets/fonts/*']
        },
        connect :{
            server: {
                options: {
                    port: 80,
                    hostname: 'wb.sion.local',
                    keepalive:false,
                    base: './dist'
                }
            }
        }
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-zetzer');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('default',['watch']);
}