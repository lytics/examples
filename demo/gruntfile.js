module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    /* ************************************** */
    /* COMPILE SASS                           */
    /* ************************************** */
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          './src/content/css/src/styles.css': './src/content/scss/styles.scss',
        }
      }
    },

    /* ************************************** */
    /* CONCAT FILES                           */
    /* ************************************** */
    concat: {
      styles: {
        src: ['./src/content/css/src/*.css'],
        dest: 'src/content/css/styles.css'
      }
    },

    /* ************************************** */
    /* GROWL NOTIFICATIONS                    */
    /* ************************************** */
    notify: {
      watch: {
        options: {
          title: 'Lytics Example Site',  // optional
          message: 'CSS / JS Compile Succeeded', //required
        }
      }
    },

    /* ************************************** */
    /* WATCH SCSS AND JS                      */
    /* ************************************** */
    watch: {
      hbs: {
        files: ['./src/bonnet/**/*.hbs', './src/content/**/*.hbs'],
        tasks: ['concat', 'assemble', 'copy'],
        options: {
            livereload: true
        }
      },
      css: {
        files: ['./src/content/scss/*.scss'],
        tasks: ['sass', 'concat', 'assemble', 'copy'],
        options: {
          livereload: true,
        }
      },
      scripts: {
        files: ['./src/content/js/*.js'],
        tasks: ['concat', 'assemble', 'copy'],
        options: {
          livereload: true,
        }
      }
    },

    /* ************************************** */
    /* SERVER                                 */
    /* ************************************** */
    connect: {
      server: {
        options: {
          port: 2000,
          base: './dist/',
          livereload: true
        }
      }
    },

    /* ************************************** */
    /* ASSEMBLE FILES                         */
    /* ************************************** */
    assemble: {
      options: {
        layout: 'page.hbs',
        layoutdir: './src/bonnet/layouts/',
        partials: './src/bonnet/partials/**/*.hbs'
      },
      posts: {
        files: [{
          cwd: './src/content/',
          dest: './dist/',
          expand: true,
          src: ['**/*.hbs', '!_pages/**/*.hbs']
        }, {
          cwd: './src/content/_pages/',
          dest: './dist/',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: './src/content/', src: ['css/**'], dest: './dist/'},
          {expand: true, cwd: './src/content/', src: ['js/**'], dest: './dist/'},
          {expand: true, cwd: './src/content/', src: ['font/**'], dest: './dist/'},
          {expand: true, cwd: './src/content/', src: ['img/**'], dest: './dist/'}
        ]
      }
    }

  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-copy');

  /* grunt tasks */
  grunt.registerTask('default', ['sass', 'concat', 'assemble', 'copy', 'notify:watch', 'connect:server', 'watch']);

};