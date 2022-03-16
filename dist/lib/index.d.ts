export declare type Options = {
    el: string;
    text: string;
    speed?: number;
    loop?: boolean;
    startIndex?: number;
    fontSize?: string;
    color?: string;
};
declare class TyperText {
    text: string;
    loop: boolean;
    speed: number;
    color: string;
    fontSize: string;
    startIndex: number;
    private words;
    private el;
    private style;
    private className;
    constructor(options: Options);
    private initWords;
    render(): void;
    private addStyle;
    private finish;
    private calSize;
    private handleError;
}
export default TyperText;
