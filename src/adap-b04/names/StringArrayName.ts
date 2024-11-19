import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import {InvalidStateException} from "../common/InvalidStateException";
import {IllegalArgumentException} from "../common/IllegalArgumentException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.components = other;
        this.assertClassInvariants();
    }

    protected assertClassInvariants(): void {
        super.assertClassInvariants();
        this.assertHasValidComponents();
    }

    protected assertInBounds(i : number){
        if (this.components.length <= i || i < 0)
        {
            throw new IllegalArgumentException("Invalid Index value! Index is out of bounds.");
        }
    }

    protected assertHasValidComponents(): void {
        if (false)
        {
            //TODO: In which ways can a component be invalid?
        }
    }

    public clone(): Name {
        return {... this};
        // TODO: post condition: test if clone is shallow
    }

    public asString(delimiter: string = this.delimiter): string {
        this.assertHasValidDelimiter();
        this.assertHasComponents();

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

        this.assertClassInvariants();
        return nameAsString;
    }

    public toString(): string {
        this.assertHasComponents();

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
        this.assertHasComponents();

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

        if (this.getDelimiterCharacter() != other.getDelimiterCharacter()){
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

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.assertInBounds(i);

        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        this.assertClassInvariants();
        this.assertInBounds(i);
        this.components[i] = c;
        this.assertClassInvariants();
    }

    public insert(i: number, c: string) {
        this.assertClassInvariants();
        this.assertInBounds(i);
        this.components.splice(i, 0, c);
        this.assertClassInvariants();
    }

    public append(c: string) {
        this.assertClassInvariants();
        this.components.push(c);
        this.assertClassInvariants();
    }

    public remove(i: number) {
        this.assertClassInvariants();
        this.assertInBounds(i);
        this.components.splice(i, 1);
        this.assertClassInvariants();
    }

    public concat(other: Name): void {
        this.assertClassInvariants();

        //let backupName = this;

        let counter : number = 0;
        while (counter < other.getNoComponents())
        {
            this.append(other.getComponent(counter));
            counter++;
        }

        this.assertClassInvariants();
    }
}