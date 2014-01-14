module.exports = function(grunt) {

  var env = process.env
  env.NODE_ENV = 'development'
  env.PORT = 3004

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    servers: {
      dest: '~/corpse',
      dev: 'dev.orbit.al',
      user: 'root',
    },

    exec: {
      npm: { cmd: 'npm install' },
      bower: { cmd: 'node_modules/.bin/bower install'},
      deploy: { cmd: 'ssh -t <%= servers.user %>@<%= servers.dev %> "cd <%= servers.dest %> && bash config/deploy.sh"'},
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
      },
      server: {
        files: ['server/*.js'],
        tasks: ['develop'],
        options: { livereload: true},
      },
      less: {
        files: ['public/css/*.less'],
        tasks: ['less'],
        options: { livereload: true },
      },

    },

    less: {
      all: {
        options: {},
        // compile ALL less files found in css, and nested anywhere in app
        files: { "public/dist/main.css" : ["public/css/*.less"]}
      }
    },

    develop: {
      server: {
        file: 'server/server.js',
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
    },


    rsync: {
      options: {
        args: ["--verbose"],
        // exclude: [".git*","*.less","node_modules"],
        exclude: [".git*","*.less"],
        recursive: true
      },

      dev: {
        options: {
          host: "<%= servers.user %>@<%= servers.dev %>",
          src: ".",
          dest: "<%= servers.dest %>",
        }
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-rsync');

  grunt.registerTask('deploy', ['rsync', 'exec:deploy'])
  grunt.registerTask('install', ['exec:npm', 'exec:bower'])

  grunt.registerTask('default', ['install', 'bower_concat', 'less', 'concat', 'develop', 'watch']);

};