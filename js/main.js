var nodeGuids = {},
    edgeGuids = {},
    ORIGMOUSEX,
    ORIGMOUSEY,
    movingNode = false;

function drawNode(node) {
    'use strict';

    var drawingContainer = document.getElementById('svg-container'),
        nodePoint,
        clickable,
        clickableCircle;

    if (document.getElementById(node.getGuid())) {
        nodePoint = document.getElementById(node.getGuid());
        clickableCircle = document.getElementById(node.getGuid() + '-c');

        [nodePoint, clickableCircle].forEach(function (el) {
            el.setAttribute('cx', node.getX());
            el.setAttribute('cy', node.getY());
        });
    } else {
        nodePoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        clickable = document.createElementNS('http://www.w3.org/2000/svg', 'a');
        clickableCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        nodePoint.setAttribute('id', node.getGuid());
        nodePoint.setAttribute('r', '2');
        nodePoint.setAttribute('fill', 'black');
        clickableCircle.setAttribute('id', node.getGuid() + '-c');
        clickableCircle.setAttribute('r', '5');
        clickableCircle.setAttribute('fill-opacity', '0');
        clickable.setAttribute('xlink:href', '#');
        drawingContainer = drawingContainer.appendChild(clickable);

        [nodePoint, clickableCircle].forEach(function (el) {
            el.setAttribute('cx', node.getX());
            el.setAttribute('cy', node.getY());
            el.setAttribute('class', 'cursor-pointer');
            drawingContainer.appendChild(el);
        });
    }
}

function drawEdge(edge) {
    'use strict';

    var drawingContainer = document.getElementById('svg-container'),
        line;

    if (document.getElementById(edge.getGuid())) {
        line = document.getElementById(edge.getGuid());

        line.setAttribute('x1', edge.getN1().getX());
        line.setAttribute('y1', edge.getN1().getY());
        line.setAttribute('x2', edge.getN2().getX());
        line.setAttribute('y2', edge.getN2().getY());
    } else {
        line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        line.setAttribute('id', edge.getGuid());
        line.setAttribute('x1', edge.getN1().getX());
        line.setAttribute('y1', edge.getN1().getY());
        line.setAttribute('x2', edge.getN2().getX());
        line.setAttribute('y2', edge.getN2().getY());
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke', 'black');
        drawingContainer.appendChild(line);
    }

}

function polarToCart(r, theta) {
    'use strict';

    return [r * Math.cos(theta), r * Math.sin(theta)];
}

function inflateNetwork(nodeArray, edgeArray) {
    'use strict';

    nodeArray.forEach(function (el) {
        drawNode(el);
        nodeGuids[el.getGuid()] = el;
    });

    edgeArray.forEach(function (el) {
        drawEdge(el);
        edgeGuids[el.getGuid()] = el;
        el.getN1().connectedLines.push(el.getGuid());
        el.getN2().connectedLines.push(el.getGuid());
    });

    // jank ass method to force content inside svg-container to draw correctly
    document.getElementById('svg-container').innerHTML = document.getElementById('svg-container').innerHTML + ' ';

    $('a').on('mousedown', function (e) {
        var activeDomNode = this;
        movingNode = true;
        $(document).on('mousemove', function (event) {
            var lastEvent = event,
                scheduled = false,
                activeNodeGuid = activeDomNode.getElementsByTagName('circle')[0].getAttribute('id'),
                activeNode = nodeGuids[activeNodeGuid],
                svgContainer = $('#svg-container');

            if (!scheduled) {
                scheduled = true;
                setTimeout(function () {
                    scheduled = false;
                    activeNode.x = lastEvent.clientX - svgContainer.offset().left;
                    activeNode.y = lastEvent.clientY - svgContainer.offset().top;
                    drawNode(activeNode);
                    activeNode.getLines().forEach(function (connection) {
                        drawEdge(edgeGuids[connection]);
                    });
                }, 15);
            }
        });
    });


    $('#svg-container').on('mousedown', function (event) {
        if (!movingNode) {
            var origMouseX = event.clientX,
                origMouseY = event.clientY;
            $(document).on('mousemove', function (event) {
                var lastEvent = event,
                    scheduled = false;

                if (!scheduled) {
                    scheduled = true;
                    setTimeout(function () {
                        scheduled = false;
                        NODEARRAY.forEach(function (el) {
                            el.x = el.x + event.clientX - origMouseX;
                            el.y = el.y + event.clientY - origMouseY;
                            drawNode(el);
                            el.getLines().forEach(function (connection) {
                                drawEdge(edgeGuids[connection]);
                            });
                        });
                        origMouseX = event.clientX;
                        origMouseY = event.clientY;
                    }, 15);
                }
            });
        }
    });
}

function init() {
    'use strict';

    inflateNetwork(NODEARRAY, EDGEARRAY);

    $(document).on('mouseup', function () {
        $(document).off('mousemove');
        movingNode = false;
    });
}
