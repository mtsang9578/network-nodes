var DSSAHLJFSKA;

function guid() {
    'use strict';

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

class Node {
    constructor(x, y, ref) {
        this.x = x;
        this.y = y;
        this.ref = ref;
        this.guid = guid();
        this.lines = [];
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getRef() {
        return this.ref;
    }

    getGuid() {
        return this.guid;
    }

    getLines() {
        return this.lines;
    }

    draw() {
        var drawingContainer = document.getElementById('svg-container'),
            activeNode = this,
            nodePoint,
            clickable,
            clickableCircle;

        if (document.getElementById(activeNode.getGuid())) {
            nodePoint = document.getElementById(activeNode.getGuid());
            clickableCircle = document.getElementById(activeNode.getGuid() + '-c');

            [nodePoint, clickableCircle].forEach(function (el) {
                el.setAttribute('cx', activeNode.getX());
                el.setAttribute('cy', activeNode.getY());
            });
        } else {
            nodePoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            clickable = document.createElementNS('http://www.w3.org/2000/svg', 'a');
            clickableCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

            nodePoint.setAttribute('id', activeNode.getGuid());
            nodePoint.setAttribute('r', '2');
            nodePoint.setAttribute('fill', 'black');
            clickableCircle.setAttribute('id', activeNode.getGuid() + '-c');
            clickableCircle.setAttribute('r', '5');
            clickableCircle.setAttribute('fill-opacity', '0');
            clickable.setAttribute('xlink:href', '#');
            drawingContainer = drawingContainer.appendChild(clickable);

            [nodePoint, clickableCircle].forEach(function (el) {
                el.setAttribute('cx', activeNode.getX());
                el.setAttribute('cy', activeNode.getY());
                el.setAttribute('class', 'cursor-pointer');
                drawingContainer.appendChild(el);
            });
        }

        return document.getElementById(activeNode.getGuid());
    }
}

class Edge {
    constructor(n1, n2) {
        this.n1 = n1;
        this.n2 = n2;
        this.guid = guid();
    }

    getN1() {
        return this.n1;
    }

    getN2() {
        return this.n2;
    }

    getGuid() {
        return this.guid;
    }

    draw() {
        var drawingContainer = document.getElementById('svg-container'),
            line = document.getElementById(this.getGuid()) ? document.getElementById(this.getGuid()) :
                document.createElementNS('http://www.w3.org/2000/svg', 'line');

        line.setAttribute('x1', this.getN1().getX());
        line.setAttribute('y1', this.getN1().getY());
        line.setAttribute('x2', this.getN2().getX());
        line.setAttribute('y2', this.getN2().getY());

        if (!document.getElementById(this.getGuid())) {
            line.setAttribute('id', this.getGuid());
            line.setAttribute('stroke-width', '1');
            line.setAttribute('stroke', 'black');
            drawingContainer.appendChild(line);
        }
    }
}


var EDGEARRAY = [];
var NODEARRAY = [],
    i;

for (i = 0; i < 6; i++) {
    NODEARRAY.push(new Node(Math.random() * 500, Math.random() * 500, Math.floor((Math.random() * 6))));
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