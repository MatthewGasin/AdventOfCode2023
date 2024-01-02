import { parseInputByCharacter, parseInputByLine } from '../../utils/utils';
import { Day } from '../../utils/day';

const partOne = (input: string) => {
    console.log(parseInputByLine(input));
};

const partTwo = (input: string) => {
    console.log(parseInputByCharacter(input));
};

export const Demo = new Day(partOne, partTwo);
