import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (delimiter != undefined)
        {
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        if (this.getNoComponents() <= 0)
        {
            throw new Error("Name has no components!");
        }

        if (delimiter.length < 1)
        {
            throw new Error("Exceeded expected delimiter length!");
        }

        let nameAsString : string = "";
        let counter : number = 0;
        while (counter < this.getNoComponents())
        {
            nameAsString += this.getComponent(counter).replaceAll(ESCAPE_CHARACTER, "");

            if (counter + 1 != this.getNoComponents())
            {
                nameAsString += delimiter;
            }
            counter++;
        }

        return nameAsString;
    }

    public toString(): string {
        if (this.getNoComponents() <= 0)
        {
            throw new Error("Name has no components!");
        }

        let nameAsString : string = "";
        let counter : number = 0;
        while (counter < this.getNoComponents())
        {
            nameAsString += this.getComponent(counter);

            if (counter + 1 != this.getNoComponents())
            {
                nameAsString += this.getDelimiterCharacter();
            }
            counter++;
        }

        return nameAsString;
    }

    public asDataString(): string {
        if (this.getNoComponents() <= 0)
        {
            throw new Error("Name has no components!");
        }

        let nameAsString : string = "";
        let counter : number = 0;
        while (counter < this.getNoComponents())
        {
            nameAsString += this.getComponent(counter)
                                .replaceAll(DEFAULT_DELIMITER, ESCAPE_CHARACTER+DEFAULT_DELIMITER)
                                .replaceAll(ESCAPE_CHARACTER+this.delimiter, this.delimiter);

            if (counter + 1 != this.getNoComponents())
            {
                nameAsString += DEFAULT_DELIMITER;
            }
            counter++;
        }

        return nameAsString;
    }

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() != other.getNoComponents())
        {
            return false;
        }

        let counter : number = 0;
        while (counter < this.getNoComponents())
        {
            if (this.getComponent(counter) != other.getComponent(counter))
            {
                return false;
            }

            counter++;
        }

        return true;
    }

    public getHashCode(): number {
        let hash = 0;
        const stringName = this.asDataString();

        for (let i = 0; i < stringName.length; i++) {
            const char = stringName.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32-bit integer
        }

        return hash;
    }

    public clone(): Name {
        return { ... this};
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        let numberOfComponents = other.getNoComponents();
        let counter = 0;

        if (numberOfComponents > 0)
        {
            while(counter < numberOfComponents)
            {
                this.append(other.getComponent(counter));
                counter++;
            }
        }
    }

}