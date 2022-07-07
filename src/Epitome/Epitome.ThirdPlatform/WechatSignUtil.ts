import wxConfig from "../../script/wxConfig";
import { HttpUtil } from "../Epitome.Network/HttpUtil";

/**
 * 微信参数获取工具类
 */
export class WechatSignUtil
{
    public static APP_ID = "wxa9be854685cf500d"; //在controller中初始化
    public static APP_SECRET = "36ab293ff04a3df796266c39eaf10c39";


    
    private static getAppId():string{
        return this.APP_ID;
    }

    public static getTokenTicket1(handler:Laya.Handler)
    {
        WechatSignUtil.getTokenTicket(WechatSignUtil.APP_ID,WechatSignUtil.APP_SECRET,handler);
    }

    public static getTokenTicket(appId:string,appSecret:string,handler:Laya.Handler)
    {
        var json:JSON = JSON.parse("{}");
        //json["url"] = wxConfig.url;

        let urlToken:string = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+
        appId+"&secret=" + appSecret + "&output=jsonp";

        HttpUtil.get(urlToken,this,(e)=>{
            console.log(e);
            if(e.state==200){
                let jsonToken:JSON = JSON.parse(e.data);

                if(jsonToken["access_token"]!=null){
                    json["token"] = jsonToken["access_token"];
                    let urlTicket = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + jsonToken["access_token"] 
                    + "&type=jsapi" + "&output=jsonp";
     
                    HttpUtil.get(urlTicket,this,(e)=>{
                        console.log(e);
                        if(e.state==200){
                            let jsonTicket:JSON = JSON.parse(e.data);
                            console.error(jsonTicket);
                            if(jsonTicket["errcode"]==0){
                                json["ticket"] = jsonTicket["ticket"];
        
                                handler.runWith(json);
                            }else{
                                console.error(e.msg);
                            }
                        }
                        else
                        {
                            console.error(e.msg);
                        }
                    },null,"jsonp");
    
                }else{
                    console.error(e.msg);
                }
            }else{
                console.error(e.msg);
            }

            
        },null,"jsonp");
    }

    // public static getResult(url:string):Map<string, string>{
 
    //     let ret:Map<string, string> = this.sign(this.getTicket(), url);
    //     ret.set("appId", this.getAppId());
    //     return ret;
    // }

    public static sign( jsapi_ticket:string,  url:string) :Map<string, string>{
        let ret:Map<string, string> = new Map<string, string>();
        let nonce_str = this.create_nonce_str();
        let timestamp = this.create_timestamp();

 
        ret.set("url", url);
        ret.set("jsapi_ticket", jsapi_ticket);
        ret.set("nonceStr", nonce_str);
        ret.set("timestamp", timestamp);
        //ret.set("signature", signature);

        return ret;
    }
 
    private static create_nonce_str():string {
        return this.uuid();
    }
 
    private static create_timestamp():string {
        var nowdate:Date = new Date(); 
        return (nowdate.getMinutes() / 1000).toString();
    }

    private static uuid(): string {
        const random: (multiplier: number) => number = (multiplier: number) => {
            return Math.floor(Math.random() * multiplier);
        };

        const hexadecimal: (index: number) => string = (index: number) => {
            return ((index === 19) ? random(4) + 8 : random(16)).toString(16);
        };

        const nexttoken: (index: number) => string = (index: number) => {
            if (index === 8 || index === 13 || index === 18 || index === 23) {
                return "-";
            } else if (index === 14) {
                return "4";
            } else {
                return hexadecimal(index);
            }
        };

        const generate: () => string = () => {
            let uuid: string = "";

            while ((uuid.length) < 36) {
                uuid += nexttoken(uuid.length);
            }
            return uuid;
        };

        return generate();
    }
}