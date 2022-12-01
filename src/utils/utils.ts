import { readFileSync } from 'fs';

const readFile = (filename: string): string => {
    return readFileSync(filename, 'utf-8');
};

export const readInput = (day: string): string => {
    return readFile(`src/inputs/${day}.txt`);
};

export const parseInputByCharacter = (input: string): string[] => {
    return [...input];
};

export const parseInputByLine = (input: string): string[] => {
    return parseInputByDelimiter(input, '\n');
};

export const parseInputByDelimiter = (
    input: string,
    delimiter: string
): string[] => {
    return input.trim().split(delimiter);
};
