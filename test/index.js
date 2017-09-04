'use strict';

/* PIXI - lets not mock it */
var PIXI = require('pixi.js');
PIXI.utils.skipHello(); // hide default banner

global.$ = global.jQuery = require('jquery');

var sinon = require('sinon');

describe('Basics', function (){

    it('PIXI should exist as a global object', function (){
        expect(PIXI).to.be.an('object');
    });

    it('jQuery default function test', function() {
      document.body.innerHTML = '<div>hola</div>';
      expect($("div").html()).eql('hola');
    });

});

//require('./game');

require('./app');
