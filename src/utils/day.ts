export class Day {
    private readonly _partOne: (input: string) => void;
    private readonly _partTwo: (input: string) => void;

    constructor(
        partOne: (input: string) => void,
        partTwo: (input: string) => void
    ) {
        this._partOne = partOne;
        this._partTwo = partTwo;
    }

    get partOne(): (input: string) => void {
        return this._partOne;
    }

    get partTwo(): (input: string) => void {
        return this._partTwo;
    }

    run(part: part, input: string): void {
        switch (part) {
            case 1:
                this.partOne(input);
                break;
            case 2:
                this.partTwo(input);
                break;
        }
    }
}

export type part = 1 | 2;
