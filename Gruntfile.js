/*jshint node: true*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      options: {
          node: true
      },
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js']
    },

    simplemocha: {
      src: ['test/api/**/*.js']
    },

    jscs: {
      src: ['model/**/*.js', 'server.js', 'routes/**/*.js'],
      options: {
          config: '.jscsrc'
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'simplemocha', 'jscs']);
  grunt.registerTask('default', ['test']);
};
