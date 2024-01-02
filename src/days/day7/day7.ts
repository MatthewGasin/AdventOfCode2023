import { parseInputByCharacter, parseInputByLine } from '../../utils/utils';
import { Day } from '../../utils/day';

enum handType {
    high,
    onePair,
    twoPair,
    threeKind,
    fullHouse,
    fourKind,
    fiveKind,
}

interface hand {
    type: handType;
    hand: string;
    buckets: Map<number, number>;
    bid: number;
}

const convertCard = (card: string): number => {
    const cardMap = new Map<string, number>([
        ['T', 10],
        ['J', 11],
        ['Q', 12],
        ['K', 13],
        ['A', 14],
    ]);
    if ([...cardMap.keys()].includes(card)) {
        return cardMap.get(card);
    } else if (!isNaN(parseInt(card))) {
        return parseInt(card);
    }

    return 0;
};

const getBuckets = (hand: string) => {
    const buckets = new Map<number, number>();
    [...hand].forEach((char) => {
        const key = convertCard(char);
        buckets.set(key, buckets.has(key) ? buckets.get(key) + 1 : 1);
    });

    return buckets;
};
const compare = (a: hand, b: hand): number => {
    // trivial if same hand
    if (a === b) {
        return 0;
    }

    // first ordering rule
    if (a.type !== b.type) {
        return a.type > b.type ? 1 : -1;
    }

    // second ordering rule, evaluate cards
    for (let i = 0; i < a.hand.length; i++) {
        const aCard = convertCard(a.hand.charAt(i));
        const bCard = convertCard(b.hand.charAt(i));
        if (aCard !== bCard) {
            return aCard > bCard ? 1 : -1;
        }
    }

    return 0;

    /* LOL I DIDNT READ THE PROMPT AND DID ACTUAL POKER SORTING TO START
    const getMostCommon = (h: Map<number, number>) =>
        [...h.keys()].reduce((acc, cur) => {
            const maxOccurrences = h.get(acc);
            const curOccurrences = h.get(cur);
            if (maxOccurrences > curOccurrences) {
                return acc;
            } else if (maxOccurrences === curOccurrences) {
                return acc > cur ? acc : cur;
            }

            return cur;
        });

    const aBuckets = new Map<number, number>(a.buckets);
    const bBuckets = new Map<number, number>(b.buckets);

    while ([...aBuckets.keys()].length && [...bBuckets.keys()].length) {
        const aCommon = getMostCommon(aBuckets);
        const bCommon = getMostCommon(bBuckets);
        if (aCommon !== bCommon) {
            return aCommon > bCommon ? 1 : -1;
        }
        aBuckets.delete(aCommon);
        bBuckets.delete(bCommon);
    }

    return [...aBuckets.keys()].length > [...bBuckets.keys()].length ? 1 : -1;
    */
};

const evaluateHand = (hand: string): handType => {
    const buckets = getBuckets(hand);

    const counts = [...buckets.values()];

    // first handle complex rules
    if (counts.length >= 5) {
        return handType.high;
    } else if (counts.includes(2) && counts.includes(3)) {
        return handType.fullHouse;
    } else if (
        counts.reduce((acc, cur) => (cur === 2 ? acc + 1 : acc), 0) >= 2
    ) {
        return handType.twoPair;
    }

    // all remaining rules depend on length of kind
    switch (Math.max(...counts)) {
        case 2:
            return handType.onePair;
        case 3:
            return handType.threeKind;
        case 4:
            return handType.fourKind;
        case 5:
            return handType.fiveKind;
    }
};

const partOne = (input: string) => {
    const strHands = parseInputByLine(input);

    const hands: hand[] = [];
    strHands.forEach((line) => {
        const [hand, bid] = line.trim().split(' ');
        const buckets = getBuckets(hand);
        const type = evaluateHand(hand);

        const curHand: hand = {
            type,
            buckets,
            hand,
            bid: parseInt(bid.trim()) || 0,
        };

        hands.push(curHand);
    });

    const sorted = hands.sort((a, b) => compare(a, b));
    let sum = 0;
    sorted.forEach((hand, index) => {
        sum += hand.bid * (index + 1);
    });

    console.log(sum);
};

const convertCardPT2 = (card: string): number => {
    const cardMap = new Map<string, number>([
        ['T', 10],
        ['J', 1],
        ['Q', 12],
        ['K', 13],
        ['A', 14],
    ]);
    if ([...cardMap.keys()].includes(card)) {
        return cardMap.get(card);
    } else if (!isNaN(parseInt(card))) {
        return parseInt(card);
    }

    return 0;
};

const getBucketsPT2 = (hand: string) => {
    const buckets = new Map<number, number>();
    [...hand].forEach((char) => {
        const key = convertCardPT2(char);
        buckets.set(key, buckets.has(key) ? buckets.get(key) + 1 : 1);
    });

    return buckets;
};

const evaluateHandPT2 = (hand: string): handType => {
    const buckets = getBucketsPT2(hand);

    // spread jokers out
    if (hand === 'JJJJJ') {
        return handType.fiveKind;
    }
    while (buckets.get(1) > 0) {
        let mostCommon = [...buckets.keys()].filter((key) => key !== 1)[0];
        [...buckets.keys()].forEach((key) => {
            if (buckets.get(key) > buckets.get(mostCommon) && key !== 1) {
                mostCommon = key;
            }
        });

        buckets.set(mostCommon, buckets.get(mostCommon) + 1);

        buckets.set(1, buckets.get(1) - 1);
    }

    buckets.delete(1);

    const counts = [...buckets.values()];

    // first handle complex rules
    if (counts.length >= 5) {
        return handType.high;
    } else if (counts.includes(2) && counts.includes(3)) {
        return handType.fullHouse;
    } else if (
        counts.reduce((acc, cur) => (cur === 2 ? acc + 1 : acc), 0) >= 2
    ) {
        return handType.twoPair;
    }

    // all remaining rules depend on length of kind
    switch (Math.max(...counts)) {
        case 2:
            return handType.onePair;
        case 3:
            return handType.threeKind;
        case 4:
            return handType.fourKind;
        case 5:
            return handType.fiveKind;
    }
};

const comparePT2 = (a: hand, b: hand): number => {
    // trivial if same hand
    if (a === b) {
        return 0;
    }

    // first ordering rule
    if (a.type !== b.type) {
        return a.type > b.type ? 1 : -1;
    }

    // second ordering rule, evaluate cards
    for (let i = 0; i < a.hand.length; i++) {
        const aCard = convertCardPT2(a.hand.charAt(i));
        const bCard = convertCardPT2(b.hand.charAt(i));
        if (aCard !== bCard) {
            return aCard > bCard ? 1 : -1;
        }
    }

    return 0;
};

const partTwo = (input: string) => {
    const strHands = parseInputByLine(input);

    const hands: hand[] = [];
    strHands.forEach((line) => {
        const [hand, bid] = line.trim().split(' ');
        const buckets = getBucketsPT2(hand);
        const type = evaluateHandPT2(hand);

        const curHand: hand = {
            type,
            buckets,
            hand,
            bid: parseInt(bid.trim()) || 0,
        };

        hands.push(curHand);
    });

    const sorted = hands.sort((a, b) => comparePT2(a, b));
    let sum = 0;
    sorted.forEach((hand, index) => {
        sum += hand.bid * (index + 1);
    });

    console.log(sum);
};

export const Day7 = new Day(partOne, partTwo);
