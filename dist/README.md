# typer-text

## <img src="https://github.com/zhanjinfeng/typer-text/blob/master/logo.png" width="450px" title="Typed.js" />

### [Live Demo](https://zhanjinfeng.github.io/typer-text/)

#### Install

```
npm install typer-text --save

# iife
<script src="index.browser.js"></script>
```

#### Usage
```javascript
// esm 方式
import TyperText from 'typer-text'

// script标签引入方式
const TyperText = window['typer-text']


// 初始化
const Typer = new TyperText({
    el: '#target',
    spee: 300,
    text: '文本',
    loop: true,
    startIndex: 1,
    fontSize: '24px',
    color: 'tomato'
})

// 开始渲染
Typer.render();
```