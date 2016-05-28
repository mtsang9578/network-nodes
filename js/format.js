var DSSAHLJFSKA;

function guid() {
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