/*
 * grunt-pg
 * https://github.com/moneytribeaustralia/grunt-pg
 *
 * Copyright (c) 2013 Moneytribe.
 * Written by Andrew Chilton.
 * Licensed under the MIT license.
 */

'use strict';

var pg = require('pg');

function execute_db(connection, statement, done) {
    pg.connect(connection, function(err, client) {
        if (err) {
            pg.end();
            throw new Error(err);
        }

        client.query(statement, function(err, result) {
            if (err) {
                pg.end();
                throw new Error(err);
            }
            // console.log('Result:', result);

            pg.end();
            done();
        });
    });

}



module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task
  // creation: https://github.com/gruntjs/grunt/blob/devel/docs/toc.md

  grunt.registerMultiTask('pgcreate', 'Grunt plugin to help with administering Postgres.', function() {

    var data = this.data;

    grunt.log.writeln('Database "' + data.name + '" created.');
  });

  grunt.registerMultiTask('pgdrop', 'Grunt plugin to help with administering Postgres.', function() {
      var self = this;

      var done = this.async();

      var data = this.data;
      execute_db(data.connection, "SELECT now();", function(err, res) {
          grunt.log.writeln('Database "' + data.name + '" dropped. ->', res);
          done();
      });
  });

};
