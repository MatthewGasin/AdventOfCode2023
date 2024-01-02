import { parseInputByCharacter, parseInputByLine } from '../../utils/utils';
import { Day } from '../../utils/day';

type ball = 'red' | 'green' | 'blue';
const partOne = (input: string) => {
    const games = parseInputByLine(input);
    let sum = 0;

    const maxMap = new Map<ball, number>([
        ['red', 12],
        ['green', 13],
        ['blue', 14],
    ]);

    games.forEach((game, index) => {
        const subgames = game.split(':')[1].trim().split(';');
        let invalid = false;

        subgames.forEach((subgame) => {
            const ballMap = new Map<ball, number>();
            const colors = subgame.split(',');
            colors.forEach((numColor) => {
                const [num, color] = numColor.trim().split(' ');
                ballMap.set(color as ball, parseInt(num) as number);
            });

            [...ballMap.keys()].forEach((color) => {
                const max = maxMap.get(color);
                const cur = ballMap.get(color) || 0;
                if (cur > max) {
                    invalid = true;
                }
            });
        });
        if (!invalid) {
            sum += index + 1;
        }
    });

    console.log(sum);
};

const partTwo = (input: string) => {
    const games = parseInputByLine(input);
    let sum = 0;

    games.forEach((game, index) => {
        const subgames = game.split(':')[1].trim().split(';');

        const maxMap = new Map<ball, number>([
            ['red', 0],
            ['green', 0],
            ['blue', 0],
        ]);

        subgames.forEach((subgame) => {
            const ballMap = new Map<ball, number>();
            const colors = subgame.split(',');
            colors.forEach((numColor) => {
                const [num, color] = numColor.trim().split(' ');
                ballMap.set(color as ball, parseInt(num) as number);
            });

            [...ballMap.keys()].forEach((color) => {
                const max = maxMap.get(color);
                const cur = ballMap.get(color) || 0;
                if (cur > max) {
                    maxMap.set(color, cur);
                }
            });
        });

        sum += maxMap.get('red') * maxMap.get('blue') * maxMap.get('green');
    });

    console.log(sum);
};

export const Day2 = new Day(partOne, partTwo);
