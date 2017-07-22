import { View } from "tns-core-modules/ui/core/view";
export declare type NgView = (View & ViewExtensions);
export declare type NgElement = NgView | CommentNode;
export interface ViewExtensions {
    nodeType: number;
    nodeName: string;
    templateParent: NgView;
    ngCssClasses: Map<string, boolean>;
    meta: ViewClassMeta;
}
export interface ViewClass {
    new (): View;
}
export declare class CommentNode {
    meta: {
        skipAddToDom: true;
    };
    templateParent: NgView;
}
export interface ViewClassMeta {
    skipAddToDom?: boolean;
    insertChild?: (parent: NgView, child: NgView, atIndex: number) => void;
    removeChild?: (parent: NgView, child: NgView) => void;
}
export declare function isDetachedElement(element: any): boolean;
export declare type ViewResolver = () => ViewClass;
export declare function registerElement(elementName: string, resolver: ViewResolver, meta?: ViewClassMeta): void;
export declare function getViewClass(elementName: string): ViewClass;
export declare function getViewMeta(nodeName: string): ViewClassMeta;
export declare function isKnownView(elementName: string): boolean;
