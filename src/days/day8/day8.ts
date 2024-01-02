import { parseInputByCharacter, parseInputByLine } from '../../utils/utils';
import { Day } from '../../utils/day';

interface Node {
    id: string;
    right: string;
    left: string;
}

const partOne = (input: string) => {
    const lines = parseInputByLine(input);
    const instructions = [...lines[0].trim()];
    const nodeInputs = lines.slice(2);
    const nodes = new Map<string, Node>();

    const findNode = (id: string) => {
        if (nodes.get(id)) {
            return nodes.get(id);
        }
        const newNode: Node = { id, right: null, left: null };
        nodes.set(id, newNode);

        return newNode;
    };

    nodeInputs.forEach((n) => {
        const [id, left, right] = n
            .replace(/[()]/g, '')
            .split(/[=,]/g)
            .map((str) => str.trim());

        findNode(left);
        findNode(right);
        const curNode = findNode(id);
        curNode.left = left;
        curNode.right = right;
    });

    let found = false;
    let c = 0;
    let curNode = nodes.get('AAA');
    while (!found) {
        const direction = instructions[c % instructions.length];

        switch (direction) {
            case 'R':
                curNode = findNode(curNode.right);
                break;
            case 'L':
                curNode = findNode(curNode.left);
                break;
            default:
                break;
        }

        if (curNode.id === 'ZZZ') {
            found = true;
        }
        c++;
    }

    console.log(c);
};

const partTwo = (input: string) => {
    const lines = parseInputByLine(input);
    const instructions = [...lines[0].trim()];
    const nodeInputs = lines.slice(2);
    const nodes = new Map<string, Node>();

    const findNode = (id: string) => {
        if (nodes.get(id)) {
            return nodes.get(id);
        }
        const newNode: Node = { id, right: null, left: null };
        nodes.set(id, newNode);

        return newNode;
    };

    nodeInputs.forEach((n) => {
        const [id, left, right] = n
            .replace(/[()]/g, '')
            .split(/[=,]/g)
            .map((str) => str.trim());

        findNode(left);
        findNode(right);
        const curNode = findNode(id);
        curNode.left = left;
        curNode.right = right;
    });

    let c = 0;
    let curNodes: Node[] = [...nodes.keys()]
        .filter((id) => id.includes('A'))
        .map((id) => nodes.get(id));

    const occurences: number[] = [];

    while (curNodes.length) {
        const direction = instructions[c % instructions.length];

        for (let i = 0; i < curNodes.length; i++) {
            switch (direction) {
                case 'R':
                    curNodes[i] = findNode(curNodes[i].right);
                    break;
                case 'L':
                    curNodes[i] = findNode(curNodes[i].left);
                    break;
                default:
                    break;
            }
        }

        c++;

        curNodes.forEach((node) => {
            if (node.id.includes('Z')) {
                occurences.push(c);
                curNodes = curNodes.filter((n) => n !== node);
            }
        });
    }

    const gcd = (a, b) => (a ? gcd(b % a, a) : b);

    const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

    const result = occurences.reduce(lcm);
    console.log(result);
};

const naivePartTwo = (input: string) => {
    const lines = parseInputByLine(input);
    const instructions = [...lines[0].trim()];
    const nodeInputs = lines.slice(2);
    const nodes = new Map<string, Node>();

    const findNode = (id: string) => {
        if (nodes.get(id)) {
            return nodes.get(id);
        }
        const newNode: Node = { id, right: null, left: null };
        nodes.set(id, newNode);

        return newNode;
    };

    nodeInputs.forEach((n) => {
        const [id, left, right] = n
            .replace(/[()]/g, '')
            .split(/[=,]/g)
            .map((str) => str.trim());

        findNode(left);
        findNode(right);
        const curNode = findNode(id);
        curNode.left = left;
        curNode.right = right;
    });

    let found = false;
    let c = 0;
    const curNodes: Node[] = [...nodes.keys()]
        .filter((id) => id.includes('A'))
        .map((id) => nodes.get(id));

    while (!found) {
        const direction = instructions[c % instructions.length];

        for (let i = 0; i < curNodes.length; i++) {
            switch (direction) {
                case 'R':
                    curNodes[i] = findNode(curNodes[i].right);
                    break;
                case 'L':
                    curNodes[i] = findNode(curNodes[i].left);
                    break;
                default:
                    break;
            }
        }

        let allZ = true;
        curNodes.forEach((node) => {
            if (!node.id.includes('Z')) {
                allZ = false;
            }
        });
        if (allZ) {
            found = true;
        }
        c++;
    }
    console.log(c);
};

export const Day8 = new Day(partOne, partTwo);
