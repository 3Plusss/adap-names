import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import {InvalidStateException} from "../common/InvalidStateException";
import {IllegalArgumentException} from "../common/IllegalArgumentException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];
 // TODO: Finish post conditions
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
}