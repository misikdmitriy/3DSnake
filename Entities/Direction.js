var Direction = {
    UP: 1,
    RIGHT: 2,
    DOWN: 4,
    LEFT: 8,
    NODIRECTION: 16
};

function nextPosition(direction, position) {
    switch (direction) {
        case Direction.UP:
            return {
                x: position.x,
                y: position.y - 1
            };
        case Direction.RIGHT:
            return {
                x: position.x + 1,
                y: position.y
            };
        case Direction.DOWN:
            return {
                x: position.x,
                y: position.y + 1
            };
        case Direction.LEFT:
            return {
                x: position.x - 1,
                y: position.y
            };
        case Direction.NODIRECTION:
            return {
                x: position.x,
                y: position.y
            };
        default:
            throw new Error("unknown direction");
    }
}