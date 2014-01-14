module.exports = function(grunt) {

  var env = process.env
  env.NODE_ENV = 'development'
  env.PORT = 3004

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    exec: {
      npm: { cmd: 'npm install' },
      bower: { cmd: 'node_modules/.bin/bower install'},
    },

    bower_concat: {
      all: {
        dest: 'public/dist/bower.js',
        // exclude: ['font-awesome', 'svg.js'],
        dependencies: {
          // 'angular': 'jquery',
          // 'bootstrap-slider': 'bootstrap',
          // 'angular-ui-select2': ['select2', 'angular', 'jquery'],
        },
      }
    }, 

    watch: {
      js: {
        files: ['public/js/*.js', 'public/lib/*.js'],
        tasks: ['concat'],
        options: { livereload: true },
      },
      reload: {
        files: ['public/index.html', 'public/css/*.css'],
        // tasks: ['concat'],
        options: { livereload: true },
      }
    },

    develop: {
      server: {
        file: 'server.js',
        nodeArgs: [],
        args: [],
        env: env,
      } 
    },

    concat: {
      options: { separator: ';' },
      js: {
        src: [
          'public/js/*.js',
          'public/lib/*.js',
        ],
        dest: 'public/dist/app.js',
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('install', ['exec:npm', 'exec:bower'])

  grunt.registerTask('default', ['install', 'bower_concat', 'concat', 'develop', 'watch']);

};