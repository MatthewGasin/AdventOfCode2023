import { parseInputByCharacter, parseInputByLine } from '../../utils/utils';
import { Day } from '../../utils/day';

const partOne = (input: string) => {
    const [times, distances] = parseInputByLine(input).map((line) =>
        line
            .split(':')[1]
            .trim()
            .split(' ')
            .map((data) => parseInt(data.trim()))
            .filter((data) => !isNaN(data))
    );

    const margins = [];

    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const distance = distances[i];
        let records = 0;

        // run simulation for each option to hold
        for (let j = 0; j < time - 1; j++) {
            const dpt = j * (time - j);
            if (dpt > distance) {
                records++;
            }
        }

        margins.push(records);
    }

    const result = margins.reduce((acc, cur) => acc * cur);
    console.log(result);
};

const partTwo = (input: string) => {
    const [times, distances] = parseInputByLine(input).map((line) =>
        [line.split(':')[1].trim().replace(/\D/g, '')].map((item) => {
            console.log(item);

            return parseInt(item);
        })
    );

    const margins = [];
    console.log(times, distances);

    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const distance = distances[i];
        let records = 0;

        // run simulation for each option to hold
        for (let j = 0; j < time - 1; j++) {
            const dpt = j * (time - j);
            if (dpt > distance) {
                records++;
            }
        }

        margins.push(records);
    }

    const result = margins[0];
    console.log(result);
};

export const Day6 = new Day(partOne, partTwo);
