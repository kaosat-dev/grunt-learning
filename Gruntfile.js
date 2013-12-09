module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    release: {
      options: {
        npmtag: 'canary',
      }
    },
    jasmine_node: {
      specNameMatcher: "./spec", // load only specs containing specNameMatcher
      projectRoot: ".",
      requirejs: false,
      forceExit: true,
      jUnit: {
        report: false,
        savePath : "./build/reports/jasmine/",
        useDotNotation: true,
        consolidate: true
      }
    },
    watch: {
      pivotal : {
        files: ['src/**/*.js', 'specs/**/*.js'],
        tasks: 'jasmine:pivotal:build'
      }
    }
  });

  //languages
  //load the "coffee" task
  grunt.loadNpmTasks('grunt-contrib-coffee');

  //testing
  //load the "jasmine_node" task
  grunt.loadNpmTasks('grunt-jasmine-node');

  //release cycle
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //load the "release" task
  grunt.loadNpmTasks('grunt-release');
  
  //load the "browserify" task
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('default', ['uglify','jasmine_node','release']);
};
