import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);

        this.name = other;
        this.length = other.length;
    }

    getNoComponents(): number {
        return this.name.split(this.delimiter).length;
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
        }
        else
        {
            throw new RangeError("Invalid Index value");
        }
    }
    append(c: string) {
        this.name += this.delimiter + c;
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
        }
        else
        {
            throw new RangeError("Invalid Index value");
        }
    }
}