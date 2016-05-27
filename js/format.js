var DSSAHLJFSKA;

class node {
    constructor(x, y, ref) {
        this.x = x;
        this.y = y;
        this.ref = ref;
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

}

class Edge {
    constructor(n1, n2) {
        this.n1 = n1;
        this.n2 = n2;
    }
    getN1() {
        return this.n1;
    }
    getN2() {
        return this.n2;
    }
}


var edgeArray = [];
var nodeArray = [];

for (var i = 0; i < 6; i++) {
    nodeArray.push(new node(Math.random() * 10, Math.random() * 10, Math.floor((Math.random() * 6))));
}

nodeArray.forEach(function (element) {
    console.log(element);
    console.log(element.getRef());
});

var node1 = nodeArray[0];
var node2 = nodeArray[1];

var e = new Edge(node1, node2);
console.log(e);

DSSAHLJFSKA = e;

for (var i = 0; i < nodeArray.length; i++) {
    edgeArray.push(new Edge(nodeArray[i], nodeArray[nodeArray[i].getRef()]));
}

edgeArray.forEach(function (element) {
    console.log(element);
});