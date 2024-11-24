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
        this.assertHasValidName();
    }

    protected assertHasValidLength(): void {
        if ((this.noComponents < 0) || (this.noComponents == undefined) || (this.noComponents == null))
        {
            throw new InvalidStateException("Invalid number of components! " +
                "Number of components can't be lower than zero or be undefined.");
        }

        if (this.noComponents != this.name.split(this.getDelimiterCharacter()).length){
            throw new InvalidStateException("Invalid number of components! " +
                "Number of components has to be equal to the number of components in the name itself.");
        }
    }

    protected assertHasValidName(): void {
        if ((this.name == undefined) || (this.name == null))
        {
            throw new InvalidStateException("Components are null or undefined!");
        }
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        this.assertInBounds(i);
        return this.name.split(this.delimiter)[i];
    }

    public setComponent(i: number, c: string) {
        this.assertClassInvariants();
        this.assertInBounds(i);
        let initialState = this.clone();

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
        this.assertValidMethodExecution(initialState, this.getComponent(i) == c,
                                "setComponent method failed!");
        this.assertClassInvariants();
    }

    public insert(i: number, c: string) {
        this.assertClassInvariants();
        this.assertInBounds(i);
        let initialState = this.clone();
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
        this.assertValidMethodExecution(initialState, (this.getComponent(i) == c)
                                                    && (this.getNoComponents() - 1 == initialState.getNoComponents()),
                                                        "insert method failed!");
        this.assertClassInvariants();
    }

    public append(c: string) {
        this.assertClassInvariants();
        let initialState = this.clone();
        this.name += this.delimiter + c;
        this.noComponents += 1;
        this.assertValidMethodExecution(initialState, (this.getComponent(this.getNoComponents() - 1) == c)
            && (this.getNoComponents() - 1 == initialState.getNoComponents()),
            "append method failed!");
        this.assertClassInvariants();
    }

    public remove(i: number) {
        this.assertClassInvariants();
        this.assertInBounds(i);
        let initialState = this.clone();
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
        this.assertValidMethodExecution(initialState, (this.getComponent(i) != initialState.getComponent(i))
            && (this.getNoComponents() + 1 == initialState.getNoComponents()),
            "remove method failed!");
        this.noComponents -= 1;
        this.assertClassInvariants();
    }
}