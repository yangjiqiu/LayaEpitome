import AutoLoad from "./AutoLoad";

/**
 * 自动释放资源图片类
 */
 export default class AutoImage extends Laya.Image{
    constructor() {
    super()
    }
    set skin(url:string) {
        if (this._skin == url) return;
        this._skin = url;
        if (url) {
        this.off(Laya.Event.DISPLAY, this, this.onDisplay);
        this.off(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
        this.on(Laya.Event.DISPLAY, this, this.onDisplay);
        this.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
        } else {
        this.off(Laya.Event.DISPLAY, this, this.onDisplay);
        this.off(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
        }
        this.checkSkin()
    }
    get skin() {
        return this._skin
    }
    onDisplay(e) {
        this.checkSkin()
    }
    onUnDisplay(e) {
        this.checkSkin()
    }

    private _resPack:AutoLoad = null;
    checkSkin() {
        if (this.displayedInStage && this._skin) {
            this._resPack = AutoLoad.getRes(this._skin, this, this.setSkin, this._resPack)
            } else {
            AutoLoad.delRes(this._resPack, this);
            this.source = null;
            this._resPack = null
        }
    }
    setSkin() {
        this.source = Laya.Loader.getRes(this._skin);
        this.onCompResize()
    }
}