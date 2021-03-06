'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    clean: {
      build: ['build'],
      dev: {
        src: ['build/**/*']
      }
    },

    copy: {
      dev: {
        expand: true,
        cwd: 'app',
        src: ['css/*.css', '*.html', 'images/**/*'],
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    sass: {
      dev: {
        options: {
          includePaths: ['app/scss/'],
          sourceComments: 'map'
        },
        files: {'build/css/styles.css': 'app/scss/styles.scss' }
      }
    },

    browserify: {
      dev: {
        src: ['app/js/*.js'],
        dest: 'build/client.js',
        options: {
          alias: [
            './config/client_test_env.js:env'
          ],
          transform: ['debowerify'],
          debug: true
        }
      }
    },

    express: {
      options: {

      },
      dev: {
        options: {
          script: 'server.js',
          node_env: 'development'
        }
      }
    },

    watch: {
      all: {
        files: ['server.js', '**/*.js', '**/*.css', '**/*.scss']
      },
      express: {
        files: ['server.js', 'app/**/*.js', 'app/*.html', 'app/css/*', 'app/scss/*'],
        tasks: ['clean:dev', 'copy:dev','sass:dev', 'browserify:dev', 'express:dev'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('build:dev', ['clean:dev', 'copy:dev', 'sass:dev', 'browserify:dev']);
  grunt.registerTask('build', ['build:dev']);
  grunt.registerTask('server', ['build:dev', 'express:dev', 'watch:express']);
};
