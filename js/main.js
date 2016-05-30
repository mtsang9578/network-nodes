var nodeGuids = {},
    edgeGuids = {},
    ORIGMOUSEX,
    ORIGMOUSEY,
    movingNode = false;

String.prototype.separateByCharacter = function (separator, start) {
    'use strict';

    var returnArray = [],
        str = this + ' ';

    while (str.indexOf(separator, start) + 1) {
        returnArray.push(str.slice(start, str.indexOf(separator, start)));
        start = str.indexOf(separator, start) + 1;
    }

    return returnArray;
};


function polarToCart(r, theta) {
    'use strict';

    return [r * Math.cos(theta), r * Math.sin(theta)];
}

function inflateNetwork(nodeArray, edgeArray) {
    'use strict';

    nodeArray.forEach(function (el) {
        el.draw();
        nodeGuids[el.getGuid()] = el;
    });

    edgeArray.forEach(function (el) {
        el.draw();
        edgeGuids[el.getGuid()] = el;
        el.getN1().lines.push(el.getGuid());
        el.getN2().lines.push(el.getGuid());
    });

    // jank ass method to force content inside svg-container to draw correctly
    document.getElementById('svg-container').innerHTML = document.getElementById('svg-container').innerHTML + ' ';

    $('a').on('mousedown', function () {
        var activeDomNode = this;
        movingNode = true;
        $(document).on('mousemove', function (event) {
            var scheduled = false,
                activeNodeGuid = activeDomNode.getElementsByTagName('circle')[0].getAttribute('id'),
                activeNode = nodeGuids[activeNodeGuid],
                svgContainer = $('#svg-container');

            if (!scheduled) {
                scheduled = true;
                setTimeout(function () {
                    scheduled = false;
                    activeNode.x = event.clientX - svgContainer.offset().left;
                    activeNode.y = event.clientY - svgContainer.offset().top;
                    activeNode.draw();
                    activeNode.getLines().forEach(function (connection) {
                        edgeGuids[connection].draw();
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
                var scheduled = false;

                if (!scheduled) {
                    scheduled = true;
                    setTimeout(function () {
                        scheduled = false;
                        NODEARRAY.forEach(function (el) {
                            el.x = el.getX() + event.clientX - origMouseX;
                            el.y = el.getY() + event.clientY - origMouseY;
                            el.draw();
                        });
                        EDGEARRAY.forEach(function (el) {
                            el.draw();
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
    $('#svg-container').on('scroll', function () {
        var viewBoxStr = this.getAttribute('viewBox'),
            viewBoxArr = viewBoxStr.separateByCharacter(' ', 0),
            minX = viewBoxArr[0],
            minY = viewBoxArr[1],
            width = viewBoxArr[2],
            height = viewBoxArr[3];

        this.setAttribute('viewBox', minX + ' ' + minY + ' ' + (parseInt(width) + 5));
    });
}


