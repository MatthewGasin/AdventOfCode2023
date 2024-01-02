import { parseInputByCharacter, parseInputByLine } from '../../utils/utils';
import { Day } from '../../utils/day';

const partOne = (input: string) => {
    const cards = parseInputByLine(input);
    let pile = 0;
    cards.forEach((card) => {
        const [winning, owned] = card.split(':')[1].trim().split('|');
        const convertToNumbers = (str: string) =>
            str
                .trim()
                .split(' ')
                .map((char) => parseInt(char))
                .filter((char) => !isNaN(char));
        const winningNumbers = convertToNumbers(winning);
        let ownedNumbers = convertToNumbers(owned);
        let points = 0;
        winningNumbers.forEach((win) => {
            if (ownedNumbers.includes(win)) {
                ownedNumbers = ownedNumbers.filter((number) => number !== win);
                if (points < 1) {
                    points += 1;
                } else {
                    points *= 2;
                }
            }
        });
        pile += points;
    });
    console.log(pile);
};

const partTwo = (input: string) => {
    const cards = parseInputByLine(input);
    const scratchMap = new Map<number, number>([]);
    cards.forEach((card, index) => {
        scratchMap.set(index + 1, 1);
    });

    cards.forEach((card, index) => {
        const [winning, owned] = card.split(':')[1].trim().split('|');
        const curCard = index + 1;
        const convertToNumbers = (str: string) =>
            str
                .trim()
                .split(' ')
                .map((char) => parseInt(char))
                .filter((char) => !isNaN(char));
        const winningNumbers = convertToNumbers(winning);
        const ownedNumbers = convertToNumbers(owned);
        let points = 0;
        winningNumbers.forEach((win) => {
            if (ownedNumbers.includes(win)) {
                points++;
            }
        });

        for (let i = curCard + 1; i < points + curCard + 1; i++) {
            if (i < [...scratchMap.keys()].length) {
                scratchMap.set(i, scratchMap.get(i) + scratchMap.get(curCard));
            }
        }
    });
    const pile = [...scratchMap.values()].reduce((acc, cur) => acc + cur);
    console.log(pile);
};

export const Day4 = new Day(partOne, partTwo);
