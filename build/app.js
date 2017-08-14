/*minesweeper V0.0.1 made on 2017-08-13*/

!function(f) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = f(); else if ("function" == typeof define && define.amd) define([], f); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).PIXI = f();
    }
}(function() {
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = "function" == typeof require && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f;
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n || e);
                }, l, l.exports, e, t, n, r);
            }
            return n[o].exports;
        }
        for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
        return s;
    }({
        1: [ function(require, module, exports) {
            "use strict";
            "use restrict";
            function countTrailingZeros(v) {
                var c = 32;
                return (v &= -v) && c--, 65535 & v && (c -= 16), 16711935 & v && (c -= 8), 252645135 & v && (c -= 4), 
                858993459 & v && (c -= 2), 1431655765 & v && (c -= 1), c;
            }
            exports.INT_BITS = 32, exports.INT_MAX = 2147483647, exports.INT_MIN = -1 << 31, 
            exports.sign = function(v) {
                return (v > 0) - (v < 0);
            }, exports.abs = function(v) {
                var mask = v >> 31;
                return (v ^ mask) - mask;
            }, exports.min = function(x, y) {
                return y ^ (x ^ y) & -(x < y);
            }, exports.max = function(x, y) {
                return x ^ (x ^ y) & -(x < y);
            }, exports.isPow2 = function(v) {
                return !(v & v - 1 || !v);
            }, exports.log2 = function(v) {
                var r, shift;
                return r = (v > 65535) << 4, v >>>= r, shift = (v > 255) << 3, v >>>= shift, r |= shift, 
                shift = (v > 15) << 2, v >>>= shift, r |= shift, shift = (v > 3) << 1, v >>>= shift, 
                (r |= shift) | v >> 1;
            }, exports.log10 = function(v) {
                return v >= 1e9 ? 9 : v >= 1e8 ? 8 : v >= 1e7 ? 7 : v >= 1e6 ? 6 : v >= 1e5 ? 5 : v >= 1e4 ? 4 : v >= 1e3 ? 3 : v >= 100 ? 2 : v >= 10 ? 1 : 0;
            }, exports.popCount = function(v) {
                return v -= v >>> 1 & 1431655765, 16843009 * ((v = (858993459 & v) + (v >>> 2 & 858993459)) + (v >>> 4) & 252645135) >>> 24;
            }, exports.countTrailingZeros = countTrailingZeros, exports.nextPow2 = function(v) {
                return v += 0 === v, --v, v |= v >>> 1, v |= v >>> 2, v |= v >>> 4, v |= v >>> 8, 
                (v |= v >>> 16) + 1;
            }, exports.prevPow2 = function(v) {
                return v |= v >>> 1, v |= v >>> 2, v |= v >>> 4, v |= v >>> 8, (v |= v >>> 16) - (v >>> 1);
            }, exports.parity = function(v) {
                return v ^= v >>> 16, v ^= v >>> 8, v ^= v >>> 4, 27030 >>> (v &= 15) & 1;
            };
            var REVERSE_TABLE = new Array(256);
            !function(tab) {
                for (var i = 0; i < 256; ++i) {
                    var v = i, r = i, s = 7;
                    for (v >>>= 1; v; v >>>= 1) r <<= 1, r |= 1 & v, --s;
                    tab[i] = r << s & 255;
                }
            }(REVERSE_TABLE), exports.reverse = function(v) {
                return REVERSE_TABLE[255 & v] << 24 | REVERSE_TABLE[v >>> 8 & 255] << 16 | REVERSE_TABLE[v >>> 16 & 255] << 8 | REVERSE_TABLE[v >>> 24 & 255];
            }, exports.interleave2 = function(x, y) {
                return x &= 65535, x = 16711935 & (x | x << 8), x = 252645135 & (x | x << 4), x = 858993459 & (x | x << 2), 
                x = 1431655765 & (x | x << 1), y &= 65535, y = 16711935 & (y | y << 8), y = 252645135 & (y | y << 4), 
                y = 858993459 & (y | y << 2), y = 1431655765 & (y | y << 1), x | y << 1;
            }, exports.deinterleave2 = function(v, n) {
                return v = v >>> n & 1431655765, v = 858993459 & (v | v >>> 1), v = 252645135 & (v | v >>> 2), 
                v = 16711935 & (v | v >>> 4), (v = 65535 & (v | v >>> 16)) << 16 >> 16;
            }, exports.interleave3 = function(x, y, z) {
                return x &= 1023, x = 4278190335 & (x | x << 16), x = 251719695 & (x | x << 8), 
                x = 3272356035 & (x | x << 4), x = 1227133513 & (x | x << 2), y &= 1023, y = 4278190335 & (y | y << 16), 
                y = 251719695 & (y | y << 8), y = 3272356035 & (y | y << 4), y = 1227133513 & (y | y << 2), 
                x |= y << 1, z &= 1023, z = 4278190335 & (z | z << 16), z = 251719695 & (z | z << 8), 
                z = 3272356035 & (z | z << 4), z = 1227133513 & (z | z << 2), x | z << 2;
            }, exports.deinterleave3 = function(v, n) {
                return v = v >>> n & 1227133513, v = 3272356035 & (v | v >>> 2), v = 251719695 & (v | v >>> 4), 
                v = 4278190335 & (v | v >>> 8), (v = 1023 & (v | v >>> 16)) << 22 >> 22;
            }, exports.nextCombination = function(v) {
                var t = v | v - 1;
                return t + 1 | (~t & -~t) - 1 >>> countTrailingZeros(v) + 1;
            };
        }, {} ],
        2: [ function(require, module, exports) {
            "use strict";
            function earcut(data, holeIndices, dim) {
                dim = dim || 2;
                var hasHoles = holeIndices && holeIndices.length, outerLen = hasHoles ? holeIndices[0] * dim : data.length, outerNode = linkedList(data, 0, outerLen, dim, !0), triangles = [];
                if (!outerNode) return triangles;
                var minX, minY, maxX, maxY, x, y, size;
                if (hasHoles && (outerNode = eliminateHoles(data, holeIndices, outerNode, dim)), 
                data.length > 80 * dim) {
                    minX = maxX = data[0], minY = maxY = data[1];
                    for (var i = dim; i < outerLen; i += dim) x = data[i], y = data[i + 1], x < minX && (minX = x), 
                    y < minY && (minY = y), x > maxX && (maxX = x), y > maxY && (maxY = y);
                    size = Math.max(maxX - minX, maxY - minY);
                }
                return earcutLinked(outerNode, triangles, dim, minX, minY, size), triangles;
            }
            function linkedList(data, start, end, dim, clockwise) {
                var i, last;
                if (clockwise === signedArea(data, start, end, dim) > 0) for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last); else for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
                return last && equals(last, last.next) && (removeNode(last), last = last.next), 
                last;
            }
            function filterPoints(start, end) {
                if (!start) return start;
                end || (end = start);
                var again, p = start;
                do {
                    if (again = !1, p.steiner || !equals(p, p.next) && 0 !== area(p.prev, p, p.next)) p = p.next; else {
                        if (removeNode(p), (p = end = p.prev) === p.next) return null;
                        again = !0;
                    }
                } while (again || p !== end);
                return end;
            }
            function earcutLinked(ear, triangles, dim, minX, minY, size, pass) {
                if (ear) {
                    !pass && size && indexCurve(ear, minX, minY, size);
                    for (var prev, next, stop = ear; ear.prev !== ear.next; ) if (prev = ear.prev, next = ear.next, 
                    size ? isEarHashed(ear, minX, minY, size) : isEar(ear)) triangles.push(prev.i / dim), 
                    triangles.push(ear.i / dim), triangles.push(next.i / dim), removeNode(ear), ear = next.next, 
                    stop = next.next; else if ((ear = next) === stop) {
                        pass ? 1 === pass ? earcutLinked(ear = cureLocalIntersections(ear, triangles, dim), triangles, dim, minX, minY, size, 2) : 2 === pass && splitEarcut(ear, triangles, dim, minX, minY, size) : earcutLinked(filterPoints(ear), triangles, dim, minX, minY, size, 1);
                        break;
                    }
                }
            }
            function isEar(ear) {
                var a = ear.prev, b = ear, c = ear.next;
                if (area(a, b, c) >= 0) return !1;
                for (var p = ear.next.next; p !== ear.prev; ) {
                    if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return !1;
                    p = p.next;
                }
                return !0;
            }
            function isEarHashed(ear, minX, minY, size) {
                var a = ear.prev, b = ear, c = ear.next;
                if (area(a, b, c) >= 0) return !1;
                for (var minTX = a.x < b.x ? a.x < c.x ? a.x : c.x : b.x < c.x ? b.x : c.x, minTY = a.y < b.y ? a.y < c.y ? a.y : c.y : b.y < c.y ? b.y : c.y, maxTX = a.x > b.x ? a.x > c.x ? a.x : c.x : b.x > c.x ? b.x : c.x, maxTY = a.y > b.y ? a.y > c.y ? a.y : c.y : b.y > c.y ? b.y : c.y, minZ = zOrder(minTX, minTY, minX, minY, size), maxZ = zOrder(maxTX, maxTY, minX, minY, size), p = ear.nextZ; p && p.z <= maxZ; ) {
                    if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return !1;
                    p = p.nextZ;
                }
                for (p = ear.prevZ; p && p.z >= minZ; ) {
                    if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return !1;
                    p = p.prevZ;
                }
                return !0;
            }
            function cureLocalIntersections(start, triangles, dim) {
                var p = start;
                do {
                    var a = p.prev, b = p.next.next;
                    !equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a) && (triangles.push(a.i / dim), 
                    triangles.push(p.i / dim), triangles.push(b.i / dim), removeNode(p), removeNode(p.next), 
                    p = start = b), p = p.next;
                } while (p !== start);
                return p;
            }
            function splitEarcut(start, triangles, dim, minX, minY, size) {
                var a = start;
                do {
                    for (var b = a.next.next; b !== a.prev; ) {
                        if (a.i !== b.i && isValidDiagonal(a, b)) {
                            var c = splitPolygon(a, b);
                            return a = filterPoints(a, a.next), c = filterPoints(c, c.next), earcutLinked(a, triangles, dim, minX, minY, size), 
                            void earcutLinked(c, triangles, dim, minX, minY, size);
                        }
                        b = b.next;
                    }
                    a = a.next;
                } while (a !== start);
            }
            function eliminateHoles(data, holeIndices, outerNode, dim) {
                var i, len, list, queue = [];
                for (i = 0, len = holeIndices.length; i < len; i++) (list = linkedList(data, holeIndices[i] * dim, i < len - 1 ? holeIndices[i + 1] * dim : data.length, dim, !1)) === list.next && (list.steiner = !0), 
                queue.push(getLeftmost(list));
                for (queue.sort(compareX), i = 0; i < queue.length; i++) eliminateHole(queue[i], outerNode), 
                outerNode = filterPoints(outerNode, outerNode.next);
                return outerNode;
            }
            function compareX(a, b) {
                return a.x - b.x;
            }
            function eliminateHole(hole, outerNode) {
                if (outerNode = findHoleBridge(hole, outerNode)) {
                    var b = splitPolygon(outerNode, hole);
                    filterPoints(b, b.next);
                }
            }
            function findHoleBridge(hole, outerNode) {
                var m, p = outerNode, hx = hole.x, hy = hole.y, qx = -1 / 0;
                do {
                    if (hy <= p.y && hy >= p.next.y) {
                        var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
                        if (x <= hx && x > qx) {
                            if (qx = x, x === hx) {
                                if (hy === p.y) return p;
                                if (hy === p.next.y) return p.next;
                            }
                            m = p.x < p.next.x ? p : p.next;
                        }
                    }
                    p = p.next;
                } while (p !== outerNode);
                if (!m) return null;
                if (hx === qx) return m.prev;
                var tan, stop = m, mx = m.x, my = m.y, tanMin = 1 / 0;
                for (p = m.next; p !== stop; ) hx >= p.x && p.x >= mx && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y) && ((tan = Math.abs(hy - p.y) / (hx - p.x)) < tanMin || tan === tanMin && p.x > m.x) && locallyInside(p, hole) && (m = p, 
                tanMin = tan), p = p.next;
                return m;
            }
            function indexCurve(start, minX, minY, size) {
                var p = start;
                do {
                    null === p.z && (p.z = zOrder(p.x, p.y, minX, minY, size)), p.prevZ = p.prev, p.nextZ = p.next, 
                    p = p.next;
                } while (p !== start);
                p.prevZ.nextZ = null, p.prevZ = null, sortLinked(p);
            }
            function sortLinked(list) {
                var i, p, q, e, tail, numMerges, pSize, qSize, inSize = 1;
                do {
                    for (p = list, list = null, tail = null, numMerges = 0; p; ) {
                        for (numMerges++, q = p, pSize = 0, i = 0; i < inSize && (pSize++, q = q.nextZ); i++) ;
                        for (qSize = inSize; pSize > 0 || qSize > 0 && q; ) 0 === pSize ? (e = q, q = q.nextZ, 
                        qSize--) : 0 !== qSize && q ? p.z <= q.z ? (e = p, p = p.nextZ, pSize--) : (e = q, 
                        q = q.nextZ, qSize--) : (e = p, p = p.nextZ, pSize--), tail ? tail.nextZ = e : list = e, 
                        e.prevZ = tail, tail = e;
                        p = q;
                    }
                    tail.nextZ = null, inSize *= 2;
                } while (numMerges > 1);
                return list;
            }
            function zOrder(x, y, minX, minY, size) {
                return x = 32767 * (x - minX) / size, y = 32767 * (y - minY) / size, x = 16711935 & (x | x << 8), 
                x = 252645135 & (x | x << 4), x = 858993459 & (x | x << 2), x = 1431655765 & (x | x << 1), 
                y = 16711935 & (y | y << 8), y = 252645135 & (y | y << 4), y = 858993459 & (y | y << 2), 
                y = 1431655765 & (y | y << 1), x | y << 1;
            }
            function getLeftmost(start) {
                var p = start, leftmost = start;
                do {
                    p.x < leftmost.x && (leftmost = p), p = p.next;
                } while (p !== start);
                return leftmost;
            }
            function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
                return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 && (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 && (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
            }
            function isValidDiagonal(a, b) {
                return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
            }
            function area(p, q, r) {
                return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
            }
            function equals(p1, p2) {
                return p1.x === p2.x && p1.y === p2.y;
            }
            function intersects(p1, q1, p2, q2) {
                return !!(equals(p1, q1) && equals(p2, q2) || equals(p1, q2) && equals(p2, q1)) || area(p1, q1, p2) > 0 != area(p1, q1, q2) > 0 && area(p2, q2, p1) > 0 != area(p2, q2, q1) > 0;
            }
            function intersectsPolygon(a, b) {
                var p = a;
                do {
                    if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) return !0;
                    p = p.next;
                } while (p !== a);
                return !1;
            }
            function locallyInside(a, b) {
                return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
            }
            function middleInside(a, b) {
                var p = a, inside = !1, px = (a.x + b.x) / 2, py = (a.y + b.y) / 2;
                do {
                    p.y > py != p.next.y > py && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x && (inside = !inside), 
                    p = p.next;
                } while (p !== a);
                return inside;
            }
            function splitPolygon(a, b) {
                var a2 = new Node(a.i, a.x, a.y), b2 = new Node(b.i, b.x, b.y), an = a.next, bp = b.prev;
                return a.next = b, b.prev = a, a2.next = an, an.prev = a2, b2.next = a2, a2.prev = b2, 
                bp.next = b2, b2.prev = bp, b2;
            }
            function insertNode(i, x, y, last) {
                var p = new Node(i, x, y);
                return last ? (p.next = last.next, p.prev = last, last.next.prev = p, last.next = p) : (p.prev = p, 
                p.next = p), p;
            }
            function removeNode(p) {
                p.next.prev = p.prev, p.prev.next = p.next, p.prevZ && (p.prevZ.nextZ = p.nextZ), 
                p.nextZ && (p.nextZ.prevZ = p.prevZ);
            }
            function Node(i, x, y) {
                this.i = i, this.x = x, this.y = y, this.prev = null, this.next = null, this.z = null, 
                this.prevZ = null, this.nextZ = null, this.steiner = !1;
            }
            function signedArea(data, start, end, dim) {
                for (var sum = 0, i = start, j = end - dim; i < end; i += dim) sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]), 
                j = i;
                return sum;
            }
            module.exports = earcut, earcut.deviation = function(data, holeIndices, dim, triangles) {
                var hasHoles = holeIndices && holeIndices.length, outerLen = hasHoles ? holeIndices[0] * dim : data.length, polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
                if (hasHoles) for (var i = 0, len = holeIndices.length; i < len; i++) {
                    var start = holeIndices[i] * dim, end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
                    polygonArea -= Math.abs(signedArea(data, start, end, dim));
                }
                var trianglesArea = 0;
                for (i = 0; i < triangles.length; i += 3) {
                    var a = triangles[i] * dim, b = triangles[i + 1] * dim, c = triangles[i + 2] * dim;
                    trianglesArea += Math.abs((data[a] - data[c]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
                }
                return 0 === polygonArea && 0 === trianglesArea ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
            }, earcut.flatten = function(data) {
                for (var dim = data[0][0].length, result = {
                    vertices: [],
                    holes: [],
                    dimensions: dim
                }, holeIndex = 0, i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].length; j++) for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
                    i > 0 && (holeIndex += data[i - 1].length, result.holes.push(holeIndex));
                }
                return result;
            };
        }, {} ],
        3: [ function(require, module, exports) {
            "use strict";
            function Events() {}
            function EE(fn, context, once) {
                this.fn = fn, this.context = context, this.once = once || !1;
            }
            function EventEmitter() {
                this._events = new Events(), this._eventsCount = 0;
            }
            var has = Object.prototype.hasOwnProperty, prefix = "~";
            Object.create && (Events.prototype = Object.create(null), new Events().__proto__ || (prefix = !1)), 
            EventEmitter.prototype.eventNames = function() {
                var events, name, names = [];
                if (0 === this._eventsCount) return names;
                for (name in events = this._events) has.call(events, name) && names.push(prefix ? name.slice(1) : name);
                return Object.getOwnPropertySymbols ? names.concat(Object.getOwnPropertySymbols(events)) : names;
            }, EventEmitter.prototype.listeners = function(event, exists) {
                var evt = prefix ? prefix + event : event, available = this._events[evt];
                if (exists) return !!available;
                if (!available) return [];
                if (available.fn) return [ available.fn ];
                for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) ee[i] = available[i].fn;
                return ee;
            }, EventEmitter.prototype.emit = function(event, a1, a2, a3, a4, a5) {
                var evt = prefix ? prefix + event : event;
                if (!this._events[evt]) return !1;
                var args, i, listeners = this._events[evt], len = arguments.length;
                if (listeners.fn) {
                    switch (listeners.once && this.removeListener(event, listeners.fn, void 0, !0), 
                    len) {
                      case 1:
                        return listeners.fn.call(listeners.context), !0;

                      case 2:
                        return listeners.fn.call(listeners.context, a1), !0;

                      case 3:
                        return listeners.fn.call(listeners.context, a1, a2), !0;

                      case 4:
                        return listeners.fn.call(listeners.context, a1, a2, a3), !0;

                      case 5:
                        return listeners.fn.call(listeners.context, a1, a2, a3, a4), !0;

                      case 6:
                        return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), !0;
                    }
                    for (i = 1, args = new Array(len - 1); i < len; i++) args[i - 1] = arguments[i];
                    listeners.fn.apply(listeners.context, args);
                } else {
                    var j, length = listeners.length;
                    for (i = 0; i < length; i++) switch (listeners[i].once && this.removeListener(event, listeners[i].fn, void 0, !0), 
                    len) {
                      case 1:
                        listeners[i].fn.call(listeners[i].context);
                        break;

                      case 2:
                        listeners[i].fn.call(listeners[i].context, a1);
                        break;

                      case 3:
                        listeners[i].fn.call(listeners[i].context, a1, a2);
                        break;

                      case 4:
                        listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                        break;

                      default:
                        if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) args[j - 1] = arguments[j];
                        listeners[i].fn.apply(listeners[i].context, args);
                    }
                }
                return !0;
            }, EventEmitter.prototype.on = function(event, fn, context) {
                var listener = new EE(fn, context || this), evt = prefix ? prefix + event : event;
                return this._events[evt] ? this._events[evt].fn ? this._events[evt] = [ this._events[evt], listener ] : this._events[evt].push(listener) : (this._events[evt] = listener, 
                this._eventsCount++), this;
            }, EventEmitter.prototype.once = function(event, fn, context) {
                var listener = new EE(fn, context || this, !0), evt = prefix ? prefix + event : event;
                return this._events[evt] ? this._events[evt].fn ? this._events[evt] = [ this._events[evt], listener ] : this._events[evt].push(listener) : (this._events[evt] = listener, 
                this._eventsCount++), this;
            }, EventEmitter.prototype.removeListener = function(event, fn, context, once) {
                var evt = prefix ? prefix + event : event;
                if (!this._events[evt]) return this;
                if (!fn) return 0 == --this._eventsCount ? this._events = new Events() : delete this._events[evt], 
                this;
                var listeners = this._events[evt];
                if (listeners.fn) listeners.fn !== fn || once && !listeners.once || context && listeners.context !== context || (0 == --this._eventsCount ? this._events = new Events() : delete this._events[evt]); else {
                    for (var i = 0, events = [], length = listeners.length; i < length; i++) (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) && events.push(listeners[i]);
                    events.length ? this._events[evt] = 1 === events.length ? events[0] : events : 0 == --this._eventsCount ? this._events = new Events() : delete this._events[evt];
                }
                return this;
            }, EventEmitter.prototype.removeAllListeners = function(event) {
                var evt;
                return event ? (evt = prefix ? prefix + event : event, this._events[evt] && (0 == --this._eventsCount ? this._events = new Events() : delete this._events[evt])) : (this._events = new Events(), 
                this._eventsCount = 0), this;
            }, EventEmitter.prototype.off = EventEmitter.prototype.removeListener, EventEmitter.prototype.addListener = EventEmitter.prototype.on, 
            EventEmitter.prototype.setMaxListeners = function() {
                return this;
            }, EventEmitter.prefixed = prefix, EventEmitter.EventEmitter = EventEmitter, void 0 !== module && (module.exports = EventEmitter);
        }, {} ],
        4: [ function(require, module, exports) {
            !function(global) {
                var apple_phone = /iPhone/i, apple_ipod = /iPod/i, apple_tablet = /iPad/i, android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, android_tablet = /Android/i, amazon_phone = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i, amazon_tablet = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i, windows_phone = /Windows Phone/i, windows_tablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, other_blackberry = /BlackBerry/i, other_blackberry_10 = /BB10/i, other_opera = /Opera Mini/i, other_chrome = /(CriOS|Chrome)(?=.*\bMobile\b)/i, other_firefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, seven_inch = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"), match = function(regex, userAgent) {
                    return regex.test(userAgent);
                }, IsMobileClass = function(userAgent) {
                    var ua = userAgent || navigator.userAgent, tmp = ua.split("[FBAN");
                    if (void 0 !== tmp[1] && (ua = tmp[0]), void 0 !== (tmp = ua.split("Twitter"))[1] && (ua = tmp[0]), 
                    this.apple = {
                        phone: match(apple_phone, ua),
                        ipod: match(apple_ipod, ua),
                        tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
                        device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
                    }, this.amazon = {
                        phone: match(amazon_phone, ua),
                        tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
                        device: match(amazon_phone, ua) || match(amazon_tablet, ua)
                    }, this.android = {
                        phone: match(amazon_phone, ua) || match(android_phone, ua),
                        tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
                        device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
                    }, this.windows = {
                        phone: match(windows_phone, ua),
                        tablet: match(windows_tablet, ua),
                        device: match(windows_phone, ua) || match(windows_tablet, ua)
                    }, this.other = {
                        blackberry: match(other_blackberry, ua),
                        blackberry10: match(other_blackberry_10, ua),
                        opera: match(other_opera, ua),
                        firefox: match(other_firefox, ua),
                        chrome: match(other_chrome, ua),
                        device: match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
                    }, this.seven_inch = match(seven_inch, ua), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, 
                    this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, 
                    "undefined" == typeof window) return this;
                }, instantiate = function() {
                    var IM = new IsMobileClass();
                    return IM.Class = IsMobileClass, IM;
                };
                void 0 !== module && module.exports && "undefined" == typeof window ? module.exports = IsMobileClass : void 0 !== module && module.exports && "undefined" != typeof window ? module.exports = instantiate() : global.isMobile = instantiate();
            }(this);
        }, {} ],
        5: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _addMiniSignalBinding(self, node) {
                return self._head ? (self._tail._next = node, node._prev = self._tail, self._tail = node) : (self._head = node, 
                self._tail = node), node._owner = self, node;
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), MiniSignalBinding = function() {
                function MiniSignalBinding(fn, once, thisArg) {
                    void 0 === once && (once = !1), _classCallCheck(this, MiniSignalBinding), this._fn = fn, 
                    this._once = once, this._thisArg = thisArg, this._next = this._prev = this._owner = null;
                }
                return _createClass(MiniSignalBinding, [ {
                    key: "detach",
                    value: function() {
                        return null !== this._owner && (this._owner.detach(this), !0);
                    }
                } ]), MiniSignalBinding;
            }(), MiniSignal = function() {
                function MiniSignal() {
                    _classCallCheck(this, MiniSignal), this._head = this._tail = void 0;
                }
                return _createClass(MiniSignal, [ {
                    key: "handlers",
                    value: function() {
                        var exists = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0], node = this._head;
                        if (exists) return !!node;
                        for (var ee = []; node; ) ee.push(node), node = node._next;
                        return ee;
                    }
                }, {
                    key: "has",
                    value: function(node) {
                        if (!(node instanceof MiniSignalBinding)) throw new Error("MiniSignal#has(): First arg must be a MiniSignalBinding object.");
                        return node._owner === this;
                    }
                }, {
                    key: "dispatch",
                    value: function() {
                        var node = this._head;
                        if (!node) return !1;
                        for (;node; ) node._once && this.detach(node), node._fn.apply(node._thisArg, arguments), 
                        node = node._next;
                        return !0;
                    }
                }, {
                    key: "add",
                    value: function(fn) {
                        var thisArg = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                        if ("function" != typeof fn) throw new Error("MiniSignal#add(): First arg must be a Function.");
                        return _addMiniSignalBinding(this, new MiniSignalBinding(fn, !1, thisArg));
                    }
                }, {
                    key: "once",
                    value: function(fn) {
                        var thisArg = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                        if ("function" != typeof fn) throw new Error("MiniSignal#once(): First arg must be a Function.");
                        return _addMiniSignalBinding(this, new MiniSignalBinding(fn, !0, thisArg));
                    }
                }, {
                    key: "detach",
                    value: function(node) {
                        if (!(node instanceof MiniSignalBinding)) throw new Error("MiniSignal#detach(): First arg must be a MiniSignalBinding object.");
                        return node._owner !== this ? this : (node._prev && (node._prev._next = node._next), 
                        node._next && (node._next._prev = node._prev), node === this._head ? (this._head = node._next, 
                        null === node._next && (this._tail = null)) : node === this._tail && (this._tail = node._prev, 
                        this._tail._next = null), node._owner = null, this);
                    }
                }, {
                    key: "detachAll",
                    value: function() {
                        var node = this._head;
                        if (!node) return this;
                        for (this._head = this._tail = null; node; ) node._owner = null, node = node._next;
                        return this;
                    }
                } ]), MiniSignal;
            }();
            MiniSignal.MiniSignalBinding = MiniSignalBinding, exports.default = MiniSignal, 
            module.exports = exports.default;
        }, {} ],
        6: [ function(require, module, exports) {
            "use strict";
            function toObject(val) {
                if (null === val || void 0 === val) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(val);
            }
            var getOwnPropertySymbols = Object.getOwnPropertySymbols, hasOwnProperty = Object.prototype.hasOwnProperty, propIsEnumerable = Object.prototype.propertyIsEnumerable;
            module.exports = function() {
                try {
                    if (!Object.assign) return !1;
                    var test1 = new String("abc");
                    if (test1[5] = "de", "5" === Object.getOwnPropertyNames(test1)[0]) return !1;
                    for (var test2 = {}, i = 0; i < 10; i++) test2["_" + String.fromCharCode(i)] = i;
                    if ("0123456789" !== Object.getOwnPropertyNames(test2).map(function(n) {
                        return test2[n];
                    }).join("")) return !1;
                    var test3 = {};
                    return "abcdefghijklmnopqrst".split("").forEach(function(letter) {
                        test3[letter] = letter;
                    }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, test3)).join("");
                } catch (err) {
                    return !1;
                }
            }() ? Object.assign : function(target, source) {
                for (var from, symbols, to = toObject(target), s = 1; s < arguments.length; s++) {
                    from = Object(arguments[s]);
                    for (var key in from) hasOwnProperty.call(from, key) && (to[key] = from[key]);
                    if (getOwnPropertySymbols) {
                        symbols = getOwnPropertySymbols(from);
                        for (var i = 0; i < symbols.length; i++) propIsEnumerable.call(from, symbols[i]) && (to[symbols[i]] = from[symbols[i]]);
                    }
                }
                return to;
            };
        }, {} ],
        7: [ function(require, module, exports) {
            "use strict";
            module.exports = function(str, opts) {
                opts = opts || {};
                for (var o = {
                    key: [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ],
                    q: {
                        name: "queryKey",
                        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                    },
                    parser: {
                        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                    }
                }, m = o.parser[opts.strictMode ? "strict" : "loose"].exec(str), uri = {}, i = 14; i--; ) uri[o.key[i]] = m[i] || "";
                return uri[o.q.name] = {}, uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
                    $1 && (uri[o.q.name][$1] = $2);
                }), uri;
            };
        }, {} ],
        8: [ function(require, module, exports) {
            (function(process) {
                function normalizeArray(parts, allowAboveRoot) {
                    for (var up = 0, i = parts.length - 1; i >= 0; i--) {
                        var last = parts[i];
                        "." === last ? parts.splice(i, 1) : ".." === last ? (parts.splice(i, 1), up++) : up && (parts.splice(i, 1), 
                        up--);
                    }
                    if (allowAboveRoot) for (;up--; up) parts.unshift("..");
                    return parts;
                }
                function filter(xs, f) {
                    if (xs.filter) return xs.filter(f);
                    for (var res = [], i = 0; i < xs.length; i++) f(xs[i], i, xs) && res.push(xs[i]);
                    return res;
                }
                var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, splitPath = function(filename) {
                    return splitPathRe.exec(filename).slice(1);
                };
                exports.resolve = function() {
                    for (var resolvedPath = "", resolvedAbsolute = !1, i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                        var path = i >= 0 ? arguments[i] : process.cwd();
                        if ("string" != typeof path) throw new TypeError("Arguments to path.resolve must be strings");
                        path && (resolvedPath = path + "/" + resolvedPath, resolvedAbsolute = "/" === path.charAt(0));
                    }
                    return resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
                        return !!p;
                    }), !resolvedAbsolute).join("/"), (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
                }, exports.normalize = function(path) {
                    var isAbsolute = exports.isAbsolute(path), trailingSlash = "/" === substr(path, -1);
                    return (path = normalizeArray(filter(path.split("/"), function(p) {
                        return !!p;
                    }), !isAbsolute).join("/")) || isAbsolute || (path = "."), path && trailingSlash && (path += "/"), 
                    (isAbsolute ? "/" : "") + path;
                }, exports.isAbsolute = function(path) {
                    return "/" === path.charAt(0);
                }, exports.join = function() {
                    var paths = Array.prototype.slice.call(arguments, 0);
                    return exports.normalize(filter(paths, function(p, index) {
                        if ("string" != typeof p) throw new TypeError("Arguments to path.join must be strings");
                        return p;
                    }).join("/"));
                }, exports.relative = function(from, to) {
                    function trim(arr) {
                        for (var start = 0; start < arr.length && "" === arr[start]; start++) ;
                        for (var end = arr.length - 1; end >= 0 && "" === arr[end]; end--) ;
                        return start > end ? [] : arr.slice(start, end - start + 1);
                    }
                    from = exports.resolve(from).substr(1), to = exports.resolve(to).substr(1);
                    for (var fromParts = trim(from.split("/")), toParts = trim(to.split("/")), length = Math.min(fromParts.length, toParts.length), samePartsLength = length, i = 0; i < length; i++) if (fromParts[i] !== toParts[i]) {
                        samePartsLength = i;
                        break;
                    }
                    for (var outputParts = [], i = samePartsLength; i < fromParts.length; i++) outputParts.push("..");
                    return (outputParts = outputParts.concat(toParts.slice(samePartsLength))).join("/");
                }, exports.sep = "/", exports.delimiter = ":", exports.dirname = function(path) {
                    var result = splitPath(path), root = result[0], dir = result[1];
                    return root || dir ? (dir && (dir = dir.substr(0, dir.length - 1)), root + dir) : ".";
                }, exports.basename = function(path, ext) {
                    var f = splitPath(path)[2];
                    return ext && f.substr(-1 * ext.length) === ext && (f = f.substr(0, f.length - ext.length)), 
                    f;
                }, exports.extname = function(path) {
                    return splitPath(path)[3];
                };
                var substr = "b" === "ab".substr(-1) ? function(str, start, len) {
                    return str.substr(start, len);
                } : function(str, start, len) {
                    return start < 0 && (start = str.length + start), str.substr(start, len);
                };
            }).call(this, require("_process"));
        }, {
            _process: 26
        } ],
        9: [ function(require, module, exports) {
            var EMPTY_ARRAY_BUFFER = new ArrayBuffer(0), Buffer = function(gl, type, data, drawType) {
                this.gl = gl, this.buffer = gl.createBuffer(), this.type = type || gl.ARRAY_BUFFER, 
                this.drawType = drawType || gl.STATIC_DRAW, this.data = EMPTY_ARRAY_BUFFER, data && this.upload(data), 
                this._updateID = 0;
            };
            Buffer.prototype.upload = function(data, offset, dontBind) {
                dontBind || this.bind();
                var gl = this.gl;
                data = data || this.data, offset = offset || 0, this.data.byteLength >= data.byteLength ? gl.bufferSubData(this.type, offset, data) : gl.bufferData(this.type, data, this.drawType), 
                this.data = data;
            }, Buffer.prototype.bind = function() {
                this.gl.bindBuffer(this.type, this.buffer);
            }, Buffer.createVertexBuffer = function(gl, data, drawType) {
                return new Buffer(gl, gl.ARRAY_BUFFER, data, drawType);
            }, Buffer.createIndexBuffer = function(gl, data, drawType) {
                return new Buffer(gl, gl.ELEMENT_ARRAY_BUFFER, data, drawType);
            }, Buffer.create = function(gl, type, data, drawType) {
                return new Buffer(gl, type, data, drawType);
            }, Buffer.prototype.destroy = function() {
                this.gl.deleteBuffer(this.buffer);
            }, module.exports = Buffer;
        }, {} ],
        10: [ function(require, module, exports) {
            var Texture = require("./GLTexture"), Framebuffer = function(gl, width, height) {
                this.gl = gl, this.framebuffer = gl.createFramebuffer(), this.stencil = null, this.texture = null, 
                this.width = width || 100, this.height = height || 100;
            };
            Framebuffer.prototype.enableTexture = function(texture) {
                var gl = this.gl;
                this.texture = texture || new Texture(gl), this.texture.bind(), this.bind(), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.texture, 0);
            }, Framebuffer.prototype.enableStencil = function() {
                if (!this.stencil) {
                    var gl = this.gl;
                    this.stencil = gl.createRenderbuffer(), gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencil), 
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.stencil), 
                    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.width, this.height);
                }
            }, Framebuffer.prototype.clear = function(r, g, b, a) {
                this.bind();
                var gl = this.gl;
                gl.clearColor(r, g, b, a), gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            }, Framebuffer.prototype.bind = function() {
                var gl = this.gl;
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
            }, Framebuffer.prototype.unbind = function() {
                var gl = this.gl;
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            }, Framebuffer.prototype.resize = function(width, height) {
                var gl = this.gl;
                this.width = width, this.height = height, this.texture && this.texture.uploadData(null, width, height), 
                this.stencil && (gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencil), gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height));
            }, Framebuffer.prototype.destroy = function() {
                var gl = this.gl;
                this.texture && this.texture.destroy(), gl.deleteFramebuffer(this.framebuffer), 
                this.gl = null, this.stencil = null, this.texture = null;
            }, Framebuffer.createRGBA = function(gl, width, height, data) {
                var texture = Texture.fromData(gl, null, width, height);
                texture.enableNearestScaling(), texture.enableWrapClamp();
                var fbo = new Framebuffer(gl, width, height);
                return fbo.enableTexture(texture), fbo.unbind(), fbo;
            }, Framebuffer.createFloat32 = function(gl, width, height, data) {
                var texture = new Texture.fromData(gl, data, width, height);
                texture.enableNearestScaling(), texture.enableWrapClamp();
                var fbo = new Framebuffer(gl, width, height);
                return fbo.enableTexture(texture), fbo.unbind(), fbo;
            }, module.exports = Framebuffer;
        }, {
            "./GLTexture": 12
        } ],
        11: [ function(require, module, exports) {
            var compileProgram = require("./shader/compileProgram"), extractAttributes = require("./shader/extractAttributes"), extractUniforms = require("./shader/extractUniforms"), setPrecision = require("./shader/setPrecision"), generateUniformAccessObject = require("./shader/generateUniformAccessObject"), Shader = function(gl, vertexSrc, fragmentSrc, precision, attributeLocations) {
                this.gl = gl, precision && (vertexSrc = setPrecision(vertexSrc, precision), fragmentSrc = setPrecision(fragmentSrc, precision)), 
                this.program = compileProgram(gl, vertexSrc, fragmentSrc, attributeLocations), this.attributes = extractAttributes(gl, this.program), 
                this.uniformData = extractUniforms(gl, this.program), this.uniforms = generateUniformAccessObject(gl, this.uniformData);
            };
            Shader.prototype.bind = function() {
                this.gl.useProgram(this.program);
            }, Shader.prototype.destroy = function() {
                this.attributes = null, this.uniformData = null, this.uniforms = null, this.gl.deleteProgram(this.program);
            }, module.exports = Shader;
        }, {
            "./shader/compileProgram": 17,
            "./shader/extractAttributes": 19,
            "./shader/extractUniforms": 20,
            "./shader/generateUniformAccessObject": 21,
            "./shader/setPrecision": 25
        } ],
        12: [ function(require, module, exports) {
            var Texture = function(gl, width, height, format, type) {
                this.gl = gl, this.texture = gl.createTexture(), this.mipmap = !1, this.premultiplyAlpha = !1, 
                this.width = width || -1, this.height = height || -1, this.format = format || gl.RGBA, 
                this.type = type || gl.UNSIGNED_BYTE;
            };
            Texture.prototype.upload = function(source) {
                this.bind();
                var gl = this.gl;
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
                var newWidth = source.videoWidth || source.width, newHeight = source.videoHeight || source.height;
                newHeight !== this.height || newWidth !== this.width ? gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, this.type, source) : gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.format, this.type, source), 
                this.width = newWidth, this.height = newHeight;
            };
            var FLOATING_POINT_AVAILABLE = !1;
            Texture.prototype.uploadData = function(data, width, height) {
                this.bind();
                var gl = this.gl;
                if (data instanceof Float32Array) {
                    if (!FLOATING_POINT_AVAILABLE) {
                        if (!gl.getExtension("OES_texture_float")) throw new Error("floating point textures not available");
                        FLOATING_POINT_AVAILABLE = !0;
                    }
                    this.type = gl.FLOAT;
                } else this.type = this.type || gl.UNSIGNED_BYTE;
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha), width !== this.width || height !== this.height ? gl.texImage2D(gl.TEXTURE_2D, 0, this.format, width, height, 0, this.format, this.type, data || null) : gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, this.format, this.type, data || null), 
                this.width = width, this.height = height;
            }, Texture.prototype.bind = function(location) {
                var gl = this.gl;
                void 0 !== location && gl.activeTexture(gl.TEXTURE0 + location), gl.bindTexture(gl.TEXTURE_2D, this.texture);
            }, Texture.prototype.unbind = function() {
                var gl = this.gl;
                gl.bindTexture(gl.TEXTURE_2D, null);
            }, Texture.prototype.minFilter = function(linear) {
                var gl = this.gl;
                this.bind(), this.mipmap ? gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST) : gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR : gl.NEAREST);
            }, Texture.prototype.magFilter = function(linear) {
                var gl = this.gl;
                this.bind(), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, linear ? gl.LINEAR : gl.NEAREST);
            }, Texture.prototype.enableMipmap = function() {
                var gl = this.gl;
                this.bind(), this.mipmap = !0, gl.generateMipmap(gl.TEXTURE_2D);
            }, Texture.prototype.enableLinearScaling = function() {
                this.minFilter(!0), this.magFilter(!0);
            }, Texture.prototype.enableNearestScaling = function() {
                this.minFilter(!1), this.magFilter(!1);
            }, Texture.prototype.enableWrapClamp = function() {
                var gl = this.gl;
                this.bind(), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), 
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            }, Texture.prototype.enableWrapRepeat = function() {
                var gl = this.gl;
                this.bind(), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            }, Texture.prototype.enableWrapMirrorRepeat = function() {
                var gl = this.gl;
                this.bind(), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT), 
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
            }, Texture.prototype.destroy = function() {
                this.gl.deleteTexture(this.texture);
            }, Texture.fromSource = function(gl, source, premultiplyAlpha) {
                var texture = new Texture(gl);
                return texture.premultiplyAlpha = premultiplyAlpha || !1, texture.upload(source), 
                texture;
            }, Texture.fromData = function(gl, data, width, height) {
                var texture = new Texture(gl);
                return texture.uploadData(data, width, height), texture;
            }, module.exports = Texture;
        }, {} ],
        13: [ function(require, module, exports) {
            function VertexArrayObject(gl, state) {
                if (this.nativeVaoExtension = null, VertexArrayObject.FORCE_NATIVE || (this.nativeVaoExtension = gl.getExtension("OES_vertex_array_object") || gl.getExtension("MOZ_OES_vertex_array_object") || gl.getExtension("WEBKIT_OES_vertex_array_object")), 
                this.nativeState = state, this.nativeVaoExtension) {
                    this.nativeVao = this.nativeVaoExtension.createVertexArrayOES();
                    var maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
                    this.nativeState = {
                        tempAttribState: new Array(maxAttribs),
                        attribState: new Array(maxAttribs)
                    };
                }
                this.gl = gl, this.attributes = [], this.indexBuffer = null, this.dirty = !1;
            }
            var setVertexAttribArrays = require("./setVertexAttribArrays");
            VertexArrayObject.prototype.constructor = VertexArrayObject, module.exports = VertexArrayObject, 
            VertexArrayObject.FORCE_NATIVE = !1, VertexArrayObject.prototype.bind = function() {
                return this.nativeVao ? (this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao), 
                this.dirty && (this.dirty = !1, this.activate())) : this.activate(), this;
            }, VertexArrayObject.prototype.unbind = function() {
                return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(null), this;
            }, VertexArrayObject.prototype.activate = function() {
                for (var gl = this.gl, lastBuffer = null, i = 0; i < this.attributes.length; i++) {
                    var attrib = this.attributes[i];
                    lastBuffer !== attrib.buffer && (attrib.buffer.bind(), lastBuffer = attrib.buffer), 
                    gl.vertexAttribPointer(attrib.attribute.location, attrib.attribute.size, attrib.type || gl.FLOAT, attrib.normalized || !1, attrib.stride || 0, attrib.start || 0);
                }
                return setVertexAttribArrays(gl, this.attributes, this.nativeState), this.indexBuffer && this.indexBuffer.bind(), 
                this;
            }, VertexArrayObject.prototype.addAttribute = function(buffer, attribute, type, normalized, stride, start) {
                return this.attributes.push({
                    buffer: buffer,
                    attribute: attribute,
                    location: attribute.location,
                    type: type || this.gl.FLOAT,
                    normalized: normalized || !1,
                    stride: stride || 0,
                    start: start || 0
                }), this.dirty = !0, this;
            }, VertexArrayObject.prototype.addIndex = function(buffer) {
                return this.indexBuffer = buffer, this.dirty = !0, this;
            }, VertexArrayObject.prototype.clear = function() {
                return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao), 
                this.attributes.length = 0, this.indexBuffer = null, this;
            }, VertexArrayObject.prototype.draw = function(type, size, start) {
                var gl = this.gl;
                return this.indexBuffer ? gl.drawElements(type, size || this.indexBuffer.data.length, gl.UNSIGNED_SHORT, 2 * (start || 0)) : gl.drawArrays(type, start, size || this.getSize()), 
                this;
            }, VertexArrayObject.prototype.destroy = function() {
                this.gl = null, this.indexBuffer = null, this.attributes = null, this.nativeState = null, 
                this.nativeVao && this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao), 
                this.nativeVaoExtension = null, this.nativeVao = null;
            }, VertexArrayObject.prototype.getSize = function() {
                var attrib = this.attributes[0];
                return attrib.buffer.data.length / (attrib.stride / 4 || attrib.attribute.size);
            };
        }, {
            "./setVertexAttribArrays": 16
        } ],
        14: [ function(require, module, exports) {
            module.exports = function(canvas, options) {
                var gl = canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options);
                if (!gl) throw new Error("This browser does not support webGL. Try using the canvas renderer");
                return gl;
            };
        }, {} ],
        15: [ function(require, module, exports) {
            var gl = {
                createContext: require("./createContext"),
                setVertexAttribArrays: require("./setVertexAttribArrays"),
                GLBuffer: require("./GLBuffer"),
                GLFramebuffer: require("./GLFramebuffer"),
                GLShader: require("./GLShader"),
                GLTexture: require("./GLTexture"),
                VertexArrayObject: require("./VertexArrayObject"),
                shader: require("./shader")
            };
            void 0 !== module && module.exports && (module.exports = gl), "undefined" != typeof window && (window.PIXI = window.PIXI || {}, 
            window.PIXI.glCore = gl);
        }, {
            "./GLBuffer": 9,
            "./GLFramebuffer": 10,
            "./GLShader": 11,
            "./GLTexture": 12,
            "./VertexArrayObject": 13,
            "./createContext": 14,
            "./setVertexAttribArrays": 16,
            "./shader": 22
        } ],
        16: [ function(require, module, exports) {
            module.exports = function(gl, attribs, state) {
                var i;
                if (state) {
                    var tempAttribState = state.tempAttribState, attribState = state.attribState;
                    for (i = 0; i < tempAttribState.length; i++) tempAttribState[i] = !1;
                    for (i = 0; i < attribs.length; i++) tempAttribState[attribs[i].attribute.location] = !0;
                    for (i = 0; i < attribState.length; i++) attribState[i] !== tempAttribState[i] && (attribState[i] = tempAttribState[i], 
                    state.attribState[i] ? gl.enableVertexAttribArray(i) : gl.disableVertexAttribArray(i));
                } else for (i = 0; i < attribs.length; i++) {
                    var attrib = attribs[i];
                    gl.enableVertexAttribArray(attrib.attribute.location);
                }
            };
        }, {} ],
        17: [ function(require, module, exports) {
            var compileShader = function(gl, type, src) {
                var shader = gl.createShader(type);
                return gl.shaderSource(shader, src), gl.compileShader(shader), gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : (console.log(gl.getShaderInfoLog(shader)), 
                null);
            };
            module.exports = function(gl, vertexSrc, fragmentSrc, attributeLocations) {
                var glVertShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc), glFragShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc), program = gl.createProgram();
                if (gl.attachShader(program, glVertShader), gl.attachShader(program, glFragShader), 
                attributeLocations) for (var i in attributeLocations) gl.bindAttribLocation(program, attributeLocations[i], i);
                return gl.linkProgram(program), gl.getProgramParameter(program, gl.LINK_STATUS) || (console.error("Pixi.js Error: Could not initialize shader."), 
                console.error("gl.VALIDATE_STATUS", gl.getProgramParameter(program, gl.VALIDATE_STATUS)), 
                console.error("gl.getError()", gl.getError()), "" !== gl.getProgramInfoLog(program) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", gl.getProgramInfoLog(program)), 
                gl.deleteProgram(program), program = null), gl.deleteShader(glVertShader), gl.deleteShader(glFragShader), 
                program;
            };
        }, {} ],
        18: [ function(require, module, exports) {
            var booleanArray = function(size) {
                for (var array = new Array(size), i = 0; i < array.length; i++) array[i] = !1;
                return array;
            };
            module.exports = function(type, size) {
                switch (type) {
                  case "float":
                    return 0;

                  case "vec2":
                    return new Float32Array(2 * size);

                  case "vec3":
                    return new Float32Array(3 * size);

                  case "vec4":
                    return new Float32Array(4 * size);

                  case "int":
                  case "sampler2D":
                    return 0;

                  case "ivec2":
                    return new Int32Array(2 * size);

                  case "ivec3":
                    return new Int32Array(3 * size);

                  case "ivec4":
                    return new Int32Array(4 * size);

                  case "bool":
                    return !1;

                  case "bvec2":
                    return booleanArray(2 * size);

                  case "bvec3":
                    return booleanArray(3 * size);

                  case "bvec4":
                    return booleanArray(4 * size);

                  case "mat2":
                    return new Float32Array([ 1, 0, 0, 1 ]);

                  case "mat3":
                    return new Float32Array([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);

                  case "mat4":
                    return new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);
                }
            };
        }, {} ],
        19: [ function(require, module, exports) {
            var mapType = require("./mapType"), mapSize = require("./mapSize"), pointer = function(type, normalized, stride, start) {
                gl.vertexAttribPointer(this.location, this.size, type || gl.FLOAT, normalized || !1, stride || 0, start || 0);
            };
            module.exports = function(gl, program) {
                for (var attributes = {}, totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES), i = 0; i < totalAttributes; i++) {
                    var attribData = gl.getActiveAttrib(program, i), type = mapType(gl, attribData.type);
                    attributes[attribData.name] = {
                        type: type,
                        size: mapSize(type),
                        location: gl.getAttribLocation(program, attribData.name),
                        pointer: pointer
                    };
                }
                return attributes;
            };
        }, {
            "./mapSize": 23,
            "./mapType": 24
        } ],
        20: [ function(require, module, exports) {
            var mapType = require("./mapType"), defaultValue = require("./defaultValue");
            module.exports = function(gl, program) {
                for (var uniforms = {}, totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS), i = 0; i < totalUniforms; i++) {
                    var uniformData = gl.getActiveUniform(program, i), name = uniformData.name.replace(/\[.*?\]/, ""), type = mapType(gl, uniformData.type);
                    uniforms[name] = {
                        type: type,
                        size: uniformData.size,
                        location: gl.getUniformLocation(program, name),
                        value: defaultValue(type, uniformData.size)
                    };
                }
                return uniforms;
            };
        }, {
            "./defaultValue": 18,
            "./mapType": 24
        } ],
        21: [ function(require, module, exports) {
            var generateGetter = function(name) {
                var template = getterTemplate.replace("%%", name);
                return new Function(template);
            }, generateSetter = function(name, uniform) {
                var setTemplate, template = setterTemplate.replace(/%%/g, name);
                return (setTemplate = 1 === uniform.size ? GLSL_TO_SINGLE_SETTERS[uniform.type] : GLSL_TO_ARRAY_SETTERS[uniform.type]) && (template += "\nthis.gl." + setTemplate + ";"), 
                new Function("value", template);
            }, getUniformGroup = function(nameTokens, uniform) {
                for (var cur = uniform, i = 0; i < nameTokens.length - 1; i++) {
                    var o = cur[nameTokens[i]] || {
                        data: {}
                    };
                    cur[nameTokens[i]] = o, cur = o;
                }
                return cur;
            }, getterTemplate = [ "return this.data.%%.value;" ].join("\n"), setterTemplate = [ "this.data.%%.value = value;", "var location = this.data.%%.location;" ].join("\n"), GLSL_TO_SINGLE_SETTERS = {
                float: "uniform1f(location, value)",
                vec2: "uniform2f(location, value[0], value[1])",
                vec3: "uniform3f(location, value[0], value[1], value[2])",
                vec4: "uniform4f(location, value[0], value[1], value[2], value[3])",
                int: "uniform1i(location, value)",
                ivec2: "uniform2i(location, value[0], value[1])",
                ivec3: "uniform3i(location, value[0], value[1], value[2])",
                ivec4: "uniform4i(location, value[0], value[1], value[2], value[3])",
                bool: "uniform1i(location, value)",
                bvec2: "uniform2i(location, value[0], value[1])",
                bvec3: "uniform3i(location, value[0], value[1], value[2])",
                bvec4: "uniform4i(location, value[0], value[1], value[2], value[3])",
                mat2: "uniformMatrix2fv(location, false, value)",
                mat3: "uniformMatrix3fv(location, false, value)",
                mat4: "uniformMatrix4fv(location, false, value)",
                sampler2D: "uniform1i(location, value)"
            }, GLSL_TO_ARRAY_SETTERS = {
                float: "uniform1fv(location, value)",
                vec2: "uniform2fv(location, value)",
                vec3: "uniform3fv(location, value)",
                vec4: "uniform4fv(location, value)",
                int: "uniform1iv(location, value)",
                ivec2: "uniform2iv(location, value)",
                ivec3: "uniform3iv(location, value)",
                ivec4: "uniform4iv(location, value)",
                bool: "uniform1iv(location, value)",
                bvec2: "uniform2iv(location, value)",
                bvec3: "uniform3iv(location, value)",
                bvec4: "uniform4iv(location, value)",
                sampler2D: "uniform1iv(location, value)"
            };
            module.exports = function(gl, uniformData) {
                var uniforms = {
                    data: {}
                };
                uniforms.gl = gl;
                for (var uniformKeys = Object.keys(uniformData), i = 0; i < uniformKeys.length; i++) {
                    var fullName = uniformKeys[i], nameTokens = fullName.split("."), name = nameTokens[nameTokens.length - 1], uniformGroup = getUniformGroup(nameTokens, uniforms), uniform = uniformData[fullName];
                    uniformGroup.data[name] = uniform, uniformGroup.gl = gl, Object.defineProperty(uniformGroup, name, {
                        get: generateGetter(name),
                        set: generateSetter(name, uniform)
                    });
                }
                return uniforms;
            };
        }, {} ],
        22: [ function(require, module, exports) {
            module.exports = {
                compileProgram: require("./compileProgram"),
                defaultValue: require("./defaultValue"),
                extractAttributes: require("./extractAttributes"),
                extractUniforms: require("./extractUniforms"),
                generateUniformAccessObject: require("./generateUniformAccessObject"),
                setPrecision: require("./setPrecision"),
                mapSize: require("./mapSize"),
                mapType: require("./mapType")
            };
        }, {
            "./compileProgram": 17,
            "./defaultValue": 18,
            "./extractAttributes": 19,
            "./extractUniforms": 20,
            "./generateUniformAccessObject": 21,
            "./mapSize": 23,
            "./mapType": 24,
            "./setPrecision": 25
        } ],
        23: [ function(require, module, exports) {
            var GLSL_TO_SIZE = {
                float: 1,
                vec2: 2,
                vec3: 3,
                vec4: 4,
                int: 1,
                ivec2: 2,
                ivec3: 3,
                ivec4: 4,
                bool: 1,
                bvec2: 2,
                bvec3: 3,
                bvec4: 4,
                mat2: 4,
                mat3: 9,
                mat4: 16,
                sampler2D: 1
            };
            module.exports = function(type) {
                return GLSL_TO_SIZE[type];
            };
        }, {} ],
        24: [ function(require, module, exports) {
            var GL_TABLE = null, GL_TO_GLSL_TYPES = {
                FLOAT: "float",
                FLOAT_VEC2: "vec2",
                FLOAT_VEC3: "vec3",
                FLOAT_VEC4: "vec4",
                INT: "int",
                INT_VEC2: "ivec2",
                INT_VEC3: "ivec3",
                INT_VEC4: "ivec4",
                BOOL: "bool",
                BOOL_VEC2: "bvec2",
                BOOL_VEC3: "bvec3",
                BOOL_VEC4: "bvec4",
                FLOAT_MAT2: "mat2",
                FLOAT_MAT3: "mat3",
                FLOAT_MAT4: "mat4",
                SAMPLER_2D: "sampler2D"
            };
            module.exports = function(gl, type) {
                if (!GL_TABLE) {
                    var typeNames = Object.keys(GL_TO_GLSL_TYPES);
                    GL_TABLE = {};
                    for (var i = 0; i < typeNames.length; ++i) {
                        var tn = typeNames[i];
                        GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn];
                    }
                }
                return GL_TABLE[type];
            };
        }, {} ],
        25: [ function(require, module, exports) {
            module.exports = function(src, precision) {
                return "precision" !== src.substring(0, 9) ? "precision " + precision + " float;\n" + src : src;
            };
        }, {} ],
        26: [ function(require, module, exports) {
            function defaultSetTimout() {
                throw new Error("setTimeout has not been defined");
            }
            function defaultClearTimeout() {
                throw new Error("clearTimeout has not been defined");
            }
            function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, 
                setTimeout(fun, 0);
                try {
                    return cachedSetTimeout(fun, 0);
                } catch (e) {
                    try {
                        return cachedSetTimeout.call(null, fun, 0);
                    } catch (e) {
                        return cachedSetTimeout.call(this, fun, 0);
                    }
                }
            }
            function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, 
                clearTimeout(marker);
                try {
                    return cachedClearTimeout(marker);
                } catch (e) {
                    try {
                        return cachedClearTimeout.call(null, marker);
                    } catch (e) {
                        return cachedClearTimeout.call(this, marker);
                    }
                }
            }
            function cleanUpNextTick() {
                draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
                queue.length && drainQueue());
            }
            function drainQueue() {
                if (!draining) {
                    var timeout = runTimeout(cleanUpNextTick);
                    draining = !0;
                    for (var len = queue.length; len; ) {
                        for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                        queueIndex = -1, len = queue.length;
                    }
                    currentQueue = null, draining = !1, runClearTimeout(timeout);
                }
            }
            function Item(fun, array) {
                this.fun = fun, this.array = array;
            }
            function noop() {}
            var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
            !function() {
                try {
                    cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
                } catch (e) {
                    cachedSetTimeout = defaultSetTimout;
                }
                try {
                    cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
                } catch (e) {
                    cachedClearTimeout = defaultClearTimeout;
                }
            }();
            var currentQueue, queue = [], draining = !1, queueIndex = -1;
            process.nextTick = function(fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
                queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue);
            }, Item.prototype.run = function() {
                this.fun.apply(null, this.array);
            }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
            process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, 
            process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
            process.emit = noop, process.prependListener = noop, process.prependOnceListener = noop, 
            process.listeners = function(name) {
                return [];
            }, process.binding = function(name) {
                throw new Error("process.binding is not supported");
            }, process.cwd = function() {
                return "/";
            }, process.chdir = function(dir) {
                throw new Error("process.chdir is not supported");
            }, process.umask = function() {
                return 0;
            };
        }, {} ],
        27: [ function(require, module, exports) {
            (function(global) {
                !function(root) {
                    function error(type) {
                        throw new RangeError(errors[type]);
                    }
                    function map(array, fn) {
                        for (var length = array.length, result = []; length--; ) result[length] = fn(array[length]);
                        return result;
                    }
                    function mapDomain(string, fn) {
                        var parts = string.split("@"), result = "";
                        return parts.length > 1 && (result = parts[0] + "@", string = parts[1]), result + map((string = string.replace(regexSeparators, ".")).split("."), fn).join(".");
                    }
                    function ucs2decode(string) {
                        for (var value, extra, output = [], counter = 0, length = string.length; counter < length; ) (value = string.charCodeAt(counter++)) >= 55296 && value <= 56319 && counter < length ? 56320 == (64512 & (extra = string.charCodeAt(counter++))) ? output.push(((1023 & value) << 10) + (1023 & extra) + 65536) : (output.push(value), 
                        counter--) : output.push(value);
                        return output;
                    }
                    function ucs2encode(array) {
                        return map(array, function(value) {
                            var output = "";
                            return value > 65535 && (output += stringFromCharCode((value -= 65536) >>> 10 & 1023 | 55296), 
                            value = 56320 | 1023 & value), output += stringFromCharCode(value);
                        }).join("");
                    }
                    function basicToDigit(codePoint) {
                        return codePoint - 48 < 10 ? codePoint - 22 : codePoint - 65 < 26 ? codePoint - 65 : codePoint - 97 < 26 ? codePoint - 97 : base;
                    }
                    function digitToBasic(digit, flag) {
                        return digit + 22 + 75 * (digit < 26) - ((0 != flag) << 5);
                    }
                    function adapt(delta, numPoints, firstTime) {
                        var k = 0;
                        for (delta = firstTime ? floor(delta / damp) : delta >> 1, delta += floor(delta / numPoints); delta > baseMinusTMin * tMax >> 1; k += base) delta = floor(delta / baseMinusTMin);
                        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
                    }
                    function decode(input) {
                        var out, basic, j, index, oldi, w, k, digit, t, baseMinusT, output = [], inputLength = input.length, i = 0, n = initialN, bias = initialBias;
                        for ((basic = input.lastIndexOf(delimiter)) < 0 && (basic = 0), j = 0; j < basic; ++j) input.charCodeAt(j) >= 128 && error("not-basic"), 
                        output.push(input.charCodeAt(j));
                        for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
                            for (oldi = i, w = 1, k = base; index >= inputLength && error("invalid-input"), 
                            ((digit = basicToDigit(input.charCodeAt(index++))) >= base || digit > floor((maxInt - i) / w)) && error("overflow"), 
                            i += digit * w, t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias, !(digit < t); k += base) w > floor(maxInt / (baseMinusT = base - t)) && error("overflow"), 
                            w *= baseMinusT;
                            bias = adapt(i - oldi, out = output.length + 1, 0 == oldi), floor(i / out) > maxInt - n && error("overflow"), 
                            n += floor(i / out), i %= out, output.splice(i++, 0, n);
                        }
                        return ucs2encode(output);
                    }
                    function encode(input) {
                        var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, inputLength, handledCPCountPlusOne, baseMinusT, qMinusT, output = [];
                        for (inputLength = (input = ucs2decode(input)).length, n = initialN, delta = 0, 
                        bias = initialBias, j = 0; j < inputLength; ++j) (currentValue = input[j]) < 128 && output.push(stringFromCharCode(currentValue));
                        for (handledCPCount = basicLength = output.length, basicLength && output.push(delimiter); handledCPCount < inputLength; ) {
                            for (m = maxInt, j = 0; j < inputLength; ++j) (currentValue = input[j]) >= n && currentValue < m && (m = currentValue);
                            for (m - n > floor((maxInt - delta) / (handledCPCountPlusOne = handledCPCount + 1)) && error("overflow"), 
                            delta += (m - n) * handledCPCountPlusOne, n = m, j = 0; j < inputLength; ++j) if ((currentValue = input[j]) < n && ++delta > maxInt && error("overflow"), 
                            currentValue == n) {
                                for (q = delta, k = base; t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias, 
                                !(q < t); k += base) qMinusT = q - t, baseMinusT = base - t, output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))), 
                                q = floor(qMinusT / baseMinusT);
                                output.push(stringFromCharCode(digitToBasic(q, 0))), bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength), 
                                delta = 0, ++handledCPCount;
                            }
                            ++delta, ++n;
                        }
                        return output.join("");
                    }
                    var freeExports = "object" == typeof exports && exports && !exports.nodeType && exports, freeModule = "object" == typeof module && module && !module.nodeType && module, freeGlobal = "object" == typeof global && global;
                    freeGlobal.global !== freeGlobal && freeGlobal.window !== freeGlobal && freeGlobal.self !== freeGlobal || (root = freeGlobal);
                    var punycode, key, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
                        overflow: "Overflow: input needs wider integers to process",
                        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                        "invalid-input": "Invalid input"
                    }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode;
                    if (punycode = {
                        version: "1.4.1",
                        ucs2: {
                            decode: ucs2decode,
                            encode: ucs2encode
                        },
                        decode: decode,
                        encode: encode,
                        toASCII: function(input) {
                            return mapDomain(input, function(string) {
                                return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
                            });
                        },
                        toUnicode: function(input) {
                            return mapDomain(input, function(string) {
                                return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
                            });
                        }
                    }, freeExports && freeModule) if (module.exports == freeExports) freeModule.exports = punycode; else for (key in punycode) punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]); else root.punycode = punycode;
                }(this);
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {} ],
        28: [ function(require, module, exports) {
            "use strict";
            function hasOwnProperty(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            }
            module.exports = function(qs, sep, eq, options) {
                sep = sep || "&", eq = eq || "=";
                var obj = {};
                if ("string" != typeof qs || 0 === qs.length) return obj;
                var regexp = /\+/g;
                qs = qs.split(sep);
                var maxKeys = 1e3;
                options && "number" == typeof options.maxKeys && (maxKeys = options.maxKeys);
                var len = qs.length;
                maxKeys > 0 && len > maxKeys && (len = maxKeys);
                for (var i = 0; i < len; ++i) {
                    var kstr, vstr, k, v, x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq);
                    idx >= 0 ? (kstr = x.substr(0, idx), vstr = x.substr(idx + 1)) : (kstr = x, vstr = ""), 
                    k = decodeURIComponent(kstr), v = decodeURIComponent(vstr), hasOwnProperty(obj, k) ? isArray(obj[k]) ? obj[k].push(v) : obj[k] = [ obj[k], v ] : obj[k] = v;
                }
                return obj;
            };
            var isArray = Array.isArray || function(xs) {
                return "[object Array]" === Object.prototype.toString.call(xs);
            };
        }, {} ],
        29: [ function(require, module, exports) {
            "use strict";
            function map(xs, f) {
                if (xs.map) return xs.map(f);
                for (var res = [], i = 0; i < xs.length; i++) res.push(f(xs[i], i));
                return res;
            }
            var stringifyPrimitive = function(v) {
                switch (typeof v) {
                  case "string":
                    return v;

                  case "boolean":
                    return v ? "true" : "false";

                  case "number":
                    return isFinite(v) ? v : "";

                  default:
                    return "";
                }
            };
            module.exports = function(obj, sep, eq, name) {
                return sep = sep || "&", eq = eq || "=", null === obj && (obj = void 0), "object" == typeof obj ? map(objectKeys(obj), function(k) {
                    var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                    return isArray(obj[k]) ? map(obj[k], function(v) {
                        return ks + encodeURIComponent(stringifyPrimitive(v));
                    }).join(sep) : ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                }).join(sep) : name ? encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj)) : "";
            };
            var isArray = Array.isArray || function(xs) {
                return "[object Array]" === Object.prototype.toString.call(xs);
            }, objectKeys = Object.keys || function(obj) {
                var res = [];
                for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && res.push(key);
                return res;
            };
        }, {} ],
        30: [ function(require, module, exports) {
            "use strict";
            exports.decode = exports.parse = require("./decode"), exports.encode = exports.stringify = require("./encode");
        }, {
            "./decode": 28,
            "./encode": 29
        } ],
        31: [ function(require, module, exports) {
            "use strict";
            module.exports = function(arr, startIdx, removeCount) {
                var i, length = arr.length;
                if (!(startIdx >= length || 0 === removeCount)) {
                    var len = length - (removeCount = startIdx + removeCount > length ? length - startIdx : removeCount);
                    for (i = startIdx; i < len; ++i) arr[i] = arr[i + removeCount];
                    arr.length = len;
                }
            };
        }, {} ],
        32: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _miniSignals2 = _interopRequireDefault(require("mini-signals")), _parseUri2 = _interopRequireDefault(require("parse-uri")), async = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("./async")), _Resource2 = _interopRequireDefault(require("./Resource")), rgxExtractUrlHash = /(#[\w-]+)?$/, Loader = function() {
                function Loader() {
                    var _this = this, baseUrl = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", concurrency = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
                    _classCallCheck(this, Loader), this.baseUrl = baseUrl, this.progress = 0, this.loading = !1, 
                    this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], 
                    this._resourcesParsing = [], this._boundLoadResource = function(r, d) {
                        return _this._loadResource(r, d);
                    }, this._queue = async.queue(this._boundLoadResource, concurrency), this._queue.pause(), 
                    this.resources = {}, this.onProgress = new _miniSignals2.default(), this.onError = new _miniSignals2.default(), 
                    this.onLoad = new _miniSignals2.default(), this.onStart = new _miniSignals2.default(), 
                    this.onComplete = new _miniSignals2.default();
                }
                return Loader.prototype.add = function(name, url, options, cb) {
                    if (Array.isArray(name)) {
                        for (var i = 0; i < name.length; ++i) this.add(name[i]);
                        return this;
                    }
                    if ("object" === (void 0 === name ? "undefined" : _typeof(name)) && (cb = url || name.callback || name.onComplete, 
                    options = name, url = name.url, name = name.name || name.key || name.url), "string" != typeof url && (cb = options, 
                    options = url, url = name), "string" != typeof url) throw new Error("No url passed to add resource to loader.");
                    if ("function" == typeof options && (cb = options, options = null), this.loading && (!options || !options.parentResource)) throw new Error("Cannot add resources while the loader is running.");
                    if (this.resources[name]) throw new Error('Resource named "' + name + '" already exists.');
                    if (url = this._prepareUrl(url), this.resources[name] = new _Resource2.default(name, url, options), 
                    "function" == typeof cb && this.resources[name].onAfterMiddleware.once(cb), this.loading) {
                        for (var parent = options.parentResource, incompleteChildren = [], _i = 0; _i < parent.children.length; ++_i) parent.children[_i].isComplete || incompleteChildren.push(parent.children[_i]);
                        var eachChunk = parent.progressChunk * (incompleteChildren.length + 1) / (incompleteChildren.length + 2);
                        parent.children.push(this.resources[name]), parent.progressChunk = eachChunk;
                        for (var _i2 = 0; _i2 < incompleteChildren.length; ++_i2) incompleteChildren[_i2].progressChunk = eachChunk;
                        this.resources[name].progressChunk = eachChunk;
                    }
                    return this._queue.push(this.resources[name]), this;
                }, Loader.prototype.pre = function(fn) {
                    return this._beforeMiddleware.push(fn), this;
                }, Loader.prototype.use = function(fn) {
                    return this._afterMiddleware.push(fn), this;
                }, Loader.prototype.reset = function() {
                    this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause();
                    for (var k in this.resources) {
                        var res = this.resources[k];
                        res._onLoadBinding && res._onLoadBinding.detach(), res.isLoading && res.abort();
                    }
                    return this.resources = {}, this;
                }, Loader.prototype.load = function(cb) {
                    if ("function" == typeof cb && this.onComplete.once(cb), this.loading) return this;
                    for (var chunk = 100 / this._queue._tasks.length, i = 0; i < this._queue._tasks.length; ++i) this._queue._tasks[i].data.progressChunk = chunk;
                    return this.loading = !0, this.onStart.dispatch(this), this._queue.resume(), this;
                }, Loader.prototype._prepareUrl = function(url) {
                    var parsedUrl = (0, _parseUri2.default)(url, {
                        strictMode: !0
                    }), result = void 0;
                    if (result = parsedUrl.protocol || !parsedUrl.path || 0 === url.indexOf("//") ? url : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== url.charAt(0) ? this.baseUrl + "/" + url : this.baseUrl + url, 
                    this.defaultQueryString) {
                        var hash = rgxExtractUrlHash.exec(result)[0];
                        -1 !== (result = result.substr(0, result.length - hash.length)).indexOf("?") ? result += "&" + this.defaultQueryString : result += "?" + this.defaultQueryString, 
                        result += hash;
                    }
                    return result;
                }, Loader.prototype._loadResource = function(resource, dequeue) {
                    var _this2 = this;
                    resource._dequeue = dequeue, async.eachSeries(this._beforeMiddleware, function(fn, next) {
                        fn.call(_this2, resource, function() {
                            next(resource.isComplete ? {} : null);
                        });
                    }, function() {
                        resource.isComplete ? _this2._onLoad(resource) : (resource._onLoadBinding = resource.onComplete.once(_this2._onLoad, _this2), 
                        resource.load());
                    }, !0);
                }, Loader.prototype._onComplete = function() {
                    this.loading = !1, this.onComplete.dispatch(this, this.resources);
                }, Loader.prototype._onLoad = function(resource) {
                    var _this3 = this;
                    resource._onLoadBinding = null, this._resourcesParsing.push(resource), resource._dequeue(), 
                    async.eachSeries(this._afterMiddleware, function(fn, next) {
                        fn.call(_this3, resource, next);
                    }, function() {
                        resource.onAfterMiddleware.dispatch(resource), _this3.progress += resource.progressChunk, 
                        _this3.onProgress.dispatch(_this3, resource), resource.error ? _this3.onError.dispatch(resource.error, _this3, resource) : _this3.onLoad.dispatch(_this3, resource), 
                        _this3._resourcesParsing.splice(_this3._resourcesParsing.indexOf(resource), 1), 
                        _this3._queue.idle() && 0 === _this3._resourcesParsing.length && (_this3.progress = 100, 
                        _this3._onComplete());
                    }, !0);
                }, Loader;
            }();
            exports.default = Loader;
        }, {
            "./Resource": 33,
            "./async": 34,
            "mini-signals": 5,
            "parse-uri": 7
        } ],
        33: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _noop() {}
            function setExtMap(map, extname, val) {
                extname && 0 === extname.indexOf(".") && (extname = extname.substring(1)), extname && (map[extname] = val);
            }
            function reqType(xhr) {
                return xhr.toString().replace("object ", "");
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _parseUri2 = _interopRequireDefault(require("parse-uri")), _miniSignals2 = _interopRequireDefault(require("mini-signals")), useXdr = !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest()), tempAnchor = null, Resource = function() {
                function Resource(name, url, options) {
                    if (_classCallCheck(this, Resource), "string" != typeof name || "string" != typeof url) throw new Error("Both name and url are required for constructing a resource.");
                    options = options || {}, this._flags = 0, this._setFlag(Resource.STATUS_FLAGS.DATA_URL, 0 === url.indexOf("data:")), 
                    this.name = name, this.url = url, this.extension = this._getExtension(), this.data = null, 
                    this.crossOrigin = !0 === options.crossOrigin ? "anonymous" : options.crossOrigin, 
                    this.loadType = options.loadType || this._determineLoadType(), this.xhrType = options.xhrType, 
                    this.metadata = options.metadata || {}, this.error = null, this.xhr = null, this.children = [], 
                    this.type = Resource.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = _noop, 
                    this._onLoadBinding = null, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), 
                    this._boundOnProgress = this._onProgress.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), 
                    this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), 
                    this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this), this.onStart = new _miniSignals2.default(), 
                    this.onProgress = new _miniSignals2.default(), this.onComplete = new _miniSignals2.default(), 
                    this.onAfterMiddleware = new _miniSignals2.default();
                }
                return Resource.setExtensionLoadType = function(extname, loadType) {
                    setExtMap(Resource._loadTypeMap, extname, loadType);
                }, Resource.setExtensionXhrType = function(extname, xhrType) {
                    setExtMap(Resource._xhrTypeMap, extname, xhrType);
                }, Resource.prototype.complete = function() {
                    if (this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), 
                    this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), 
                    this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), 
                    this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), 
                    this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, 
                    this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null)), 
                    this.isComplete) throw new Error("Complete called again for an already completed resource.");
                    this._setFlag(Resource.STATUS_FLAGS.COMPLETE, !0), this._setFlag(Resource.STATUS_FLAGS.LOADING, !1), 
                    this.onComplete.dispatch(this);
                }, Resource.prototype.abort = function(message) {
                    if (!this.error) {
                        if (this.error = new Error(message), this.xhr) this.xhr.abort(); else if (this.xdr) this.xdr.abort(); else if (this.data) if (this.data.src) this.data.src = Resource.EMPTY_GIF; else for (;this.data.firstChild; ) this.data.removeChild(this.data.firstChild);
                        this.complete();
                    }
                }, Resource.prototype.load = function(cb) {
                    var _this = this;
                    if (!this.isLoading) if (this.isComplete) cb && setTimeout(function() {
                        return cb(_this);
                    }, 1); else switch (cb && this.onComplete.once(cb), this._setFlag(Resource.STATUS_FLAGS.LOADING, !0), 
                    this.onStart.dispatch(this), !1 !== this.crossOrigin && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)), 
                    this.loadType) {
                      case Resource.LOAD_TYPE.IMAGE:
                        this.type = Resource.TYPE.IMAGE, this._loadElement("image");
                        break;

                      case Resource.LOAD_TYPE.AUDIO:
                        this.type = Resource.TYPE.AUDIO, this._loadSourceElement("audio");
                        break;

                      case Resource.LOAD_TYPE.VIDEO:
                        this.type = Resource.TYPE.VIDEO, this._loadSourceElement("video");
                        break;

                      case Resource.LOAD_TYPE.XHR:
                      default:
                        useXdr && this.crossOrigin ? this._loadXdr() : this._loadXhr();
                    }
                }, Resource.prototype._hasFlag = function(flag) {
                    return !!(this._flags & flag);
                }, Resource.prototype._setFlag = function(flag, value) {
                    this._flags = value ? this._flags | flag : this._flags & ~flag;
                }, Resource.prototype._loadElement = function(type) {
                    this.metadata.loadElement ? this.data = this.metadata.loadElement : "image" === type && void 0 !== window.Image ? this.data = new Image() : this.data = document.createElement(type), 
                    this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), 
                    this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), 
                    this.data.addEventListener("progress", this._boundOnProgress, !1);
                }, Resource.prototype._loadSourceElement = function(type) {
                    if (this.metadata.loadElement ? this.data = this.metadata.loadElement : "audio" === type && void 0 !== window.Audio ? this.data = new Audio() : this.data = document.createElement(type), 
                    null !== this.data) {
                        if (!this.metadata.skipSource) if (navigator.isCocoonJS) this.data.src = Array.isArray(this.url) ? this.url[0] : this.url; else if (Array.isArray(this.url)) for (var mimeTypes = this.metadata.mimeType, i = 0; i < this.url.length; ++i) this.data.appendChild(this._createSource(type, this.url[i], Array.isArray(mimeTypes) ? mimeTypes[i] : mimeTypes)); else {
                            var _mimeTypes = this.metadata.mimeType;
                            this.data.appendChild(this._createSource(type, this.url, Array.isArray(_mimeTypes) ? _mimeTypes[0] : _mimeTypes));
                        }
                        this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), 
                        this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), 
                        this.data.load();
                    } else this.abort("Unsupported element: " + type);
                }, Resource.prototype._loadXhr = function() {
                    "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                    var xhr = this.xhr = new XMLHttpRequest();
                    xhr.open("GET", this.url, !0), this.xhrType === Resource.XHR_RESPONSE_TYPE.JSON || this.xhrType === Resource.XHR_RESPONSE_TYPE.DOCUMENT ? xhr.responseType = Resource.XHR_RESPONSE_TYPE.TEXT : xhr.responseType = this.xhrType, 
                    xhr.addEventListener("error", this._boundXhrOnError, !1), xhr.addEventListener("abort", this._boundXhrOnAbort, !1), 
                    xhr.addEventListener("progress", this._boundOnProgress, !1), xhr.addEventListener("load", this._boundXhrOnLoad, !1), 
                    xhr.send();
                }, Resource.prototype._loadXdr = function() {
                    "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                    var xdr = this.xhr = new XDomainRequest();
                    xdr.timeout = 5e3, xdr.onerror = this._boundXhrOnError, xdr.ontimeout = this._boundXdrOnTimeout, 
                    xdr.onprogress = this._boundOnProgress, xdr.onload = this._boundXhrOnLoad, xdr.open("GET", this.url, !0), 
                    setTimeout(function() {
                        return xdr.send();
                    }, 1);
                }, Resource.prototype._createSource = function(type, url, mime) {
                    mime || (mime = type + "/" + this._getExtension(url));
                    var source = document.createElement("source");
                    return source.src = url, source.type = mime, source;
                }, Resource.prototype._onError = function(event) {
                    this.abort("Failed to load element using: " + event.target.nodeName);
                }, Resource.prototype._onProgress = function(event) {
                    event && event.lengthComputable && this.onProgress.dispatch(this, event.loaded / event.total);
                }, Resource.prototype._xhrOnError = function() {
                    var xhr = this.xhr;
                    this.abort(reqType(xhr) + " Request failed. Status: " + xhr.status + ', text: "' + xhr.statusText + '"');
                }, Resource.prototype._xhrOnAbort = function() {
                    this.abort(reqType(this.xhr) + " Request was aborted by the user.");
                }, Resource.prototype._xdrOnTimeout = function() {
                    this.abort(reqType(this.xhr) + " Request timed out.");
                }, Resource.prototype._xhrOnLoad = function() {
                    var xhr = this.xhr, text = "", status = void 0 === xhr.status ? 200 : xhr.status;
                    if ("" !== xhr.responseType && "text" !== xhr.responseType && void 0 !== xhr.responseType || (text = xhr.responseText), 
                    0 === status && text.length > 0 ? status = 200 : 1223 === status && (status = 204), 
                    2 === (status / 100 | 0)) {
                        if (this.xhrType === Resource.XHR_RESPONSE_TYPE.TEXT) this.data = text, this.type = Resource.TYPE.TEXT; else if (this.xhrType === Resource.XHR_RESPONSE_TYPE.JSON) try {
                            this.data = JSON.parse(text), this.type = Resource.TYPE.JSON;
                        } catch (e) {
                            return void this.abort("Error trying to parse loaded json: " + e);
                        } else if (this.xhrType === Resource.XHR_RESPONSE_TYPE.DOCUMENT) try {
                            if (window.DOMParser) {
                                var domparser = new DOMParser();
                                this.data = domparser.parseFromString(text, "text/xml");
                            } else {
                                var div = document.createElement("div");
                                div.innerHTML = text, this.data = div;
                            }
                            this.type = Resource.TYPE.XML;
                        } catch (e) {
                            return void this.abort("Error trying to parse loaded xml: " + e);
                        } else this.data = xhr.response || text;
                        this.complete();
                    } else this.abort("[" + xhr.status + "] " + xhr.statusText + ": " + xhr.responseURL);
                }, Resource.prototype._determineCrossOrigin = function(url, loc) {
                    if (0 === url.indexOf("data:")) return "";
                    loc = loc || window.location, tempAnchor || (tempAnchor = document.createElement("a")), 
                    tempAnchor.href = url;
                    var samePort = !(url = (0, _parseUri2.default)(tempAnchor.href, {
                        strictMode: !0
                    })).port && "" === loc.port || url.port === loc.port, protocol = url.protocol ? url.protocol + ":" : "";
                    return url.host === loc.hostname && samePort && protocol === loc.protocol ? "" : "anonymous";
                }, Resource.prototype._determineXhrType = function() {
                    return Resource._xhrTypeMap[this.extension] || Resource.XHR_RESPONSE_TYPE.TEXT;
                }, Resource.prototype._determineLoadType = function() {
                    return Resource._loadTypeMap[this.extension] || Resource.LOAD_TYPE.XHR;
                }, Resource.prototype._getExtension = function() {
                    var url = this.url, ext = "";
                    if (this.isDataUrl) {
                        var slashIndex = url.indexOf("/");
                        ext = url.substring(slashIndex + 1, url.indexOf(";", slashIndex));
                    } else {
                        var queryStart = url.indexOf("?"), hashStart = url.indexOf("#"), index = Math.min(queryStart > -1 ? queryStart : url.length, hashStart > -1 ? hashStart : url.length);
                        ext = (url = url.substring(0, index)).substring(url.lastIndexOf(".") + 1);
                    }
                    return ext.toLowerCase();
                }, Resource.prototype._getMimeFromXhrType = function(type) {
                    switch (type) {
                      case Resource.XHR_RESPONSE_TYPE.BUFFER:
                        return "application/octet-binary";

                      case Resource.XHR_RESPONSE_TYPE.BLOB:
                        return "application/blob";

                      case Resource.XHR_RESPONSE_TYPE.DOCUMENT:
                        return "application/xml";

                      case Resource.XHR_RESPONSE_TYPE.JSON:
                        return "application/json";

                      case Resource.XHR_RESPONSE_TYPE.DEFAULT:
                      case Resource.XHR_RESPONSE_TYPE.TEXT:
                      default:
                        return "text/plain";
                    }
                }, _createClass(Resource, [ {
                    key: "isDataUrl",
                    get: function() {
                        return this._hasFlag(Resource.STATUS_FLAGS.DATA_URL);
                    }
                }, {
                    key: "isComplete",
                    get: function() {
                        return this._hasFlag(Resource.STATUS_FLAGS.COMPLETE);
                    }
                }, {
                    key: "isLoading",
                    get: function() {
                        return this._hasFlag(Resource.STATUS_FLAGS.LOADING);
                    }
                } ]), Resource;
            }();
            exports.default = Resource, Resource.STATUS_FLAGS = {
                NONE: 0,
                DATA_URL: 1,
                COMPLETE: 2,
                LOADING: 4
            }, Resource.TYPE = {
                UNKNOWN: 0,
                JSON: 1,
                XML: 2,
                IMAGE: 3,
                AUDIO: 4,
                VIDEO: 5,
                TEXT: 6
            }, Resource.LOAD_TYPE = {
                XHR: 1,
                IMAGE: 2,
                AUDIO: 3,
                VIDEO: 4
            }, Resource.XHR_RESPONSE_TYPE = {
                DEFAULT: "text",
                BUFFER: "arraybuffer",
                BLOB: "blob",
                DOCUMENT: "document",
                JSON: "json",
                TEXT: "text"
            }, Resource._loadTypeMap = {
                gif: Resource.LOAD_TYPE.IMAGE,
                png: Resource.LOAD_TYPE.IMAGE,
                bmp: Resource.LOAD_TYPE.IMAGE,
                jpg: Resource.LOAD_TYPE.IMAGE,
                jpeg: Resource.LOAD_TYPE.IMAGE,
                tif: Resource.LOAD_TYPE.IMAGE,
                tiff: Resource.LOAD_TYPE.IMAGE,
                webp: Resource.LOAD_TYPE.IMAGE,
                tga: Resource.LOAD_TYPE.IMAGE,
                svg: Resource.LOAD_TYPE.IMAGE,
                "svg+xml": Resource.LOAD_TYPE.IMAGE,
                mp3: Resource.LOAD_TYPE.AUDIO,
                ogg: Resource.LOAD_TYPE.AUDIO,
                wav: Resource.LOAD_TYPE.AUDIO,
                mp4: Resource.LOAD_TYPE.VIDEO,
                webm: Resource.LOAD_TYPE.VIDEO
            }, Resource._xhrTypeMap = {
                xhtml: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
                html: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
                htm: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
                xml: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
                tmx: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
                svg: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
                tsx: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
                gif: Resource.XHR_RESPONSE_TYPE.BLOB,
                png: Resource.XHR_RESPONSE_TYPE.BLOB,
                bmp: Resource.XHR_RESPONSE_TYPE.BLOB,
                jpg: Resource.XHR_RESPONSE_TYPE.BLOB,
                jpeg: Resource.XHR_RESPONSE_TYPE.BLOB,
                tif: Resource.XHR_RESPONSE_TYPE.BLOB,
                tiff: Resource.XHR_RESPONSE_TYPE.BLOB,
                webp: Resource.XHR_RESPONSE_TYPE.BLOB,
                tga: Resource.XHR_RESPONSE_TYPE.BLOB,
                json: Resource.XHR_RESPONSE_TYPE.JSON,
                text: Resource.XHR_RESPONSE_TYPE.TEXT,
                txt: Resource.XHR_RESPONSE_TYPE.TEXT,
                ttf: Resource.XHR_RESPONSE_TYPE.BUFFER,
                otf: Resource.XHR_RESPONSE_TYPE.BUFFER
            }, Resource.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        }, {
            "mini-signals": 5,
            "parse-uri": 7
        } ],
        34: [ function(require, module, exports) {
            "use strict";
            function _noop() {}
            function onlyOnce(fn) {
                return function() {
                    if (null === fn) throw new Error("Callback was already called.");
                    var callFn = fn;
                    fn = null, callFn.apply(this, arguments);
                };
            }
            exports.__esModule = !0, exports.eachSeries = function(array, iterator, callback, deferNext) {
                var i = 0, len = array.length;
                !function next(err) {
                    err || i === len ? callback && callback(err) : deferNext ? setTimeout(function() {
                        iterator(array[i++], next);
                    }, 1) : iterator(array[i++], next);
                }();
            }, exports.queue = function(worker, concurrency) {
                function _insert(data, insertAtFront, callback) {
                    if (null != callback && "function" != typeof callback) throw new Error("task callback must be a function");
                    if (q.started = !0, null == data && q.idle()) setTimeout(function() {
                        return q.drain();
                    }, 1); else {
                        var item = {
                            data: data,
                            callback: "function" == typeof callback ? callback : _noop
                        };
                        insertAtFront ? q._tasks.unshift(item) : q._tasks.push(item), setTimeout(function() {
                            return q.process();
                        }, 1);
                    }
                }
                function _next(task) {
                    return function() {
                        workers -= 1, task.callback.apply(task, arguments), null != arguments[0] && q.error(arguments[0], task.data), 
                        workers <= q.concurrency - q.buffer && q.unsaturated(), q.idle() && q.drain(), q.process();
                    };
                }
                if (null == concurrency) concurrency = 1; else if (0 === concurrency) throw new Error("Concurrency must not be zero");
                var workers = 0, q = {
                    _tasks: [],
                    concurrency: concurrency,
                    saturated: _noop,
                    unsaturated: _noop,
                    buffer: concurrency / 4,
                    empty: _noop,
                    drain: _noop,
                    error: _noop,
                    started: !1,
                    paused: !1,
                    push: function(data, callback) {
                        _insert(data, !1, callback);
                    },
                    kill: function() {
                        workers = 0, q.drain = _noop, q.started = !1, q._tasks = [];
                    },
                    unshift: function(data, callback) {
                        _insert(data, !0, callback);
                    },
                    process: function() {
                        for (;!q.paused && workers < q.concurrency && q._tasks.length; ) {
                            var task = q._tasks.shift();
                            0 === q._tasks.length && q.empty(), (workers += 1) === q.concurrency && q.saturated(), 
                            worker(task.data, onlyOnce(_next(task)));
                        }
                    },
                    length: function() {
                        return q._tasks.length;
                    },
                    running: function() {
                        return workers;
                    },
                    idle: function() {
                        return q._tasks.length + workers === 0;
                    },
                    pause: function() {
                        !0 !== q.paused && (q.paused = !0);
                    },
                    resume: function() {
                        if (!1 !== q.paused) {
                            q.paused = !1;
                            for (var w = 1; w <= q.concurrency; w++) q.process();
                        }
                    }
                };
                return q;
            };
        }, {} ],
        35: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.encodeBinary = function(input) {
                for (var output = "", inx = 0; inx < input.length; ) {
                    for (var bytebuffer = [ 0, 0, 0 ], encodedCharIndexes = [ 0, 0, 0, 0 ], jnx = 0; jnx < bytebuffer.length; ++jnx) inx < input.length ? bytebuffer[jnx] = 255 & input.charCodeAt(inx++) : bytebuffer[jnx] = 0;
                    switch (encodedCharIndexes[0] = bytebuffer[0] >> 2, encodedCharIndexes[1] = (3 & bytebuffer[0]) << 4 | bytebuffer[1] >> 4, 
                    encodedCharIndexes[2] = (15 & bytebuffer[1]) << 2 | bytebuffer[2] >> 6, encodedCharIndexes[3] = 63 & bytebuffer[2], 
                    inx - (input.length - 1)) {
                      case 2:
                        encodedCharIndexes[3] = 64, encodedCharIndexes[2] = 64;
                        break;

                      case 1:
                        encodedCharIndexes[3] = 64;
                    }
                    for (var _jnx = 0; _jnx < encodedCharIndexes.length; ++_jnx) output += _keyStr.charAt(encodedCharIndexes[_jnx]);
                }
                return output;
            };
            var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        }, {} ],
        36: [ function(require, module, exports) {
            "use strict";
            var Loader = require("./Loader").default, Resource = require("./Resource").default, async = require("./async"), b64 = require("./b64");
            Loader.Resource = Resource, Loader.async = async, Loader.base64 = b64, module.exports = Loader, 
            module.exports.default = Loader;
        }, {
            "./Loader": 32,
            "./Resource": 33,
            "./async": 34,
            "./b64": 35
        } ],
        37: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.blobMiddlewareFactory = function() {
                return function(resource, next) {
                    if (resource.data) {
                        if (resource.xhr && resource.xhrType === _Resource2.default.XHR_RESPONSE_TYPE.BLOB) if (window.Blob && "string" != typeof resource.data) {
                            if (0 === resource.data.type.indexOf("image")) {
                                var _ret = function() {
                                    var src = Url.createObjectURL(resource.data);
                                    return resource.blob = resource.data, resource.data = new Image(), resource.data.src = src, 
                                    resource.type = _Resource2.default.TYPE.IMAGE, resource.data.onload = function() {
                                        Url.revokeObjectURL(src), resource.data.onload = null, next();
                                    }, {
                                        v: void 0
                                    };
                                }();
                                if ("object" === (void 0 === _ret ? "undefined" : _typeof(_ret))) return _ret.v;
                            }
                        } else {
                            var type = resource.xhr.getResponseHeader("content-type");
                            if (type && 0 === type.indexOf("image")) return resource.data = new Image(), resource.data.src = "data:" + type + ";base64," + _b2.default.encodeBinary(resource.xhr.responseText), 
                            resource.type = _Resource2.default.TYPE.IMAGE, void (resource.data.onload = function() {
                                resource.data.onload = null, next();
                            });
                        }
                        next();
                    } else next();
                };
            };
            var _Resource2 = _interopRequireDefault(require("../../Resource")), _b2 = _interopRequireDefault(require("../../b64")), Url = window.URL || window.webkitURL;
        }, {
            "../../Resource": 33,
            "../../b64": 35
        } ],
        38: [ function(require, module, exports) {
            "use strict";
            function Url() {
                this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, 
                this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, 
                this.path = null, this.href = null;
            }
            function urlParse(url, parseQueryString, slashesDenoteHost) {
                if (url && util.isObject(url) && url instanceof Url) return url;
                var u = new Url();
                return u.parse(url, parseQueryString, slashesDenoteHost), u;
            }
            var punycode = require("punycode"), util = require("./util");
            exports.parse = urlParse, exports.resolve = function(source, relative) {
                return urlParse(source, !1, !0).resolve(relative);
            }, exports.resolveObject = function(source, relative) {
                return source ? urlParse(source, !1, !0).resolveObject(relative) : relative;
            }, exports.format = function(obj) {
                return util.isString(obj) && (obj = urlParse(obj)), obj instanceof Url ? obj.format() : Url.prototype.format.call(obj);
            }, exports.Url = Url;
            var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, delims = [ "<", ">", '"', "`", " ", "\r", "\n", "\t" ], unwise = [ "{", "}", "|", "\\", "^", "`" ].concat(delims), autoEscape = [ "'" ].concat(unwise), nonHostChars = [ "%", "/", "?", ";", "#" ].concat(autoEscape), hostEndingChars = [ "/", "?", "#" ], hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, unsafeProtocol = {
                javascript: !0,
                "javascript:": !0
            }, hostlessProtocol = {
                javascript: !0,
                "javascript:": !0
            }, slashedProtocol = {
                http: !0,
                https: !0,
                ftp: !0,
                gopher: !0,
                file: !0,
                "http:": !0,
                "https:": !0,
                "ftp:": !0,
                "gopher:": !0,
                "file:": !0
            }, querystring = require("querystring");
            Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
                if (!util.isString(url)) throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
                var queryIndex = url.indexOf("?"), splitter = -1 !== queryIndex && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
                uSplit[0] = uSplit[0].replace(slashRegex, "/");
                var rest = url = uSplit.join(splitter);
                if (rest = rest.trim(), !slashesDenoteHost && 1 === url.split("#").length) {
                    var simplePath = simplePathPattern.exec(rest);
                    if (simplePath) return this.path = rest, this.href = rest, this.pathname = simplePath[1], 
                    simplePath[2] ? (this.search = simplePath[2], this.query = parseQueryString ? querystring.parse(this.search.substr(1)) : this.search.substr(1)) : parseQueryString && (this.search = "", 
                    this.query = {}), this;
                }
                var proto = protocolPattern.exec(rest);
                if (proto) {
                    var lowerProto = (proto = proto[0]).toLowerCase();
                    this.protocol = lowerProto, rest = rest.substr(proto.length);
                }
                if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var slashes = "//" === rest.substr(0, 2);
                    !slashes || proto && hostlessProtocol[proto] || (rest = rest.substr(2), this.slashes = !0);
                }
                if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
                    for (var hostEnd = -1, i = 0; i < hostEndingChars.length; i++) -1 !== (hec = rest.indexOf(hostEndingChars[i])) && (-1 === hostEnd || hec < hostEnd) && (hostEnd = hec);
                    var auth, atSign;
                    -1 !== (atSign = -1 === hostEnd ? rest.lastIndexOf("@") : rest.lastIndexOf("@", hostEnd)) && (auth = rest.slice(0, atSign), 
                    rest = rest.slice(atSign + 1), this.auth = decodeURIComponent(auth)), hostEnd = -1;
                    for (i = 0; i < nonHostChars.length; i++) {
                        var hec = rest.indexOf(nonHostChars[i]);
                        -1 !== hec && (-1 === hostEnd || hec < hostEnd) && (hostEnd = hec);
                    }
                    -1 === hostEnd && (hostEnd = rest.length), this.host = rest.slice(0, hostEnd), rest = rest.slice(hostEnd), 
                    this.parseHost(), this.hostname = this.hostname || "";
                    var ipv6Hostname = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                    if (!ipv6Hostname) for (var hostparts = this.hostname.split(/\./), i = 0, l = hostparts.length; i < l; i++) {
                        var part = hostparts[i];
                        if (part && !part.match(hostnamePartPattern)) {
                            for (var newpart = "", j = 0, k = part.length; j < k; j++) part.charCodeAt(j) > 127 ? newpart += "x" : newpart += part[j];
                            if (!newpart.match(hostnamePartPattern)) {
                                var validParts = hostparts.slice(0, i), notHost = hostparts.slice(i + 1), bit = part.match(hostnamePartStart);
                                bit && (validParts.push(bit[1]), notHost.unshift(bit[2])), notHost.length && (rest = "/" + notHost.join(".") + rest), 
                                this.hostname = validParts.join(".");
                                break;
                            }
                        }
                    }
                    this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), 
                    ipv6Hostname || (this.hostname = punycode.toASCII(this.hostname));
                    var p = this.port ? ":" + this.port : "", h = this.hostname || "";
                    this.host = h + p, this.href += this.host, ipv6Hostname && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), 
                    "/" !== rest[0] && (rest = "/" + rest));
                }
                if (!unsafeProtocol[lowerProto]) for (var i = 0, l = autoEscape.length; i < l; i++) {
                    var ae = autoEscape[i];
                    if (-1 !== rest.indexOf(ae)) {
                        var esc = encodeURIComponent(ae);
                        esc === ae && (esc = escape(ae)), rest = rest.split(ae).join(esc);
                    }
                }
                var hash = rest.indexOf("#");
                -1 !== hash && (this.hash = rest.substr(hash), rest = rest.slice(0, hash));
                var qm = rest.indexOf("?");
                if (-1 !== qm ? (this.search = rest.substr(qm), this.query = rest.substr(qm + 1), 
                parseQueryString && (this.query = querystring.parse(this.query)), rest = rest.slice(0, qm)) : parseQueryString && (this.search = "", 
                this.query = {}), rest && (this.pathname = rest), slashedProtocol[lowerProto] && this.hostname && !this.pathname && (this.pathname = "/"), 
                this.pathname || this.search) {
                    var p = this.pathname || "", s = this.search || "";
                    this.path = p + s;
                }
                return this.href = this.format(), this;
            }, Url.prototype.format = function() {
                var auth = this.auth || "";
                auth && (auth = (auth = encodeURIComponent(auth)).replace(/%3A/i, ":"), auth += "@");
                var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = !1, query = "";
                this.host ? host = auth + this.host : this.hostname && (host = auth + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), 
                this.port && (host += ":" + this.port)), this.query && util.isObject(this.query) && Object.keys(this.query).length && (query = querystring.stringify(this.query));
                var search = this.search || query && "?" + query || "";
                return protocol && ":" !== protocol.substr(-1) && (protocol += ":"), this.slashes || (!protocol || slashedProtocol[protocol]) && !1 !== host ? (host = "//" + (host || ""), 
                pathname && "/" !== pathname.charAt(0) && (pathname = "/" + pathname)) : host || (host = ""), 
                hash && "#" !== hash.charAt(0) && (hash = "#" + hash), search && "?" !== search.charAt(0) && (search = "?" + search), 
                pathname = pathname.replace(/[?#]/g, function(match) {
                    return encodeURIComponent(match);
                }), search = search.replace("#", "%23"), protocol + host + pathname + search + hash;
            }, Url.prototype.resolve = function(relative) {
                return this.resolveObject(urlParse(relative, !1, !0)).format();
            }, Url.prototype.resolveObject = function(relative) {
                if (util.isString(relative)) {
                    var rel = new Url();
                    rel.parse(relative, !1, !0), relative = rel;
                }
                for (var result = new Url(), tkeys = Object.keys(this), tk = 0; tk < tkeys.length; tk++) {
                    var tkey = tkeys[tk];
                    result[tkey] = this[tkey];
                }
                if (result.hash = relative.hash, "" === relative.href) return result.href = result.format(), 
                result;
                if (relative.slashes && !relative.protocol) {
                    for (var rkeys = Object.keys(relative), rk = 0; rk < rkeys.length; rk++) {
                        var rkey = rkeys[rk];
                        "protocol" !== rkey && (result[rkey] = relative[rkey]);
                    }
                    return slashedProtocol[result.protocol] && result.hostname && !result.pathname && (result.path = result.pathname = "/"), 
                    result.href = result.format(), result;
                }
                if (relative.protocol && relative.protocol !== result.protocol) {
                    if (!slashedProtocol[relative.protocol]) {
                        for (var keys = Object.keys(relative), v = 0; v < keys.length; v++) {
                            var k = keys[v];
                            result[k] = relative[k];
                        }
                        return result.href = result.format(), result;
                    }
                    if (result.protocol = relative.protocol, relative.host || hostlessProtocol[relative.protocol]) result.pathname = relative.pathname; else {
                        for (relPath = (relative.pathname || "").split("/"); relPath.length && !(relative.host = relPath.shift()); ) ;
                        relative.host || (relative.host = ""), relative.hostname || (relative.hostname = ""), 
                        "" !== relPath[0] && relPath.unshift(""), relPath.length < 2 && relPath.unshift(""), 
                        result.pathname = relPath.join("/");
                    }
                    if (result.search = relative.search, result.query = relative.query, result.host = relative.host || "", 
                    result.auth = relative.auth, result.hostname = relative.hostname || relative.host, 
                    result.port = relative.port, result.pathname || result.search) {
                        var p = result.pathname || "", s = result.search || "";
                        result.path = p + s;
                    }
                    return result.slashes = result.slashes || relative.slashes, result.href = result.format(), 
                    result;
                }
                var isSourceAbs = result.pathname && "/" === result.pathname.charAt(0), isRelAbs = relative.host || relative.pathname && "/" === relative.pathname.charAt(0), mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
                if (psychotic && (result.hostname = "", result.port = null, result.host && ("" === srcPath[0] ? srcPath[0] = result.host : srcPath.unshift(result.host)), 
                result.host = "", relative.protocol && (relative.hostname = null, relative.port = null, 
                relative.host && ("" === relPath[0] ? relPath[0] = relative.host : relPath.unshift(relative.host)), 
                relative.host = null), mustEndAbs = mustEndAbs && ("" === relPath[0] || "" === srcPath[0])), 
                isRelAbs) result.host = relative.host || "" === relative.host ? relative.host : result.host, 
                result.hostname = relative.hostname || "" === relative.hostname ? relative.hostname : result.hostname, 
                result.search = relative.search, result.query = relative.query, srcPath = relPath; else if (relPath.length) srcPath || (srcPath = []), 
                srcPath.pop(), srcPath = srcPath.concat(relPath), result.search = relative.search, 
                result.query = relative.query; else if (!util.isNullOrUndefined(relative.search)) return psychotic && (result.hostname = result.host = srcPath.shift(), 
                (authInHost = !!(result.host && result.host.indexOf("@") > 0) && result.host.split("@")) && (result.auth = authInHost.shift(), 
                result.host = result.hostname = authInHost.shift())), result.search = relative.search, 
                result.query = relative.query, util.isNull(result.pathname) && util.isNull(result.search) || (result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "")), 
                result.href = result.format(), result;
                if (!srcPath.length) return result.pathname = null, result.search ? result.path = "/" + result.search : result.path = null, 
                result.href = result.format(), result;
                for (var last = srcPath.slice(-1)[0], hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && ("." === last || ".." === last) || "" === last, up = 0, i = srcPath.length; i >= 0; i--) "." === (last = srcPath[i]) ? srcPath.splice(i, 1) : ".." === last ? (srcPath.splice(i, 1), 
                up++) : up && (srcPath.splice(i, 1), up--);
                if (!mustEndAbs && !removeAllDots) for (;up--; up) srcPath.unshift("..");
                !mustEndAbs || "" === srcPath[0] || srcPath[0] && "/" === srcPath[0].charAt(0) || srcPath.unshift(""), 
                hasTrailingSlash && "/" !== srcPath.join("/").substr(-1) && srcPath.push("");
                var isAbsolute = "" === srcPath[0] || srcPath[0] && "/" === srcPath[0].charAt(0);
                if (psychotic) {
                    result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
                    var authInHost = !!(result.host && result.host.indexOf("@") > 0) && result.host.split("@");
                    authInHost && (result.auth = authInHost.shift(), result.host = result.hostname = authInHost.shift());
                }
                return (mustEndAbs = mustEndAbs || result.host && srcPath.length) && !isAbsolute && srcPath.unshift(""), 
                srcPath.length ? result.pathname = srcPath.join("/") : (result.pathname = null, 
                result.path = null), util.isNull(result.pathname) && util.isNull(result.search) || (result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "")), 
                result.auth = relative.auth || result.auth, result.slashes = result.slashes || relative.slashes, 
                result.href = result.format(), result;
            }, Url.prototype.parseHost = function() {
                var host = this.host, port = portPattern.exec(host);
                port && (":" !== (port = port[0]) && (this.port = port.substr(1)), host = host.substr(0, host.length - port.length)), 
                host && (this.hostname = host);
            };
        }, {
            "./util": 39,
            punycode: 27,
            querystring: 30
        } ],
        39: [ function(require, module, exports) {
            "use strict";
            module.exports = {
                isString: function(arg) {
                    return "string" == typeof arg;
                },
                isObject: function(arg) {
                    return "object" == typeof arg && null !== arg;
                },
                isNull: function(arg) {
                    return null === arg;
                },
                isNullOrUndefined: function(arg) {
                    return null == arg;
                }
            };
        }, {} ],
        40: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../core")), _ismobilejs2 = _interopRequireDefault(require("ismobilejs")), _accessibleTarget2 = _interopRequireDefault(require("./accessibleTarget"));
            core.utils.mixins.delayMixin(core.DisplayObject.prototype, _accessibleTarget2.default);
            var DIV_TOUCH_SIZE = 100, DIV_TOUCH_POS_X = 0, DIV_TOUCH_POS_Y = 0, DIV_TOUCH_ZINDEX = 2, AccessibilityManager = function() {
                function AccessibilityManager(renderer) {
                    _classCallCheck(this, AccessibilityManager), !_ismobilejs2.default.tablet && !_ismobilejs2.default.phone || navigator.isCocoonJS || this.createTouchHook();
                    var div = document.createElement("div");
                    div.style.width = DIV_TOUCH_SIZE + "px", div.style.height = DIV_TOUCH_SIZE + "px", 
                    div.style.position = "absolute", div.style.top = DIV_TOUCH_POS_X + "px", div.style.left = DIV_TOUCH_POS_Y + "px", 
                    div.style.zIndex = DIV_TOUCH_ZINDEX, this.div = div, this.pool = [], this.renderId = 0, 
                    this.debug = !1, this.renderer = renderer, this.children = [], this._onKeyDown = this._onKeyDown.bind(this), 
                    this._onMouseMove = this._onMouseMove.bind(this), this.isActive = !1, this.isMobileAccessabillity = !1, 
                    window.addEventListener("keydown", this._onKeyDown, !1);
                }
                return AccessibilityManager.prototype.createTouchHook = function() {
                    var _this = this, hookDiv = document.createElement("button");
                    hookDiv.style.width = "1px", hookDiv.style.height = "1px", hookDiv.style.position = "absolute", 
                    hookDiv.style.top = "-1000px", hookDiv.style.left = "-1000px", hookDiv.style.zIndex = 2, 
                    hookDiv.style.backgroundColor = "#FF0000", hookDiv.title = "HOOK DIV", hookDiv.addEventListener("focus", function() {
                        _this.isMobileAccessabillity = !0, _this.activate(), document.body.removeChild(hookDiv);
                    }), document.body.appendChild(hookDiv);
                }, AccessibilityManager.prototype.activate = function() {
                    this.isActive || (this.isActive = !0, window.document.addEventListener("mousemove", this._onMouseMove, !0), 
                    window.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), 
                    this.renderer.view.parentNode && this.renderer.view.parentNode.appendChild(this.div));
                }, AccessibilityManager.prototype.deactivate = function() {
                    this.isActive && !this.isMobileAccessabillity && (this.isActive = !1, window.document.removeEventListener("mousemove", this._onMouseMove), 
                    window.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), 
                    this.div.parentNode && this.div.parentNode.removeChild(this.div));
                }, AccessibilityManager.prototype.updateAccessibleObjects = function(displayObject) {
                    if (displayObject.visible) {
                        displayObject.accessible && displayObject.interactive && (displayObject._accessibleActive || this.addChild(displayObject), 
                        displayObject.renderId = this.renderId);
                        for (var children = displayObject.children, i = children.length - 1; i >= 0; i--) this.updateAccessibleObjects(children[i]);
                    }
                }, AccessibilityManager.prototype.update = function() {
                    if (this.renderer.renderingToScreen) {
                        this.updateAccessibleObjects(this.renderer._lastObjectRendered);
                        var rect = this.renderer.view.getBoundingClientRect(), sx = rect.width / this.renderer.width, sy = rect.height / this.renderer.height, div = this.div;
                        div.style.left = rect.left + "px", div.style.top = rect.top + "px", div.style.width = this.renderer.width + "px", 
                        div.style.height = this.renderer.height + "px";
                        for (var i = 0; i < this.children.length; i++) {
                            var child = this.children[i];
                            if (child.renderId !== this.renderId) child._accessibleActive = !1, core.utils.removeItems(this.children, i, 1), 
                            this.div.removeChild(child._accessibleDiv), this.pool.push(child._accessibleDiv), 
                            child._accessibleDiv = null, i--, 0 === this.children.length && this.deactivate(); else {
                                div = child._accessibleDiv;
                                var hitArea = child.hitArea, wt = child.worldTransform;
                                child.hitArea ? (div.style.left = (wt.tx + hitArea.x * wt.a) * sx + "px", div.style.top = (wt.ty + hitArea.y * wt.d) * sy + "px", 
                                div.style.width = hitArea.width * wt.a * sx + "px", div.style.height = hitArea.height * wt.d * sy + "px") : (hitArea = child.getBounds(), 
                                this.capHitArea(hitArea), div.style.left = hitArea.x * sx + "px", div.style.top = hitArea.y * sy + "px", 
                                div.style.width = hitArea.width * sx + "px", div.style.height = hitArea.height * sy + "px");
                            }
                        }
                        this.renderId++;
                    }
                }, AccessibilityManager.prototype.capHitArea = function(hitArea) {
                    hitArea.x < 0 && (hitArea.width += hitArea.x, hitArea.x = 0), hitArea.y < 0 && (hitArea.height += hitArea.y, 
                    hitArea.y = 0), hitArea.x + hitArea.width > this.renderer.width && (hitArea.width = this.renderer.width - hitArea.x), 
                    hitArea.y + hitArea.height > this.renderer.height && (hitArea.height = this.renderer.height - hitArea.y);
                }, AccessibilityManager.prototype.addChild = function(displayObject) {
                    var div = this.pool.pop();
                    div || ((div = document.createElement("button")).style.width = DIV_TOUCH_SIZE + "px", 
                    div.style.height = DIV_TOUCH_SIZE + "px", div.style.backgroundColor = this.debug ? "rgba(255,0,0,0.5)" : "transparent", 
                    div.style.position = "absolute", div.style.zIndex = DIV_TOUCH_ZINDEX, div.style.borderStyle = "none", 
                    div.addEventListener("click", this._onClick.bind(this)), div.addEventListener("focus", this._onFocus.bind(this)), 
                    div.addEventListener("focusout", this._onFocusOut.bind(this))), displayObject.accessibleTitle ? div.title = displayObject.accessibleTitle : displayObject.accessibleTitle || displayObject.accessibleHint || (div.title = "displayObject " + this.tabIndex), 
                    displayObject.accessibleHint && div.setAttribute("aria-label", displayObject.accessibleHint), 
                    displayObject._accessibleActive = !0, displayObject._accessibleDiv = div, div.displayObject = displayObject, 
                    this.children.push(displayObject), this.div.appendChild(displayObject._accessibleDiv), 
                    displayObject._accessibleDiv.tabIndex = displayObject.tabIndex;
                }, AccessibilityManager.prototype._onClick = function(e) {
                    var interactionManager = this.renderer.plugins.interaction;
                    interactionManager.dispatchEvent(e.target.displayObject, "click", interactionManager.eventData);
                }, AccessibilityManager.prototype._onFocus = function(e) {
                    var interactionManager = this.renderer.plugins.interaction;
                    interactionManager.dispatchEvent(e.target.displayObject, "mouseover", interactionManager.eventData);
                }, AccessibilityManager.prototype._onFocusOut = function(e) {
                    var interactionManager = this.renderer.plugins.interaction;
                    interactionManager.dispatchEvent(e.target.displayObject, "mouseout", interactionManager.eventData);
                }, AccessibilityManager.prototype._onKeyDown = function(e) {
                    9 === e.keyCode && this.activate();
                }, AccessibilityManager.prototype._onMouseMove = function() {
                    this.deactivate();
                }, AccessibilityManager.prototype.destroy = function() {
                    this.div = null;
                    for (var i = 0; i < this.children.length; i++) this.children[i].div = null;
                    window.document.removeEventListener("mousemove", this._onMouseMove), window.removeEventListener("keydown", this._onKeyDown), 
                    this.pool = null, this.children = null, this.renderer = null;
                }, AccessibilityManager;
            }();
            exports.default = AccessibilityManager, core.WebGLRenderer.registerPlugin("accessibility", AccessibilityManager), 
            core.CanvasRenderer.registerPlugin("accessibility", AccessibilityManager);
        }, {
            "../core": 65,
            "./accessibleTarget": 41,
            ismobilejs: 4
        } ],
        41: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = {
                accessible: !1,
                accessibleTitle: null,
                accessibleHint: null,
                tabIndex: 0,
                _accessibleActive: !1,
                _accessibleDiv: !1
            };
        }, {} ],
        42: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0;
            var _accessibleTarget = require("./accessibleTarget");
            Object.defineProperty(exports, "accessibleTarget", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_accessibleTarget).default;
                }
            });
            var _AccessibilityManager = require("./AccessibilityManager");
            Object.defineProperty(exports, "AccessibilityManager", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_AccessibilityManager).default;
                }
            });
        }, {
            "./AccessibilityManager": 40,
            "./accessibleTarget": 41
        } ],
        43: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _autoDetectRenderer = require("./autoDetectRenderer"), _Container2 = _interopRequireDefault(require("./display/Container")), _ticker = require("./ticker"), _settings2 = _interopRequireDefault(require("./settings")), _const = require("./const"), Application = function() {
                function Application(options, arg2, arg3, arg4, arg5) {
                    _classCallCheck(this, Application), "number" == typeof options && (options = Object.assign({
                        width: options,
                        height: arg2 || _settings2.default.RENDER_OPTIONS.height,
                        forceCanvas: !!arg4,
                        sharedTicker: !!arg5
                    }, arg3)), this._options = options = Object.assign({
                        sharedTicker: !1,
                        forceCanvas: !1,
                        sharedLoader: !1
                    }, options), this.renderer = (0, _autoDetectRenderer.autoDetectRenderer)(options), 
                    this.stage = new _Container2.default(), this._ticker = null, this.ticker = options.sharedTicker ? _ticker.shared : new _ticker.Ticker(), 
                    this.start();
                }
                return Application.prototype.render = function() {
                    this.renderer.render(this.stage);
                }, Application.prototype.stop = function() {
                    this._ticker.stop();
                }, Application.prototype.start = function() {
                    this._ticker.start();
                }, Application.prototype.destroy = function(removeView) {
                    var oldTicker = this._ticker;
                    this.ticker = null, oldTicker.destroy(), this.stage.destroy(), this.stage = null, 
                    this.renderer.destroy(removeView), this.renderer = null, this._options = null;
                }, _createClass(Application, [ {
                    key: "ticker",
                    set: function(ticker) {
                        this._ticker && this._ticker.remove(this.render, this), this._ticker = ticker, ticker && ticker.add(this.render, this, _const.UPDATE_PRIORITY.LOW);
                    },
                    get: function() {
                        return this._ticker;
                    }
                }, {
                    key: "view",
                    get: function() {
                        return this.renderer.view;
                    }
                }, {
                    key: "screen",
                    get: function() {
                        return this.renderer.screen;
                    }
                } ]), Application;
            }();
            exports.default = Application;
        }, {
            "./autoDetectRenderer": 45,
            "./const": 46,
            "./display/Container": 48,
            "./settings": 101,
            "./ticker": 120
        } ],
        44: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            function checkPrecision(src, def) {
                if (src instanceof Array) {
                    if ("precision" !== src[0].substring(0, 9)) {
                        var copy = src.slice(0);
                        return copy.unshift("precision " + def + " float;"), copy;
                    }
                } else if ("precision" !== src.substring(0, 9)) return "precision " + def + " float;\n" + src;
                return src;
            }
            exports.__esModule = !0;
            var _pixiGlCore = require("pixi-gl-core"), _settings2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./settings")), Shader = function(_GLShader) {
                function Shader(gl, vertexSrc, fragmentSrc) {
                    return _classCallCheck(this, Shader), _possibleConstructorReturn(this, _GLShader.call(this, gl, checkPrecision(vertexSrc, _settings2.default.PRECISION_VERTEX), checkPrecision(fragmentSrc, _settings2.default.PRECISION_FRAGMENT)));
                }
                return _inherits(Shader, _GLShader), Shader;
            }(_pixiGlCore.GLShader);
            exports.default = Shader;
        }, {
            "./settings": 101,
            "pixi-gl-core": 15
        } ],
        45: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0, exports.autoDetectRenderer = function(options, arg1, arg2, arg3) {
                var forceCanvas = options && options.forceCanvas;
                return void 0 !== arg3 && (forceCanvas = arg3), !forceCanvas && utils.isWebGLSupported() ? new _WebGLRenderer2.default(options, arg1, arg2) : new _CanvasRenderer2.default(options, arg1, arg2);
            };
            var utils = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("./utils")), _CanvasRenderer2 = _interopRequireDefault(require("./renderers/canvas/CanvasRenderer")), _WebGLRenderer2 = _interopRequireDefault(require("./renderers/webgl/WebGLRenderer"));
        }, {
            "./renderers/canvas/CanvasRenderer": 77,
            "./renderers/webgl/WebGLRenderer": 84,
            "./utils": 124
        } ],
        46: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0;
            exports.VERSION = "4.5.4", exports.PI_2 = 2 * Math.PI, exports.RAD_TO_DEG = 180 / Math.PI, 
            exports.DEG_TO_RAD = Math.PI / 180, exports.RENDERER_TYPE = {
                UNKNOWN: 0,
                WEBGL: 1,
                CANVAS: 2
            }, exports.BLEND_MODES = {
                NORMAL: 0,
                ADD: 1,
                MULTIPLY: 2,
                SCREEN: 3,
                OVERLAY: 4,
                DARKEN: 5,
                LIGHTEN: 6,
                COLOR_DODGE: 7,
                COLOR_BURN: 8,
                HARD_LIGHT: 9,
                SOFT_LIGHT: 10,
                DIFFERENCE: 11,
                EXCLUSION: 12,
                HUE: 13,
                SATURATION: 14,
                COLOR: 15,
                LUMINOSITY: 16,
                NORMAL_NPM: 17,
                ADD_NPM: 18,
                SCREEN_NPM: 19
            }, exports.DRAW_MODES = {
                POINTS: 0,
                LINES: 1,
                LINE_LOOP: 2,
                LINE_STRIP: 3,
                TRIANGLES: 4,
                TRIANGLE_STRIP: 5,
                TRIANGLE_FAN: 6
            }, exports.SCALE_MODES = {
                LINEAR: 0,
                NEAREST: 1
            }, exports.WRAP_MODES = {
                CLAMP: 0,
                REPEAT: 1,
                MIRRORED_REPEAT: 2
            }, exports.GC_MODES = {
                AUTO: 0,
                MANUAL: 1
            }, exports.URL_FILE_EXTENSION = /\.(\w{3,4})(?:$|\?|#)/i, exports.DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;(charset=[\w-]+|base64))?,(.*)/i, 
            exports.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i, 
            exports.SHAPES = {
                POLY: 0,
                RECT: 1,
                CIRC: 2,
                ELIP: 3,
                RREC: 4
            }, exports.PRECISION = {
                LOW: "lowp",
                MEDIUM: "mediump",
                HIGH: "highp"
            }, exports.TRANSFORM_MODE = {
                STATIC: 0,
                DYNAMIC: 1
            }, exports.TEXT_GRADIENT = {
                LINEAR_VERTICAL: 0,
                LINEAR_HORIZONTAL: 1
            }, exports.UPDATE_PRIORITY = {
                INTERACTION: 50,
                HIGH: 25,
                NORMAL: 0,
                LOW: -25,
                UTILITY: -50
            };
        }, {} ],
        47: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _math = require("../math"), Bounds = function() {
                function Bounds() {
                    _classCallCheck(this, Bounds), this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, 
                    this.maxY = -1 / 0, this.rect = null;
                }
                return Bounds.prototype.isEmpty = function() {
                    return this.minX > this.maxX || this.minY > this.maxY;
                }, Bounds.prototype.clear = function() {
                    this.updateID++, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0;
                }, Bounds.prototype.getRectangle = function(rect) {
                    return this.minX > this.maxX || this.minY > this.maxY ? _math.Rectangle.EMPTY : (rect = rect || new _math.Rectangle(0, 0, 1, 1), 
                    rect.x = this.minX, rect.y = this.minY, rect.width = this.maxX - this.minX, rect.height = this.maxY - this.minY, 
                    rect);
                }, Bounds.prototype.addPoint = function(point) {
                    this.minX = Math.min(this.minX, point.x), this.maxX = Math.max(this.maxX, point.x), 
                    this.minY = Math.min(this.minY, point.y), this.maxY = Math.max(this.maxY, point.y);
                }, Bounds.prototype.addQuad = function(vertices) {
                    var minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY, x = vertices[0], y = vertices[1];
                    minX = x < minX ? x : minX, minY = y < minY ? y : minY, maxX = x > maxX ? x : maxX, 
                    maxY = y > maxY ? y : maxY, x = vertices[2], y = vertices[3], minX = x < minX ? x : minX, 
                    minY = y < minY ? y : minY, maxX = x > maxX ? x : maxX, maxY = y > maxY ? y : maxY, 
                    x = vertices[4], y = vertices[5], minX = x < minX ? x : minX, minY = y < minY ? y : minY, 
                    maxX = x > maxX ? x : maxX, maxY = y > maxY ? y : maxY, x = vertices[6], y = vertices[7], 
                    minX = x < minX ? x : minX, minY = y < minY ? y : minY, maxX = x > maxX ? x : maxX, 
                    maxY = y > maxY ? y : maxY, this.minX = minX, this.minY = minY, this.maxX = maxX, 
                    this.maxY = maxY;
                }, Bounds.prototype.addFrame = function(transform, x0, y0, x1, y1) {
                    var matrix = transform.worldTransform, a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, tx = matrix.tx, ty = matrix.ty, minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY, x = a * x0 + c * y0 + tx, y = b * x0 + d * y0 + ty;
                    minX = x < minX ? x : minX, minY = y < minY ? y : minY, maxX = x > maxX ? x : maxX, 
                    maxY = y > maxY ? y : maxY, y = b * x1 + d * y0 + ty, minX = (x = a * x1 + c * y0 + tx) < minX ? x : minX, 
                    minY = y < minY ? y : minY, maxX = x > maxX ? x : maxX, maxY = y > maxY ? y : maxY, 
                    y = b * x0 + d * y1 + ty, minX = (x = a * x0 + c * y1 + tx) < minX ? x : minX, minY = y < minY ? y : minY, 
                    maxX = x > maxX ? x : maxX, maxY = y > maxY ? y : maxY, y = b * x1 + d * y1 + ty, 
                    minX = (x = a * x1 + c * y1 + tx) < minX ? x : minX, minY = y < minY ? y : minY, 
                    maxX = x > maxX ? x : maxX, maxY = y > maxY ? y : maxY, this.minX = minX, this.minY = minY, 
                    this.maxX = maxX, this.maxY = maxY;
                }, Bounds.prototype.addVertices = function(transform, vertices, beginOffset, endOffset) {
                    for (var matrix = transform.worldTransform, a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, tx = matrix.tx, ty = matrix.ty, minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY, i = beginOffset; i < endOffset; i += 2) {
                        var rawX = vertices[i], rawY = vertices[i + 1], x = a * rawX + c * rawY + tx, y = d * rawY + b * rawX + ty;
                        minX = x < minX ? x : minX, minY = y < minY ? y : minY, maxX = x > maxX ? x : maxX, 
                        maxY = y > maxY ? y : maxY;
                    }
                    this.minX = minX, this.minY = minY, this.maxX = maxX, this.maxY = maxY;
                }, Bounds.prototype.addBounds = function(bounds) {
                    var minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY;
                    this.minX = bounds.minX < minX ? bounds.minX : minX, this.minY = bounds.minY < minY ? bounds.minY : minY, 
                    this.maxX = bounds.maxX > maxX ? bounds.maxX : maxX, this.maxY = bounds.maxY > maxY ? bounds.maxY : maxY;
                }, Bounds.prototype.addBoundsMask = function(bounds, mask) {
                    var _minX = bounds.minX > mask.minX ? bounds.minX : mask.minX, _minY = bounds.minY > mask.minY ? bounds.minY : mask.minY, _maxX = bounds.maxX < mask.maxX ? bounds.maxX : mask.maxX, _maxY = bounds.maxY < mask.maxY ? bounds.maxY : mask.maxY;
                    if (_minX <= _maxX && _minY <= _maxY) {
                        var minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY;
                        this.minX = _minX < minX ? _minX : minX, this.minY = _minY < minY ? _minY : minY, 
                        this.maxX = _maxX > maxX ? _maxX : maxX, this.maxY = _maxY > maxY ? _maxY : maxY;
                    }
                }, Bounds.prototype.addBoundsArea = function(bounds, area) {
                    var _minX = bounds.minX > area.x ? bounds.minX : area.x, _minY = bounds.minY > area.y ? bounds.minY : area.y, _maxX = bounds.maxX < area.x + area.width ? bounds.maxX : area.x + area.width, _maxY = bounds.maxY < area.y + area.height ? bounds.maxY : area.y + area.height;
                    if (_minX <= _maxX && _minY <= _maxY) {
                        var minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY;
                        this.minX = _minX < minX ? _minX : minX, this.minY = _minY < minY ? _minY : minY, 
                        this.maxX = _maxX > maxX ? _maxX : maxX, this.maxY = _maxY > maxY ? _maxY : maxY;
                    }
                }, Bounds;
            }();
            exports.default = Bounds;
        }, {
            "../math": 70
        } ],
        48: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _utils = require("../utils"), Container = function(_DisplayObject) {
                function Container() {
                    _classCallCheck(this, Container);
                    var _this = _possibleConstructorReturn(this, _DisplayObject.call(this));
                    return _this.children = [], _this;
                }
                return _inherits(Container, _DisplayObject), Container.prototype.onChildrenChange = function() {}, 
                Container.prototype.addChild = function(child) {
                    var argumentsLength = arguments.length;
                    if (argumentsLength > 1) for (var i = 0; i < argumentsLength; i++) this.addChild(arguments[i]); else child.parent && child.parent.removeChild(child), 
                    child.parent = this, child.transform._parentID = -1, this.children.push(child), 
                    this._boundsID++, this.onChildrenChange(this.children.length - 1), child.emit("added", this);
                    return child;
                }, Container.prototype.addChildAt = function(child, index) {
                    if (index < 0 || index > this.children.length) throw new Error(child + "addChildAt: The index " + index + " supplied is out of bounds " + this.children.length);
                    return child.parent && child.parent.removeChild(child), child.parent = this, child.transform._parentID = -1, 
                    this.children.splice(index, 0, child), this._boundsID++, this.onChildrenChange(index), 
                    child.emit("added", this), child;
                }, Container.prototype.swapChildren = function(child, child2) {
                    if (child !== child2) {
                        var index1 = this.getChildIndex(child), index2 = this.getChildIndex(child2);
                        this.children[index1] = child2, this.children[index2] = child, this.onChildrenChange(index1 < index2 ? index1 : index2);
                    }
                }, Container.prototype.getChildIndex = function(child) {
                    var index = this.children.indexOf(child);
                    if (-1 === index) throw new Error("The supplied DisplayObject must be a child of the caller");
                    return index;
                }, Container.prototype.setChildIndex = function(child, index) {
                    if (index < 0 || index >= this.children.length) throw new Error("The supplied index is out of bounds");
                    var currentIndex = this.getChildIndex(child);
                    (0, _utils.removeItems)(this.children, currentIndex, 1), this.children.splice(index, 0, child), 
                    this.onChildrenChange(index);
                }, Container.prototype.getChildAt = function(index) {
                    if (index < 0 || index >= this.children.length) throw new Error("getChildAt: Index (" + index + ") does not exist.");
                    return this.children[index];
                }, Container.prototype.removeChild = function(child) {
                    var argumentsLength = arguments.length;
                    if (argumentsLength > 1) for (var i = 0; i < argumentsLength; i++) this.removeChild(arguments[i]); else {
                        var index = this.children.indexOf(child);
                        if (-1 === index) return null;
                        child.parent = null, child.transform._parentID = -1, (0, _utils.removeItems)(this.children, index, 1), 
                        this._boundsID++, this.onChildrenChange(index), child.emit("removed", this);
                    }
                    return child;
                }, Container.prototype.removeChildAt = function(index) {
                    var child = this.getChildAt(index);
                    return child.parent = null, child.transform._parentID = -1, (0, _utils.removeItems)(this.children, index, 1), 
                    this._boundsID++, this.onChildrenChange(index), child.emit("removed", this), child;
                }, Container.prototype.removeChildren = function() {
                    var beginIndex = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, endIndex = arguments[1], begin = beginIndex, end = "number" == typeof endIndex ? endIndex : this.children.length, range = end - begin, removed = void 0;
                    if (range > 0 && range <= end) {
                        removed = this.children.splice(begin, range);
                        for (var i = 0; i < removed.length; ++i) removed[i].parent = null, removed[i].transform && (removed[i].transform._parentID = -1);
                        this._boundsID++, this.onChildrenChange(beginIndex);
                        for (var _i = 0; _i < removed.length; ++_i) removed[_i].emit("removed", this);
                        return removed;
                    }
                    if (0 === range && 0 === this.children.length) return [];
                    throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
                }, Container.prototype.updateTransform = function() {
                    this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
                    for (var i = 0, j = this.children.length; i < j; ++i) {
                        var child = this.children[i];
                        child.visible && child.updateTransform();
                    }
                }, Container.prototype.calculateBounds = function() {
                    this._bounds.clear(), this._calculateBounds();
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.visible && child.renderable && (child.calculateBounds(), child._mask ? (child._mask.calculateBounds(), 
                        this._bounds.addBoundsMask(child._bounds, child._mask._bounds)) : child.filterArea ? this._bounds.addBoundsArea(child._bounds, child.filterArea) : this._bounds.addBounds(child._bounds));
                    }
                    this._lastBoundsID = this._boundsID;
                }, Container.prototype._calculateBounds = function() {}, Container.prototype.renderWebGL = function(renderer) {
                    if (this.visible && !(this.worldAlpha <= 0) && this.renderable) if (this._mask || this._filters) this.renderAdvancedWebGL(renderer); else {
                        this._renderWebGL(renderer);
                        for (var i = 0, j = this.children.length; i < j; ++i) this.children[i].renderWebGL(renderer);
                    }
                }, Container.prototype.renderAdvancedWebGL = function(renderer) {
                    renderer.flush();
                    var filters = this._filters, mask = this._mask;
                    if (filters) {
                        this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
                        for (var i = 0; i < filters.length; i++) filters[i].enabled && this._enabledFilters.push(filters[i]);
                        this._enabledFilters.length && renderer.filterManager.pushFilter(this, this._enabledFilters);
                    }
                    mask && renderer.maskManager.pushMask(this, this._mask), this._renderWebGL(renderer);
                    for (var _i2 = 0, j = this.children.length; _i2 < j; _i2++) this.children[_i2].renderWebGL(renderer);
                    renderer.flush(), mask && renderer.maskManager.popMask(this, this._mask), filters && this._enabledFilters && this._enabledFilters.length && renderer.filterManager.popFilter();
                }, Container.prototype._renderWebGL = function(renderer) {}, Container.prototype._renderCanvas = function(renderer) {}, 
                Container.prototype.renderCanvas = function(renderer) {
                    if (this.visible && !(this.worldAlpha <= 0) && this.renderable) {
                        this._mask && renderer.maskManager.pushMask(this._mask), this._renderCanvas(renderer);
                        for (var i = 0, j = this.children.length; i < j; ++i) this.children[i].renderCanvas(renderer);
                        this._mask && renderer.maskManager.popMask(renderer);
                    }
                }, Container.prototype.destroy = function(options) {
                    _DisplayObject.prototype.destroy.call(this);
                    var destroyChildren = "boolean" == typeof options ? options : options && options.children, oldChildren = this.removeChildren(0, this.children.length);
                    if (destroyChildren) for (var i = 0; i < oldChildren.length; ++i) oldChildren[i].destroy(options);
                }, _createClass(Container, [ {
                    key: "width",
                    get: function() {
                        return this.scale.x * this.getLocalBounds().width;
                    },
                    set: function(value) {
                        var width = this.getLocalBounds().width;
                        this.scale.x = 0 !== width ? value / width : 1, this._width = value;
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this.scale.y * this.getLocalBounds().height;
                    },
                    set: function(value) {
                        var height = this.getLocalBounds().height;
                        this.scale.y = 0 !== height ? value / height : 1, this._height = value;
                    }
                } ]), Container;
            }(function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./DisplayObject")).default);
            exports.default = Container, Container.prototype.containerUpdateTransform = Container.prototype.updateTransform;
        }, {
            "../utils": 124,
            "./DisplayObject": 49
        } ],
        49: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _eventemitter2 = _interopRequireDefault(require("eventemitter3")), _const = require("../const"), _settings2 = _interopRequireDefault(require("../settings")), _TransformStatic2 = _interopRequireDefault(require("./TransformStatic")), _Transform2 = _interopRequireDefault(require("./Transform")), _Bounds2 = _interopRequireDefault(require("./Bounds")), _math = require("../math"), DisplayObject = function(_EventEmitter) {
                function DisplayObject() {
                    _classCallCheck(this, DisplayObject);
                    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this)), TransformClass = _settings2.default.TRANSFORM_MODE === _const.TRANSFORM_MODE.STATIC ? _TransformStatic2.default : _Transform2.default;
                    return _this.tempDisplayObjectParent = null, _this.transform = new TransformClass(), 
                    _this.alpha = 1, _this.visible = !0, _this.renderable = !0, _this.parent = null, 
                    _this.worldAlpha = 1, _this.filterArea = null, _this._filters = null, _this._enabledFilters = null, 
                    _this._bounds = new _Bounds2.default(), _this._boundsID = 0, _this._lastBoundsID = -1, 
                    _this._boundsRect = null, _this._localBoundsRect = null, _this._mask = null, _this._destroyed = !1, 
                    _this;
                }
                return _inherits(DisplayObject, _EventEmitter), DisplayObject.prototype.updateTransform = function() {
                    this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha, 
                    this._bounds.updateID++;
                }, DisplayObject.prototype._recursivePostUpdateTransform = function() {
                    this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform);
                }, DisplayObject.prototype.getBounds = function(skipUpdate, rect) {
                    return skipUpdate || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, 
                    this.updateTransform(), this.parent = null)), this._boundsID !== this._lastBoundsID && this.calculateBounds(), 
                    rect || (this._boundsRect || (this._boundsRect = new _math.Rectangle()), rect = this._boundsRect), 
                    this._bounds.getRectangle(rect);
                }, DisplayObject.prototype.getLocalBounds = function(rect) {
                    var transformRef = this.transform, parentRef = this.parent;
                    this.parent = null, this.transform = this._tempDisplayObjectParent.transform, rect || (this._localBoundsRect || (this._localBoundsRect = new _math.Rectangle()), 
                    rect = this._localBoundsRect);
                    var bounds = this.getBounds(!1, rect);
                    return this.parent = parentRef, this.transform = transformRef, bounds;
                }, DisplayObject.prototype.toGlobal = function(position, point) {
                    return arguments.length > 2 && void 0 !== arguments[2] && arguments[2] || (this._recursivePostUpdateTransform(), 
                    this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, 
                    this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(position, point);
                }, DisplayObject.prototype.toLocal = function(position, from, point, skipUpdate) {
                    return from && (position = from.toGlobal(position, point, skipUpdate)), skipUpdate || (this._recursivePostUpdateTransform(), 
                    this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, 
                    this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(position, point);
                }, DisplayObject.prototype.renderWebGL = function(renderer) {}, DisplayObject.prototype.renderCanvas = function(renderer) {}, 
                DisplayObject.prototype.setParent = function(container) {
                    if (!container || !container.addChild) throw new Error("setParent: Argument must be a Container");
                    return container.addChild(this), container;
                }, DisplayObject.prototype.setTransform = function() {
                    var x = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, scaleX = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, scaleY = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, rotation = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0, skewX = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0, skewY = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0, pivotX = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0, pivotY = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0;
                    return this.position.x = x, this.position.y = y, this.scale.x = scaleX || 1, this.scale.y = scaleY || 1, 
                    this.rotation = rotation, this.skew.x = skewX, this.skew.y = skewY, this.pivot.x = pivotX, 
                    this.pivot.y = pivotY, this;
                }, DisplayObject.prototype.destroy = function() {
                    this.removeAllListeners(), this.parent && this.parent.removeChild(this), this.transform = null, 
                    this.parent = null, this._bounds = null, this._currentBounds = null, this._mask = null, 
                    this.filterArea = null, this.interactive = !1, this.interactiveChildren = !1, this._destroyed = !0;
                }, _createClass(DisplayObject, [ {
                    key: "_tempDisplayObjectParent",
                    get: function() {
                        return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new DisplayObject()), 
                        this.tempDisplayObjectParent;
                    }
                }, {
                    key: "x",
                    get: function() {
                        return this.position.x;
                    },
                    set: function(value) {
                        this.transform.position.x = value;
                    }
                }, {
                    key: "y",
                    get: function() {
                        return this.position.y;
                    },
                    set: function(value) {
                        this.transform.position.y = value;
                    }
                }, {
                    key: "worldTransform",
                    get: function() {
                        return this.transform.worldTransform;
                    }
                }, {
                    key: "localTransform",
                    get: function() {
                        return this.transform.localTransform;
                    }
                }, {
                    key: "position",
                    get: function() {
                        return this.transform.position;
                    },
                    set: function(value) {
                        this.transform.position.copy(value);
                    }
                }, {
                    key: "scale",
                    get: function() {
                        return this.transform.scale;
                    },
                    set: function(value) {
                        this.transform.scale.copy(value);
                    }
                }, {
                    key: "pivot",
                    get: function() {
                        return this.transform.pivot;
                    },
                    set: function(value) {
                        this.transform.pivot.copy(value);
                    }
                }, {
                    key: "skew",
                    get: function() {
                        return this.transform.skew;
                    },
                    set: function(value) {
                        this.transform.skew.copy(value);
                    }
                }, {
                    key: "rotation",
                    get: function() {
                        return this.transform.rotation;
                    },
                    set: function(value) {
                        this.transform.rotation = value;
                    }
                }, {
                    key: "worldVisible",
                    get: function() {
                        var item = this;
                        do {
                            if (!item.visible) return !1;
                            item = item.parent;
                        } while (item);
                        return !0;
                    }
                }, {
                    key: "mask",
                    get: function() {
                        return this._mask;
                    },
                    set: function(value) {
                        this._mask && (this._mask.renderable = !0), this._mask = value, this._mask && (this._mask.renderable = !1);
                    }
                }, {
                    key: "filters",
                    get: function() {
                        return this._filters && this._filters.slice();
                    },
                    set: function(value) {
                        this._filters = value && value.slice();
                    }
                } ]), DisplayObject;
            }(_eventemitter2.default);
            exports.default = DisplayObject, DisplayObject.prototype.displayObjectUpdateTransform = DisplayObject.prototype.updateTransform;
        }, {
            "../const": 46,
            "../math": 70,
            "../settings": 101,
            "./Bounds": 47,
            "./Transform": 50,
            "./TransformStatic": 52,
            eventemitter3: 3
        } ],
        50: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _math = require("../math"), Transform = function(_TransformBase) {
                function Transform() {
                    _classCallCheck(this, Transform);
                    var _this = _possibleConstructorReturn(this, _TransformBase.call(this));
                    return _this.position = new _math.Point(0, 0), _this.scale = new _math.Point(1, 1), 
                    _this.skew = new _math.ObservablePoint(_this.updateSkew, _this, 0, 0), _this.pivot = new _math.Point(0, 0), 
                    _this._rotation = 0, _this._cx = 1, _this._sx = 0, _this._cy = 0, _this._sy = 1, 
                    _this;
                }
                return _inherits(Transform, _TransformBase), Transform.prototype.updateSkew = function() {
                    this._cx = Math.cos(this._rotation + this.skew._y), this._sx = Math.sin(this._rotation + this.skew._y), 
                    this._cy = -Math.sin(this._rotation - this.skew._x), this._sy = Math.cos(this._rotation - this.skew._x);
                }, Transform.prototype.updateLocalTransform = function() {
                    var lt = this.localTransform;
                    lt.a = this._cx * this.scale.x, lt.b = this._sx * this.scale.x, lt.c = this._cy * this.scale.y, 
                    lt.d = this._sy * this.scale.y, lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c), 
                    lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d);
                }, Transform.prototype.updateTransform = function(parentTransform) {
                    var lt = this.localTransform;
                    lt.a = this._cx * this.scale.x, lt.b = this._sx * this.scale.x, lt.c = this._cy * this.scale.y, 
                    lt.d = this._sy * this.scale.y, lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c), 
                    lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d);
                    var pt = parentTransform.worldTransform, wt = this.worldTransform;
                    wt.a = lt.a * pt.a + lt.b * pt.c, wt.b = lt.a * pt.b + lt.b * pt.d, wt.c = lt.c * pt.a + lt.d * pt.c, 
                    wt.d = lt.c * pt.b + lt.d * pt.d, wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx, wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty, 
                    this._worldID++;
                }, Transform.prototype.setFromMatrix = function(matrix) {
                    matrix.decompose(this);
                }, _createClass(Transform, [ {
                    key: "rotation",
                    get: function() {
                        return this._rotation;
                    },
                    set: function(value) {
                        this._rotation = value, this.updateSkew();
                    }
                } ]), Transform;
            }(function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./TransformBase")).default);
            exports.default = Transform;
        }, {
            "../math": 70,
            "./TransformBase": 51
        } ],
        51: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _math = require("../math"), TransformBase = function() {
                function TransformBase() {
                    _classCallCheck(this, TransformBase), this.worldTransform = new _math.Matrix(), 
                    this.localTransform = new _math.Matrix(), this._worldID = 0, this._parentID = 0;
                }
                return TransformBase.prototype.updateLocalTransform = function() {}, TransformBase.prototype.updateTransform = function(parentTransform) {
                    var pt = parentTransform.worldTransform, wt = this.worldTransform, lt = this.localTransform;
                    wt.a = lt.a * pt.a + lt.b * pt.c, wt.b = lt.a * pt.b + lt.b * pt.d, wt.c = lt.c * pt.a + lt.d * pt.c, 
                    wt.d = lt.c * pt.b + lt.d * pt.d, wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx, wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty, 
                    this._worldID++;
                }, TransformBase;
            }();
            exports.default = TransformBase, TransformBase.prototype.updateWorldTransform = TransformBase.prototype.updateTransform, 
            TransformBase.IDENTITY = new TransformBase();
        }, {
            "../math": 70
        } ],
        52: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _math = require("../math"), TransformStatic = function(_TransformBase) {
                function TransformStatic() {
                    _classCallCheck(this, TransformStatic);
                    var _this = _possibleConstructorReturn(this, _TransformBase.call(this));
                    return _this.position = new _math.ObservablePoint(_this.onChange, _this, 0, 0), 
                    _this.scale = new _math.ObservablePoint(_this.onChange, _this, 1, 1), _this.pivot = new _math.ObservablePoint(_this.onChange, _this, 0, 0), 
                    _this.skew = new _math.ObservablePoint(_this.updateSkew, _this, 0, 0), _this._rotation = 0, 
                    _this._cx = 1, _this._sx = 0, _this._cy = 0, _this._sy = 1, _this._localID = 0, 
                    _this._currentLocalID = 0, _this;
                }
                return _inherits(TransformStatic, _TransformBase), TransformStatic.prototype.onChange = function() {
                    this._localID++;
                }, TransformStatic.prototype.updateSkew = function() {
                    this._cx = Math.cos(this._rotation + this.skew._y), this._sx = Math.sin(this._rotation + this.skew._y), 
                    this._cy = -Math.sin(this._rotation - this.skew._x), this._sy = Math.cos(this._rotation - this.skew._x), 
                    this._localID++;
                }, TransformStatic.prototype.updateLocalTransform = function() {
                    var lt = this.localTransform;
                    this._localID !== this._currentLocalID && (lt.a = this._cx * this.scale._x, lt.b = this._sx * this.scale._x, 
                    lt.c = this._cy * this.scale._y, lt.d = this._sy * this.scale._y, lt.tx = this.position._x - (this.pivot._x * lt.a + this.pivot._y * lt.c), 
                    lt.ty = this.position._y - (this.pivot._x * lt.b + this.pivot._y * lt.d), this._currentLocalID = this._localID, 
                    this._parentID = -1);
                }, TransformStatic.prototype.updateTransform = function(parentTransform) {
                    var lt = this.localTransform;
                    if (this._localID !== this._currentLocalID && (lt.a = this._cx * this.scale._x, 
                    lt.b = this._sx * this.scale._x, lt.c = this._cy * this.scale._y, lt.d = this._sy * this.scale._y, 
                    lt.tx = this.position._x - (this.pivot._x * lt.a + this.pivot._y * lt.c), lt.ty = this.position._y - (this.pivot._x * lt.b + this.pivot._y * lt.d), 
                    this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== parentTransform._worldID) {
                        var pt = parentTransform.worldTransform, wt = this.worldTransform;
                        wt.a = lt.a * pt.a + lt.b * pt.c, wt.b = lt.a * pt.b + lt.b * pt.d, wt.c = lt.c * pt.a + lt.d * pt.c, 
                        wt.d = lt.c * pt.b + lt.d * pt.d, wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx, wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty, 
                        this._parentID = parentTransform._worldID, this._worldID++;
                    }
                }, TransformStatic.prototype.setFromMatrix = function(matrix) {
                    matrix.decompose(this), this._localID++;
                }, _createClass(TransformStatic, [ {
                    key: "rotation",
                    get: function() {
                        return this._rotation;
                    },
                    set: function(value) {
                        this._rotation = value, this.updateSkew();
                    }
                } ]), TransformStatic;
            }(function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./TransformBase")).default);
            exports.default = TransformStatic;
        }, {
            "../math": 70,
            "./TransformBase": 51
        } ],
        53: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _Container3 = _interopRequireDefault(require("../display/Container")), _RenderTexture2 = _interopRequireDefault(require("../textures/RenderTexture")), _Texture2 = _interopRequireDefault(require("../textures/Texture")), _GraphicsData2 = _interopRequireDefault(require("./GraphicsData")), _Sprite2 = _interopRequireDefault(require("../sprites/Sprite")), _math = require("../math"), _utils = require("../utils"), _const = require("../const"), _Bounds2 = _interopRequireDefault(require("../display/Bounds")), _bezierCurveTo3 = _interopRequireDefault(require("./utils/bezierCurveTo")), _CanvasRenderer2 = _interopRequireDefault(require("../renderers/canvas/CanvasRenderer")), canvasRenderer = void 0, tempMatrix = new _math.Matrix(), tempPoint = new _math.Point(), tempColor1 = new Float32Array(4), tempColor2 = new Float32Array(4), Graphics = function(_Container) {
                function Graphics() {
                    var nativeLines = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    _classCallCheck(this, Graphics);
                    var _this = _possibleConstructorReturn(this, _Container.call(this));
                    return _this.fillAlpha = 1, _this.lineWidth = 0, _this.nativeLines = nativeLines, 
                    _this.lineColor = 0, _this.graphicsData = [], _this.tint = 16777215, _this._prevTint = 16777215, 
                    _this.blendMode = _const.BLEND_MODES.NORMAL, _this.currentPath = null, _this._webGL = {}, 
                    _this.isMask = !1, _this.boundsPadding = 0, _this._localBounds = new _Bounds2.default(), 
                    _this.dirty = 0, _this.fastRectDirty = -1, _this.clearDirty = 0, _this.boundsDirty = -1, 
                    _this.cachedSpriteDirty = !1, _this._spriteRect = null, _this._fastRect = !1, _this;
                }
                return _inherits(Graphics, _Container), Graphics.prototype.clone = function() {
                    var clone = new Graphics();
                    clone.renderable = this.renderable, clone.fillAlpha = this.fillAlpha, clone.lineWidth = this.lineWidth, 
                    clone.lineColor = this.lineColor, clone.tint = this.tint, clone.blendMode = this.blendMode, 
                    clone.isMask = this.isMask, clone.boundsPadding = this.boundsPadding, clone.dirty = 0, 
                    clone.cachedSpriteDirty = this.cachedSpriteDirty;
                    for (var i = 0; i < this.graphicsData.length; ++i) clone.graphicsData.push(this.graphicsData[i].clone());
                    return clone.currentPath = clone.graphicsData[clone.graphicsData.length - 1], clone.updateLocalBounds(), 
                    clone;
                }, Graphics.prototype.lineStyle = function() {
                    var lineWidth = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, color = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, alpha = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                    if (this.lineWidth = lineWidth, this.lineColor = color, this.lineAlpha = alpha, 
                    this.currentPath) if (this.currentPath.shape.points.length) {
                        var shape = new _math.Polygon(this.currentPath.shape.points.slice(-2));
                        shape.closed = !1, this.drawShape(shape);
                    } else this.currentPath.lineWidth = this.lineWidth, this.currentPath.lineColor = this.lineColor, 
                    this.currentPath.lineAlpha = this.lineAlpha;
                    return this;
                }, Graphics.prototype.moveTo = function(x, y) {
                    var shape = new _math.Polygon([ x, y ]);
                    return shape.closed = !1, this.drawShape(shape), this;
                }, Graphics.prototype.lineTo = function(x, y) {
                    return this.currentPath.shape.points.push(x, y), this.dirty++, this;
                }, Graphics.prototype.quadraticCurveTo = function(cpX, cpY, toX, toY) {
                    this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [ 0, 0 ]) : this.moveTo(0, 0);
                    var points = this.currentPath.shape.points, xa = 0, ya = 0;
                    0 === points.length && this.moveTo(0, 0);
                    for (var fromX = points[points.length - 2], fromY = points[points.length - 1], i = 1; i <= 20; ++i) {
                        var j = i / 20;
                        xa = fromX + (cpX - fromX) * j, ya = fromY + (cpY - fromY) * j, points.push(xa + (cpX + (toX - cpX) * j - xa) * j, ya + (cpY + (toY - cpY) * j - ya) * j);
                    }
                    return this.dirty++, this;
                }, Graphics.prototype.bezierCurveTo = function(cpX, cpY, cpX2, cpY2, toX, toY) {
                    this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [ 0, 0 ]) : this.moveTo(0, 0);
                    var points = this.currentPath.shape.points, fromX = points[points.length - 2], fromY = points[points.length - 1];
                    return points.length -= 2, (0, _bezierCurveTo3.default)(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY, points), 
                    this.dirty++, this;
                }, Graphics.prototype.arcTo = function(x1, y1, x2, y2, radius) {
                    this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(x1, y1) : this.moveTo(x1, y1);
                    var points = this.currentPath.shape.points, fromX = points[points.length - 2], a1 = points[points.length - 1] - y1, b1 = fromX - x1, a2 = y2 - y1, b2 = x2 - x1, mm = Math.abs(a1 * b2 - b1 * a2);
                    if (mm < 1e-8 || 0 === radius) points[points.length - 2] === x1 && points[points.length - 1] === y1 || points.push(x1, y1); else {
                        var dd = a1 * a1 + b1 * b1, cc = a2 * a2 + b2 * b2, tt = a1 * a2 + b1 * b2, k1 = radius * Math.sqrt(dd) / mm, k2 = radius * Math.sqrt(cc) / mm, j1 = k1 * tt / dd, j2 = k2 * tt / cc, cx = k1 * b2 + k2 * b1, cy = k1 * a2 + k2 * a1, px = b1 * (k2 + j1), py = a1 * (k2 + j1), qx = b2 * (k1 + j2), qy = a2 * (k1 + j2), startAngle = Math.atan2(py - cy, px - cx), endAngle = Math.atan2(qy - cy, qx - cx);
                        this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
                    }
                    return this.dirty++, this;
                }, Graphics.prototype.arc = function(cx, cy, radius, startAngle, endAngle) {
                    var anticlockwise = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
                    if (startAngle === endAngle) return this;
                    !anticlockwise && endAngle <= startAngle ? endAngle += 2 * Math.PI : anticlockwise && startAngle <= endAngle && (startAngle += 2 * Math.PI);
                    var sweep = endAngle - startAngle, segs = 40 * Math.ceil(Math.abs(sweep) / (2 * Math.PI));
                    if (0 === sweep) return this;
                    var startX = cx + Math.cos(startAngle) * radius, startY = cy + Math.sin(startAngle) * radius, points = this.currentPath ? this.currentPath.shape.points : null;
                    points ? points[points.length - 2] === startX && points[points.length - 1] === startY || points.push(startX, startY) : (this.moveTo(startX, startY), 
                    points = this.currentPath.shape.points);
                    for (var theta = sweep / (2 * segs), theta2 = 2 * theta, cTheta = Math.cos(theta), sTheta = Math.sin(theta), segMinus = segs - 1, remainder = segMinus % 1 / segMinus, i = 0; i <= segMinus; ++i) {
                        var angle = theta + startAngle + theta2 * (i + remainder * i), c = Math.cos(angle), s = -Math.sin(angle);
                        points.push((cTheta * c + sTheta * s) * radius + cx, (cTheta * -s + sTheta * c) * radius + cy);
                    }
                    return this.dirty++, this;
                }, Graphics.prototype.beginFill = function() {
                    var color = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, alpha = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    return this.filling = !0, this.fillColor = color, this.fillAlpha = alpha, this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling, 
                    this.currentPath.fillColor = this.fillColor, this.currentPath.fillAlpha = this.fillAlpha), 
                    this;
                }, Graphics.prototype.endFill = function() {
                    return this.filling = !1, this.fillColor = null, this.fillAlpha = 1, this;
                }, Graphics.prototype.drawRect = function(x, y, width, height) {
                    return this.drawShape(new _math.Rectangle(x, y, width, height)), this;
                }, Graphics.prototype.drawRoundedRect = function(x, y, width, height, radius) {
                    return this.drawShape(new _math.RoundedRectangle(x, y, width, height, radius)), 
                    this;
                }, Graphics.prototype.drawCircle = function(x, y, radius) {
                    return this.drawShape(new _math.Circle(x, y, radius)), this;
                }, Graphics.prototype.drawEllipse = function(x, y, width, height) {
                    return this.drawShape(new _math.Ellipse(x, y, width, height)), this;
                }, Graphics.prototype.drawPolygon = function(path) {
                    var points = path, closed = !0;
                    if (points instanceof _math.Polygon && (closed = points.closed, points = points.points), 
                    !Array.isArray(points)) {
                        points = new Array(arguments.length);
                        for (var i = 0; i < points.length; ++i) points[i] = arguments[i];
                    }
                    var shape = new _math.Polygon(points);
                    return shape.closed = closed, this.drawShape(shape), this;
                }, Graphics.prototype.clear = function() {
                    return (this.lineWidth || this.filling || this.graphicsData.length > 0) && (this.lineWidth = 0, 
                    this.filling = !1, this.boundsDirty = -1, this.dirty++, this.clearDirty++, this.graphicsData.length = 0), 
                    this.currentPath = null, this._spriteRect = null, this;
                }, Graphics.prototype.isFastRect = function() {
                    return 1 === this.graphicsData.length && this.graphicsData[0].shape.type === _const.SHAPES.RECT && !this.graphicsData[0].lineWidth;
                }, Graphics.prototype._renderWebGL = function(renderer) {
                    this.dirty !== this.fastRectDirty && (this.fastRectDirty = this.dirty, this._fastRect = this.isFastRect()), 
                    this._fastRect ? this._renderSpriteRect(renderer) : (renderer.setObjectRenderer(renderer.plugins.graphics), 
                    renderer.plugins.graphics.render(this));
                }, Graphics.prototype._renderSpriteRect = function(renderer) {
                    var rect = this.graphicsData[0].shape;
                    this._spriteRect || (this._spriteRect = new _Sprite2.default(new _Texture2.default(_Texture2.default.WHITE)));
                    var sprite = this._spriteRect;
                    if (16777215 === this.tint) sprite.tint = this.graphicsData[0].fillColor; else {
                        var t1 = tempColor1, t2 = tempColor2;
                        (0, _utils.hex2rgb)(this.graphicsData[0].fillColor, t1), (0, _utils.hex2rgb)(this.tint, t2), 
                        t1[0] *= t2[0], t1[1] *= t2[1], t1[2] *= t2[2], sprite.tint = (0, _utils.rgb2hex)(t1);
                    }
                    sprite.alpha = this.graphicsData[0].fillAlpha, sprite.worldAlpha = this.worldAlpha * sprite.alpha, 
                    sprite.blendMode = this.blendMode, sprite._texture._frame.width = rect.width, sprite._texture._frame.height = rect.height, 
                    sprite.transform.worldTransform = this.transform.worldTransform, sprite.anchor.set(-rect.x / rect.width, -rect.y / rect.height), 
                    sprite._onAnchorUpdate(), sprite._renderWebGL(renderer);
                }, Graphics.prototype._renderCanvas = function(renderer) {
                    !0 !== this.isMask && renderer.plugins.graphics.render(this);
                }, Graphics.prototype._calculateBounds = function() {
                    this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.updateLocalBounds(), 
                    this.cachedSpriteDirty = !0);
                    var lb = this._localBounds;
                    this._bounds.addFrame(this.transform, lb.minX, lb.minY, lb.maxX, lb.maxY);
                }, Graphics.prototype.containsPoint = function(point) {
                    this.worldTransform.applyInverse(point, tempPoint);
                    for (var graphicsData = this.graphicsData, i = 0; i < graphicsData.length; ++i) {
                        var data = graphicsData[i];
                        if (data.fill && (data.shape && data.shape.contains(tempPoint.x, tempPoint.y))) {
                            if (data.holes) for (var _i = 0; _i < data.holes.length; _i++) if (data.holes[_i].contains(tempPoint.x, tempPoint.y)) return !1;
                            return !0;
                        }
                    }
                    return !1;
                }, Graphics.prototype.updateLocalBounds = function() {
                    var minX = 1 / 0, maxX = -1 / 0, minY = 1 / 0, maxY = -1 / 0;
                    if (this.graphicsData.length) for (var shape = 0, x = 0, y = 0, w = 0, h = 0, i = 0; i < this.graphicsData.length; i++) {
                        var data = this.graphicsData[i], type = data.type, lineWidth = data.lineWidth;
                        if (shape = data.shape, type === _const.SHAPES.RECT || type === _const.SHAPES.RREC) x = shape.x - lineWidth / 2, 
                        y = shape.y - lineWidth / 2, w = shape.width + lineWidth, h = shape.height + lineWidth, 
                        minX = x < minX ? x : minX, maxX = x + w > maxX ? x + w : maxX, minY = y < minY ? y : minY, 
                        maxY = y + h > maxY ? y + h : maxY; else if (type === _const.SHAPES.CIRC) x = shape.x, 
                        y = shape.y, w = shape.radius + lineWidth / 2, h = shape.radius + lineWidth / 2, 
                        minX = x - w < minX ? x - w : minX, maxX = x + w > maxX ? x + w : maxX, minY = y - h < minY ? y - h : minY, 
                        maxY = y + h > maxY ? y + h : maxY; else if (type === _const.SHAPES.ELIP) x = shape.x, 
                        y = shape.y, w = shape.width + lineWidth / 2, h = shape.height + lineWidth / 2, 
                        minX = x - w < minX ? x - w : minX, maxX = x + w > maxX ? x + w : maxX, minY = y - h < minY ? y - h : minY, 
                        maxY = y + h > maxY ? y + h : maxY; else for (var points = shape.points, x2 = 0, y2 = 0, dx = 0, dy = 0, rw = 0, rh = 0, cx = 0, cy = 0, j = 0; j + 2 < points.length; j += 2) x = points[j], 
                        y = points[j + 1], x2 = points[j + 2], y2 = points[j + 3], dx = Math.abs(x2 - x), 
                        dy = Math.abs(y2 - y), h = lineWidth, (w = Math.sqrt(dx * dx + dy * dy)) < 1e-9 || (rh = (h / w * dx + dy) / 2, 
                        cy = (y2 + y) / 2, minX = (cx = (x2 + x) / 2) - (rw = (h / w * dy + dx) / 2) < minX ? cx - rw : minX, 
                        maxX = cx + rw > maxX ? cx + rw : maxX, minY = cy - rh < minY ? cy - rh : minY, 
                        maxY = cy + rh > maxY ? cy + rh : maxY);
                    } else minX = 0, maxX = 0, minY = 0, maxY = 0;
                    var padding = this.boundsPadding;
                    this._localBounds.minX = minX - padding, this._localBounds.maxX = maxX + padding, 
                    this._localBounds.minY = minY - padding, this._localBounds.maxY = maxY + padding;
                }, Graphics.prototype.drawShape = function(shape) {
                    this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(), 
                    this.currentPath = null;
                    var data = new _GraphicsData2.default(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, this.nativeLines, shape);
                    return this.graphicsData.push(data), data.type === _const.SHAPES.POLY && (data.shape.closed = data.shape.closed || this.filling, 
                    this.currentPath = data), this.dirty++, data;
                }, Graphics.prototype.generateCanvasTexture = function(scaleMode) {
                    var resolution = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, bounds = this.getLocalBounds(), canvasBuffer = _RenderTexture2.default.create(bounds.width, bounds.height, scaleMode, resolution);
                    canvasRenderer || (canvasRenderer = new _CanvasRenderer2.default()), this.transform.updateLocalTransform(), 
                    this.transform.localTransform.copy(tempMatrix), tempMatrix.invert(), tempMatrix.tx -= bounds.x, 
                    tempMatrix.ty -= bounds.y, canvasRenderer.render(this, canvasBuffer, !0, tempMatrix);
                    var texture = _Texture2.default.fromCanvas(canvasBuffer.baseTexture._canvasRenderTarget.canvas, scaleMode, "graphics");
                    return texture.baseTexture.resolution = resolution, texture.baseTexture.update(), 
                    texture;
                }, Graphics.prototype.closePath = function() {
                    var currentPath = this.currentPath;
                    return currentPath && currentPath.shape && currentPath.shape.close(), this;
                }, Graphics.prototype.addHole = function() {
                    var hole = this.graphicsData.pop();
                    return this.currentPath = this.graphicsData[this.graphicsData.length - 1], this.currentPath.addHole(hole.shape), 
                    this.currentPath = null, this;
                }, Graphics.prototype.destroy = function(options) {
                    _Container.prototype.destroy.call(this, options);
                    for (var i = 0; i < this.graphicsData.length; ++i) this.graphicsData[i].destroy();
                    for (var id in this._webgl) for (var j = 0; j < this._webgl[id].data.length; ++j) this._webgl[id].data[j].destroy();
                    this._spriteRect && this._spriteRect.destroy(), this.graphicsData = null, this.currentPath = null, 
                    this._webgl = null, this._localBounds = null;
                }, Graphics;
            }(_Container3.default);
            exports.default = Graphics, Graphics._SPRITE_TEXTURE = null;
        }, {
            "../const": 46,
            "../display/Bounds": 47,
            "../display/Container": 48,
            "../math": 70,
            "../renderers/canvas/CanvasRenderer": 77,
            "../sprites/Sprite": 102,
            "../textures/RenderTexture": 113,
            "../textures/Texture": 115,
            "../utils": 124,
            "./GraphicsData": 54,
            "./utils/bezierCurveTo": 56
        } ],
        54: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var GraphicsData = function() {
                function GraphicsData(lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, nativeLines, shape) {
                    _classCallCheck(this, GraphicsData), this.lineWidth = lineWidth, this.nativeLines = nativeLines, 
                    this.lineColor = lineColor, this.lineAlpha = lineAlpha, this._lineTint = lineColor, 
                    this.fillColor = fillColor, this.fillAlpha = fillAlpha, this._fillTint = fillColor, 
                    this.fill = fill, this.holes = [], this.shape = shape, this.type = shape.type;
                }
                return GraphicsData.prototype.clone = function() {
                    return new GraphicsData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.nativeLines, this.shape);
                }, GraphicsData.prototype.addHole = function(shape) {
                    this.holes.push(shape);
                }, GraphicsData.prototype.destroy = function() {
                    this.shape = null, this.holes = null;
                }, GraphicsData;
            }();
            exports.default = GraphicsData;
        }, {} ],
        55: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _CanvasRenderer2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../../renderers/canvas/CanvasRenderer")), _const = require("../../const"), CanvasGraphicsRenderer = function() {
                function CanvasGraphicsRenderer(renderer) {
                    _classCallCheck(this, CanvasGraphicsRenderer), this.renderer = renderer;
                }
                return CanvasGraphicsRenderer.prototype.render = function(graphics) {
                    var renderer = this.renderer, context = renderer.context, worldAlpha = graphics.worldAlpha, transform = graphics.transform.worldTransform, resolution = renderer.resolution;
                    this._prevTint !== this.tint && (this.dirty = !0), context.setTransform(transform.a * resolution, transform.b * resolution, transform.c * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution), 
                    graphics.dirty && (this.updateGraphicsTint(graphics), graphics.dirty = !1), renderer.setBlendMode(graphics.blendMode);
                    for (var i = 0; i < graphics.graphicsData.length; i++) {
                        var data = graphics.graphicsData[i], shape = data.shape, fillColor = data._fillTint, lineColor = data._lineTint;
                        if (context.lineWidth = data.lineWidth, data.type === _const.SHAPES.POLY) {
                            context.beginPath(), this.renderPolygon(shape.points, shape.closed, context);
                            for (var j = 0; j < data.holes.length; j++) this.renderPolygon(data.holes[j].points, !0, context);
                            data.fill && (context.globalAlpha = data.fillAlpha * worldAlpha, context.fillStyle = "#" + ("00000" + (0 | fillColor).toString(16)).substr(-6), 
                            context.fill()), data.lineWidth && (context.globalAlpha = data.lineAlpha * worldAlpha, 
                            context.strokeStyle = "#" + ("00000" + (0 | lineColor).toString(16)).substr(-6), 
                            context.stroke());
                        } else if (data.type === _const.SHAPES.RECT) (data.fillColor || 0 === data.fillColor) && (context.globalAlpha = data.fillAlpha * worldAlpha, 
                        context.fillStyle = "#" + ("00000" + (0 | fillColor).toString(16)).substr(-6), context.fillRect(shape.x, shape.y, shape.width, shape.height)), 
                        data.lineWidth && (context.globalAlpha = data.lineAlpha * worldAlpha, context.strokeStyle = "#" + ("00000" + (0 | lineColor).toString(16)).substr(-6), 
                        context.strokeRect(shape.x, shape.y, shape.width, shape.height)); else if (data.type === _const.SHAPES.CIRC) context.beginPath(), 
                        context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI), context.closePath(), 
                        data.fill && (context.globalAlpha = data.fillAlpha * worldAlpha, context.fillStyle = "#" + ("00000" + (0 | fillColor).toString(16)).substr(-6), 
                        context.fill()), data.lineWidth && (context.globalAlpha = data.lineAlpha * worldAlpha, 
                        context.strokeStyle = "#" + ("00000" + (0 | lineColor).toString(16)).substr(-6), 
                        context.stroke()); else if (data.type === _const.SHAPES.ELIP) {
                            var w = 2 * shape.width, h = 2 * shape.height, x = shape.x - w / 2, y = shape.y - h / 2;
                            context.beginPath();
                            var ox = w / 2 * .5522848, oy = h / 2 * .5522848, xe = x + w, ye = y + h, xm = x + w / 2, ym = y + h / 2;
                            context.moveTo(x, ym), context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y), context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym), 
                            context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye), context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym), 
                            context.closePath(), data.fill && (context.globalAlpha = data.fillAlpha * worldAlpha, 
                            context.fillStyle = "#" + ("00000" + (0 | fillColor).toString(16)).substr(-6), context.fill()), 
                            data.lineWidth && (context.globalAlpha = data.lineAlpha * worldAlpha, context.strokeStyle = "#" + ("00000" + (0 | lineColor).toString(16)).substr(-6), 
                            context.stroke());
                        } else if (data.type === _const.SHAPES.RREC) {
                            var rx = shape.x, ry = shape.y, width = shape.width, height = shape.height, radius = shape.radius, maxRadius = Math.min(width, height) / 2 | 0;
                            radius = radius > maxRadius ? maxRadius : radius, context.beginPath(), context.moveTo(rx, ry + radius), 
                            context.lineTo(rx, ry + height - radius), context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height), 
                            context.lineTo(rx + width - radius, ry + height), context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius), 
                            context.lineTo(rx + width, ry + radius), context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry), 
                            context.lineTo(rx + radius, ry), context.quadraticCurveTo(rx, ry, rx, ry + radius), 
                            context.closePath(), (data.fillColor || 0 === data.fillColor) && (context.globalAlpha = data.fillAlpha * worldAlpha, 
                            context.fillStyle = "#" + ("00000" + (0 | fillColor).toString(16)).substr(-6), context.fill()), 
                            data.lineWidth && (context.globalAlpha = data.lineAlpha * worldAlpha, context.strokeStyle = "#" + ("00000" + (0 | lineColor).toString(16)).substr(-6), 
                            context.stroke());
                        }
                    }
                }, CanvasGraphicsRenderer.prototype.updateGraphicsTint = function(graphics) {
                    graphics._prevTint = graphics.tint;
                    for (var tintR = (graphics.tint >> 16 & 255) / 255, tintG = (graphics.tint >> 8 & 255) / 255, tintB = (255 & graphics.tint) / 255, i = 0; i < graphics.graphicsData.length; ++i) {
                        var data = graphics.graphicsData[i], fillColor = 0 | data.fillColor, lineColor = 0 | data.lineColor;
                        data._fillTint = ((fillColor >> 16 & 255) / 255 * tintR * 255 << 16) + ((fillColor >> 8 & 255) / 255 * tintG * 255 << 8) + (255 & fillColor) / 255 * tintB * 255, 
                        data._lineTint = ((lineColor >> 16 & 255) / 255 * tintR * 255 << 16) + ((lineColor >> 8 & 255) / 255 * tintG * 255 << 8) + (255 & lineColor) / 255 * tintB * 255;
                    }
                }, CanvasGraphicsRenderer.prototype.renderPolygon = function(points, close, context) {
                    context.moveTo(points[0], points[1]);
                    for (var j = 1; j < points.length / 2; ++j) context.lineTo(points[2 * j], points[2 * j + 1]);
                    close && context.closePath();
                }, CanvasGraphicsRenderer.prototype.destroy = function() {
                    this.renderer = null;
                }, CanvasGraphicsRenderer;
            }();
            exports.default = CanvasGraphicsRenderer, _CanvasRenderer2.default.registerPlugin("graphics", CanvasGraphicsRenderer);
        }, {
            "../../const": 46,
            "../../renderers/canvas/CanvasRenderer": 77
        } ],
        56: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY) {
                var path = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : [], dt = 0, dt2 = 0, dt3 = 0, t2 = 0, t3 = 0;
                path.push(fromX, fromY);
                for (var i = 1, j = 0; i <= 20; ++i) dt3 = (dt2 = (dt = 1 - (j = i / 20)) * dt) * dt, 
                t3 = (t2 = j * j) * j, path.push(dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX, dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY);
                return path;
            };
        }, {} ],
        57: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _utils = require("../../utils"), _const = require("../../const"), _ObjectRenderer3 = _interopRequireDefault(require("../../renderers/webgl/utils/ObjectRenderer")), _WebGLRenderer2 = _interopRequireDefault(require("../../renderers/webgl/WebGLRenderer")), _WebGLGraphicsData2 = _interopRequireDefault(require("./WebGLGraphicsData")), _PrimitiveShader2 = _interopRequireDefault(require("./shaders/PrimitiveShader")), _buildPoly2 = _interopRequireDefault(require("./utils/buildPoly")), _buildRectangle2 = _interopRequireDefault(require("./utils/buildRectangle")), _buildRoundedRectangle2 = _interopRequireDefault(require("./utils/buildRoundedRectangle")), _buildCircle2 = _interopRequireDefault(require("./utils/buildCircle")), GraphicsRenderer = function(_ObjectRenderer) {
                function GraphicsRenderer(renderer) {
                    _classCallCheck(this, GraphicsRenderer);
                    var _this = _possibleConstructorReturn(this, _ObjectRenderer.call(this, renderer));
                    return _this.graphicsDataPool = [], _this.primitiveShader = null, _this.gl = renderer.gl, 
                    _this.CONTEXT_UID = 0, _this;
                }
                return _inherits(GraphicsRenderer, _ObjectRenderer), GraphicsRenderer.prototype.onContextChange = function() {
                    this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.primitiveShader = new _PrimitiveShader2.default(this.gl);
                }, GraphicsRenderer.prototype.destroy = function() {
                    _ObjectRenderer3.default.prototype.destroy.call(this);
                    for (var i = 0; i < this.graphicsDataPool.length; ++i) this.graphicsDataPool[i].destroy();
                    this.graphicsDataPool = null;
                }, GraphicsRenderer.prototype.render = function(graphics) {
                    var renderer = this.renderer, gl = renderer.gl, webGLData = void 0, webGL = graphics._webGL[this.CONTEXT_UID];
                    webGL && graphics.dirty === webGL.dirty || (this.updateGraphics(graphics), webGL = graphics._webGL[this.CONTEXT_UID]);
                    var shader = this.primitiveShader;
                    renderer.bindShader(shader), renderer.state.setBlendMode(graphics.blendMode);
                    for (var i = 0, n = webGL.data.length; i < n; i++) {
                        var shaderTemp = (webGLData = webGL.data[i]).shader;
                        renderer.bindShader(shaderTemp), shaderTemp.uniforms.translationMatrix = graphics.transform.worldTransform.toArray(!0), 
                        shaderTemp.uniforms.tint = (0, _utils.hex2rgb)(graphics.tint), shaderTemp.uniforms.alpha = graphics.worldAlpha, 
                        renderer.bindVao(webGLData.vao), webGLData.nativeLines ? gl.drawArrays(gl.LINES, 0, webGLData.points.length / 6) : webGLData.vao.draw(gl.TRIANGLE_STRIP, webGLData.indices.length);
                    }
                }, GraphicsRenderer.prototype.updateGraphics = function(graphics) {
                    var gl = this.renderer.gl, webGL = graphics._webGL[this.CONTEXT_UID];
                    if (webGL || (webGL = graphics._webGL[this.CONTEXT_UID] = {
                        lastIndex: 0,
                        data: [],
                        gl: gl,
                        clearDirty: -1,
                        dirty: -1
                    }), webGL.dirty = graphics.dirty, graphics.clearDirty !== webGL.clearDirty) {
                        webGL.clearDirty = graphics.clearDirty;
                        for (var i = 0; i < webGL.data.length; i++) this.graphicsDataPool.push(webGL.data[i]);
                        webGL.data.length = 0, webGL.lastIndex = 0;
                    }
                    for (var webGLData = void 0, webGLDataNativeLines = void 0, _i = webGL.lastIndex; _i < graphics.graphicsData.length; _i++) {
                        var data = graphics.graphicsData[_i];
                        webGLData = this.getWebGLData(webGL, 0), data.nativeLines && data.lineWidth && (webGLDataNativeLines = this.getWebGLData(webGL, 0, !0), 
                        webGL.lastIndex++), data.type === _const.SHAPES.POLY && (0, _buildPoly2.default)(data, webGLData, webGLDataNativeLines), 
                        data.type === _const.SHAPES.RECT ? (0, _buildRectangle2.default)(data, webGLData, webGLDataNativeLines) : data.type === _const.SHAPES.CIRC || data.type === _const.SHAPES.ELIP ? (0, 
                        _buildCircle2.default)(data, webGLData, webGLDataNativeLines) : data.type === _const.SHAPES.RREC && (0, 
                        _buildRoundedRectangle2.default)(data, webGLData, webGLDataNativeLines), webGL.lastIndex++;
                    }
                    this.renderer.bindVao(null);
                    for (var _i2 = 0; _i2 < webGL.data.length; _i2++) (webGLData = webGL.data[_i2]).dirty && webGLData.upload();
                }, GraphicsRenderer.prototype.getWebGLData = function(gl, type, nativeLines) {
                    var webGLData = gl.data[gl.data.length - 1];
                    return (!webGLData || webGLData.nativeLines !== nativeLines || webGLData.points.length > 32e4) && ((webGLData = this.graphicsDataPool.pop() || new _WebGLGraphicsData2.default(this.renderer.gl, this.primitiveShader, this.renderer.state.attribsState)).nativeLines = nativeLines, 
                    webGLData.reset(type), gl.data.push(webGLData)), webGLData.dirty = !0, webGLData;
                }, GraphicsRenderer;
            }(_ObjectRenderer3.default);
            exports.default = GraphicsRenderer, _WebGLRenderer2.default.registerPlugin("graphics", GraphicsRenderer);
        }, {
            "../../const": 46,
            "../../renderers/webgl/WebGLRenderer": 84,
            "../../renderers/webgl/utils/ObjectRenderer": 94,
            "../../utils": 124,
            "./WebGLGraphicsData": 58,
            "./shaders/PrimitiveShader": 59,
            "./utils/buildCircle": 60,
            "./utils/buildPoly": 62,
            "./utils/buildRectangle": 63,
            "./utils/buildRoundedRectangle": 64
        } ],
        58: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _pixiGlCore2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("pixi-gl-core")), WebGLGraphicsData = function() {
                function WebGLGraphicsData(gl, shader, attribsState) {
                    _classCallCheck(this, WebGLGraphicsData), this.gl = gl, this.color = [ 0, 0, 0 ], 
                    this.points = [], this.indices = [], this.buffer = _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl), 
                    this.indexBuffer = _pixiGlCore2.default.GLBuffer.createIndexBuffer(gl), this.dirty = !0, 
                    this.nativeLines = !1, this.glPoints = null, this.glIndices = null, this.shader = shader, 
                    this.vao = new _pixiGlCore2.default.VertexArrayObject(gl, attribsState).addIndex(this.indexBuffer).addAttribute(this.buffer, shader.attributes.aVertexPosition, gl.FLOAT, !1, 24, 0).addAttribute(this.buffer, shader.attributes.aColor, gl.FLOAT, !1, 24, 8);
                }
                return WebGLGraphicsData.prototype.reset = function() {
                    this.points.length = 0, this.indices.length = 0;
                }, WebGLGraphicsData.prototype.upload = function() {
                    this.glPoints = new Float32Array(this.points), this.buffer.upload(this.glPoints), 
                    this.glIndices = new Uint16Array(this.indices), this.indexBuffer.upload(this.glIndices), 
                    this.dirty = !1;
                }, WebGLGraphicsData.prototype.destroy = function() {
                    this.color = null, this.points = null, this.indices = null, this.vao.destroy(), 
                    this.buffer.destroy(), this.indexBuffer.destroy(), this.gl = null, this.buffer = null, 
                    this.indexBuffer = null, this.glPoints = null, this.glIndices = null;
                }, WebGLGraphicsData;
            }();
            exports.default = WebGLGraphicsData;
        }, {
            "pixi-gl-core": 15
        } ],
        59: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var PrimitiveShader = function(_Shader) {
                function PrimitiveShader(gl) {
                    return _classCallCheck(this, PrimitiveShader), _possibleConstructorReturn(this, _Shader.call(this, gl, [ "attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}" ].join("\n"), [ "varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}" ].join("\n")));
                }
                return _inherits(PrimitiveShader, _Shader), PrimitiveShader;
            }(function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../../../Shader")).default);
            exports.default = PrimitiveShader;
        }, {
            "../../../Shader": 44
        } ],
        60: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(graphicsData, webGLData, webGLDataNativeLines) {
                var circleData = graphicsData.shape, x = circleData.x, y = circleData.y, width = void 0, height = void 0;
                if (graphicsData.type === _const.SHAPES.CIRC ? (width = circleData.radius, height = circleData.radius) : (width = circleData.width, 
                height = circleData.height), 0 !== width && 0 !== height) {
                    var totalSegs = Math.floor(30 * Math.sqrt(circleData.radius)) || Math.floor(15 * Math.sqrt(circleData.width + circleData.height)), seg = 2 * Math.PI / totalSegs;
                    if (graphicsData.fill) {
                        var color = (0, _utils.hex2rgb)(graphicsData.fillColor), alpha = graphicsData.fillAlpha, r = color[0] * alpha, g = color[1] * alpha, b = color[2] * alpha, verts = webGLData.points, indices = webGLData.indices, vecPos = verts.length / 6;
                        indices.push(vecPos);
                        for (var i = 0; i < totalSegs + 1; i++) verts.push(x, y, r, g, b, alpha), verts.push(x + Math.sin(seg * i) * width, y + Math.cos(seg * i) * height, r, g, b, alpha), 
                        indices.push(vecPos++, vecPos++);
                        indices.push(vecPos - 1);
                    }
                    if (graphicsData.lineWidth) {
                        var tempPoints = graphicsData.points;
                        graphicsData.points = [];
                        for (var _i = 0; _i < totalSegs + 1; _i++) graphicsData.points.push(x + Math.sin(seg * _i) * width, y + Math.cos(seg * _i) * height);
                        (0, _buildLine2.default)(graphicsData, webGLData, webGLDataNativeLines), graphicsData.points = tempPoints;
                    }
                }
            };
            var _buildLine2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./buildLine")), _const = require("../../../const"), _utils = require("../../../utils");
        }, {
            "../../../const": 46,
            "../../../utils": 124,
            "./buildLine": 61
        } ],
        61: [ function(require, module, exports) {
            "use strict";
            function buildLine(graphicsData, webGLData) {
                var points = graphicsData.points;
                if (0 !== points.length) {
                    var firstPoint = new _math.Point(points[0], points[1]), lastPoint = new _math.Point(points[points.length - 2], points[points.length - 1]);
                    if (firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y) {
                        (points = points.slice()).pop(), points.pop();
                        var midPointX = (lastPoint = new _math.Point(points[points.length - 2], points[points.length - 1])).x + .5 * (firstPoint.x - lastPoint.x), midPointY = lastPoint.y + .5 * (firstPoint.y - lastPoint.y);
                        points.unshift(midPointX, midPointY), points.push(midPointX, midPointY);
                    }
                    var verts = webGLData.points, indices = webGLData.indices, length = points.length / 2, indexCount = points.length, indexStart = verts.length / 6, width = graphicsData.lineWidth / 2, color = (0, 
                    _utils.hex2rgb)(graphicsData.lineColor), alpha = graphicsData.lineAlpha, r = color[0] * alpha, g = color[1] * alpha, b = color[2] * alpha, p1x = points[0], p1y = points[1], p2x = points[2], p2y = points[3], p3x = 0, p3y = 0, perpx = -(p1y - p2y), perpy = p1x - p2x, perp2x = 0, perp2y = 0, perp3x = 0, perp3y = 0, dist = Math.sqrt(perpx * perpx + perpy * perpy);
                    perpx /= dist, perpy /= dist, perpx *= width, perpy *= width, verts.push(p1x - perpx, p1y - perpy, r, g, b, alpha), 
                    verts.push(p1x + perpx, p1y + perpy, r, g, b, alpha);
                    for (var i = 1; i < length - 1; ++i) {
                        p1x = points[2 * (i - 1)], p1y = points[2 * (i - 1) + 1], p2x = points[2 * i], p2y = points[2 * i + 1], 
                        p3x = points[2 * (i + 1)], p3y = points[2 * (i + 1) + 1], perpx = -(p1y - p2y), 
                        perpy = p1x - p2x, perpx /= dist = Math.sqrt(perpx * perpx + perpy * perpy), perpy /= dist, 
                        perpx *= width, perpy *= width, perp2x = -(p2y - p3y), perp2y = p2x - p3x, perp2x /= dist = Math.sqrt(perp2x * perp2x + perp2y * perp2y), 
                        perp2y /= dist;
                        var a1 = -perpy + p1y - (-perpy + p2y), b1 = -perpx + p2x - (-perpx + p1x), c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y), a2 = -(perp2y *= width) + p3y - (-perp2y + p2y), b2 = -(perp2x *= width) + p2x - (-perp2x + p3x), c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y), denom = a1 * b2 - a2 * b1;
                        if (Math.abs(denom) < .1) denom += 10.1, verts.push(p2x - perpx, p2y - perpy, r, g, b, alpha), 
                        verts.push(p2x + perpx, p2y + perpy, r, g, b, alpha); else {
                            var px = (b1 * c2 - b2 * c1) / denom, py = (a2 * c1 - a1 * c2) / denom;
                            (px - p2x) * (px - p2x) + (py - p2y) * (py - p2y) > 196 * width * width ? (perp3x = perpx - perp2x, 
                            perp3y = perpy - perp2y, perp3x /= dist = Math.sqrt(perp3x * perp3x + perp3y * perp3y), 
                            perp3y /= dist, perp3x *= width, perp3y *= width, verts.push(p2x - perp3x, p2y - perp3y), 
                            verts.push(r, g, b, alpha), verts.push(p2x + perp3x, p2y + perp3y), verts.push(r, g, b, alpha), 
                            verts.push(p2x - perp3x, p2y - perp3y), verts.push(r, g, b, alpha), indexCount++) : (verts.push(px, py), 
                            verts.push(r, g, b, alpha), verts.push(p2x - (px - p2x), p2y - (py - p2y)), verts.push(r, g, b, alpha));
                        }
                    }
                    p1x = points[2 * (length - 2)], p1y = points[2 * (length - 2) + 1], p2x = points[2 * (length - 1)], 
                    perpx = -(p1y - (p2y = points[2 * (length - 1) + 1])), perpy = p1x - p2x, perpx /= dist = Math.sqrt(perpx * perpx + perpy * perpy), 
                    perpy /= dist, perpx *= width, perpy *= width, verts.push(p2x - perpx, p2y - perpy), 
                    verts.push(r, g, b, alpha), verts.push(p2x + perpx, p2y + perpy), verts.push(r, g, b, alpha), 
                    indices.push(indexStart);
                    for (var _i = 0; _i < indexCount; ++_i) indices.push(indexStart++);
                    indices.push(indexStart - 1);
                }
            }
            function buildNativeLine(graphicsData, webGLData) {
                var i = 0, points = graphicsData.points;
                if (0 !== points.length) {
                    var verts = webGLData.points, length = points.length / 2, color = (0, _utils.hex2rgb)(graphicsData.lineColor), alpha = graphicsData.lineAlpha, r = color[0] * alpha, g = color[1] * alpha, b = color[2] * alpha;
                    for (i = 1; i < length; i++) {
                        var p1x = points[2 * (i - 1)], p1y = points[2 * (i - 1) + 1], p2x = points[2 * i], p2y = points[2 * i + 1];
                        verts.push(p1x, p1y), verts.push(r, g, b, alpha), verts.push(p2x, p2y), verts.push(r, g, b, alpha);
                    }
                }
            }
            exports.__esModule = !0, exports.default = function(graphicsData, webGLData, webGLDataNativeLines) {
                graphicsData.nativeLines ? buildNativeLine(graphicsData, webGLDataNativeLines) : buildLine(graphicsData, webGLData);
            };
            var _math = require("../../../math"), _utils = require("../../../utils");
        }, {
            "../../../math": 70,
            "../../../utils": 124
        } ],
        62: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0, exports.default = function(graphicsData, webGLData, webGLDataNativeLines) {
                graphicsData.points = graphicsData.shape.points.slice();
                var points = graphicsData.points;
                if (graphicsData.fill && points.length >= 6) {
                    for (var holeArray = [], holes = graphicsData.holes, i = 0; i < holes.length; i++) {
                        var hole = holes[i];
                        holeArray.push(points.length / 2), points = points.concat(hole.points);
                    }
                    var verts = webGLData.points, indices = webGLData.indices, length = points.length / 2, color = (0, 
                    _utils.hex2rgb)(graphicsData.fillColor), alpha = graphicsData.fillAlpha, r = color[0] * alpha, g = color[1] * alpha, b = color[2] * alpha, triangles = (0, 
                    _earcut2.default)(points, holeArray, 2);
                    if (!triangles) return;
                    for (var vertPos = verts.length / 6, _i = 0; _i < triangles.length; _i += 3) indices.push(triangles[_i] + vertPos), 
                    indices.push(triangles[_i] + vertPos), indices.push(triangles[_i + 1] + vertPos), 
                    indices.push(triangles[_i + 2] + vertPos), indices.push(triangles[_i + 2] + vertPos);
                    for (var _i2 = 0; _i2 < length; _i2++) verts.push(points[2 * _i2], points[2 * _i2 + 1], r, g, b, alpha);
                }
                graphicsData.lineWidth > 0 && (0, _buildLine2.default)(graphicsData, webGLData, webGLDataNativeLines);
            };
            var _buildLine2 = _interopRequireDefault(require("./buildLine")), _utils = require("../../../utils"), _earcut2 = _interopRequireDefault(require("earcut"));
        }, {
            "../../../utils": 124,
            "./buildLine": 61,
            earcut: 2
        } ],
        63: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(graphicsData, webGLData, webGLDataNativeLines) {
                var rectData = graphicsData.shape, x = rectData.x, y = rectData.y, width = rectData.width, height = rectData.height;
                if (graphicsData.fill) {
                    var color = (0, _utils.hex2rgb)(graphicsData.fillColor), alpha = graphicsData.fillAlpha, r = color[0] * alpha, g = color[1] * alpha, b = color[2] * alpha, verts = webGLData.points, indices = webGLData.indices, vertPos = verts.length / 6;
                    verts.push(x, y), verts.push(r, g, b, alpha), verts.push(x + width, y), verts.push(r, g, b, alpha), 
                    verts.push(x, y + height), verts.push(r, g, b, alpha), verts.push(x + width, y + height), 
                    verts.push(r, g, b, alpha), indices.push(vertPos, vertPos, vertPos + 1, vertPos + 2, vertPos + 3, vertPos + 3);
                }
                if (graphicsData.lineWidth) {
                    var tempPoints = graphicsData.points;
                    graphicsData.points = [ x, y, x + width, y, x + width, y + height, x, y + height, x, y ], 
                    (0, _buildLine2.default)(graphicsData, webGLData, webGLDataNativeLines), graphicsData.points = tempPoints;
                }
            };
            var _buildLine2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./buildLine")), _utils = require("../../../utils");
        }, {
            "../../../utils": 124,
            "./buildLine": 61
        } ],
        64: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function getPt(n1, n2, perc) {
                return n1 + (n2 - n1) * perc;
            }
            function quadraticBezierCurve(fromX, fromY, cpX, cpY, toX, toY) {
                for (var points = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [], xa = 0, ya = 0, xb = 0, yb = 0, x = 0, y = 0, i = 0, j = 0; i <= 20; ++i) xa = getPt(fromX, cpX, j = i / 20), 
                ya = getPt(fromY, cpY, j), xb = getPt(cpX, toX, j), yb = getPt(cpY, toY, j), x = getPt(xa, xb, j), 
                y = getPt(ya, yb, j), points.push(x, y);
                return points;
            }
            exports.__esModule = !0, exports.default = function(graphicsData, webGLData, webGLDataNativeLines) {
                var rrectData = graphicsData.shape, x = rrectData.x, y = rrectData.y, width = rrectData.width, height = rrectData.height, radius = rrectData.radius, recPoints = [];
                if (recPoints.push(x, y + radius), quadraticBezierCurve(x, y + height - radius, x, y + height, x + radius, y + height, recPoints), 
                quadraticBezierCurve(x + width - radius, y + height, x + width, y + height, x + width, y + height - radius, recPoints), 
                quadraticBezierCurve(x + width, y + radius, x + width, y, x + width - radius, y, recPoints), 
                quadraticBezierCurve(x + radius, y, x, y, x, y + radius + 1e-10, recPoints), graphicsData.fill) {
                    for (var color = (0, _utils.hex2rgb)(graphicsData.fillColor), alpha = graphicsData.fillAlpha, r = color[0] * alpha, g = color[1] * alpha, b = color[2] * alpha, verts = webGLData.points, indices = webGLData.indices, vecPos = verts.length / 6, triangles = (0, 
                    _earcut2.default)(recPoints, null, 2), i = 0, j = triangles.length; i < j; i += 3) indices.push(triangles[i] + vecPos), 
                    indices.push(triangles[i] + vecPos), indices.push(triangles[i + 1] + vecPos), indices.push(triangles[i + 2] + vecPos), 
                    indices.push(triangles[i + 2] + vecPos);
                    for (var _i = 0, _j = recPoints.length; _i < _j; _i++) verts.push(recPoints[_i], recPoints[++_i], r, g, b, alpha);
                }
                if (graphicsData.lineWidth) {
                    var tempPoints = graphicsData.points;
                    graphicsData.points = recPoints, (0, _buildLine2.default)(graphicsData, webGLData, webGLDataNativeLines), 
                    graphicsData.points = tempPoints;
                }
            };
            var _earcut2 = _interopRequireDefault(require("earcut")), _buildLine2 = _interopRequireDefault(require("./buildLine")), _utils = require("../../../utils");
        }, {
            "../../../utils": 124,
            "./buildLine": 61,
            earcut: 2
        } ],
        65: [ function(require, module, exports) {
            "use strict";
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0, exports.autoDetectRenderer = exports.Application = exports.Filter = exports.SpriteMaskFilter = exports.Quad = exports.RenderTarget = exports.ObjectRenderer = exports.WebGLManager = exports.Shader = exports.CanvasRenderTarget = exports.TextureUvs = exports.VideoBaseTexture = exports.BaseRenderTexture = exports.RenderTexture = exports.BaseTexture = exports.Texture = exports.Spritesheet = exports.CanvasGraphicsRenderer = exports.GraphicsRenderer = exports.GraphicsData = exports.Graphics = exports.TextMetrics = exports.TextStyle = exports.Text = exports.SpriteRenderer = exports.CanvasTinter = exports.CanvasSpriteRenderer = exports.Sprite = exports.TransformBase = exports.TransformStatic = exports.Transform = exports.Container = exports.DisplayObject = exports.Bounds = exports.glCore = exports.WebGLRenderer = exports.CanvasRenderer = exports.ticker = exports.utils = exports.settings = void 0;
            var _const = require("./const");
            Object.keys(_const).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _const[key];
                    }
                });
            });
            var _math = require("./math");
            Object.keys(_math).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _math[key];
                    }
                });
            });
            var _pixiGlCore = require("pixi-gl-core");
            Object.defineProperty(exports, "glCore", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_pixiGlCore).default;
                }
            });
            var _Bounds = require("./display/Bounds");
            Object.defineProperty(exports, "Bounds", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Bounds).default;
                }
            });
            var _DisplayObject = require("./display/DisplayObject");
            Object.defineProperty(exports, "DisplayObject", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_DisplayObject).default;
                }
            });
            var _Container = require("./display/Container");
            Object.defineProperty(exports, "Container", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Container).default;
                }
            });
            var _Transform = require("./display/Transform");
            Object.defineProperty(exports, "Transform", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Transform).default;
                }
            });
            var _TransformStatic = require("./display/TransformStatic");
            Object.defineProperty(exports, "TransformStatic", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_TransformStatic).default;
                }
            });
            var _TransformBase = require("./display/TransformBase");
            Object.defineProperty(exports, "TransformBase", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_TransformBase).default;
                }
            });
            var _Sprite = require("./sprites/Sprite");
            Object.defineProperty(exports, "Sprite", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Sprite).default;
                }
            });
            var _CanvasSpriteRenderer = require("./sprites/canvas/CanvasSpriteRenderer");
            Object.defineProperty(exports, "CanvasSpriteRenderer", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_CanvasSpriteRenderer).default;
                }
            });
            var _CanvasTinter = require("./sprites/canvas/CanvasTinter");
            Object.defineProperty(exports, "CanvasTinter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_CanvasTinter).default;
                }
            });
            var _SpriteRenderer = require("./sprites/webgl/SpriteRenderer");
            Object.defineProperty(exports, "SpriteRenderer", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_SpriteRenderer).default;
                }
            });
            var _Text = require("./text/Text");
            Object.defineProperty(exports, "Text", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Text).default;
                }
            });
            var _TextStyle = require("./text/TextStyle");
            Object.defineProperty(exports, "TextStyle", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_TextStyle).default;
                }
            });
            var _TextMetrics = require("./text/TextMetrics");
            Object.defineProperty(exports, "TextMetrics", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_TextMetrics).default;
                }
            });
            var _Graphics = require("./graphics/Graphics");
            Object.defineProperty(exports, "Graphics", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Graphics).default;
                }
            });
            var _GraphicsData = require("./graphics/GraphicsData");
            Object.defineProperty(exports, "GraphicsData", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_GraphicsData).default;
                }
            });
            var _GraphicsRenderer = require("./graphics/webgl/GraphicsRenderer");
            Object.defineProperty(exports, "GraphicsRenderer", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_GraphicsRenderer).default;
                }
            });
            var _CanvasGraphicsRenderer = require("./graphics/canvas/CanvasGraphicsRenderer");
            Object.defineProperty(exports, "CanvasGraphicsRenderer", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_CanvasGraphicsRenderer).default;
                }
            });
            var _Spritesheet = require("./textures/Spritesheet");
            Object.defineProperty(exports, "Spritesheet", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Spritesheet).default;
                }
            });
            var _Texture = require("./textures/Texture");
            Object.defineProperty(exports, "Texture", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Texture).default;
                }
            });
            var _BaseTexture = require("./textures/BaseTexture");
            Object.defineProperty(exports, "BaseTexture", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_BaseTexture).default;
                }
            });
            var _RenderTexture = require("./textures/RenderTexture");
            Object.defineProperty(exports, "RenderTexture", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_RenderTexture).default;
                }
            });
            var _BaseRenderTexture = require("./textures/BaseRenderTexture");
            Object.defineProperty(exports, "BaseRenderTexture", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_BaseRenderTexture).default;
                }
            });
            var _VideoBaseTexture = require("./textures/VideoBaseTexture");
            Object.defineProperty(exports, "VideoBaseTexture", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_VideoBaseTexture).default;
                }
            });
            var _TextureUvs = require("./textures/TextureUvs");
            Object.defineProperty(exports, "TextureUvs", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_TextureUvs).default;
                }
            });
            var _CanvasRenderTarget = require("./renderers/canvas/utils/CanvasRenderTarget");
            Object.defineProperty(exports, "CanvasRenderTarget", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_CanvasRenderTarget).default;
                }
            });
            var _Shader = require("./Shader");
            Object.defineProperty(exports, "Shader", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Shader).default;
                }
            });
            var _WebGLManager = require("./renderers/webgl/managers/WebGLManager");
            Object.defineProperty(exports, "WebGLManager", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_WebGLManager).default;
                }
            });
            var _ObjectRenderer = require("./renderers/webgl/utils/ObjectRenderer");
            Object.defineProperty(exports, "ObjectRenderer", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_ObjectRenderer).default;
                }
            });
            var _RenderTarget = require("./renderers/webgl/utils/RenderTarget");
            Object.defineProperty(exports, "RenderTarget", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_RenderTarget).default;
                }
            });
            var _Quad = require("./renderers/webgl/utils/Quad");
            Object.defineProperty(exports, "Quad", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Quad).default;
                }
            });
            var _SpriteMaskFilter = require("./renderers/webgl/filters/spriteMask/SpriteMaskFilter");
            Object.defineProperty(exports, "SpriteMaskFilter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_SpriteMaskFilter).default;
                }
            });
            var _Filter = require("./renderers/webgl/filters/Filter");
            Object.defineProperty(exports, "Filter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Filter).default;
                }
            });
            var _Application = require("./Application");
            Object.defineProperty(exports, "Application", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Application).default;
                }
            });
            var _autoDetectRenderer = require("./autoDetectRenderer");
            Object.defineProperty(exports, "autoDetectRenderer", {
                enumerable: !0,
                get: function() {
                    return _autoDetectRenderer.autoDetectRenderer;
                }
            });
            var utils = _interopRequireWildcard(require("./utils")), ticker = _interopRequireWildcard(require("./ticker")), _settings2 = _interopRequireDefault(require("./settings")), _CanvasRenderer2 = _interopRequireDefault(require("./renderers/canvas/CanvasRenderer")), _WebGLRenderer2 = _interopRequireDefault(require("./renderers/webgl/WebGLRenderer"));
            exports.settings = _settings2.default, exports.utils = utils, exports.ticker = ticker, 
            exports.CanvasRenderer = _CanvasRenderer2.default, exports.WebGLRenderer = _WebGLRenderer2.default;
        }, {
            "./Application": 43,
            "./Shader": 44,
            "./autoDetectRenderer": 45,
            "./const": 46,
            "./display/Bounds": 47,
            "./display/Container": 48,
            "./display/DisplayObject": 49,
            "./display/Transform": 50,
            "./display/TransformBase": 51,
            "./display/TransformStatic": 52,
            "./graphics/Graphics": 53,
            "./graphics/GraphicsData": 54,
            "./graphics/canvas/CanvasGraphicsRenderer": 55,
            "./graphics/webgl/GraphicsRenderer": 57,
            "./math": 70,
            "./renderers/canvas/CanvasRenderer": 77,
            "./renderers/canvas/utils/CanvasRenderTarget": 79,
            "./renderers/webgl/WebGLRenderer": 84,
            "./renderers/webgl/filters/Filter": 86,
            "./renderers/webgl/filters/spriteMask/SpriteMaskFilter": 89,
            "./renderers/webgl/managers/WebGLManager": 93,
            "./renderers/webgl/utils/ObjectRenderer": 94,
            "./renderers/webgl/utils/Quad": 95,
            "./renderers/webgl/utils/RenderTarget": 96,
            "./settings": 101,
            "./sprites/Sprite": 102,
            "./sprites/canvas/CanvasSpriteRenderer": 103,
            "./sprites/canvas/CanvasTinter": 104,
            "./sprites/webgl/SpriteRenderer": 106,
            "./text/Text": 108,
            "./text/TextMetrics": 109,
            "./text/TextStyle": 110,
            "./textures/BaseRenderTexture": 111,
            "./textures/BaseTexture": 112,
            "./textures/RenderTexture": 113,
            "./textures/Spritesheet": 114,
            "./textures/Texture": 115,
            "./textures/TextureUvs": 116,
            "./textures/VideoBaseTexture": 117,
            "./ticker": 120,
            "./utils": 124,
            "pixi-gl-core": 15
        } ],
        66: [ function(require, module, exports) {
            "use strict";
            function signum(x) {
                return x < 0 ? -1 : x > 0 ? 1 : 0;
            }
            exports.__esModule = !0;
            var _Matrix2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./Matrix")), ux = [ 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1 ], uy = [ 0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1 ], vx = [ 0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1 ], vy = [ 1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1 ], tempMatrices = [], mul = [];
            !function() {
                for (var i = 0; i < 16; i++) {
                    var row = [];
                    mul.push(row);
                    for (var j = 0; j < 16; j++) for (var _ux = signum(ux[i] * ux[j] + vx[i] * uy[j]), _uy = signum(uy[i] * ux[j] + vy[i] * uy[j]), _vx = signum(ux[i] * vx[j] + vx[i] * vy[j]), _vy = signum(uy[i] * vx[j] + vy[i] * vy[j]), k = 0; k < 16; k++) if (ux[k] === _ux && uy[k] === _uy && vx[k] === _vx && vy[k] === _vy) {
                        row.push(k);
                        break;
                    }
                }
                for (var _i = 0; _i < 16; _i++) {
                    var mat = new _Matrix2.default();
                    mat.set(ux[_i], uy[_i], vx[_i], vy[_i], 0, 0), tempMatrices.push(mat);
                }
            }();
            var GroupD8 = {
                E: 0,
                SE: 1,
                S: 2,
                SW: 3,
                W: 4,
                NW: 5,
                N: 6,
                NE: 7,
                MIRROR_VERTICAL: 8,
                MIRROR_HORIZONTAL: 12,
                uX: function(ind) {
                    return ux[ind];
                },
                uY: function(ind) {
                    return uy[ind];
                },
                vX: function(ind) {
                    return vx[ind];
                },
                vY: function(ind) {
                    return vy[ind];
                },
                inv: function(rotation) {
                    return 8 & rotation ? 15 & rotation : 7 & -rotation;
                },
                add: function(rotationSecond, rotationFirst) {
                    return mul[rotationSecond][rotationFirst];
                },
                sub: function(rotationSecond, rotationFirst) {
                    return mul[rotationSecond][GroupD8.inv(rotationFirst)];
                },
                rotate180: function(rotation) {
                    return 4 ^ rotation;
                },
                isSwapWidthHeight: function(rotation) {
                    return 2 == (3 & rotation);
                },
                byDirection: function(dx, dy) {
                    return 2 * Math.abs(dx) <= Math.abs(dy) ? dy >= 0 ? GroupD8.S : GroupD8.N : 2 * Math.abs(dy) <= Math.abs(dx) ? dx > 0 ? GroupD8.E : GroupD8.W : dy > 0 ? dx > 0 ? GroupD8.SE : GroupD8.SW : dx > 0 ? GroupD8.NE : GroupD8.NW;
                },
                matrixAppendRotationInv: function(matrix, rotation) {
                    var tx = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, ty = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, mat = tempMatrices[GroupD8.inv(rotation)];
                    mat.tx = tx, mat.ty = ty, matrix.append(mat);
                }
            };
            exports.default = GroupD8;
        }, {
            "./Matrix": 67
        } ],
        67: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _Point2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./Point")), Matrix = function() {
                function Matrix() {
                    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, tx = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0, ty = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
                    _classCallCheck(this, Matrix), this.a = a, this.b = b, this.c = c, this.d = d, this.tx = tx, 
                    this.ty = ty, this.array = null;
                }
                return Matrix.prototype.fromArray = function(array) {
                    this.a = array[0], this.b = array[1], this.c = array[3], this.d = array[4], this.tx = array[2], 
                    this.ty = array[5];
                }, Matrix.prototype.set = function(a, b, c, d, tx, ty) {
                    return this.a = a, this.b = b, this.c = c, this.d = d, this.tx = tx, this.ty = ty, 
                    this;
                }, Matrix.prototype.toArray = function(transpose, out) {
                    this.array || (this.array = new Float32Array(9));
                    var array = out || this.array;
                    return transpose ? (array[0] = this.a, array[1] = this.b, array[2] = 0, array[3] = this.c, 
                    array[4] = this.d, array[5] = 0, array[6] = this.tx, array[7] = this.ty, array[8] = 1) : (array[0] = this.a, 
                    array[1] = this.c, array[2] = this.tx, array[3] = this.b, array[4] = this.d, array[5] = this.ty, 
                    array[6] = 0, array[7] = 0, array[8] = 1), array;
                }, Matrix.prototype.apply = function(pos, newPos) {
                    newPos = newPos || new _Point2.default();
                    var x = pos.x, y = pos.y;
                    return newPos.x = this.a * x + this.c * y + this.tx, newPos.y = this.b * x + this.d * y + this.ty, 
                    newPos;
                }, Matrix.prototype.applyInverse = function(pos, newPos) {
                    newPos = newPos || new _Point2.default();
                    var id = 1 / (this.a * this.d + this.c * -this.b), x = pos.x, y = pos.y;
                    return newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id, 
                    newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id, 
                    newPos;
                }, Matrix.prototype.translate = function(x, y) {
                    return this.tx += x, this.ty += y, this;
                }, Matrix.prototype.scale = function(x, y) {
                    return this.a *= x, this.d *= y, this.c *= x, this.b *= y, this.tx *= x, this.ty *= y, 
                    this;
                }, Matrix.prototype.rotate = function(angle) {
                    var cos = Math.cos(angle), sin = Math.sin(angle), a1 = this.a, c1 = this.c, tx1 = this.tx;
                    return this.a = a1 * cos - this.b * sin, this.b = a1 * sin + this.b * cos, this.c = c1 * cos - this.d * sin, 
                    this.d = c1 * sin + this.d * cos, this.tx = tx1 * cos - this.ty * sin, this.ty = tx1 * sin + this.ty * cos, 
                    this;
                }, Matrix.prototype.append = function(matrix) {
                    var a1 = this.a, b1 = this.b, c1 = this.c, d1 = this.d;
                    return this.a = matrix.a * a1 + matrix.b * c1, this.b = matrix.a * b1 + matrix.b * d1, 
                    this.c = matrix.c * a1 + matrix.d * c1, this.d = matrix.c * b1 + matrix.d * d1, 
                    this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx, this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty, 
                    this;
                }, Matrix.prototype.setTransform = function(x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) {
                    var sr = Math.sin(rotation), cr = Math.cos(rotation), cy = Math.cos(skewY), sy = Math.sin(skewY), nsx = -Math.sin(skewX), cx = Math.cos(skewX), a = cr * scaleX, b = sr * scaleX, c = -sr * scaleY, d = cr * scaleY;
                    return this.a = cy * a + sy * c, this.b = cy * b + sy * d, this.c = nsx * a + cx * c, 
                    this.d = nsx * b + cx * d, this.tx = x + (pivotX * a + pivotY * c), this.ty = y + (pivotX * b + pivotY * d), 
                    this;
                }, Matrix.prototype.prepend = function(matrix) {
                    var tx1 = this.tx;
                    if (1 !== matrix.a || 0 !== matrix.b || 0 !== matrix.c || 1 !== matrix.d) {
                        var a1 = this.a, c1 = this.c;
                        this.a = a1 * matrix.a + this.b * matrix.c, this.b = a1 * matrix.b + this.b * matrix.d, 
                        this.c = c1 * matrix.a + this.d * matrix.c, this.d = c1 * matrix.b + this.d * matrix.d;
                    }
                    return this.tx = tx1 * matrix.a + this.ty * matrix.c + matrix.tx, this.ty = tx1 * matrix.b + this.ty * matrix.d + matrix.ty, 
                    this;
                }, Matrix.prototype.decompose = function(transform) {
                    var a = this.a, b = this.b, c = this.c, d = this.d, skewX = -Math.atan2(-c, d), skewY = Math.atan2(b, a);
                    return Math.abs(skewX + skewY) < 1e-5 ? (transform.rotation = skewY, a < 0 && d >= 0 && (transform.rotation += transform.rotation <= 0 ? Math.PI : -Math.PI), 
                    transform.skew.x = transform.skew.y = 0) : (transform.skew.x = skewX, transform.skew.y = skewY), 
                    transform.scale.x = Math.sqrt(a * a + b * b), transform.scale.y = Math.sqrt(c * c + d * d), 
                    transform.position.x = this.tx, transform.position.y = this.ty, transform;
                }, Matrix.prototype.invert = function() {
                    var a1 = this.a, b1 = this.b, c1 = this.c, d1 = this.d, tx1 = this.tx, n = a1 * d1 - b1 * c1;
                    return this.a = d1 / n, this.b = -b1 / n, this.c = -c1 / n, this.d = a1 / n, this.tx = (c1 * this.ty - d1 * tx1) / n, 
                    this.ty = -(a1 * this.ty - b1 * tx1) / n, this;
                }, Matrix.prototype.identity = function() {
                    return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, 
                    this;
                }, Matrix.prototype.clone = function() {
                    var matrix = new Matrix();
                    return matrix.a = this.a, matrix.b = this.b, matrix.c = this.c, matrix.d = this.d, 
                    matrix.tx = this.tx, matrix.ty = this.ty, matrix;
                }, Matrix.prototype.copy = function(matrix) {
                    return matrix.a = this.a, matrix.b = this.b, matrix.c = this.c, matrix.d = this.d, 
                    matrix.tx = this.tx, matrix.ty = this.ty, matrix;
                }, _createClass(Matrix, null, [ {
                    key: "IDENTITY",
                    get: function() {
                        return new Matrix();
                    }
                }, {
                    key: "TEMP_MATRIX",
                    get: function() {
                        return new Matrix();
                    }
                } ]), Matrix;
            }();
            exports.default = Matrix;
        }, {
            "./Point": 69
        } ],
        68: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), ObservablePoint = function() {
                function ObservablePoint(cb, scope) {
                    var x = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, y = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    _classCallCheck(this, ObservablePoint), this._x = x, this._y = y, this.cb = cb, 
                    this.scope = scope;
                }
                return ObservablePoint.prototype.set = function(x, y) {
                    var _x = x || 0, _y = y || (0 !== y ? _x : 0);
                    this._x === _x && this._y === _y || (this._x = _x, this._y = _y, this.cb.call(this.scope));
                }, ObservablePoint.prototype.copy = function(point) {
                    this._x === point.x && this._y === point.y || (this._x = point.x, this._y = point.y, 
                    this.cb.call(this.scope));
                }, _createClass(ObservablePoint, [ {
                    key: "x",
                    get: function() {
                        return this._x;
                    },
                    set: function(value) {
                        this._x !== value && (this._x = value, this.cb.call(this.scope));
                    }
                }, {
                    key: "y",
                    get: function() {
                        return this._y;
                    },
                    set: function(value) {
                        this._y !== value && (this._y = value, this.cb.call(this.scope));
                    }
                } ]), ObservablePoint;
            }();
            exports.default = ObservablePoint;
        }, {} ],
        69: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var Point = function() {
                function Point() {
                    var x = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    _classCallCheck(this, Point), this.x = x, this.y = y;
                }
                return Point.prototype.clone = function() {
                    return new Point(this.x, this.y);
                }, Point.prototype.copy = function(p) {
                    this.set(p.x, p.y);
                }, Point.prototype.equals = function(p) {
                    return p.x === this.x && p.y === this.y;
                }, Point.prototype.set = function(x, y) {
                    this.x = x || 0, this.y = y || (0 !== y ? this.x : 0);
                }, Point;
            }();
            exports.default = Point;
        }, {} ],
        70: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0;
            var _Point = require("./Point");
            Object.defineProperty(exports, "Point", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Point).default;
                }
            });
            var _ObservablePoint = require("./ObservablePoint");
            Object.defineProperty(exports, "ObservablePoint", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_ObservablePoint).default;
                }
            });
            var _Matrix = require("./Matrix");
            Object.defineProperty(exports, "Matrix", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Matrix).default;
                }
            });
            var _GroupD = require("./GroupD8");
            Object.defineProperty(exports, "GroupD8", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_GroupD).default;
                }
            });
            var _Circle = require("./shapes/Circle");
            Object.defineProperty(exports, "Circle", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Circle).default;
                }
            });
            var _Ellipse = require("./shapes/Ellipse");
            Object.defineProperty(exports, "Ellipse", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Ellipse).default;
                }
            });
            var _Polygon = require("./shapes/Polygon");
            Object.defineProperty(exports, "Polygon", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Polygon).default;
                }
            });
            var _Rectangle = require("./shapes/Rectangle");
            Object.defineProperty(exports, "Rectangle", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Rectangle).default;
                }
            });
            var _RoundedRectangle = require("./shapes/RoundedRectangle");
            Object.defineProperty(exports, "RoundedRectangle", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_RoundedRectangle).default;
                }
            });
        }, {
            "./GroupD8": 66,
            "./Matrix": 67,
            "./ObservablePoint": 68,
            "./Point": 69,
            "./shapes/Circle": 71,
            "./shapes/Ellipse": 72,
            "./shapes/Polygon": 73,
            "./shapes/Rectangle": 74,
            "./shapes/RoundedRectangle": 75
        } ],
        71: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _Rectangle2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./Rectangle")), _const = require("../../const"), Circle = function() {
                function Circle() {
                    var x = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, radius = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                    _classCallCheck(this, Circle), this.x = x, this.y = y, this.radius = radius, this.type = _const.SHAPES.CIRC;
                }
                return Circle.prototype.clone = function() {
                    return new Circle(this.x, this.y, this.radius);
                }, Circle.prototype.contains = function(x, y) {
                    if (this.radius <= 0) return !1;
                    var r2 = this.radius * this.radius, dx = this.x - x, dy = this.y - y;
                    return dx *= dx, dy *= dy, dx + dy <= r2;
                }, Circle.prototype.getBounds = function() {
                    return new _Rectangle2.default(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
                }, Circle;
            }();
            exports.default = Circle;
        }, {
            "../../const": 46,
            "./Rectangle": 74
        } ],
        72: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _Rectangle2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./Rectangle")), _const = require("../../const"), Ellipse = function() {
                function Ellipse() {
                    var x = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, width = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, height = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    _classCallCheck(this, Ellipse), this.x = x, this.y = y, this.width = width, this.height = height, 
                    this.type = _const.SHAPES.ELIP;
                }
                return Ellipse.prototype.clone = function() {
                    return new Ellipse(this.x, this.y, this.width, this.height);
                }, Ellipse.prototype.contains = function(x, y) {
                    if (this.width <= 0 || this.height <= 0) return !1;
                    var normx = (x - this.x) / this.width, normy = (y - this.y) / this.height;
                    return normx *= normx, normy *= normy, normx + normy <= 1;
                }, Ellipse.prototype.getBounds = function() {
                    return new _Rectangle2.default(this.x - this.width, this.y - this.height, this.width, this.height);
                }, Ellipse;
            }();
            exports.default = Ellipse;
        }, {
            "../../const": 46,
            "./Rectangle": 74
        } ],
        73: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _Point2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../Point")), _const = require("../../const"), Polygon = function() {
                function Polygon() {
                    for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) points[_key] = arguments[_key];
                    if (_classCallCheck(this, Polygon), Array.isArray(points[0]) && (points = points[0]), 
                    points[0] instanceof _Point2.default) {
                        for (var p = [], i = 0, il = points.length; i < il; i++) p.push(points[i].x, points[i].y);
                        points = p;
                    }
                    this.closed = !0, this.points = points, this.type = _const.SHAPES.POLY;
                }
                return Polygon.prototype.clone = function() {
                    return new Polygon(this.points.slice());
                }, Polygon.prototype.close = function() {
                    var points = this.points;
                    points[0] === points[points.length - 2] && points[1] === points[points.length - 1] || points.push(points[0], points[1]);
                }, Polygon.prototype.contains = function(x, y) {
                    for (var inside = !1, length = this.points.length / 2, i = 0, j = length - 1; i < length; j = i++) {
                        var xi = this.points[2 * i], yi = this.points[2 * i + 1], xj = this.points[2 * j], yj = this.points[2 * j + 1];
                        yi > y != yj > y && x < (y - yi) / (yj - yi) * (xj - xi) + xi && (inside = !inside);
                    }
                    return inside;
                }, Polygon;
            }();
            exports.default = Polygon;
        }, {
            "../../const": 46,
            "../Point": 69
        } ],
        74: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _const = require("../../const"), Rectangle = function() {
                function Rectangle() {
                    var x = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, width = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, height = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    _classCallCheck(this, Rectangle), this.x = Number(x), this.y = Number(y), this.width = Number(width), 
                    this.height = Number(height), this.type = _const.SHAPES.RECT;
                }
                return Rectangle.prototype.clone = function() {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                }, Rectangle.prototype.copy = function(rectangle) {
                    return this.x = rectangle.x, this.y = rectangle.y, this.width = rectangle.width, 
                    this.height = rectangle.height, this;
                }, Rectangle.prototype.contains = function(x, y) {
                    return !(this.width <= 0 || this.height <= 0) && (x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height);
                }, Rectangle.prototype.pad = function(paddingX, paddingY) {
                    paddingX = paddingX || 0, paddingY = paddingY || (0 !== paddingY ? paddingX : 0), 
                    this.x -= paddingX, this.y -= paddingY, this.width += 2 * paddingX, this.height += 2 * paddingY;
                }, Rectangle.prototype.fit = function(rectangle) {
                    this.x < rectangle.x && (this.width += this.x, this.width < 0 && (this.width = 0), 
                    this.x = rectangle.x), this.y < rectangle.y && (this.height += this.y, this.height < 0 && (this.height = 0), 
                    this.y = rectangle.y), this.x + this.width > rectangle.x + rectangle.width && (this.width = rectangle.width - this.x, 
                    this.width < 0 && (this.width = 0)), this.y + this.height > rectangle.y + rectangle.height && (this.height = rectangle.height - this.y, 
                    this.height < 0 && (this.height = 0));
                }, Rectangle.prototype.enlarge = function(rectangle) {
                    var x1 = Math.min(this.x, rectangle.x), x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width), y1 = Math.min(this.y, rectangle.y), y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);
                    this.x = x1, this.width = x2 - x1, this.y = y1, this.height = y2 - y1;
                }, _createClass(Rectangle, [ {
                    key: "left",
                    get: function() {
                        return this.x;
                    }
                }, {
                    key: "right",
                    get: function() {
                        return this.x + this.width;
                    }
                }, {
                    key: "top",
                    get: function() {
                        return this.y;
                    }
                }, {
                    key: "bottom",
                    get: function() {
                        return this.y + this.height;
                    }
                } ], [ {
                    key: "EMPTY",
                    get: function() {
                        return new Rectangle(0, 0, 0, 0);
                    }
                } ]), Rectangle;
            }();
            exports.default = Rectangle;
        }, {
            "../../const": 46
        } ],
        75: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _const = require("../../const"), RoundedRectangle = function() {
                function RoundedRectangle() {
                    var x = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, width = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, height = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, radius = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 20;
                    _classCallCheck(this, RoundedRectangle), this.x = x, this.y = y, this.width = width, 
                    this.height = height, this.radius = radius, this.type = _const.SHAPES.RREC;
                }
                return RoundedRectangle.prototype.clone = function() {
                    return new RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
                }, RoundedRectangle.prototype.contains = function(x, y) {
                    if (this.width <= 0 || this.height <= 0) return !1;
                    if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
                        if (y >= this.y + this.radius && y <= this.y + this.height - this.radius || x >= this.x + this.radius && x <= this.x + this.width - this.radius) return !0;
                        var dx = x - (this.x + this.radius), dy = y - (this.y + this.radius), radius2 = this.radius * this.radius;
                        if (dx * dx + dy * dy <= radius2) return !0;
                        if ((dx = x - (this.x + this.width - this.radius)) * dx + dy * dy <= radius2) return !0;
                        if (dy = y - (this.y + this.height - this.radius), dx * dx + dy * dy <= radius2) return !0;
                        if ((dx = x - (this.x + this.radius)) * dx + dy * dy <= radius2) return !0;
                    }
                    return !1;
                }, RoundedRectangle;
            }();
            exports.default = RoundedRectangle;
        }, {
            "../../const": 46
        } ],
        76: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _utils = require("../utils"), _math = require("../math"), _const = require("../const"), _settings2 = _interopRequireDefault(require("../settings")), _Container2 = _interopRequireDefault(require("../display/Container")), _RenderTexture2 = _interopRequireDefault(require("../textures/RenderTexture")), _eventemitter2 = _interopRequireDefault(require("eventemitter3")), tempMatrix = new _math.Matrix(), SystemRenderer = function(_EventEmitter) {
                function SystemRenderer(system, options, arg2, arg3) {
                    _classCallCheck(this, SystemRenderer);
                    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
                    return (0, _utils.sayHello)(system), "number" == typeof options && (options = Object.assign({
                        width: options,
                        height: arg2 || _settings2.default.RENDER_OPTIONS.height
                    }, arg3)), options = Object.assign({}, _settings2.default.RENDER_OPTIONS, options), 
                    _this.options = options, _this.type = _const.RENDERER_TYPE.UNKNOWN, _this.screen = new _math.Rectangle(0, 0, options.width, options.height), 
                    _this.view = options.view || document.createElement("canvas"), _this.resolution = options.resolution || _settings2.default.RESOLUTION, 
                    _this.transparent = options.transparent, _this.autoResize = options.autoResize || !1, 
                    _this.blendModes = null, _this.preserveDrawingBuffer = options.preserveDrawingBuffer, 
                    _this.clearBeforeRender = options.clearBeforeRender, _this.roundPixels = options.roundPixels, 
                    _this._backgroundColor = 0, _this._backgroundColorRgba = [ 0, 0, 0, 0 ], _this._backgroundColorString = "#000000", 
                    _this.backgroundColor = options.backgroundColor || _this._backgroundColor, _this._tempDisplayObjectParent = new _Container2.default(), 
                    _this._lastObjectRendered = _this._tempDisplayObjectParent, _this;
                }
                return _inherits(SystemRenderer, _EventEmitter), SystemRenderer.prototype.resize = function(screenWidth, screenHeight) {
                    this.screen.width = screenWidth, this.screen.height = screenHeight, this.view.width = screenWidth * this.resolution, 
                    this.view.height = screenHeight * this.resolution, this.autoResize && (this.view.style.width = screenWidth + "px", 
                    this.view.style.height = screenHeight + "px");
                }, SystemRenderer.prototype.generateTexture = function(displayObject, scaleMode, resolution) {
                    var bounds = displayObject.getLocalBounds(), renderTexture = _RenderTexture2.default.create(0 | bounds.width, 0 | bounds.height, scaleMode, resolution);
                    return tempMatrix.tx = -bounds.x, tempMatrix.ty = -bounds.y, this.render(displayObject, renderTexture, !1, tempMatrix, !0), 
                    renderTexture;
                }, SystemRenderer.prototype.destroy = function(removeView) {
                    removeView && this.view.parentNode && this.view.parentNode.removeChild(this.view), 
                    this.type = _const.RENDERER_TYPE.UNKNOWN, this.view = null, this.screen = null, 
                    this.resolution = 0, this.transparent = !1, this.autoResize = !1, this.blendModes = null, 
                    this.options = null, this.preserveDrawingBuffer = !1, this.clearBeforeRender = !1, 
                    this.roundPixels = !1, this._backgroundColor = 0, this._backgroundColorRgba = null, 
                    this._backgroundColorString = null, this._tempDisplayObjectParent = null, this._lastObjectRendered = null;
                }, _createClass(SystemRenderer, [ {
                    key: "width",
                    get: function() {
                        return this.view.width;
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this.view.height;
                    }
                }, {
                    key: "backgroundColor",
                    get: function() {
                        return this._backgroundColor;
                    },
                    set: function(value) {
                        this._backgroundColor = value, this._backgroundColorString = (0, _utils.hex2string)(value), 
                        (0, _utils.hex2rgb)(value, this._backgroundColorRgba);
                    }
                } ]), SystemRenderer;
            }(_eventemitter2.default);
            exports.default = SystemRenderer;
        }, {
            "../const": 46,
            "../display/Container": 48,
            "../math": 70,
            "../settings": 101,
            "../textures/RenderTexture": 113,
            "../utils": 124,
            eventemitter3: 3
        } ],
        77: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _SystemRenderer3 = _interopRequireDefault(require("../SystemRenderer")), _CanvasMaskManager2 = _interopRequireDefault(require("./utils/CanvasMaskManager")), _CanvasRenderTarget2 = _interopRequireDefault(require("./utils/CanvasRenderTarget")), _mapCanvasBlendModesToPixi2 = _interopRequireDefault(require("./utils/mapCanvasBlendModesToPixi")), _utils = require("../../utils"), _const = require("../../const"), _settings2 = _interopRequireDefault(require("../../settings")), CanvasRenderer = function(_SystemRenderer) {
                function CanvasRenderer(options, arg2, arg3) {
                    _classCallCheck(this, CanvasRenderer);
                    var _this = _possibleConstructorReturn(this, _SystemRenderer.call(this, "Canvas", options, arg2, arg3));
                    return _this.type = _const.RENDERER_TYPE.CANVAS, _this.rootContext = _this.view.getContext("2d", {
                        alpha: _this.transparent
                    }), _this.context = _this.rootContext, _this.refresh = !0, _this.maskManager = new _CanvasMaskManager2.default(_this), 
                    _this.smoothProperty = "imageSmoothingEnabled", _this.rootContext.imageSmoothingEnabled || (_this.rootContext.webkitImageSmoothingEnabled ? _this.smoothProperty = "webkitImageSmoothingEnabled" : _this.rootContext.mozImageSmoothingEnabled ? _this.smoothProperty = "mozImageSmoothingEnabled" : _this.rootContext.oImageSmoothingEnabled ? _this.smoothProperty = "oImageSmoothingEnabled" : _this.rootContext.msImageSmoothingEnabled && (_this.smoothProperty = "msImageSmoothingEnabled")), 
                    _this.initPlugins(), _this.blendModes = (0, _mapCanvasBlendModesToPixi2.default)(), 
                    _this._activeBlendMode = null, _this.renderingToScreen = !1, _this.resize(_this.options.width, _this.options.height), 
                    _this;
                }
                return _inherits(CanvasRenderer, _SystemRenderer), CanvasRenderer.prototype.render = function(displayObject, renderTexture, clear, transform, skipUpdateTransform) {
                    if (this.view) {
                        this.renderingToScreen = !renderTexture, this.emit("prerender");
                        var rootResolution = this.resolution;
                        renderTexture ? ((renderTexture = renderTexture.baseTexture || renderTexture)._canvasRenderTarget || (renderTexture._canvasRenderTarget = new _CanvasRenderTarget2.default(renderTexture.width, renderTexture.height, renderTexture.resolution), 
                        renderTexture.source = renderTexture._canvasRenderTarget.canvas, renderTexture.valid = !0), 
                        this.context = renderTexture._canvasRenderTarget.context, this.resolution = renderTexture._canvasRenderTarget.resolution) : this.context = this.rootContext;
                        var context = this.context;
                        if (renderTexture || (this._lastObjectRendered = displayObject), !skipUpdateTransform) {
                            var cacheParent = displayObject.parent, tempWt = this._tempDisplayObjectParent.transform.worldTransform;
                            transform ? (transform.copy(tempWt), this._tempDisplayObjectParent.transform._worldID = -1) : tempWt.identity(), 
                            displayObject.parent = this._tempDisplayObjectParent, displayObject.updateTransform(), 
                            displayObject.parent = cacheParent;
                        }
                        context.setTransform(1, 0, 0, 1, 0, 0), context.globalAlpha = 1, context.globalCompositeOperation = this.blendModes[_const.BLEND_MODES.NORMAL], 
                        navigator.isCocoonJS && this.view.screencanvas && (context.fillStyle = "black", 
                        context.clear()), (void 0 !== clear ? clear : this.clearBeforeRender) && this.renderingToScreen && (this.transparent ? context.clearRect(0, 0, this.width, this.height) : (context.fillStyle = this._backgroundColorString, 
                        context.fillRect(0, 0, this.width, this.height)));
                        var tempContext = this.context;
                        this.context = context, displayObject.renderCanvas(this), this.context = tempContext, 
                        this.resolution = rootResolution, this.emit("postrender");
                    }
                }, CanvasRenderer.prototype.clear = function(clearColor) {
                    var context = this.context;
                    clearColor = clearColor || this._backgroundColorString, !this.transparent && clearColor ? (context.fillStyle = clearColor, 
                    context.fillRect(0, 0, this.width, this.height)) : context.clearRect(0, 0, this.width, this.height);
                }, CanvasRenderer.prototype.setBlendMode = function(blendMode) {
                    this._activeBlendMode !== blendMode && (this._activeBlendMode = blendMode, this.context.globalCompositeOperation = this.blendModes[blendMode]);
                }, CanvasRenderer.prototype.destroy = function(removeView) {
                    this.destroyPlugins(), _SystemRenderer.prototype.destroy.call(this, removeView), 
                    this.context = null, this.refresh = !0, this.maskManager.destroy(), this.maskManager = null, 
                    this.smoothProperty = null;
                }, CanvasRenderer.prototype.resize = function(screenWidth, screenHeight) {
                    _SystemRenderer.prototype.resize.call(this, screenWidth, screenHeight), this.smoothProperty && (this.rootContext[this.smoothProperty] = _settings2.default.SCALE_MODE === _const.SCALE_MODES.LINEAR);
                }, CanvasRenderer;
            }(_SystemRenderer3.default);
            exports.default = CanvasRenderer, _utils.pluginTarget.mixin(CanvasRenderer);
        }, {
            "../../const": 46,
            "../../settings": 101,
            "../../utils": 124,
            "../SystemRenderer": 76,
            "./utils/CanvasMaskManager": 78,
            "./utils/CanvasRenderTarget": 79,
            "./utils/mapCanvasBlendModesToPixi": 81
        } ],
        78: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _const = require("../../../const"), CanvasMaskManager = function() {
                function CanvasMaskManager(renderer) {
                    _classCallCheck(this, CanvasMaskManager), this.renderer = renderer;
                }
                return CanvasMaskManager.prototype.pushMask = function(maskData) {
                    var renderer = this.renderer;
                    renderer.context.save();
                    var cacheAlpha = maskData.alpha, transform = maskData.transform.worldTransform, resolution = renderer.resolution;
                    renderer.context.setTransform(transform.a * resolution, transform.b * resolution, transform.c * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution), 
                    maskData._texture || (this.renderGraphicsShape(maskData), renderer.context.clip()), 
                    maskData.worldAlpha = cacheAlpha;
                }, CanvasMaskManager.prototype.renderGraphicsShape = function(graphics) {
                    var context = this.renderer.context, len = graphics.graphicsData.length;
                    if (0 !== len) {
                        context.beginPath();
                        for (var i = 0; i < len; i++) {
                            var data = graphics.graphicsData[i], shape = data.shape;
                            if (data.type === _const.SHAPES.POLY) {
                                var points = shape.points;
                                context.moveTo(points[0], points[1]);
                                for (var j = 1; j < points.length / 2; j++) context.lineTo(points[2 * j], points[2 * j + 1]);
                                points[0] === points[points.length - 2] && points[1] === points[points.length - 1] && context.closePath();
                            } else if (data.type === _const.SHAPES.RECT) context.rect(shape.x, shape.y, shape.width, shape.height), 
                            context.closePath(); else if (data.type === _const.SHAPES.CIRC) context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI), 
                            context.closePath(); else if (data.type === _const.SHAPES.ELIP) {
                                var w = 2 * shape.width, h = 2 * shape.height, x = shape.x - w / 2, y = shape.y - h / 2, ox = w / 2 * .5522848, oy = h / 2 * .5522848, xe = x + w, ye = y + h, xm = x + w / 2, ym = y + h / 2;
                                context.moveTo(x, ym), context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y), context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym), 
                                context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye), context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym), 
                                context.closePath();
                            } else if (data.type === _const.SHAPES.RREC) {
                                var rx = shape.x, ry = shape.y, width = shape.width, height = shape.height, radius = shape.radius, maxRadius = Math.min(width, height) / 2 | 0;
                                radius = radius > maxRadius ? maxRadius : radius, context.moveTo(rx, ry + radius), 
                                context.lineTo(rx, ry + height - radius), context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height), 
                                context.lineTo(rx + width - radius, ry + height), context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius), 
                                context.lineTo(rx + width, ry + radius), context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry), 
                                context.lineTo(rx + radius, ry), context.quadraticCurveTo(rx, ry, rx, ry + radius), 
                                context.closePath();
                            }
                        }
                    }
                }, CanvasMaskManager.prototype.popMask = function(renderer) {
                    renderer.context.restore();
                }, CanvasMaskManager.prototype.destroy = function() {}, CanvasMaskManager;
            }();
            exports.default = CanvasMaskManager;
        }, {
            "../../../const": 46
        } ],
        79: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _settings2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../../../settings")), CanvasRenderTarget = function() {
                function CanvasRenderTarget(width, height, resolution) {
                    _classCallCheck(this, CanvasRenderTarget), this.canvas = document.createElement("canvas"), 
                    this.context = this.canvas.getContext("2d"), this.resolution = resolution || _settings2.default.RESOLUTION, 
                    this.resize(width, height);
                }
                return CanvasRenderTarget.prototype.clear = function() {
                    this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                }, CanvasRenderTarget.prototype.resize = function(width, height) {
                    this.canvas.width = width * this.resolution, this.canvas.height = height * this.resolution;
                }, CanvasRenderTarget.prototype.destroy = function() {
                    this.context = null, this.canvas = null;
                }, _createClass(CanvasRenderTarget, [ {
                    key: "width",
                    get: function() {
                        return this.canvas.width;
                    },
                    set: function(val) {
                        this.canvas.width = val;
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this.canvas.height;
                    },
                    set: function(val) {
                        this.canvas.height = val;
                    }
                } ]), CanvasRenderTarget;
            }();
            exports.default = CanvasRenderTarget;
        }, {
            "../../../settings": 101
        } ],
        80: [ function(require, module, exports) {
            "use strict";
            function createColoredCanvas(color) {
                var canvas = document.createElement("canvas");
                canvas.width = 6, canvas.height = 1;
                var context = canvas.getContext("2d");
                return context.fillStyle = color, context.fillRect(0, 0, 6, 1), canvas;
            }
            exports.__esModule = !0, exports.default = function() {
                if ("undefined" == typeof document) return !1;
                var magenta = createColoredCanvas("#ff00ff"), yellow = createColoredCanvas("#ffff00"), canvas = document.createElement("canvas");
                canvas.width = 6, canvas.height = 1;
                var context = canvas.getContext("2d");
                context.globalCompositeOperation = "multiply", context.drawImage(magenta, 0, 0), 
                context.drawImage(yellow, 2, 0);
                var imageData = context.getImageData(2, 0, 1, 1);
                if (!imageData) return !1;
                var data = imageData.data;
                return 255 === data[0] && 0 === data[1] && 0 === data[2];
            };
        }, {} ],
        81: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function() {
                var array = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                return (0, _canUseNewCanvasBlendModes2.default)() ? (array[_const.BLEND_MODES.NORMAL] = "source-over", 
                array[_const.BLEND_MODES.ADD] = "lighter", array[_const.BLEND_MODES.MULTIPLY] = "multiply", 
                array[_const.BLEND_MODES.SCREEN] = "screen", array[_const.BLEND_MODES.OVERLAY] = "overlay", 
                array[_const.BLEND_MODES.DARKEN] = "darken", array[_const.BLEND_MODES.LIGHTEN] = "lighten", 
                array[_const.BLEND_MODES.COLOR_DODGE] = "color-dodge", array[_const.BLEND_MODES.COLOR_BURN] = "color-burn", 
                array[_const.BLEND_MODES.HARD_LIGHT] = "hard-light", array[_const.BLEND_MODES.SOFT_LIGHT] = "soft-light", 
                array[_const.BLEND_MODES.DIFFERENCE] = "difference", array[_const.BLEND_MODES.EXCLUSION] = "exclusion", 
                array[_const.BLEND_MODES.HUE] = "hue", array[_const.BLEND_MODES.SATURATION] = "saturate", 
                array[_const.BLEND_MODES.COLOR] = "color", array[_const.BLEND_MODES.LUMINOSITY] = "luminosity") : (array[_const.BLEND_MODES.NORMAL] = "source-over", 
                array[_const.BLEND_MODES.ADD] = "lighter", array[_const.BLEND_MODES.MULTIPLY] = "source-over", 
                array[_const.BLEND_MODES.SCREEN] = "source-over", array[_const.BLEND_MODES.OVERLAY] = "source-over", 
                array[_const.BLEND_MODES.DARKEN] = "source-over", array[_const.BLEND_MODES.LIGHTEN] = "source-over", 
                array[_const.BLEND_MODES.COLOR_DODGE] = "source-over", array[_const.BLEND_MODES.COLOR_BURN] = "source-over", 
                array[_const.BLEND_MODES.HARD_LIGHT] = "source-over", array[_const.BLEND_MODES.SOFT_LIGHT] = "source-over", 
                array[_const.BLEND_MODES.DIFFERENCE] = "source-over", array[_const.BLEND_MODES.EXCLUSION] = "source-over", 
                array[_const.BLEND_MODES.HUE] = "source-over", array[_const.BLEND_MODES.SATURATION] = "source-over", 
                array[_const.BLEND_MODES.COLOR] = "source-over", array[_const.BLEND_MODES.LUMINOSITY] = "source-over"), 
                array[_const.BLEND_MODES.NORMAL_NPM] = array[_const.BLEND_MODES.NORMAL], array[_const.BLEND_MODES.ADD_NPM] = array[_const.BLEND_MODES.ADD], 
                array[_const.BLEND_MODES.SCREEN_NPM] = array[_const.BLEND_MODES.SCREEN], array;
            };
            var _const = require("../../../const"), _canUseNewCanvasBlendModes2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./canUseNewCanvasBlendModes"));
        }, {
            "../../../const": 46,
            "./canUseNewCanvasBlendModes": 80
        } ],
        82: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _const = require("../../const"), _settings2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../../settings")), TextureGarbageCollector = function() {
                function TextureGarbageCollector(renderer) {
                    _classCallCheck(this, TextureGarbageCollector), this.renderer = renderer, this.count = 0, 
                    this.checkCount = 0, this.maxIdle = _settings2.default.GC_MAX_IDLE, this.checkCountMax = _settings2.default.GC_MAX_CHECK_COUNT, 
                    this.mode = _settings2.default.GC_MODE;
                }
                return TextureGarbageCollector.prototype.update = function() {
                    this.count++, this.mode !== _const.GC_MODES.MANUAL && ++this.checkCount > this.checkCountMax && (this.checkCount = 0, 
                    this.run());
                }, TextureGarbageCollector.prototype.run = function() {
                    for (var tm = this.renderer.textureManager, managedTextures = tm._managedTextures, wasRemoved = !1, i = 0; i < managedTextures.length; i++) {
                        var texture = managedTextures[i];
                        !texture._glRenderTargets && this.count - texture.touched > this.maxIdle && (tm.destroyTexture(texture, !0), 
                        managedTextures[i] = null, wasRemoved = !0);
                    }
                    if (wasRemoved) {
                        for (var j = 0, _i = 0; _i < managedTextures.length; _i++) null !== managedTextures[_i] && (managedTextures[j++] = managedTextures[_i]);
                        managedTextures.length = j;
                    }
                }, TextureGarbageCollector.prototype.unload = function(displayObject) {
                    var tm = this.renderer.textureManager;
                    displayObject._texture && displayObject._texture._glRenderTargets && tm.destroyTexture(displayObject._texture, !0);
                    for (var i = displayObject.children.length - 1; i >= 0; i--) this.unload(displayObject.children[i]);
                }, TextureGarbageCollector;
            }();
            exports.default = TextureGarbageCollector;
        }, {
            "../../const": 46,
            "../../settings": 101
        } ],
        83: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _pixiGlCore = require("pixi-gl-core"), _const = require("../../const"), _RenderTarget2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./utils/RenderTarget")), _utils = require("../../utils"), TextureManager = function() {
                function TextureManager(renderer) {
                    _classCallCheck(this, TextureManager), this.renderer = renderer, this.gl = renderer.gl, 
                    this._managedTextures = [];
                }
                return TextureManager.prototype.bindTexture = function() {}, TextureManager.prototype.getTexture = function() {}, 
                TextureManager.prototype.updateTexture = function(texture, location) {
                    var gl = this.gl, isRenderTexture = !!texture._glRenderTargets;
                    if (!texture.hasLoaded) return null;
                    var boundTextures = this.renderer.boundTextures;
                    if (void 0 === location) {
                        location = 0;
                        for (var i = 0; i < boundTextures.length; ++i) if (boundTextures[i] === texture) {
                            location = i;
                            break;
                        }
                    }
                    boundTextures[location] = texture, gl.activeTexture(gl.TEXTURE0 + location);
                    var glTexture = texture._glTextures[this.renderer.CONTEXT_UID];
                    if (glTexture) isRenderTexture ? texture._glRenderTargets[this.renderer.CONTEXT_UID].resize(texture.width, texture.height) : glTexture.upload(texture.source); else {
                        if (isRenderTexture) {
                            var renderTarget = new _RenderTarget2.default(this.gl, texture.width, texture.height, texture.scaleMode, texture.resolution);
                            renderTarget.resize(texture.width, texture.height), texture._glRenderTargets[this.renderer.CONTEXT_UID] = renderTarget, 
                            glTexture = renderTarget.texture;
                        } else (glTexture = new _pixiGlCore.GLTexture(this.gl, null, null, null, null)).bind(location), 
                        glTexture.premultiplyAlpha = !0, glTexture.upload(texture.source);
                        texture._glTextures[this.renderer.CONTEXT_UID] = glTexture, texture.on("update", this.updateTexture, this), 
                        texture.on("dispose", this.destroyTexture, this), this._managedTextures.push(texture), 
                        texture.isPowerOfTwo ? (texture.mipmap && glTexture.enableMipmap(), texture.wrapMode === _const.WRAP_MODES.CLAMP ? glTexture.enableWrapClamp() : texture.wrapMode === _const.WRAP_MODES.REPEAT ? glTexture.enableWrapRepeat() : glTexture.enableWrapMirrorRepeat()) : glTexture.enableWrapClamp(), 
                        texture.scaleMode === _const.SCALE_MODES.NEAREST ? glTexture.enableNearestScaling() : glTexture.enableLinearScaling();
                    }
                    return glTexture;
                }, TextureManager.prototype.destroyTexture = function(texture, skipRemove) {
                    if ((texture = texture.baseTexture || texture).hasLoaded) {
                        var uid = this.renderer.CONTEXT_UID, glTextures = texture._glTextures, glRenderTargets = texture._glRenderTargets;
                        if (glTextures[uid] && (this.renderer.unbindTexture(texture), glTextures[uid].destroy(), 
                        texture.off("update", this.updateTexture, this), texture.off("dispose", this.destroyTexture, this), 
                        delete glTextures[uid], !skipRemove)) {
                            var i = this._managedTextures.indexOf(texture);
                            -1 !== i && (0, _utils.removeItems)(this._managedTextures, i, 1);
                        }
                        glRenderTargets && glRenderTargets[uid] && (glRenderTargets[uid].destroy(), delete glRenderTargets[uid]);
                    }
                }, TextureManager.prototype.removeAll = function() {
                    for (var i = 0; i < this._managedTextures.length; ++i) {
                        var texture = this._managedTextures[i];
                        texture._glTextures[this.renderer.CONTEXT_UID] && delete texture._glTextures[this.renderer.CONTEXT_UID];
                    }
                }, TextureManager.prototype.destroy = function() {
                    for (var i = 0; i < this._managedTextures.length; ++i) {
                        var texture = this._managedTextures[i];
                        this.destroyTexture(texture, !0), texture.off("update", this.updateTexture, this), 
                        texture.off("dispose", this.destroyTexture, this);
                    }
                    this._managedTextures = null;
                }, TextureManager;
            }();
            exports.default = TextureManager;
        }, {
            "../../const": 46,
            "../../utils": 124,
            "./utils/RenderTarget": 96,
            "pixi-gl-core": 15
        } ],
        84: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _SystemRenderer3 = _interopRequireDefault(require("../SystemRenderer")), _MaskManager2 = _interopRequireDefault(require("./managers/MaskManager")), _StencilManager2 = _interopRequireDefault(require("./managers/StencilManager")), _FilterManager2 = _interopRequireDefault(require("./managers/FilterManager")), _RenderTarget2 = _interopRequireDefault(require("./utils/RenderTarget")), _ObjectRenderer2 = _interopRequireDefault(require("./utils/ObjectRenderer")), _TextureManager2 = _interopRequireDefault(require("./TextureManager")), _BaseTexture2 = _interopRequireDefault(require("../../textures/BaseTexture")), _TextureGarbageCollector2 = _interopRequireDefault(require("./TextureGarbageCollector")), _WebGLState2 = _interopRequireDefault(require("./WebGLState")), _mapWebGLDrawModesToPixi2 = _interopRequireDefault(require("./utils/mapWebGLDrawModesToPixi")), _validateContext2 = _interopRequireDefault(require("./utils/validateContext")), _utils = require("../../utils"), _pixiGlCore2 = _interopRequireDefault(require("pixi-gl-core")), _const = require("../../const"), CONTEXT_UID = 0, WebGLRenderer = function(_SystemRenderer) {
                function WebGLRenderer(options, arg2, arg3) {
                    _classCallCheck(this, WebGLRenderer);
                    var _this = _possibleConstructorReturn(this, _SystemRenderer.call(this, "WebGL", options, arg2, arg3));
                    return _this.legacy = _this.options.legacy, _this.legacy && (_pixiGlCore2.default.VertexArrayObject.FORCE_NATIVE = !0), 
                    _this.type = _const.RENDERER_TYPE.WEBGL, _this.handleContextLost = _this.handleContextLost.bind(_this), 
                    _this.handleContextRestored = _this.handleContextRestored.bind(_this), _this.view.addEventListener("webglcontextlost", _this.handleContextLost, !1), 
                    _this.view.addEventListener("webglcontextrestored", _this.handleContextRestored, !1), 
                    _this._contextOptions = {
                        alpha: _this.transparent,
                        antialias: _this.options.antialias,
                        premultipliedAlpha: _this.transparent && "notMultiplied" !== _this.transparent,
                        stencil: !0,
                        preserveDrawingBuffer: _this.options.preserveDrawingBuffer
                    }, _this._backgroundColorRgba[3] = _this.transparent ? 0 : 1, _this.maskManager = new _MaskManager2.default(_this), 
                    _this.stencilManager = new _StencilManager2.default(_this), _this.emptyRenderer = new _ObjectRenderer2.default(_this), 
                    _this.currentRenderer = _this.emptyRenderer, _this.initPlugins(), _this.options.context && (0, 
                    _validateContext2.default)(_this.options.context), _this.gl = _this.options.context || _pixiGlCore2.default.createContext(_this.view, _this._contextOptions), 
                    _this.CONTEXT_UID = CONTEXT_UID++, _this.state = new _WebGLState2.default(_this.gl), 
                    _this.renderingToScreen = !0, _this.boundTextures = null, _this._activeShader = null, 
                    _this._activeVao = null, _this._activeRenderTarget = null, _this._initContext(), 
                    _this.filterManager = new _FilterManager2.default(_this), _this.drawModes = (0, 
                    _mapWebGLDrawModesToPixi2.default)(_this.gl), _this._nextTextureLocation = 0, _this.setBlendMode(0), 
                    _this;
                }
                return _inherits(WebGLRenderer, _SystemRenderer), WebGLRenderer.prototype._initContext = function() {
                    var gl = this.gl;
                    gl.isContextLost() && gl.getExtension("WEBGL_lose_context") && gl.getExtension("WEBGL_lose_context").restoreContext();
                    var maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
                    this._activeShader = null, this._activeVao = null, this.boundTextures = new Array(maxTextures), 
                    this.emptyTextures = new Array(maxTextures), this.textureManager = new _TextureManager2.default(this), 
                    this.textureGC = new _TextureGarbageCollector2.default(this), this.state.resetToDefault(), 
                    this.rootRenderTarget = new _RenderTarget2.default(gl, this.width, this.height, null, this.resolution, !0), 
                    this.rootRenderTarget.clearColor = this._backgroundColorRgba, this.bindRenderTarget(this.rootRenderTarget);
                    var emptyGLTexture = new _pixiGlCore2.default.GLTexture.fromData(gl, null, 1, 1), tempObj = {
                        _glTextures: {}
                    };
                    tempObj._glTextures[this.CONTEXT_UID] = {};
                    for (var i = 0; i < maxTextures; i++) {
                        var empty = new _BaseTexture2.default();
                        empty._glTextures[this.CONTEXT_UID] = emptyGLTexture, this.boundTextures[i] = tempObj, 
                        this.emptyTextures[i] = empty, this.bindTexture(null, i);
                    }
                    this.emit("context", gl), this.resize(this.screen.width, this.screen.height);
                }, WebGLRenderer.prototype.render = function(displayObject, renderTexture, clear, transform, skipUpdateTransform) {
                    if (this.renderingToScreen = !renderTexture, this.emit("prerender"), this.gl && !this.gl.isContextLost()) {
                        if (this._nextTextureLocation = 0, renderTexture || (this._lastObjectRendered = displayObject), 
                        !skipUpdateTransform) {
                            var cacheParent = displayObject.parent;
                            displayObject.parent = this._tempDisplayObjectParent, displayObject.updateTransform(), 
                            displayObject.parent = cacheParent;
                        }
                        this.bindRenderTexture(renderTexture, transform), this.currentRenderer.start(), 
                        (void 0 !== clear ? clear : this.clearBeforeRender) && this._activeRenderTarget.clear(), 
                        displayObject.renderWebGL(this), this.currentRenderer.flush(), this.textureGC.update(), 
                        this.emit("postrender");
                    }
                }, WebGLRenderer.prototype.setObjectRenderer = function(objectRenderer) {
                    this.currentRenderer !== objectRenderer && (this.currentRenderer.stop(), this.currentRenderer = objectRenderer, 
                    this.currentRenderer.start());
                }, WebGLRenderer.prototype.flush = function() {
                    this.setObjectRenderer(this.emptyRenderer);
                }, WebGLRenderer.prototype.resize = function(screenWidth, screenHeight) {
                    _SystemRenderer3.default.prototype.resize.call(this, screenWidth, screenHeight), 
                    this.rootRenderTarget.resize(screenWidth, screenHeight), this._activeRenderTarget === this.rootRenderTarget && (this.rootRenderTarget.activate(), 
                    this._activeShader && (this._activeShader.uniforms.projectionMatrix = this.rootRenderTarget.projectionMatrix.toArray(!0)));
                }, WebGLRenderer.prototype.setBlendMode = function(blendMode) {
                    this.state.setBlendMode(blendMode);
                }, WebGLRenderer.prototype.clear = function(clearColor) {
                    this._activeRenderTarget.clear(clearColor);
                }, WebGLRenderer.prototype.setTransform = function(matrix) {
                    this._activeRenderTarget.transform = matrix;
                }, WebGLRenderer.prototype.clearRenderTexture = function(renderTexture, clearColor) {
                    var renderTarget = renderTexture.baseTexture._glRenderTargets[this.CONTEXT_UID];
                    return renderTarget && renderTarget.clear(clearColor), this;
                }, WebGLRenderer.prototype.bindRenderTexture = function(renderTexture, transform) {
                    var renderTarget = void 0;
                    if (renderTexture) {
                        var baseTexture = renderTexture.baseTexture;
                        baseTexture._glRenderTargets[this.CONTEXT_UID] || this.textureManager.updateTexture(baseTexture, 0), 
                        this.unbindTexture(baseTexture), (renderTarget = baseTexture._glRenderTargets[this.CONTEXT_UID]).setFrame(renderTexture.frame);
                    } else renderTarget = this.rootRenderTarget;
                    return renderTarget.transform = transform, this.bindRenderTarget(renderTarget), 
                    this;
                }, WebGLRenderer.prototype.bindRenderTarget = function(renderTarget) {
                    return renderTarget !== this._activeRenderTarget && (this._activeRenderTarget = renderTarget, 
                    renderTarget.activate(), this._activeShader && (this._activeShader.uniforms.projectionMatrix = renderTarget.projectionMatrix.toArray(!0)), 
                    this.stencilManager.setMaskStack(renderTarget.stencilMaskStack)), this;
                }, WebGLRenderer.prototype.bindShader = function(shader, autoProject) {
                    return this._activeShader !== shader && (this._activeShader = shader, shader.bind(), 
                    !1 !== autoProject && (shader.uniforms.projectionMatrix = this._activeRenderTarget.projectionMatrix.toArray(!0))), 
                    this;
                }, WebGLRenderer.prototype.bindTexture = function(texture, location, forceLocation) {
                    if (texture = texture || this.emptyTextures[location], texture = texture.baseTexture || texture, 
                    texture.touched = this.textureGC.count, forceLocation) location = location || 0; else {
                        for (var i = 0; i < this.boundTextures.length; i++) if (this.boundTextures[i] === texture) return i;
                        void 0 === location && (this._nextTextureLocation++, this._nextTextureLocation %= this.boundTextures.length, 
                        location = this.boundTextures.length - this._nextTextureLocation - 1);
                    }
                    var gl = this.gl, glTexture = texture._glTextures[this.CONTEXT_UID];
                    return glTexture ? (this.boundTextures[location] = texture, gl.activeTexture(gl.TEXTURE0 + location), 
                    gl.bindTexture(gl.TEXTURE_2D, glTexture.texture)) : this.textureManager.updateTexture(texture, location), 
                    location;
                }, WebGLRenderer.prototype.unbindTexture = function(texture) {
                    var gl = this.gl;
                    texture = texture.baseTexture || texture;
                    for (var i = 0; i < this.boundTextures.length; i++) this.boundTextures[i] === texture && (this.boundTextures[i] = this.emptyTextures[i], 
                    gl.activeTexture(gl.TEXTURE0 + i), gl.bindTexture(gl.TEXTURE_2D, this.emptyTextures[i]._glTextures[this.CONTEXT_UID].texture));
                    return this;
                }, WebGLRenderer.prototype.createVao = function() {
                    return new _pixiGlCore2.default.VertexArrayObject(this.gl, this.state.attribState);
                }, WebGLRenderer.prototype.bindVao = function(vao) {
                    return this._activeVao === vao ? this : (vao ? vao.bind() : this._activeVao && this._activeVao.unbind(), 
                    this._activeVao = vao, this);
                }, WebGLRenderer.prototype.reset = function() {
                    return this.setObjectRenderer(this.emptyRenderer), this._activeShader = null, this._activeRenderTarget = this.rootRenderTarget, 
                    this.rootRenderTarget.activate(), this.state.resetToDefault(), this;
                }, WebGLRenderer.prototype.handleContextLost = function(event) {
                    event.preventDefault();
                }, WebGLRenderer.prototype.handleContextRestored = function() {
                    this.textureManager.removeAll(), this._initContext();
                }, WebGLRenderer.prototype.destroy = function(removeView) {
                    this.destroyPlugins(), this.view.removeEventListener("webglcontextlost", this.handleContextLost), 
                    this.view.removeEventListener("webglcontextrestored", this.handleContextRestored), 
                    this.textureManager.destroy(), _SystemRenderer.prototype.destroy.call(this, removeView), 
                    this.uid = 0, this.maskManager.destroy(), this.stencilManager.destroy(), this.filterManager.destroy(), 
                    this.maskManager = null, this.filterManager = null, this.textureManager = null, 
                    this.currentRenderer = null, this.handleContextLost = null, this.handleContextRestored = null, 
                    this._contextOptions = null, this.gl.useProgram(null), this.gl.getExtension("WEBGL_lose_context") && this.gl.getExtension("WEBGL_lose_context").loseContext(), 
                    this.gl = null;
                }, WebGLRenderer;
            }(_SystemRenderer3.default);
            exports.default = WebGLRenderer, _utils.pluginTarget.mixin(WebGLRenderer);
        }, {
            "../../const": 46,
            "../../textures/BaseTexture": 112,
            "../../utils": 124,
            "../SystemRenderer": 76,
            "./TextureGarbageCollector": 82,
            "./TextureManager": 83,
            "./WebGLState": 85,
            "./managers/FilterManager": 90,
            "./managers/MaskManager": 91,
            "./managers/StencilManager": 92,
            "./utils/ObjectRenderer": 94,
            "./utils/RenderTarget": 96,
            "./utils/mapWebGLDrawModesToPixi": 99,
            "./utils/validateContext": 100,
            "pixi-gl-core": 15
        } ],
        85: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _mapWebGLBlendModesToPixi2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./utils/mapWebGLBlendModesToPixi")), WebGLState = function() {
                function WebGLState(gl) {
                    _classCallCheck(this, WebGLState), this.activeState = new Uint8Array(16), this.defaultState = new Uint8Array(16), 
                    this.defaultState[0] = 1, this.stackIndex = 0, this.stack = [], this.gl = gl, this.maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS), 
                    this.attribState = {
                        tempAttribState: new Array(this.maxAttribs),
                        attribState: new Array(this.maxAttribs)
                    }, this.blendModes = (0, _mapWebGLBlendModesToPixi2.default)(gl), this.nativeVaoExtension = gl.getExtension("OES_vertex_array_object") || gl.getExtension("MOZ_OES_vertex_array_object") || gl.getExtension("WEBKIT_OES_vertex_array_object");
                }
                return WebGLState.prototype.push = function() {
                    var state = this.stack[this.stackIndex];
                    state || (state = this.stack[this.stackIndex] = new Uint8Array(16)), ++this.stackIndex;
                    for (var i = 0; i < this.activeState.length; i++) state[i] = this.activeState[i];
                }, WebGLState.prototype.pop = function() {
                    var state = this.stack[--this.stackIndex];
                    this.setState(state);
                }, WebGLState.prototype.setState = function(state) {
                    this.setBlend(state[0]), this.setDepthTest(state[1]), this.setFrontFace(state[2]), 
                    this.setCullFace(state[3]), this.setBlendMode(state[4]);
                }, WebGLState.prototype.setBlend = function(value) {
                    value = value ? 1 : 0, this.activeState[0] !== value && (this.activeState[0] = value, 
                    this.gl[value ? "enable" : "disable"](this.gl.BLEND));
                }, WebGLState.prototype.setBlendMode = function(value) {
                    if (value !== this.activeState[4]) {
                        this.activeState[4] = value;
                        var mode = this.blendModes[value];
                        2 === mode.length ? this.gl.blendFunc(mode[0], mode[1]) : this.gl.blendFuncSeparate(mode[0], mode[1], mode[2], mode[3]);
                    }
                }, WebGLState.prototype.setDepthTest = function(value) {
                    value = value ? 1 : 0, this.activeState[1] !== value && (this.activeState[1] = value, 
                    this.gl[value ? "enable" : "disable"](this.gl.DEPTH_TEST));
                }, WebGLState.prototype.setCullFace = function(value) {
                    value = value ? 1 : 0, this.activeState[3] !== value && (this.activeState[3] = value, 
                    this.gl[value ? "enable" : "disable"](this.gl.CULL_FACE));
                }, WebGLState.prototype.setFrontFace = function(value) {
                    value = value ? 1 : 0, this.activeState[2] !== value && (this.activeState[2] = value, 
                    this.gl.frontFace(this.gl[value ? "CW" : "CCW"]));
                }, WebGLState.prototype.resetAttributes = function() {
                    for (var i = 0; i < this.attribState.tempAttribState.length; i++) this.attribState.tempAttribState[i] = 0;
                    for (var _i = 0; _i < this.attribState.attribState.length; _i++) this.attribState.attribState[_i] = 0;
                    for (var _i2 = 1; _i2 < this.maxAttribs; _i2++) this.gl.disableVertexAttribArray(_i2);
                }, WebGLState.prototype.resetToDefault = function() {
                    this.nativeVaoExtension && this.nativeVaoExtension.bindVertexArrayOES(null), this.resetAttributes();
                    for (var i = 0; i < this.activeState.length; ++i) this.activeState[i] = 32;
                    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.setState(this.defaultState);
                }, WebGLState;
            }();
            exports.default = WebGLState;
        }, {
            "./utils/mapWebGLBlendModesToPixi": 98
        } ],
        86: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _extractUniformsFromSrc2 = _interopRequireDefault(require("./extractUniformsFromSrc")), _utils = require("../../../utils"), _const = require("../../../const"), _settings2 = _interopRequireDefault(require("../../../settings")), SOURCE_KEY_MAP = {}, Filter = function() {
                function Filter(vertexSrc, fragmentSrc, uniforms) {
                    _classCallCheck(this, Filter), this.vertexSrc = vertexSrc || Filter.defaultVertexSrc, 
                    this.fragmentSrc = fragmentSrc || Filter.defaultFragmentSrc, this._blendMode = _const.BLEND_MODES.NORMAL, 
                    this.uniformData = uniforms || (0, _extractUniformsFromSrc2.default)(this.vertexSrc, this.fragmentSrc, "projectionMatrix|uSampler"), 
                    this.uniforms = {};
                    for (var i in this.uniformData) this.uniforms[i] = this.uniformData[i].value;
                    this.glShaders = {}, SOURCE_KEY_MAP[this.vertexSrc + this.fragmentSrc] || (SOURCE_KEY_MAP[this.vertexSrc + this.fragmentSrc] = (0, 
                    _utils.uid)()), this.glShaderKey = SOURCE_KEY_MAP[this.vertexSrc + this.fragmentSrc], 
                    this.padding = 4, this.resolution = _settings2.default.RESOLUTION, this.enabled = !0, 
                    this.autoFit = !0;
                }
                return Filter.prototype.apply = function(filterManager, input, output, clear, currentState) {
                    filterManager.applyFilter(this, input, output, clear);
                }, _createClass(Filter, [ {
                    key: "blendMode",
                    get: function() {
                        return this._blendMode;
                    },
                    set: function(value) {
                        this._blendMode = value;
                    }
                } ], [ {
                    key: "defaultVertexSrc",
                    get: function() {
                        return [ "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 projectionMatrix;", "uniform mat3 filterMatrix;", "varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;", "   vTextureCoord = aTextureCoord ;", "}" ].join("\n");
                    }
                }, {
                    key: "defaultFragmentSrc",
                    get: function() {
                        return [ "varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "uniform sampler2D uSampler;", "uniform sampler2D filterSampler;", "void main(void){", "   vec4 masky = texture2D(filterSampler, vFilterCoord);", "   vec4 sample = texture2D(uSampler, vTextureCoord);", "   vec4 color;", "   if(mod(vFilterCoord.x, 1.0) > 0.5)", "   {", "     color = vec4(1.0, 0.0, 0.0, 1.0);", "   }", "   else", "   {", "     color = vec4(0.0, 1.0, 0.0, 1.0);", "   }", "   gl_FragColor = mix(sample, masky, 0.5);", "   gl_FragColor *= sample.a;", "}" ].join("\n");
                    }
                } ]), Filter;
            }();
            exports.default = Filter;
        }, {
            "../../../const": 46,
            "../../../settings": 101,
            "../../../utils": 124,
            "./extractUniformsFromSrc": 87
        } ],
        87: [ function(require, module, exports) {
            "use strict";
            function extractUniformsFromString(string) {
                for (var maskRegex = new RegExp("^(projectionMatrix|uSampler|filterArea|filterClamp)$"), uniforms = {}, nameSplit = void 0, lines = string.replace(/\s+/g, " ").split(/\s*;\s*/), i = 0; i < lines.length; i++) {
                    var line = lines[i].trim();
                    if (line.indexOf("uniform") > -1) {
                        var splitLine = line.split(" "), type = splitLine[1], name = splitLine[2], size = 1;
                        name.indexOf("[") > -1 && (name = (nameSplit = name.split(/\[|]/))[0], size *= Number(nameSplit[1])), 
                        name.match(maskRegex) || (uniforms[name] = {
                            value: defaultValue(type, size),
                            name: name,
                            type: type
                        });
                    }
                }
                return uniforms;
            }
            exports.__esModule = !0, exports.default = function(vertexSrc, fragmentSrc, mask) {
                var vertUniforms = extractUniformsFromString(vertexSrc), fragUniforms = extractUniformsFromString(fragmentSrc);
                return Object.assign(vertUniforms, fragUniforms);
            };
            var defaultValue = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("pixi-gl-core")).default.shader.defaultValue;
        }, {
            "pixi-gl-core": 15
        } ],
        88: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.calculateScreenSpaceMatrix = function(outputMatrix, filterArea, textureSize) {
                var mappedMatrix = outputMatrix.identity();
                return mappedMatrix.translate(filterArea.x / textureSize.width, filterArea.y / textureSize.height), 
                mappedMatrix.scale(textureSize.width, textureSize.height), mappedMatrix;
            }, exports.calculateNormalizedScreenSpaceMatrix = function(outputMatrix, filterArea, textureSize) {
                var mappedMatrix = outputMatrix.identity();
                mappedMatrix.translate(filterArea.x / textureSize.width, filterArea.y / textureSize.height);
                var translateScaleX = textureSize.width / filterArea.width, translateScaleY = textureSize.height / filterArea.height;
                return mappedMatrix.scale(translateScaleX, translateScaleY), mappedMatrix;
            }, exports.calculateSpriteMatrix = function(outputMatrix, filterArea, textureSize, sprite) {
                var worldTransform = sprite.worldTransform.copy(_math.Matrix.TEMP_MATRIX), texture = sprite._texture.baseTexture, mappedMatrix = outputMatrix.identity(), ratio = textureSize.height / textureSize.width;
                mappedMatrix.translate(filterArea.x / textureSize.width, filterArea.y / textureSize.height), 
                mappedMatrix.scale(1, ratio);
                var translateScaleX = textureSize.width / texture.width, translateScaleY = textureSize.height / texture.height;
                return worldTransform.tx /= texture.width * translateScaleX, worldTransform.ty /= texture.width * translateScaleX, 
                worldTransform.invert(), mappedMatrix.prepend(worldTransform), mappedMatrix.scale(1, 1 / ratio), 
                mappedMatrix.scale(translateScaleX, translateScaleY), mappedMatrix.translate(sprite.anchor.x, sprite.anchor.y), 
                mappedMatrix;
            };
            var _math = require("../../../math");
        }, {
            "../../../math": 70
        } ],
        89: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _Filter3 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../Filter")), _math = require("../../../../math"), SpriteMaskFilter = (require("path"), 
            function(_Filter) {
                function SpriteMaskFilter(sprite) {
                    _classCallCheck(this, SpriteMaskFilter);
                    var maskMatrix = new _math.Matrix(), _this = _possibleConstructorReturn(this, _Filter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n", "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n\n    original *= (masky.r * masky.a * alpha * clip);\n\n    gl_FragColor = original;\n}\n"));
                    return sprite.renderable = !1, _this.maskSprite = sprite, _this.maskMatrix = maskMatrix, 
                    _this;
                }
                return _inherits(SpriteMaskFilter, _Filter), SpriteMaskFilter.prototype.apply = function(filterManager, input, output) {
                    var maskSprite = this.maskSprite;
                    this.uniforms.mask = maskSprite._texture, this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, maskSprite), 
                    this.uniforms.alpha = maskSprite.worldAlpha, filterManager.applyFilter(this, input, output);
                }, SpriteMaskFilter;
            }(_Filter3.default));
            exports.default = SpriteMaskFilter;
        }, {
            "../../../../math": 70,
            "../Filter": 86,
            path: 8
        } ],
        90: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _WebGLManager3 = _interopRequireDefault(require("./WebGLManager")), _RenderTarget2 = _interopRequireDefault(require("../utils/RenderTarget")), _Quad2 = _interopRequireDefault(require("../utils/Quad")), _math = require("../../../math"), _Shader2 = _interopRequireDefault(require("../../../Shader")), filterTransforms = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../filters/filterTransforms")), _bitTwiddle2 = _interopRequireDefault(require("bit-twiddle")), FilterState = function FilterState() {
                _classCallCheck(this, FilterState), this.renderTarget = null, this.sourceFrame = new _math.Rectangle(), 
                this.destinationFrame = new _math.Rectangle(), this.filters = [], this.target = null, 
                this.resolution = 1;
            }, FilterManager = function(_WebGLManager) {
                function FilterManager(renderer) {
                    _classCallCheck(this, FilterManager);
                    var _this = _possibleConstructorReturn(this, _WebGLManager.call(this, renderer));
                    return _this.gl = _this.renderer.gl, _this.quad = new _Quad2.default(_this.gl, renderer.state.attribState), 
                    _this.shaderCache = {}, _this.pool = {}, _this.filterData = null, _this;
                }
                return _inherits(FilterManager, _WebGLManager), FilterManager.prototype.pushFilter = function(target, filters) {
                    var renderer = this.renderer, filterData = this.filterData;
                    if (!filterData) {
                        filterData = this.renderer._activeRenderTarget.filterStack;
                        var filterState = new FilterState();
                        filterState.sourceFrame = filterState.destinationFrame = this.renderer._activeRenderTarget.size, 
                        filterState.renderTarget = renderer._activeRenderTarget, this.renderer._activeRenderTarget.filterData = filterData = {
                            index: 0,
                            stack: [ filterState ]
                        }, this.filterData = filterData;
                    }
                    var currentState = filterData.stack[++filterData.index];
                    currentState || (currentState = filterData.stack[filterData.index] = new FilterState());
                    var resolution = filters[0].resolution, padding = 0 | filters[0].padding, targetBounds = target.filterArea || target.getBounds(!0), sourceFrame = currentState.sourceFrame, destinationFrame = currentState.destinationFrame;
                    sourceFrame.x = (targetBounds.x * resolution | 0) / resolution, sourceFrame.y = (targetBounds.y * resolution | 0) / resolution, 
                    sourceFrame.width = (targetBounds.width * resolution | 0) / resolution, sourceFrame.height = (targetBounds.height * resolution | 0) / resolution, 
                    filterData.stack[0].renderTarget.transform || filters[0].autoFit && sourceFrame.fit(filterData.stack[0].destinationFrame), 
                    sourceFrame.pad(padding), destinationFrame.width = sourceFrame.width, destinationFrame.height = sourceFrame.height;
                    var renderTarget = this.getPotRenderTarget(renderer.gl, sourceFrame.width, sourceFrame.height, resolution);
                    currentState.target = target, currentState.filters = filters, currentState.resolution = resolution, 
                    currentState.renderTarget = renderTarget, renderTarget.setFrame(destinationFrame, sourceFrame), 
                    renderer.bindRenderTarget(renderTarget), renderTarget.clear();
                }, FilterManager.prototype.popFilter = function() {
                    var filterData = this.filterData, lastState = filterData.stack[filterData.index - 1], currentState = filterData.stack[filterData.index];
                    this.quad.map(currentState.renderTarget.size, currentState.sourceFrame).upload();
                    var filters = currentState.filters;
                    if (1 === filters.length) filters[0].apply(this, currentState.renderTarget, lastState.renderTarget, !1, currentState), 
                    this.freePotRenderTarget(currentState.renderTarget); else {
                        var flip = currentState.renderTarget, flop = this.getPotRenderTarget(this.renderer.gl, currentState.sourceFrame.width, currentState.sourceFrame.height, currentState.resolution);
                        flop.setFrame(currentState.destinationFrame, currentState.sourceFrame), flop.clear();
                        var i = 0;
                        for (i = 0; i < filters.length - 1; ++i) {
                            filters[i].apply(this, flip, flop, !0, currentState);
                            var t = flip;
                            flip = flop, flop = t;
                        }
                        filters[i].apply(this, flip, lastState.renderTarget, !1, currentState), this.freePotRenderTarget(flip), 
                        this.freePotRenderTarget(flop);
                    }
                    filterData.index--, 0 === filterData.index && (this.filterData = null);
                }, FilterManager.prototype.applyFilter = function(filter, input, output, clear) {
                    var renderer = this.renderer, gl = renderer.gl, shader = filter.glShaders[renderer.CONTEXT_UID];
                    shader || (filter.glShaderKey ? (shader = this.shaderCache[filter.glShaderKey]) || (shader = new _Shader2.default(this.gl, filter.vertexSrc, filter.fragmentSrc), 
                    filter.glShaders[renderer.CONTEXT_UID] = this.shaderCache[filter.glShaderKey] = shader) : shader = filter.glShaders[renderer.CONTEXT_UID] = new _Shader2.default(this.gl, filter.vertexSrc, filter.fragmentSrc), 
                    renderer.bindVao(null), this.quad.initVao(shader)), renderer.bindVao(this.quad.vao), 
                    renderer.bindRenderTarget(output), clear && (gl.disable(gl.SCISSOR_TEST), renderer.clear(), 
                    gl.enable(gl.SCISSOR_TEST)), output === renderer.maskManager.scissorRenderTarget && renderer.maskManager.pushScissorMask(null, renderer.maskManager.scissorData), 
                    renderer.bindShader(shader);
                    var tex = this.renderer.emptyTextures[0];
                    this.renderer.boundTextures[0] = tex, this.syncUniforms(shader, filter), renderer.state.setBlendMode(filter.blendMode), 
                    gl.activeTexture(gl.TEXTURE0), gl.bindTexture(gl.TEXTURE_2D, input.texture.texture), 
                    this.quad.vao.draw(this.renderer.gl.TRIANGLES, 6, 0), gl.bindTexture(gl.TEXTURE_2D, tex._glTextures[this.renderer.CONTEXT_UID].texture);
                }, FilterManager.prototype.syncUniforms = function(shader, filter) {
                    var uniformData = filter.uniformData, uniforms = filter.uniforms, textureCount = 1, currentState = void 0;
                    if (shader.uniforms.filterArea) {
                        currentState = this.filterData.stack[this.filterData.index];
                        var filterArea = shader.uniforms.filterArea;
                        filterArea[0] = currentState.renderTarget.size.width, filterArea[1] = currentState.renderTarget.size.height, 
                        filterArea[2] = currentState.sourceFrame.x, filterArea[3] = currentState.sourceFrame.y, 
                        shader.uniforms.filterArea = filterArea;
                    }
                    if (shader.uniforms.filterClamp) {
                        currentState = currentState || this.filterData.stack[this.filterData.index];
                        var filterClamp = shader.uniforms.filterClamp;
                        filterClamp[0] = 0, filterClamp[1] = 0, filterClamp[2] = (currentState.sourceFrame.width - 1) / currentState.renderTarget.size.width, 
                        filterClamp[3] = (currentState.sourceFrame.height - 1) / currentState.renderTarget.size.height, 
                        shader.uniforms.filterClamp = filterClamp;
                    }
                    for (var i in uniformData) if ("sampler2D" === uniformData[i].type && 0 !== uniforms[i]) {
                        if (uniforms[i].baseTexture) shader.uniforms[i] = this.renderer.bindTexture(uniforms[i].baseTexture, textureCount); else {
                            shader.uniforms[i] = textureCount;
                            var gl = this.renderer.gl;
                            this.renderer.boundTextures[textureCount] = this.renderer.emptyTextures[textureCount], 
                            gl.activeTexture(gl.TEXTURE0 + textureCount), uniforms[i].texture.bind();
                        }
                        textureCount++;
                    } else if ("mat3" === uniformData[i].type) void 0 !== uniforms[i].a ? shader.uniforms[i] = uniforms[i].toArray(!0) : shader.uniforms[i] = uniforms[i]; else if ("vec2" === uniformData[i].type) if (void 0 !== uniforms[i].x) {
                        var val = shader.uniforms[i] || new Float32Array(2);
                        val[0] = uniforms[i].x, val[1] = uniforms[i].y, shader.uniforms[i] = val;
                    } else shader.uniforms[i] = uniforms[i]; else "float" === uniformData[i].type ? shader.uniforms.data[i].value !== uniformData[i] && (shader.uniforms[i] = uniforms[i]) : shader.uniforms[i] = uniforms[i];
                }, FilterManager.prototype.getRenderTarget = function(clear, resolution) {
                    var currentState = this.filterData.stack[this.filterData.index], renderTarget = this.getPotRenderTarget(this.renderer.gl, currentState.sourceFrame.width, currentState.sourceFrame.height, resolution || currentState.resolution);
                    return renderTarget.setFrame(currentState.destinationFrame, currentState.sourceFrame), 
                    renderTarget;
                }, FilterManager.prototype.returnRenderTarget = function(renderTarget) {
                    this.freePotRenderTarget(renderTarget);
                }, FilterManager.prototype.calculateScreenSpaceMatrix = function(outputMatrix) {
                    var currentState = this.filterData.stack[this.filterData.index];
                    return filterTransforms.calculateScreenSpaceMatrix(outputMatrix, currentState.sourceFrame, currentState.renderTarget.size);
                }, FilterManager.prototype.calculateNormalizedScreenSpaceMatrix = function(outputMatrix) {
                    var currentState = this.filterData.stack[this.filterData.index];
                    return filterTransforms.calculateNormalizedScreenSpaceMatrix(outputMatrix, currentState.sourceFrame, currentState.renderTarget.size, currentState.destinationFrame);
                }, FilterManager.prototype.calculateSpriteMatrix = function(outputMatrix, sprite) {
                    var currentState = this.filterData.stack[this.filterData.index];
                    return filterTransforms.calculateSpriteMatrix(outputMatrix, currentState.sourceFrame, currentState.renderTarget.size, sprite);
                }, FilterManager.prototype.destroy = function() {
                    this.shaderCache = {}, this.emptyPool();
                }, FilterManager.prototype.getPotRenderTarget = function(gl, minWidth, minHeight, resolution) {
                    var key = (65535 & (minWidth = _bitTwiddle2.default.nextPow2(minWidth * resolution))) << 16 | 65535 & (minHeight = _bitTwiddle2.default.nextPow2(minHeight * resolution));
                    this.pool[key] || (this.pool[key] = []);
                    var renderTarget = this.pool[key].pop();
                    if (!renderTarget) {
                        var tex = this.renderer.boundTextures[0];
                        gl.activeTexture(gl.TEXTURE0), renderTarget = new _RenderTarget2.default(gl, minWidth, minHeight, null, 1), 
                        gl.bindTexture(gl.TEXTURE_2D, tex._glTextures[this.renderer.CONTEXT_UID].texture);
                    }
                    return renderTarget.resolution = resolution, renderTarget.defaultFrame.width = renderTarget.size.width = minWidth / resolution, 
                    renderTarget.defaultFrame.height = renderTarget.size.height = minHeight / resolution, 
                    renderTarget;
                }, FilterManager.prototype.emptyPool = function() {
                    for (var i in this.pool) {
                        var textures = this.pool[i];
                        if (textures) for (var j = 0; j < textures.length; j++) textures[j].destroy(!0);
                    }
                    this.pool = {};
                }, FilterManager.prototype.freePotRenderTarget = function(renderTarget) {
                    var key = (65535 & renderTarget.size.width * renderTarget.resolution) << 16 | 65535 & renderTarget.size.height * renderTarget.resolution;
                    this.pool[key].push(renderTarget);
                }, FilterManager;
            }(_WebGLManager3.default);
            exports.default = FilterManager;
        }, {
            "../../../Shader": 44,
            "../../../math": 70,
            "../filters/filterTransforms": 88,
            "../utils/Quad": 95,
            "../utils/RenderTarget": 96,
            "./WebGLManager": 93,
            "bit-twiddle": 1
        } ],
        91: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _WebGLManager3 = _interopRequireDefault(require("./WebGLManager")), _SpriteMaskFilter2 = _interopRequireDefault(require("../filters/spriteMask/SpriteMaskFilter")), MaskManager = function(_WebGLManager) {
                function MaskManager(renderer) {
                    _classCallCheck(this, MaskManager);
                    var _this = _possibleConstructorReturn(this, _WebGLManager.call(this, renderer));
                    return _this.scissor = !1, _this.scissorData = null, _this.scissorRenderTarget = null, 
                    _this.enableScissor = !0, _this.alphaMaskPool = [], _this.alphaMaskIndex = 0, _this;
                }
                return _inherits(MaskManager, _WebGLManager), MaskManager.prototype.pushMask = function(target, maskData) {
                    if (maskData.texture) this.pushSpriteMask(target, maskData); else if (this.enableScissor && !this.scissor && this.renderer._activeRenderTarget.root && !this.renderer.stencilManager.stencilMaskStack.length && maskData.isFastRect()) {
                        var matrix = maskData.worldTransform, rot = Math.atan2(matrix.b, matrix.a);
                        (rot = Math.round(rot * (180 / Math.PI))) % 90 ? this.pushStencilMask(maskData) : this.pushScissorMask(target, maskData);
                    } else this.pushStencilMask(maskData);
                }, MaskManager.prototype.popMask = function(target, maskData) {
                    maskData.texture ? this.popSpriteMask(target, maskData) : this.enableScissor && !this.renderer.stencilManager.stencilMaskStack.length ? this.popScissorMask(target, maskData) : this.popStencilMask(target, maskData);
                }, MaskManager.prototype.pushSpriteMask = function(target, maskData) {
                    var alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex];
                    alphaMaskFilter || (alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex] = [ new _SpriteMaskFilter2.default(maskData) ]), 
                    alphaMaskFilter[0].resolution = this.renderer.resolution, alphaMaskFilter[0].maskSprite = maskData, 
                    target.filterArea = maskData.getBounds(!0), this.renderer.filterManager.pushFilter(target, alphaMaskFilter), 
                    this.alphaMaskIndex++;
                }, MaskManager.prototype.popSpriteMask = function() {
                    this.renderer.filterManager.popFilter(), this.alphaMaskIndex--;
                }, MaskManager.prototype.pushStencilMask = function(maskData) {
                    this.renderer.currentRenderer.stop(), this.renderer.stencilManager.pushStencil(maskData);
                }, MaskManager.prototype.popStencilMask = function() {
                    this.renderer.currentRenderer.stop(), this.renderer.stencilManager.popStencil();
                }, MaskManager.prototype.pushScissorMask = function(target, maskData) {
                    maskData.renderable = !0;
                    var renderTarget = this.renderer._activeRenderTarget, bounds = maskData.getBounds();
                    bounds.fit(renderTarget.size), maskData.renderable = !1, this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
                    var resolution = this.renderer.resolution;
                    this.renderer.gl.scissor(bounds.x * resolution, (renderTarget.root ? renderTarget.size.height - bounds.y - bounds.height : bounds.y) * resolution, bounds.width * resolution, bounds.height * resolution), 
                    this.scissorRenderTarget = renderTarget, this.scissorData = maskData, this.scissor = !0;
                }, MaskManager.prototype.popScissorMask = function() {
                    this.scissorRenderTarget = null, this.scissorData = null, this.scissor = !1;
                    var gl = this.renderer.gl;
                    gl.disable(gl.SCISSOR_TEST);
                }, MaskManager;
            }(_WebGLManager3.default);
            exports.default = MaskManager;
        }, {
            "../filters/spriteMask/SpriteMaskFilter": 89,
            "./WebGLManager": 93
        } ],
        92: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _WebGLManager3 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./WebGLManager")), StencilManager = function(_WebGLManager) {
                function StencilManager(renderer) {
                    _classCallCheck(this, StencilManager);
                    var _this = _possibleConstructorReturn(this, _WebGLManager.call(this, renderer));
                    return _this.stencilMaskStack = null, _this;
                }
                return _inherits(StencilManager, _WebGLManager), StencilManager.prototype.setMaskStack = function(stencilMaskStack) {
                    this.stencilMaskStack = stencilMaskStack;
                    var gl = this.renderer.gl;
                    0 === stencilMaskStack.length ? gl.disable(gl.STENCIL_TEST) : gl.enable(gl.STENCIL_TEST);
                }, StencilManager.prototype.pushStencil = function(graphics) {
                    this.renderer.setObjectRenderer(this.renderer.plugins.graphics), this.renderer._activeRenderTarget.attachStencilBuffer();
                    var gl = this.renderer.gl, sms = this.stencilMaskStack;
                    0 === sms.length && (gl.enable(gl.STENCIL_TEST), gl.clear(gl.STENCIL_BUFFER_BIT), 
                    gl.stencilFunc(gl.ALWAYS, 1, 1)), sms.push(graphics), gl.colorMask(!1, !1, !1, !1), 
                    gl.stencilFunc(gl.EQUAL, 0, sms.length), gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR), 
                    this.renderer.plugins.graphics.render(graphics), gl.colorMask(!0, !0, !0, !0), gl.stencilFunc(gl.NOTEQUAL, 0, sms.length), 
                    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                }, StencilManager.prototype.popStencil = function() {
                    this.renderer.setObjectRenderer(this.renderer.plugins.graphics);
                    var gl = this.renderer.gl, sms = this.stencilMaskStack, graphics = sms.pop();
                    0 === sms.length ? gl.disable(gl.STENCIL_TEST) : (gl.colorMask(!1, !1, !1, !1), 
                    gl.stencilFunc(gl.EQUAL, 0, sms.length), gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR), 
                    this.renderer.plugins.graphics.render(graphics), gl.colorMask(!0, !0, !0, !0), gl.stencilFunc(gl.NOTEQUAL, 0, sms.length), 
                    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP));
                }, StencilManager.prototype.destroy = function() {
                    _WebGLManager3.default.prototype.destroy.call(this), this.stencilMaskStack.stencilStack = null;
                }, StencilManager;
            }(_WebGLManager3.default);
            exports.default = StencilManager;
        }, {
            "./WebGLManager": 93
        } ],
        93: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var WebGLManager = function() {
                function WebGLManager(renderer) {
                    _classCallCheck(this, WebGLManager), this.renderer = renderer, this.renderer.on("context", this.onContextChange, this);
                }
                return WebGLManager.prototype.onContextChange = function() {}, WebGLManager.prototype.destroy = function() {
                    this.renderer.off("context", this.onContextChange, this), this.renderer = null;
                }, WebGLManager;
            }();
            exports.default = WebGLManager;
        }, {} ],
        94: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var ObjectRenderer = function(_WebGLManager) {
                function ObjectRenderer() {
                    return _classCallCheck(this, ObjectRenderer), _possibleConstructorReturn(this, _WebGLManager.apply(this, arguments));
                }
                return _inherits(ObjectRenderer, _WebGLManager), ObjectRenderer.prototype.start = function() {}, 
                ObjectRenderer.prototype.stop = function() {
                    this.flush();
                }, ObjectRenderer.prototype.flush = function() {}, ObjectRenderer.prototype.render = function(object) {}, 
                ObjectRenderer;
            }(function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../managers/WebGLManager")).default);
            exports.default = ObjectRenderer;
        }, {
            "../managers/WebGLManager": 93
        } ],
        95: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _pixiGlCore2 = _interopRequireDefault(require("pixi-gl-core")), _createIndicesForQuads2 = _interopRequireDefault(require("../../../utils/createIndicesForQuads")), Quad = function() {
                function Quad(gl, state) {
                    _classCallCheck(this, Quad), this.gl = gl, this.vertices = new Float32Array([ -1, -1, 1, -1, 1, 1, -1, 1 ]), 
                    this.uvs = new Float32Array([ 0, 0, 1, 0, 1, 1, 0, 1 ]), this.interleaved = new Float32Array(16);
                    for (var i = 0; i < 4; i++) this.interleaved[4 * i] = this.vertices[2 * i], this.interleaved[4 * i + 1] = this.vertices[2 * i + 1], 
                    this.interleaved[4 * i + 2] = this.uvs[2 * i], this.interleaved[4 * i + 3] = this.uvs[2 * i + 1];
                    this.indices = (0, _createIndicesForQuads2.default)(1), this.vertexBuffer = _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl, this.interleaved, gl.STATIC_DRAW), 
                    this.indexBuffer = _pixiGlCore2.default.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW), 
                    this.vao = new _pixiGlCore2.default.VertexArrayObject(gl, state);
                }
                return Quad.prototype.initVao = function(shader) {
                    this.vao.clear().addIndex(this.indexBuffer).addAttribute(this.vertexBuffer, shader.attributes.aVertexPosition, this.gl.FLOAT, !1, 16, 0).addAttribute(this.vertexBuffer, shader.attributes.aTextureCoord, this.gl.FLOAT, !1, 16, 8);
                }, Quad.prototype.map = function(targetTextureFrame, destinationFrame) {
                    var x = 0, y = 0;
                    return this.uvs[0] = x, this.uvs[1] = y, this.uvs[2] = x + destinationFrame.width / targetTextureFrame.width, 
                    this.uvs[3] = y, this.uvs[4] = x + destinationFrame.width / targetTextureFrame.width, 
                    this.uvs[5] = y + destinationFrame.height / targetTextureFrame.height, this.uvs[6] = x, 
                    this.uvs[7] = y + destinationFrame.height / targetTextureFrame.height, x = destinationFrame.x, 
                    y = destinationFrame.y, this.vertices[0] = x, this.vertices[1] = y, this.vertices[2] = x + destinationFrame.width, 
                    this.vertices[3] = y, this.vertices[4] = x + destinationFrame.width, this.vertices[5] = y + destinationFrame.height, 
                    this.vertices[6] = x, this.vertices[7] = y + destinationFrame.height, this;
                }, Quad.prototype.upload = function() {
                    for (var i = 0; i < 4; i++) this.interleaved[4 * i] = this.vertices[2 * i], this.interleaved[4 * i + 1] = this.vertices[2 * i + 1], 
                    this.interleaved[4 * i + 2] = this.uvs[2 * i], this.interleaved[4 * i + 3] = this.uvs[2 * i + 1];
                    return this.vertexBuffer.upload(this.interleaved), this;
                }, Quad.prototype.destroy = function() {
                    var gl = this.gl;
                    gl.deleteBuffer(this.vertexBuffer), gl.deleteBuffer(this.indexBuffer);
                }, Quad;
            }();
            exports.default = Quad;
        }, {
            "../../../utils/createIndicesForQuads": 122,
            "pixi-gl-core": 15
        } ],
        96: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _math = require("../../../math"), _const = require("../../../const"), _settings2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../../../settings")), _pixiGlCore = require("pixi-gl-core"), RenderTarget = function() {
                function RenderTarget(gl, width, height, scaleMode, resolution, root) {
                    _classCallCheck(this, RenderTarget), this.gl = gl, this.frameBuffer = null, this.texture = null, 
                    this.clearColor = [ 0, 0, 0, 0 ], this.size = new _math.Rectangle(0, 0, 1, 1), this.resolution = resolution || _settings2.default.RESOLUTION, 
                    this.projectionMatrix = new _math.Matrix(), this.transform = null, this.frame = null, 
                    this.defaultFrame = new _math.Rectangle(), this.destinationFrame = null, this.sourceFrame = null, 
                    this.stencilBuffer = null, this.stencilMaskStack = [], this.filterData = null, this.scaleMode = void 0 !== scaleMode ? scaleMode : _settings2.default.SCALE_MODE, 
                    this.root = root, this.root ? (this.frameBuffer = new _pixiGlCore.GLFramebuffer(gl, 100, 100), 
                    this.frameBuffer.framebuffer = null) : (this.frameBuffer = _pixiGlCore.GLFramebuffer.createRGBA(gl, 100, 100), 
                    this.scaleMode === _const.SCALE_MODES.NEAREST ? this.frameBuffer.texture.enableNearestScaling() : this.frameBuffer.texture.enableLinearScaling(), 
                    this.texture = this.frameBuffer.texture), this.setFrame(), this.resize(width, height);
                }
                return RenderTarget.prototype.clear = function(clearColor) {
                    var cc = clearColor || this.clearColor;
                    this.frameBuffer.clear(cc[0], cc[1], cc[2], cc[3]);
                }, RenderTarget.prototype.attachStencilBuffer = function() {
                    this.root || this.frameBuffer.enableStencil();
                }, RenderTarget.prototype.setFrame = function(destinationFrame, sourceFrame) {
                    this.destinationFrame = destinationFrame || this.destinationFrame || this.defaultFrame, 
                    this.sourceFrame = sourceFrame || this.sourceFrame || this.destinationFrame;
                }, RenderTarget.prototype.activate = function() {
                    var gl = this.gl;
                    this.frameBuffer.bind(), this.calculateProjection(this.destinationFrame, this.sourceFrame), 
                    this.transform && this.projectionMatrix.append(this.transform), this.destinationFrame !== this.sourceFrame ? (gl.enable(gl.SCISSOR_TEST), 
                    gl.scissor(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)) : gl.disable(gl.SCISSOR_TEST), 
                    gl.viewport(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0);
                }, RenderTarget.prototype.calculateProjection = function(destinationFrame, sourceFrame) {
                    var pm = this.projectionMatrix;
                    sourceFrame = sourceFrame || destinationFrame, pm.identity(), this.root ? (pm.a = 1 / destinationFrame.width * 2, 
                    pm.d = -1 / destinationFrame.height * 2, pm.tx = -1 - sourceFrame.x * pm.a, pm.ty = 1 - sourceFrame.y * pm.d) : (pm.a = 1 / destinationFrame.width * 2, 
                    pm.d = 1 / destinationFrame.height * 2, pm.tx = -1 - sourceFrame.x * pm.a, pm.ty = -1 - sourceFrame.y * pm.d);
                }, RenderTarget.prototype.resize = function(width, height) {
                    if (width |= 0, height |= 0, this.size.width !== width || this.size.height !== height) {
                        this.size.width = width, this.size.height = height, this.defaultFrame.width = width, 
                        this.defaultFrame.height = height, this.frameBuffer.resize(width * this.resolution, height * this.resolution);
                        var projectionFrame = this.frame || this.size;
                        this.calculateProjection(projectionFrame);
                    }
                }, RenderTarget.prototype.destroy = function() {
                    this.frameBuffer.destroy(), this.frameBuffer = null, this.texture = null;
                }, RenderTarget;
            }();
            exports.default = RenderTarget;
        }, {
            "../../../const": 46,
            "../../../math": 70,
            "../../../settings": 101,
            "pixi-gl-core": 15
        } ],
        97: [ function(require, module, exports) {
            "use strict";
            function generateIfTestSrc(maxIfs) {
                for (var src = "", i = 0; i < maxIfs; ++i) i > 0 && (src += "\nelse "), i < maxIfs - 1 && (src += "if(test == " + i + ".0){}");
                return src;
            }
            exports.__esModule = !0, exports.default = function(maxIfs, gl) {
                var createTempContext = !gl;
                if (0 === maxIfs) throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
                if (createTempContext) {
                    var tinyCanvas = document.createElement("canvas");
                    tinyCanvas.width = 1, tinyCanvas.height = 1, gl = _pixiGlCore2.default.createContext(tinyCanvas);
                }
                for (var shader = gl.createShader(gl.FRAGMENT_SHADER); ;) {
                    var fragmentSrc = fragTemplate.replace(/%forloop%/gi, generateIfTestSrc(maxIfs));
                    if (gl.shaderSource(shader, fragmentSrc), gl.compileShader(shader), gl.getShaderParameter(shader, gl.COMPILE_STATUS)) break;
                    maxIfs = maxIfs / 2 | 0;
                }
                return createTempContext && gl.getExtension("WEBGL_lose_context") && gl.getExtension("WEBGL_lose_context").loseContext(), 
                maxIfs;
            };
            var _pixiGlCore2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("pixi-gl-core")), fragTemplate = [ "precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}" ].join("\n");
        }, {
            "pixi-gl-core": 15
        } ],
        98: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(gl) {
                var array = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                return array[_const.BLEND_MODES.NORMAL] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], array[_const.BLEND_MODES.ADD] = [ gl.ONE, gl.DST_ALPHA ], 
                array[_const.BLEND_MODES.MULTIPLY] = [ gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA ], array[_const.BLEND_MODES.SCREEN] = [ gl.ONE, gl.ONE_MINUS_SRC_COLOR ], 
                array[_const.BLEND_MODES.OVERLAY] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], array[_const.BLEND_MODES.DARKEN] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], 
                array[_const.BLEND_MODES.LIGHTEN] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], array[_const.BLEND_MODES.COLOR_DODGE] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], 
                array[_const.BLEND_MODES.COLOR_BURN] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], array[_const.BLEND_MODES.HARD_LIGHT] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], 
                array[_const.BLEND_MODES.SOFT_LIGHT] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], array[_const.BLEND_MODES.DIFFERENCE] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], 
                array[_const.BLEND_MODES.EXCLUSION] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], array[_const.BLEND_MODES.HUE] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], 
                array[_const.BLEND_MODES.SATURATION] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], array[_const.BLEND_MODES.COLOR] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], 
                array[_const.BLEND_MODES.LUMINOSITY] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], array[_const.BLEND_MODES.NORMAL_NPM] = [ gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA ], 
                array[_const.BLEND_MODES.ADD_NPM] = [ gl.SRC_ALPHA, gl.DST_ALPHA, gl.ONE, gl.DST_ALPHA ], 
                array[_const.BLEND_MODES.SCREEN_NPM] = [ gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_COLOR ], 
                array;
            };
            var _const = require("../../../const");
        }, {
            "../../../const": 46
        } ],
        99: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(gl) {
                var object = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return object[_const.DRAW_MODES.POINTS] = gl.POINTS, object[_const.DRAW_MODES.LINES] = gl.LINES, 
                object[_const.DRAW_MODES.LINE_LOOP] = gl.LINE_LOOP, object[_const.DRAW_MODES.LINE_STRIP] = gl.LINE_STRIP, 
                object[_const.DRAW_MODES.TRIANGLES] = gl.TRIANGLES, object[_const.DRAW_MODES.TRIANGLE_STRIP] = gl.TRIANGLE_STRIP, 
                object[_const.DRAW_MODES.TRIANGLE_FAN] = gl.TRIANGLE_FAN, object;
            };
            var _const = require("../../../const");
        }, {
            "../../../const": 46
        } ],
        100: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(gl) {
                gl.getContextAttributes().stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
            };
        }, {} ],
        101: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0;
            var _maxRecommendedTextures2 = _interopRequireDefault(require("./utils/maxRecommendedTextures")), _canUploadSameBuffer2 = _interopRequireDefault(require("./utils/canUploadSameBuffer"));
            exports.default = {
                TARGET_FPMS: .06,
                MIPMAP_TEXTURES: !0,
                RESOLUTION: 1,
                FILTER_RESOLUTION: 1,
                SPRITE_MAX_TEXTURES: (0, _maxRecommendedTextures2.default)(32),
                SPRITE_BATCH_SIZE: 4096,
                RETINA_PREFIX: /@([0-9\.]+)x/,
                RENDER_OPTIONS: {
                    view: null,
                    antialias: !1,
                    forceFXAA: !1,
                    autoResize: !1,
                    transparent: !1,
                    backgroundColor: 0,
                    clearBeforeRender: !0,
                    preserveDrawingBuffer: !1,
                    roundPixels: !1,
                    width: 800,
                    height: 600,
                    legacy: !1
                },
                TRANSFORM_MODE: 0,
                GC_MODE: 0,
                GC_MAX_IDLE: 3600,
                GC_MAX_CHECK_COUNT: 600,
                WRAP_MODE: 0,
                SCALE_MODE: 0,
                PRECISION_VERTEX: "highp",
                PRECISION_FRAGMENT: "mediump",
                CAN_UPLOAD_SAME_BUFFER: (0, _canUploadSameBuffer2.default)()
            };
        }, {
            "./utils/canUploadSameBuffer": 121,
            "./utils/maxRecommendedTextures": 126
        } ],
        102: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _math = require("../math"), _utils = require("../utils"), _const = require("../const"), _Texture2 = _interopRequireDefault(require("../textures/Texture")), _Container3 = _interopRequireDefault(require("../display/Container")), tempPoint = new _math.Point(), Sprite = function(_Container) {
                function Sprite(texture) {
                    _classCallCheck(this, Sprite);
                    var _this = _possibleConstructorReturn(this, _Container.call(this));
                    return _this._anchor = new _math.ObservablePoint(_this._onAnchorUpdate, _this), 
                    _this._texture = null, _this._width = 0, _this._height = 0, _this._tint = null, 
                    _this._tintRGB = null, _this.tint = 16777215, _this.blendMode = _const.BLEND_MODES.NORMAL, 
                    _this.shader = null, _this.cachedTint = 16777215, _this.texture = texture || _Texture2.default.EMPTY, 
                    _this.vertexData = new Float32Array(8), _this.vertexTrimmedData = null, _this._transformID = -1, 
                    _this._textureID = -1, _this._transformTrimmedID = -1, _this._textureTrimmedID = -1, 
                    _this.pluginName = "sprite", _this;
                }
                return _inherits(Sprite, _Container), Sprite.prototype._onTextureUpdate = function() {
                    this._textureID = -1, this._textureTrimmedID = -1, this._width && (this.scale.x = (0, 
                    _utils.sign)(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = (0, 
                    _utils.sign)(this.scale.y) * this._height / this._texture.orig.height);
                }, Sprite.prototype._onAnchorUpdate = function() {
                    this._transformID = -1, this._transformTrimmedID = -1;
                }, Sprite.prototype.calculateVertices = function() {
                    if (this._transformID !== this.transform._worldID || this._textureID !== this._texture._updateID) {
                        this._transformID = this.transform._worldID, this._textureID = this._texture._updateID;
                        var texture = this._texture, wt = this.transform.worldTransform, a = wt.a, b = wt.b, c = wt.c, d = wt.d, tx = wt.tx, ty = wt.ty, vertexData = this.vertexData, trim = texture.trim, orig = texture.orig, anchor = this._anchor, w0 = 0, w1 = 0, h0 = 0, h1 = 0;
                        trim ? (w0 = (w1 = trim.x - anchor._x * orig.width) + trim.width, h0 = (h1 = trim.y - anchor._y * orig.height) + trim.height) : (w0 = (w1 = -anchor._x * orig.width) + orig.width, 
                        h0 = (h1 = -anchor._y * orig.height) + orig.height), vertexData[0] = a * w1 + c * h1 + tx, 
                        vertexData[1] = d * h1 + b * w1 + ty, vertexData[2] = a * w0 + c * h1 + tx, vertexData[3] = d * h1 + b * w0 + ty, 
                        vertexData[4] = a * w0 + c * h0 + tx, vertexData[5] = d * h0 + b * w0 + ty, vertexData[6] = a * w1 + c * h0 + tx, 
                        vertexData[7] = d * h0 + b * w1 + ty;
                    }
                }, Sprite.prototype.calculateTrimmedVertices = function() {
                    if (this.vertexTrimmedData) {
                        if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID) return;
                    } else this.vertexTrimmedData = new Float32Array(8);
                    this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
                    var texture = this._texture, vertexData = this.vertexTrimmedData, orig = texture.orig, anchor = this._anchor, wt = this.transform.worldTransform, a = wt.a, b = wt.b, c = wt.c, d = wt.d, tx = wt.tx, ty = wt.ty, w1 = -anchor._x * orig.width, w0 = w1 + orig.width, h1 = -anchor._y * orig.height, h0 = h1 + orig.height;
                    vertexData[0] = a * w1 + c * h1 + tx, vertexData[1] = d * h1 + b * w1 + ty, vertexData[2] = a * w0 + c * h1 + tx, 
                    vertexData[3] = d * h1 + b * w0 + ty, vertexData[4] = a * w0 + c * h0 + tx, vertexData[5] = d * h0 + b * w0 + ty, 
                    vertexData[6] = a * w1 + c * h0 + tx, vertexData[7] = d * h0 + b * w1 + ty;
                }, Sprite.prototype._renderWebGL = function(renderer) {
                    this.calculateVertices(), renderer.setObjectRenderer(renderer.plugins[this.pluginName]), 
                    renderer.plugins[this.pluginName].render(this);
                }, Sprite.prototype._renderCanvas = function(renderer) {
                    renderer.plugins[this.pluginName].render(this);
                }, Sprite.prototype._calculateBounds = function() {
                    var trim = this._texture.trim, orig = this._texture.orig;
                    !trim || trim.width === orig.width && trim.height === orig.height ? (this.calculateVertices(), 
                    this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData));
                }, Sprite.prototype.getLocalBounds = function(rect) {
                    return 0 === this.children.length ? (this._bounds.minX = this._texture.orig.width * -this._anchor._x, 
                    this._bounds.minY = this._texture.orig.height * -this._anchor._y, this._bounds.maxX = this._texture.orig.width * (1 - this._anchor._x), 
                    this._bounds.maxY = this._texture.orig.height * (1 - this._anchor._x), rect || (this._localBoundsRect || (this._localBoundsRect = new _math.Rectangle()), 
                    rect = this._localBoundsRect), this._bounds.getRectangle(rect)) : _Container.prototype.getLocalBounds.call(this, rect);
                }, Sprite.prototype.containsPoint = function(point) {
                    this.worldTransform.applyInverse(point, tempPoint);
                    var width = this._texture.orig.width, height = this._texture.orig.height, x1 = -width * this.anchor.x, y1 = 0;
                    return tempPoint.x >= x1 && tempPoint.x < x1 + width && (y1 = -height * this.anchor.y, 
                    tempPoint.y >= y1 && tempPoint.y < y1 + height);
                }, Sprite.prototype.destroy = function(options) {
                    if (_Container.prototype.destroy.call(this, options), this._anchor = null, "boolean" == typeof options ? options : options && options.texture) {
                        var destroyBaseTexture = "boolean" == typeof options ? options : options && options.baseTexture;
                        this._texture.destroy(!!destroyBaseTexture);
                    }
                    this._texture = null, this.shader = null;
                }, Sprite.from = function(source) {
                    return new Sprite(_Texture2.default.from(source));
                }, Sprite.fromFrame = function(frameId) {
                    var texture = _utils.TextureCache[frameId];
                    if (!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache');
                    return new Sprite(texture);
                }, Sprite.fromImage = function(imageId, crossorigin, scaleMode) {
                    return new Sprite(_Texture2.default.fromImage(imageId, crossorigin, scaleMode));
                }, _createClass(Sprite, [ {
                    key: "width",
                    get: function() {
                        return Math.abs(this.scale.x) * this._texture.orig.width;
                    },
                    set: function(value) {
                        var s = (0, _utils.sign)(this.scale.x) || 1;
                        this.scale.x = s * value / this._texture.orig.width, this._width = value;
                    }
                }, {
                    key: "height",
                    get: function() {
                        return Math.abs(this.scale.y) * this._texture.orig.height;
                    },
                    set: function(value) {
                        var s = (0, _utils.sign)(this.scale.y) || 1;
                        this.scale.y = s * value / this._texture.orig.height, this._height = value;
                    }
                }, {
                    key: "anchor",
                    get: function() {
                        return this._anchor;
                    },
                    set: function(value) {
                        this._anchor.copy(value);
                    }
                }, {
                    key: "tint",
                    get: function() {
                        return this._tint;
                    },
                    set: function(value) {
                        this._tint = value, this._tintRGB = (value >> 16) + (65280 & value) + ((255 & value) << 16);
                    }
                }, {
                    key: "texture",
                    get: function() {
                        return this._texture;
                    },
                    set: function(value) {
                        this._texture !== value && (this._texture = value, this.cachedTint = 16777215, this._textureID = -1, 
                        this._textureTrimmedID = -1, value && (value.baseTexture.hasLoaded ? this._onTextureUpdate() : value.once("update", this._onTextureUpdate, this)));
                    }
                } ]), Sprite;
            }(_Container3.default);
            exports.default = Sprite;
        }, {
            "../const": 46,
            "../display/Container": 48,
            "../math": 70,
            "../textures/Texture": 115,
            "../utils": 124
        } ],
        103: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _CanvasRenderer2 = _interopRequireDefault(require("../../renderers/canvas/CanvasRenderer")), _const = require("../../const"), _math = require("../../math"), _CanvasTinter2 = _interopRequireDefault(require("./CanvasTinter")), canvasRenderWorldTransform = new _math.Matrix(), CanvasSpriteRenderer = function() {
                function CanvasSpriteRenderer(renderer) {
                    _classCallCheck(this, CanvasSpriteRenderer), this.renderer = renderer;
                }
                return CanvasSpriteRenderer.prototype.render = function(sprite) {
                    var texture = sprite._texture, renderer = this.renderer, width = texture._frame.width, height = texture._frame.height, wt = sprite.transform.worldTransform, dx = 0, dy = 0;
                    if (!(texture.orig.width <= 0 || texture.orig.height <= 0) && texture.baseTexture.source && (renderer.setBlendMode(sprite.blendMode), 
                    texture.valid)) {
                        renderer.context.globalAlpha = sprite.worldAlpha;
                        var smoothingEnabled = texture.baseTexture.scaleMode === _const.SCALE_MODES.LINEAR;
                        renderer.smoothProperty && renderer.context[renderer.smoothProperty] !== smoothingEnabled && (renderer.context[renderer.smoothProperty] = smoothingEnabled), 
                        texture.trim ? (dx = texture.trim.width / 2 + texture.trim.x - sprite.anchor.x * texture.orig.width, 
                        dy = texture.trim.height / 2 + texture.trim.y - sprite.anchor.y * texture.orig.height) : (dx = (.5 - sprite.anchor.x) * texture.orig.width, 
                        dy = (.5 - sprite.anchor.y) * texture.orig.height), texture.rotate && (wt.copy(canvasRenderWorldTransform), 
                        wt = canvasRenderWorldTransform, _math.GroupD8.matrixAppendRotationInv(wt, texture.rotate, dx, dy), 
                        dx = 0, dy = 0), dx -= width / 2, dy -= height / 2, renderer.roundPixels ? (renderer.context.setTransform(wt.a, wt.b, wt.c, wt.d, wt.tx * renderer.resolution | 0, wt.ty * renderer.resolution | 0), 
                        dx |= 0, dy |= 0) : renderer.context.setTransform(wt.a, wt.b, wt.c, wt.d, wt.tx * renderer.resolution, wt.ty * renderer.resolution);
                        var resolution = texture.baseTexture.resolution;
                        16777215 !== sprite.tint ? (sprite.cachedTint === sprite.tint && sprite.tintedTexture.tintId === sprite._texture._updateID || (sprite.cachedTint = sprite.tint, 
                        sprite.tintedTexture = _CanvasTinter2.default.getTintedTexture(sprite, sprite.tint)), 
                        renderer.context.drawImage(sprite.tintedTexture, 0, 0, width * resolution, height * resolution, dx * renderer.resolution, dy * renderer.resolution, width * renderer.resolution, height * renderer.resolution)) : renderer.context.drawImage(texture.baseTexture.source, texture._frame.x * resolution, texture._frame.y * resolution, width * resolution, height * resolution, dx * renderer.resolution, dy * renderer.resolution, width * renderer.resolution, height * renderer.resolution);
                    }
                }, CanvasSpriteRenderer.prototype.destroy = function() {
                    this.renderer = null;
                }, CanvasSpriteRenderer;
            }();
            exports.default = CanvasSpriteRenderer, _CanvasRenderer2.default.registerPlugin("sprite", CanvasSpriteRenderer);
        }, {
            "../../const": 46,
            "../../math": 70,
            "../../renderers/canvas/CanvasRenderer": 77,
            "./CanvasTinter": 104
        } ],
        104: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0;
            var _utils = require("../../utils"), CanvasTinter = {
                getTintedTexture: function(sprite, color) {
                    var texture = sprite._texture, stringColor = "#" + ("00000" + (0 | (color = CanvasTinter.roundColor(color))).toString(16)).substr(-6);
                    texture.tintCache = texture.tintCache || {};
                    var cachedTexture = texture.tintCache[stringColor], canvas = void 0;
                    if (cachedTexture) {
                        if (cachedTexture.tintId === texture._updateID) return texture.tintCache[stringColor];
                        canvas = texture.tintCache[stringColor];
                    } else canvas = CanvasTinter.canvas || document.createElement("canvas");
                    if (CanvasTinter.tintMethod(texture, color, canvas), canvas.tintId = texture._updateID, 
                    CanvasTinter.convertTintToImage) {
                        var tintImage = new Image();
                        tintImage.src = canvas.toDataURL(), texture.tintCache[stringColor] = tintImage;
                    } else texture.tintCache[stringColor] = canvas, CanvasTinter.canvas = null;
                    return canvas;
                },
                tintWithMultiply: function(texture, color, canvas) {
                    var context = canvas.getContext("2d"), crop = texture._frame.clone(), resolution = texture.baseTexture.resolution;
                    crop.x *= resolution, crop.y *= resolution, crop.width *= resolution, crop.height *= resolution, 
                    canvas.width = Math.ceil(crop.width), canvas.height = Math.ceil(crop.height), context.fillStyle = "#" + ("00000" + (0 | color).toString(16)).substr(-6), 
                    context.fillRect(0, 0, crop.width, crop.height), context.globalCompositeOperation = "multiply", 
                    context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height), 
                    context.globalCompositeOperation = "destination-atop", context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
                },
                tintWithOverlay: function(texture, color, canvas) {
                    var context = canvas.getContext("2d"), crop = texture._frame.clone(), resolution = texture.baseTexture.resolution;
                    crop.x *= resolution, crop.y *= resolution, crop.width *= resolution, crop.height *= resolution, 
                    canvas.width = Math.ceil(crop.width), canvas.height = Math.ceil(crop.height), context.globalCompositeOperation = "copy", 
                    context.fillStyle = "#" + ("00000" + (0 | color).toString(16)).substr(-6), context.fillRect(0, 0, crop.width, crop.height), 
                    context.globalCompositeOperation = "destination-atop", context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
                },
                tintWithPerPixel: function(texture, color, canvas) {
                    var context = canvas.getContext("2d"), crop = texture._frame.clone(), resolution = texture.baseTexture.resolution;
                    crop.x *= resolution, crop.y *= resolution, crop.width *= resolution, crop.height *= resolution, 
                    canvas.width = Math.ceil(crop.width), canvas.height = Math.ceil(crop.height), context.globalCompositeOperation = "copy", 
                    context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
                    for (var rgbValues = (0, _utils.hex2rgb)(color), r = rgbValues[0], g = rgbValues[1], b = rgbValues[2], pixelData = context.getImageData(0, 0, crop.width, crop.height), pixels = pixelData.data, i = 0; i < pixels.length; i += 4) pixels[i + 0] *= r, 
                    pixels[i + 1] *= g, pixels[i + 2] *= b;
                    context.putImageData(pixelData, 0, 0);
                },
                roundColor: function(color) {
                    var step = CanvasTinter.cacheStepsPerColorChannel, rgbValues = (0, _utils.hex2rgb)(color);
                    return rgbValues[0] = Math.min(255, rgbValues[0] / step * step), rgbValues[1] = Math.min(255, rgbValues[1] / step * step), 
                    rgbValues[2] = Math.min(255, rgbValues[2] / step * step), (0, _utils.rgb2hex)(rgbValues);
                },
                cacheStepsPerColorChannel: 8,
                convertTintToImage: !1,
                canUseMultiply: (0, function(obj) {
                    return obj && obj.__esModule ? obj : {
                        default: obj
                    };
                }(require("../../renderers/canvas/utils/canUseNewCanvasBlendModes")).default)(),
                tintMethod: 0
            };
            CanvasTinter.tintMethod = CanvasTinter.canUseMultiply ? CanvasTinter.tintWithMultiply : CanvasTinter.tintWithPerPixel, 
            exports.default = CanvasTinter;
        }, {
            "../../renderers/canvas/utils/canUseNewCanvasBlendModes": 80,
            "../../utils": 124
        } ],
        105: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var Buffer = function() {
                function Buffer(size) {
                    _classCallCheck(this, Buffer), this.vertices = new ArrayBuffer(size), this.float32View = new Float32Array(this.vertices), 
                    this.uint32View = new Uint32Array(this.vertices);
                }
                return Buffer.prototype.destroy = function() {
                    this.vertices = null, this.positions = null, this.uvs = null, this.colors = null;
                }, Buffer;
            }();
            exports.default = Buffer;
        }, {} ],
        106: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _ObjectRenderer3 = _interopRequireDefault(require("../../renderers/webgl/utils/ObjectRenderer")), _WebGLRenderer2 = _interopRequireDefault(require("../../renderers/webgl/WebGLRenderer")), _createIndicesForQuads2 = _interopRequireDefault(require("../../utils/createIndicesForQuads")), _generateMultiTextureShader2 = _interopRequireDefault(require("./generateMultiTextureShader")), _checkMaxIfStatmentsInShader2 = _interopRequireDefault(require("../../renderers/webgl/utils/checkMaxIfStatmentsInShader")), _BatchBuffer2 = _interopRequireDefault(require("./BatchBuffer")), _settings2 = _interopRequireDefault(require("../../settings")), _utils = require("../../utils"), _pixiGlCore2 = _interopRequireDefault(require("pixi-gl-core")), _bitTwiddle2 = _interopRequireDefault(require("bit-twiddle")), TICK = 0, TEXTURE_TICK = 0, SpriteRenderer = function(_ObjectRenderer) {
                function SpriteRenderer(renderer) {
                    _classCallCheck(this, SpriteRenderer);
                    var _this = _possibleConstructorReturn(this, _ObjectRenderer.call(this, renderer));
                    _this.vertSize = 5, _this.vertByteSize = 4 * _this.vertSize, _this.size = _settings2.default.SPRITE_BATCH_SIZE, 
                    _this.buffers = [];
                    for (var i = 1; i <= _bitTwiddle2.default.nextPow2(_this.size); i *= 2) _this.buffers.push(new _BatchBuffer2.default(4 * i * _this.vertByteSize));
                    _this.indices = (0, _createIndicesForQuads2.default)(_this.size), _this.shader = null, 
                    _this.currentIndex = 0, _this.groups = [];
                    for (var k = 0; k < _this.size; k++) _this.groups[k] = {
                        textures: [],
                        textureCount: 0,
                        ids: [],
                        size: 0,
                        start: 0,
                        blend: 0
                    };
                    return _this.sprites = [], _this.vertexBuffers = [], _this.vaos = [], _this.vaoMax = 2, 
                    _this.vertexCount = 0, _this.renderer.on("prerender", _this.onPrerender, _this), 
                    _this;
                }
                return _inherits(SpriteRenderer, _ObjectRenderer), SpriteRenderer.prototype.onContextChange = function() {
                    var gl = this.renderer.gl;
                    this.renderer.legacy ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), _settings2.default.SPRITE_MAX_TEXTURES), 
                    this.MAX_TEXTURES = (0, _checkMaxIfStatmentsInShader2.default)(this.MAX_TEXTURES, gl)), 
                    this.shader = (0, _generateMultiTextureShader2.default)(gl, this.MAX_TEXTURES), 
                    this.indexBuffer = _pixiGlCore2.default.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW), 
                    this.renderer.bindVao(null);
                    for (var attrs = this.shader.attributes, i = 0; i < this.vaoMax; i++) {
                        var vertexBuffer = this.vertexBuffers[i] = _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl, null, gl.STREAM_DRAW), vao = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(vertexBuffer, attrs.aVertexPosition, gl.FLOAT, !1, this.vertByteSize, 0).addAttribute(vertexBuffer, attrs.aTextureCoord, gl.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(vertexBuffer, attrs.aColor, gl.UNSIGNED_BYTE, !0, this.vertByteSize, 12);
                        attrs.aTextureId && vao.addAttribute(vertexBuffer, attrs.aTextureId, gl.FLOAT, !1, this.vertByteSize, 16), 
                        this.vaos[i] = vao;
                    }
                    this.vao = this.vaos[0], this.currentBlendMode = 99999, this.boundTextures = new Array(this.MAX_TEXTURES);
                }, SpriteRenderer.prototype.onPrerender = function() {
                    this.vertexCount = 0;
                }, SpriteRenderer.prototype.render = function(sprite) {
                    this.currentIndex >= this.size && this.flush(), sprite._texture._uvs && (this.sprites[this.currentIndex++] = sprite);
                }, SpriteRenderer.prototype.flush = function() {
                    if (0 !== this.currentIndex) {
                        var gl = this.renderer.gl, MAX_TEXTURES = this.MAX_TEXTURES, np2 = _bitTwiddle2.default.nextPow2(this.currentIndex), log2 = _bitTwiddle2.default.log2(np2), buffer = this.buffers[log2], sprites = this.sprites, groups = this.groups, float32View = buffer.float32View, uint32View = buffer.uint32View, boundTextures = this.boundTextures, rendererBoundTextures = this.renderer.boundTextures, touch = this.renderer.textureGC.count, index = 0, nextTexture = void 0, currentTexture = void 0, groupCount = 1, textureCount = 0, currentGroup = groups[0], vertexData = void 0, uvs = void 0, blendMode = _utils.premultiplyBlendMode[sprites[0]._texture.baseTexture.premultipliedAlpha ? 1 : 0][sprites[0].blendMode];
                        currentGroup.textureCount = 0, currentGroup.start = 0, currentGroup.blend = blendMode, 
                        TICK++;
                        var i = void 0;
                        for (i = 0; i < MAX_TEXTURES; ++i) boundTextures[i] = rendererBoundTextures[i], 
                        boundTextures[i]._virtalBoundId = i;
                        for (i = 0; i < this.currentIndex; ++i) {
                            var sprite = sprites[i];
                            nextTexture = sprite._texture.baseTexture;
                            var spriteBlendMode = _utils.premultiplyBlendMode[Number(nextTexture.premultipliedAlpha)][sprite.blendMode];
                            if (blendMode !== spriteBlendMode && (blendMode = spriteBlendMode, currentTexture = null, 
                            textureCount = MAX_TEXTURES, TICK++), currentTexture !== nextTexture && (currentTexture = nextTexture, 
                            nextTexture._enabled !== TICK)) {
                                if (textureCount === MAX_TEXTURES && (TICK++, currentGroup.size = i - currentGroup.start, 
                                textureCount = 0, (currentGroup = groups[groupCount++]).blend = blendMode, currentGroup.textureCount = 0, 
                                currentGroup.start = i), nextTexture.touched = touch, -1 === nextTexture._virtalBoundId) for (var j = 0; j < MAX_TEXTURES; ++j) {
                                    var tIndex = (j + TEXTURE_TICK) % MAX_TEXTURES, t = boundTextures[tIndex];
                                    if (t._enabled !== TICK) {
                                        TEXTURE_TICK++, t._virtalBoundId = -1, nextTexture._virtalBoundId = tIndex, boundTextures[tIndex] = nextTexture;
                                        break;
                                    }
                                }
                                nextTexture._enabled = TICK, currentGroup.textureCount++, currentGroup.ids[textureCount] = nextTexture._virtalBoundId, 
                                currentGroup.textures[textureCount++] = nextTexture;
                            }
                            if (vertexData = sprite.vertexData, uvs = sprite._texture._uvs.uvsUint32, this.renderer.roundPixels) {
                                var resolution = this.renderer.resolution;
                                float32View[index] = (vertexData[0] * resolution | 0) / resolution, float32View[index + 1] = (vertexData[1] * resolution | 0) / resolution, 
                                float32View[index + 5] = (vertexData[2] * resolution | 0) / resolution, float32View[index + 6] = (vertexData[3] * resolution | 0) / resolution, 
                                float32View[index + 10] = (vertexData[4] * resolution | 0) / resolution, float32View[index + 11] = (vertexData[5] * resolution | 0) / resolution, 
                                float32View[index + 15] = (vertexData[6] * resolution | 0) / resolution, float32View[index + 16] = (vertexData[7] * resolution | 0) / resolution;
                            } else float32View[index] = vertexData[0], float32View[index + 1] = vertexData[1], 
                            float32View[index + 5] = vertexData[2], float32View[index + 6] = vertexData[3], 
                            float32View[index + 10] = vertexData[4], float32View[index + 11] = vertexData[5], 
                            float32View[index + 15] = vertexData[6], float32View[index + 16] = vertexData[7];
                            uint32View[index + 2] = uvs[0], uint32View[index + 7] = uvs[1], uint32View[index + 12] = uvs[2], 
                            uint32View[index + 17] = uvs[3];
                            var alpha = Math.min(sprite.worldAlpha, 1), argb = alpha < 1 && nextTexture.premultipliedAlpha ? (0, 
                            _utils.premultiplyTint)(sprite._tintRGB, alpha) : sprite._tintRGB + (255 * alpha << 24);
                            uint32View[index + 3] = uint32View[index + 8] = uint32View[index + 13] = uint32View[index + 18] = argb, 
                            float32View[index + 4] = float32View[index + 9] = float32View[index + 14] = float32View[index + 19] = nextTexture._virtalBoundId, 
                            index += 20;
                        }
                        if (currentGroup.size = i - currentGroup.start, _settings2.default.CAN_UPLOAD_SAME_BUFFER) this.vertexBuffers[this.vertexCount].upload(buffer.vertices, 0, !0); else {
                            if (this.vaoMax <= this.vertexCount) {
                                this.vaoMax++;
                                var attrs = this.shader.attributes, vertexBuffer = this.vertexBuffers[this.vertexCount] = _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl, null, gl.STREAM_DRAW), vao = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(vertexBuffer, attrs.aVertexPosition, gl.FLOAT, !1, this.vertByteSize, 0).addAttribute(vertexBuffer, attrs.aTextureCoord, gl.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(vertexBuffer, attrs.aColor, gl.UNSIGNED_BYTE, !0, this.vertByteSize, 12);
                                attrs.aTextureId && vao.addAttribute(vertexBuffer, attrs.aTextureId, gl.FLOAT, !1, this.vertByteSize, 16), 
                                this.vaos[this.vertexCount] = vao;
                            }
                            this.renderer.bindVao(this.vaos[this.vertexCount]), this.vertexBuffers[this.vertexCount].upload(buffer.vertices, 0, !1), 
                            this.vertexCount++;
                        }
                        for (i = 0; i < MAX_TEXTURES; ++i) rendererBoundTextures[i]._virtalBoundId = -1;
                        for (i = 0; i < groupCount; ++i) {
                            for (var group = groups[i], groupTextureCount = group.textureCount, _j = 0; _j < groupTextureCount; _j++) currentTexture = group.textures[_j], 
                            rendererBoundTextures[group.ids[_j]] !== currentTexture && this.renderer.bindTexture(currentTexture, group.ids[_j], !0), 
                            currentTexture._virtalBoundId = -1;
                            this.renderer.state.setBlendMode(group.blend), gl.drawElements(gl.TRIANGLES, 6 * group.size, gl.UNSIGNED_SHORT, 6 * group.start * 2);
                        }
                        this.currentIndex = 0;
                    }
                }, SpriteRenderer.prototype.start = function() {
                    this.renderer.bindShader(this.shader), _settings2.default.CAN_UPLOAD_SAME_BUFFER && (this.renderer.bindVao(this.vaos[this.vertexCount]), 
                    this.vertexBuffers[this.vertexCount].bind());
                }, SpriteRenderer.prototype.stop = function() {
                    this.flush();
                }, SpriteRenderer.prototype.destroy = function() {
                    for (var i = 0; i < this.vaoMax; i++) this.vertexBuffers[i] && this.vertexBuffers[i].destroy(), 
                    this.vaos[i] && this.vaos[i].destroy();
                    this.indexBuffer && this.indexBuffer.destroy(), this.renderer.off("prerender", this.onPrerender, this), 
                    _ObjectRenderer.prototype.destroy.call(this), this.shader && (this.shader.destroy(), 
                    this.shader = null), this.vertexBuffers = null, this.vaos = null, this.indexBuffer = null, 
                    this.indices = null, this.sprites = null;
                    for (var _i = 0; _i < this.buffers.length; ++_i) this.buffers[_i].destroy();
                }, SpriteRenderer;
            }(_ObjectRenderer3.default);
            exports.default = SpriteRenderer, _WebGLRenderer2.default.registerPlugin("sprite", SpriteRenderer);
        }, {
            "../../renderers/webgl/WebGLRenderer": 84,
            "../../renderers/webgl/utils/ObjectRenderer": 94,
            "../../renderers/webgl/utils/checkMaxIfStatmentsInShader": 97,
            "../../settings": 101,
            "../../utils": 124,
            "../../utils/createIndicesForQuads": 122,
            "./BatchBuffer": 105,
            "./generateMultiTextureShader": 107,
            "bit-twiddle": 1,
            "pixi-gl-core": 15
        } ],
        107: [ function(require, module, exports) {
            "use strict";
            function generateSampleSrc(maxTextures) {
                var src = "";
                src += "\n", src += "\n";
                for (var i = 0; i < maxTextures; i++) i > 0 && (src += "\nelse "), i < maxTextures - 1 && (src += "if(textureId == " + i + ".0)"), 
                src += "\n{", src += "\n\tcolor = texture2D(uSamplers[" + i + "], vTextureCoord);", 
                src += "\n}";
                return src += "\n", src += "\n";
            }
            exports.__esModule = !0, exports.default = function(gl, maxTextures) {
                var fragmentSrc = fragTemplate;
                fragmentSrc = (fragmentSrc = fragmentSrc.replace(/%count%/gi, maxTextures)).replace(/%forloop%/gi, generateSampleSrc(maxTextures));
                for (var shader = new _Shader2.default(gl, "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor;\n}\n", fragmentSrc), sampleValues = [], i = 0; i < maxTextures; i++) sampleValues[i] = i;
                return shader.bind(), shader.uniforms.uSamplers = sampleValues, shader;
            };
            var _Shader2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../../Shader")), fragTemplate = (require("path"), [ "varying vec2 vTextureCoord;", "varying vec4 vColor;", "varying float vTextureId;", "uniform sampler2D uSamplers[%count%];", "void main(void){", "vec4 color;", "float textureId = floor(vTextureId+0.5);", "%forloop%", "gl_FragColor = color * vColor;", "}" ].join("\n"));
        }, {
            "../../Shader": 44,
            path: 8
        } ],
        108: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _Sprite3 = _interopRequireDefault(require("../sprites/Sprite")), _Texture2 = _interopRequireDefault(require("../textures/Texture")), _math = require("../math"), _utils = require("../utils"), _const = require("../const"), _settings2 = _interopRequireDefault(require("../settings")), _TextStyle2 = _interopRequireDefault(require("./TextStyle")), _TextMetrics2 = _interopRequireDefault(require("./TextMetrics")), _trimCanvas2 = _interopRequireDefault(require("../utils/trimCanvas")), defaultDestroyOptions = {
                texture: !0,
                children: !1,
                baseTexture: !0
            }, Text = function(_Sprite) {
                function Text(text, style, canvas) {
                    _classCallCheck(this, Text), (canvas = canvas || document.createElement("canvas")).width = 3, 
                    canvas.height = 3;
                    var texture = _Texture2.default.fromCanvas(canvas, _settings2.default.SCALE_MODE, "text");
                    texture.orig = new _math.Rectangle(), texture.trim = new _math.Rectangle();
                    var _this = _possibleConstructorReturn(this, _Sprite.call(this, texture));
                    return _Texture2.default.addToCache(_this._texture, _this._texture.baseTexture.textureCacheIds[0]), 
                    _this.canvas = canvas, _this.context = _this.canvas.getContext("2d"), _this.resolution = _settings2.default.RESOLUTION, 
                    _this._text = null, _this._style = null, _this._styleListener = null, _this._font = "", 
                    _this.text = text, _this.style = style, _this.localStyleID = -1, _this;
                }
                return _inherits(Text, _Sprite), Text.prototype.updateText = function(respectDirty) {
                    var style = this._style;
                    if (this.localStyleID !== style.styleID && (this.dirty = !0, this.localStyleID = style.styleID), 
                    this.dirty || !respectDirty) {
                        this._font = this._style.toFontString();
                        var context = this.context, measured = _TextMetrics2.default.measureText(this._text, this._style, this._style.wordWrap, this.canvas), width = measured.width, height = measured.height, lines = measured.lines, lineHeight = measured.lineHeight, lineWidths = measured.lineWidths, maxLineWidth = measured.maxLineWidth, fontProperties = measured.fontProperties;
                        this.canvas.width = Math.ceil((width + 2 * style.padding) * this.resolution), this.canvas.height = Math.ceil((height + 2 * style.padding) * this.resolution), 
                        context.scale(this.resolution, this.resolution), context.clearRect(0, 0, this.canvas.width, this.canvas.height), 
                        context.font = this._font, context.strokeStyle = style.stroke, context.lineWidth = style.strokeThickness, 
                        context.textBaseline = style.textBaseline, context.lineJoin = style.lineJoin, context.miterLimit = style.miterLimit;
                        var linePositionX = void 0, linePositionY = void 0;
                        if (style.dropShadow) {
                            context.fillStyle = style.dropShadowColor, context.globalAlpha = style.dropShadowAlpha, 
                            context.shadowBlur = style.dropShadowBlur, style.dropShadowBlur > 0 && (context.shadowColor = style.dropShadowColor);
                            for (var xShadowOffset = Math.cos(style.dropShadowAngle) * style.dropShadowDistance, yShadowOffset = Math.sin(style.dropShadowAngle) * style.dropShadowDistance, i = 0; i < lines.length; i++) linePositionX = style.strokeThickness / 2, 
                            linePositionY = style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent, 
                            "right" === style.align ? linePositionX += maxLineWidth - lineWidths[i] : "center" === style.align && (linePositionX += (maxLineWidth - lineWidths[i]) / 2), 
                            style.fill && (this.drawLetterSpacing(lines[i], linePositionX + xShadowOffset + style.padding, linePositionY + yShadowOffset + style.padding), 
                            style.stroke && style.strokeThickness && (context.strokeStyle = style.dropShadowColor, 
                            this.drawLetterSpacing(lines[i], linePositionX + xShadowOffset + style.padding, linePositionY + yShadowOffset + style.padding, !0), 
                            context.strokeStyle = style.stroke));
                        }
                        context.shadowBlur = 0, context.globalAlpha = 1, context.fillStyle = this._generateFillStyle(style, lines);
                        for (var _i = 0; _i < lines.length; _i++) linePositionX = style.strokeThickness / 2, 
                        linePositionY = style.strokeThickness / 2 + _i * lineHeight + fontProperties.ascent, 
                        "right" === style.align ? linePositionX += maxLineWidth - lineWidths[_i] : "center" === style.align && (linePositionX += (maxLineWidth - lineWidths[_i]) / 2), 
                        style.stroke && style.strokeThickness && this.drawLetterSpacing(lines[_i], linePositionX + style.padding, linePositionY + style.padding, !0), 
                        style.fill && this.drawLetterSpacing(lines[_i], linePositionX + style.padding, linePositionY + style.padding);
                        this.updateTexture();
                    }
                }, Text.prototype.drawLetterSpacing = function(text, x, y) {
                    var isStroke = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], letterSpacing = this._style.letterSpacing;
                    if (0 !== letterSpacing) for (var characters = String.prototype.split.call(text, ""), currentPosition = x, index = 0, current = ""; index < text.length; ) current = characters[index++], 
                    isStroke ? this.context.strokeText(current, currentPosition, y) : this.context.fillText(current, currentPosition, y), 
                    currentPosition += this.context.measureText(current).width + letterSpacing; else isStroke ? this.context.strokeText(text, x, y) : this.context.fillText(text, x, y);
                }, Text.prototype.updateTexture = function() {
                    var canvas = this.canvas;
                    if (this._style.trim) {
                        var trimmed = (0, _trimCanvas2.default)(canvas);
                        canvas.width = trimmed.width, canvas.height = trimmed.height, this.context.putImageData(trimmed.data, 0, 0);
                    }
                    var texture = this._texture, style = this._style, padding = style.trim ? 0 : style.padding, baseTexture = texture.baseTexture;
                    baseTexture.hasLoaded = !0, baseTexture.resolution = this.resolution, baseTexture.realWidth = canvas.width, 
                    baseTexture.realHeight = canvas.height, baseTexture.width = canvas.width / this.resolution, 
                    baseTexture.height = canvas.height / this.resolution, texture.trim.width = texture._frame.width = canvas.width / this.resolution, 
                    texture.trim.height = texture._frame.height = canvas.height / this.resolution, texture.trim.x = -padding, 
                    texture.trim.y = -padding, texture.orig.width = texture._frame.width - 2 * padding, 
                    texture.orig.height = texture._frame.height - 2 * padding, this._onTextureUpdate(), 
                    baseTexture.emit("update", baseTexture), this.dirty = !1;
                }, Text.prototype.renderWebGL = function(renderer) {
                    this.resolution !== renderer.resolution && (this.resolution = renderer.resolution, 
                    this.dirty = !0), this.updateText(!0), _Sprite.prototype.renderWebGL.call(this, renderer);
                }, Text.prototype._renderCanvas = function(renderer) {
                    this.resolution !== renderer.resolution && (this.resolution = renderer.resolution, 
                    this.dirty = !0), this.updateText(!0), _Sprite.prototype._renderCanvas.call(this, renderer);
                }, Text.prototype.getLocalBounds = function(rect) {
                    return this.updateText(!0), _Sprite.prototype.getLocalBounds.call(this, rect);
                }, Text.prototype._calculateBounds = function() {
                    this.updateText(!0), this.calculateVertices(), this._bounds.addQuad(this.vertexData);
                }, Text.prototype._onStyleChange = function() {
                    this.dirty = !0;
                }, Text.prototype._generateFillStyle = function(style, lines) {
                    if (!Array.isArray(style.fill)) return style.fill;
                    if (navigator.isCocoonJS) return style.fill[0];
                    var gradient = void 0, totalIterations = void 0, currentIteration = void 0, stop = void 0, width = this.canvas.width / this.resolution, height = this.canvas.height / this.resolution, fill = style.fill.slice(), fillGradientStops = style.fillGradientStops.slice();
                    if (!fillGradientStops.length) for (var lengthPlus1 = fill.length + 1, i = 1; i < lengthPlus1; ++i) fillGradientStops.push(i / lengthPlus1);
                    if (fill.unshift(style.fill[0]), fillGradientStops.unshift(0), fill.push(style.fill[style.fill.length - 1]), 
                    fillGradientStops.push(1), style.fillGradientType === _const.TEXT_GRADIENT.LINEAR_VERTICAL) {
                        gradient = this.context.createLinearGradient(width / 2, 0, width / 2, height), totalIterations = (fill.length + 1) * lines.length, 
                        currentIteration = 0;
                        for (var _i2 = 0; _i2 < lines.length; _i2++) {
                            currentIteration += 1;
                            for (var j = 0; j < fill.length; j++) stop = "number" == typeof fillGradientStops[j] ? fillGradientStops[j] / lines.length + _i2 / lines.length : currentIteration / totalIterations, 
                            gradient.addColorStop(stop, fill[j]), currentIteration++;
                        }
                    } else {
                        gradient = this.context.createLinearGradient(0, height / 2, width, height / 2), 
                        totalIterations = fill.length + 1, currentIteration = 1;
                        for (var _i3 = 0; _i3 < fill.length; _i3++) stop = "number" == typeof fillGradientStops[_i3] ? fillGradientStops[_i3] : currentIteration / totalIterations, 
                        gradient.addColorStop(stop, fill[_i3]), currentIteration++;
                    }
                    return gradient;
                }, Text.prototype.destroy = function(options) {
                    "boolean" == typeof options && (options = {
                        children: options
                    }), options = Object.assign({}, defaultDestroyOptions, options), _Sprite.prototype.destroy.call(this, options), 
                    this.context = null, this.canvas = null, this._style = null;
                }, _createClass(Text, [ {
                    key: "width",
                    get: function() {
                        return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width;
                    },
                    set: function(value) {
                        this.updateText(!0);
                        var s = (0, _utils.sign)(this.scale.x) || 1;
                        this.scale.x = s * value / this._texture.orig.width, this._width = value;
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height;
                    },
                    set: function(value) {
                        this.updateText(!0);
                        var s = (0, _utils.sign)(this.scale.y) || 1;
                        this.scale.y = s * value / this._texture.orig.height, this._height = value;
                    }
                }, {
                    key: "style",
                    get: function() {
                        return this._style;
                    },
                    set: function(style) {
                        (style = style || {}) instanceof _TextStyle2.default ? this._style = style : this._style = new _TextStyle2.default(style), 
                        this.localStyleID = -1, this.dirty = !0;
                    }
                }, {
                    key: "text",
                    get: function() {
                        return this._text;
                    },
                    set: function(text) {
                        text = String("" === text || null === text || void 0 === text ? " " : text), this._text !== text && (this._text = text, 
                        this.dirty = !0);
                    }
                } ]), Text;
            }(_Sprite3.default);
            exports.default = Text;
        }, {
            "../const": 46,
            "../math": 70,
            "../settings": 101,
            "../sprites/Sprite": 102,
            "../textures/Texture": 115,
            "../utils": 124,
            "../utils/trimCanvas": 129,
            "./TextMetrics": 109,
            "./TextStyle": 110
        } ],
        109: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var TextMetrics = function() {
                function TextMetrics(text, style, width, height, lines, lineWidths, lineHeight, maxLineWidth, fontProperties) {
                    _classCallCheck(this, TextMetrics), this.text = text, this.style = style, this.width = width, 
                    this.height = height, this.lines = lines, this.lineWidths = lineWidths, this.lineHeight = lineHeight, 
                    this.maxLineWidth = maxLineWidth, this.fontProperties = fontProperties;
                }
                return TextMetrics.measureText = function(text, style, wordWrap) {
                    var canvas = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : TextMetrics._canvas;
                    wordWrap = wordWrap || style.wordWrap;
                    var font = style.toFontString(), fontProperties = TextMetrics.measureFont(font), context = canvas.getContext("2d");
                    context.font = font;
                    for (var lines = (wordWrap ? TextMetrics.wordWrap(text, style, canvas) : text).split(/(?:\r\n|\r|\n)/), lineWidths = new Array(lines.length), maxLineWidth = 0, i = 0; i < lines.length; i++) {
                        var lineWidth = context.measureText(lines[i]).width + (lines[i].length - 1) * style.letterSpacing;
                        lineWidths[i] = lineWidth, maxLineWidth = Math.max(maxLineWidth, lineWidth);
                    }
                    var width = maxLineWidth + style.strokeThickness;
                    style.dropShadow && (width += style.dropShadowDistance);
                    var lineHeight = style.lineHeight || fontProperties.fontSize + style.strokeThickness, height = Math.max(lineHeight, fontProperties.fontSize + style.strokeThickness) + (lines.length - 1) * lineHeight;
                    return style.dropShadow && (height += style.dropShadowDistance), new TextMetrics(text, style, width, height, lines, lineWidths, lineHeight, maxLineWidth, fontProperties);
                }, TextMetrics.wordWrap = function(text, style) {
                    for (var context = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : TextMetrics._canvas).getContext("2d"), result = "", lines = text.split("\n"), wordWrapWidth = style.wordWrapWidth, characterCache = {}, i = 0; i < lines.length; i++) {
                        for (var spaceLeft = wordWrapWidth, words = lines[i].split(" "), j = 0; j < words.length; j++) {
                            var wordWidth = context.measureText(words[j]).width;
                            if (style.breakWords && wordWidth > wordWrapWidth) for (var characters = words[j].split(""), c = 0; c < characters.length; c++) {
                                var character = characters[c], characterWidth = characterCache[character];
                                void 0 === characterWidth && (characterWidth = context.measureText(character).width, 
                                characterCache[character] = characterWidth), characterWidth > spaceLeft ? (result += "\n" + character, 
                                spaceLeft = wordWrapWidth - characterWidth) : (0 === c && (result += " "), result += character, 
                                spaceLeft -= characterWidth);
                            } else {
                                var wordWidthWithSpace = wordWidth + context.measureText(" ").width;
                                0 === j || wordWidthWithSpace > spaceLeft ? (j > 0 && (result += "\n"), result += words[j], 
                                spaceLeft = wordWrapWidth - wordWidth) : (spaceLeft -= wordWidthWithSpace, result += " " + words[j]);
                            }
                        }
                        i < lines.length - 1 && (result += "\n");
                    }
                    return result;
                }, TextMetrics.measureFont = function(font) {
                    if (TextMetrics._fonts[font]) return TextMetrics._fonts[font];
                    var properties = {}, canvas = TextMetrics._canvas, context = TextMetrics._context;
                    context.font = font;
                    var width = Math.ceil(context.measureText("|MÉq").width), baseline = Math.ceil(context.measureText("M").width), height = 2 * baseline;
                    baseline = 1.4 * baseline | 0, canvas.width = width, canvas.height = height, context.fillStyle = "#f00", 
                    context.fillRect(0, 0, width, height), context.font = font, context.textBaseline = "alphabetic", 
                    context.fillStyle = "#000", context.fillText("|MÉq", 0, baseline);
                    var imagedata = context.getImageData(0, 0, width, height).data, pixels = imagedata.length, line = 4 * width, i = 0, idx = 0, stop = !1;
                    for (i = 0; i < baseline; ++i) {
                        for (var j = 0; j < line; j += 4) if (255 !== imagedata[idx + j]) {
                            stop = !0;
                            break;
                        }
                        if (stop) break;
                        idx += line;
                    }
                    for (properties.ascent = baseline - i, idx = pixels - line, stop = !1, i = height; i > baseline; --i) {
                        for (var _j = 0; _j < line; _j += 4) if (255 !== imagedata[idx + _j]) {
                            stop = !0;
                            break;
                        }
                        if (stop) break;
                        idx -= line;
                    }
                    return properties.descent = i - baseline, properties.fontSize = properties.ascent + properties.descent, 
                    TextMetrics._fonts[font] = properties, properties;
                }, TextMetrics;
            }();
            exports.default = TextMetrics;
            var canvas = document.createElement("canvas");
            canvas.width = canvas.height = 10, TextMetrics._canvas = canvas, TextMetrics._context = canvas.getContext("2d"), 
            TextMetrics._fonts = {};
        }, {} ],
        110: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function getSingleColor(color) {
                return "number" == typeof color ? (0, _utils.hex2string)(color) : ("string" == typeof color && 0 === color.indexOf("0x") && (color = color.replace("0x", "#")), 
                color);
            }
            function getColor(color) {
                if (Array.isArray(color)) {
                    for (var i = 0; i < color.length; ++i) color[i] = getSingleColor(color[i]);
                    return color;
                }
                return getSingleColor(color);
            }
            function areArraysEqual(array1, array2) {
                if (!Array.isArray(array1) || !Array.isArray(array2)) return !1;
                if (array1.length !== array2.length) return !1;
                for (var i = 0; i < array1.length; ++i) if (array1[i] !== array2[i]) return !1;
                return !0;
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _const = require("../const"), _utils = require("../utils"), defaultStyle = {
                align: "left",
                breakWords: !1,
                dropShadow: !1,
                dropShadowAlpha: 1,
                dropShadowAngle: Math.PI / 6,
                dropShadowBlur: 0,
                dropShadowColor: "black",
                dropShadowDistance: 5,
                fill: "black",
                fillGradientType: _const.TEXT_GRADIENT.LINEAR_VERTICAL,
                fillGradientStops: [],
                fontFamily: "Arial",
                fontSize: 26,
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: "normal",
                letterSpacing: 0,
                lineHeight: 0,
                lineJoin: "miter",
                miterLimit: 10,
                padding: 0,
                stroke: "black",
                strokeThickness: 0,
                textBaseline: "alphabetic",
                trim: !1,
                wordWrap: !1,
                wordWrapWidth: 100
            }, TextStyle = function() {
                function TextStyle(style) {
                    _classCallCheck(this, TextStyle), this.styleID = 0, Object.assign(this, defaultStyle, style);
                }
                return TextStyle.prototype.clone = function() {
                    var clonedProperties = {};
                    for (var key in defaultStyle) clonedProperties[key] = this[key];
                    return new TextStyle(clonedProperties);
                }, TextStyle.prototype.reset = function() {
                    Object.assign(this, defaultStyle);
                }, TextStyle.prototype.toFontString = function() {
                    var fontSizeString = "number" == typeof this.fontSize ? this.fontSize + "px" : this.fontSize, fontFamilies = this.fontFamily;
                    Array.isArray(this.fontFamily) || (fontFamilies = this.fontFamily.split(","));
                    for (var i = fontFamilies.length - 1; i >= 0; i--) {
                        var fontFamily = fontFamilies[i].trim();
                        /([\"\'])[^\'\"]+\1/.test(fontFamily) || (fontFamily = '"' + fontFamily + '"'), 
                        fontFamilies[i] = fontFamily;
                    }
                    return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + fontSizeString + " " + fontFamilies.join(",");
                }, _createClass(TextStyle, [ {
                    key: "align",
                    get: function() {
                        return this._align;
                    },
                    set: function(align) {
                        this._align !== align && (this._align = align, this.styleID++);
                    }
                }, {
                    key: "breakWords",
                    get: function() {
                        return this._breakWords;
                    },
                    set: function(breakWords) {
                        this._breakWords !== breakWords && (this._breakWords = breakWords, this.styleID++);
                    }
                }, {
                    key: "dropShadow",
                    get: function() {
                        return this._dropShadow;
                    },
                    set: function(dropShadow) {
                        this._dropShadow !== dropShadow && (this._dropShadow = dropShadow, this.styleID++);
                    }
                }, {
                    key: "dropShadowAlpha",
                    get: function() {
                        return this._dropShadowAlpha;
                    },
                    set: function(dropShadowAlpha) {
                        this._dropShadowAlpha !== dropShadowAlpha && (this._dropShadowAlpha = dropShadowAlpha, 
                        this.styleID++);
                    }
                }, {
                    key: "dropShadowAngle",
                    get: function() {
                        return this._dropShadowAngle;
                    },
                    set: function(dropShadowAngle) {
                        this._dropShadowAngle !== dropShadowAngle && (this._dropShadowAngle = dropShadowAngle, 
                        this.styleID++);
                    }
                }, {
                    key: "dropShadowBlur",
                    get: function() {
                        return this._dropShadowBlur;
                    },
                    set: function(dropShadowBlur) {
                        this._dropShadowBlur !== dropShadowBlur && (this._dropShadowBlur = dropShadowBlur, 
                        this.styleID++);
                    }
                }, {
                    key: "dropShadowColor",
                    get: function() {
                        return this._dropShadowColor;
                    },
                    set: function(dropShadowColor) {
                        var outputColor = getColor(dropShadowColor);
                        this._dropShadowColor !== outputColor && (this._dropShadowColor = outputColor, this.styleID++);
                    }
                }, {
                    key: "dropShadowDistance",
                    get: function() {
                        return this._dropShadowDistance;
                    },
                    set: function(dropShadowDistance) {
                        this._dropShadowDistance !== dropShadowDistance && (this._dropShadowDistance = dropShadowDistance, 
                        this.styleID++);
                    }
                }, {
                    key: "fill",
                    get: function() {
                        return this._fill;
                    },
                    set: function(fill) {
                        var outputColor = getColor(fill);
                        this._fill !== outputColor && (this._fill = outputColor, this.styleID++);
                    }
                }, {
                    key: "fillGradientType",
                    get: function() {
                        return this._fillGradientType;
                    },
                    set: function(fillGradientType) {
                        this._fillGradientType !== fillGradientType && (this._fillGradientType = fillGradientType, 
                        this.styleID++);
                    }
                }, {
                    key: "fillGradientStops",
                    get: function() {
                        return this._fillGradientStops;
                    },
                    set: function(fillGradientStops) {
                        areArraysEqual(this._fillGradientStops, fillGradientStops) || (this._fillGradientStops = fillGradientStops, 
                        this.styleID++);
                    }
                }, {
                    key: "fontFamily",
                    get: function() {
                        return this._fontFamily;
                    },
                    set: function(fontFamily) {
                        this.fontFamily !== fontFamily && (this._fontFamily = fontFamily, this.styleID++);
                    }
                }, {
                    key: "fontSize",
                    get: function() {
                        return this._fontSize;
                    },
                    set: function(fontSize) {
                        this._fontSize !== fontSize && (this._fontSize = fontSize, this.styleID++);
                    }
                }, {
                    key: "fontStyle",
                    get: function() {
                        return this._fontStyle;
                    },
                    set: function(fontStyle) {
                        this._fontStyle !== fontStyle && (this._fontStyle = fontStyle, this.styleID++);
                    }
                }, {
                    key: "fontVariant",
                    get: function() {
                        return this._fontVariant;
                    },
                    set: function(fontVariant) {
                        this._fontVariant !== fontVariant && (this._fontVariant = fontVariant, this.styleID++);
                    }
                }, {
                    key: "fontWeight",
                    get: function() {
                        return this._fontWeight;
                    },
                    set: function(fontWeight) {
                        this._fontWeight !== fontWeight && (this._fontWeight = fontWeight, this.styleID++);
                    }
                }, {
                    key: "letterSpacing",
                    get: function() {
                        return this._letterSpacing;
                    },
                    set: function(letterSpacing) {
                        this._letterSpacing !== letterSpacing && (this._letterSpacing = letterSpacing, this.styleID++);
                    }
                }, {
                    key: "lineHeight",
                    get: function() {
                        return this._lineHeight;
                    },
                    set: function(lineHeight) {
                        this._lineHeight !== lineHeight && (this._lineHeight = lineHeight, this.styleID++);
                    }
                }, {
                    key: "lineJoin",
                    get: function() {
                        return this._lineJoin;
                    },
                    set: function(lineJoin) {
                        this._lineJoin !== lineJoin && (this._lineJoin = lineJoin, this.styleID++);
                    }
                }, {
                    key: "miterLimit",
                    get: function() {
                        return this._miterLimit;
                    },
                    set: function(miterLimit) {
                        this._miterLimit !== miterLimit && (this._miterLimit = miterLimit, this.styleID++);
                    }
                }, {
                    key: "padding",
                    get: function() {
                        return this._padding;
                    },
                    set: function(padding) {
                        this._padding !== padding && (this._padding = padding, this.styleID++);
                    }
                }, {
                    key: "stroke",
                    get: function() {
                        return this._stroke;
                    },
                    set: function(stroke) {
                        var outputColor = getColor(stroke);
                        this._stroke !== outputColor && (this._stroke = outputColor, this.styleID++);
                    }
                }, {
                    key: "strokeThickness",
                    get: function() {
                        return this._strokeThickness;
                    },
                    set: function(strokeThickness) {
                        this._strokeThickness !== strokeThickness && (this._strokeThickness = strokeThickness, 
                        this.styleID++);
                    }
                }, {
                    key: "textBaseline",
                    get: function() {
                        return this._textBaseline;
                    },
                    set: function(textBaseline) {
                        this._textBaseline !== textBaseline && (this._textBaseline = textBaseline, this.styleID++);
                    }
                }, {
                    key: "trim",
                    get: function() {
                        return this._trim;
                    },
                    set: function(trim) {
                        this._trim !== trim && (this._trim = trim, this.styleID++);
                    }
                }, {
                    key: "wordWrap",
                    get: function() {
                        return this._wordWrap;
                    },
                    set: function(wordWrap) {
                        this._wordWrap !== wordWrap && (this._wordWrap = wordWrap, this.styleID++);
                    }
                }, {
                    key: "wordWrapWidth",
                    get: function() {
                        return this._wordWrapWidth;
                    },
                    set: function(wordWrapWidth) {
                        this._wordWrapWidth !== wordWrapWidth && (this._wordWrapWidth = wordWrapWidth, this.styleID++);
                    }
                } ]), TextStyle;
            }();
            exports.default = TextStyle;
        }, {
            "../const": 46,
            "../utils": 124
        } ],
        111: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _BaseTexture3 = _interopRequireDefault(require("./BaseTexture")), _settings2 = _interopRequireDefault(require("../settings")), BaseRenderTexture = function(_BaseTexture) {
                function BaseRenderTexture() {
                    var width = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 100, height = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100, scaleMode = arguments[2], resolution = arguments[3];
                    _classCallCheck(this, BaseRenderTexture);
                    var _this = _possibleConstructorReturn(this, _BaseTexture.call(this, null, scaleMode));
                    return _this.resolution = resolution || _settings2.default.RESOLUTION, _this.width = width, 
                    _this.height = height, _this.realWidth = _this.width * _this.resolution, _this.realHeight = _this.height * _this.resolution, 
                    _this.scaleMode = void 0 !== scaleMode ? scaleMode : _settings2.default.SCALE_MODE, 
                    _this.hasLoaded = !0, _this._glRenderTargets = {}, _this._canvasRenderTarget = null, 
                    _this.valid = !1, _this;
                }
                return _inherits(BaseRenderTexture, _BaseTexture), BaseRenderTexture.prototype.resize = function(width, height) {
                    width === this.width && height === this.height || (this.valid = width > 0 && height > 0, 
                    this.width = width, this.height = height, this.realWidth = this.width * this.resolution, 
                    this.realHeight = this.height * this.resolution, this.valid && this.emit("update", this));
                }, BaseRenderTexture.prototype.destroy = function() {
                    _BaseTexture.prototype.destroy.call(this, !0), this.renderer = null;
                }, BaseRenderTexture;
            }(_BaseTexture3.default);
            exports.default = BaseRenderTexture;
        }, {
            "../settings": 101,
            "./BaseTexture": 112
        } ],
        112: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _utils = require("../utils"), _settings2 = _interopRequireDefault(require("../settings")), _eventemitter2 = _interopRequireDefault(require("eventemitter3")), _determineCrossOrigin2 = _interopRequireDefault(require("../utils/determineCrossOrigin")), _bitTwiddle2 = _interopRequireDefault(require("bit-twiddle")), BaseTexture = function(_EventEmitter) {
                function BaseTexture(source, scaleMode, resolution) {
                    _classCallCheck(this, BaseTexture);
                    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
                    return _this.uid = (0, _utils.uid)(), _this.touched = 0, _this.resolution = resolution || _settings2.default.RESOLUTION, 
                    _this.width = 100, _this.height = 100, _this.realWidth = 100, _this.realHeight = 100, 
                    _this.scaleMode = void 0 !== scaleMode ? scaleMode : _settings2.default.SCALE_MODE, 
                    _this.hasLoaded = !1, _this.isLoading = !1, _this.source = null, _this.origSource = null, 
                    _this.imageType = null, _this.sourceScale = 1, _this.premultipliedAlpha = !0, _this.imageUrl = null, 
                    _this.isPowerOfTwo = !1, _this.mipmap = _settings2.default.MIPMAP_TEXTURES, _this.wrapMode = _settings2.default.WRAP_MODE, 
                    _this._glTextures = {}, _this._enabled = 0, _this._virtalBoundId = -1, _this._destroyed = !1, 
                    _this.textureCacheIds = [], source && _this.loadSource(source), _this;
                }
                return _inherits(BaseTexture, _EventEmitter), BaseTexture.prototype.update = function() {
                    "svg" !== this.imageType && (this.realWidth = this.source.naturalWidth || this.source.videoWidth || this.source.width, 
                    this.realHeight = this.source.naturalHeight || this.source.videoHeight || this.source.height, 
                    this._updateDimensions()), this.emit("update", this);
                }, BaseTexture.prototype._updateDimensions = function() {
                    this.width = this.realWidth / this.resolution, this.height = this.realHeight / this.resolution, 
                    this.isPowerOfTwo = _bitTwiddle2.default.isPow2(this.realWidth) && _bitTwiddle2.default.isPow2(this.realHeight);
                }, BaseTexture.prototype.loadSource = function(source) {
                    var wasLoading = this.isLoading;
                    this.hasLoaded = !1, this.isLoading = !1, wasLoading && this.source && (this.source.onload = null, 
                    this.source.onerror = null);
                    var firstSourceLoaded = !this.source;
                    if (this.source = source, (source.src && source.complete || source.getContext) && source.width && source.height) this._updateImageType(), 
                    "svg" === this.imageType ? this._loadSvgSource() : this._sourceLoaded(), firstSourceLoaded && this.emit("loaded", this); else if (!source.getContext) {
                        this.isLoading = !0;
                        var scope = this;
                        if (source.onload = function() {
                            scope._updateImageType(), source.onload = null, source.onerror = null, scope.isLoading && (scope.isLoading = !1, 
                            scope._sourceLoaded(), "svg" !== scope.imageType ? scope.emit("loaded", scope) : scope._loadSvgSource());
                        }, source.onerror = function() {
                            source.onload = null, source.onerror = null, scope.isLoading && (scope.isLoading = !1, 
                            scope.emit("error", scope));
                        }, source.complete && source.src) {
                            if (source.onload = null, source.onerror = null, "svg" === scope.imageType) return void scope._loadSvgSource();
                            this.isLoading = !1, source.width && source.height ? (this._sourceLoaded(), wasLoading && this.emit("loaded", this)) : wasLoading && this.emit("error", this);
                        }
                    }
                }, BaseTexture.prototype._updateImageType = function() {
                    if (this.imageUrl) {
                        var dataUri = (0, _utils.decomposeDataUri)(this.imageUrl), imageType = void 0;
                        if (dataUri && "image" === dataUri.mediaType) {
                            var firstSubType = dataUri.subType.split("+")[0];
                            if (!(imageType = (0, _utils.getUrlFileExtension)("." + firstSubType))) throw new Error("Invalid image type in data URI.");
                        } else (imageType = (0, _utils.getUrlFileExtension)(this.imageUrl)) || (imageType = "png");
                        this.imageType = imageType;
                    }
                }, BaseTexture.prototype._loadSvgSource = function() {
                    if ("svg" === this.imageType) {
                        var dataUri = (0, _utils.decomposeDataUri)(this.imageUrl);
                        dataUri ? this._loadSvgSourceUsingDataUri(dataUri) : this._loadSvgSourceUsingXhr();
                    }
                }, BaseTexture.prototype._loadSvgSourceUsingDataUri = function(dataUri) {
                    var svgString = void 0;
                    if ("base64" === dataUri.encoding) {
                        if (!atob) throw new Error("Your browser doesn't support base64 conversions.");
                        svgString = atob(dataUri.data);
                    } else svgString = dataUri.data;
                    this._loadSvgSourceUsingString(svgString);
                }, BaseTexture.prototype._loadSvgSourceUsingXhr = function() {
                    var _this2 = this, svgXhr = new XMLHttpRequest();
                    svgXhr.onload = function() {
                        if (svgXhr.readyState !== svgXhr.DONE || 200 !== svgXhr.status) throw new Error("Failed to load SVG using XHR.");
                        _this2._loadSvgSourceUsingString(svgXhr.response);
                    }, svgXhr.onerror = function() {
                        return _this2.emit("error", _this2);
                    }, svgXhr.open("GET", this.imageUrl, !0), svgXhr.send();
                }, BaseTexture.prototype._loadSvgSourceUsingString = function(svgString) {
                    var svgSize = (0, _utils.getSvgSize)(svgString), svgWidth = svgSize.width, svgHeight = svgSize.height;
                    if (!svgWidth || !svgHeight) throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
                    this.realWidth = Math.round(svgWidth * this.sourceScale), this.realHeight = Math.round(svgHeight * this.sourceScale), 
                    this._updateDimensions();
                    var canvas = document.createElement("canvas");
                    canvas.width = this.realWidth, canvas.height = this.realHeight, canvas._pixiId = "canvas_" + (0, 
                    _utils.uid)(), canvas.getContext("2d").drawImage(this.source, 0, 0, svgWidth, svgHeight, 0, 0, this.realWidth, this.realHeight), 
                    this.origSource = this.source, this.source = canvas, BaseTexture.addToCache(this, canvas._pixiId), 
                    this.isLoading = !1, this._sourceLoaded(), this.emit("loaded", this);
                }, BaseTexture.prototype._sourceLoaded = function() {
                    this.hasLoaded = !0, this.update();
                }, BaseTexture.prototype.destroy = function() {
                    this.imageUrl && (delete _utils.TextureCache[this.imageUrl], this.imageUrl = null, 
                    navigator.isCocoonJS || (this.source.src = "")), this.source = null, this.dispose(), 
                    BaseTexture.removeFromCache(this), this.textureCacheIds = null, this._destroyed = !0;
                }, BaseTexture.prototype.dispose = function() {
                    this.emit("dispose", this);
                }, BaseTexture.prototype.updateSourceImage = function(newSrc) {
                    this.source.src = newSrc, this.loadSource(this.source);
                }, BaseTexture.fromImage = function(imageUrl, crossorigin, scaleMode, sourceScale) {
                    var baseTexture = _utils.BaseTextureCache[imageUrl];
                    if (!baseTexture) {
                        var image = new Image();
                        void 0 === crossorigin && 0 !== imageUrl.indexOf("data:") ? image.crossOrigin = (0, 
                        _determineCrossOrigin2.default)(imageUrl) : crossorigin && (image.crossOrigin = "string" == typeof crossorigin ? crossorigin : "anonymous"), 
                        (baseTexture = new BaseTexture(image, scaleMode)).imageUrl = imageUrl, sourceScale && (baseTexture.sourceScale = sourceScale), 
                        baseTexture.resolution = (0, _utils.getResolutionOfUrl)(imageUrl), image.src = imageUrl, 
                        BaseTexture.addToCache(baseTexture, imageUrl);
                    }
                    return baseTexture;
                }, BaseTexture.fromCanvas = function(canvas, scaleMode) {
                    var origin = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "canvas";
                    canvas._pixiId || (canvas._pixiId = origin + "_" + (0, _utils.uid)());
                    var baseTexture = _utils.BaseTextureCache[canvas._pixiId];
                    return baseTexture || (baseTexture = new BaseTexture(canvas, scaleMode), BaseTexture.addToCache(baseTexture, canvas._pixiId)), 
                    baseTexture;
                }, BaseTexture.from = function(source, scaleMode, sourceScale) {
                    if ("string" == typeof source) return BaseTexture.fromImage(source, void 0, scaleMode, sourceScale);
                    if (source instanceof HTMLImageElement) {
                        var imageUrl = source.src, baseTexture = _utils.BaseTextureCache[imageUrl];
                        return baseTexture || ((baseTexture = new BaseTexture(source, scaleMode)).imageUrl = imageUrl, 
                        sourceScale && (baseTexture.sourceScale = sourceScale), baseTexture.resolution = (0, 
                        _utils.getResolutionOfUrl)(imageUrl), BaseTexture.addToCache(baseTexture, imageUrl)), 
                        baseTexture;
                    }
                    return source instanceof HTMLCanvasElement ? BaseTexture.fromCanvas(source, scaleMode) : source;
                }, BaseTexture.addToCache = function(baseTexture, id) {
                    id && (-1 === baseTexture.textureCacheIds.indexOf(id) && baseTexture.textureCacheIds.push(id), 
                    _utils.BaseTextureCache[id] && console.warn("BaseTexture added to the cache with an id [" + id + "] that already had an entry"), 
                    _utils.BaseTextureCache[id] = baseTexture);
                }, BaseTexture.removeFromCache = function(baseTexture) {
                    if ("string" == typeof baseTexture) {
                        var baseTextureFromCache = _utils.BaseTextureCache[baseTexture];
                        if (baseTextureFromCache) {
                            var index = baseTextureFromCache.textureCacheIds.indexOf(baseTexture);
                            return index > -1 && baseTextureFromCache.textureCacheIds.splice(index, 1), delete _utils.BaseTextureCache[baseTexture], 
                            baseTextureFromCache;
                        }
                    } else if (baseTexture && baseTexture.textureCacheIds) {
                        for (var i = 0; i < baseTexture.textureCacheIds.length; ++i) delete _utils.BaseTextureCache[baseTexture.textureCacheIds[i]];
                        return baseTexture.textureCacheIds.length = 0, baseTexture;
                    }
                    return null;
                }, BaseTexture;
            }(_eventemitter2.default);
            exports.default = BaseTexture;
        }, {
            "../settings": 101,
            "../utils": 124,
            "../utils/determineCrossOrigin": 123,
            "bit-twiddle": 1,
            eventemitter3: 3
        } ],
        113: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _BaseRenderTexture2 = _interopRequireDefault(require("./BaseRenderTexture")), RenderTexture = function(_Texture) {
                function RenderTexture(baseRenderTexture, frame) {
                    _classCallCheck(this, RenderTexture);
                    var _legacyRenderer = null;
                    if (!(baseRenderTexture instanceof _BaseRenderTexture2.default)) {
                        var width = arguments[1], height = arguments[2], scaleMode = arguments[3], resolution = arguments[4];
                        console.warn("Please use RenderTexture.create(" + width + ", " + height + ") instead of the ctor directly."), 
                        _legacyRenderer = arguments[0], frame = null, baseRenderTexture = new _BaseRenderTexture2.default(width, height, scaleMode, resolution);
                    }
                    var _this = _possibleConstructorReturn(this, _Texture.call(this, baseRenderTexture, frame));
                    return _this.legacyRenderer = _legacyRenderer, _this.valid = !0, _this._updateUvs(), 
                    _this;
                }
                return _inherits(RenderTexture, _Texture), RenderTexture.prototype.resize = function(width, height, doNotResizeBaseTexture) {
                    this.valid = width > 0 && height > 0, this._frame.width = this.orig.width = width, 
                    this._frame.height = this.orig.height = height, doNotResizeBaseTexture || this.baseTexture.resize(width, height), 
                    this._updateUvs();
                }, RenderTexture.create = function(width, height, scaleMode, resolution) {
                    return new RenderTexture(new _BaseRenderTexture2.default(width, height, scaleMode, resolution));
                }, RenderTexture;
            }(_interopRequireDefault(require("./Texture")).default);
            exports.default = RenderTexture;
        }, {
            "./BaseRenderTexture": 111,
            "./Texture": 115
        } ],
        114: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _ = require("../"), _utils = require("../utils"), Spritesheet = function() {
                function Spritesheet(baseTexture, data) {
                    var resolutionFilename = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                    _classCallCheck(this, Spritesheet), this.baseTexture = baseTexture, this.textures = {}, 
                    this.data = data, this.resolution = this._updateResolution(resolutionFilename || this.baseTexture.imageUrl), 
                    this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, 
                    this._callback = null;
                }
                return _createClass(Spritesheet, null, [ {
                    key: "BATCH_SIZE",
                    get: function() {
                        return 1e3;
                    }
                } ]), Spritesheet.prototype._updateResolution = function(resolutionFilename) {
                    var scale = this.data.meta.scale, resolution = (0, _utils.getResolutionOfUrl)(resolutionFilename, null);
                    return null === resolution && (resolution = void 0 !== scale ? parseFloat(scale) : 1), 
                    1 !== resolution && (this.baseTexture.resolution = resolution, this.baseTexture.update()), 
                    resolution;
                }, Spritesheet.prototype.parse = function(callback) {
                    this._batchIndex = 0, this._callback = callback, this._frameKeys.length <= Spritesheet.BATCH_SIZE ? (this._processFrames(0), 
                    this._parseComplete()) : this._nextBatch();
                }, Spritesheet.prototype._processFrames = function(initialFrameIndex) {
                    for (var frameIndex = initialFrameIndex, maxFrames = Spritesheet.BATCH_SIZE; frameIndex - initialFrameIndex < maxFrames && frameIndex < this._frameKeys.length; ) {
                        var i = this._frameKeys[frameIndex], rect = this._frames[i].frame;
                        if (rect) {
                            var frame = null, trim = null, orig = new _.Rectangle(0, 0, this._frames[i].sourceSize.w / this.resolution, this._frames[i].sourceSize.h / this.resolution);
                            frame = this._frames[i].rotated ? new _.Rectangle(rect.x / this.resolution, rect.y / this.resolution, rect.h / this.resolution, rect.w / this.resolution) : new _.Rectangle(rect.x / this.resolution, rect.y / this.resolution, rect.w / this.resolution, rect.h / this.resolution), 
                            this._frames[i].trimmed && (trim = new _.Rectangle(this._frames[i].spriteSourceSize.x / this.resolution, this._frames[i].spriteSourceSize.y / this.resolution, rect.w / this.resolution, rect.h / this.resolution)), 
                            this.textures[i] = new _.Texture(this.baseTexture, frame, orig, trim, this._frames[i].rotated ? 2 : 0), 
                            _.Texture.addToCache(this.textures[i], i);
                        }
                        frameIndex++;
                    }
                }, Spritesheet.prototype._parseComplete = function() {
                    var callback = this._callback;
                    this._callback = null, this._batchIndex = 0, callback.call(this, this.textures);
                }, Spritesheet.prototype._nextBatch = function() {
                    var _this = this;
                    this._processFrames(this._batchIndex * Spritesheet.BATCH_SIZE), this._batchIndex++, 
                    setTimeout(function() {
                        _this._batchIndex * Spritesheet.BATCH_SIZE < _this._frameKeys.length ? _this._nextBatch() : _this._parseComplete();
                    }, 0);
                }, Spritesheet.prototype.destroy = function() {
                    var destroyBase = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    for (var i in this.textures) this.textures[i].destroy();
                    this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, 
                    destroyBase && this.baseTexture.destroy(), this.baseTexture = null;
                }, Spritesheet;
            }();
            exports.default = Spritesheet;
        }, {
            "../": 65,
            "../utils": 124
        } ],
        115: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            function removeAllHandlers(tex) {
                tex.destroy = function() {}, tex.on = function() {}, tex.once = function() {}, tex.emit = function() {};
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _BaseTexture2 = _interopRequireDefault(require("./BaseTexture")), _VideoBaseTexture2 = _interopRequireDefault(require("./VideoBaseTexture")), _TextureUvs2 = _interopRequireDefault(require("./TextureUvs")), _eventemitter2 = _interopRequireDefault(require("eventemitter3")), _math = require("../math"), _utils = require("../utils"), _settings2 = _interopRequireDefault(require("../settings")), Texture = function(_EventEmitter) {
                function Texture(baseTexture, frame, orig, trim, rotate) {
                    _classCallCheck(this, Texture);
                    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
                    if (_this.noFrame = !1, frame || (_this.noFrame = !0, frame = new _math.Rectangle(0, 0, 1, 1)), 
                    baseTexture instanceof Texture && (baseTexture = baseTexture.baseTexture), _this.baseTexture = baseTexture, 
                    _this._frame = frame, _this.trim = trim, _this.valid = !1, _this.requiresUpdate = !1, 
                    _this._uvs = null, _this.orig = orig || frame, _this._rotate = Number(rotate || 0), 
                    !0 === rotate) _this._rotate = 2; else if (_this._rotate % 2 != 0) throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
                    return baseTexture.hasLoaded ? (_this.noFrame && (frame = new _math.Rectangle(0, 0, baseTexture.width, baseTexture.height), 
                    baseTexture.on("update", _this.onBaseTextureUpdated, _this)), _this.frame = frame) : baseTexture.once("loaded", _this.onBaseTextureLoaded, _this), 
                    _this._updateID = 0, _this.transform = null, _this.textureCacheIds = [], _this;
                }
                return _inherits(Texture, _EventEmitter), Texture.prototype.update = function() {
                    this.baseTexture.update();
                }, Texture.prototype.onBaseTextureLoaded = function(baseTexture) {
                    this._updateID++, this.noFrame ? this.frame = new _math.Rectangle(0, 0, baseTexture.width, baseTexture.height) : this.frame = this._frame, 
                    this.baseTexture.on("update", this.onBaseTextureUpdated, this), this.emit("update", this);
                }, Texture.prototype.onBaseTextureUpdated = function(baseTexture) {
                    this._updateID++, this._frame.width = baseTexture.width, this._frame.height = baseTexture.height, 
                    this.emit("update", this);
                }, Texture.prototype.destroy = function(destroyBase) {
                    this.baseTexture && (destroyBase && (_utils.TextureCache[this.baseTexture.imageUrl] && Texture.removeFromCache(this.baseTexture.imageUrl), 
                    this.baseTexture.destroy()), this.baseTexture.off("update", this.onBaseTextureUpdated, this), 
                    this.baseTexture.off("loaded", this.onBaseTextureLoaded, this), this.baseTexture = null), 
                    this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, 
                    Texture.removeFromCache(this), this.textureCacheIds = null;
                }, Texture.prototype.clone = function() {
                    return new Texture(this.baseTexture, this.frame, this.orig, this.trim, this.rotate);
                }, Texture.prototype._updateUvs = function() {
                    this._uvs || (this._uvs = new _TextureUvs2.default()), this._uvs.set(this._frame, this.baseTexture, this.rotate), 
                    this._updateID++;
                }, Texture.fromImage = function(imageUrl, crossorigin, scaleMode, sourceScale) {
                    var texture = _utils.TextureCache[imageUrl];
                    return texture || (texture = new Texture(_BaseTexture2.default.fromImage(imageUrl, crossorigin, scaleMode, sourceScale)), 
                    Texture.addToCache(texture, imageUrl)), texture;
                }, Texture.fromFrame = function(frameId) {
                    var texture = _utils.TextureCache[frameId];
                    if (!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache');
                    return texture;
                }, Texture.fromCanvas = function(canvas, scaleMode) {
                    var origin = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "canvas";
                    return new Texture(_BaseTexture2.default.fromCanvas(canvas, scaleMode, origin));
                }, Texture.fromVideo = function(video, scaleMode) {
                    return "string" == typeof video ? Texture.fromVideoUrl(video, scaleMode) : new Texture(_VideoBaseTexture2.default.fromVideo(video, scaleMode));
                }, Texture.fromVideoUrl = function(videoUrl, scaleMode) {
                    return new Texture(_VideoBaseTexture2.default.fromUrl(videoUrl, scaleMode));
                }, Texture.from = function(source) {
                    if ("string" == typeof source) {
                        var texture = _utils.TextureCache[source];
                        return texture || (null !== source.match(/\.(mp4|webm|ogg|h264|avi|mov)$/) ? Texture.fromVideoUrl(source) : Texture.fromImage(source));
                    }
                    return source instanceof HTMLImageElement ? new Texture(_BaseTexture2.default.from(source)) : source instanceof HTMLCanvasElement ? Texture.fromCanvas(source, _settings2.default.SCALE_MODE, "HTMLCanvasElement") : source instanceof HTMLVideoElement ? Texture.fromVideo(source) : source instanceof _BaseTexture2.default ? new Texture(source) : source;
                }, Texture.fromLoader = function(source, imageUrl, name) {
                    var baseTexture = new _BaseTexture2.default(source, void 0, (0, _utils.getResolutionOfUrl)(imageUrl)), texture = new Texture(baseTexture);
                    return baseTexture.imageUrl = imageUrl, name || (name = imageUrl), _BaseTexture2.default.addToCache(texture.baseTexture, name), 
                    Texture.addToCache(texture, name), name !== imageUrl && (_BaseTexture2.default.addToCache(texture.baseTexture, imageUrl), 
                    Texture.addToCache(texture, imageUrl)), texture;
                }, Texture.addToCache = function(texture, id) {
                    id && (-1 === texture.textureCacheIds.indexOf(id) && texture.textureCacheIds.push(id), 
                    _utils.TextureCache[id] && console.warn("Texture added to the cache with an id [" + id + "] that already had an entry"), 
                    _utils.TextureCache[id] = texture);
                }, Texture.removeFromCache = function(texture) {
                    if ("string" == typeof texture) {
                        var textureFromCache = _utils.TextureCache[texture];
                        if (textureFromCache) {
                            var index = textureFromCache.textureCacheIds.indexOf(texture);
                            return index > -1 && textureFromCache.textureCacheIds.splice(index, 1), delete _utils.TextureCache[texture], 
                            textureFromCache;
                        }
                    } else if (texture && texture.textureCacheIds) {
                        for (var i = 0; i < texture.textureCacheIds.length; ++i) delete _utils.TextureCache[texture.textureCacheIds[i]];
                        return texture.textureCacheIds.length = 0, texture;
                    }
                    return null;
                }, _createClass(Texture, [ {
                    key: "frame",
                    get: function() {
                        return this._frame;
                    },
                    set: function(frame) {
                        if (this._frame = frame, this.noFrame = !1, frame.x + frame.width > this.baseTexture.width || frame.y + frame.height > this.baseTexture.height) throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: X: " + frame.x + " + " + frame.width + " = " + (frame.x + frame.width) + " > " + this.baseTexture.width + " Y: " + frame.y + " + " + frame.height + " = " + (frame.y + frame.height) + " > " + this.baseTexture.height);
                        this.valid = frame && frame.width && frame.height && this.baseTexture.hasLoaded, 
                        this.trim || this.rotate || (this.orig = frame), this.valid && this._updateUvs();
                    }
                }, {
                    key: "rotate",
                    get: function() {
                        return this._rotate;
                    },
                    set: function(rotate) {
                        this._rotate = rotate, this.valid && this._updateUvs();
                    }
                }, {
                    key: "width",
                    get: function() {
                        return this.orig.width;
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this.orig.height;
                    }
                } ]), Texture;
            }(_eventemitter2.default);
            exports.default = Texture, Texture.EMPTY = new Texture(new _BaseTexture2.default()), 
            removeAllHandlers(Texture.EMPTY), removeAllHandlers(Texture.EMPTY.baseTexture), 
            Texture.WHITE = function() {
                var canvas = document.createElement("canvas");
                canvas.width = 10, canvas.height = 10;
                var context = canvas.getContext("2d");
                return context.fillStyle = "white", context.fillRect(0, 0, 10, 10), new Texture(new _BaseTexture2.default(canvas));
            }(), removeAllHandlers(Texture.WHITE), removeAllHandlers(Texture.WHITE.baseTexture);
        }, {
            "../math": 70,
            "../settings": 101,
            "../utils": 124,
            "./BaseTexture": 112,
            "./TextureUvs": 116,
            "./VideoBaseTexture": 117,
            eventemitter3: 3
        } ],
        116: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _GroupD2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../math/GroupD8")), TextureUvs = function() {
                function TextureUvs() {
                    _classCallCheck(this, TextureUvs), this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, 
                    this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsUint32 = new Uint32Array(4);
                }
                return TextureUvs.prototype.set = function(frame, baseFrame, rotate) {
                    var tw = baseFrame.width, th = baseFrame.height;
                    if (rotate) {
                        var w2 = frame.width / 2 / tw, h2 = frame.height / 2 / th, cX = frame.x / tw + w2, cY = frame.y / th + h2;
                        rotate = _GroupD2.default.add(rotate, _GroupD2.default.NW), this.x0 = cX + w2 * _GroupD2.default.uX(rotate), 
                        this.y0 = cY + h2 * _GroupD2.default.uY(rotate), rotate = _GroupD2.default.add(rotate, 2), 
                        this.x1 = cX + w2 * _GroupD2.default.uX(rotate), this.y1 = cY + h2 * _GroupD2.default.uY(rotate), 
                        rotate = _GroupD2.default.add(rotate, 2), this.x2 = cX + w2 * _GroupD2.default.uX(rotate), 
                        this.y2 = cY + h2 * _GroupD2.default.uY(rotate), rotate = _GroupD2.default.add(rotate, 2), 
                        this.x3 = cX + w2 * _GroupD2.default.uX(rotate), this.y3 = cY + h2 * _GroupD2.default.uY(rotate);
                    } else this.x0 = frame.x / tw, this.y0 = frame.y / th, this.x1 = (frame.x + frame.width) / tw, 
                    this.y1 = frame.y / th, this.x2 = (frame.x + frame.width) / tw, this.y2 = (frame.y + frame.height) / th, 
                    this.x3 = frame.x / tw, this.y3 = (frame.y + frame.height) / th;
                    this.uvsUint32[0] = (65535 * this.y0 & 65535) << 16 | 65535 * this.x0 & 65535, this.uvsUint32[1] = (65535 * this.y1 & 65535) << 16 | 65535 * this.x1 & 65535, 
                    this.uvsUint32[2] = (65535 * this.y2 & 65535) << 16 | 65535 * this.x2 & 65535, this.uvsUint32[3] = (65535 * this.y3 & 65535) << 16 | 65535 * this.x3 & 65535;
                }, TextureUvs;
            }();
            exports.default = TextureUvs;
        }, {
            "../math/GroupD8": 66
        } ],
        117: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            function createSource(path, type) {
                type || (type = "video/" + path.substr(path.lastIndexOf(".") + 1));
                var source = document.createElement("source");
                return source.src = path, source.type = type, source;
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _BaseTexture3 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./BaseTexture")), _utils = require("../utils"), _ticker = require("../ticker"), _const = require("../const"), VideoBaseTexture = function(_BaseTexture) {
                function VideoBaseTexture(source, scaleMode) {
                    if (_classCallCheck(this, VideoBaseTexture), !source) throw new Error("No video source element specified.");
                    (source.readyState === source.HAVE_ENOUGH_DATA || source.readyState === source.HAVE_FUTURE_DATA) && source.width && source.height && (source.complete = !0);
                    var _this = _possibleConstructorReturn(this, _BaseTexture.call(this, source, scaleMode));
                    return _this.width = source.videoWidth, _this.height = source.videoHeight, _this._autoUpdate = !0, 
                    _this._isAutoUpdating = !1, _this.autoPlay = !0, _this.update = _this.update.bind(_this), 
                    _this._onCanPlay = _this._onCanPlay.bind(_this), source.addEventListener("play", _this._onPlayStart.bind(_this)), 
                    source.addEventListener("pause", _this._onPlayStop.bind(_this)), _this.hasLoaded = !1, 
                    _this.__loaded = !1, _this._isSourceReady() ? _this._onCanPlay() : (source.addEventListener("canplay", _this._onCanPlay), 
                    source.addEventListener("canplaythrough", _this._onCanPlay)), _this;
                }
                return _inherits(VideoBaseTexture, _BaseTexture), VideoBaseTexture.prototype._isSourcePlaying = function() {
                    var source = this.source;
                    return source.currentTime > 0 && !1 === source.paused && !1 === source.ended && source.readyState > 2;
                }, VideoBaseTexture.prototype._isSourceReady = function() {
                    return 3 === this.source.readyState || 4 === this.source.readyState;
                }, VideoBaseTexture.prototype._onPlayStart = function() {
                    this.hasLoaded || this._onCanPlay(), !this._isAutoUpdating && this.autoUpdate && (_ticker.shared.add(this.update, this, _const.UPDATE_PRIORITY.HIGH), 
                    this._isAutoUpdating = !0);
                }, VideoBaseTexture.prototype._onPlayStop = function() {
                    this._isAutoUpdating && (_ticker.shared.remove(this.update, this), this._isAutoUpdating = !1);
                }, VideoBaseTexture.prototype._onCanPlay = function() {
                    this.hasLoaded = !0, this.source && (this.source.removeEventListener("canplay", this._onCanPlay), 
                    this.source.removeEventListener("canplaythrough", this._onCanPlay), this.width = this.source.videoWidth, 
                    this.height = this.source.videoHeight, this.__loaded || (this.__loaded = !0, this.emit("loaded", this)), 
                    this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && this.source.play());
                }, VideoBaseTexture.prototype.destroy = function() {
                    this._isAutoUpdating && _ticker.shared.remove(this.update, this), this.source && this.source._pixiId && (_BaseTexture3.default.removeFromCache(this.source._pixiId), 
                    delete this.source._pixiId), _BaseTexture.prototype.destroy.call(this);
                }, VideoBaseTexture.fromVideo = function(video, scaleMode) {
                    video._pixiId || (video._pixiId = "video_" + (0, _utils.uid)());
                    var baseTexture = _utils.BaseTextureCache[video._pixiId];
                    return baseTexture || (baseTexture = new VideoBaseTexture(video, scaleMode), _BaseTexture3.default.addToCache(baseTexture, video._pixiId)), 
                    baseTexture;
                }, VideoBaseTexture.fromUrl = function(videoSrc, scaleMode) {
                    var video = document.createElement("video");
                    if (video.setAttribute("webkit-playsinline", ""), video.setAttribute("playsinline", ""), 
                    Array.isArray(videoSrc)) for (var i = 0; i < videoSrc.length; ++i) video.appendChild(createSource(videoSrc[i].src || videoSrc[i], videoSrc[i].mime)); else video.appendChild(createSource(videoSrc.src || videoSrc, videoSrc.mime));
                    return video.load(), VideoBaseTexture.fromVideo(video, scaleMode);
                }, _createClass(VideoBaseTexture, [ {
                    key: "autoUpdate",
                    get: function() {
                        return this._autoUpdate;
                    },
                    set: function(value) {
                        value !== this._autoUpdate && (this._autoUpdate = value, !this._autoUpdate && this._isAutoUpdating ? (_ticker.shared.remove(this.update, this), 
                        this._isAutoUpdating = !1) : this._autoUpdate && !this._isAutoUpdating && (_ticker.shared.add(this.update, this, _const.UPDATE_PRIORITY.HIGH), 
                        this._isAutoUpdating = !0));
                    }
                } ]), VideoBaseTexture;
            }(_BaseTexture3.default);
            exports.default = VideoBaseTexture, VideoBaseTexture.fromUrls = VideoBaseTexture.fromUrl;
        }, {
            "../const": 46,
            "../ticker": 120,
            "../utils": 124,
            "./BaseTexture": 112
        } ],
        118: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _settings2 = _interopRequireDefault(require("../settings")), _const = require("../const"), _TickerListener2 = _interopRequireDefault(require("./TickerListener")), Ticker = function() {
                function Ticker() {
                    var _this = this;
                    _classCallCheck(this, Ticker), this._head = new _TickerListener2.default(null, null, 1 / 0), 
                    this._requestId = null, this._maxElapsedMS = 100, this.autoStart = !1, this.deltaTime = 1, 
                    this.elapsedMS = 1 / _settings2.default.TARGET_FPMS, this.lastTime = 0, this.speed = 1, 
                    this.started = !1, this._tick = function(time) {
                        _this._requestId = null, _this.started && (_this.update(time), _this.started && null === _this._requestId && _this._head.next && (_this._requestId = requestAnimationFrame(_this._tick)));
                    };
                }
                return Ticker.prototype._requestIfNeeded = function() {
                    null === this._requestId && this._head.next && (this.lastTime = performance.now(), 
                    this._requestId = requestAnimationFrame(this._tick));
                }, Ticker.prototype._cancelIfNeeded = function() {
                    null !== this._requestId && (cancelAnimationFrame(this._requestId), this._requestId = null);
                }, Ticker.prototype._startIfPossible = function() {
                    this.started ? this._requestIfNeeded() : this.autoStart && this.start();
                }, Ticker.prototype.add = function(fn, context) {
                    var priority = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : _const.UPDATE_PRIORITY.NORMAL;
                    return this._addListener(new _TickerListener2.default(fn, context, priority));
                }, Ticker.prototype.addOnce = function(fn, context) {
                    var priority = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : _const.UPDATE_PRIORITY.NORMAL;
                    return this._addListener(new _TickerListener2.default(fn, context, priority, !0));
                }, Ticker.prototype._addListener = function(listener) {
                    var current = this._head.next, previous = this._head;
                    if (current) {
                        for (;current; ) {
                            if (listener.priority > current.priority) {
                                listener.connect(previous);
                                break;
                            }
                            previous = current, current = current.next;
                        }
                        listener.previous || listener.connect(previous);
                    } else listener.connect(previous);
                    return this._startIfPossible(), this;
                }, Ticker.prototype.remove = function(fn, context) {
                    for (var listener = this._head.next; listener; ) listener = listener.match(fn, context) ? listener.destroy() : listener.next;
                    return this._head.next || this._cancelIfNeeded(), this;
                }, Ticker.prototype.start = function() {
                    this.started || (this.started = !0, this._requestIfNeeded());
                }, Ticker.prototype.stop = function() {
                    this.started && (this.started = !1, this._cancelIfNeeded());
                }, Ticker.prototype.destroy = function() {
                    this.stop();
                    for (var listener = this._head.next; listener; ) listener = listener.destroy(!0);
                    this._head.destroy(), this._head = null;
                }, Ticker.prototype.update = function() {
                    var currentTime = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : performance.now(), elapsedMS = void 0;
                    if (currentTime > this.lastTime) {
                        (elapsedMS = this.elapsedMS = currentTime - this.lastTime) > this._maxElapsedMS && (elapsedMS = this._maxElapsedMS), 
                        this.deltaTime = elapsedMS * _settings2.default.TARGET_FPMS * this.speed;
                        for (var head = this._head, listener = head.next; listener; ) listener = listener.emit(this.deltaTime);
                        head.next || this._cancelIfNeeded();
                    } else this.deltaTime = this.elapsedMS = 0;
                    this.lastTime = currentTime;
                }, _createClass(Ticker, [ {
                    key: "FPS",
                    get: function() {
                        return 1e3 / this.elapsedMS;
                    }
                }, {
                    key: "minFPS",
                    get: function() {
                        return 1e3 / this._maxElapsedMS;
                    },
                    set: function(fps) {
                        var minFPMS = Math.min(Math.max(0, fps) / 1e3, _settings2.default.TARGET_FPMS);
                        this._maxElapsedMS = 1 / minFPMS;
                    }
                } ]), Ticker;
            }();
            exports.default = Ticker;
        }, {
            "../const": 46,
            "../settings": 101,
            "./TickerListener": 119
        } ],
        119: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var TickerListener = function() {
                function TickerListener(fn) {
                    var context = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, priority = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, once = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    _classCallCheck(this, TickerListener), this.fn = fn, this.context = context, this.priority = priority, 
                    this.once = once, this.next = null, this.previous = null, this._destroyed = !1;
                }
                return TickerListener.prototype.match = function(fn, context) {
                    return context = context || null, this.fn === fn && this.context === context;
                }, TickerListener.prototype.emit = function(deltaTime) {
                    this.fn && (this.context ? this.fn.call(this.context, deltaTime) : this.fn(deltaTime));
                    var redirect = this.next;
                    return this.once && this.destroy(!0), this._destroyed && (this.next = null), redirect;
                }, TickerListener.prototype.connect = function(previous) {
                    this.previous = previous, previous.next && (previous.next.previous = this), this.next = previous.next, 
                    previous.next = this;
                }, TickerListener.prototype.destroy = function() {
                    var hard = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), 
                    this.next && (this.next.previous = this.previous);
                    var redirect = this.previous;
                    return this.next = hard ? null : redirect, this.previous = null, redirect;
                }, TickerListener;
            }();
            exports.default = TickerListener;
        }, {} ],
        120: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.Ticker = exports.shared = void 0;
            var _Ticker2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./Ticker")), shared = new _Ticker2.default();
            shared.autoStart = !0, shared.destroy = function() {}, exports.shared = shared, 
            exports.Ticker = _Ticker2.default;
        }, {
            "./Ticker": 118
        } ],
        121: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function() {
                return !(navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform));
            };
        }, {} ],
        122: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(size) {
                for (var totalIndices = 6 * size, indices = new Uint16Array(totalIndices), i = 0, j = 0; i < totalIndices; i += 6, 
                j += 4) indices[i + 0] = j + 0, indices[i + 1] = j + 1, indices[i + 2] = j + 2, 
                indices[i + 3] = j + 0, indices[i + 4] = j + 2, indices[i + 5] = j + 3;
                return indices;
            };
        }, {} ],
        123: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(url) {
                var loc = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location;
                if (0 === url.indexOf("data:")) return "";
                loc = loc || window.location, tempAnchor || (tempAnchor = document.createElement("a")), 
                tempAnchor.href = url;
                var samePort = !(url = _url3.default.parse(tempAnchor.href)).port && "" === loc.port || url.port === loc.port;
                return url.hostname === loc.hostname && samePort && url.protocol === loc.protocol ? "" : "anonymous";
            };
            var _url3 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("url")), tempAnchor = void 0;
        }, {
            url: 38
        } ],
        124: [ function(require, module, exports) {
            "use strict";
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0, exports.premultiplyBlendMode = exports.BaseTextureCache = exports.TextureCache = exports.mixins = exports.pluginTarget = exports.EventEmitter = exports.removeItems = exports.isMobile = void 0, 
            exports.uid = function() {
                return ++nextUid;
            }, exports.hex2rgb = function(hex, out) {
                return out = out || [], out[0] = (hex >> 16 & 255) / 255, out[1] = (hex >> 8 & 255) / 255, 
                out[2] = (255 & hex) / 255, out;
            }, exports.hex2string = function(hex) {
                return hex = hex.toString(16), "#" + (hex = "000000".substr(0, 6 - hex.length) + hex);
            }, exports.rgb2hex = function(rgb) {
                return (255 * rgb[0] << 16) + (255 * rgb[1] << 8) + (255 * rgb[2] | 0);
            }, exports.getResolutionOfUrl = function(url, defaultValue) {
                var resolution = _settings2.default.RETINA_PREFIX.exec(url);
                return resolution ? parseFloat(resolution[1]) : void 0 !== defaultValue ? defaultValue : 1;
            }, exports.decomposeDataUri = function(dataUri) {
                var dataUriMatch = _const.DATA_URI.exec(dataUri);
                if (dataUriMatch) return {
                    mediaType: dataUriMatch[1] ? dataUriMatch[1].toLowerCase() : void 0,
                    subType: dataUriMatch[2] ? dataUriMatch[2].toLowerCase() : void 0,
                    encoding: dataUriMatch[3] ? dataUriMatch[3].toLowerCase() : void 0,
                    data: dataUriMatch[4]
                };
            }, exports.getUrlFileExtension = function(url) {
                var extension = _const.URL_FILE_EXTENSION.exec(url);
                if (extension) return extension[1].toLowerCase();
            }, exports.getSvgSize = function(svgString) {
                var sizeMatch = _const.SVG_SIZE.exec(svgString), size = {};
                return sizeMatch && (size[sizeMatch[1]] = Math.round(parseFloat(sizeMatch[3])), 
                size[sizeMatch[5]] = Math.round(parseFloat(sizeMatch[7]))), size;
            }, exports.skipHello = function() {
                saidHello = !0;
            }, exports.sayHello = function(type) {
                if (!saidHello) {
                    if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                        var args = [ "\n %c %c %c PixiJS " + _const.VERSION + " - ✰ " + type + " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;" ];
                        window.console.log.apply(console, args);
                    } else window.console && window.console.log("PixiJS " + _const.VERSION + " - " + type + " - http://www.pixijs.com/");
                    saidHello = !0;
                }
            }, exports.isWebGLSupported = function() {
                var contextOptions = {
                    stencil: !0,
                    failIfMajorPerformanceCaveat: !0
                };
                try {
                    if (!window.WebGLRenderingContext) return !1;
                    var canvas = document.createElement("canvas"), gl = canvas.getContext("webgl", contextOptions) || canvas.getContext("experimental-webgl", contextOptions), success = !(!gl || !gl.getContextAttributes().stencil);
                    if (gl) {
                        var loseContext = gl.getExtension("WEBGL_lose_context");
                        loseContext && loseContext.loseContext();
                    }
                    return gl = null, success;
                } catch (e) {
                    return !1;
                }
            }, exports.sign = function(n) {
                return 0 === n ? 0 : n < 0 ? -1 : 1;
            }, exports.destroyTextureCache = function() {
                var key = void 0;
                for (key in TextureCache) TextureCache[key].destroy();
                for (key in BaseTextureCache) BaseTextureCache[key].destroy();
            }, exports.clearTextureCache = function() {
                var key = void 0;
                for (key in TextureCache) delete TextureCache[key];
                for (key in BaseTextureCache) delete BaseTextureCache[key];
            }, exports.correctBlendMode = function(blendMode, premultiplied) {
                return premultiplyBlendMode[premultiplied ? 1 : 0][blendMode];
            }, exports.premultiplyTint = function(tint, alpha) {
                if (1 === alpha) return (255 * alpha << 24) + tint;
                if (0 === alpha) return 0;
                var R = tint >> 16 & 255, G = tint >> 8 & 255, B = 255 & tint;
                return R = R * alpha + .5 | 0, G = G * alpha + .5 | 0, B = B * alpha + .5 | 0, (255 * alpha << 24) + (R << 16) + (G << 8) + B;
            }, exports.premultiplyRgba = function(rgb, alpha, out, premultiply) {
                return out = out || new Float32Array(4), premultiply || void 0 === premultiply ? (out[0] = rgb[0] * alpha, 
                out[1] = rgb[1] * alpha, out[2] = rgb[2] * alpha) : (out[0] = rgb[0], out[1] = rgb[1], 
                out[2] = rgb[2]), out[3] = alpha, out;
            }, exports.premultiplyTintToRgba = function(tint, alpha, out, premultiply) {
                return out = out || new Float32Array(4), out[0] = (tint >> 16 & 255) / 255, out[1] = (tint >> 8 & 255) / 255, 
                out[2] = (255 & tint) / 255, (premultiply || void 0 === premultiply) && (out[0] *= alpha, 
                out[1] *= alpha, out[2] *= alpha), out[3] = alpha, out;
            };
            var _const = require("../const"), _settings2 = _interopRequireDefault(require("../settings")), _eventemitter2 = _interopRequireDefault(require("eventemitter3")), _pluginTarget2 = _interopRequireDefault(require("./pluginTarget")), mixins = _interopRequireWildcard(require("./mixin")), isMobile = _interopRequireWildcard(require("ismobilejs")), _removeArrayItems2 = _interopRequireDefault(require("remove-array-items")), _mapPremultipliedBlendModes2 = _interopRequireDefault(require("./mapPremultipliedBlendModes")), nextUid = 0, saidHello = !1;
            exports.isMobile = isMobile, exports.removeItems = _removeArrayItems2.default, exports.EventEmitter = _eventemitter2.default, 
            exports.pluginTarget = _pluginTarget2.default, exports.mixins = mixins;
            var TextureCache = exports.TextureCache = Object.create(null), BaseTextureCache = exports.BaseTextureCache = Object.create(null), premultiplyBlendMode = exports.premultiplyBlendMode = (0, 
            _mapPremultipliedBlendModes2.default)();
        }, {
            "../const": 46,
            "../settings": 101,
            "./mapPremultipliedBlendModes": 125,
            "./mixin": 127,
            "./pluginTarget": 128,
            eventemitter3: 3,
            ismobilejs: 4,
            "remove-array-items": 31
        } ],
        125: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function() {
                for (var pm = [], npm = [], i = 0; i < 32; i++) pm[i] = i, npm[i] = i;
                pm[_const.BLEND_MODES.NORMAL_NPM] = _const.BLEND_MODES.NORMAL, pm[_const.BLEND_MODES.ADD_NPM] = _const.BLEND_MODES.ADD, 
                pm[_const.BLEND_MODES.SCREEN_NPM] = _const.BLEND_MODES.SCREEN, npm[_const.BLEND_MODES.NORMAL] = _const.BLEND_MODES.NORMAL_NPM, 
                npm[_const.BLEND_MODES.ADD] = _const.BLEND_MODES.ADD_NPM, npm[_const.BLEND_MODES.SCREEN] = _const.BLEND_MODES.SCREEN_NPM;
                var array = [];
                return array.push(npm), array.push(pm), array;
            };
            var _const = require("../const");
        }, {
            "../const": 46
        } ],
        126: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(max) {
                return _ismobilejs2.default.tablet || _ismobilejs2.default.phone ? 4 : max;
            };
            var _ismobilejs2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("ismobilejs"));
        }, {
            ismobilejs: 4
        } ],
        127: [ function(require, module, exports) {
            "use strict";
            function mixin(target, source) {
                if (target && source) for (var keys = Object.keys(source), i = 0; i < keys.length; ++i) {
                    var propertyName = keys[i];
                    Object.defineProperty(target, propertyName, Object.getOwnPropertyDescriptor(source, propertyName));
                }
            }
            exports.__esModule = !0, exports.mixin = mixin, exports.delayMixin = function(target, source) {
                mixins.push(target, source);
            }, exports.performMixins = function() {
                for (var i = 0; i < mixins.length; i += 2) mixin(mixins[i], mixins[i + 1]);
                mixins.length = 0;
            };
            var mixins = [];
        }, {} ],
        128: [ function(require, module, exports) {
            "use strict";
            function pluginTarget(obj) {
                obj.__plugins = {}, obj.registerPlugin = function(pluginName, ctor) {
                    obj.__plugins[pluginName] = ctor;
                }, obj.prototype.initPlugins = function() {
                    this.plugins = this.plugins || {};
                    for (var o in obj.__plugins) this.plugins[o] = new obj.__plugins[o](this);
                }, obj.prototype.destroyPlugins = function() {
                    for (var o in this.plugins) this.plugins[o].destroy(), this.plugins[o] = null;
                    this.plugins = null;
                };
            }
            exports.__esModule = !0, exports.default = {
                mixin: function(obj) {
                    pluginTarget(obj);
                }
            };
        }, {} ],
        129: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(canvas) {
                var width = canvas.width, height = canvas.height, context = canvas.getContext("2d"), pixels = context.getImageData(0, 0, width, height).data, len = pixels.length, bound = {
                    top: null,
                    left: null,
                    right: null,
                    bottom: null
                }, i = void 0, x = void 0, y = void 0;
                for (i = 0; i < len; i += 4) 0 !== pixels[i + 3] && (x = i / 4 % width, y = ~~(i / 4 / width), 
                null === bound.top && (bound.top = y), null === bound.left ? bound.left = x : x < bound.left && (bound.left = x), 
                null === bound.right ? bound.right = x + 1 : bound.right < x && (bound.right = x + 1), 
                null === bound.bottom ? bound.bottom = y : bound.bottom < y && (bound.bottom = y));
                return width = bound.right - bound.left, {
                    height: height = bound.bottom - bound.top + 1,
                    width: width,
                    data: context.getImageData(bound.left, bound.top, width, height)
                };
            };
        }, {} ],
        130: [ function(require, module, exports) {
            "use strict";
            function warn(msg) {
                var stack = new Error().stack;
                void 0 === stack ? console.warn("Deprecation Warning: ", msg) : (stack = stack.split("\n").splice(3).join("\n"), 
                console.groupCollapsed ? (console.groupCollapsed("%cDeprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", msg), 
                console.warn(stack), console.groupEnd()) : (console.warn("Deprecation Warning: ", msg), 
                console.warn(stack)));
            }
            exports.__esModule = !0, exports.default = function(core) {
                var mesh = core.mesh, particles = core.particles, extras = core.extras, filters = core.filters, prepare = core.prepare, loaders = core.loaders, interaction = core.interaction;
                Object.defineProperties(core, {
                    SpriteBatch: {
                        get: function() {
                            throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.");
                        }
                    },
                    AssetLoader: {
                        get: function() {
                            throw new ReferenceError("The loader system was overhauled in PixiJS v3, please see the new PIXI.loaders.Loader class.");
                        }
                    },
                    Stage: {
                        get: function() {
                            return warn("You do not need to use a PIXI Stage any more, you can simply render any container."), 
                            core.Container;
                        }
                    },
                    DisplayObjectContainer: {
                        get: function() {
                            return warn("DisplayObjectContainer has been shortened to Container, please use Container from now on."), 
                            core.Container;
                        }
                    },
                    Strip: {
                        get: function() {
                            return warn("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."), 
                            mesh.Mesh;
                        }
                    },
                    Rope: {
                        get: function() {
                            return warn("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."), 
                            mesh.Rope;
                        }
                    },
                    ParticleContainer: {
                        get: function() {
                            return warn("The ParticleContainer class has been moved to particles.ParticleContainer, please use particles.ParticleContainer from now on."), 
                            particles.ParticleContainer;
                        }
                    },
                    MovieClip: {
                        get: function() {
                            return warn("The MovieClip class has been moved to extras.AnimatedSprite, please use extras.AnimatedSprite."), 
                            extras.AnimatedSprite;
                        }
                    },
                    TilingSprite: {
                        get: function() {
                            return warn("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."), 
                            extras.TilingSprite;
                        }
                    },
                    BitmapText: {
                        get: function() {
                            return warn("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."), 
                            extras.BitmapText;
                        }
                    },
                    blendModes: {
                        get: function() {
                            return warn("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."), 
                            core.BLEND_MODES;
                        }
                    },
                    scaleModes: {
                        get: function() {
                            return warn("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."), 
                            core.SCALE_MODES;
                        }
                    },
                    BaseTextureCache: {
                        get: function() {
                            return warn("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."), 
                            core.utils.BaseTextureCache;
                        }
                    },
                    TextureCache: {
                        get: function() {
                            return warn("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."), 
                            core.utils.TextureCache;
                        }
                    },
                    math: {
                        get: function() {
                            return warn("The math namespace is deprecated, please access members already accessible on PIXI."), 
                            core;
                        }
                    },
                    AbstractFilter: {
                        get: function() {
                            return warn("AstractFilter has been renamed to Filter, please use PIXI.Filter"), 
                            core.Filter;
                        }
                    },
                    TransformManual: {
                        get: function() {
                            return warn("TransformManual has been renamed to TransformBase, please update your pixi-spine"), 
                            core.TransformBase;
                        }
                    },
                    TARGET_FPMS: {
                        get: function() {
                            return warn("PIXI.TARGET_FPMS has been deprecated, please use PIXI.settings.TARGET_FPMS"), 
                            core.settings.TARGET_FPMS;
                        },
                        set: function(value) {
                            warn("PIXI.TARGET_FPMS has been deprecated, please use PIXI.settings.TARGET_FPMS"), 
                            core.settings.TARGET_FPMS = value;
                        }
                    },
                    FILTER_RESOLUTION: {
                        get: function() {
                            return warn("PIXI.FILTER_RESOLUTION has been deprecated, please use PIXI.settings.FILTER_RESOLUTION"), 
                            core.settings.FILTER_RESOLUTION;
                        },
                        set: function(value) {
                            warn("PIXI.FILTER_RESOLUTION has been deprecated, please use PIXI.settings.FILTER_RESOLUTION"), 
                            core.settings.FILTER_RESOLUTION = value;
                        }
                    },
                    RESOLUTION: {
                        get: function() {
                            return warn("PIXI.RESOLUTION has been deprecated, please use PIXI.settings.RESOLUTION"), 
                            core.settings.RESOLUTION;
                        },
                        set: function(value) {
                            warn("PIXI.RESOLUTION has been deprecated, please use PIXI.settings.RESOLUTION"), 
                            core.settings.RESOLUTION = value;
                        }
                    },
                    MIPMAP_TEXTURES: {
                        get: function() {
                            return warn("PIXI.MIPMAP_TEXTURES has been deprecated, please use PIXI.settings.MIPMAP_TEXTURES"), 
                            core.settings.MIPMAP_TEXTURES;
                        },
                        set: function(value) {
                            warn("PIXI.MIPMAP_TEXTURES has been deprecated, please use PIXI.settings.MIPMAP_TEXTURES"), 
                            core.settings.MIPMAP_TEXTURES = value;
                        }
                    },
                    SPRITE_BATCH_SIZE: {
                        get: function() {
                            return warn("PIXI.SPRITE_BATCH_SIZE has been deprecated, please use PIXI.settings.SPRITE_BATCH_SIZE"), 
                            core.settings.SPRITE_BATCH_SIZE;
                        },
                        set: function(value) {
                            warn("PIXI.SPRITE_BATCH_SIZE has been deprecated, please use PIXI.settings.SPRITE_BATCH_SIZE"), 
                            core.settings.SPRITE_BATCH_SIZE = value;
                        }
                    },
                    SPRITE_MAX_TEXTURES: {
                        get: function() {
                            return warn("PIXI.SPRITE_MAX_TEXTURES has been deprecated, please use PIXI.settings.SPRITE_MAX_TEXTURES"), 
                            core.settings.SPRITE_MAX_TEXTURES;
                        },
                        set: function(value) {
                            warn("PIXI.SPRITE_MAX_TEXTURES has been deprecated, please use PIXI.settings.SPRITE_MAX_TEXTURES"), 
                            core.settings.SPRITE_MAX_TEXTURES = value;
                        }
                    },
                    RETINA_PREFIX: {
                        get: function() {
                            return warn("PIXI.RETINA_PREFIX has been deprecated, please use PIXI.settings.RETINA_PREFIX"), 
                            core.settings.RETINA_PREFIX;
                        },
                        set: function(value) {
                            warn("PIXI.RETINA_PREFIX has been deprecated, please use PIXI.settings.RETINA_PREFIX"), 
                            core.settings.RETINA_PREFIX = value;
                        }
                    },
                    DEFAULT_RENDER_OPTIONS: {
                        get: function() {
                            return warn("PIXI.DEFAULT_RENDER_OPTIONS has been deprecated, please use PIXI.settings.DEFAULT_RENDER_OPTIONS"), 
                            core.settings.RENDER_OPTIONS;
                        }
                    }
                });
                for (var defaults = [ {
                    parent: "TRANSFORM_MODE",
                    target: "TRANSFORM_MODE"
                }, {
                    parent: "GC_MODES",
                    target: "GC_MODE"
                }, {
                    parent: "WRAP_MODES",
                    target: "WRAP_MODE"
                }, {
                    parent: "SCALE_MODES",
                    target: "SCALE_MODE"
                }, {
                    parent: "PRECISION",
                    target: "PRECISION_FRAGMENT"
                } ], i = 0; i < defaults.length; i++) !function(i) {
                    var deprecation = defaults[i];
                    Object.defineProperty(core[deprecation.parent], "DEFAULT", {
                        get: function() {
                            return warn("PIXI." + deprecation.parent + ".DEFAULT has been deprecated, please use PIXI.settings." + deprecation.target), 
                            core.settings[deprecation.target];
                        },
                        set: function(value) {
                            warn("PIXI." + deprecation.parent + ".DEFAULT has been deprecated, please use PIXI.settings." + deprecation.target), 
                            core.settings[deprecation.target] = value;
                        }
                    });
                }(i);
                Object.defineProperties(core.settings, {
                    PRECISION: {
                        get: function() {
                            return warn("PIXI.settings.PRECISION has been deprecated, please use PIXI.settings.PRECISION_FRAGMENT"), 
                            core.settings.PRECISION_FRAGMENT;
                        },
                        set: function(value) {
                            warn("PIXI.settings.PRECISION has been deprecated, please use PIXI.settings.PRECISION_FRAGMENT"), 
                            core.settings.PRECISION_FRAGMENT = value;
                        }
                    }
                }), extras.AnimatedSprite && Object.defineProperties(extras, {
                    MovieClip: {
                        get: function() {
                            return warn("The MovieClip class has been renamed to AnimatedSprite, please use AnimatedSprite from now on."), 
                            extras.AnimatedSprite;
                        }
                    }
                }), core.DisplayObject.prototype.generateTexture = function(renderer, scaleMode, resolution) {
                    return warn("generateTexture has moved to the renderer, please use renderer.generateTexture(displayObject)"), 
                    renderer.generateTexture(this, scaleMode, resolution);
                }, core.Graphics.prototype.generateTexture = function(scaleMode, resolution) {
                    return warn("graphics generate texture has moved to the renderer. Or to render a graphics to a texture using canvas please use generateCanvasTexture"), 
                    this.generateCanvasTexture(scaleMode, resolution);
                }, core.RenderTexture.prototype.render = function(displayObject, matrix, clear, updateTransform) {
                    this.legacyRenderer.render(displayObject, this, clear, matrix, !updateTransform), 
                    warn("RenderTexture.render is now deprecated, please use renderer.render(displayObject, renderTexture)");
                }, core.RenderTexture.prototype.getImage = function(target) {
                    return warn("RenderTexture.getImage is now deprecated, please use renderer.extract.image(target)"), 
                    this.legacyRenderer.extract.image(target);
                }, core.RenderTexture.prototype.getBase64 = function(target) {
                    return warn("RenderTexture.getBase64 is now deprecated, please use renderer.extract.base64(target)"), 
                    this.legacyRenderer.extract.base64(target);
                }, core.RenderTexture.prototype.getCanvas = function(target) {
                    return warn("RenderTexture.getCanvas is now deprecated, please use renderer.extract.canvas(target)"), 
                    this.legacyRenderer.extract.canvas(target);
                }, core.RenderTexture.prototype.getPixels = function(target) {
                    return warn("RenderTexture.getPixels is now deprecated, please use renderer.extract.pixels(target)"), 
                    this.legacyRenderer.pixels(target);
                }, core.Sprite.prototype.setTexture = function(texture) {
                    this.texture = texture, warn("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;");
                }, extras.BitmapText && (extras.BitmapText.prototype.setText = function(text) {
                    this.text = text, warn("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';");
                }), core.Text.prototype.setText = function(text) {
                    this.text = text, warn("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';");
                }, core.Text.calculateFontProperties = function(font) {
                    return warn("Text.calculateFontProperties is now deprecated, please use the TextMetrics.measureFont"), 
                    core.TextMetrics.measureFont(font);
                }, Object.defineProperties(core.Text, {
                    fontPropertiesCache: {
                        get: function() {
                            return warn("Text.fontPropertiesCache is deprecated"), core.TextMetrics._fonts;
                        }
                    },
                    fontPropertiesCanvas: {
                        get: function() {
                            return warn("Text.fontPropertiesCanvas is deprecated"), core.TextMetrics._canvas;
                        }
                    },
                    fontPropertiesContext: {
                        get: function() {
                            return warn("Text.fontPropertiesContext is deprecated"), core.TextMetrics._context;
                        }
                    }
                }), core.Text.prototype.setStyle = function(style) {
                    this.style = style, warn("setStyle is now deprecated, please use the style property, e.g : myText.style = style;");
                }, core.Text.prototype.determineFontProperties = function(fontStyle) {
                    return warn("determineFontProperties is now deprecated, please use TextMetrics.measureFont method"), 
                    core.TextMetrics.measureFont(fontStyle);
                }, core.Text.getFontStyle = function(style) {
                    return warn("getFontStyle is now deprecated, please use TextStyle.toFontString() instead"), 
                    (style = style || {}) instanceof core.TextStyle || (style = new core.TextStyle(style)), 
                    style.toFontString();
                }, Object.defineProperties(core.TextStyle.prototype, {
                    font: {
                        get: function() {
                            warn("text style property 'font' is now deprecated, please use the 'fontFamily', 'fontSize', 'fontStyle', 'fontVariant' and 'fontWeight' properties from now on");
                            var fontSizeString = "number" == typeof this._fontSize ? this._fontSize + "px" : this._fontSize;
                            return this._fontStyle + " " + this._fontVariant + " " + this._fontWeight + " " + fontSizeString + " " + this._fontFamily;
                        },
                        set: function(font) {
                            warn("text style property 'font' is now deprecated, please use the 'fontFamily','fontSize',fontStyle','fontVariant' and 'fontWeight' properties from now on"), 
                            font.indexOf("italic") > 1 ? this._fontStyle = "italic" : font.indexOf("oblique") > -1 ? this._fontStyle = "oblique" : this._fontStyle = "normal", 
                            font.indexOf("small-caps") > -1 ? this._fontVariant = "small-caps" : this._fontVariant = "normal";
                            var splits = font.split(" "), fontSizeIndex = -1;
                            this._fontSize = 26;
                            for (var i = 0; i < splits.length; ++i) if (splits[i].match(/(px|pt|em|%)/)) {
                                fontSizeIndex = i, this._fontSize = splits[i];
                                break;
                            }
                            this._fontWeight = "normal";
                            for (var _i = 0; _i < fontSizeIndex; ++_i) if (splits[_i].match(/(bold|bolder|lighter|100|200|300|400|500|600|700|800|900)/)) {
                                this._fontWeight = splits[_i];
                                break;
                            }
                            if (fontSizeIndex > -1 && fontSizeIndex < splits.length - 1) {
                                this._fontFamily = "";
                                for (var _i2 = fontSizeIndex + 1; _i2 < splits.length; ++_i2) this._fontFamily += splits[_i2] + " ";
                                this._fontFamily = this._fontFamily.slice(0, -1);
                            } else this._fontFamily = "Arial";
                            this.styleID++;
                        }
                    }
                }), core.Texture.prototype.setFrame = function(frame) {
                    this.frame = frame, warn("setFrame is now deprecated, please use the frame property, e.g: myTexture.frame = frame;");
                }, core.Texture.addTextureToCache = function(texture, id) {
                    core.Texture.addToCache(texture, id), warn("Texture.addTextureToCache is deprecated, please use Texture.addToCache from now on.");
                }, core.Texture.removeTextureFromCache = function(id) {
                    return warn("Texture.removeTextureFromCache is deprecated, please use Texture.removeFromCache from now on. Be aware that Texture.removeFromCache does not automatically its BaseTexture from the BaseTextureCache. For that, use BaseTexture.removeFromCache"), 
                    core.BaseTexture.removeFromCache(id), core.Texture.removeFromCache(id);
                }, Object.defineProperties(filters, {
                    AbstractFilter: {
                        get: function() {
                            return warn("AstractFilter has been renamed to Filter, please use PIXI.Filter"), 
                            core.AbstractFilter;
                        }
                    },
                    SpriteMaskFilter: {
                        get: function() {
                            return warn("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."), 
                            core.SpriteMaskFilter;
                        }
                    }
                }), core.utils.uuid = function() {
                    return warn("utils.uuid() is deprecated, please use utils.uid() from now on."), 
                    core.utils.uid();
                }, core.utils.canUseNewCanvasBlendModes = function() {
                    return warn("utils.canUseNewCanvasBlendModes() is deprecated, please use CanvasTinter.canUseMultiply from now on"), 
                    core.CanvasTinter.canUseMultiply;
                };
                var saidHello = !0;
                if (Object.defineProperty(core.utils, "_saidHello", {
                    set: function(bool) {
                        bool && (warn("PIXI.utils._saidHello is deprecated, please use PIXI.utils.skipHello()"), 
                        this.skipHello()), saidHello = bool;
                    },
                    get: function() {
                        return saidHello;
                    }
                }), prepare.BasePrepare && (prepare.BasePrepare.prototype.register = function(addHook, uploadHook) {
                    return warn("renderer.plugins.prepare.register is now deprecated, please use renderer.plugins.prepare.registerFindHook & renderer.plugins.prepare.registerUploadHook"), 
                    addHook && this.registerFindHook(addHook), uploadHook && this.registerUploadHook(uploadHook), 
                    this;
                }), prepare.canvas && Object.defineProperty(prepare.canvas, "UPLOADS_PER_FRAME", {
                    set: function() {
                        warn("PIXI.CanvasPrepare.UPLOADS_PER_FRAME has been removed. Please set renderer.plugins.prepare.limiter.maxItemsPerFrame on your renderer");
                    },
                    get: function() {
                        return warn("PIXI.CanvasPrepare.UPLOADS_PER_FRAME has been removed. Please use renderer.plugins.prepare.limiter"), 
                        NaN;
                    }
                }), prepare.webgl && Object.defineProperty(prepare.webgl, "UPLOADS_PER_FRAME", {
                    set: function() {
                        warn("PIXI.WebGLPrepare.UPLOADS_PER_FRAME has been removed. Please set renderer.plugins.prepare.limiter.maxItemsPerFrame on your renderer");
                    },
                    get: function() {
                        return warn("PIXI.WebGLPrepare.UPLOADS_PER_FRAME has been removed. Please use renderer.plugins.prepare.limiter"), 
                        NaN;
                    }
                }), loaders.Loader) {
                    var Resource = loaders.Resource, Loader = loaders.Loader;
                    Object.defineProperties(Resource.prototype, {
                        isJson: {
                            get: function() {
                                return warn("The isJson property is deprecated, please use `resource.type === Resource.TYPE.JSON`."), 
                                this.type === Resource.TYPE.JSON;
                            }
                        },
                        isXml: {
                            get: function() {
                                return warn("The isXml property is deprecated, please use `resource.type === Resource.TYPE.XML`."), 
                                this.type === Resource.TYPE.XML;
                            }
                        },
                        isImage: {
                            get: function() {
                                return warn("The isImage property is deprecated, please use `resource.type === Resource.TYPE.IMAGE`."), 
                                this.type === Resource.TYPE.IMAGE;
                            }
                        },
                        isAudio: {
                            get: function() {
                                return warn("The isAudio property is deprecated, please use `resource.type === Resource.TYPE.AUDIO`."), 
                                this.type === Resource.TYPE.AUDIO;
                            }
                        },
                        isVideo: {
                            get: function() {
                                return warn("The isVideo property is deprecated, please use `resource.type === Resource.TYPE.VIDEO`."), 
                                this.type === Resource.TYPE.VIDEO;
                            }
                        }
                    }), Object.defineProperties(Loader.prototype, {
                        before: {
                            get: function() {
                                return warn("The before() method is deprecated, please use pre()."), this.pre;
                            }
                        },
                        after: {
                            get: function() {
                                return warn("The after() method is deprecated, please use use()."), this.use;
                            }
                        }
                    });
                }
                interaction.interactiveTarget && Object.defineProperty(interaction.interactiveTarget, "defaultCursor", {
                    set: function(value) {
                        warn("Property defaultCursor has been replaced with 'cursor'. "), this.cursor = value;
                    },
                    get: function() {
                        return warn("Property defaultCursor has been replaced with 'cursor'. "), this.cursor;
                    }
                }), interaction.InteractionManager && (Object.defineProperty(interaction.InteractionManager, "defaultCursorStyle", {
                    set: function(value) {
                        warn("Property defaultCursorStyle has been replaced with 'cursorStyles.default'. "), 
                        this.cursorStyles.default = value;
                    },
                    get: function() {
                        return warn("Property defaultCursorStyle has been replaced with 'cursorStyles.default'. "), 
                        this.cursorStyles.default;
                    }
                }), Object.defineProperty(interaction.InteractionManager, "currentCursorStyle", {
                    set: function(value) {
                        warn("Property currentCursorStyle has been removed.See the currentCursorMode property, which works differently."), 
                        this.currentCursorMode = value;
                    },
                    get: function() {
                        return warn("Property currentCursorStyle has been removed.See the currentCursorMode property, which works differently."), 
                        this.currentCursorMode;
                    }
                }));
            };
        }, {} ],
        131: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), TEMP_RECT = new core.Rectangle(), CanvasExtract = function() {
                function CanvasExtract(renderer) {
                    _classCallCheck(this, CanvasExtract), this.renderer = renderer, renderer.extract = this;
                }
                return CanvasExtract.prototype.image = function(target) {
                    var image = new Image();
                    return image.src = this.base64(target), image;
                }, CanvasExtract.prototype.base64 = function(target) {
                    return this.canvas(target).toDataURL();
                }, CanvasExtract.prototype.canvas = function(target) {
                    var renderer = this.renderer, context = void 0, resolution = void 0, frame = void 0, renderTexture = void 0;
                    target && (renderTexture = target instanceof core.RenderTexture ? target : renderer.generateTexture(target)), 
                    renderTexture ? (context = renderTexture.baseTexture._canvasRenderTarget.context, 
                    resolution = renderTexture.baseTexture._canvasRenderTarget.resolution, frame = renderTexture.frame) : (context = renderer.rootContext, 
                    (frame = TEMP_RECT).width = this.renderer.width, frame.height = this.renderer.height);
                    var width = frame.width * resolution, height = frame.height * resolution, canvasBuffer = new core.CanvasRenderTarget(width, height), canvasData = context.getImageData(frame.x * resolution, frame.y * resolution, width, height);
                    return canvasBuffer.context.putImageData(canvasData, 0, 0), canvasBuffer.canvas;
                }, CanvasExtract.prototype.pixels = function(target) {
                    var renderer = this.renderer, context = void 0, resolution = void 0, frame = void 0, renderTexture = void 0;
                    return target && (renderTexture = target instanceof core.RenderTexture ? target : renderer.generateTexture(target)), 
                    renderTexture ? (context = renderTexture.baseTexture._canvasRenderTarget.context, 
                    resolution = renderTexture.baseTexture._canvasRenderTarget.resolution, frame = renderTexture.frame) : (context = renderer.rootContext, 
                    (frame = TEMP_RECT).width = renderer.width, frame.height = renderer.height), context.getImageData(0, 0, frame.width * resolution, frame.height * resolution).data;
                }, CanvasExtract.prototype.destroy = function() {
                    this.renderer.extract = null, this.renderer = null;
                }, CanvasExtract;
            }();
            exports.default = CanvasExtract, core.CanvasRenderer.registerPlugin("extract", CanvasExtract);
        }, {
            "../../core": 65
        } ],
        132: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0;
            var _WebGLExtract = require("./webgl/WebGLExtract");
            Object.defineProperty(exports, "webgl", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_WebGLExtract).default;
                }
            });
            var _CanvasExtract = require("./canvas/CanvasExtract");
            Object.defineProperty(exports, "canvas", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_CanvasExtract).default;
                }
            });
        }, {
            "./canvas/CanvasExtract": 131,
            "./webgl/WebGLExtract": 133
        } ],
        133: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), TEMP_RECT = new core.Rectangle(), WebGLExtract = function() {
                function WebGLExtract(renderer) {
                    _classCallCheck(this, WebGLExtract), this.renderer = renderer, renderer.extract = this;
                }
                return WebGLExtract.prototype.image = function(target) {
                    var image = new Image();
                    return image.src = this.base64(target), image;
                }, WebGLExtract.prototype.base64 = function(target) {
                    return this.canvas(target).toDataURL();
                }, WebGLExtract.prototype.canvas = function(target) {
                    var renderer = this.renderer, textureBuffer = void 0, resolution = void 0, frame = void 0, flipY = !1, renderTexture = void 0;
                    target && (renderTexture = target instanceof core.RenderTexture ? target : this.renderer.generateTexture(target)), 
                    renderTexture ? (resolution = (textureBuffer = renderTexture.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID]).resolution, 
                    frame = renderTexture.frame, flipY = !1) : (resolution = (textureBuffer = this.renderer.rootRenderTarget).resolution, 
                    flipY = !0, (frame = TEMP_RECT).width = textureBuffer.size.width, frame.height = textureBuffer.size.height);
                    var width = frame.width * resolution, height = frame.height * resolution, canvasBuffer = new core.CanvasRenderTarget(width, height);
                    if (textureBuffer) {
                        renderer.bindRenderTarget(textureBuffer);
                        var webglPixels = new Uint8Array(4 * width * height), gl = renderer.gl;
                        gl.readPixels(frame.x * resolution, frame.y * resolution, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webglPixels);
                        var canvasData = canvasBuffer.context.getImageData(0, 0, width, height);
                        canvasData.data.set(webglPixels), canvasBuffer.context.putImageData(canvasData, 0, 0), 
                        flipY && (canvasBuffer.context.scale(1, -1), canvasBuffer.context.drawImage(canvasBuffer.canvas, 0, -height));
                    }
                    return canvasBuffer.canvas;
                }, WebGLExtract.prototype.pixels = function(target) {
                    var renderer = this.renderer, textureBuffer = void 0, resolution = void 0, frame = void 0, renderTexture = void 0;
                    target && (renderTexture = target instanceof core.RenderTexture ? target : this.renderer.generateTexture(target)), 
                    renderTexture ? (resolution = (textureBuffer = renderTexture.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID]).resolution, 
                    frame = renderTexture.frame) : (resolution = (textureBuffer = this.renderer.rootRenderTarget).resolution, 
                    (frame = TEMP_RECT).width = textureBuffer.size.width, frame.height = textureBuffer.size.height);
                    var width = frame.width * resolution, height = frame.height * resolution, webglPixels = new Uint8Array(4 * width * height);
                    if (textureBuffer) {
                        renderer.bindRenderTarget(textureBuffer);
                        var gl = renderer.gl;
                        gl.readPixels(frame.x * resolution, frame.y * resolution, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webglPixels);
                    }
                    return webglPixels;
                }, WebGLExtract.prototype.destroy = function() {
                    this.renderer.extract = null, this.renderer = null;
                }, WebGLExtract;
            }();
            exports.default = WebGLExtract, core.WebGLRenderer.registerPlugin("extract", WebGLExtract);
        }, {
            "../../core": 65
        } ],
        134: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../core")), AnimatedSprite = function(_core$Sprite) {
                function AnimatedSprite(textures, autoUpdate) {
                    _classCallCheck(this, AnimatedSprite);
                    var _this = _possibleConstructorReturn(this, _core$Sprite.call(this, textures[0] instanceof core.Texture ? textures[0] : textures[0].texture));
                    return _this._textures = null, _this._durations = null, _this.textures = textures, 
                    _this._autoUpdate = !1 !== autoUpdate, _this.animationSpeed = 1, _this.loop = !0, 
                    _this.onComplete = null, _this.onFrameChange = null, _this.onLoop = null, _this._currentTime = 0, 
                    _this.playing = !1, _this;
                }
                return _inherits(AnimatedSprite, _core$Sprite), AnimatedSprite.prototype.stop = function() {
                    this.playing && (this.playing = !1, this._autoUpdate && core.ticker.shared.remove(this.update, this));
                }, AnimatedSprite.prototype.play = function() {
                    this.playing || (this.playing = !0, this._autoUpdate && core.ticker.shared.add(this.update, this, core.UPDATE_PRIORITY.HIGH));
                }, AnimatedSprite.prototype.gotoAndStop = function(frameNumber) {
                    this.stop();
                    var previousFrame = this.currentFrame;
                    this._currentTime = frameNumber, previousFrame !== this.currentFrame && this.updateTexture();
                }, AnimatedSprite.prototype.gotoAndPlay = function(frameNumber) {
                    var previousFrame = this.currentFrame;
                    this._currentTime = frameNumber, previousFrame !== this.currentFrame && this.updateTexture(), 
                    this.play();
                }, AnimatedSprite.prototype.update = function(deltaTime) {
                    var elapsed = this.animationSpeed * deltaTime, previousFrame = this.currentFrame;
                    if (null !== this._durations) {
                        var lag = this._currentTime % 1 * this._durations[this.currentFrame];
                        for (lag += elapsed / 60 * 1e3; lag < 0; ) this._currentTime--, lag += this._durations[this.currentFrame];
                        var sign = Math.sign(this.animationSpeed * deltaTime);
                        for (this._currentTime = Math.floor(this._currentTime); lag >= this._durations[this.currentFrame]; ) lag -= this._durations[this.currentFrame] * sign, 
                        this._currentTime += sign;
                        this._currentTime += lag / this._durations[this.currentFrame];
                    } else this._currentTime += elapsed;
                    this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), 
                    this.onComplete && this.onComplete()) : previousFrame !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < previousFrame ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > previousFrame && this.onLoop()), 
                    this.updateTexture());
                }, AnimatedSprite.prototype.updateTexture = function() {
                    this._texture = this._textures[this.currentFrame], this._textureID = -1, this.onFrameChange && this.onFrameChange(this.currentFrame);
                }, AnimatedSprite.prototype.destroy = function(options) {
                    this.stop(), _core$Sprite.prototype.destroy.call(this, options);
                }, AnimatedSprite.fromFrames = function(frames) {
                    for (var textures = [], i = 0; i < frames.length; ++i) textures.push(core.Texture.fromFrame(frames[i]));
                    return new AnimatedSprite(textures);
                }, AnimatedSprite.fromImages = function(images) {
                    for (var textures = [], i = 0; i < images.length; ++i) textures.push(core.Texture.fromImage(images[i]));
                    return new AnimatedSprite(textures);
                }, _createClass(AnimatedSprite, [ {
                    key: "totalFrames",
                    get: function() {
                        return this._textures.length;
                    }
                }, {
                    key: "textures",
                    get: function() {
                        return this._textures;
                    },
                    set: function(value) {
                        if (value[0] instanceof core.Texture) this._textures = value, this._durations = null; else {
                            this._textures = [], this._durations = [];
                            for (var i = 0; i < value.length; i++) this._textures.push(value[i].texture), this._durations.push(value[i].time);
                        }
                        this.gotoAndStop(0), this.updateTexture();
                    }
                }, {
                    key: "currentFrame",
                    get: function() {
                        var currentFrame = Math.floor(this._currentTime) % this._textures.length;
                        return currentFrame < 0 && (currentFrame += this._textures.length), currentFrame;
                    }
                } ]), AnimatedSprite;
            }(core.Sprite);
            exports.default = AnimatedSprite;
        }, {
            "../core": 65
        } ],
        135: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../core")), _ObservablePoint2 = _interopRequireDefault(require("../core/math/ObservablePoint")), _settings2 = _interopRequireDefault(require("../core/settings")), BitmapText = function(_core$Container) {
                function BitmapText(text) {
                    var style = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    _classCallCheck(this, BitmapText);
                    var _this = _possibleConstructorReturn(this, _core$Container.call(this));
                    return _this._textWidth = 0, _this._textHeight = 0, _this._glyphs = [], _this._font = {
                        tint: void 0 !== style.tint ? style.tint : 16777215,
                        align: style.align || "left",
                        name: null,
                        size: 0
                    }, _this.font = style.font, _this._text = text, _this._maxWidth = 0, _this._maxLineHeight = 0, 
                    _this._anchor = new _ObservablePoint2.default(function() {
                        _this.dirty = !0;
                    }, _this, 0, 0), _this.dirty = !1, _this.updateText(), _this;
                }
                return _inherits(BitmapText, _core$Container), BitmapText.prototype.updateText = function() {
                    for (var data = BitmapText.fonts[this._font.name], scale = this._font.size / data.size, pos = new core.Point(), chars = [], lineWidths = [], prevCharCode = null, lastLineWidth = 0, maxLineWidth = 0, line = 0, lastSpace = -1, lastSpaceWidth = 0, spacesRemoved = 0, maxLineHeight = 0, i = 0; i < this.text.length; i++) {
                        var charCode = this.text.charCodeAt(i);
                        if (/(\s)/.test(this.text.charAt(i)) && (lastSpace = i, lastSpaceWidth = lastLineWidth), 
                        /(?:\r\n|\r|\n)/.test(this.text.charAt(i))) lineWidths.push(lastLineWidth), maxLineWidth = Math.max(maxLineWidth, lastLineWidth), 
                        line++, pos.x = 0, pos.y += data.lineHeight, prevCharCode = null; else if (-1 !== lastSpace && this._maxWidth > 0 && pos.x * scale > this._maxWidth) core.utils.removeItems(chars, lastSpace - spacesRemoved, i - lastSpace), 
                        i = lastSpace, lastSpace = -1, ++spacesRemoved, lineWidths.push(lastSpaceWidth), 
                        maxLineWidth = Math.max(maxLineWidth, lastSpaceWidth), line++, pos.x = 0, pos.y += data.lineHeight, 
                        prevCharCode = null; else {
                            var charData = data.chars[charCode];
                            charData && (prevCharCode && charData.kerning[prevCharCode] && (pos.x += charData.kerning[prevCharCode]), 
                            chars.push({
                                texture: charData.texture,
                                line: line,
                                charCode: charCode,
                                position: new core.Point(pos.x + charData.xOffset, pos.y + charData.yOffset)
                            }), lastLineWidth = pos.x + (charData.texture.width + charData.xOffset), pos.x += charData.xAdvance, 
                            maxLineHeight = Math.max(maxLineHeight, charData.yOffset + charData.texture.height), 
                            prevCharCode = charCode);
                        }
                    }
                    lineWidths.push(lastLineWidth), maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
                    for (var lineAlignOffsets = [], _i = 0; _i <= line; _i++) {
                        var alignOffset = 0;
                        "right" === this._font.align ? alignOffset = maxLineWidth - lineWidths[_i] : "center" === this._font.align && (alignOffset = (maxLineWidth - lineWidths[_i]) / 2), 
                        lineAlignOffsets.push(alignOffset);
                    }
                    for (var lenChars = chars.length, tint = this.tint, _i2 = 0; _i2 < lenChars; _i2++) {
                        var c = this._glyphs[_i2];
                        c ? c.texture = chars[_i2].texture : (c = new core.Sprite(chars[_i2].texture), this._glyphs.push(c)), 
                        c.position.x = (chars[_i2].position.x + lineAlignOffsets[chars[_i2].line]) * scale, 
                        c.position.y = chars[_i2].position.y * scale, c.scale.x = c.scale.y = scale, c.tint = tint, 
                        c.parent || this.addChild(c);
                    }
                    for (var _i3 = lenChars; _i3 < this._glyphs.length; ++_i3) this.removeChild(this._glyphs[_i3]);
                    if (this._textWidth = maxLineWidth * scale, this._textHeight = (pos.y + data.lineHeight) * scale, 
                    0 !== this.anchor.x || 0 !== this.anchor.y) for (var _i4 = 0; _i4 < lenChars; _i4++) this._glyphs[_i4].x -= this._textWidth * this.anchor.x, 
                    this._glyphs[_i4].y -= this._textHeight * this.anchor.y;
                    this._maxLineHeight = maxLineHeight * scale;
                }, BitmapText.prototype.updateTransform = function() {
                    this.validate(), this.containerUpdateTransform();
                }, BitmapText.prototype.getLocalBounds = function() {
                    return this.validate(), _core$Container.prototype.getLocalBounds.call(this);
                }, BitmapText.prototype.validate = function() {
                    this.dirty && (this.updateText(), this.dirty = !1);
                }, BitmapText.registerFont = function(xml, texture) {
                    var data = {}, info = xml.getElementsByTagName("info")[0], common = xml.getElementsByTagName("common")[0], res = texture.baseTexture.resolution || _settings2.default.RESOLUTION;
                    data.font = info.getAttribute("face"), data.size = parseInt(info.getAttribute("size"), 10), 
                    data.lineHeight = parseInt(common.getAttribute("lineHeight"), 10) / res, data.chars = {};
                    for (var letters = xml.getElementsByTagName("char"), i = 0; i < letters.length; i++) {
                        var letter = letters[i], charCode = parseInt(letter.getAttribute("id"), 10), textureRect = new core.Rectangle(parseInt(letter.getAttribute("x"), 10) / res + texture.frame.x / res, parseInt(letter.getAttribute("y"), 10) / res + texture.frame.y / res, parseInt(letter.getAttribute("width"), 10) / res, parseInt(letter.getAttribute("height"), 10) / res);
                        data.chars[charCode] = {
                            xOffset: parseInt(letter.getAttribute("xoffset"), 10) / res,
                            yOffset: parseInt(letter.getAttribute("yoffset"), 10) / res,
                            xAdvance: parseInt(letter.getAttribute("xadvance"), 10) / res,
                            kerning: {},
                            texture: new core.Texture(texture.baseTexture, textureRect)
                        };
                    }
                    for (var kernings = xml.getElementsByTagName("kerning"), _i5 = 0; _i5 < kernings.length; _i5++) {
                        var kerning = kernings[_i5], first = parseInt(kerning.getAttribute("first"), 10) / res, second = parseInt(kerning.getAttribute("second"), 10) / res, amount = parseInt(kerning.getAttribute("amount"), 10) / res;
                        data.chars[second] && (data.chars[second].kerning[first] = amount);
                    }
                    return BitmapText.fonts[data.font] = data, data;
                }, _createClass(BitmapText, [ {
                    key: "tint",
                    get: function() {
                        return this._font.tint;
                    },
                    set: function(value) {
                        this._font.tint = "number" == typeof value && value >= 0 ? value : 16777215, this.dirty = !0;
                    }
                }, {
                    key: "align",
                    get: function() {
                        return this._font.align;
                    },
                    set: function(value) {
                        this._font.align = value || "left", this.dirty = !0;
                    }
                }, {
                    key: "anchor",
                    get: function() {
                        return this._anchor;
                    },
                    set: function(value) {
                        "number" == typeof value ? this._anchor.set(value) : this._anchor.copy(value);
                    }
                }, {
                    key: "font",
                    get: function() {
                        return this._font;
                    },
                    set: function(value) {
                        value && ("string" == typeof value ? (value = value.split(" "), this._font.name = 1 === value.length ? value[0] : value.slice(1).join(" "), 
                        this._font.size = value.length >= 2 ? parseInt(value[0], 10) : BitmapText.fonts[this._font.name].size) : (this._font.name = value.name, 
                        this._font.size = "number" == typeof value.size ? value.size : parseInt(value.size, 10)), 
                        this.dirty = !0);
                    }
                }, {
                    key: "text",
                    get: function() {
                        return this._text;
                    },
                    set: function(value) {
                        value = value.toString() || " ", this._text !== value && (this._text = value, this.dirty = !0);
                    }
                }, {
                    key: "maxWidth",
                    get: function() {
                        return this._maxWidth;
                    },
                    set: function(value) {
                        this._maxWidth !== value && (this._maxWidth = value, this.dirty = !0);
                    }
                }, {
                    key: "maxLineHeight",
                    get: function() {
                        return this.validate(), this._maxLineHeight;
                    }
                }, {
                    key: "textWidth",
                    get: function() {
                        return this.validate(), this._textWidth;
                    }
                }, {
                    key: "textHeight",
                    get: function() {
                        return this.validate(), this._textHeight;
                    }
                } ]), BitmapText;
            }(core.Container);
            exports.default = BitmapText, BitmapText.fonts = {};
        }, {
            "../core": 65,
            "../core/math/ObservablePoint": 68,
            "../core/settings": 101
        } ],
        136: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _Matrix2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../core/math/Matrix")), tempMat = new _Matrix2.default(), TextureTransform = function() {
                function TextureTransform(texture, clampMargin) {
                    _classCallCheck(this, TextureTransform), this._texture = texture, this.mapCoord = new _Matrix2.default(), 
                    this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), 
                    this._lastTextureID = -1, this.clampOffset = 0, this.clampMargin = void 0 === clampMargin ? .5 : clampMargin;
                }
                return TextureTransform.prototype.multiplyUvs = function(uvs, out) {
                    void 0 === out && (out = uvs);
                    for (var mat = this.mapCoord, i = 0; i < uvs.length; i += 2) {
                        var x = uvs[i], y = uvs[i + 1];
                        out[i] = x * mat.a + y * mat.c + mat.tx, out[i + 1] = x * mat.b + y * mat.d + mat.ty;
                    }
                    return out;
                }, TextureTransform.prototype.update = function(forceUpdate) {
                    var tex = this._texture;
                    if (!tex || !tex.valid) return !1;
                    if (!forceUpdate && this._lastTextureID === tex._updateID) return !1;
                    this._lastTextureID = tex._updateID;
                    var uvs = tex._uvs;
                    this.mapCoord.set(uvs.x1 - uvs.x0, uvs.y1 - uvs.y0, uvs.x3 - uvs.x0, uvs.y3 - uvs.y0, uvs.x0, uvs.y0);
                    var orig = tex.orig, trim = tex.trim;
                    trim && (tempMat.set(orig.width / trim.width, 0, 0, orig.height / trim.height, -trim.x / trim.width, -trim.y / trim.height), 
                    this.mapCoord.append(tempMat));
                    var texBase = tex.baseTexture, frame = this.uClampFrame, margin = this.clampMargin / texBase.resolution, offset = this.clampOffset;
                    return frame[0] = (tex._frame.x + margin + offset) / texBase.width, frame[1] = (tex._frame.y + margin + offset) / texBase.height, 
                    frame[2] = (tex._frame.x + tex._frame.width - margin + offset) / texBase.width, 
                    frame[3] = (tex._frame.y + tex._frame.height - margin + offset) / texBase.height, 
                    this.uClampOffset[0] = offset / texBase.realWidth, this.uClampOffset[1] = offset / texBase.realHeight, 
                    !0;
                }, _createClass(TextureTransform, [ {
                    key: "texture",
                    get: function() {
                        return this._texture;
                    },
                    set: function(value) {
                        this._texture = value, this._lastTextureID = -1;
                    }
                } ]), TextureTransform;
            }();
            exports.default = TextureTransform;
        }, {
            "../core/math/Matrix": 67
        } ],
        137: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../core")), _CanvasTinter2 = _interopRequireDefault(require("../core/sprites/canvas/CanvasTinter")), _TextureTransform2 = _interopRequireDefault(require("./TextureTransform")), tempPoint = new core.Point(), TilingSprite = function(_core$Sprite) {
                function TilingSprite(texture) {
                    var width = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100, height = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100;
                    _classCallCheck(this, TilingSprite);
                    var _this = _possibleConstructorReturn(this, _core$Sprite.call(this, texture));
                    return _this.tileTransform = new core.TransformStatic(), _this._width = width, _this._height = height, 
                    _this._canvasPattern = null, _this.uvTransform = texture.transform || new _TextureTransform2.default(texture), 
                    _this.pluginName = "tilingSprite", _this.uvRespectAnchor = !1, _this;
                }
                return _inherits(TilingSprite, _core$Sprite), TilingSprite.prototype._onTextureUpdate = function() {
                    this.uvTransform && (this.uvTransform.texture = this._texture);
                }, TilingSprite.prototype._renderWebGL = function(renderer) {
                    var texture = this._texture;
                    texture && texture.valid && (this.tileTransform.updateLocalTransform(), this.uvTransform.update(), 
                    renderer.setObjectRenderer(renderer.plugins[this.pluginName]), renderer.plugins[this.pluginName].render(this));
                }, TilingSprite.prototype._renderCanvas = function(renderer) {
                    var texture = this._texture;
                    if (texture.baseTexture.hasLoaded) {
                        var context = renderer.context, transform = this.worldTransform, resolution = renderer.resolution, baseTexture = texture.baseTexture, baseTextureResolution = baseTexture.resolution, modX = this.tilePosition.x / this.tileScale.x % texture._frame.width * baseTextureResolution, modY = this.tilePosition.y / this.tileScale.y % texture._frame.height * baseTextureResolution;
                        if (!this._canvasPattern) {
                            var tempCanvas = new core.CanvasRenderTarget(texture._frame.width, texture._frame.height, baseTextureResolution);
                            16777215 !== this.tint ? (this.cachedTint !== this.tint && (this.cachedTint = this.tint, 
                            this.tintedTexture = _CanvasTinter2.default.getTintedTexture(this, this.tint)), 
                            tempCanvas.context.drawImage(this.tintedTexture, 0, 0)) : tempCanvas.context.drawImage(baseTexture.source, -texture._frame.x * baseTextureResolution, -texture._frame.y * baseTextureResolution), 
                            this._canvasPattern = tempCanvas.context.createPattern(tempCanvas.canvas, "repeat");
                        }
                        context.globalAlpha = this.worldAlpha, context.setTransform(transform.a * resolution, transform.b * resolution, transform.c * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution), 
                        renderer.setBlendMode(this.blendMode), context.fillStyle = this._canvasPattern, 
                        context.scale(this.tileScale.x / baseTextureResolution, this.tileScale.y / baseTextureResolution);
                        var anchorX = this.anchor.x * -this._width, anchorY = this.anchor.y * -this._height;
                        this.uvRespectAnchor ? (context.translate(modX, modY), context.fillRect(-modX + anchorX, -modY + anchorY, this._width / this.tileScale.x * baseTextureResolution, this._height / this.tileScale.y * baseTextureResolution)) : (context.translate(modX + anchorX, modY + anchorY), 
                        context.fillRect(-modX, -modY, this._width / this.tileScale.x * baseTextureResolution, this._height / this.tileScale.y * baseTextureResolution));
                    }
                }, TilingSprite.prototype._calculateBounds = function() {
                    var minX = this._width * -this._anchor._x, minY = this._height * -this._anchor._y, maxX = this._width * (1 - this._anchor._x), maxY = this._height * (1 - this._anchor._y);
                    this._bounds.addFrame(this.transform, minX, minY, maxX, maxY);
                }, TilingSprite.prototype.getLocalBounds = function(rect) {
                    return 0 === this.children.length ? (this._bounds.minX = this._width * -this._anchor._x, 
                    this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), 
                    this._bounds.maxY = this._height * (1 - this._anchor._x), rect || (this._localBoundsRect || (this._localBoundsRect = new core.Rectangle()), 
                    rect = this._localBoundsRect), this._bounds.getRectangle(rect)) : _core$Sprite.prototype.getLocalBounds.call(this, rect);
                }, TilingSprite.prototype.containsPoint = function(point) {
                    this.worldTransform.applyInverse(point, tempPoint);
                    var width = this._width, height = this._height, x1 = -width * this.anchor._x;
                    if (tempPoint.x >= x1 && tempPoint.x < x1 + width) {
                        var y1 = -height * this.anchor._y;
                        if (tempPoint.y >= y1 && tempPoint.y < y1 + height) return !0;
                    }
                    return !1;
                }, TilingSprite.prototype.destroy = function(options) {
                    _core$Sprite.prototype.destroy.call(this, options), this.tileTransform = null, this.uvTransform = null;
                }, TilingSprite.from = function(source, width, height) {
                    return new TilingSprite(core.Texture.from(source), width, height);
                }, TilingSprite.fromFrame = function(frameId, width, height) {
                    var texture = core.utils.TextureCache[frameId];
                    if (!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache ' + this);
                    return new TilingSprite(texture, width, height);
                }, TilingSprite.fromImage = function(imageId, width, height, crossorigin, scaleMode) {
                    return new TilingSprite(core.Texture.fromImage(imageId, crossorigin, scaleMode), width, height);
                }, _createClass(TilingSprite, [ {
                    key: "clampMargin",
                    get: function() {
                        return this.uvTransform.clampMargin;
                    },
                    set: function(value) {
                        this.uvTransform.clampMargin = value, this.uvTransform.update(!0);
                    }
                }, {
                    key: "tileScale",
                    get: function() {
                        return this.tileTransform.scale;
                    },
                    set: function(value) {
                        this.tileTransform.scale.copy(value);
                    }
                }, {
                    key: "tilePosition",
                    get: function() {
                        return this.tileTransform.position;
                    },
                    set: function(value) {
                        this.tileTransform.position.copy(value);
                    }
                }, {
                    key: "width",
                    get: function() {
                        return this._width;
                    },
                    set: function(value) {
                        this._width = value;
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this._height;
                    },
                    set: function(value) {
                        this._height = value;
                    }
                } ]), TilingSprite;
            }(core.Sprite);
            exports.default = TilingSprite;
        }, {
            "../core": 65,
            "../core/sprites/canvas/CanvasTinter": 104,
            "./TextureTransform": 136
        } ],
        138: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../core")), _Texture2 = _interopRequireDefault(require("../core/textures/Texture")), _BaseTexture2 = _interopRequireDefault(require("../core/textures/BaseTexture")), _utils = require("../core/utils"), DisplayObject = core.DisplayObject, _tempMatrix = new core.Matrix();
            DisplayObject.prototype._cacheAsBitmap = !1, DisplayObject.prototype._cacheData = !1;
            var CacheData = function CacheData() {
                _classCallCheck(this, CacheData), this.textureCacheId = null, this.originalRenderWebGL = null, 
                this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, 
                this.originalUpdateTransform = null, this.originalHitTest = null, this.originalDestroy = null, 
                this.originalMask = null, this.originalFilterArea = null, this.sprite = null;
            };
            Object.defineProperties(DisplayObject.prototype, {
                cacheAsBitmap: {
                    get: function() {
                        return this._cacheAsBitmap;
                    },
                    set: function(value) {
                        if (this._cacheAsBitmap !== value) {
                            this._cacheAsBitmap = value;
                            var data = void 0;
                            value ? (this._cacheData || (this._cacheData = new CacheData()), (data = this._cacheData).originalRenderWebGL = this.renderWebGL, 
                            data.originalRenderCanvas = this.renderCanvas, data.originalUpdateTransform = this.updateTransform, 
                            data.originalCalculateBounds = this._calculateBounds, data.originalGetLocalBounds = this.getLocalBounds, 
                            data.originalDestroy = this.destroy, data.originalContainsPoint = this.containsPoint, 
                            data.originalMask = this._mask, data.originalFilterArea = this.filterArea, this.renderWebGL = this._renderCachedWebGL, 
                            this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : ((data = this._cacheData).sprite && this._destroyCachedDisplayObject(), 
                            this.renderWebGL = data.originalRenderWebGL, this.renderCanvas = data.originalRenderCanvas, 
                            this._calculateBounds = data.originalCalculateBounds, this.getLocalBounds = data.originalGetLocalBounds, 
                            this.destroy = data.originalDestroy, this.updateTransform = data.originalUpdateTransform, 
                            this.containsPoint = data.originalContainsPoint, this._mask = data.originalMask, 
                            this.filterArea = data.originalFilterArea);
                        }
                    }
                }
            }), DisplayObject.prototype._renderCachedWebGL = function(renderer) {
                !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(renderer), 
                this._cacheData.sprite._transformID = -1, this._cacheData.sprite.worldAlpha = this.worldAlpha, 
                this._cacheData.sprite._renderWebGL(renderer));
            }, DisplayObject.prototype._initCachedDisplayObject = function(renderer) {
                if (!this._cacheData || !this._cacheData.sprite) {
                    var cacheAlpha = this.alpha;
                    this.alpha = 1, renderer.currentRenderer.flush();
                    var bounds = this.getLocalBounds().clone();
                    if (this._filters) {
                        var padding = this._filters[0].padding;
                        bounds.pad(padding);
                    }
                    var cachedRenderTarget = renderer._activeRenderTarget, stack = renderer.filterManager.filterStack, renderTexture = core.RenderTexture.create(0 | bounds.width, 0 | bounds.height), textureCacheId = "cacheAsBitmap_" + (0, 
                    _utils.uid)();
                    this._cacheData.textureCacheId = textureCacheId, _BaseTexture2.default.addToCache(renderTexture.baseTexture, textureCacheId), 
                    _Texture2.default.addToCache(renderTexture, textureCacheId);
                    var m = _tempMatrix;
                    m.tx = -bounds.x, m.ty = -bounds.y, this.transform.worldTransform.identity(), this.renderWebGL = this._cacheData.originalRenderWebGL, 
                    renderer.render(this, renderTexture, !0, m, !0), renderer.bindRenderTarget(cachedRenderTarget), 
                    renderer.filterManager.filterStack = stack, this.renderWebGL = this._renderCachedWebGL, 
                    this.updateTransform = this.displayObjectUpdateTransform, this._mask = null, this.filterArea = null;
                    var cachedSprite = new core.Sprite(renderTexture);
                    cachedSprite.transform.worldTransform = this.transform.worldTransform, cachedSprite.anchor.x = -bounds.x / bounds.width, 
                    cachedSprite.anchor.y = -bounds.y / bounds.height, cachedSprite.alpha = cacheAlpha, 
                    cachedSprite._bounds = this._bounds, this._calculateBounds = this._calculateCachedBounds, 
                    this.getLocalBounds = this._getCachedLocalBounds, this._cacheData.sprite = cachedSprite, 
                    this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = renderer._tempDisplayObjectParent, 
                    this.updateTransform(), this.parent = null), this.containsPoint = cachedSprite.containsPoint.bind(cachedSprite);
                }
            }, DisplayObject.prototype._renderCachedCanvas = function(renderer) {
                !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(renderer), 
                this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite.renderCanvas(renderer));
            }, DisplayObject.prototype._initCachedDisplayObjectCanvas = function(renderer) {
                if (!this._cacheData || !this._cacheData.sprite) {
                    var bounds = this.getLocalBounds(), cacheAlpha = this.alpha;
                    this.alpha = 1;
                    var cachedRenderTarget = renderer.context, renderTexture = core.RenderTexture.create(0 | bounds.width, 0 | bounds.height), textureCacheId = "cacheAsBitmap_" + (0, 
                    _utils.uid)();
                    this._cacheData.textureCacheId = textureCacheId, _BaseTexture2.default.addToCache(renderTexture.baseTexture, textureCacheId), 
                    _Texture2.default.addToCache(renderTexture, textureCacheId);
                    var m = _tempMatrix;
                    this.transform.localTransform.copy(m), m.invert(), m.tx -= bounds.x, m.ty -= bounds.y, 
                    this.renderCanvas = this._cacheData.originalRenderCanvas, renderer.render(this, renderTexture, !0, m, !1), 
                    renderer.context = cachedRenderTarget, this.renderCanvas = this._renderCachedCanvas, 
                    this._calculateBounds = this._calculateCachedBounds, this._mask = null, this.filterArea = null;
                    var cachedSprite = new core.Sprite(renderTexture);
                    cachedSprite.transform.worldTransform = this.transform.worldTransform, cachedSprite.anchor.x = -bounds.x / bounds.width, 
                    cachedSprite.anchor.y = -bounds.y / bounds.height, cachedSprite._bounds = this._bounds, 
                    cachedSprite.alpha = cacheAlpha, this.parent ? this.updateTransform() : (this.parent = renderer._tempDisplayObjectParent, 
                    this.updateTransform(), this.parent = null), this.updateTransform = this.displayObjectUpdateTransform, 
                    this._cacheData.sprite = cachedSprite, this.containsPoint = cachedSprite.containsPoint.bind(cachedSprite);
                }
            }, DisplayObject.prototype._calculateCachedBounds = function() {
                this._cacheData.sprite._calculateBounds();
            }, DisplayObject.prototype._getCachedLocalBounds = function() {
                return this._cacheData.sprite.getLocalBounds();
            }, DisplayObject.prototype._destroyCachedDisplayObject = function() {
                this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null, _BaseTexture2.default.removeFromCache(this._cacheData.textureCacheId), 
                _Texture2.default.removeFromCache(this._cacheData.textureCacheId), this._cacheData.textureCacheId = null;
            }, DisplayObject.prototype._cacheAsBitmapDestroy = function(options) {
                this.cacheAsBitmap = !1, this.destroy(options);
            };
        }, {
            "../core": 65,
            "../core/textures/BaseTexture": 112,
            "../core/textures/Texture": 115,
            "../core/utils": 124
        } ],
        139: [ function(require, module, exports) {
            "use strict";
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../core"));
            core.DisplayObject.prototype.name = null, core.Container.prototype.getChildByName = function(name) {
                for (var i = 0; i < this.children.length; i++) if (this.children[i].name === name) return this.children[i];
                return null;
            };
        }, {
            "../core": 65
        } ],
        140: [ function(require, module, exports) {
            "use strict";
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../core"));
            core.DisplayObject.prototype.getGlobalPosition = function() {
                var point = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new core.Point(), skipUpdate = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                return this.parent ? this.parent.toGlobal(this.position, point, skipUpdate) : (point.x = this.position.x, 
                point.y = this.position.y), point;
            };
        }, {
            "../core": 65
        } ],
        141: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0, exports.BitmapText = exports.TilingSpriteRenderer = exports.TilingSprite = exports.TextureTransform = exports.AnimatedSprite = void 0;
            var _AnimatedSprite = require("./AnimatedSprite");
            Object.defineProperty(exports, "AnimatedSprite", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_AnimatedSprite).default;
                }
            });
            var _TextureTransform = require("./TextureTransform");
            Object.defineProperty(exports, "TextureTransform", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_TextureTransform).default;
                }
            });
            var _TilingSprite = require("./TilingSprite");
            Object.defineProperty(exports, "TilingSprite", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_TilingSprite).default;
                }
            });
            var _TilingSpriteRenderer = require("./webgl/TilingSpriteRenderer");
            Object.defineProperty(exports, "TilingSpriteRenderer", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_TilingSpriteRenderer).default;
                }
            });
            var _BitmapText = require("./BitmapText");
            Object.defineProperty(exports, "BitmapText", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_BitmapText).default;
                }
            }), require("./cacheAsBitmap"), require("./getChildByName"), require("./getGlobalPosition");
        }, {
            "./AnimatedSprite": 134,
            "./BitmapText": 135,
            "./TextureTransform": 136,
            "./TilingSprite": 137,
            "./cacheAsBitmap": 138,
            "./getChildByName": 139,
            "./getGlobalPosition": 140,
            "./webgl/TilingSpriteRenderer": 142
        } ],
        142: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), _const = require("../../core/const"), tempMat = (require("path"), 
            new core.Matrix()), TilingSpriteRenderer = function(_core$ObjectRenderer) {
                function TilingSpriteRenderer(renderer) {
                    _classCallCheck(this, TilingSpriteRenderer);
                    var _this = _possibleConstructorReturn(this, _core$ObjectRenderer.call(this, renderer));
                    return _this.shader = null, _this.simpleShader = null, _this.quad = null, _this;
                }
                return _inherits(TilingSpriteRenderer, _core$ObjectRenderer), TilingSpriteRenderer.prototype.onContextChange = function() {
                    var gl = this.renderer.gl;
                    this.shader = new core.Shader(gl, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = mod(vTextureCoord - uClampOffset, vec2(1.0, 1.0)) + uClampOffset;\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 sample = texture2D(uSampler, coord);\n    gl_FragColor = sample * uColor;\n}\n"), 
                    this.simpleShader = new core.Shader(gl, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = sample * uColor;\n}\n"), 
                    this.renderer.bindVao(null), this.quad = new core.Quad(gl, this.renderer.state.attribState), 
                    this.quad.initVao(this.shader);
                }, TilingSpriteRenderer.prototype.render = function(ts) {
                    var renderer = this.renderer, quad = this.quad;
                    renderer.bindVao(quad.vao);
                    var vertices = quad.vertices;
                    vertices[0] = vertices[6] = ts._width * -ts.anchor.x, vertices[1] = vertices[3] = ts._height * -ts.anchor.y, 
                    vertices[2] = vertices[4] = ts._width * (1 - ts.anchor.x), vertices[5] = vertices[7] = ts._height * (1 - ts.anchor.y), 
                    ts.uvRespectAnchor && ((vertices = quad.uvs)[0] = vertices[6] = -ts.anchor.x, vertices[1] = vertices[3] = -ts.anchor.y, 
                    vertices[2] = vertices[4] = 1 - ts.anchor.x, vertices[5] = vertices[7] = 1 - ts.anchor.y), 
                    quad.upload();
                    var tex = ts._texture, baseTex = tex.baseTexture, lt = ts.tileTransform.localTransform, uv = ts.uvTransform, isSimple = baseTex.isPowerOfTwo && tex.frame.width === baseTex.width && tex.frame.height === baseTex.height;
                    isSimple && (baseTex._glTextures[renderer.CONTEXT_UID] ? isSimple = baseTex.wrapMode !== _const.WRAP_MODES.CLAMP : baseTex.wrapMode === _const.WRAP_MODES.CLAMP && (baseTex.wrapMode = _const.WRAP_MODES.REPEAT));
                    var shader = isSimple ? this.simpleShader : this.shader;
                    renderer.bindShader(shader);
                    var w = tex.width, h = tex.height, W = ts._width, H = ts._height;
                    tempMat.set(lt.a * w / W, lt.b * w / H, lt.c * h / W, lt.d * h / H, lt.tx / W, lt.ty / H), 
                    tempMat.invert(), isSimple ? tempMat.prepend(uv.mapCoord) : (shader.uniforms.uMapCoord = uv.mapCoord.toArray(!0), 
                    shader.uniforms.uClampFrame = uv.uClampFrame, shader.uniforms.uClampOffset = uv.uClampOffset), 
                    shader.uniforms.uTransform = tempMat.toArray(!0), shader.uniforms.uColor = core.utils.premultiplyTintToRgba(ts.tint, ts.worldAlpha, shader.uniforms.uColor, baseTex.premultipliedAlpha), 
                    shader.uniforms.translationMatrix = ts.transform.worldTransform.toArray(!0), shader.uniforms.uSampler = renderer.bindTexture(tex), 
                    renderer.setBlendMode(core.utils.correctBlendMode(ts.blendMode, baseTex.premultipliedAlpha)), 
                    quad.vao.draw(this.renderer.gl.TRIANGLES, 6, 0);
                }, TilingSpriteRenderer;
            }(core.ObjectRenderer);
            exports.default = TilingSpriteRenderer, core.WebGLRenderer.registerPlugin("tilingSprite", TilingSpriteRenderer);
        }, {
            "../../core": 65,
            "../../core/const": 46,
            path: 8
        } ],
        143: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), _BlurXFilter2 = _interopRequireDefault(require("./BlurXFilter")), _BlurYFilter2 = _interopRequireDefault(require("./BlurYFilter")), BlurFilter = function(_core$Filter) {
                function BlurFilter(strength, quality, resolution, kernelSize) {
                    _classCallCheck(this, BlurFilter);
                    var _this = _possibleConstructorReturn(this, _core$Filter.call(this));
                    return _this.blurXFilter = new _BlurXFilter2.default(strength, quality, resolution, kernelSize), 
                    _this.blurYFilter = new _BlurYFilter2.default(strength, quality, resolution, kernelSize), 
                    _this.padding = 0, _this.resolution = resolution || core.settings.RESOLUTION, _this.quality = quality || 4, 
                    _this.blur = strength || 8, _this;
                }
                return _inherits(BlurFilter, _core$Filter), BlurFilter.prototype.apply = function(filterManager, input, output) {
                    var renderTarget = filterManager.getRenderTarget(!0);
                    this.blurXFilter.apply(filterManager, input, renderTarget, !0), this.blurYFilter.apply(filterManager, renderTarget, output, !1), 
                    filterManager.returnRenderTarget(renderTarget);
                }, _createClass(BlurFilter, [ {
                    key: "blur",
                    get: function() {
                        return this.blurXFilter.blur;
                    },
                    set: function(value) {
                        this.blurXFilter.blur = this.blurYFilter.blur = value, this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength));
                    }
                }, {
                    key: "quality",
                    get: function() {
                        return this.blurXFilter.quality;
                    },
                    set: function(value) {
                        this.blurXFilter.quality = this.blurYFilter.quality = value;
                    }
                }, {
                    key: "blurX",
                    get: function() {
                        return this.blurXFilter.blur;
                    },
                    set: function(value) {
                        this.blurXFilter.blur = value, this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength));
                    }
                }, {
                    key: "blurY",
                    get: function() {
                        return this.blurYFilter.blur;
                    },
                    set: function(value) {
                        this.blurYFilter.blur = value, this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength));
                    }
                }, {
                    key: "blendMode",
                    get: function() {
                        return this.blurYFilter._blendMode;
                    },
                    set: function(value) {
                        this.blurYFilter._blendMode = value;
                    }
                } ]), BlurFilter;
            }(core.Filter);
            exports.default = BlurFilter;
        }, {
            "../../core": 65,
            "./BlurXFilter": 144,
            "./BlurYFilter": 145
        } ],
        144: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), _generateBlurVertSource2 = _interopRequireDefault(require("./generateBlurVertSource")), _generateBlurFragSource2 = _interopRequireDefault(require("./generateBlurFragSource")), _getMaxBlurKernelSize2 = _interopRequireDefault(require("./getMaxBlurKernelSize")), BlurXFilter = function(_core$Filter) {
                function BlurXFilter(strength, quality, resolution, kernelSize) {
                    _classCallCheck(this, BlurXFilter), kernelSize = kernelSize || 5;
                    var vertSrc = (0, _generateBlurVertSource2.default)(kernelSize, !0), fragSrc = (0, 
                    _generateBlurFragSource2.default)(kernelSize), _this = _possibleConstructorReturn(this, _core$Filter.call(this, vertSrc, fragSrc));
                    return _this.resolution = resolution || core.settings.RESOLUTION, _this._quality = 0, 
                    _this.quality = quality || 4, _this.strength = strength || 8, _this.firstRun = !0, 
                    _this;
                }
                return _inherits(BlurXFilter, _core$Filter), BlurXFilter.prototype.apply = function(filterManager, input, output, clear) {
                    if (this.firstRun) {
                        var gl = filterManager.renderer.gl, kernelSize = (0, _getMaxBlurKernelSize2.default)(gl);
                        this.vertexSrc = (0, _generateBlurVertSource2.default)(kernelSize, !0), this.fragmentSrc = (0, 
                        _generateBlurFragSource2.default)(kernelSize), this.firstRun = !1;
                    }
                    if (this.uniforms.strength = 1 / output.size.width * (output.size.width / input.size.width), 
                    this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 
                    1 === this.passes) filterManager.applyFilter(this, input, output, clear); else {
                        for (var renderTarget = filterManager.getRenderTarget(!0), flip = input, flop = renderTarget, i = 0; i < this.passes - 1; i++) {
                            filterManager.applyFilter(this, flip, flop, !0);
                            var temp = flop;
                            flop = flip, flip = temp;
                        }
                        filterManager.applyFilter(this, flip, output, clear), filterManager.returnRenderTarget(renderTarget);
                    }
                }, _createClass(BlurXFilter, [ {
                    key: "blur",
                    get: function() {
                        return this.strength;
                    },
                    set: function(value) {
                        this.padding = 2 * Math.abs(value), this.strength = value;
                    }
                }, {
                    key: "quality",
                    get: function() {
                        return this._quality;
                    },
                    set: function(value) {
                        this._quality = value, this.passes = value;
                    }
                } ]), BlurXFilter;
            }(core.Filter);
            exports.default = BlurXFilter;
        }, {
            "../../core": 65,
            "./generateBlurFragSource": 146,
            "./generateBlurVertSource": 147,
            "./getMaxBlurKernelSize": 148
        } ],
        145: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), _generateBlurVertSource2 = _interopRequireDefault(require("./generateBlurVertSource")), _generateBlurFragSource2 = _interopRequireDefault(require("./generateBlurFragSource")), _getMaxBlurKernelSize2 = _interopRequireDefault(require("./getMaxBlurKernelSize")), BlurYFilter = function(_core$Filter) {
                function BlurYFilter(strength, quality, resolution, kernelSize) {
                    _classCallCheck(this, BlurYFilter), kernelSize = kernelSize || 5;
                    var vertSrc = (0, _generateBlurVertSource2.default)(kernelSize, !1), fragSrc = (0, 
                    _generateBlurFragSource2.default)(kernelSize), _this = _possibleConstructorReturn(this, _core$Filter.call(this, vertSrc, fragSrc));
                    return _this.resolution = resolution || core.settings.RESOLUTION, _this._quality = 0, 
                    _this.quality = quality || 4, _this.strength = strength || 8, _this.firstRun = !0, 
                    _this;
                }
                return _inherits(BlurYFilter, _core$Filter), BlurYFilter.prototype.apply = function(filterManager, input, output, clear) {
                    if (this.firstRun) {
                        var gl = filterManager.renderer.gl, kernelSize = (0, _getMaxBlurKernelSize2.default)(gl);
                        this.vertexSrc = (0, _generateBlurVertSource2.default)(kernelSize, !1), this.fragmentSrc = (0, 
                        _generateBlurFragSource2.default)(kernelSize), this.firstRun = !1;
                    }
                    if (this.uniforms.strength = 1 / output.size.height * (output.size.height / input.size.height), 
                    this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 
                    1 === this.passes) filterManager.applyFilter(this, input, output, clear); else {
                        for (var renderTarget = filterManager.getRenderTarget(!0), flip = input, flop = renderTarget, i = 0; i < this.passes - 1; i++) {
                            filterManager.applyFilter(this, flip, flop, !0);
                            var temp = flop;
                            flop = flip, flip = temp;
                        }
                        filterManager.applyFilter(this, flip, output, clear), filterManager.returnRenderTarget(renderTarget);
                    }
                }, _createClass(BlurYFilter, [ {
                    key: "blur",
                    get: function() {
                        return this.strength;
                    },
                    set: function(value) {
                        this.padding = 2 * Math.abs(value), this.strength = value;
                    }
                }, {
                    key: "quality",
                    get: function() {
                        return this._quality;
                    },
                    set: function(value) {
                        this._quality = value, this.passes = value;
                    }
                } ]), BlurYFilter;
            }(core.Filter);
            exports.default = BlurYFilter;
        }, {
            "../../core": 65,
            "./generateBlurFragSource": 146,
            "./generateBlurVertSource": 147,
            "./getMaxBlurKernelSize": 148
        } ],
        146: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(kernelSize) {
                for (var kernel = GAUSSIAN_VALUES[kernelSize], halfLength = kernel.length, fragSource = fragTemplate, blurLoop = "", value = void 0, i = 0; i < kernelSize; i++) {
                    var blur = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;".replace("%index%", i);
                    value = i, i >= halfLength && (value = kernelSize - i - 1), blurLoop += blur = blur.replace("%value%", kernel[value]), 
                    blurLoop += "\n";
                }
                return fragSource = fragSource.replace("%blur%", blurLoop), fragSource = fragSource.replace("%size%", kernelSize);
            };
            var GAUSSIAN_VALUES = {
                5: [ .153388, .221461, .250301 ],
                7: [ .071303, .131514, .189879, .214607 ],
                9: [ .028532, .067234, .124009, .179044, .20236 ],
                11: [ .0093, .028002, .065984, .121703, .175713, .198596 ],
                13: [ .002406, .009255, .027867, .065666, .121117, .174868, .197641 ],
                15: [ 489e-6, .002403, .009246, .02784, .065602, .120999, .174697, .197448 ]
            }, fragTemplate = [ "varying vec2 vBlurTexCoords[%size%];", "uniform sampler2D uSampler;", "void main(void)", "{", "    gl_FragColor = vec4(0.0);", "    %blur%", "}" ].join("\n");
        }, {} ],
        147: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(kernelSize, x) {
                var halfLength = Math.ceil(kernelSize / 2), vertSource = vertTemplate, blurLoop = "", template = void 0;
                template = x ? "vBlurTexCoords[%index%] = aTextureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] = aTextureCoord + vec2(0.0, %sampleIndex% * strength);";
                for (var i = 0; i < kernelSize; i++) {
                    var blur = template.replace("%index%", i);
                    blurLoop += blur = blur.replace("%sampleIndex%", i - (halfLength - 1) + ".0"), blurLoop += "\n";
                }
                return vertSource = vertSource.replace("%blur%", blurLoop), vertSource = vertSource.replace("%size%", kernelSize);
            };
            var vertTemplate = [ "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform float strength;", "uniform mat3 projectionMatrix;", "varying vec2 vBlurTexCoords[%size%];", "void main(void)", "{", "gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);", "%blur%", "}" ].join("\n");
        }, {} ],
        148: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(gl) {
                for (var maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS), kernelSize = 15; kernelSize > maxVaryings; ) kernelSize -= 2;
                return kernelSize;
            };
        }, {} ],
        149: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), ColorMatrixFilter = (require("path"), function(_core$Filter) {
                function ColorMatrixFilter() {
                    _classCallCheck(this, ColorMatrixFilter);
                    var _this = _possibleConstructorReturn(this, _core$Filter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n"));
                    return _this.uniforms.m = [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 ], 
                    _this.alpha = 1, _this;
                }
                return _inherits(ColorMatrixFilter, _core$Filter), ColorMatrixFilter.prototype._loadMatrix = function(matrix) {
                    var newMatrix = matrix;
                    arguments.length > 1 && void 0 !== arguments[1] && arguments[1] && (this._multiply(newMatrix, this.uniforms.m, matrix), 
                    newMatrix = this._colorMatrix(newMatrix)), this.uniforms.m = newMatrix;
                }, ColorMatrixFilter.prototype._multiply = function(out, a, b) {
                    return out[0] = a[0] * b[0] + a[1] * b[5] + a[2] * b[10] + a[3] * b[15], out[1] = a[0] * b[1] + a[1] * b[6] + a[2] * b[11] + a[3] * b[16], 
                    out[2] = a[0] * b[2] + a[1] * b[7] + a[2] * b[12] + a[3] * b[17], out[3] = a[0] * b[3] + a[1] * b[8] + a[2] * b[13] + a[3] * b[18], 
                    out[4] = a[0] * b[4] + a[1] * b[9] + a[2] * b[14] + a[3] * b[19] + a[4], out[5] = a[5] * b[0] + a[6] * b[5] + a[7] * b[10] + a[8] * b[15], 
                    out[6] = a[5] * b[1] + a[6] * b[6] + a[7] * b[11] + a[8] * b[16], out[7] = a[5] * b[2] + a[6] * b[7] + a[7] * b[12] + a[8] * b[17], 
                    out[8] = a[5] * b[3] + a[6] * b[8] + a[7] * b[13] + a[8] * b[18], out[9] = a[5] * b[4] + a[6] * b[9] + a[7] * b[14] + a[8] * b[19] + a[9], 
                    out[10] = a[10] * b[0] + a[11] * b[5] + a[12] * b[10] + a[13] * b[15], out[11] = a[10] * b[1] + a[11] * b[6] + a[12] * b[11] + a[13] * b[16], 
                    out[12] = a[10] * b[2] + a[11] * b[7] + a[12] * b[12] + a[13] * b[17], out[13] = a[10] * b[3] + a[11] * b[8] + a[12] * b[13] + a[13] * b[18], 
                    out[14] = a[10] * b[4] + a[11] * b[9] + a[12] * b[14] + a[13] * b[19] + a[14], out[15] = a[15] * b[0] + a[16] * b[5] + a[17] * b[10] + a[18] * b[15], 
                    out[16] = a[15] * b[1] + a[16] * b[6] + a[17] * b[11] + a[18] * b[16], out[17] = a[15] * b[2] + a[16] * b[7] + a[17] * b[12] + a[18] * b[17], 
                    out[18] = a[15] * b[3] + a[16] * b[8] + a[17] * b[13] + a[18] * b[18], out[19] = a[15] * b[4] + a[16] * b[9] + a[17] * b[14] + a[18] * b[19] + a[19], 
                    out;
                }, ColorMatrixFilter.prototype._colorMatrix = function(matrix) {
                    var m = new Float32Array(matrix);
                    return m[4] /= 255, m[9] /= 255, m[14] /= 255, m[19] /= 255, m;
                }, ColorMatrixFilter.prototype.brightness = function(b, multiply) {
                    var matrix = [ b, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.greyscale = function(scale, multiply) {
                    var matrix = [ scale, scale, scale, 0, 0, scale, scale, scale, 0, 0, scale, scale, scale, 0, 0, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.blackAndWhite = function(multiply) {
                    var matrix = [ .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.hue = function(rotation, multiply) {
                    rotation = (rotation || 0) / 180 * Math.PI;
                    var cosR = Math.cos(rotation), sinR = Math.sin(rotation), w = 1 / 3, sqrW = (0, 
                    Math.sqrt)(w), matrix = [ cosR + (1 - cosR) * w, w * (1 - cosR) - sqrW * sinR, w * (1 - cosR) + sqrW * sinR, 0, 0, w * (1 - cosR) + sqrW * sinR, cosR + w * (1 - cosR), w * (1 - cosR) - sqrW * sinR, 0, 0, w * (1 - cosR) - sqrW * sinR, w * (1 - cosR) + sqrW * sinR, cosR + w * (1 - cosR), 0, 0, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.contrast = function(amount, multiply) {
                    var v = (amount || 0) + 1, o = -.5 * (v - 1), matrix = [ v, 0, 0, 0, o, 0, v, 0, 0, o, 0, 0, v, 0, o, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.saturate = function() {
                    var amount = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, multiply = arguments[1], x = 2 * amount / 3 + 1, y = -.5 * (x - 1), matrix = [ x, y, y, 0, 0, y, x, y, 0, 0, y, y, x, 0, 0, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.desaturate = function() {
                    this.saturate(-1);
                }, ColorMatrixFilter.prototype.negative = function(multiply) {
                    var matrix = [ 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.sepia = function(multiply) {
                    var matrix = [ .393, .7689999, .18899999, 0, 0, .349, .6859999, .16799999, 0, 0, .272, .5339999, .13099999, 0, 0, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.technicolor = function(multiply) {
                    var matrix = [ 1.9125277891456083, -.8545344976951645, -.09155508482755585, 0, 11.793603434377337, -.3087833385928097, 1.7658908555458428, -.10601743074722245, 0, -70.35205161461398, -.231103377548616, -.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.polaroid = function(multiply) {
                    var matrix = [ 1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.toBGR = function(multiply) {
                    var matrix = [ 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.kodachrome = function(multiply) {
                    var matrix = [ 1.1285582396593525, -.3967382283601348, -.03992559172921793, 0, 63.72958762196502, -.16404339962244616, 1.0835251566291304, -.05498805115633132, 0, 24.732407896706203, -.16786010706155763, -.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.browni = function(multiply) {
                    var matrix = [ .5997023498159715, .34553243048391263, -.2708298674538042, 0, 47.43192855600873, -.037703249837783157, .8609577587992641, .15059552388459913, 0, -36.96841498319127, .24113635128153335, -.07441037908422492, .44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.vintage = function(multiply) {
                    var matrix = [ .6279345635605994, .3202183420819367, -.03965408211312453, 0, 9.651285835294123, .02578397704808868, .6441188644374771, .03259127616149294, 0, 7.462829176470591, .0466055556782719, -.0851232987247891, .5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.colorTone = function(desaturation, toned, lightColor, darkColor, multiply) {
                    desaturation = desaturation || .2, toned = toned || .15;
                    var lR = ((lightColor = lightColor || 16770432) >> 16 & 255) / 255, lG = (lightColor >> 8 & 255) / 255, lB = (255 & lightColor) / 255, dR = ((darkColor = darkColor || 3375104) >> 16 & 255) / 255, dG = (darkColor >> 8 & 255) / 255, dB = (255 & darkColor) / 255, matrix = [ .3, .59, .11, 0, 0, lR, lG, lB, desaturation, 0, dR, dG, dB, toned, 0, lR - dR, lG - dG, lB - dB, 0, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.night = function(intensity, multiply) {
                    var matrix = [ -2 * (intensity = intensity || .1), -intensity, 0, 0, 0, -intensity, 0, intensity, 0, 0, 0, intensity, 2 * intensity, 0, 0, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.predator = function(amount, multiply) {
                    var matrix = [ 11.224130630493164 * amount, -4.794486999511719 * amount, -2.8746118545532227 * amount, 0 * amount, .40342438220977783 * amount, -3.6330697536468506 * amount, 9.193157196044922 * amount, -2.951810836791992 * amount, 0 * amount, -1.316135048866272 * amount, -3.2184197902679443 * amount, -4.2375030517578125 * amount, 7.476448059082031 * amount, 0 * amount, .8044459223747253 * amount, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.lsd = function(multiply) {
                    var matrix = [ 2, -.4, .5, 0, 0, -.5, 2, -.4, 0, 0, -.4, -.5, 3, 0, 0, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, multiply);
                }, ColorMatrixFilter.prototype.reset = function() {
                    var matrix = [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 ];
                    this._loadMatrix(matrix, !1);
                }, _createClass(ColorMatrixFilter, [ {
                    key: "matrix",
                    get: function() {
                        return this.uniforms.m;
                    },
                    set: function(value) {
                        this.uniforms.m = value;
                    }
                }, {
                    key: "alpha",
                    get: function() {
                        return this.uniforms.uAlpha;
                    },
                    set: function(value) {
                        this.uniforms.uAlpha = value;
                    }
                } ]), ColorMatrixFilter;
            }(core.Filter));
            exports.default = ColorMatrixFilter, ColorMatrixFilter.prototype.grayscale = ColorMatrixFilter.prototype.greyscale;
        }, {
            "../../core": 65,
            path: 8
        } ],
        150: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), DisplacementFilter = (require("path"), function(_core$Filter) {
                function DisplacementFilter(sprite, scale) {
                    _classCallCheck(this, DisplacementFilter);
                    var maskMatrix = new core.Matrix();
                    sprite.renderable = !1;
                    var _this = _possibleConstructorReturn(this, _core$Filter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vTextureCoord = aTextureCoord;\n}", "varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), filterClamp.xy, filterClamp.zw));\n}\n"));
                    return _this.maskSprite = sprite, _this.maskMatrix = maskMatrix, _this.uniforms.mapSampler = sprite._texture, 
                    _this.uniforms.filterMatrix = maskMatrix, _this.uniforms.scale = {
                        x: 1,
                        y: 1
                    }, null !== scale && void 0 !== scale || (scale = 20), _this.scale = new core.Point(scale, scale), 
                    _this;
                }
                return _inherits(DisplacementFilter, _core$Filter), DisplacementFilter.prototype.apply = function(filterManager, input, output) {
                    var ratio = 1 / output.destinationFrame.width * (output.size.width / input.size.width);
                    this.uniforms.filterMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), 
                    this.uniforms.scale.x = this.scale.x * ratio, this.uniforms.scale.y = this.scale.y * ratio, 
                    filterManager.applyFilter(this, input, output);
                }, _createClass(DisplacementFilter, [ {
                    key: "map",
                    get: function() {
                        return this.uniforms.mapSampler;
                    },
                    set: function(value) {
                        this.uniforms.mapSampler = value;
                    }
                } ]), DisplacementFilter;
            }(core.Filter));
            exports.default = DisplacementFilter;
        }, {
            "../../core": 65,
            path: 8
        } ],
        151: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), FXAAFilter = (require("path"), function(_core$Filter) {
                function FXAAFilter() {
                    return _classCallCheck(this, FXAAFilter), _possibleConstructorReturn(this, _core$Filter.call(this, "\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec4 filterArea;\n\nvarying vec2 vTextureCoord;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n   vTextureCoord = aTextureCoord;\n\n   vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n   texcoords(fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}", 'varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n \n --\n \n From:\n https://github.com/mitsuhiko/webgl-meincraft\n \n Copyright (c) 2011 by Armin Ronacher.\n \n Some rights reserved.\n \n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n \n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n \n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n \n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n \n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n    \n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n      vec4 color;\n\n    color = fxaa(uSampler, fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n'));
                }
                return _inherits(FXAAFilter, _core$Filter), FXAAFilter;
            }(core.Filter));
            exports.default = FXAAFilter;
        }, {
            "../../core": 65,
            path: 8
        } ],
        152: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0;
            var _FXAAFilter = require("./fxaa/FXAAFilter");
            Object.defineProperty(exports, "FXAAFilter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_FXAAFilter).default;
                }
            });
            var _NoiseFilter = require("./noise/NoiseFilter");
            Object.defineProperty(exports, "NoiseFilter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_NoiseFilter).default;
                }
            });
            var _DisplacementFilter = require("./displacement/DisplacementFilter");
            Object.defineProperty(exports, "DisplacementFilter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_DisplacementFilter).default;
                }
            });
            var _BlurFilter = require("./blur/BlurFilter");
            Object.defineProperty(exports, "BlurFilter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_BlurFilter).default;
                }
            });
            var _BlurXFilter = require("./blur/BlurXFilter");
            Object.defineProperty(exports, "BlurXFilter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_BlurXFilter).default;
                }
            });
            var _BlurYFilter = require("./blur/BlurYFilter");
            Object.defineProperty(exports, "BlurYFilter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_BlurYFilter).default;
                }
            });
            var _ColorMatrixFilter = require("./colormatrix/ColorMatrixFilter");
            Object.defineProperty(exports, "ColorMatrixFilter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_ColorMatrixFilter).default;
                }
            });
            var _VoidFilter = require("./void/VoidFilter");
            Object.defineProperty(exports, "VoidFilter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_VoidFilter).default;
                }
            });
        }, {
            "./blur/BlurFilter": 143,
            "./blur/BlurXFilter": 144,
            "./blur/BlurYFilter": 145,
            "./colormatrix/ColorMatrixFilter": 149,
            "./displacement/DisplacementFilter": 150,
            "./fxaa/FXAAFilter": 151,
            "./noise/NoiseFilter": 153,
            "./void/VoidFilter": 154
        } ],
        153: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), NoiseFilter = (require("path"), function(_core$Filter) {
                function NoiseFilter() {
                    var noise = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : .5, seed = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Math.random();
                    _classCallCheck(this, NoiseFilter);
                    var _this = _possibleConstructorReturn(this, _core$Filter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n"));
                    return _this.noise = noise, _this.seed = seed, _this;
                }
                return _inherits(NoiseFilter, _core$Filter), _createClass(NoiseFilter, [ {
                    key: "noise",
                    get: function() {
                        return this.uniforms.uNoise;
                    },
                    set: function(value) {
                        this.uniforms.uNoise = value;
                    }
                }, {
                    key: "seed",
                    get: function() {
                        return this.uniforms.uSeed;
                    },
                    set: function(value) {
                        this.uniforms.uSeed = value;
                    }
                } ]), NoiseFilter;
            }(core.Filter));
            exports.default = NoiseFilter;
        }, {
            "../../core": 65,
            path: 8
        } ],
        154: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), VoidFilter = (require("path"), function(_core$Filter) {
                function VoidFilter() {
                    _classCallCheck(this, VoidFilter);
                    var _this = _possibleConstructorReturn(this, _core$Filter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n"));
                    return _this.glShaderKey = "void", _this;
                }
                return _inherits(VoidFilter, _core$Filter), VoidFilter;
            }(core.Filter));
            exports.default = VoidFilter;
        }, {
            "../../core": 65,
            path: 8
        } ],
        155: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../core")), InteractionData = function() {
                function InteractionData() {
                    _classCallCheck(this, InteractionData), this.global = new core.Point(), this.target = null, 
                    this.originalEvent = null, this.identifier = null, this.isPrimary = !1, this.button = 0, 
                    this.buttons = 0, this.width = 0, this.height = 0, this.tiltX = 0, this.tiltY = 0, 
                    this.pointerType = null, this.pressure = 0, this.rotationAngle = 0, this.twist = 0, 
                    this.tangentialPressure = 0;
                }
                return InteractionData.prototype.getLocalPosition = function(displayObject, point, globalPos) {
                    return displayObject.worldTransform.applyInverse(globalPos || this.global, point);
                }, InteractionData.prototype._copyEvent = function(event) {
                    event.isPrimary && (this.isPrimary = !0), this.button = event.button, this.buttons = event.buttons, 
                    this.width = event.width, this.height = event.height, this.tiltX = event.tiltX, 
                    this.tiltY = event.tiltY, this.pointerType = event.pointerType, this.pressure = event.pressure, 
                    this.rotationAngle = event.rotationAngle, this.twist = event.twist || 0, this.tangentialPressure = event.tangentialPressure || 0;
                }, InteractionData.prototype._reset = function() {
                    this.isPrimary = !1;
                }, _createClass(InteractionData, [ {
                    key: "pointerId",
                    get: function() {
                        return this.identifier;
                    }
                } ]), InteractionData;
            }();
            exports.default = InteractionData;
        }, {
            "../core": 65
        } ],
        156: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var InteractionEvent = function() {
                function InteractionEvent() {
                    _classCallCheck(this, InteractionEvent), this.stopped = !1, this.target = null, 
                    this.currentTarget = null, this.type = null, this.data = null;
                }
                return InteractionEvent.prototype.stopPropagation = function() {
                    this.stopped = !0;
                }, InteractionEvent.prototype._reset = function() {
                    this.stopped = !1, this.currentTarget = null, this.target = null;
                }, InteractionEvent;
            }();
            exports.default = InteractionEvent;
        }, {} ],
        157: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../core")), _InteractionData2 = _interopRequireDefault(require("./InteractionData")), _InteractionEvent2 = _interopRequireDefault(require("./InteractionEvent")), _InteractionTrackingData2 = _interopRequireDefault(require("./InteractionTrackingData")), _eventemitter2 = _interopRequireDefault(require("eventemitter3")), _interactiveTarget2 = _interopRequireDefault(require("./interactiveTarget"));
            core.utils.mixins.delayMixin(core.DisplayObject.prototype, _interactiveTarget2.default);
            var MOUSE_POINTER_ID = "MOUSE", hitTestEvent = {
                target: null,
                data: {
                    global: null
                }
            }, InteractionManager = function(_EventEmitter) {
                function InteractionManager(renderer, options) {
                    _classCallCheck(this, InteractionManager);
                    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
                    return options = options || {}, _this.renderer = renderer, _this.autoPreventDefault = void 0 === options.autoPreventDefault || options.autoPreventDefault, 
                    _this.interactionFrequency = options.interactionFrequency || 10, _this.mouse = new _InteractionData2.default(), 
                    _this.mouse.identifier = MOUSE_POINTER_ID, _this.mouse.global.set(-999999), _this.activeInteractionData = {}, 
                    _this.activeInteractionData[MOUSE_POINTER_ID] = _this.mouse, _this.interactionDataPool = [], 
                    _this.eventData = new _InteractionEvent2.default(), _this.interactionDOMElement = null, 
                    _this.moveWhenInside = !1, _this.eventsAdded = !1, _this.mouseOverRenderer = !1, 
                    _this.supportsTouchEvents = "ontouchstart" in window, _this.supportsPointerEvents = !!window.PointerEvent, 
                    _this.onPointerUp = _this.onPointerUp.bind(_this), _this.processPointerUp = _this.processPointerUp.bind(_this), 
                    _this.onPointerCancel = _this.onPointerCancel.bind(_this), _this.processPointerCancel = _this.processPointerCancel.bind(_this), 
                    _this.onPointerDown = _this.onPointerDown.bind(_this), _this.processPointerDown = _this.processPointerDown.bind(_this), 
                    _this.onPointerMove = _this.onPointerMove.bind(_this), _this.processPointerMove = _this.processPointerMove.bind(_this), 
                    _this.onPointerOut = _this.onPointerOut.bind(_this), _this.processPointerOverOut = _this.processPointerOverOut.bind(_this), 
                    _this.onPointerOver = _this.onPointerOver.bind(_this), _this.cursorStyles = {
                        default: "inherit",
                        pointer: "pointer"
                    }, _this.currentCursorMode = null, _this.cursor = null, _this._tempPoint = new core.Point(), 
                    _this.resolution = 1, _this.setTargetElement(_this.renderer.view, _this.renderer.resolution), 
                    _this;
                }
                return _inherits(InteractionManager, _EventEmitter), InteractionManager.prototype.hitTest = function(globalPoint, root) {
                    return hitTestEvent.target = null, hitTestEvent.data.global = globalPoint, root || (root = this.renderer._lastObjectRendered), 
                    this.processInteractive(hitTestEvent, root, null, !0), hitTestEvent.target;
                }, InteractionManager.prototype.setTargetElement = function(element) {
                    var resolution = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    this.removeEvents(), this.interactionDOMElement = element, this.resolution = resolution, 
                    this.addEvents();
                }, InteractionManager.prototype.addEvents = function() {
                    this.interactionDOMElement && (core.ticker.shared.add(this.update, this, core.UPDATE_PRIORITY.INTERACTION), 
                    window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "none", 
                    this.interactionDOMElement.style["-ms-touch-action"] = "none") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = "none"), 
                    this.supportsPointerEvents ? (window.document.addEventListener("pointermove", this.onPointerMove, !0), 
                    this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, !0), 
                    this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, !0), 
                    this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, !0), 
                    window.addEventListener("pointercancel", this.onPointerCancel, !0), window.addEventListener("pointerup", this.onPointerUp, !0)) : (window.document.addEventListener("mousemove", this.onPointerMove, !0), 
                    this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, !0), 
                    this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, !0), 
                    this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, !0), 
                    window.addEventListener("mouseup", this.onPointerUp, !0)), this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, !0), 
                    this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, !0), 
                    this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, !0)), 
                    this.eventsAdded = !0);
                }, InteractionManager.prototype.removeEvents = function() {
                    this.interactionDOMElement && (core.ticker.shared.remove(this.update, this), window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "", 
                    this.interactionDOMElement.style["-ms-touch-action"] = "") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = ""), 
                    this.supportsPointerEvents ? (window.document.removeEventListener("pointermove", this.onPointerMove, !0), 
                    this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, !0), 
                    this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, !0), 
                    this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, !0), 
                    window.removeEventListener("pointercancel", this.onPointerCancel, !0), window.removeEventListener("pointerup", this.onPointerUp, !0)) : (window.document.removeEventListener("mousemove", this.onPointerMove, !0), 
                    this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, !0), 
                    this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, !0), 
                    this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, !0), 
                    window.removeEventListener("mouseup", this.onPointerUp, !0)), this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, !0), 
                    this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, !0), 
                    this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, !0), 
                    this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, !0)), 
                    this.interactionDOMElement = null, this.eventsAdded = !1);
                }, InteractionManager.prototype.update = function(deltaTime) {
                    if (this._deltaTime += deltaTime, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, 
                    this.interactionDOMElement)) if (this.didMove) this.didMove = !1; else {
                        this.cursor = null;
                        for (var k in this.activeInteractionData) if (this.activeInteractionData.hasOwnProperty(k)) {
                            var interactionData = this.activeInteractionData[k];
                            if (interactionData.originalEvent && "touch" !== interactionData.pointerType) {
                                var interactionEvent = this.configureInteractionEventForDOMEvent(this.eventData, interactionData.originalEvent, interactionData);
                                this.processInteractive(interactionEvent, this.renderer._lastObjectRendered, this.processPointerOverOut, !0);
                            }
                        }
                        this.setCursorMode(this.cursor);
                    }
                }, InteractionManager.prototype.setCursorMode = function(mode) {
                    if (mode = mode || "default", this.currentCursorMode !== mode) {
                        this.currentCursorMode = mode;
                        var style = this.cursorStyles[mode];
                        if (style) switch (void 0 === style ? "undefined" : _typeof(style)) {
                          case "string":
                            this.interactionDOMElement.style.cursor = style;
                            break;

                          case "function":
                            style(mode);
                            break;

                          case "object":
                            Object.assign(this.interactionDOMElement.style, style);
                        } else "string" != typeof mode || Object.prototype.hasOwnProperty.call(this.cursorStyles, mode) || (this.interactionDOMElement.style.cursor = mode);
                    }
                }, InteractionManager.prototype.dispatchEvent = function(displayObject, eventString, eventData) {
                    eventData.stopped || (eventData.currentTarget = displayObject, eventData.type = eventString, 
                    displayObject.emit(eventString, eventData), displayObject[eventString] && displayObject[eventString](eventData));
                }, InteractionManager.prototype.mapPositionToPoint = function(point, x, y) {
                    var rect = void 0;
                    rect = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    };
                    var resolutionMultiplier = navigator.isCocoonJS ? this.resolution : 1 / this.resolution;
                    point.x = (x - rect.left) * (this.interactionDOMElement.width / rect.width) * resolutionMultiplier, 
                    point.y = (y - rect.top) * (this.interactionDOMElement.height / rect.height) * resolutionMultiplier;
                }, InteractionManager.prototype.processInteractive = function(interactionEvent, displayObject, func, hitTest, interactive) {
                    if (!displayObject || !displayObject.visible) return !1;
                    var point = interactionEvent.data.global, hit = !1, interactiveParent = interactive = displayObject.interactive || interactive;
                    if (displayObject.hitArea ? interactiveParent = !1 : hitTest && displayObject._mask && (displayObject._mask.containsPoint(point) || (hitTest = !1)), 
                    displayObject.interactiveChildren && displayObject.children) for (var children = displayObject.children, i = children.length - 1; i >= 0; i--) {
                        var child = children[i], childHit = this.processInteractive(interactionEvent, child, func, hitTest, interactiveParent);
                        if (childHit) {
                            if (!child.parent) continue;
                            interactiveParent = !1, childHit && (interactionEvent.target && (hitTest = !1), 
                            hit = !0);
                        }
                    }
                    return interactive && (hitTest && !interactionEvent.target && (displayObject.hitArea ? (displayObject.worldTransform.applyInverse(point, this._tempPoint), 
                    displayObject.hitArea.contains(this._tempPoint.x, this._tempPoint.y) && (hit = !0)) : displayObject.containsPoint && displayObject.containsPoint(point) && (hit = !0)), 
                    displayObject.interactive && (hit && !interactionEvent.target && (interactionEvent.target = displayObject), 
                    func && func(interactionEvent, displayObject, !!hit))), hit;
                }, InteractionManager.prototype.onPointerDown = function(originalEvent) {
                    if (!this.supportsTouchEvents || "touch" !== originalEvent.pointerType) {
                        var events = this.normalizeToPointerData(originalEvent);
                        this.autoPreventDefault && events[0].isNormalized && originalEvent.preventDefault();
                        for (var eventLen = events.length, i = 0; i < eventLen; i++) {
                            var event = events[i], interactionData = this.getInteractionDataForPointerId(event), interactionEvent = this.configureInteractionEventForDOMEvent(this.eventData, event, interactionData);
                            if (interactionEvent.data.originalEvent = originalEvent, this.processInteractive(interactionEvent, this.renderer._lastObjectRendered, this.processPointerDown, !0), 
                            this.emit("pointerdown", interactionEvent), "touch" === event.pointerType) this.emit("touchstart", interactionEvent); else if ("mouse" === event.pointerType || "pen" === event.pointerType) {
                                var isRightButton = 2 === event.button;
                                this.emit(isRightButton ? "rightdown" : "mousedown", this.eventData);
                            }
                        }
                    }
                }, InteractionManager.prototype.processPointerDown = function(interactionEvent, displayObject, hit) {
                    var data = interactionEvent.data, id = interactionEvent.data.identifier;
                    if (hit) if (displayObject.trackedPointers[id] || (displayObject.trackedPointers[id] = new _InteractionTrackingData2.default(id)), 
                    this.dispatchEvent(displayObject, "pointerdown", interactionEvent), "touch" === data.pointerType) this.dispatchEvent(displayObject, "touchstart", interactionEvent); else if ("mouse" === data.pointerType || "pen" === data.pointerType) {
                        var isRightButton = 2 === data.button;
                        isRightButton ? displayObject.trackedPointers[id].rightDown = !0 : displayObject.trackedPointers[id].leftDown = !0, 
                        this.dispatchEvent(displayObject, isRightButton ? "rightdown" : "mousedown", interactionEvent);
                    }
                }, InteractionManager.prototype.onPointerComplete = function(originalEvent, cancelled, func) {
                    for (var events = this.normalizeToPointerData(originalEvent), eventLen = events.length, eventAppend = originalEvent.target !== this.interactionDOMElement ? "outside" : "", i = 0; i < eventLen; i++) {
                        var event = events[i], interactionData = this.getInteractionDataForPointerId(event), interactionEvent = this.configureInteractionEventForDOMEvent(this.eventData, event, interactionData);
                        if (interactionEvent.data.originalEvent = originalEvent, this.processInteractive(interactionEvent, this.renderer._lastObjectRendered, func, cancelled || !eventAppend), 
                        this.emit(cancelled ? "pointercancel" : "pointerup" + eventAppend, interactionEvent), 
                        "mouse" === event.pointerType || "pen" === event.pointerType) {
                            var isRightButton = 2 === event.button;
                            this.emit(isRightButton ? "rightup" + eventAppend : "mouseup" + eventAppend, interactionEvent);
                        } else "touch" === event.pointerType && (this.emit(cancelled ? "touchcancel" : "touchend" + eventAppend, interactionEvent), 
                        this.releaseInteractionDataForPointerId(event.pointerId, interactionData));
                    }
                }, InteractionManager.prototype.onPointerCancel = function(event) {
                    this.supportsTouchEvents && "touch" === event.pointerType || this.onPointerComplete(event, !0, this.processPointerCancel);
                }, InteractionManager.prototype.processPointerCancel = function(interactionEvent, displayObject) {
                    var data = interactionEvent.data, id = interactionEvent.data.identifier;
                    void 0 !== displayObject.trackedPointers[id] && (delete displayObject.trackedPointers[id], 
                    this.dispatchEvent(displayObject, "pointercancel", interactionEvent), "touch" === data.pointerType && this.dispatchEvent(displayObject, "touchcancel", interactionEvent));
                }, InteractionManager.prototype.onPointerUp = function(event) {
                    this.supportsTouchEvents && "touch" === event.pointerType || this.onPointerComplete(event, !1, this.processPointerUp);
                }, InteractionManager.prototype.processPointerUp = function(interactionEvent, displayObject, hit) {
                    var data = interactionEvent.data, id = interactionEvent.data.identifier, trackingData = displayObject.trackedPointers[id], isTouch = "touch" === data.pointerType;
                    if ("mouse" === data.pointerType || "pen" === data.pointerType) {
                        var isRightButton = 2 === data.button, flags = _InteractionTrackingData2.default.FLAGS, test = isRightButton ? flags.RIGHT_DOWN : flags.LEFT_DOWN, isDown = void 0 !== trackingData && trackingData.flags & test;
                        hit ? (this.dispatchEvent(displayObject, isRightButton ? "rightup" : "mouseup", interactionEvent), 
                        isDown && this.dispatchEvent(displayObject, isRightButton ? "rightclick" : "click", interactionEvent)) : isDown && this.dispatchEvent(displayObject, isRightButton ? "rightupoutside" : "mouseupoutside", interactionEvent), 
                        trackingData && (isRightButton ? trackingData.rightDown = !1 : trackingData.leftDown = !1);
                    }
                    hit ? (this.dispatchEvent(displayObject, "pointerup", interactionEvent), isTouch && this.dispatchEvent(displayObject, "touchend", interactionEvent), 
                    trackingData && (this.dispatchEvent(displayObject, "pointertap", interactionEvent), 
                    isTouch && (this.dispatchEvent(displayObject, "tap", interactionEvent), trackingData.over = !1))) : trackingData && (this.dispatchEvent(displayObject, "pointerupoutside", interactionEvent), 
                    isTouch && this.dispatchEvent(displayObject, "touchendoutside", interactionEvent)), 
                    trackingData && trackingData.none && delete displayObject.trackedPointers[id];
                }, InteractionManager.prototype.onPointerMove = function(originalEvent) {
                    if (!this.supportsTouchEvents || "touch" !== originalEvent.pointerType) {
                        var events = this.normalizeToPointerData(originalEvent);
                        "mouse" === events[0].pointerType && (this.didMove = !0, this.cursor = null);
                        for (var eventLen = events.length, i = 0; i < eventLen; i++) {
                            var event = events[i], interactionData = this.getInteractionDataForPointerId(event), interactionEvent = this.configureInteractionEventForDOMEvent(this.eventData, event, interactionData);
                            interactionEvent.data.originalEvent = originalEvent;
                            var interactive = "touch" !== event.pointerType || this.moveWhenInside;
                            this.processInteractive(interactionEvent, this.renderer._lastObjectRendered, this.processPointerMove, interactive), 
                            this.emit("pointermove", interactionEvent), "touch" === event.pointerType && this.emit("touchmove", interactionEvent), 
                            "mouse" !== event.pointerType && "pen" !== event.pointerType || this.emit("mousemove", interactionEvent);
                        }
                        "mouse" === events[0].pointerType && this.setCursorMode(this.cursor);
                    }
                }, InteractionManager.prototype.processPointerMove = function(interactionEvent, displayObject, hit) {
                    var data = interactionEvent.data, isTouch = "touch" === data.pointerType, isMouse = "mouse" === data.pointerType || "pen" === data.pointerType;
                    isMouse && this.processPointerOverOut(interactionEvent, displayObject, hit), this.moveWhenInside && !hit || (this.dispatchEvent(displayObject, "pointermove", interactionEvent), 
                    isTouch && this.dispatchEvent(displayObject, "touchmove", interactionEvent), isMouse && this.dispatchEvent(displayObject, "mousemove", interactionEvent));
                }, InteractionManager.prototype.onPointerOut = function(originalEvent) {
                    if (!this.supportsTouchEvents || "touch" !== originalEvent.pointerType) {
                        var event = this.normalizeToPointerData(originalEvent)[0];
                        "mouse" === event.pointerType && (this.mouseOverRenderer = !1, this.setCursorMode(null));
                        var interactionData = this.getInteractionDataForPointerId(event), interactionEvent = this.configureInteractionEventForDOMEvent(this.eventData, event, interactionData);
                        interactionEvent.data.originalEvent = event, this.processInteractive(interactionEvent, this.renderer._lastObjectRendered, this.processPointerOverOut, !1), 
                        this.emit("pointerout", interactionEvent), "mouse" === event.pointerType || "pen" === event.pointerType ? this.emit("mouseout", interactionEvent) : this.releaseInteractionDataForPointerId(interactionData.identifier);
                    }
                }, InteractionManager.prototype.processPointerOverOut = function(interactionEvent, displayObject, hit) {
                    var data = interactionEvent.data, id = interactionEvent.data.identifier, isMouse = "mouse" === data.pointerType || "pen" === data.pointerType, trackingData = displayObject.trackedPointers[id];
                    hit && !trackingData && (trackingData = displayObject.trackedPointers[id] = new _InteractionTrackingData2.default(id)), 
                    void 0 !== trackingData && (hit && this.mouseOverRenderer ? (trackingData.over || (trackingData.over = !0, 
                    this.dispatchEvent(displayObject, "pointerover", interactionEvent), isMouse && this.dispatchEvent(displayObject, "mouseover", interactionEvent)), 
                    isMouse && null === this.cursor && (this.cursor = displayObject.cursor)) : trackingData.over && (trackingData.over = !1, 
                    this.dispatchEvent(displayObject, "pointerout", this.eventData), isMouse && this.dispatchEvent(displayObject, "mouseout", interactionEvent), 
                    trackingData.none && delete displayObject.trackedPointers[id]));
                }, InteractionManager.prototype.onPointerOver = function(originalEvent) {
                    var event = this.normalizeToPointerData(originalEvent)[0], interactionData = this.getInteractionDataForPointerId(event), interactionEvent = this.configureInteractionEventForDOMEvent(this.eventData, event, interactionData);
                    interactionEvent.data.originalEvent = event, "mouse" === event.pointerType && (this.mouseOverRenderer = !0), 
                    this.emit("pointerover", interactionEvent), "mouse" !== event.pointerType && "pen" !== event.pointerType || this.emit("mouseover", interactionEvent);
                }, InteractionManager.prototype.getInteractionDataForPointerId = function(event) {
                    var pointerId = event.pointerId, interactionData = void 0;
                    return pointerId === MOUSE_POINTER_ID || "mouse" === event.pointerType ? interactionData = this.mouse : this.activeInteractionData[pointerId] ? interactionData = this.activeInteractionData[pointerId] : ((interactionData = this.interactionDataPool.pop() || new _InteractionData2.default()).identifier = pointerId, 
                    this.activeInteractionData[pointerId] = interactionData), interactionData._copyEvent(event), 
                    interactionData;
                }, InteractionManager.prototype.releaseInteractionDataForPointerId = function(pointerId) {
                    var interactionData = this.activeInteractionData[pointerId];
                    interactionData && (delete this.activeInteractionData[pointerId], interactionData._reset(), 
                    this.interactionDataPool.push(interactionData));
                }, InteractionManager.prototype.configureInteractionEventForDOMEvent = function(interactionEvent, pointerEvent, interactionData) {
                    return interactionEvent.data = interactionData, this.mapPositionToPoint(interactionData.global, pointerEvent.clientX, pointerEvent.clientY), 
                    navigator.isCocoonJS && "touch" === pointerEvent.pointerType && (interactionData.global.x = interactionData.global.x / this.resolution, 
                    interactionData.global.y = interactionData.global.y / this.resolution), "touch" === pointerEvent.pointerType && (pointerEvent.globalX = interactionData.global.x, 
                    pointerEvent.globalY = interactionData.global.y), interactionData.originalEvent = pointerEvent, 
                    interactionEvent._reset(), interactionEvent;
                }, InteractionManager.prototype.normalizeToPointerData = function(event) {
                    var normalizedEvents = [];
                    if (this.supportsTouchEvents && event instanceof TouchEvent) for (var i = 0, li = event.changedTouches.length; i < li; i++) {
                        var touch = event.changedTouches[i];
                        void 0 === touch.button && (touch.button = event.touches.length ? 1 : 0), void 0 === touch.buttons && (touch.buttons = event.touches.length ? 1 : 0), 
                        void 0 === touch.isPrimary && (touch.isPrimary = 1 === event.touches.length && "touchstart" === event.type), 
                        void 0 === touch.width && (touch.width = touch.radiusX || 1), void 0 === touch.height && (touch.height = touch.radiusY || 1), 
                        void 0 === touch.tiltX && (touch.tiltX = 0), void 0 === touch.tiltY && (touch.tiltY = 0), 
                        void 0 === touch.pointerType && (touch.pointerType = "touch"), void 0 === touch.pointerId && (touch.pointerId = touch.identifier || 0), 
                        void 0 === touch.pressure && (touch.pressure = touch.force || .5), touch.twist = 0, 
                        touch.tangentialPressure = 0, void 0 === touch.layerX && (touch.layerX = touch.offsetX = touch.clientX), 
                        void 0 === touch.layerY && (touch.layerY = touch.offsetY = touch.clientY), touch.isNormalized = !0, 
                        normalizedEvents.push(touch);
                    } else !(event instanceof MouseEvent) || this.supportsPointerEvents && event instanceof window.PointerEvent ? normalizedEvents.push(event) : (void 0 === event.isPrimary && (event.isPrimary = !0), 
                    void 0 === event.width && (event.width = 1), void 0 === event.height && (event.height = 1), 
                    void 0 === event.tiltX && (event.tiltX = 0), void 0 === event.tiltY && (event.tiltY = 0), 
                    void 0 === event.pointerType && (event.pointerType = "mouse"), void 0 === event.pointerId && (event.pointerId = MOUSE_POINTER_ID), 
                    void 0 === event.pressure && (event.pressure = .5), event.twist = 0, event.tangentialPressure = 0, 
                    event.isNormalized = !0, normalizedEvents.push(event));
                    return normalizedEvents;
                }, InteractionManager.prototype.destroy = function() {
                    this.removeEvents(), this.removeAllListeners(), this.renderer = null, this.mouse = null, 
                    this.eventData = null, this.interactionDOMElement = null, this.onPointerDown = null, 
                    this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, 
                    this.onPointerCancel = null, this.processPointerCancel = null, this.onPointerMove = null, 
                    this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, 
                    this.onPointerOver = null, this._tempPoint = null;
                }, InteractionManager;
            }(_eventemitter2.default);
            exports.default = InteractionManager, core.WebGLRenderer.registerPlugin("interaction", InteractionManager), 
            core.CanvasRenderer.registerPlugin("interaction", InteractionManager);
        }, {
            "../core": 65,
            "./InteractionData": 155,
            "./InteractionEvent": 156,
            "./InteractionTrackingData": 158,
            "./interactiveTarget": 160,
            eventemitter3: 3
        } ],
        158: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), InteractionTrackingData = function() {
                function InteractionTrackingData(pointerId) {
                    _classCallCheck(this, InteractionTrackingData), this._pointerId = pointerId, this._flags = InteractionTrackingData.FLAGS.NONE;
                }
                return InteractionTrackingData.prototype._doSet = function(flag, yn) {
                    this._flags = yn ? this._flags | flag : this._flags & ~flag;
                }, _createClass(InteractionTrackingData, [ {
                    key: "pointerId",
                    get: function() {
                        return this._pointerId;
                    }
                }, {
                    key: "flags",
                    get: function() {
                        return this._flags;
                    },
                    set: function(flags) {
                        this._flags = flags;
                    }
                }, {
                    key: "none",
                    get: function() {
                        return this._flags === this.constructor.FLAGS.NONE;
                    }
                }, {
                    key: "over",
                    get: function() {
                        return 0 != (this._flags & this.constructor.FLAGS.OVER);
                    },
                    set: function(yn) {
                        this._doSet(this.constructor.FLAGS.OVER, yn);
                    }
                }, {
                    key: "rightDown",
                    get: function() {
                        return 0 != (this._flags & this.constructor.FLAGS.RIGHT_DOWN);
                    },
                    set: function(yn) {
                        this._doSet(this.constructor.FLAGS.RIGHT_DOWN, yn);
                    }
                }, {
                    key: "leftDown",
                    get: function() {
                        return 0 != (this._flags & this.constructor.FLAGS.LEFT_DOWN);
                    },
                    set: function(yn) {
                        this._doSet(this.constructor.FLAGS.LEFT_DOWN, yn);
                    }
                } ]), InteractionTrackingData;
            }();
            exports.default = InteractionTrackingData, InteractionTrackingData.FLAGS = Object.freeze({
                NONE: 0,
                OVER: 1,
                LEFT_DOWN: 2,
                RIGHT_DOWN: 4
            });
        }, {} ],
        159: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0;
            var _InteractionData = require("./InteractionData");
            Object.defineProperty(exports, "InteractionData", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_InteractionData).default;
                }
            });
            var _InteractionManager = require("./InteractionManager");
            Object.defineProperty(exports, "InteractionManager", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_InteractionManager).default;
                }
            });
            var _interactiveTarget = require("./interactiveTarget");
            Object.defineProperty(exports, "interactiveTarget", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_interactiveTarget).default;
                }
            });
            var _InteractionTrackingData = require("./InteractionTrackingData");
            Object.defineProperty(exports, "InteractionTrackingData", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_InteractionTrackingData).default;
                }
            });
            var _InteractionEvent = require("./InteractionEvent");
            Object.defineProperty(exports, "InteractionEvent", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_InteractionEvent).default;
                }
            });
        }, {
            "./InteractionData": 155,
            "./InteractionEvent": 156,
            "./InteractionManager": 157,
            "./InteractionTrackingData": 158,
            "./interactiveTarget": 160
        } ],
        160: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = {
                interactive: !1,
                interactiveChildren: !0,
                hitArea: null,
                get buttonMode() {
                    return "pointer" === this.cursor;
                },
                set buttonMode(value) {
                    value ? this.cursor = "pointer" : "pointer" === this.cursor && (this.cursor = null);
                },
                cursor: null,
                get trackedPointers() {
                    return void 0 === this._trackedPointers && (this._trackedPointers = {}), this._trackedPointers;
                },
                _trackedPointers: void 0
            };
        }, {} ],
        161: [ function(require, module, exports) {
            "use strict";
            function parse(resource, texture) {
                resource.bitmapFont = _extras.BitmapText.registerFont(resource.data, texture);
            }
            exports.__esModule = !0, exports.parse = parse, exports.default = function() {
                return function(resource, next) {
                    if (resource.data && resource.type === _resourceLoader.Resource.TYPE.XML) if (0 !== resource.data.getElementsByTagName("page").length && 0 !== resource.data.getElementsByTagName("info").length && null !== resource.data.getElementsByTagName("info")[0].getAttribute("face")) {
                        var xmlUrl = resource.isDataUrl ? "" : path.dirname(resource.url);
                        resource.isDataUrl && ("." === xmlUrl && (xmlUrl = ""), this.baseUrl && xmlUrl && "/" === this.baseUrl.charAt(this.baseUrl.length - 1) && (xmlUrl += "/")), 
                        (xmlUrl = xmlUrl.replace(this.baseUrl, "")) && "/" !== xmlUrl.charAt(xmlUrl.length - 1) && (xmlUrl += "/");
                        var textureUrl = xmlUrl + resource.data.getElementsByTagName("page")[0].getAttribute("file");
                        if (_core.utils.TextureCache[textureUrl]) parse(resource, _core.utils.TextureCache[textureUrl]), 
                        next(); else {
                            var loadOptions = {
                                crossOrigin: resource.crossOrigin,
                                loadType: _resourceLoader.Resource.LOAD_TYPE.IMAGE,
                                metadata: resource.metadata.imageMetadata,
                                parentResource: resource
                            };
                            this.add(resource.name + "_image", textureUrl, loadOptions, function(res) {
                                parse(resource, res.texture), next();
                            });
                        }
                    } else next(); else next();
                };
            };
            var path = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("path")), _core = require("../core"), _resourceLoader = require("resource-loader"), _extras = require("../extras");
        }, {
            "../core": 65,
            "../extras": 141,
            path: 8,
            "resource-loader": 36
        } ],
        162: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0, exports.shared = exports.Resource = exports.textureParser = exports.getResourcePath = exports.spritesheetParser = exports.parseBitmapFontData = exports.bitmapFontParser = exports.Loader = void 0;
            var _bitmapFontParser = require("./bitmapFontParser");
            Object.defineProperty(exports, "bitmapFontParser", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_bitmapFontParser).default;
                }
            }), Object.defineProperty(exports, "parseBitmapFontData", {
                enumerable: !0,
                get: function() {
                    return _bitmapFontParser.parse;
                }
            });
            var _spritesheetParser = require("./spritesheetParser");
            Object.defineProperty(exports, "spritesheetParser", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_spritesheetParser).default;
                }
            }), Object.defineProperty(exports, "getResourcePath", {
                enumerable: !0,
                get: function() {
                    return _spritesheetParser.getResourcePath;
                }
            });
            var _textureParser = require("./textureParser");
            Object.defineProperty(exports, "textureParser", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_textureParser).default;
                }
            });
            var _resourceLoader = require("resource-loader");
            Object.defineProperty(exports, "Resource", {
                enumerable: !0,
                get: function() {
                    return _resourceLoader.Resource;
                }
            });
            var _Application2 = _interopRequireDefault(require("../core/Application")), _loader2 = _interopRequireDefault(require("./loader"));
            exports.Loader = _loader2.default;
            var shared = new _loader2.default();
            shared.destroy = function() {}, exports.shared = shared;
            var AppPrototype = _Application2.default.prototype;
            AppPrototype._loader = null, Object.defineProperty(AppPrototype, "loader", {
                get: function() {
                    if (!this._loader) {
                        var sharedLoader = this._options.sharedLoader;
                        this._loader = sharedLoader ? shared : new _loader2.default();
                    }
                    return this._loader;
                }
            }), AppPrototype._parentDestroy = AppPrototype.destroy, AppPrototype.destroy = function(removeView) {
                this._loader && (this._loader.destroy(), this._loader = null), this._parentDestroy(removeView);
            };
        }, {
            "../core/Application": 43,
            "./bitmapFontParser": 161,
            "./loader": 163,
            "./spritesheetParser": 164,
            "./textureParser": 165,
            "resource-loader": 36
        } ],
        163: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _resourceLoader2 = _interopRequireDefault(require("resource-loader")), _blob = require("resource-loader/lib/middlewares/parsing/blob"), _eventemitter2 = _interopRequireDefault(require("eventemitter3")), _textureParser2 = _interopRequireDefault(require("./textureParser")), _spritesheetParser2 = _interopRequireDefault(require("./spritesheetParser")), _bitmapFontParser2 = _interopRequireDefault(require("./bitmapFontParser")), Loader = function(_ResourceLoader) {
                function Loader(baseUrl, concurrency) {
                    _classCallCheck(this, Loader);
                    var _this = _possibleConstructorReturn(this, _ResourceLoader.call(this, baseUrl, concurrency));
                    _eventemitter2.default.call(_this);
                    for (var i = 0; i < Loader._pixiMiddleware.length; ++i) _this.use(Loader._pixiMiddleware[i]());
                    return _this.onStart.add(function(l) {
                        return _this.emit("start", l);
                    }), _this.onProgress.add(function(l, r) {
                        return _this.emit("progress", l, r);
                    }), _this.onError.add(function(e, l, r) {
                        return _this.emit("error", e, l, r);
                    }), _this.onLoad.add(function(l, r) {
                        return _this.emit("load", l, r);
                    }), _this.onComplete.add(function(l, r) {
                        return _this.emit("complete", l, r);
                    }), _this;
                }
                return _inherits(Loader, _ResourceLoader), Loader.addPixiMiddleware = function(fn) {
                    Loader._pixiMiddleware.push(fn);
                }, Loader.prototype.destroy = function() {
                    this.removeAllListeners(), this.reset();
                }, Loader;
            }(_resourceLoader2.default);
            exports.default = Loader;
            for (var k in _eventemitter2.default.prototype) Loader.prototype[k] = _eventemitter2.default.prototype[k];
            Loader._pixiMiddleware = [ _blob.blobMiddlewareFactory, _textureParser2.default, _spritesheetParser2.default, _bitmapFontParser2.default ];
            var Resource = _resourceLoader2.default.Resource;
            Resource.setExtensionXhrType("fnt", Resource.XHR_RESPONSE_TYPE.DOCUMENT);
        }, {
            "./bitmapFontParser": 161,
            "./spritesheetParser": 164,
            "./textureParser": 165,
            eventemitter3: 3,
            "resource-loader": 36,
            "resource-loader/lib/middlewares/parsing/blob": 37
        } ],
        164: [ function(require, module, exports) {
            "use strict";
            function getResourcePath(resource, baseUrl) {
                return resource.isDataUrl ? resource.data.meta.image : _url2.default.resolve(resource.url.replace(baseUrl, ""), resource.data.meta.image);
            }
            exports.__esModule = !0, exports.default = function() {
                return function(resource, next) {
                    var imageResourceName = resource.name + "_image";
                    if (resource.data && resource.type === _resourceLoader.Resource.TYPE.JSON && resource.data.frames && !this.resources[imageResourceName]) {
                        var loadOptions = {
                            crossOrigin: resource.crossOrigin,
                            loadType: _resourceLoader.Resource.LOAD_TYPE.IMAGE,
                            metadata: resource.metadata.imageMetadata,
                            parentResource: resource
                        }, resourcePath = getResourcePath(resource, this.baseUrl);
                        this.add(imageResourceName, resourcePath, loadOptions, function(res) {
                            var spritesheet = new _core.Spritesheet(res.texture.baseTexture, resource.data, resource.url);
                            spritesheet.parse(function() {
                                resource.spritesheet = spritesheet, resource.textures = spritesheet.textures, next();
                            });
                        });
                    } else next();
                };
            }, exports.getResourcePath = getResourcePath;
            var _resourceLoader = require("resource-loader"), _url2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("url")), _core = require("../core");
        }, {
            "../core": 65,
            "resource-loader": 36,
            url: 38
        } ],
        165: [ function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function() {
                return function(resource, next) {
                    resource.data && resource.type === _resourceLoader.Resource.TYPE.IMAGE && (resource.texture = _Texture2.default.fromLoader(resource.data, resource.url, resource.name)), 
                    next();
                };
            };
            var _resourceLoader = require("resource-loader"), _Texture2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../core/textures/Texture"));
        }, {
            "../core/textures/Texture": 115,
            "resource-loader": 36
        } ],
        166: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../core")), _TextureTransform2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../extras/TextureTransform")), tempPoint = new core.Point(), tempPolygon = new core.Polygon(), Mesh = function(_core$Container) {
                function Mesh(texture, vertices, uvs, indices, drawMode) {
                    _classCallCheck(this, Mesh);
                    var _this = _possibleConstructorReturn(this, _core$Container.call(this));
                    return _this._texture = texture, _this.uvs = uvs || new Float32Array([ 0, 0, 1, 0, 1, 1, 0, 1 ]), 
                    _this.vertices = vertices || new Float32Array([ 0, 0, 100, 0, 100, 100, 0, 100 ]), 
                    _this.indices = indices || new Uint16Array([ 0, 1, 3, 2 ]), _this.dirty = 0, _this.indexDirty = 0, 
                    _this.blendMode = core.BLEND_MODES.NORMAL, _this.canvasPadding = 0, _this.drawMode = drawMode || Mesh.DRAW_MODES.TRIANGLE_MESH, 
                    _this.shader = null, _this.tintRgb = new Float32Array([ 1, 1, 1 ]), _this._glDatas = {}, 
                    _this._uvTransform = new _TextureTransform2.default(texture), _this.uploadUvTransform = !1, 
                    _this.pluginName = "mesh", _this;
                }
                return _inherits(Mesh, _core$Container), Mesh.prototype._renderWebGL = function(renderer) {
                    this.refresh(), renderer.setObjectRenderer(renderer.plugins[this.pluginName]), renderer.plugins[this.pluginName].render(this);
                }, Mesh.prototype._renderCanvas = function(renderer) {
                    this.refresh(), renderer.plugins[this.pluginName].render(this);
                }, Mesh.prototype._onTextureUpdate = function() {
                    this._uvTransform.texture = this._texture, this.refresh();
                }, Mesh.prototype.multiplyUvs = function() {
                    this.uploadUvTransform || this._uvTransform.multiplyUvs(this.uvs);
                }, Mesh.prototype.refresh = function(forceUpdate) {
                    this._uvTransform.update(forceUpdate) && this._refresh();
                }, Mesh.prototype._refresh = function() {}, Mesh.prototype._calculateBounds = function() {
                    this._bounds.addVertices(this.transform, this.vertices, 0, this.vertices.length);
                }, Mesh.prototype.containsPoint = function(point) {
                    if (!this.getBounds().contains(point.x, point.y)) return !1;
                    this.worldTransform.applyInverse(point, tempPoint);
                    for (var vertices = this.vertices, points = tempPolygon.points, indices = this.indices, len = this.indices.length, step = this.drawMode === Mesh.DRAW_MODES.TRIANGLES ? 3 : 1, i = 0; i + 2 < len; i += step) {
                        var ind0 = 2 * indices[i], ind1 = 2 * indices[i + 1], ind2 = 2 * indices[i + 2];
                        if (points[0] = vertices[ind0], points[1] = vertices[ind0 + 1], points[2] = vertices[ind1], 
                        points[3] = vertices[ind1 + 1], points[4] = vertices[ind2], points[5] = vertices[ind2 + 1], 
                        tempPolygon.contains(tempPoint.x, tempPoint.y)) return !0;
                    }
                    return !1;
                }, _createClass(Mesh, [ {
                    key: "texture",
                    get: function() {
                        return this._texture;
                    },
                    set: function(value) {
                        this._texture !== value && (this._texture = value, value && (value.baseTexture.hasLoaded ? this._onTextureUpdate() : value.once("update", this._onTextureUpdate, this)));
                    }
                }, {
                    key: "tint",
                    get: function() {
                        return core.utils.rgb2hex(this.tintRgb);
                    },
                    set: function(value) {
                        this.tintRgb = core.utils.hex2rgb(value, this.tintRgb);
                    }
                } ]), Mesh;
            }(core.Container);
            exports.default = Mesh, Mesh.DRAW_MODES = {
                TRIANGLE_MESH: 0,
                TRIANGLES: 1
            };
        }, {
            "../core": 65,
            "../extras/TextureTransform": 136
        } ],
        167: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), DEFAULT_BORDER_SIZE = 10, NineSlicePlane = function(_Plane) {
                function NineSlicePlane(texture, leftWidth, topHeight, rightWidth, bottomHeight) {
                    _classCallCheck(this, NineSlicePlane);
                    var _this = _possibleConstructorReturn(this, _Plane.call(this, texture, 4, 4));
                    return _this._origWidth = texture.orig.width, _this._origHeight = texture.orig.height, 
                    _this._width = _this._origWidth, _this._height = _this._origHeight, _this.leftWidth = void 0 !== leftWidth ? leftWidth : DEFAULT_BORDER_SIZE, 
                    _this.rightWidth = void 0 !== rightWidth ? rightWidth : DEFAULT_BORDER_SIZE, _this.topHeight = void 0 !== topHeight ? topHeight : DEFAULT_BORDER_SIZE, 
                    _this.bottomHeight = void 0 !== bottomHeight ? bottomHeight : DEFAULT_BORDER_SIZE, 
                    _this.refresh(!0), _this;
                }
                return _inherits(NineSlicePlane, _Plane), NineSlicePlane.prototype.updateHorizontalVertices = function() {
                    var vertices = this.vertices;
                    vertices[9] = vertices[11] = vertices[13] = vertices[15] = this._topHeight, vertices[17] = vertices[19] = vertices[21] = vertices[23] = this._height - this._bottomHeight, 
                    vertices[25] = vertices[27] = vertices[29] = vertices[31] = this._height;
                }, NineSlicePlane.prototype.updateVerticalVertices = function() {
                    var vertices = this.vertices;
                    vertices[2] = vertices[10] = vertices[18] = vertices[26] = this._leftWidth, vertices[4] = vertices[12] = vertices[20] = vertices[28] = this._width - this._rightWidth, 
                    vertices[6] = vertices[14] = vertices[22] = vertices[30] = this._width;
                }, NineSlicePlane.prototype._renderCanvas = function(renderer) {
                    var context = renderer.context;
                    context.globalAlpha = this.worldAlpha;
                    var transform = this.worldTransform, res = renderer.resolution;
                    renderer.roundPixels ? context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res | 0, transform.ty * res | 0) : context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res, transform.ty * res);
                    var base = this._texture.baseTexture, textureSource = base.source, w = base.width, h = base.height;
                    this.drawSegment(context, textureSource, w, h, 0, 1, 10, 11), this.drawSegment(context, textureSource, w, h, 2, 3, 12, 13), 
                    this.drawSegment(context, textureSource, w, h, 4, 5, 14, 15), this.drawSegment(context, textureSource, w, h, 8, 9, 18, 19), 
                    this.drawSegment(context, textureSource, w, h, 10, 11, 20, 21), this.drawSegment(context, textureSource, w, h, 12, 13, 22, 23), 
                    this.drawSegment(context, textureSource, w, h, 16, 17, 26, 27), this.drawSegment(context, textureSource, w, h, 18, 19, 28, 29), 
                    this.drawSegment(context, textureSource, w, h, 20, 21, 30, 31);
                }, NineSlicePlane.prototype.drawSegment = function(context, textureSource, w, h, x1, y1, x2, y2) {
                    var uvs = this.uvs, vertices = this.vertices, sw = (uvs[x2] - uvs[x1]) * w, sh = (uvs[y2] - uvs[y1]) * h, dw = vertices[x2] - vertices[x1], dh = vertices[y2] - vertices[y1];
                    sw < 1 && (sw = 1), sh < 1 && (sh = 1), dw < 1 && (dw = 1), dh < 1 && (dh = 1), 
                    context.drawImage(textureSource, uvs[x1] * w, uvs[y1] * h, sw, sh, vertices[x1], vertices[y1], dw, dh);
                }, NineSlicePlane.prototype._refresh = function() {
                    _Plane.prototype._refresh.call(this);
                    var uvs = this.uvs, texture = this._texture;
                    this._origWidth = texture.orig.width, this._origHeight = texture.orig.height;
                    var _uvw = 1 / this._origWidth, _uvh = 1 / this._origHeight;
                    uvs[0] = uvs[8] = uvs[16] = uvs[24] = 0, uvs[1] = uvs[3] = uvs[5] = uvs[7] = 0, 
                    uvs[6] = uvs[14] = uvs[22] = uvs[30] = 1, uvs[25] = uvs[27] = uvs[29] = uvs[31] = 1, 
                    uvs[2] = uvs[10] = uvs[18] = uvs[26] = _uvw * this._leftWidth, uvs[4] = uvs[12] = uvs[20] = uvs[28] = 1 - _uvw * this._rightWidth, 
                    uvs[9] = uvs[11] = uvs[13] = uvs[15] = _uvh * this._topHeight, uvs[17] = uvs[19] = uvs[21] = uvs[23] = 1 - _uvh * this._bottomHeight, 
                    this.updateHorizontalVertices(), this.updateVerticalVertices(), this.dirty = !0, 
                    this.multiplyUvs();
                }, _createClass(NineSlicePlane, [ {
                    key: "width",
                    get: function() {
                        return this._width;
                    },
                    set: function(value) {
                        this._width = value, this._refresh();
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this._height;
                    },
                    set: function(value) {
                        this._height = value, this._refresh();
                    }
                }, {
                    key: "leftWidth",
                    get: function() {
                        return this._leftWidth;
                    },
                    set: function(value) {
                        this._leftWidth = value, this._refresh();
                    }
                }, {
                    key: "rightWidth",
                    get: function() {
                        return this._rightWidth;
                    },
                    set: function(value) {
                        this._rightWidth = value, this._refresh();
                    }
                }, {
                    key: "topHeight",
                    get: function() {
                        return this._topHeight;
                    },
                    set: function(value) {
                        this._topHeight = value, this._refresh();
                    }
                }, {
                    key: "bottomHeight",
                    get: function() {
                        return this._bottomHeight;
                    },
                    set: function(value) {
                        this._bottomHeight = value, this._refresh();
                    }
                } ]), NineSlicePlane;
            }(function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./Plane")).default);
            exports.default = NineSlicePlane;
        }, {
            "./Plane": 168
        } ],
        168: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _Mesh3 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./Mesh")), Plane = function(_Mesh) {
                function Plane(texture, verticesX, verticesY) {
                    _classCallCheck(this, Plane);
                    var _this = _possibleConstructorReturn(this, _Mesh.call(this, texture));
                    return _this._ready = !0, _this.verticesX = verticesX || 10, _this.verticesY = verticesY || 10, 
                    _this.drawMode = _Mesh3.default.DRAW_MODES.TRIANGLES, _this.refresh(), _this;
                }
                return _inherits(Plane, _Mesh), Plane.prototype._refresh = function() {
                    for (var texture = this._texture, total = this.verticesX * this.verticesY, verts = [], colors = [], uvs = [], indices = [], segmentsX = this.verticesX - 1, segmentsY = this.verticesY - 1, sizeX = texture.width / segmentsX, sizeY = texture.height / segmentsY, i = 0; i < total; i++) {
                        var x = i % this.verticesX, y = i / this.verticesX | 0;
                        verts.push(x * sizeX, y * sizeY), uvs.push(x / segmentsX, y / segmentsY);
                    }
                    for (var totalSub = segmentsX * segmentsY, _i = 0; _i < totalSub; _i++) {
                        var xpos = _i % segmentsX, ypos = _i / segmentsX | 0, value = ypos * this.verticesX + xpos, value2 = ypos * this.verticesX + xpos + 1, value3 = (ypos + 1) * this.verticesX + xpos, value4 = (ypos + 1) * this.verticesX + xpos + 1;
                        indices.push(value, value2, value3), indices.push(value2, value4, value3);
                    }
                    this.vertices = new Float32Array(verts), this.uvs = new Float32Array(uvs), this.colors = new Float32Array(colors), 
                    this.indices = new Uint16Array(indices), this.indexDirty = !0, this.multiplyUvs();
                }, Plane.prototype._onTextureUpdate = function() {
                    _Mesh3.default.prototype._onTextureUpdate.call(this), this._ready && this.refresh();
                }, Plane;
            }(_Mesh3.default);
            exports.default = Plane;
        }, {
            "./Mesh": 166
        } ],
        169: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var Rope = function(_Mesh) {
                function Rope(texture, points) {
                    _classCallCheck(this, Rope);
                    var _this = _possibleConstructorReturn(this, _Mesh.call(this, texture));
                    return _this.points = points, _this.vertices = new Float32Array(4 * points.length), 
                    _this.uvs = new Float32Array(4 * points.length), _this.colors = new Float32Array(2 * points.length), 
                    _this.indices = new Uint16Array(2 * points.length), _this.autoUpdate = !0, _this.refresh(), 
                    _this;
                }
                return _inherits(Rope, _Mesh), Rope.prototype._refresh = function() {
                    var points = this.points;
                    if (!(points.length < 1) && this._texture._uvs) {
                        this.vertices.length / 4 !== points.length && (this.vertices = new Float32Array(4 * points.length), 
                        this.uvs = new Float32Array(4 * points.length), this.colors = new Float32Array(2 * points.length), 
                        this.indices = new Uint16Array(2 * points.length));
                        var uvs = this.uvs, indices = this.indices, colors = this.colors;
                        uvs[0] = 0, uvs[1] = 0, uvs[2] = 0, uvs[3] = 1, colors[0] = 1, colors[1] = 1, indices[0] = 0, 
                        indices[1] = 1;
                        for (var total = points.length, i = 1; i < total; i++) {
                            var index = 4 * i, amount = i / (total - 1);
                            uvs[index] = amount, uvs[index + 1] = 0, uvs[index + 2] = amount, uvs[index + 3] = 1, 
                            colors[index = 2 * i] = 1, colors[index + 1] = 1, indices[index = 2 * i] = index, 
                            indices[index + 1] = index + 1;
                        }
                        this.dirty++, this.indexDirty++, this.multiplyUvs(), this.refreshVertices();
                    }
                }, Rope.prototype.refreshVertices = function() {
                    var points = this.points;
                    if (!(points.length < 1)) for (var lastPoint = points[0], nextPoint = void 0, perpX = 0, perpY = 0, vertices = this.vertices, total = points.length, i = 0; i < total; i++) {
                        var point = points[i], index = 4 * i;
                        perpY = -((nextPoint = i < points.length - 1 ? points[i + 1] : point).x - lastPoint.x), 
                        perpX = nextPoint.y - lastPoint.y;
                        var ratio = 10 * (1 - i / (total - 1));
                        ratio > 1 && (ratio = 1);
                        var perpLength = Math.sqrt(perpX * perpX + perpY * perpY), num = this._texture.height / 2;
                        perpX /= perpLength, perpY /= perpLength, perpX *= num, perpY *= num, vertices[index] = point.x + perpX, 
                        vertices[index + 1] = point.y + perpY, vertices[index + 2] = point.x - perpX, vertices[index + 3] = point.y - perpY, 
                        lastPoint = point;
                    }
                }, Rope.prototype.updateTransform = function() {
                    this.autoUpdate && this.refreshVertices(), this.containerUpdateTransform();
                }, Rope;
            }(function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./Mesh")).default);
            exports.default = Rope;
        }, {
            "./Mesh": 166
        } ],
        170: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), _Mesh2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../Mesh")), MeshSpriteRenderer = function() {
                function MeshSpriteRenderer(renderer) {
                    _classCallCheck(this, MeshSpriteRenderer), this.renderer = renderer;
                }
                return MeshSpriteRenderer.prototype.render = function(mesh) {
                    var renderer = this.renderer, context = renderer.context, transform = mesh.worldTransform, res = renderer.resolution;
                    renderer.roundPixels ? context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res | 0, transform.ty * res | 0) : context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res, transform.ty * res), 
                    renderer.setBlendMode(mesh.blendMode), mesh.drawMode === _Mesh2.default.DRAW_MODES.TRIANGLE_MESH ? this._renderTriangleMesh(mesh) : this._renderTriangles(mesh);
                }, MeshSpriteRenderer.prototype._renderTriangleMesh = function(mesh) {
                    for (var length = mesh.vertices.length / 2, i = 0; i < length - 2; i++) {
                        var index = 2 * i;
                        this._renderDrawTriangle(mesh, index, index + 2, index + 4);
                    }
                }, MeshSpriteRenderer.prototype._renderTriangles = function(mesh) {
                    for (var indices = mesh.indices, length = indices.length, i = 0; i < length; i += 3) {
                        var index0 = 2 * indices[i], index1 = 2 * indices[i + 1], index2 = 2 * indices[i + 2];
                        this._renderDrawTriangle(mesh, index0, index1, index2);
                    }
                }, MeshSpriteRenderer.prototype._renderDrawTriangle = function(mesh, index0, index1, index2) {
                    var context = this.renderer.context, uvs = mesh.uvs, vertices = mesh.vertices, texture = mesh._texture;
                    if (texture.valid) {
                        var base = texture.baseTexture, textureSource = base.source, textureWidth = base.width, textureHeight = base.height, u0 = void 0, u1 = void 0, u2 = void 0, v0 = void 0, v1 = void 0, v2 = void 0;
                        if (mesh.uploadUvTransform) {
                            var ut = mesh._uvTransform.mapCoord;
                            u0 = (uvs[index0] * ut.a + uvs[index0 + 1] * ut.c + ut.tx) * base.width, u1 = (uvs[index1] * ut.a + uvs[index1 + 1] * ut.c + ut.tx) * base.width, 
                            u2 = (uvs[index2] * ut.a + uvs[index2 + 1] * ut.c + ut.tx) * base.width, v0 = (uvs[index0] * ut.b + uvs[index0 + 1] * ut.d + ut.ty) * base.height, 
                            v1 = (uvs[index1] * ut.b + uvs[index1 + 1] * ut.d + ut.ty) * base.height, v2 = (uvs[index2] * ut.b + uvs[index2 + 1] * ut.d + ut.ty) * base.height;
                        } else u0 = uvs[index0] * base.width, u1 = uvs[index1] * base.width, u2 = uvs[index2] * base.width, 
                        v0 = uvs[index0 + 1] * base.height, v1 = uvs[index1 + 1] * base.height, v2 = uvs[index2 + 1] * base.height;
                        var x0 = vertices[index0], x1 = vertices[index1], x2 = vertices[index2], y0 = vertices[index0 + 1], y1 = vertices[index1 + 1], y2 = vertices[index2 + 1];
                        if (mesh.canvasPadding > 0) {
                            var paddingX = mesh.canvasPadding / mesh.worldTransform.a, paddingY = mesh.canvasPadding / mesh.worldTransform.d, centerX = (x0 + x1 + x2) / 3, centerY = (y0 + y1 + y2) / 3, normX = x0 - centerX, normY = y0 - centerY, dist = Math.sqrt(normX * normX + normY * normY);
                            x0 = centerX + normX / dist * (dist + paddingX), y0 = centerY + normY / dist * (dist + paddingY), 
                            normY = y1 - centerY, x1 = centerX + (normX = x1 - centerX) / (dist = Math.sqrt(normX * normX + normY * normY)) * (dist + paddingX), 
                            y1 = centerY + normY / dist * (dist + paddingY), normY = y2 - centerY, x2 = centerX + (normX = x2 - centerX) / (dist = Math.sqrt(normX * normX + normY * normY)) * (dist + paddingX), 
                            y2 = centerY + normY / dist * (dist + paddingY);
                        }
                        context.save(), context.beginPath(), context.moveTo(x0, y0), context.lineTo(x1, y1), 
                        context.lineTo(x2, y2), context.closePath(), context.clip();
                        var delta = u0 * v1 + v0 * u2 + u1 * v2 - v1 * u2 - v0 * u1 - u0 * v2, deltaA = x0 * v1 + v0 * x2 + x1 * v2 - v1 * x2 - v0 * x1 - x0 * v2, deltaB = u0 * x1 + x0 * u2 + u1 * x2 - x1 * u2 - x0 * u1 - u0 * x2, deltaC = u0 * v1 * x2 + v0 * x1 * u2 + x0 * u1 * v2 - x0 * v1 * u2 - v0 * u1 * x2 - u0 * x1 * v2, deltaD = y0 * v1 + v0 * y2 + y1 * v2 - v1 * y2 - v0 * y1 - y0 * v2, deltaE = u0 * y1 + y0 * u2 + u1 * y2 - y1 * u2 - y0 * u1 - u0 * y2, deltaF = u0 * v1 * y2 + v0 * y1 * u2 + y0 * u1 * v2 - y0 * v1 * u2 - v0 * u1 * y2 - u0 * y1 * v2;
                        context.transform(deltaA / delta, deltaD / delta, deltaB / delta, deltaE / delta, deltaC / delta, deltaF / delta), 
                        context.drawImage(textureSource, 0, 0, textureWidth * base.resolution, textureHeight * base.resolution, 0, 0, textureWidth, textureHeight), 
                        context.restore();
                    }
                }, MeshSpriteRenderer.prototype.renderMeshFlat = function(mesh) {
                    var context = this.renderer.context, vertices = mesh.vertices, length = vertices.length / 2;
                    context.beginPath();
                    for (var i = 1; i < length - 2; ++i) {
                        var index = 2 * i, x0 = vertices[index], y0 = vertices[index + 1], x1 = vertices[index + 2], y1 = vertices[index + 3], x2 = vertices[index + 4], y2 = vertices[index + 5];
                        context.moveTo(x0, y0), context.lineTo(x1, y1), context.lineTo(x2, y2);
                    }
                    context.fillStyle = "#FF0000", context.fill(), context.closePath();
                }, MeshSpriteRenderer.prototype.destroy = function() {
                    this.renderer = null;
                }, MeshSpriteRenderer;
            }();
            exports.default = MeshSpriteRenderer, core.CanvasRenderer.registerPlugin("mesh", MeshSpriteRenderer);
        }, {
            "../../core": 65,
            "../Mesh": 166
        } ],
        171: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0;
            var _Mesh = require("./Mesh");
            Object.defineProperty(exports, "Mesh", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Mesh).default;
                }
            });
            var _MeshRenderer = require("./webgl/MeshRenderer");
            Object.defineProperty(exports, "MeshRenderer", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_MeshRenderer).default;
                }
            });
            var _CanvasMeshRenderer = require("./canvas/CanvasMeshRenderer");
            Object.defineProperty(exports, "CanvasMeshRenderer", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_CanvasMeshRenderer).default;
                }
            });
            var _Plane = require("./Plane");
            Object.defineProperty(exports, "Plane", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Plane).default;
                }
            });
            var _NineSlicePlane = require("./NineSlicePlane");
            Object.defineProperty(exports, "NineSlicePlane", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_NineSlicePlane).default;
                }
            });
            var _Rope = require("./Rope");
            Object.defineProperty(exports, "Rope", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_Rope).default;
                }
            });
        }, {
            "./Mesh": 166,
            "./NineSlicePlane": 167,
            "./Plane": 168,
            "./Rope": 169,
            "./canvas/CanvasMeshRenderer": 170,
            "./webgl/MeshRenderer": 172
        } ],
        172: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), _pixiGlCore2 = _interopRequireDefault(require("pixi-gl-core")), _Mesh2 = _interopRequireDefault(require("../Mesh")), matrixIdentity = (require("path"), 
            core.Matrix.IDENTITY), MeshRenderer = function(_core$ObjectRenderer) {
                function MeshRenderer(renderer) {
                    _classCallCheck(this, MeshRenderer);
                    var _this = _possibleConstructorReturn(this, _core$ObjectRenderer.call(this, renderer));
                    return _this.shader = null, _this;
                }
                return _inherits(MeshRenderer, _core$ObjectRenderer), MeshRenderer.prototype.onContextChange = function() {
                    var gl = this.renderer.gl;
                    this.shader = new core.Shader(gl, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", "varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n");
                }, MeshRenderer.prototype.render = function(mesh) {
                    var renderer = this.renderer, gl = renderer.gl, texture = mesh._texture;
                    if (texture.valid) {
                        var glData = mesh._glDatas[renderer.CONTEXT_UID];
                        glData || (renderer.bindVao(null), (glData = {
                            shader: this.shader,
                            vertexBuffer: _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl, mesh.vertices, gl.STREAM_DRAW),
                            uvBuffer: _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl, mesh.uvs, gl.STREAM_DRAW),
                            indexBuffer: _pixiGlCore2.default.GLBuffer.createIndexBuffer(gl, mesh.indices, gl.STATIC_DRAW),
                            vao: null,
                            dirty: mesh.dirty,
                            indexDirty: mesh.indexDirty
                        }).vao = new _pixiGlCore2.default.VertexArrayObject(gl).addIndex(glData.indexBuffer).addAttribute(glData.vertexBuffer, glData.shader.attributes.aVertexPosition, gl.FLOAT, !1, 8, 0).addAttribute(glData.uvBuffer, glData.shader.attributes.aTextureCoord, gl.FLOAT, !1, 8, 0), 
                        mesh._glDatas[renderer.CONTEXT_UID] = glData), renderer.bindVao(glData.vao), mesh.dirty !== glData.dirty && (glData.dirty = mesh.dirty, 
                        glData.uvBuffer.upload(mesh.uvs)), mesh.indexDirty !== glData.indexDirty && (glData.indexDirty = mesh.indexDirty, 
                        glData.indexBuffer.upload(mesh.indices)), glData.vertexBuffer.upload(mesh.vertices), 
                        renderer.bindShader(glData.shader), glData.shader.uniforms.uSampler = renderer.bindTexture(texture), 
                        renderer.state.setBlendMode(core.utils.correctBlendMode(mesh.blendMode, texture.baseTexture.premultipliedAlpha)), 
                        glData.shader.uniforms.uTransform && (mesh.uploadUvTransform ? glData.shader.uniforms.uTransform = mesh._uvTransform.mapCoord.toArray(!0) : glData.shader.uniforms.uTransform = matrixIdentity.toArray(!0)), 
                        glData.shader.uniforms.translationMatrix = mesh.worldTransform.toArray(!0), glData.shader.uniforms.uColor = core.utils.premultiplyRgba(mesh.tintRgb, mesh.worldAlpha, glData.shader.uniforms.uColor, texture.baseTexture.premultipliedAlpha);
                        var drawMode = mesh.drawMode === _Mesh2.default.DRAW_MODES.TRIANGLE_MESH ? gl.TRIANGLE_STRIP : gl.TRIANGLES;
                        glData.vao.draw(drawMode, mesh.indices.length, 0);
                    }
                }, MeshRenderer;
            }(core.ObjectRenderer);
            exports.default = MeshRenderer, core.WebGLRenderer.registerPlugin("mesh", MeshRenderer);
        }, {
            "../../core": 65,
            "../Mesh": 166,
            path: 8,
            "pixi-gl-core": 15
        } ],
        173: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../core")), _utils = require("../core/utils"), ParticleContainer = function(_core$Container) {
                function ParticleContainer() {
                    var maxSize = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1500, properties = arguments[1], batchSize = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 16384;
                    _classCallCheck(this, ParticleContainer);
                    var _this = _possibleConstructorReturn(this, _core$Container.call(this));
                    return batchSize > 16384 && (batchSize = 16384), batchSize > maxSize && (batchSize = maxSize), 
                    _this._properties = [ !1, !0, !1, !1, !1 ], _this._maxSize = maxSize, _this._batchSize = batchSize, 
                    _this._glBuffers = {}, _this._bufferToUpdate = 0, _this.interactiveChildren = !1, 
                    _this.blendMode = core.BLEND_MODES.NORMAL, _this.roundPixels = !0, _this.baseTexture = null, 
                    _this.setProperties(properties), _this._tint = 0, _this.tintRgb = new Float32Array(4), 
                    _this.tint = 16777215, _this;
                }
                return _inherits(ParticleContainer, _core$Container), ParticleContainer.prototype.setProperties = function(properties) {
                    properties && (this._properties[0] = "scale" in properties ? !!properties.scale : this._properties[0], 
                    this._properties[1] = "position" in properties ? !!properties.position : this._properties[1], 
                    this._properties[2] = "rotation" in properties ? !!properties.rotation : this._properties[2], 
                    this._properties[3] = "uvs" in properties ? !!properties.uvs : this._properties[3], 
                    this._properties[4] = "alpha" in properties ? !!properties.alpha : this._properties[4]);
                }, ParticleContainer.prototype.updateTransform = function() {
                    this.displayObjectUpdateTransform();
                }, ParticleContainer.prototype.renderWebGL = function(renderer) {
                    var _this2 = this;
                    this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable && (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, 
                    this.baseTexture.hasLoaded || this.baseTexture.once("update", function() {
                        return _this2.onChildrenChange(0);
                    })), renderer.setObjectRenderer(renderer.plugins.particle), renderer.plugins.particle.render(this));
                }, ParticleContainer.prototype.onChildrenChange = function(smallestChildIndex) {
                    var bufferIndex = Math.floor(smallestChildIndex / this._batchSize);
                    bufferIndex < this._bufferToUpdate && (this._bufferToUpdate = bufferIndex);
                }, ParticleContainer.prototype.renderCanvas = function(renderer) {
                    if (this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable) {
                        var context = renderer.context, transform = this.worldTransform, isRotated = !0, positionX = 0, positionY = 0, finalWidth = 0, finalHeight = 0, compositeOperation = renderer.blendModes[this.blendMode];
                        compositeOperation !== context.globalCompositeOperation && (context.globalCompositeOperation = compositeOperation), 
                        context.globalAlpha = this.worldAlpha, this.displayObjectUpdateTransform();
                        for (var i = 0; i < this.children.length; ++i) {
                            var child = this.children[i];
                            if (child.visible) {
                                var frame = child._texture.frame;
                                if (context.globalAlpha = this.worldAlpha * child.alpha, child.rotation % (2 * Math.PI) == 0) isRotated && (context.setTransform(transform.a, transform.b, transform.c, transform.d, transform.tx * renderer.resolution, transform.ty * renderer.resolution), 
                                isRotated = !1), positionX = child.anchor.x * (-frame.width * child.scale.x) + child.position.x + .5, 
                                positionY = child.anchor.y * (-frame.height * child.scale.y) + child.position.y + .5, 
                                finalWidth = frame.width * child.scale.x, finalHeight = frame.height * child.scale.y; else {
                                    isRotated || (isRotated = !0), child.displayObjectUpdateTransform();
                                    var childTransform = child.worldTransform;
                                    renderer.roundPixels ? context.setTransform(childTransform.a, childTransform.b, childTransform.c, childTransform.d, childTransform.tx * renderer.resolution | 0, childTransform.ty * renderer.resolution | 0) : context.setTransform(childTransform.a, childTransform.b, childTransform.c, childTransform.d, childTransform.tx * renderer.resolution, childTransform.ty * renderer.resolution), 
                                    positionX = child.anchor.x * -frame.width + .5, positionY = child.anchor.y * -frame.height + .5, 
                                    finalWidth = frame.width, finalHeight = frame.height;
                                }
                                var resolution = child._texture.baseTexture.resolution;
                                context.drawImage(child._texture.baseTexture.source, frame.x * resolution, frame.y * resolution, frame.width * resolution, frame.height * resolution, positionX * renderer.resolution, positionY * renderer.resolution, finalWidth * renderer.resolution, finalHeight * renderer.resolution);
                            }
                        }
                    }
                }, ParticleContainer.prototype.destroy = function(options) {
                    if (_core$Container.prototype.destroy.call(this, options), this._buffers) for (var i = 0; i < this._buffers.length; ++i) this._buffers[i].destroy();
                    this._properties = null, this._buffers = null;
                }, _createClass(ParticleContainer, [ {
                    key: "tint",
                    get: function() {
                        return this._tint;
                    },
                    set: function(value) {
                        this._tint = value, (0, _utils.hex2rgb)(value, this.tintRgb);
                    }
                } ]), ParticleContainer;
            }(core.Container);
            exports.default = ParticleContainer;
        }, {
            "../core": 65,
            "../core/utils": 124
        } ],
        174: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0;
            var _ParticleContainer = require("./ParticleContainer");
            Object.defineProperty(exports, "ParticleContainer", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_ParticleContainer).default;
                }
            });
            var _ParticleRenderer = require("./webgl/ParticleRenderer");
            Object.defineProperty(exports, "ParticleRenderer", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_ParticleRenderer).default;
                }
            });
        }, {
            "./ParticleContainer": 173,
            "./webgl/ParticleRenderer": 176
        } ],
        175: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var _pixiGlCore2 = _interopRequireDefault(require("pixi-gl-core")), _createIndicesForQuads2 = _interopRequireDefault(require("../../core/utils/createIndicesForQuads")), ParticleBuffer = function() {
                function ParticleBuffer(gl, properties, dynamicPropertyFlags, size) {
                    _classCallCheck(this, ParticleBuffer), this.gl = gl, this.vertSize = 2, this.vertByteSize = 4 * this.vertSize, 
                    this.size = size, this.dynamicProperties = [], this.staticProperties = [];
                    for (var i = 0; i < properties.length; ++i) {
                        var property = properties[i];
                        property = {
                            attribute: property.attribute,
                            size: property.size,
                            uploadFunction: property.uploadFunction,
                            offset: property.offset
                        }, dynamicPropertyFlags[i] ? this.dynamicProperties.push(property) : this.staticProperties.push(property);
                    }
                    this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.dynamicStride = 0, 
                    this.dynamicBuffer = null, this.dynamicData = null, this.initBuffers();
                }
                return ParticleBuffer.prototype.initBuffers = function() {
                    var gl = this.gl, dynamicOffset = 0;
                    this.indices = (0, _createIndicesForQuads2.default)(this.size), this.indexBuffer = _pixiGlCore2.default.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW), 
                    this.dynamicStride = 0;
                    for (var i = 0; i < this.dynamicProperties.length; ++i) {
                        var property = this.dynamicProperties[i];
                        property.offset = dynamicOffset, dynamicOffset += property.size, this.dynamicStride += property.size;
                    }
                    this.dynamicData = new Float32Array(this.size * this.dynamicStride * 4), this.dynamicBuffer = _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl, this.dynamicData, gl.STREAM_DRAW);
                    var staticOffset = 0;
                    this.staticStride = 0;
                    for (var _i = 0; _i < this.staticProperties.length; ++_i) {
                        var _property = this.staticProperties[_i];
                        _property.offset = staticOffset, staticOffset += _property.size, this.staticStride += _property.size;
                    }
                    this.staticData = new Float32Array(this.size * this.staticStride * 4), this.staticBuffer = _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl, this.staticData, gl.STATIC_DRAW), 
                    this.vao = new _pixiGlCore2.default.VertexArrayObject(gl).addIndex(this.indexBuffer);
                    for (var _i2 = 0; _i2 < this.dynamicProperties.length; ++_i2) {
                        var _property2 = this.dynamicProperties[_i2];
                        this.vao.addAttribute(this.dynamicBuffer, _property2.attribute, gl.FLOAT, !1, 4 * this.dynamicStride, 4 * _property2.offset);
                    }
                    for (var _i3 = 0; _i3 < this.staticProperties.length; ++_i3) {
                        var _property3 = this.staticProperties[_i3];
                        this.vao.addAttribute(this.staticBuffer, _property3.attribute, gl.FLOAT, !1, 4 * this.staticStride, 4 * _property3.offset);
                    }
                }, ParticleBuffer.prototype.uploadDynamic = function(children, startIndex, amount) {
                    for (var i = 0; i < this.dynamicProperties.length; i++) {
                        var property = this.dynamicProperties[i];
                        property.uploadFunction(children, startIndex, amount, this.dynamicData, this.dynamicStride, property.offset);
                    }
                    this.dynamicBuffer.upload();
                }, ParticleBuffer.prototype.uploadStatic = function(children, startIndex, amount) {
                    for (var i = 0; i < this.staticProperties.length; i++) {
                        var property = this.staticProperties[i];
                        property.uploadFunction(children, startIndex, amount, this.staticData, this.staticStride, property.offset);
                    }
                    this.staticBuffer.upload();
                }, ParticleBuffer.prototype.destroy = function() {
                    this.dynamicProperties = null, this.dynamicData = null, this.dynamicBuffer.destroy(), 
                    this.staticProperties = null, this.staticData = null, this.staticBuffer.destroy();
                }, ParticleBuffer;
            }();
            exports.default = ParticleBuffer;
        }, {
            "../../core/utils/createIndicesForQuads": 122,
            "pixi-gl-core": 15
        } ],
        176: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), _ParticleShader2 = _interopRequireDefault(require("./ParticleShader")), _ParticleBuffer2 = _interopRequireDefault(require("./ParticleBuffer")), ParticleRenderer = function(_core$ObjectRenderer) {
                function ParticleRenderer(renderer) {
                    _classCallCheck(this, ParticleRenderer);
                    var _this = _possibleConstructorReturn(this, _core$ObjectRenderer.call(this, renderer));
                    return _this.shader = null, _this.indexBuffer = null, _this.properties = null, _this.tempMatrix = new core.Matrix(), 
                    _this.CONTEXT_UID = 0, _this;
                }
                return _inherits(ParticleRenderer, _core$ObjectRenderer), ParticleRenderer.prototype.onContextChange = function() {
                    var gl = this.renderer.gl;
                    this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.shader = new _ParticleShader2.default(gl), 
                    this.properties = [ {
                        attribute: this.shader.attributes.aVertexPosition,
                        size: 2,
                        uploadFunction: this.uploadVertices,
                        offset: 0
                    }, {
                        attribute: this.shader.attributes.aPositionCoord,
                        size: 2,
                        uploadFunction: this.uploadPosition,
                        offset: 0
                    }, {
                        attribute: this.shader.attributes.aRotation,
                        size: 1,
                        uploadFunction: this.uploadRotation,
                        offset: 0
                    }, {
                        attribute: this.shader.attributes.aTextureCoord,
                        size: 2,
                        uploadFunction: this.uploadUvs,
                        offset: 0
                    }, {
                        attribute: this.shader.attributes.aColor,
                        size: 1,
                        uploadFunction: this.uploadAlpha,
                        offset: 0
                    } ];
                }, ParticleRenderer.prototype.start = function() {
                    this.renderer.bindShader(this.shader);
                }, ParticleRenderer.prototype.render = function(container) {
                    var children = container.children, maxSize = container._maxSize, batchSize = container._batchSize, renderer = this.renderer, totalChildren = children.length;
                    if (0 !== totalChildren) {
                        totalChildren > maxSize && (totalChildren = maxSize);
                        var buffers = container._glBuffers[renderer.CONTEXT_UID];
                        buffers || (buffers = container._glBuffers[renderer.CONTEXT_UID] = this.generateBuffers(container));
                        var baseTexture = children[0]._texture.baseTexture;
                        this.renderer.setBlendMode(core.utils.correctBlendMode(container.blendMode, baseTexture.premultipliedAlpha));
                        var gl = renderer.gl, m = container.worldTransform.copy(this.tempMatrix);
                        m.prepend(renderer._activeRenderTarget.projectionMatrix), this.shader.uniforms.projectionMatrix = m.toArray(!0), 
                        this.shader.uniforms.uColor = core.utils.premultiplyRgba(container.tintRgb, container.worldAlpha, this.shader.uniforms.uColor, baseTexture.premultipliedAlpha), 
                        this.shader.uniforms.uSampler = renderer.bindTexture(baseTexture);
                        for (var i = 0, j = 0; i < totalChildren; i += batchSize, j += 1) {
                            var amount = totalChildren - i;
                            amount > batchSize && (amount = batchSize);
                            var buffer = buffers[j];
                            buffer.uploadDynamic(children, i, amount), container._bufferToUpdate === j && (buffer.uploadStatic(children, i, amount), 
                            container._bufferToUpdate = j + 1), renderer.bindVao(buffer.vao), buffer.vao.draw(gl.TRIANGLES, 6 * amount);
                        }
                    }
                }, ParticleRenderer.prototype.generateBuffers = function(container) {
                    for (var gl = this.renderer.gl, buffers = [], size = container._maxSize, batchSize = container._batchSize, dynamicPropertyFlags = container._properties, i = 0; i < size; i += batchSize) buffers.push(new _ParticleBuffer2.default(gl, this.properties, dynamicPropertyFlags, batchSize));
                    return buffers;
                }, ParticleRenderer.prototype.uploadVertices = function(children, startIndex, amount, array, stride, offset) {
                    for (var w0 = 0, w1 = 0, h0 = 0, h1 = 0, i = 0; i < amount; ++i) {
                        var sprite = children[startIndex + i], texture = sprite._texture, sx = sprite.scale.x, sy = sprite.scale.y, trim = texture.trim, orig = texture.orig;
                        trim ? (w0 = (w1 = trim.x - sprite.anchor.x * orig.width) + trim.width, h0 = (h1 = trim.y - sprite.anchor.y * orig.height) + trim.height) : (w0 = orig.width * (1 - sprite.anchor.x), 
                        w1 = orig.width * -sprite.anchor.x, h0 = orig.height * (1 - sprite.anchor.y), h1 = orig.height * -sprite.anchor.y), 
                        array[offset] = w1 * sx, array[offset + 1] = h1 * sy, array[offset + stride] = w0 * sx, 
                        array[offset + stride + 1] = h1 * sy, array[offset + 2 * stride] = w0 * sx, array[offset + 2 * stride + 1] = h0 * sy, 
                        array[offset + 3 * stride] = w1 * sx, array[offset + 3 * stride + 1] = h0 * sy, 
                        offset += 4 * stride;
                    }
                }, ParticleRenderer.prototype.uploadPosition = function(children, startIndex, amount, array, stride, offset) {
                    for (var i = 0; i < amount; i++) {
                        var spritePosition = children[startIndex + i].position;
                        array[offset] = spritePosition.x, array[offset + 1] = spritePosition.y, array[offset + stride] = spritePosition.x, 
                        array[offset + stride + 1] = spritePosition.y, array[offset + 2 * stride] = spritePosition.x, 
                        array[offset + 2 * stride + 1] = spritePosition.y, array[offset + 3 * stride] = spritePosition.x, 
                        array[offset + 3 * stride + 1] = spritePosition.y, offset += 4 * stride;
                    }
                }, ParticleRenderer.prototype.uploadRotation = function(children, startIndex, amount, array, stride, offset) {
                    for (var i = 0; i < amount; i++) {
                        var spriteRotation = children[startIndex + i].rotation;
                        array[offset] = spriteRotation, array[offset + stride] = spriteRotation, array[offset + 2 * stride] = spriteRotation, 
                        array[offset + 3 * stride] = spriteRotation, offset += 4 * stride;
                    }
                }, ParticleRenderer.prototype.uploadUvs = function(children, startIndex, amount, array, stride, offset) {
                    for (var i = 0; i < amount; ++i) {
                        var textureUvs = children[startIndex + i]._texture._uvs;
                        textureUvs ? (array[offset] = textureUvs.x0, array[offset + 1] = textureUvs.y0, 
                        array[offset + stride] = textureUvs.x1, array[offset + stride + 1] = textureUvs.y1, 
                        array[offset + 2 * stride] = textureUvs.x2, array[offset + 2 * stride + 1] = textureUvs.y2, 
                        array[offset + 3 * stride] = textureUvs.x3, array[offset + 3 * stride + 1] = textureUvs.y3, 
                        offset += 4 * stride) : (array[offset] = 0, array[offset + 1] = 0, array[offset + stride] = 0, 
                        array[offset + stride + 1] = 0, array[offset + 2 * stride] = 0, array[offset + 2 * stride + 1] = 0, 
                        array[offset + 3 * stride] = 0, array[offset + 3 * stride + 1] = 0, offset += 4 * stride);
                    }
                }, ParticleRenderer.prototype.uploadAlpha = function(children, startIndex, amount, array, stride, offset) {
                    for (var i = 0; i < amount; i++) {
                        var spriteAlpha = children[startIndex + i].alpha;
                        array[offset] = spriteAlpha, array[offset + stride] = spriteAlpha, array[offset + 2 * stride] = spriteAlpha, 
                        array[offset + 3 * stride] = spriteAlpha, offset += 4 * stride;
                    }
                }, ParticleRenderer.prototype.destroy = function() {
                    this.renderer.gl && this.renderer.gl.deleteBuffer(this.indexBuffer), _core$ObjectRenderer.prototype.destroy.call(this), 
                    this.shader.destroy(), this.indices = null, this.tempMatrix = null;
                }, ParticleRenderer;
            }(core.ObjectRenderer);
            exports.default = ParticleRenderer, core.WebGLRenderer.registerPlugin("particle", ParticleRenderer);
        }, {
            "../../core": 65,
            "./ParticleBuffer": 175,
            "./ParticleShader": 177
        } ],
        177: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            exports.__esModule = !0;
            var ParticleShader = function(_Shader) {
                function ParticleShader(gl) {
                    return _classCallCheck(this, ParticleShader), _possibleConstructorReturn(this, _Shader.call(this, gl, [ "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "void main(void){", "   vec2 v = aVertexPosition;", "   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);", "   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);", "   v = v + aPositionCoord;", "   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}" ].join("\n"), [ "varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "uniform vec4 uColor;", "void main(void){", "  vec4 color = texture2D(uSampler, vTextureCoord) * vColor * uColor;", "  if (color.a == 0.0) discard;", "  gl_FragColor = color;", "}" ].join("\n")));
                }
                return _inherits(ParticleShader, _Shader), ParticleShader;
            }(function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../../core/Shader")).default);
            exports.default = ParticleShader;
        }, {
            "../../core/Shader": 44
        } ],
        178: [ function(require, module, exports) {
            "use strict";
            Math.sign || (Math.sign = function(x) {
                return 0 === (x = Number(x)) || isNaN(x) ? x : x > 0 ? 1 : -1;
            });
        }, {} ],
        179: [ function(require, module, exports) {
            "use strict";
            var _objectAssign2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("object-assign"));
            Object.assign || (Object.assign = _objectAssign2.default);
        }, {
            "object-assign": 6
        } ],
        180: [ function(require, module, exports) {
            "use strict";
            require("./Object.assign"), require("./requestAnimationFrame"), require("./Math.sign"), 
            window.ArrayBuffer || (window.ArrayBuffer = Array), window.Float32Array || (window.Float32Array = Array), 
            window.Uint32Array || (window.Uint32Array = Array), window.Uint16Array || (window.Uint16Array = Array);
        }, {
            "./Math.sign": 178,
            "./Object.assign": 179,
            "./requestAnimationFrame": 181
        } ],
        181: [ function(require, module, exports) {
            (function(global) {
                "use strict";
                if (Date.now && Date.prototype.getTime || (Date.now = function() {
                    return new Date().getTime();
                }), !global.performance || !global.performance.now) {
                    var startTime = Date.now();
                    global.performance || (global.performance = {}), global.performance.now = function() {
                        return Date.now() - startTime;
                    };
                }
                for (var lastTime = Date.now(), vendors = [ "ms", "moz", "webkit", "o" ], x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
                    var p = vendors[x];
                    global.requestAnimationFrame = global[p + "RequestAnimationFrame"], global.cancelAnimationFrame = global[p + "CancelAnimationFrame"] || global[p + "CancelRequestAnimationFrame"];
                }
                global.requestAnimationFrame || (global.requestAnimationFrame = function(callback) {
                    if ("function" != typeof callback) throw new TypeError(callback + "is not a function");
                    var currentTime = Date.now(), delay = 16 + lastTime - currentTime;
                    return delay < 0 && (delay = 0), lastTime = currentTime, setTimeout(function() {
                        lastTime = Date.now(), callback(performance.now());
                    }, delay);
                }), global.cancelAnimationFrame || (global.cancelAnimationFrame = function(id) {
                    return clearTimeout(id);
                });
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {} ],
        182: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function findMultipleBaseTextures(item, queue) {
                var result = !1;
                if (item && item._textures && item._textures.length) for (var i = 0; i < item._textures.length; i++) if (item._textures[i] instanceof core.Texture) {
                    var baseTexture = item._textures[i].baseTexture;
                    -1 === queue.indexOf(baseTexture) && (queue.push(baseTexture), result = !0);
                }
                return result;
            }
            function findBaseTexture(item, queue) {
                return item instanceof core.BaseTexture && (-1 === queue.indexOf(item) && queue.push(item), 
                !0);
            }
            function findTexture(item, queue) {
                if (item._texture && item._texture instanceof core.Texture) {
                    var texture = item._texture.baseTexture;
                    return -1 === queue.indexOf(texture) && queue.push(texture), !0;
                }
                return !1;
            }
            function drawText(helper, item) {
                return item instanceof core.Text && (item.updateText(!0), !0);
            }
            function calculateTextStyle(helper, item) {
                if (item instanceof core.TextStyle) {
                    var font = item.toFontString();
                    return core.TextMetrics.measureFont(font), !0;
                }
                return !1;
            }
            function findText(item, queue) {
                if (item instanceof core.Text) {
                    -1 === queue.indexOf(item.style) && queue.push(item.style), -1 === queue.indexOf(item) && queue.push(item);
                    var texture = item._texture.baseTexture;
                    return -1 === queue.indexOf(texture) && queue.push(texture), !0;
                }
                return !1;
            }
            function findTextStyle(item, queue) {
                return item instanceof core.TextStyle && (-1 === queue.indexOf(item) && queue.push(item), 
                !0);
            }
            exports.__esModule = !0;
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../core")), _CountLimiter2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("./limiters/CountLimiter")), SharedTicker = core.ticker.shared;
            core.settings.UPLOADS_PER_FRAME = 4;
            var BasePrepare = function() {
                function BasePrepare(renderer) {
                    var _this = this;
                    _classCallCheck(this, BasePrepare), this.limiter = new _CountLimiter2.default(core.settings.UPLOADS_PER_FRAME), 
                    this.renderer = renderer, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], 
                    this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = function() {
                        _this.queue && _this.prepareItems();
                    }, this.registerFindHook(findText), this.registerFindHook(findTextStyle), this.registerFindHook(findMultipleBaseTextures), 
                    this.registerFindHook(findBaseTexture), this.registerFindHook(findTexture), this.registerUploadHook(drawText), 
                    this.registerUploadHook(calculateTextStyle);
                }
                return BasePrepare.prototype.upload = function(item, done) {
                    "function" == typeof item && (done = item, item = null), item && this.add(item), 
                    this.queue.length ? (done && this.completes.push(done), this.ticking || (this.ticking = !0, 
                    SharedTicker.addOnce(this.tick, this, core.UPDATE_PRIORITY.UTILITY))) : done && done();
                }, BasePrepare.prototype.tick = function() {
                    setTimeout(this.delayedTick, 0);
                }, BasePrepare.prototype.prepareItems = function() {
                    for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload(); ) {
                        var item = this.queue[0], uploaded = !1;
                        if (item && !item._destroyed) for (var i = 0, len = this.uploadHooks.length; i < len; i++) if (this.uploadHooks[i](this.uploadHookHelper, item)) {
                            this.queue.shift(), uploaded = !0;
                            break;
                        }
                        uploaded || this.queue.shift();
                    }
                    if (this.queue.length) SharedTicker.addOnce(this.tick, this, core.UPDATE_PRIORITY.UTILITY); else {
                        this.ticking = !1;
                        var completes = this.completes.slice(0);
                        this.completes.length = 0;
                        for (var _i = 0, _len = completes.length; _i < _len; _i++) completes[_i]();
                    }
                }, BasePrepare.prototype.registerFindHook = function(addHook) {
                    return addHook && this.addHooks.push(addHook), this;
                }, BasePrepare.prototype.registerUploadHook = function(uploadHook) {
                    return uploadHook && this.uploadHooks.push(uploadHook), this;
                }, BasePrepare.prototype.add = function(item) {
                    for (var i = 0, len = this.addHooks.length; i < len && !this.addHooks[i](item, this.queue); i++) ;
                    if (item instanceof core.Container) for (var _i2 = item.children.length - 1; _i2 >= 0; _i2--) this.add(item.children[_i2]);
                    return this;
                }, BasePrepare.prototype.destroy = function() {
                    this.ticking && SharedTicker.remove(this.tick, this), this.ticking = !1, this.addHooks = null, 
                    this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, 
                    this.limiter = null, this.uploadHookHelper = null;
                }, BasePrepare;
            }();
            exports.default = BasePrepare;
        }, {
            "../core": 65,
            "./limiters/CountLimiter": 185
        } ],
        183: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            function uploadBaseTextures(prepare, item) {
                if (item instanceof core.BaseTexture) {
                    var image = item.source, imageWidth = 0 === image.width ? prepare.canvas.width : Math.min(prepare.canvas.width, image.width), imageHeight = 0 === image.height ? prepare.canvas.height : Math.min(prepare.canvas.height, image.height);
                    return prepare.ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, prepare.canvas.width, prepare.canvas.height), 
                    !0;
                }
                return !1;
            }
            exports.__esModule = !0;
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), CANVAS_START_SIZE = 16, CanvasPrepare = function(_BasePrepare) {
                function CanvasPrepare(renderer) {
                    _classCallCheck(this, CanvasPrepare);
                    var _this = _possibleConstructorReturn(this, _BasePrepare.call(this, renderer));
                    return _this.uploadHookHelper = _this, _this.canvas = document.createElement("canvas"), 
                    _this.canvas.width = CANVAS_START_SIZE, _this.canvas.height = CANVAS_START_SIZE, 
                    _this.ctx = _this.canvas.getContext("2d"), _this.registerUploadHook(uploadBaseTextures), 
                    _this;
                }
                return _inherits(CanvasPrepare, _BasePrepare), CanvasPrepare.prototype.destroy = function() {
                    _BasePrepare.prototype.destroy.call(this), this.ctx = null, this.canvas = null;
                }, CanvasPrepare;
            }(function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../BasePrepare")).default);
            exports.default = CanvasPrepare, core.CanvasRenderer.registerPlugin("prepare", CanvasPrepare);
        }, {
            "../../core": 65,
            "../BasePrepare": 182
        } ],
        184: [ function(require, module, exports) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            exports.__esModule = !0;
            var _WebGLPrepare = require("./webgl/WebGLPrepare");
            Object.defineProperty(exports, "webgl", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_WebGLPrepare).default;
                }
            });
            var _CanvasPrepare = require("./canvas/CanvasPrepare");
            Object.defineProperty(exports, "canvas", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_CanvasPrepare).default;
                }
            });
            var _BasePrepare = require("./BasePrepare");
            Object.defineProperty(exports, "BasePrepare", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_BasePrepare).default;
                }
            });
            var _CountLimiter = require("./limiters/CountLimiter");
            Object.defineProperty(exports, "CountLimiter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_CountLimiter).default;
                }
            });
            var _TimeLimiter = require("./limiters/TimeLimiter");
            Object.defineProperty(exports, "TimeLimiter", {
                enumerable: !0,
                get: function() {
                    return _interopRequireDefault(_TimeLimiter).default;
                }
            });
        }, {
            "./BasePrepare": 182,
            "./canvas/CanvasPrepare": 183,
            "./limiters/CountLimiter": 185,
            "./limiters/TimeLimiter": 186,
            "./webgl/WebGLPrepare": 187
        } ],
        185: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var CountLimiter = function() {
                function CountLimiter(maxItemsPerFrame) {
                    _classCallCheck(this, CountLimiter), this.maxItemsPerFrame = maxItemsPerFrame, this.itemsLeft = 0;
                }
                return CountLimiter.prototype.beginFrame = function() {
                    this.itemsLeft = this.maxItemsPerFrame;
                }, CountLimiter.prototype.allowedToUpload = function() {
                    return this.itemsLeft-- > 0;
                }, CountLimiter;
            }();
            exports.default = CountLimiter;
        }, {} ],
        186: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            exports.__esModule = !0;
            var TimeLimiter = function() {
                function TimeLimiter(maxMilliseconds) {
                    _classCallCheck(this, TimeLimiter), this.maxMilliseconds = maxMilliseconds, this.frameStart = 0;
                }
                return TimeLimiter.prototype.beginFrame = function() {
                    this.frameStart = Date.now();
                }, TimeLimiter.prototype.allowedToUpload = function() {
                    return Date.now() - this.frameStart < this.maxMilliseconds;
                }, TimeLimiter;
            }();
            exports.default = TimeLimiter;
        }, {} ],
        187: [ function(require, module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            function uploadBaseTextures(renderer, item) {
                return item instanceof core.BaseTexture && (item._glTextures[renderer.CONTEXT_UID] || renderer.textureManager.updateTexture(item), 
                !0);
            }
            function uploadGraphics(renderer, item) {
                return item instanceof core.Graphics && ((item.dirty || item.clearDirty || !item._webGL[renderer.plugins.graphics.CONTEXT_UID]) && renderer.plugins.graphics.updateGraphics(item), 
                !0);
            }
            function findGraphics(item, queue) {
                return item instanceof core.Graphics && (queue.push(item), !0);
            }
            exports.__esModule = !0;
            var core = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                return newObj.default = obj, newObj;
            }(require("../../core")), WebGLPrepare = function(_BasePrepare) {
                function WebGLPrepare(renderer) {
                    _classCallCheck(this, WebGLPrepare);
                    var _this = _possibleConstructorReturn(this, _BasePrepare.call(this, renderer));
                    return _this.uploadHookHelper = _this.renderer, _this.registerFindHook(findGraphics), 
                    _this.registerUploadHook(uploadBaseTextures), _this.registerUploadHook(uploadGraphics), 
                    _this;
                }
                return _inherits(WebGLPrepare, _BasePrepare), WebGLPrepare;
            }(function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(require("../BasePrepare")).default);
            exports.default = WebGLPrepare, core.WebGLRenderer.registerPlugin("prepare", WebGLPrepare);
        }, {
            "../../core": 65,
            "../BasePrepare": 182
        } ],
        188: [ function(require, module, exports) {
            (function(global) {
                "use strict";
                function _interopRequireWildcard(obj) {
                    if (obj && obj.__esModule) return obj;
                    var newObj = {};
                    if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                    return newObj.default = obj, newObj;
                }
                exports.__esModule = !0, exports.loader = exports.prepare = exports.particles = exports.mesh = exports.loaders = exports.interaction = exports.filters = exports.extras = exports.extract = exports.accessibility = void 0;
                var _polyfill = require("./polyfill");
                Object.keys(_polyfill).forEach(function(key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function() {
                            return _polyfill[key];
                        }
                    });
                });
                var _core = require("./core");
                Object.keys(_core).forEach(function(key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function() {
                            return _core[key];
                        }
                    });
                });
                var _deprecation2 = function(obj) {
                    return obj && obj.__esModule ? obj : {
                        default: obj
                    };
                }(require("./deprecation")), accessibility = _interopRequireWildcard(require("./accessibility")), extract = _interopRequireWildcard(require("./extract")), extras = _interopRequireWildcard(require("./extras")), filters = _interopRequireWildcard(require("./filters")), interaction = _interopRequireWildcard(require("./interaction")), loaders = _interopRequireWildcard(require("./loaders")), mesh = _interopRequireWildcard(require("./mesh")), particles = _interopRequireWildcard(require("./particles")), prepare = _interopRequireWildcard(require("./prepare"));
                _core.utils.mixins.performMixins();
                var loader = loaders.shared || null;
                exports.accessibility = accessibility, exports.extract = extract, exports.extras = extras, 
                exports.filters = filters, exports.interaction = interaction, exports.loaders = loaders, 
                exports.mesh = mesh, exports.particles = particles, exports.prepare = prepare, exports.loader = loader, 
                "function" == typeof _deprecation2.default && (0, _deprecation2.default)(exports), 
                global.PIXI = exports;
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            "./accessibility": 42,
            "./core": 65,
            "./deprecation": 130,
            "./extract": 132,
            "./extras": 141,
            "./filters": 152,
            "./interaction": 159,
            "./loaders": 162,
            "./mesh": 171,
            "./particles": 174,
            "./polyfill": 180,
            "./prepare": 184
        } ]
    }, {}, [ 188 ])(188);
});

var app = new PIXI.Application(800, 600, {
    backgroundColor: 1087931
});

document.body.appendChild(app.view);

var bunny = PIXI.Sprite.fromImage("required/assets/basics/bunny.png");

bunny.anchor.set(.5), bunny.x = app.renderer.width / 2, bunny.y = app.renderer.height / 2, 
app.stage.addChild(bunny), app.ticker.add(function(delta) {
    bunny.rotation += .1 * delta;
});
//# sourceMappingURL=app.js.map