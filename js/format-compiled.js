'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DSSAHLJFSKA;

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var Node = function () {
    function Node(x, y, ref) {
        _classCallCheck(this, Node);

        this.x = x;
        this.y = y;
        this.ref = ref;
        this.guid = guid();
    }

    _createClass(Node, [{
        key: 'getX',
        value: function getX() {
            return this.x;
        }
    }, {
        key: 'getY',
        value: function getY() {
            return this.y;
        }
    }, {
        key: 'getRef',
        value: function getRef() {
            return this.ref;
        }
    }, {
        key: 'getGuid',
        value: function getGuid() {
            return this.guid;
        }
    }]);

    return Node;
}();

var Edge = function () {
    function Edge(n1, n2) {
        _classCallCheck(this, Edge);

        this.n1 = n1;
        this.n2 = n2;
        this.guid = guid();
    }

    _createClass(Edge, [{
        key: 'getN1',
        value: function getN1() {
            return this.n1;
        }
    }, {
        key: 'getN2',
        value: function getN2() {
            return this.n2;
        }
    }, {
        key: 'getGuid',
        value: function getGuid() {
            return this.guid;
        }
    }]);

    return Edge;
}();

var EDGEARRAY = [];
var NODEARRAY = [],
    i;

for (i = 0; i < 6; i++) {
    NODEARRAY.push(new Node(Math.random() * 500, Math.random() * 500, Math.floor(Math.random() * 6)));
}

NODEARRAY.forEach(function (element) {
    console.log(element);
    console.log(element.getRef());
});

var node1 = NODEARRAY[0];
var node2 = NODEARRAY[1];

var e = new Edge(node1, node2);
console.log(e);

DSSAHLJFSKA = e;

for (i = 0; i < NODEARRAY.length; i++) {
    EDGEARRAY.push(new Edge(NODEARRAY[i], NODEARRAY[NODEARRAY[i].getRef()]));
}

EDGEARRAY.forEach(function (element) {
    console.log(element);
});

//# sourceMappingURL=format-compiled.js.map