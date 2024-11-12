import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        if (delimiter != undefined)
        {
            this.delimiter = delimiter;
        }

        this.name = other;
        this.length = other.length;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name.replaceAll(ESCAPE_CHARACTER, "")
                        .replaceAll(this.delimiter, delimiter);
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
            nameAsString += this
                            .getComponent(counter)
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

    public isEmpty(): boolean {
        return this.name === "";
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.name.split(this.delimiter).length;
    }

    public getComponent(x: number): string {
        if (this.getNoComponents() > x && x >= 0)
        {
            return this.name.split(this.delimiter)[x];
        }

        throw new RangeError("Invalid Index value");
    }

    public setComponent(n: number, c: string): void {
        if (this.getNoComponents() > n && n >= 0)
        {
            let stringArrayName = this.name.split(this.delimiter);
            stringArrayName[n] = c;

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

    public insert(n: number, c: string): void {
        if (this.getNoComponents() > n && n >= 0)
        {
            let stringArrayName = this.name.split(this.delimiter);
            stringArrayName.splice(n, 0, c);

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

    public append(c: string): void {
        this.name += this.delimiter + c;
    }

    public remove(n: number): void {
        if (this.getNoComponents() > n && n >= 0)
        {
            let stringArrayName = this.name.split(this.delimiter);
            stringArrayName.splice(n, 1);

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