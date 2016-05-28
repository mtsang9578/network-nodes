'use strict';

var nodeGuids = {},
    edgeGuids = {};

function createNodeSvg(node, x, y) {
    var drawingContainer = document.getElementById('svg-container'),
        nodeGuid = node.getGuid();

    drawingContainer.innerHTML = drawingContainer.innerHTML + '<circle id="' + nodeGuid + '" cx="' + x + '" cy="' + y + '" r="2" />';
}

function polarToCart(r, theta) {
    return [r * Math.cos(theta), r * Math.sin(theta)];
}

function connect(edge, node1, node2) {
    var drawingContainer = document.getElementById('svg-container'),
        containerHtml = drawingContainer.innerHTML,
        edgeGuid = edge.getGuid();

    drawingContainer.innerHTML = drawingContainer.innerHTML + '<line id="' + edgeGuid + '" x1="' + node1.getX() + '" y1="' + node1.getY() + '" x2="' + node2.getX() + '" y2="' + node2.getY() + '" stroke-width="1" stroke="black"/>';
}

function init() {

    document.getElementById('svg-network').innerHTML = '<svg id="svg-container" width="500" ' + 'height="500" xmlns="http://www.w3.org/2000/svg"></svg>';
}

function inflateNetwork(nodeArray, edgeArray) {

    nodeArray.forEach(function (el, index) {
        createNodeSvg(el, el.getX(), el.getY());
        nodeGuids[el.getGuid()] = el;
    });

    edgeArray.forEach(function (el, index) {
        connect(el, el.n1, el.n2);
        edgeGuids[el.getGuid()] = el;
    });
}

//# sourceMappingURL=main-compiled.js.map