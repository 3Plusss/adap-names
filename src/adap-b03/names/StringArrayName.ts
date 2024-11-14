import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.components = other;
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        if (this.components.length > i && i >= 0)
        {
            return this.components[i];
        }

        throw new RangeError("Invalid Index value")
    }

    setComponent(i: number, c: string) {
        if (this.components.length > i && i >= 0)
        {
            this.components[i] = c;
        }
        else
        {
            throw new RangeError("Invalid Index value");
        }
    }

    insert(i: number, c: string) {
        if (this.components.length > i && i >= 0)
        {
            this.components.splice(i, 0, c);
        }
        else
        {
            throw new RangeError("Invalid Index value");
        }
    }

    append(c: string) {
        this.components.push(c);
    }

    remove(i: number) {
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