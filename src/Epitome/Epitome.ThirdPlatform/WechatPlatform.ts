

/**
 * 微信平台
 */
 export class WechatPlatform implements PlatformBase {
    //微信图片临时路径
    private picSavePath: string;
    //微信的接口
    private wx: any = Laya.Browser.window.wx;
    public ChooseImg(func: Function) {
        if (Laya.Browser.onMiniGame) {
            //回调
            let data: string;
            this.wx.chooseImage({
                count: 1,
                success: (res) => {
                    // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
                    let filePath = res.tempFilePaths[0];
                    const fs = this.wx.getFileSystemManager();
                    fs.saveFile({
                        tempFilePath: filePath, // 传入一个本地临时文件路径
                        success: (res) => {
                            this.picSavePath = res.savedFilePath;
                            if (func != null) {
                                func(res.savedFilePath);
                            }
                        }
                    });
                }
            });
        }
    }

    public ReadImg(path: string, func: Function) {
        if (Laya.Browser.onMiniGame) {
            //回调
            let data: string;
            const fs = this.wx.getFileSystemManager();
            fs.readFile({
                filePath: path,
                encoding: 'base64',
                success: (res) => {
                    if (func != null) {
                        func("data:image/jpeg;base64," + res.data);
                    }
                }
            });
        }
    }


    //获得图片
    public getImageInfo(basePath: string, func: Function) {
        if (Laya.Browser.onMiniGame) {
            this.wx.getImageInfo({
                src: basePath,
                success: (res) => {
                    this.SaveImg(res.path, func);
                }
            });
        }
    };

    //base64读入缓存并保存到相册
    public OnSaveScreenToPhoto(witdh: number, height: number, offsetX: number, offsetY: number, func: Function) {
        if (!Laya.Browser.onMiniGame) {
            if (func != null) {
                func();
            }
            return;
        }
        let fileManager = this.wx.getFileSystemManager();
        let timestamp = new Date().getTime();
        //HTMLCanvas 是 Html Canvas 的代理类，封装了 Canvas 的属性和方法。。请不要直接使用 new HTMLCanvas！
        //此处将canvas指定区域进行截屏
        let htmlC = Laya.stage.drawToCanvas(witdh, height, -offsetX, -offsetY);
        // let canvas = htmlC.getCanvas();
        // let data = canvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream"); // 获取生成的图片的url  
        let data = htmlC.toBase64("image/png",0.9);//.replace("image/png", "image/octet-stream"); // 获取生成的图片的url  


        let filePath = `${this.wx.env.USER_DATA_PATH}/qrcode_${timestamp}.png`;
        fileManager.writeFile({
            filePath: filePath,
            data: data.substring(data.indexOf(',') + 1),
            encoding: 'base64',
            success: res => {
                this.SaveImg(filePath, func);
            },
            fail: res => {
                this.wx.showToast({
                    title: '保存图片失败！',
                })
            }
        })
    }

    //base64读入缓存并保存到相册
    public SaveScreenToPhoto(func: Function) {
        this.OnSaveScreenToPhoto(Laya.stage.width, Laya.stage.height, 0, 0, func);
    }

    //保存到相册
    public SaveImg(path: string, func: Function) {
        if (!Laya.Browser.onMiniGame) {
            if (func != null) {
                func();
            }
            return;
        }
        this.wx.saveImageToPhotosAlbum({
            filePath: path,
            success: res => {
                if (func != null) {
                    func();
                }
                this.wx.showToast({
                    title: '保存图片成功！',
                })
            },
            fail: res => {
                if (func != null) {
                    func();
                }
                this.wx.showToast({
                    title: '保存图片失败！',
                })
            }
        })
    }

    GetShareStr():string
    {
        let str:string = "我已长命百岁，你能坚持多久";
         //var list: string[] = ClientTools.GetStringList( ConstDataManager.Instance.GetValueEx("fenxiangstr","我已长命百岁，你能坚持多久"),";");
        //  var list: string[] = new string[];
        //  if (list != null)
        //  {
        //      if (list.length == 1)
        //         str = list[0];
        //      else
        //      {
        //          let randomNum: number = Math.floor(Math.random() * list.length);
        //          str =  list[randomNum];
        //      }
        //  }
         return str;
    }
    //2是被动转发,1是主动转发
    public UIShare(shareType: number,succfunc:Function,losefunc:Function) {
        if (succfunc != null)
            succfunc();

        console.log(Laya.Browser.onMiniGame);
        //if (Laya.Browser.onMiniGame) {
            let str:string = this.GetShareStr();
            console.log(str);
            if (shareType == 1) {
                console.log("调用分享API");
                this.wx.shareAppMessage({
                    title:str,
                    imageUrl: 'res/atlas/UI.jpg',
                    success: () => {
                        if (succfunc != null)
                            succfunc();
                        this.wx.showToast({
                            title: '分享成功',
                        })
                    },
                    fail: () => {
                        if (losefunc != null)
                            losefunc();
                        this.wx.showToast({
                            title: '分享失败',
                        })
                    }
                })
            }

            if (shareType == 2) {
                this.wx.showShareMenu({
                    withShareTicket: true
                })
                this.wx.onShareAppMessage(function () {
                    return {
                        title: str,
                        imageUrl: 'res/img/share.jpg',
                    }
                })
            }
       // }
    }
}