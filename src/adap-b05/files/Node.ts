import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";

//import { AssertionDispatcher, ExceptionType  } from "../common/AssertionDispatcher";
import {ServiceFailureException} from "../common/ServiceFailureException";
import {RootNode} from "./RootNode";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
        //this.assertClassInvariants();
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        //this.assertClassInvariants();
        this.doSetBaseName(bn);
        //this.assertClassInvariants();
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
        //this.assertClassInvariants();
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    public isRootNode(): boolean{
        return false;
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        let matchingNodes : Set<Node> = new Set<Node>();

        if (this.getBaseName() == bn)
        {
            matchingNodes.add(this);
        }

        if (this instanceof Directory && this.getChildNodes().size > 0)
        {
            for (let child of this.getChildNodes())
            {
                let childMatches = child.findNodes(bn);
                for (let node of childMatches)
                {
                    matchingNodes.add(node);
                }
            }
        }

        this.MethodFailedException();
        //this.assertClassInvariants();
        return matchingNodes;
    }
/*
    protected assertClassInvariants(): void {
        const bn: string = this.doGetBaseName();
        this.assertIsValidBaseName(bn, ExceptionType.CLASS_INVARIANT);
    }

    protected assertIsValidBaseName(bn: string, et: ExceptionType): void {
        const condition: boolean = (bn != "");
        AssertionDispatcher.dispatch(et, condition, "invalid base name");
    }
*/
    protected MethodFailedException(){
        const condition: boolean = (this.doGetBaseName() != "" && !this.isRootNode()) ||
                                    (this.doGetBaseName() == "" && this.isRootNode());
        ServiceFailureException.assert(condition,
                                                "service failed",
                                                new InvalidStateException(  "Node that isn't root node has empty " +
                                                                            "string as base name."))
    }
}