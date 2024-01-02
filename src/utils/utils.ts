import { readFileSync } from 'fs';

const readFile = (filename: string): string => readFileSync(filename, 'utf-8');

export const readInput = (day: string): string =>
    readFile(`src/inputs/${day}.txt`);

export const parseInputByCharacter = (input: string): string[] => [...input];

export const parseInputByDelimiter = (
    input: string,
    delimiter: string
): string[] => input.trim().split(delimiter);

export const parseInputByLine = (input: string): string[] =>
    parseInputByDelimiter(input, '\n');
