import { parseInputByCharacter, parseInputByLine } from '../../utils/utils';
import { Day } from '../../utils/day';
import { it } from 'node:test';

const partOne = (input: string) => {
    const histories = parseInputByLine(input).map((line) =>
        line
            .trim()
            .split(' ')
            .map((val) => parseInt(val))
    );

    let sum = 0;
    histories.forEach((history) => {
        const iterations = [history];
        const isValid = () =>
            iterations[iterations.length - 1].filter((num) => num !== 0)
                .length === 0;

        while (!isValid()) {
            const prevIteration = iterations[iterations.length - 1];
            const nextIteration = [];
            for (let i = 0; i < prevIteration.length - 1; i++) {
                nextIteration.push(prevIteration[i + 1] - prevIteration[i]);
            }
            iterations.push(nextIteration);
        }

        const cur = iterations.reduce(
            (acc, cur) => acc + cur[cur.length - 1],
            0
        );
        sum += cur;
    });

    console.log(sum);
};

const partTwo = (input: string) => {
    const histories = parseInputByLine(input).map((line) =>
        line
            .trim()
            .split(' ')
            .map((val) => parseInt(val))
    );

    let sum = 0;
    histories.forEach((history) => {
        const iterations = [history];
        const isValid = () =>
            iterations[iterations.length - 1].filter((num) => num !== 0)
                .length === 0;

        while (!isValid()) {
            const prevIteration = iterations[iterations.length - 1];
            const nextIteration = [];
            for (let i = 0; i < prevIteration.length - 1; i++) {
                nextIteration.push(prevIteration[i + 1] - prevIteration[i]);
            }
            iterations.push(nextIteration);
        }

        const cur = iterations.reduceRight((acc, cur) => cur[0] - acc, 0);
        sum += cur;
    });

    console.log(sum);
};

export const Day9 = new Day(partOne, partTwo);
