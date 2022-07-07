
/**
 * 超文本传输协议
 */
export class HttpUtil{
 
    private static http:Laya.HttpRequest = new Laya.HttpRequest;

    static callback :any;
    static caller1 :any;


    constructor() {
        //this.http = new Laya.HttpRequest;
    }
 
    /**
     * 处理get请求
     * @param url 请求地址
     * @param caller 呼叫者
     * @param callback 回调
     * @param headers 请求的头部信息
     */
    public static get(url:string,caller:any,callback:any,headers?:any[],responseType?:string)
    {
        HttpUtil.caller1 = caller;
        HttpUtil.callback = callback;

        //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
		this.http.once(Laya.Event.COMPLETE, this, (e)=>{
            console.log(e);
            callback.apply(this.caller1,[{state:200,data:this.http.data}]);
        });
		this.http.once(Laya.Event.ERROR, this,(e)=>{
            callback.apply(this.caller1,[{state:500,msg:e}]);
            console.error(e);
        });
        this.http.send(url, null, 'get',"text", headers);
    }

    public static post(url:string,data:any,contentType:string,caller:any,callback:any,headers?:any[])
    {
        // if(Laya.Browser.onWeiXin)
        // {
        //     if(headers== null)headers=[];
        //     headers.push("content-type",contentType);

        //     wx.request({
        //         url: url,//服务器接口地址
        //         method:'post',//请求类型
        //         data:data,
        //         responseType:'text',
        //         header:{
        //             "Accept": "application/json, text/javascript, */*; q=0.01",
        //             "Content-Type": headers["content-type"],
        //         },
        //         success:function(res){//接口调用成功的回调函数
        //             console.log(res);
        //             callback.apply(this.caller1,[{state:200,data:res.data}]);
        //         },
        //         fail:function(){//接口调用失败的回调函数
        //             callback.apply(this.caller1,[{state:500,msg:"接口调用失败的回调函数"}]);
        //             console.error("接口调用失败的回调函数");
        //         }
        //       } as _requestObject);
        // }
        // else
        {  
            HttpUtil.caller1 = caller;
            HttpUtil.callback = callback;
            //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
            this.http.once(Laya.Event.COMPLETE, this, (e)=>{
                console.log(e);
                callback.apply(this.caller1,[{state:200,data:this.http.data}]);
            });
            this.http.once(Laya.Event.ERROR, this,(e)=>{
                callback.apply(this.caller1,[{state:500,msg:e}]);
                console.error(e);
            });
            if(contentType==null){
                this.http.send(url, data, 'post', 'text', headers);
            }else{
                if(headers== null)
                {
                    headers = [];
                    headers.push("Content-Type",contentType);
                    console.log(headers);
                    this.http.send(url, data, 'post', 'text',headers);
                    console.log(this.http);
                    console.log(this.http.data);
                }
                else {
                    headers.push("Content-Type",contentType);
                    console.log(headers);
                    this.http.send(url, data, 'post', 'text', headers);
                }
            }
        }
    }

    // public get(url:string,caller:any,callback:any,headers?:any[]):HttpUtil{
    //     this.caller = caller;
    //     this.callback = callback;
    //     //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
	// 	this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
	// 	this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
    //     this.http.send(url, null, 'get','text', headers);
    //     return this;
    // }

    //  public post(url:string,data:any,contentType:string,caller:any,callback:any,headers?:any[]):HttpUtil{
    //     this.caller = caller;
    //     this.callback = callback;
    //     //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
	// 	this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
	// 	this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
    //     if(contentType==null){
    //         this.http.send(url, data, 'post', 'text',headers);
    //     }else{
    //         if(headers== null)
    //             this.http.send(url, data, 'post', 'text',["content-type",contentType]);
    //         else {
    //             headers.push("content-type",contentType);
    //             console.log(headers);
    //             this.http.send(url, data, 'post', 'text',headers);
    //         }
    //     }
        
    //     return this;
    // }
 
 
    // private onHttpRequestError(e: any): void {
    //     this.callback.apply(this.caller,[{state:500,msg:e}]);
    // }
 
    // private onHttpRequestComplete(e: any): void {
    //     this.callback.apply(this.caller,[{state:200,data:this.http.data}]);
    // }
}
 