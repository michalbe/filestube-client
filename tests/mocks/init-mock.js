'use strict';

var nock = require('nock');

var initMock = function(list, final, repetitions, pages) {
  repetitions = repetitions || 1;
  nock('http://www.filestube.to')
  .get('/query.html?q=stawka+wieksza+niz+zycie')
  .reply(200, list);

  nock('http://www.filestube.to')
  .get('/details.html')
  .times(repetitions)
  .reply(200, final);

  if (pages) {
    while (pages) {
      nock('http://www.filestube.to')
      .get('/query.html?q=stawka+wieksza+niz+zycie&page=' + pages)
      .reply(200, list);
      pages--;
    }
  }
};

module.exports = initMock;
