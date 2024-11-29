import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import {InvalidStateException} from "../common/InvalidStateException";
import {IllegalArgumentException} from "../common/IllegalArgumentException";
import {MethodFailedException} from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.assertIsNotNullOrUndefined(other);
        this.components = other;
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
        let initialState = this.clone();
        this.components[i] = c;
        this.assertValidMethodExecution(initialState, this.components[i] == c, "setComponent method failed!");
        this.assertClassInvariants();
    }

    public insert(i: number, c: string) {
        this.assertClassInvariants();
        this.assertInBounds(i);
        let initialState = this.clone();
        this.components.splice(i, 0, c);
        this.assertValidMethodExecution(initialState, (this.components[i] == c)
                                                    && (this.getNoComponents() - 1 == initialState.getNoComponents()),
                                                "insert method failed!");
        this.assertClassInvariants();
    }

    public append(c: string) {
        this.assertClassInvariants();
        let initialState = this.clone();
        this.components.push(c);
        this.assertValidMethodExecution(initialState, (this.components[this.components.length-1] == c)
                                                && (this.getNoComponents() - 1 == initialState.getNoComponents()),
                                                     "append method failed!");
        this.assertClassInvariants();
    }

    public remove(i: number) {
        this.assertClassInvariants();
        this.assertInBounds(i);
        let initialState = this.clone();
        this.components.splice(i, 1);
        this.assertValidMethodExecution(initialState, (this.components[i] != initialState.getComponent(i))
                                                    && (this.getNoComponents() + 1 == initialState.getNoComponents()),
                                                "remove method failed!");
        this.assertClassInvariants();
    }
}