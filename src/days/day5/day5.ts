import { parseInputByCharacter, parseInputByLine } from '../../utils/utils';
import { Day } from '../../utils/day';

const partOne = (input: string) => {
    let seeds = input
        .split(':')[1]
        .trim()
        .split(' ')
        .map((seed) => parseInt(seed))
        .filter((seed) => !isNaN(seed));

    const maps = input.split('\n\r').slice(1);
    maps.forEach((map) => {
        const submaps = map
            .split(':')[1]
            .split('\n')
            .filter((submap) => submap.length > 1);
        const newSeeds: number[] = [];
        const filteredSeeds: number[] = [];
        submaps.forEach((submap) => {
            const [dest, src, length] = submap
                .split(' ')
                .map((item) => parseInt(item.trim()));

            seeds.forEach((key) => {
                if (
                    key <= src + length &&
                    key >= src &&
                    !filteredSeeds.includes(key)
                ) {
                    const newValue = key + (dest - src);
                    newSeeds.push(newValue);
                    filteredSeeds.push(key);
                }
            });
        });

        // all maps are done, check if any didn't convert
        seeds.forEach((key) => {
            if (!filteredSeeds.includes(key)) {
                newSeeds.push(key);
            }
        });

        // transition to next set
        while (seeds.length > 0) {
            seeds.pop();
        }
        seeds = newSeeds;
    });

    console.log(Math.min(...seeds));
};

interface Submap {
    src: number;
    dest: number;
    length: number;
}

interface Map {
    submaps: Submap[];
}

const partTwo = (input: string) => {
    const seedsInput = input
        .split(':')[1]
        .trim()
        .split(' ')
        .map((seed) => parseInt(seed))
        .filter((seed) => !isNaN(seed));

    const mapStrs = input.split('\n\r').slice(1);
    const maps: Map[] = [];
    mapStrs.forEach((map) => {
        const curMap: Map = { submaps: [] };
        const submaps = map
            .split(':')[1]
            .split('\n')
            .filter((submap) => submap.length > 1);
        submaps.forEach((submap) => {
            const [dest, src, length] = submap
                .split(' ')
                .map((item) => parseInt(item.trim()));
            const curSubmap: Submap = { dest, src, length };
            curMap.submaps.push(curSubmap);
        });
        maps.push(curMap);
    });

    let lowest = Number.POSITIVE_INFINITY;
    let counter = 0;

    for (let i = 0; i < seedsInput.length - 1; i += 2) {
        for (
            let j = seedsInput[i];
            j < seedsInput[i] + seedsInput[i + 1];
            j++
        ) {
            counter++;
            let cur = j;
            maps.forEach((map) => {
                let converted = false;
                const submaps = map.submaps;
                submaps.forEach((submap) => {
                    if (converted) {
                        return;
                    }
                    const { dest, src, length } = submap;
                    if (cur <= src + length && cur >= src) {
                        cur = cur + (dest - src);
                        converted = true;
                    }
                });
            });

            if (cur < lowest) {
                lowest = cur;
                console.log(`new lowest ${lowest}`);
            }
        }
    }
    console.log(`lowest: ${lowest - 1} counter: ${counter}`);
};

export const Day5 = new Day(partOne, partTwo);
