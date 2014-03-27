/* Copyright (c) 2014 Richard Rodger, MIT License */
"use strict";


var Stats = require('..')
var NamedStats = Stats.NamedStats


var cI = 0
var c = function() {
  return cI
}


var s = new Stats(3,4,c)
s.point(100)
console.dir(s.calculate())
s.point(200)
console.dir(s.calculate())
s.point(300)
console.dir(s.calculate())
s.point(400)
console.dir(s.calculate())
s.point(500)
console.dir(s.calculate())
s.point(600)
console.dir(s.calculate())
s.point(700)
console.dir(s.calculate())


console.log('--------------')

var cI = 0
var s = new Stats(3,2,c)
s.point(100); cI++;
console.dir(s.calculate())
s.point(101); cI++;
console.dir(s.calculate())
s.point(102); cI++;
console.dir(s.calculate())
s.point(103); cI++;
console.dir(s.calculate())
cI++;
console.dir(s.calculate())
cI++;
console.dir(s.calculate())
cI++;
console.dir(s.calculate())
s.point(104); cI++;
console.dir(s.calculate())


console.log('--------------')



var sn = new NamedStats(3,4,c)
sn.point(100,'a')
sn.point(200,'a')
console.dir(sn.calculate('a'))
sn.point(400,'b')
sn.point(800,'b')
console.dir(sn.calculate('b'))
console.dir(sn.calculate())
