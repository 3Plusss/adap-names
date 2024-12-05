import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import {InvalidStateException} from "../../adap-b04/common/InvalidStateException";
import {IllegalArgumentException} from "../../adap-b04/common/IllegalArgumentException";
import {MethodFailedException} from "../../adap-b04/common/MethodFailedException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (delimiter != undefined)
        {
            this.delimiter = delimiter;
        }
        this.assertClassInvariants();
    }

    protected assertClassInvariants(): void {
        this.assertHasValidDelimiter();
        this.assertHasComponents();
    }

    protected assertHasValidDelimiter(): void {
        if (this.delimiter.length != 1)
        {
            throw new InvalidStateException("Invalid delimiter length! Delimiter must be a single character!");
        }
    }

    protected assertHasComponents(){
        if (this.getNoComponents() <= 0)
        {
            throw new InvalidStateException("Name has no components!");
        }
    }

    // Preconditions
    protected assertIsNotNullOrUndefined(o: Object | null):void {
        if ((o == undefined) || (o == null))
        {
            throw new IllegalArgumentException("Object is null or undefined!");
        }
    }

    protected assertInBounds(i : number){
        if (this.getNoComponents() <= i || i < 0)
        {
            throw new IllegalArgumentException("Invalid Index value! Index is out of bounds.");
        }
    }

    // Postcondition
    protected assertValidMethodExecution(initialState: object, condition: boolean, message: string){
        if (!condition)
        {
            Object.assign(this, initialState);
            throw new MethodFailedException(message);
        }
    }

    abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        this.assertHasValidDelimiter();
        this.assertIsNotNullOrUndefined(delimiter);
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
        return this.asDataString();
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
        this.assertIsNotNullOrUndefined(other);

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

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): Name;

    abstract insert(i: number, c: string): Name;
    abstract append(c: string): Name;
    abstract remove(i: number): Name;

    public concat(other: Name): Name {
        let initialState = this.clone();
        let tempName = this.clone();
        for (let i = 0; i < other.getNoComponents(); i++)
        {
            tempName = tempName.append(other.getComponent(i));
        }

        let condition : boolean = (initialState.getNoComponents() + other.getNoComponents()) == tempName.getNoComponents();
        this.assertValidMethodExecution(initialState, condition, "remove method failed!");
        return tempName;
    }

}