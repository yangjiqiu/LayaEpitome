
/**
 * 基础加载资源 自动释放资源
 */
 export default class ZAutoLoad{
    constructor(url) {
        this.count = 0;
        this.completes = [];
        this._url = url;
        Laya.loader.load(this._url, Laya.Handler.create(this, this.onLoaded))
    }
    private count:number;
    private completes:{caller:Function,callback:any}[];
    private _url:string;
    
    static _packs = {};
    static _awaitClearT = {};
    static _start = false;
    
    onLoaded(e) {
        if (!e) {}
        while (this.completes.length) {
        var t = this.completes.pop();
        var _callBack:Function = t.callback;
        var s = t.caller
        _callBack.call(s, this._url)
        }
        this.completes = null
    }
    clear() {
        if (Laya.Loader.getRes(this._url)) {
            Laya.Loader.clearRes(this._url)
        } else {
            Laya.loader.cancelLoadByUrl(this._url)
        }
    }
    static getRes(url:string, caller:any, callBack:Function, s:ZAutoLoad) {
        if (this._start == false) {
        this._start = true;
        Laya.timer.loop(2e3, this, this.clearRes)
        }
        this.delRes(s, caller);
        var r = this._packs[url];
        if (!r) {
        r = new ZAutoLoad(url);
        this._packs[url] = r
        }
        if (r.completes) {
        r.completes.push({
        caller: caller,
        callback: callBack
        })
        } else {
        callBack.call(caller, url)
        }
        r.count++;
        if (this._awaitClearT[url]) {
        delete this._awaitClearT[url]
        }
        return r
    }
    static delRes(e:ZAutoLoad, caller:any) {
        if (e) {
            e.count-=1;
        if (e.completes) {
        for (var i = 0; i < e.completes.length; i++) {
        if (e.completes[i].caller == caller) {
        e.completes.splice(i, 1);
        break
        }
        }
        }
        if (e.count <= 0) {
        this._awaitClearT[e._url] = Laya.Browser.now()
        }
        }
    }
    static clearRes() {
        for (var e in this._awaitClearT) {
        var t = this._awaitClearT[e];
        let s;
        if (Laya.Browser.onMobile || Laya.Browser.window.conch || Laya.Browser.onSafari) {
        s = 1e3;
        } else {
        s = 3e4;
        }
        if (Laya.Browser.now() - t >= s) {
        this.clearOneRes(e);
        delete this._awaitClearT[e]
        }
        }
    }
    static clearOneRes(url) {
        var t = this._packs[url];
        t.clear();
        delete this._packs[url];
    }
}