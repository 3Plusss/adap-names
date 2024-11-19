import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import {InvalidStateException} from "../common/InvalidStateException";
import {IllegalArgumentException} from "../common/IllegalArgumentException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);

        this.name = other;
        this.noComponents = this.name.split(this.getDelimiterCharacter()).length;
        this.assertClassInvariants();
    }

    protected assertClassInvariants(): void {
        super.assertClassInvariants();
        this.assertHasValidLength();
    }

    protected assertHasValidLength(): void {
        if (this.noComponents < 0)
        {
            throw new InvalidStateException("Invalid number of components! " +
                "Number of components can't be lower than zero.");
        }

        if (this.noComponents != this.name.split(this.getDelimiterCharacter()).length){
            throw new InvalidStateException("Invalid number of components! " +
                "Number of components has to be equal to the number of components in the name itself.");
        }
    }

    protected assertHasValidName(): void {
        if (false)
        {
            //TODO: In which ways can a name be invalid?
        }
    }

    protected assertInBounds(i : number){
        if (this.getNoComponents() <= i || i < 0)
        {
            throw new IllegalArgumentException("Invalid Index value! Index is out of bounds.");
        }
    }

    public clone(): Name {
        return {... this};
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
        return this.delimiter;    }

    public getNoComponents(): number {
        return this.noComponents;    }

    public getComponent(i: number): string {
        this.assertInBounds(i);
        return this.name.split(this.delimiter)[i];
    }

    public setComponent(i: number, c: string) {
        this.assertClassInvariants();
        this.assertInBounds(i);
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
        this.assertClassInvariants();
    }

    public insert(i: number, c: string) {
        this.assertClassInvariants();
        this.assertInBounds(i);
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
        this.assertClassInvariants();
    }

    public append(c: string) {
        this.assertClassInvariants();
        this.name += this.delimiter + c;
        this.noComponents += 1;
        this.assertClassInvariants();
    }

    public remove(i: number) {
        this.assertClassInvariants();
        this.assertInBounds(i);
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
        this.assertClassInvariants();
    }

    public concat(other: Name): void {
        this.assertClassInvariants();

        let counter : number = 0;
        while (counter < other.getNoComponents())
        {
            this.append(other.getComponent(counter));
            counter++;
        }

        this.assertClassInvariants();
    }

}