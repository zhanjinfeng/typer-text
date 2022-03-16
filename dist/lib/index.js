var TyperText=function(){function t(t){this.text="",this.loop=!1,this.speed=0,this.color="",this.fontSize="",this.startIndex=0,this.words=[],this.className="",this.text=t.text,this.speed=t.speed||200,this.loop=t.loop||!1,this.color=t.color||"#333",this.fontSize=t.fontSize||"16px",this.startIndex=t.startIndex||0,this.el=document.querySelector(t.el),this.el?this.startIndex<0?this.handleError("startIndex ".concat(t.startIndex," not allow smaller than 0")):this.startIndex>this.text.length?this.handleError("startIndex ".concat(t.startIndex," not allow larger than text length ").concat(this.text.length)):(this.className="auto-input-text-"+Math.random().toString(36).slice(-8),this.el.className+=this.className,this.el.setAttribute("style","color: ".concat(this.color,";font-size: ").concat(this.fontSize)),this.initWords()):this.handleError("Dom ".concat(t.el," is null"))}return t.prototype.initWords=function(){this.words=this.text.split("");var t=this.words.slice(this.startIndex,this.startIndex).join("");this.el.innerHTML="<span>".concat(this.words.slice(0,this.startIndex).join("")).concat(t,"</span>")},t.prototype.render=function(){var e,s,n=this;this.el&&(e=0,s=setInterval(function(){var t=n.words.slice(n.startIndex,e+n.startIndex).join("");n.el.innerHTML="<span>".concat(n.words.slice(0,n.startIndex).join("")).concat(t,"</span>"),(1<++e||0<n.startIndex)&&n.addStyle(),e>n.words.length-n.startIndex&&(clearInterval(s),n.loop?n.render():n.finish())},this.speed))},t.prototype.addStyle=function(){var t,e;this.style||(t=document.createElement("style"),document.head.appendChild(t),(e=t.sheet)&&(e.insertRule(".".concat(this.className," span {position: relative;}"),0),e.insertRule("@keyframes shadow { from { opacity: 1; } to { opacity: 0; }}",1),e.insertRule(".".concat(this.className,' span::after {content: "";position: absolute;bottom: ').concat(this.calSize(this.fontSize,5),";width: ").concat(this.calSize(this.fontSize),";height: 2px;background: ").concat(this.color,";margin-left: 3px;animation: shadow .9s infinite;}"),2)),this.style=t)},t.prototype.finish=function(){document.head.removeChild(this.style)},t.prototype.calSize=function(t,e){return void 0===e&&(e=1.5),parseInt(t.match(/[0-9]*/g)[0])/e+(t.match(/[a-z]*/g).find(function(t){return t})||"px")},t.prototype.handleError=function(t){console.error("[auto-typer] error:",t)},t}();export{TyperText as default};
