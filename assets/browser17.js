/* SimpleScrollbar 
https://github.com/buzinas/simple-scrollbar
*/
!function(t,e){"object"==typeof exports?module.exports=e(window,document):t.SimpleScrollbar=e(window,document)}(this,function(t,e){function s(t){Object.prototype.hasOwnProperty.call(t,"data-simple-scrollbar")||Object.defineProperty(t,"data-simple-scrollbar",{value:new o(t)})}function i(t,s){function i(t){var e=t.pageY-a;a=t.pageY,n(function(){s.el.scrollTop+=e/s.scrollRatio})}function r(){t.classList.remove("ss-grabbed"),e.body.classList.remove("ss-grabbed"),e.removeEventListener("mousemove",i),e.removeEventListener("mouseup",r)}var a;t.addEventListener("mousedown",function(s){return a=s.pageY,t.classList.add("ss-grabbed"),e.body.classList.add("ss-grabbed"),e.addEventListener("mousemove",i),e.addEventListener("mouseup",r),!1})}function r(t){for(this.target=t,this.direction=window.getComputedStyle(this.target).direction,this.bar='<div class="ss-scroll">',this.wrapper=e.createElement("div"),this.wrapper.setAttribute("class","ss-wrapper"),this.el=e.createElement("div"),this.el.setAttribute("class","ss-content"),"rtl"===this.direction&&this.el.classList.add("rtl"),this.wrapper.appendChild(this.el);this.target.firstChild;)this.el.appendChild(this.target.firstChild);this.target.appendChild(this.wrapper),this.target.insertAdjacentHTML("beforeend",this.bar),this.bar=this.target.lastChild,i(this.bar,this),this.moveBar(),this.el.addEventListener("scroll",this.moveBar.bind(this)),this.el.addEventListener("mouseenter",this.moveBar.bind(this)),this.target.classList.add("ss-container");var s=window.getComputedStyle(t);"0px"===s.height&&"0px"!==s["max-height"]&&(t.style.height=s["max-height"])}function a(){for(var t=e.querySelectorAll("*[ss-container]"),i=0;i<t.length;i++)s(t[i])}var n=t.requestAnimationFrame||t.setImmediate||function(t){return setTimeout(t,0)};r.prototype={moveBar:function(t){var e=this.el.scrollHeight,s=this.el.clientHeight,i=this;this.scrollRatio=s/e;var r="rtl"===i.direction,a=r?i.target.clientWidth-i.bar.clientWidth+18:-1*(i.target.clientWidth-i.bar.clientWidth);n(function(){i.scrollRatio>=1?i.bar.classList.add("ss-hidden"):(i.bar.classList.remove("ss-hidden"),i.bar.style.cssText="height:"+Math.max(100*i.scrollRatio,10)+"%; top:"+i.el.scrollTop/e*100+"%;right:"+a+"px;")})}},e.addEventListener("DOMContentLoaded",a),r.initEl=s,r.initAll=a;var o=r;return o});

/* Browser Api */

class BrowserApi {
    constructor() {
        this.cssElement = null
        this.jsElement = null
        this.serviceJssElement = null

        this.ready = false

        this.extraInformation = null
        this.html = null
        this.cssUrl = null
        this.serviceJssUrls = null
        this.jsUrl = null
        this.userIsAuthenticated = null
        this.fromDialog = null
    }

    setupElements({ cssElement, jsElement, serviceJssElement }) {
        if (!cssElement || !jsElement || !serviceJssElement) {
            return
        }

        this.cssElement = cssElement
        this.jsElement = jsElement
        this.serviceJssElement = serviceJssElement

        this.ready = true

        this.setup({
            extraInformation: this.extraInformation,
            html: this.html,
            cssUrl: this.cssUrl,
            serviceJssUrls: this.serviceJssElement,
            jsUrl: this.jsUrl,
            userIsAuthenticated: this.userIsAuthenticated,
            fromDialog: this.fromDialog
        })
    }

    setup({ extraInformation, html, cssUrl, serviceJssUrls, jsUrl, userIsAuthenticated, fromDialog, isRegPage }) {
        this.extraInformation = extraInformation
        this.html = html
        this.cssUrl = cssUrl
        this.serviceJssUrls = serviceJssUrls
        this.jsUrl = jsUrl
        this.userIsAuthenticated = userIsAuthenticated
        this.fromDialog = fromDialog

        if (!this.ready || !this.extraInformation) {
            return
        }

        window.extraInformation = this.extraInformation
        window.html = this.html

        if (this.cssElement && this.cssUrl) {
            this.cssElement.setAttribute('href', this.cssUrl)
        }
        if (this.serviceJssElement && this.serviceJssUrls && this.serviceJssUrls.length) {
            let to_load = this.serviceJssUrls.length

            this.serviceJssUrls.forEach(url => {
                let element = document.createElement('script')
                element.setAttribute('src', url)

                element.onload = () => {
                    to_load--

                    if (!to_load) {
                        this.__addJs()
                    }
                }
                
                this.serviceJssElement.appendChild(element)
            })
        } else {
            this.__addJs()
        }

        if (!fromDialog) {
            if (!userIsAuthenticated || isRegPage) {
                document.body.classList.add('reg')
            }
        } else {
            document.body.classList.add('dialog-window')
        }
    }

    setHeight(height) {
        /*document.body.style.height = `${height}px`
        document.body.setAttribute('ss-container', true)
        document.body.setAttribute('ss-container--light', true)

        setTimeout(() => {
            SimpleScrollbar.initAll()

            window.dispatchEvent(new Event('resize'))
        }, 100)*/
    }

    __addJs() {
        if (this.jsElement && this.jsUrl) {
            this.jsElement.setAttribute('src', this.jsUrl)
        }
    }

    serviceJsIn(observerName, content) {
        emitReceivedFromSocket(observerName, content)
    }

    emitParseCompleted(parseInitType) {
        emitParseCompleted(parseInitType)
    }

    getPostParams() {
        return getPostParams()
    }

    emitBrowserFolded() {
        emitBrowserFolded()
    }

    emitBrowserUnfolded(foldDuration, foldType) {
        if (typeof emitBrowserUnfolded != 'function') {
            return
        }
        
        emitBrowserUnfolded(foldDuration, foldType)
    }

    getRegParams() {
        let inputs
        let pCount = 0
        let returnStr = ''

        inputs = document.getElementsByTagName('input')
        for (let i = 0; i < inputs.length; i++) {
            if (
                inputs[i].name == 'reg_id' ||
                inputs[i].name == 'reg_nick' ||
                inputs[i].name == 'reg_pass'
            ) {
                ++pCount
                returnStr += inputs[i].name + '=' + inputs[i].value + ' |'
            }
            if (pCount == 3) {
                return returnStr
            }
        }

        return ''
    }

    pasteSmileAtPos(inputId, caretPos, smileAbbr) {
        __pasteSmileAtPos(inputId, caretPos, smileAbbr)
    }

    getWindowScroll() {
        return getWindowScroll()
    }

    setWindowScroll(scroll) {
        setWindowScroll(scroll)
    }

    setInputValue(name, value) {
        setInputValue(name, value)
    }

    stopPageAutorefresh() {
        stopPageAutorefresh()
    }

    startPageAutorefresh() {
        startPageAutorefresh()
    }

    querySelector(selector) {
        return document.querySelector(selector)
    }

    querySelectorAll(selector) {
        return document.querySelectorAll(selector)
    }

    getElementById(id) {
        return document.getElementById(id)
    }
}

const browserApi = new BrowserApi()

function getBrowserApi() {
    return browserApi
}

/* Native Api */

let nativeApi = null

function setNativeApi(api) {
    nativeApi = api

    document.addEventListener('click', (e) => {
        nativeApi.documentClick(e)
    })
}

/* DOM READY */

document.addEventListener("DOMContentLoaded", () => {
    browserApi.setupElements({
        cssElement: document.getElementById('css'),
        jsElement: document.getElementById('js'),
        serviceJssElement: document.getElementById('service_jss')
    })
})