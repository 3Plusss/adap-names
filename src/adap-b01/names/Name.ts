export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {

        if (delimiter != undefined)
        {
            this.delimiter = delimiter;
        }
        this.components = other;
    }

    /** @methodtype conversion-method */
    /** Returns human-readable representation of Name instance */
    public asNameString(delimiter: string = this.delimiter): string {

        let nameAsString : string = "";
        let counter : number = 1;
        for (let nameComponent of this.components)
        {
            if (nameComponent.includes(delimiter))
            {
                nameComponent = nameComponent.replace(delimiter, this.ESCAPE_CHARACTER+delimiter);
            }

            nameAsString += nameComponent;
            if (counter < this.components.length)
            {
                nameAsString += delimiter;
            }
            counter++;
        }

        return nameAsString;
    }

    /** @methodtype get-method */
    public getComponent(i: number): string {

        if (this.components.length > i && i >= 0)
        {
            return this.components[i];
        }

        throw new RangeError("Invalid Index value");
    }

    /** @methodtype set-method */
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

    /** Returns number of components in Name instance */
    /** @methodtype get-method */
    public getNoComponents(): number {
        return this.components.length;
    }

    /** @methodtype command-method */
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

    /** @methodtype command-method */
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

}