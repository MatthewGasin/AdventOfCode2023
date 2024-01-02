import { parseInputByLine } from '../../utils/utils';
import { Day } from '../../utils/day';

const partOne = (input: string) => {
    const lines = parseInputByLine(input);
    let sum = 0;
    lines.forEach((line) => {
        const digits = [...line].filter((c) => parseInt(c));
        const calibration = parseInt(digits[0] + digits[digits.length - 1]);
        sum += calibration;
    });
    console.log(sum);
};

const partTwo = (input: string) => {
    const lines = parseInputByLine(input);
    let sum = 0;

    const numMap = new Map<string, string>([
        ['one', '1'],
        ['two', '2'],
        ['three', '3'],
        ['four', '4'],
        ['five', '5'],
        ['six', '6'],
        ['seven', '7'],
        ['eight', '8'],
        ['nine', '9'],
    ]);

    const filteredLeftLines = lines.map((line) =>
        [...line].reduce((acc, cur) => {
            let next = acc + cur;
            let replaced = false;
            [...numMap.keys()].forEach((key) => {
                if (next.includes(key) && !replaced) {
                    next = next.replace(key, numMap.get(key) || '');
                    replaced = true;
                }
            });

            return next;
        }, '')
    );

    const filteredRightLines = lines.map((line) =>
        [...line].reduceRight((acc, cur) => {
            let next = cur + acc;
            let replaced = false;
            [...numMap.keys()].forEach((key) => {
                if (next.includes(key) && !replaced) {
                    next = next.replace(key, numMap.get(key) || '');
                    replaced = true;
                }
            });

            return next;
        }, '')
    );

    for (let i = 0; i < filteredLeftLines.length; i++) {
        const leftLine = filteredLeftLines[i];
        const rightLine = filteredRightLines[i];
        const left = [...leftLine].filter((c) => parseInt(c));
        const right = [...rightLine].filter((c) => parseInt(c));
        const calibration = parseInt(left[0] + right[right.length - 1]);
        sum += calibration;
    }
    console.log(sum);
};

export const Day1 = new Day(partOne, partTwo);
