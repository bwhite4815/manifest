module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/gallery.js','js/main.js'],
        dest: 'js/<%= pkg.name %>.js',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/<%= pkg.name %>.js',
        dest: 'js/<%= pkg.name %>.min.js'
      }
    },
    smushit: {
      mygroup: {
        src: 'img/content/random/*.jpg',
        dest: 'img/content/random/smushed' // true-eye-example
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['index.html','carousel.html','*.png','*.jpg'], dest: 'build/', filter: 'isFile'}, // includes files in path
          {expand: true, src: ['js/manifest.min.js','js/plugins.js'], dest: 'build/', filter: 'isFile'}, // includes files in path
          {expand: true, src: ['js/libs/**'], dest: 'build/'}, // includes files in path and its subdirs
          {expand: true, src: ['img/**'], dest: 'build/'}, // includes files in path and its subdirs
          {expand: true, src: ['fonts/**'], dest: 'build/'}, // includes files in path and its subdirs
          {expand: true, src: ['css/**'], dest: 'build/'} // includes files in path and its subdirs
        ]
      }
    },
    "imagemagick-resize":{
      dev:{
        from:'img/content/random/',
        to:'img/content/random/thumb/',
        files:'*.jpg',
        props:{
          width:150
        }
      }
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-smushit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-imagemagick');

  // Default task(s).
  grunt.registerTask('default', ['smushit', 'concat', 'uglify', 'imagemagick-resize', 'copy']);
  grunt.registerTask('compile', ['concat', 'uglify']);
  grunt.registerTask('build', ['smushit', 'concat', 'uglify', 'imagemagick-resize', 'copy']);




  
};