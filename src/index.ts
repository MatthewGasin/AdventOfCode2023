import type { Day, part } from './utils/day';
import { readInput } from './utils/utils';
import { Demo } from './days/demo/demo';
import { Day1 } from './days/day1/day1';
import { Day2 } from './days/day2/day2';
import { Day3 } from './days/day3/day3';
import { Day4 } from './days/day4/day4';
import { Day5 } from './days/day5/day5';
import { Day6 } from './days/day6/day6';
import { Day7 } from './days/day7/day7';
import { Day8 } from './days/day8/day8';
import { Day9 } from './days/day9/day9';
import { Day10 } from './days/day10/day10';

const DAY_MAP = new Map<string, Day>([
    ['demo', Demo],
    ['day1', Day1],
    ['day2', Day2],
    ['day3', Day3],
    ['day4', Day4],
    ['day5', Day5],
    ['day6', Day6],
    ['day7', Day7],
    ['day8', Day8],
    ['day9', Day9],
    ['day10', Day10],
]);
const runPuzzle = () => {
    const curDay = process.argv[2] || 'demo';
    const curPart = (parseInt(process.argv[3]) || 1) as part;

    const input = readInput(curDay);
    DAY_MAP.has(curDay) && DAY_MAP.get(curDay)?.run(curPart, input);
};

runPuzzle();
