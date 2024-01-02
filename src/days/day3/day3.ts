import { parseInputByCharacter, parseInputByLine } from '../../utils/utils';
import { Day } from '../../utils/day';

interface point {
    y: number;
    x: number;
    c: string;
}

interface engine {
    value: number;
    points: point[];
}

const isDigit = /^\d$/;

const partOne = (input: string) => {
    // sort data into grid and engines
    const grid: point[][] = [];
    const engines: engine[] = [];
    parseInputByLine(input).forEach((line, yIndex) => {
        const linePoints = [];
        let curEngine = null;
        [...line].forEach((char, xIndex) => {
            if (char === '\r') {
                char = '.';
            }
            const p: point = { y: yIndex, x: xIndex, c: char };
            linePoints.push(p);

            if (isDigit.test(char)) {
                if (curEngine) {
                    curEngine.value = parseInt(`${curEngine.value}${char}`);
                    curEngine.points.push(p);
                } else {
                    const e: engine = { points: [p], value: parseInt(char) };
                    curEngine = e;
                }
            } else if (curEngine) {
                engines.push(curEngine);
                curEngine = null;
            }
        });
        grid.push(linePoints);
    });

    const hasValidAdjacents = (p: point) => {
        const isInBounds = (y: number, x: number) =>
            y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (isInBounds(p.y + i, p.x + j)) {
                    const cur = grid[p.y + i][p.x + j];
                    if (cur.c !== '.' && !isDigit.test(cur.c)) {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    let sum = 0;
    engines.forEach((engine) => {
        let valid = false;
        engine.points.forEach((p) => {
            if (hasValidAdjacents(p)) {
                valid = true;
            }
        });

        if (valid) {
            sum += engine.value;
        }
    });

    console.log(sum);
};

const partTwo = (input: string) => {
    // sort data into grid and engines
    const grid: point[][] = [];
    const engines: engine[] = [];
    parseInputByLine(input).forEach((line, yIndex) => {
        const linePoints = [];
        let curEngine = null;
        [...line].forEach((char, xIndex) => {
            if (char === '\r') {
                char = '.';
            }
            const p: point = { y: yIndex, x: xIndex, c: char };
            linePoints.push(p);

            if (isDigit.test(char)) {
                if (curEngine) {
                    curEngine.value = parseInt(`${curEngine.value}${char}`);
                    curEngine.points.push(p);
                } else {
                    const e: engine = { points: [p], value: parseInt(char) };
                    curEngine = e;
                }
            } else if (curEngine) {
                engines.push(curEngine);
                curEngine = null;
            }
        });
        grid.push(linePoints);
    });

    const getValidAdjacents = (p: point) => {
        const valid = [];
        const isInBounds = (y: number, x: number) =>
            y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (isInBounds(p.y + i, p.x + j)) {
                    const cur = grid[p.y + i][p.x + j];
                    if (isDigit.test(cur.c)) {
                        valid.push(cur);
                    }
                }
            }
        }

        return valid;
    };

    let sum = 0;
    grid.flat().forEach((point) => {
        if (point.c === '*') {
            const adjacents = getValidAdjacents(point);
            const adjacentEngines = [];
            adjacents.forEach((point) => {
                engines.forEach((engine) => {
                    if (
                        engine.points.includes(point) &&
                        !adjacentEngines.includes(engine)
                    ) {
                        adjacentEngines.push(engine);
                    }
                });
            });

            if (adjacentEngines.length === 2) {
                sum += adjacentEngines[0].value * adjacentEngines[1].value;
            }
        }
    });

    console.log(sum);
};

export const Day3 = new Day(partOne, partTwo);
