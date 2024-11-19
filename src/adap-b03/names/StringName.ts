import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);

        this.name = other;
        this.noComponents = this.name.split(this.getDelimiterCharacter()).length;
    }

    getNoComponents(): number {
        return this.noComponents;
    }

    getComponent(i: number): string {
        if (this.getNoComponents() > i && i >= 0)
        {
            return this.name.split(this.delimiter)[i];
        }

        throw new RangeError("Invalid Index value");
    }

    setComponent(i: number, c: string) {
        if (this.getNoComponents() > i && i >= 0)
        {
            let stringArrayName = this.name.split(this.delimiter);
            stringArrayName[i] = c;

            this.name = "";
            let counter : number = 1;
            for (let nameComponent of stringArrayName)
            {
                this.name += nameComponent;
                if (counter < stringArrayName.length)
                {
                    this.name += this.delimiter;
                }
                counter++;
            }
        }
        else
        {
            throw new RangeError("Invalid Index value");
        }
    }

    insert(i: number, c: string) {
        if (this.getNoComponents() > i && i >= 0)
        {
            let stringArrayName = this.name.split(this.delimiter);
            stringArrayName.splice(i, 0, c);

            this.name = "";
            let counter : number = 1;
            for (let nameComponent of stringArrayName)
            {
                this.name += nameComponent;
                if (counter < stringArrayName.length)
                {
                    this.name += this.delimiter;
                }
                counter++;
            }

            this.noComponents += 1;
        }
        else
        {
            throw new RangeError("Invalid Index value");
        }
    }

    append(c: string) {
        this.name += this.delimiter + c;
        this.noComponents += 1;
    }

    remove(i: number) {
        if (this.getNoComponents() > i && i >= 0)
        {
            let stringArrayName = this.name.split(this.delimiter);
            stringArrayName.splice(i, 1);

            this.name = "";
            let counter : number = 1;
            for (let nameComponent of stringArrayName)
            {
                this.name += nameComponent;
                if (counter < stringArrayName.length)
                {
                    this.name += this.delimiter;
                }
                counter++;
            }
            this.noComponents -= 1;
        }
        else
        {
            throw new RangeError("Invalid Index value");
        }
    }

    public clone(): Name {
        throw new Error("needs implementation");
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation");
    }

    public toString(): string {
        throw new Error("needs implementation");
    }

    public asDataString(): string {
        throw new Error("needs implementation");
    }

    public isEqual(other: Name): boolean {
        throw new Error("needs implementation");
    }

    public getHashCode(): number {
        throw new Error("needs implementation");
    }

    public isEmpty(): boolean {
        throw new Error("needs implementation");
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation");
    }

    public concat(other: Name): void {
        throw new Error("needs implementation");
    }
}