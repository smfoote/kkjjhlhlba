module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      mangle: {
        except: ['kkjjhlhlba']
      },
      core: {
        src: 'kkjjhlhlba.js',
        dest: 'release/kkjjhlhlba.min.js'
      }
    },
    jshint: {
      files: 'kkjjhlhlba.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);
};
