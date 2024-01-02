import { parseInputByCharacter, parseInputByLine } from '../../utils/utils';
import { Day } from '../../utils/day';

interface Tile {
    y: number;
    x: number;
    type: string;
    eval: number;
}

const partOne = (input: string) => {
    const tiles: Tile[][] = [];
    const lines = parseInputByLine(input);
    let startingTile: Tile;
    lines.forEach((line, yIndex) => {
        const row = [];
        [...line.trim()].forEach((char, xIndex) => {
            const curTile: Tile = {
                x: xIndex,
                y: yIndex,
                type: char,
                eval: -1,
            };

            if (char === 'S') {
                startingTile = curTile;
            }
            row.push(curTile);
        });
        tiles.push(row);
    });

    const nValid = ['|', 'L', 'J'];
    const sValid = ['|', 'F', '7'];
    const eValid = ['-', 'L', 'F'];
    const wValid = ['-', '7', 'J'];

    const evaluatedTiles = new Set<Tile>();

    const isEligible = (y: number, x: number) =>
        y >= 0 &&
        y < tiles.length &&
        x >= 0 &&
        x < tiles[0].length &&
        !evaluatedTiles.has(tiles[y][x]);

    startingTile.eval = 0;

    let remainingTiles = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const x = startingTile.x + j;
            const y = startingTile.y + i;
            const isCardinalDirection = i === 0 || j === 0;
            const isInBounds = isEligible(y, x);
            const isValidMovement =
                (i === 1 && nValid.includes(tiles[y][x]?.type)) ||
                (i === -1 && sValid.includes(tiles[y][x]?.type)) ||
                (j === 1 && wValid.includes(tiles[y][x]?.type)) ||
                (j === -1 && eValid.includes(tiles[y][x]?.type));

            if (isCardinalDirection && isInBounds && isValidMovement) {
                remainingTiles.push(tiles[y][x]);
            }
        }
    }

    let distance = 1;
    while (remainingTiles.length) {
        const nextEvaluated = [];
        remainingTiles.forEach((t) => {
            evaluatedTiles.add(t);
            const { type, x, y } = t;

            tiles[y][x].eval = distance;
            if (nValid.includes(type) && isEligible(y - 1, x)) {
                nextEvaluated.push(tiles[y - 1][x]);
            }
            if (sValid.includes(type) && isEligible(y + 1, x)) {
                nextEvaluated.push(tiles[y + 1][x]);
            }
            if (eValid.includes(type) && isEligible(y, x + 1)) {
                nextEvaluated.push(tiles[y][x + 1]);
            }
            if (wValid.includes(type) && isEligible(y, x - 1)) {
                nextEvaluated.push(tiles[y][x - 1]);
            }
        });
        remainingTiles = nextEvaluated;
        distance++;
    }

    const result = tiles
        .reduce((accumulator, value) => accumulator.concat(value), [])
        .reduce((acc, cur) => (acc.eval > cur.eval ? acc : cur)).eval;
    console.log(result);
};

const partTwo = (input: string) => {
    const tiles: Tile[][] = [];
    const lines = parseInputByLine(input);
    let startingTile: Tile;
    lines.forEach((line, yIndex) => {
        const row = [];
        [...line.trim()].forEach((char, xIndex) => {
            const curTile: Tile = {
                x: xIndex,
                y: yIndex,
                type: char,
                eval: -1,
            };

            if (char === 'S') {
                startingTile = curTile;
            }
            row.push(curTile);
        });
        tiles.push(row);
    });

    const nValid = ['|', 'L', 'J'];
    const sValid = ['|', 'F', '7'];
    const eValid = ['-', 'L', 'F'];
    const wValid = ['-', '7', 'J'];

    const evaluatedTiles = new Set<Tile>();

    const isInBounds = (y: number, x: number) =>
        y >= 0 && y < tiles.length && x >= 0 && x < tiles[0].length;
    const isEligible = (y: number, x: number) =>
        isInBounds(y, x) && !evaluatedTiles.has(tiles[y][x]);

    startingTile.eval = 0;

    let remainingTiles = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            const x = startingTile.x + j;
            const y = startingTile.y + i;
            const isCardinalDirection = i === 0 || j === 0;
            const inBounds = isEligible(y, x);
            const isValidMovement =
                (i === 1 && nValid.includes(tiles[y][x]?.type)) ||
                (i === -1 && sValid.includes(tiles[y][x]?.type)) ||
                (j === 1 && wValid.includes(tiles[y][x]?.type)) ||
                (j === -1 && eValid.includes(tiles[y][x]?.type));

            if (isCardinalDirection && inBounds && isValidMovement) {
                remainingTiles.push(tiles[y][x]);
            }
        }
    }

    let distance = 1;
    while (remainingTiles.length) {
        const nextEvaluated = [];
        remainingTiles.forEach((t) => {
            evaluatedTiles.add(t);
            const { type, x, y } = t;

            tiles[y][x].eval = distance;
            if (nValid.includes(type) && isEligible(y - 1, x)) {
                nextEvaluated.push(tiles[y - 1][x]);
            }
            if (sValid.includes(type) && isEligible(y + 1, x)) {
                nextEvaluated.push(tiles[y + 1][x]);
            }
            if (eValid.includes(type) && isEligible(y, x + 1)) {
                nextEvaluated.push(tiles[y][x + 1]);
            }
            if (wValid.includes(type) && isEligible(y, x - 1)) {
                nextEvaluated.push(tiles[y][x - 1]);
            }
        });
        remainingTiles = nextEvaluated;
        distance++;
    }

    let groups: Tile[][] = [];
    const groupMap = new Map<Tile, Tile[]>();

    const flatTiles = tiles.reduce(
        (accumulator, value) => accumulator.concat(value),
        []
    );

    const getNeighbors = (tile: Tile): Tile[] => {
        const neighbors = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const x = tile.x + j;
                const y = tile.y + i;
                const isCardinalDirection =
                    i === 0 || (j === 0 && !(i === 0 && j === 0));
                const inBounds = isInBounds(y, x);

                if (isCardinalDirection && inBounds) {
                    neighbors.push(tiles[y][x]);
                }
            }
        }

        return neighbors;
    };

    flatTiles.forEach((tile, index) => {
        if (tile.eval !== -1) {
            return;
        }

        const neighbors = getNeighbors(tile).filter((tile) => tile.eval !== -1);

        // case 1 borders a group
        let found = false;
        neighbors.forEach((neighbor) => {
            groups.forEach((group) => {
                if (group.includes(neighbor)) {
                    group.push(tile);
                    groupMap.set(tile, group);
                    found = true;
                }
            });
        });

        // case 2 new group
        if (!found) {
            groups.push([tile]);
            groupMap.set(tile, groups[groups.length - 1]);
        }
    });

    // combine neighboring groups
    let continueMerging = true;
    const relevantTiles = groups.reduce(
        (accumulator, value) => accumulator.concat(value),
        []
    );

    while (continueMerging) {
        continueMerging = false;

        relevantTiles.forEach((tile) => {
            if (continueMerging) {
                return;
            }
            const neighbors = getNeighbors(tile).filter((tile) =>
                relevantTiles.includes(tile)
            );
            neighbors.forEach((neighbor) => {
                if (groupMap.get(tile) !== groupMap.get(neighbor)) {
                    // merge the groups of tile and neighbor
                    const newGroup = [
                        ...groupMap.get(tile),
                        ...groupMap.get(neighbor),
                    ];

                    groups = groups.filter(
                        (group) =>
                            group !== groupMap.get(tile) &&
                            group !== groupMap.get(neighbor)
                    );

                    newGroup.forEach((tile) => {
                        groupMap.set(tile, newGroup);
                    });

                    groups.push(newGroup);

                    continueMerging = true;
                }
            });
        });
    }

    // clean up groups
    for (let i = 0; i < groups.length; i++) {
        const uniqueGroup = new Set(groups[i]);
        while (groups[i].length > 0) {
            groups[i].pop();
        }
        groups[i].push(...uniqueGroup.values());
    }

    let sum = 0;
    const vertical = ['-', 'S'];
    const horizontal = ['|', 'S'];
    groups.forEach((group) => {
        const surroundings = [];
        let isSurrounded = true;
        group.forEach((tile) => {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const x = tile.x + j;
                    const y = tile.y + i;
                    const isCardinalDirection =
                        i === 0 || (j === 0 && !(i === 0 && j === 0));

                    if (isCardinalDirection) {
                        const inBounds = isInBounds(y, x);
                        if (inBounds) {
                            const isNeighboringPiece = tiles[y][x]?.eval !== -1;
                            const isNeighboringGroup = group.includes(
                                tiles[y][x]
                            );
                            if (!isNeighboringPiece && !isNeighboringGroup) {
                                surroundings.push(tiles[y][x]);
                            }
                        }
                    }
                }
            }
        });
        if (isSurrounded) {
            console.log(group);
            sum += group.length;
        }
    });
    console.log(sum);
};

export const Day10 = new Day(partOne, partTwo);
