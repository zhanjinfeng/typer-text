class TextAutoInput {
    text = '';
    loop = false;
    speed = 200;
    cursorColor = '#333';
    startIndex = 0;

    words = [];

    el = null;

    style;


    constructor(options) {
        this.text = options.text;
        this.speed = options.speed;
        this.loop = options.loop;
        
        this.el = document.querySelector(options.el)

        this.className = 'auto-input-text-' + Date.now()
        this.el.className += this.className

        this.initWords();
    }

    // 分词
    initWords() {
        this.words = this.text.split('');
    }

    render() {
        let index = 1;

        const timer = setInterval(() => {
            this.addStyle();

            let str = this.words.slice(this.startIndex, index + this.startIndex).join('');
            
            this.el.innerHTML = str

            index++;

            if(index > this.words.length) {
                clearInterval(timer);

                if (this.loop) {
                    this.render();
                } else {
                    this.finish()
                }
            }
        }, this.speed);
    }

    addStyle() {
        if(this.style) {
            return;
        }

        const style = document.createElement('style')

        document.head.appendChild(style)

        const sheet = style.sheet;

        sheet.insertRule(`.${this.className} {position: relative;}`, 0)
        sheet.insertRule(`@keyframes shadow { from { opacity: 1; } to { opacity: 0; }}`, 1)
        sheet.insertRule(`.${this.className}::after {content: "";position: absolute;bottom: 8px;width: 20px;height: 3px;background: ${this.cursorColor};margin-left: 3px;animation: shadow .9s infinite;}`, 2);

        this.style = style;
    }

    finish() {
        document.head.removeChild(this.style)
    }
}

window.TextAutoInput = TextAutoInput;

export default TextAutoInput