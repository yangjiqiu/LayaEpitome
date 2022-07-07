

/**
 * 平台接口
 */
interface IPlatformBase {
    ChooseImg(func: Function);
    ReadImg(path: string, func: Function);
    SaveScreenToPhoto(func: Function);
    OnSaveScreenToPhoto(witdh: number, height: number, offsetX: number, offsetY: number, func: Function);
}

/**
 * 平台基类
 */
class PlatformBase implements IPlatformBase 
{

    public ChooseImg(func: Function)  {

    }

    public ReadImg(path: string, func: Function)  {

    }

    public SaveScreenToPhoto(func: Function)  {

    }

    public UIShare(shareType: number,succfunc:Function,losefunc:Function) {

    }

    public OnSaveScreenToPhoto(witdh: number, height: number, offsetX: number, offsetY: number, func: Function)  {

    }
}