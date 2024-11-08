import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {

    protected components: string[] = [];
    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {

        if (delimiter != undefined)
        {
            this.delimiter = delimiter;
        }
        this.components = other;
    }

    public asString(delimiter: string = this.delimiter): string {
        let nameAsString : string = "";
        let counter : number = 1;
        for (let nameComponent of this.components)
        {
            //if (nameComponent.includes(delimiter))
            //{
            //    nameComponent = nameComponent.replace(delimiter, ESCAPE_CHARACTER+delimiter);
            //}

            nameAsString += nameComponent;
            if (counter < this.components.length)
            {
                nameAsString += delimiter;
            }
            counter++;
        }

        return nameAsString;
    }

    public asDataString(): string {
        let nameAsString : string = "";
        let counter : number = 1;
        for (let nameComponent of this.components)
        {
            if (nameComponent.includes(DEFAULT_DELIMITER))
            {
                nameComponent = nameComponent.replace(DEFAULT_DELIMITER, ESCAPE_CHARACTER+DEFAULT_DELIMITER);
            }

            nameAsString += nameComponent;
            if (counter < this.components.length)
            {
                nameAsString += DEFAULT_DELIMITER;
            }
            counter++;
        }

        return nameAsString;
    }

    public isEmpty(): boolean {
        return this.components.length == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (this.components.length > i && i >= 0)
        {
            return this.components[i];
        }

        throw new RangeError("Invalid Index value");
    }

    public setComponent(i: number, c: string): void {
        if (this.components.length > i && i >= 0)
        {
            this.components[i] = c;
        }
        else
        {
            throw new RangeError("Invalid Index value");
        }
    }

    public insert(i: number, c: string): void {
        if (this.components.length > i && i >= 0)
        {
            this.components.splice(i, 0, c);
        }
        else
        {
            throw new RangeError("Invalid Index value");
        }
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if (this.components.length > i && i >= 0)
        {
            this.components.splice(i, 1);
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