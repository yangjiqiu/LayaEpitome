

/**
 * 网页平台
 */
 export class WebPlatform implements PlatformBase 
{
    private _curstomImg: string = "";

    public ChooseImg(func: Function) {
        //回调
        if (func != null) {
            func("trail_a.png");
        }
    }

    public ReadImg(path: string, func: Function) {
        Laya.loader.load(path, Laya.Handler.create(this, () => {
            //回调
            if (func != null) {
                func(path);
            }
        }));
    }

    public SaveScreenToPhoto(func: Function)  {
        if(func != null)
        {
            func();
        }
    }

    public UIShare(shareType : number,succfunc:Function,losefunc:Function){
          
     }

     public OnSaveScreenToPhoto(witdh : number , height : number , offsetX : number , offsetY : number ,func: Function)
     {
         if(func != null)
         {
             func();
         }
     }
}