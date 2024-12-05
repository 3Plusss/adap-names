import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import {InvalidStateException} from "../../adap-b04/common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.assertIsNotNullOrUndefined(source);
        this.components = source;
        this.assertClassInvariants();
    }

    protected assertClassInvariants(): void {
        super.assertClassInvariants();
        this.assertHasValidComponents();
    }

    protected assertHasValidComponents(): void {
        if ((this.components == undefined) || (this.components == null))
        {
            throw new InvalidStateException("Components are null or undefined!");
        }
    }

    public clone(): Name {
        return new StringArrayName(this.getComponentArray(), this.getDelimiterCharacter());
    }

    public getComponentArray(): string[]{
        return this.components;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.assertInBounds(i);

        return this.components[i];    }

    public setComponent(i: number, c: string): Name {
        this.assertClassInvariants();
        this.assertInBounds(i);
        let initialState = this.clone();
        this.components[i] = c;
        this.assertValidMethodExecution(initialState, this.components[i] == c, "setComponent method failed!");
        this.assertClassInvariants();
        return this.clone();
    }

    public insert(i: number, c: string): Name {
        this.assertClassInvariants();
        this.assertInBounds(i);
        let initialState = this.clone();
        this.components.splice(i, 0, c);
        this.assertValidMethodExecution(initialState, (this.components[i] == c)
            && (this.getNoComponents() - 1 == initialState.getNoComponents()),
            "insert method failed!");
        this.assertClassInvariants();
        return this.clone();
    }

    public append(c: string): Name {
        this.assertClassInvariants();
        let initialState = this.clone();
        this.components.push(c);
        this.assertValidMethodExecution(initialState, (this.components[this.components.length-1] == c)
            && (this.getNoComponents() - 1 == initialState.getNoComponents()),
            "append method failed!");
        this.assertClassInvariants();
        return this.clone();
    }

    public remove(i: number): Name {
        this.assertClassInvariants();
        this.assertInBounds(i);
        let initialState = this.clone();
        this.components.splice(i, 1);
        this.assertValidMethodExecution(initialState, (this.components[i] != initialState.getComponent(i))
            && (this.getNoComponents() + 1 == initialState.getNoComponents()),
            "remove method failed!");
        this.assertClassInvariants();
        return this.clone();
    }
}