export type Options = {
    el: string;
    text: string;
    speed?: number;
    loop?: boolean;
    startIndex?: number;
    fontSize?: string;
    color?: string;
};

class TyperText {
    text = '';
    loop = false;
    speed = 0;
    color = '';
    fontSize = '';
    startIndex = 0;

    private words: string[] = [];
    private el: HTMLElement;
    private style!: HTMLStyleElement;
    private className = '';

    constructor(options: Options) {
        this.text = options.text;
        this.speed = options.speed || 200;
        this.loop = options.loop || false;

        this.color = options.color || '#333';
        this.fontSize = options.fontSize || '16px';
        this.startIndex = options.startIndex || 0;

        this.el = document.querySelector(options.el) as HTMLElement;

        if (!this.el) {
            this.handleError(`Dom ${options.el} is null`);
            return;
        }

        if (this.startIndex < 0) {
            this.handleError(`startIndex ${options.startIndex} not allow smaller than 0`);
            return;
        }

        if (this.startIndex > this.text.length) {
            this.handleError(`startIndex ${options.startIndex} not allow larger than text length ${this.text.length}`);
            return;
        }

        this.className = 'auto-input-text-' + Math.random().toString(36).slice(-8);
        this.el.className += this.className;
        this.el.setAttribute('style', `color: ${this.color};font-size: ${this.fontSize}`);

        this.initWords();
    }

    // 分词
    private initWords() {
        this.words = this.text.split('');

        const str = this.words.slice(this.startIndex, this.startIndex).join('');

        this.el.innerHTML = `<span>${this.words.slice(0, this.startIndex).join('')}${str}</span>`;
    }

    render() {
        if (!this.el) {
            return;
        }

        let index = 0;

        const timer = setInterval(() => {
            const str = this.words.slice(this.startIndex, index + this.startIndex).join('');

            this.el.innerHTML = `<span>${this.words.slice(0, this.startIndex).join('')}${str}</span>`;

            index++;

            if (index > 1 || this.startIndex > 0) {
                this.addStyle();
            }

            if (index > this.words.length - this.startIndex) {
                clearInterval(timer);

                if (this.loop) {
                    this.render();
                } else {
                    this.finish();
                }
            }
        }, this.speed);
    }

    private addStyle() {
        if (this.style) {
            return;
        }

        const style = document.createElement('style');

        document.head.appendChild(style);

        const sheet = style.sheet;

        if (sheet) {
            sheet.insertRule(`.${this.className} span {position: relative;}`, 0);
            sheet.insertRule(`@keyframes shadow { from { opacity: 1; } to { opacity: 0; }}`, 1);
            sheet.insertRule(
                `.${this.className} span::after {content: "";position: absolute;bottom: ${this.calSize(
                    this.fontSize,
                    5
                )};width: ${this.calSize(this.fontSize)};height: 2px;background: ${
                    this.color
                };margin-left: 3px;animation: shadow .9s infinite;}`,
                2
            );
        }

        this.style = style;
    }

    private finish() {
        document.head.removeChild(this.style);
    }

    private calSize(value: string, scale = 1.5) {
        const size = parseInt((value.match(/[0-9]*/g) as string[])[0]) / scale,
            unit = (value.match(/[a-z]*/g) as string[]).find((item: string) => item) || 'px';

        return size + unit;
    }

    private handleError(e: string) {
        console.error('[auto-typer] error:', e);
    }
}

export default TyperText;
