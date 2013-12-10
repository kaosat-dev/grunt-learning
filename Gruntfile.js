module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //testing & checking
    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'src/**/*.js', 'specs/**/*.js'],
      options: {
        globals: {
          console: true,
          module: true
        }
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
    //build & release tasks
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['src/**/*.js'],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    release: {
      options: {
        npmtag: 'canary',
      }
    },
    watch: {
      files: ['GruntFile.js', 'src/**/*.js', 'specs/**/*.js'],
      tasks: ['jshint','jasmine_node','browserify']
    },
    //-------------------------------------
    nodewebkit: {
      options: {
          build_dir: './webkitbuilds', // Where the build version of my node-webkit app is saved
          mac: true, // We want to build it for mac
          win: true, // We want to build it for win
          linux32: true, // linux32
          linux64: true //linux64
      },
      src: ['./example/public/**/*'] // Your node-wekit app
    },

    browserify: {
      main:{
        files: {
          'build/browserify/out.js': 'src/<%= pkg.name %>.js'
        },
        options: {
          transform: ['coffeeify'],
          external: ['src/fakeLib.js'],
          alias:[
            'src/<%= pkg.name %>.js:<%= pkg.name %>',
            "src/fakeLib.js:fakeLib"
          ],
          ignore:["src/fakeLib.js"]
          
        }
      },
      lib:{
        files: {
          'build/browserify/lib.js': 'src/fakeLib.js'
        },
        options:{
          alias: ['src/fakeLib.js:fakeLib']//use this to enable in-browser "require" calls
        }
      }
    },

    //----------------------------------
    foo:{
      foo:"toto",
      bar:"tata"
    },
    build2:
    {
      bower:{
        tasks: ['jshint']
      },
      browserify:{
        tasks: ['jasmine_node']
      }
      
    }
  });


  // 'src/**/*.js', 'src/**/*.coffee'],

  //general
  grunt.loadNpmTasks('grunt-contrib-watch');

  //languages
  //load the "coffee" task
  grunt.loadNpmTasks('grunt-contrib-coffee');

  //testing
  //load the "jasmine_node" task
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  //release cycle
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-release');

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // Task(s).
  grunt.registerTask('test', ['jshint', 'jasmine_node']);

  grunt.registerTask('build', ['jshint', 'jasmine_node','concat','uglify']);

  grunt.registerTask('release', ['concat','uglify','jasmine_node','release']);

  //testing stuff out
  grunt.registerMultiTask('foo', 'bla', function(){
    grunt.log.writeln(this.target + ': ' + this.data);
  });

  grunt.registerMultiTask('build2', 'multiple build confs', function(){
    grunt.log.writeln(this.target + ': ' + this.data);
  });


  //this is breaking the "watch" task ??
  /*
  grunt.registerTask('build3', function(target) {
    
    switch(target)
    {
      case 'bower':
        var __tasks = ['concat', 'uglify'];
      break;
      case 'npm':
        var __tasks = ['concat', 'uglify'];
      break;

      default:
        grunt.warn('taskA target must be specified, like taskA:001.');
    }

    grunt.task.run.apply(grunt.task, tasks.map(function(task) {
      return task + ':' + target;
    }));

  });*/


};
