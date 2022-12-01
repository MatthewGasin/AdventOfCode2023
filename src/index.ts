import { Demo } from './days/demo/demo';
import { part } from './utils/day';
import { readInput } from './utils/utils';

const DAY_MAP = {
    demo: Demo,
};

type name = keyof typeof DAY_MAP;

const runPuzzle = (curDay: name, curPart: part) => {
    const input = readInput(curDay);
    DAY_MAP[curDay].run(curPart, input);
};

const DAY: name = 'demo';
const PART: part = 2;

runPuzzle(DAY, PART);
