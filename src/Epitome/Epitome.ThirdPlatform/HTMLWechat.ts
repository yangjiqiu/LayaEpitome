
//import * as wx from './../../../bin/libs/jweixin-1.6.0.js';

import { DockingServices } from "../../script/DockingServices/DockingServices";
import { UserDataManager } from "../../script/UserDataManager";
import wxConfig from "../../script/wxConfig";
import { SceneUIType } from "../../UIModule/Panel/UIModelData";
import { UIManager } from "../UIFrame";

//import jwx from "../../../libs/jwx";

//import jwx from "./../../../bin/libs/jweixin-1.6.0";

//import jwx from "../../../libs/jwx";

//import jwx from "../../../libs/jwx";

// import jwx from "../../../libs/jwx";

//import jwx from "../../../bin/libs/jwx";

/**
 * H5微信分享
 */
export class HTMLWechat
{       

    public static onMenuShareTimeline()
    {
        wx.onMenuShareTimeline({ 
            title: wxConfig.title, // 分享标题
            link: wxConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
            imgUrl: wxConfig.imgUrl, // 分享图标

            success: function () {
                // 设置成功
                alert("分享成功");
                console.log("分享成功");
                DockingServices.trRedeemLogInsert(Laya.Handler.create(this,(e)=>{
                    console.error(e);
                    UserDataManager.Instance.giftVoucher = "";
                    UIManager.Instance.OpenUI(SceneUIType.GiftVoucher.toString());
                }));
              },
              cancel: function () {
                alert("取消分享");
                  console.log("取消分享");
              }
        });
    }

    public static onMenuShareAppMessage()
    {
        wx.onMenuShareAppMessage({ 
            title: wxConfig.title, // 分享标题
            desc: "分享描述", // 分享描述
            link: wxConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
            imgUrl: wxConfig.imgUrl, // 分享图标

            success: function () {
                // 设置成功
                alert("分享成功");
                console.log("分享成功");
                DockingServices.trRedeemLogInsert(Laya.Handler.create(this,(e)=>{
                    console.error(e);
                    UserDataManager.Instance.giftVoucher = "";
                    UIManager.Instance.OpenUI(SceneUIType.GiftVoucher.toString());
                }));
              },
              cancel: function () {
                alert("取消分享");
                  console.log("取消分享");
              }
        });
    }

    public static updateTimelineShareData()
    {
        wx.updateTimelineShareData({ 
            title: wxConfig.title, // 分享标题
            link: wxConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
            imgUrl: wxConfig.imgUrl, // 分享图标

            // success: function () {
            //     // 设置成功
            //     alert("分享成功");
            //     console.error("分享成功");
            //     DockingServices.trRedeemLogInsert(Laya.Handler.create(this,(e)=>{
            //         console.error(e);
            //         UIManager.Instance.OpenUI(SceneUIType.GiftVoucher.toString());
            //     }));
            //   },
              success: function () {
                // 设置成功
                alert("分享成功");
                console.log("分享成功");
                DockingServices.trRedeemLogInsert(Laya.Handler.create(this,(e)=>{
                    console.log(e);
                    UserDataManager.Instance.giftVoucher = "";
                    UIManager.Instance.OpenUI(SceneUIType.GiftVoucher.toString());
                }));
              },
              cancel: function () {
                alert("取消分享");
                  console.log("取消分享");
              }
        });
    }

    public static updateAppMessageShareData()
    {
        wx.updateAppMessageShareData({ 
            title: wxConfig.title, // 分享标题
            desc: "string",
            link: wxConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
            imgUrl: wxConfig.imgUrl, // 分享图标

            success: function () {
                // 设置成功
                alert("分享成功");
                console.log("分享成功");
                DockingServices.trRedeemLogInsert(Laya.Handler.create(this,(e)=>{
                    console.log(e);
                    UserDataManager.Instance.giftVoucher = "";
                    UIManager.Instance.OpenUI(SceneUIType.GiftVoucher.toString());
                }));
              },
              cancel: function () {
                alert("取消分享");
                  console.log("取消分享");
              }
        });
    }

    public static configInit()
    {
        //2.通过config接口注入权限验证配置  https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#3
        wx.config({
            debug: true,   // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
            appId: wxConfig.appId,  // 必填，公众号的唯一标识
            timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
            nonceStr: wxConfig.nonceStr,  // 必填，生成签名的随机串
            signature: wxConfig.signature,  // 必填，签名s
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline']  // 必填，需要使用的 JS 接口列表
        });

        wx.ready(function(){
            // config信息验证后会执行 ready 方法，所有接口调用都必须在 config 接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在 ready 函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在 ready 函数中。
            console.log("res");

            // wx.updateAppMessageShareData({ 
            //     title: wxConfig.title, // 分享标题
            //     desc: "分享内容",
            //     link: wxConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
            //     imgUrl: wxConfig.imgUrl, // 分享图标
    
            //     success: function () {
            //         // 设置成功
            //         console.error("设置成功");
            //         },
            //         cancel: function () {
            //             alert(2);
            //             console.error(2);
            //         },
            //         fail: function (res) {
            //             alert(3);
            //             console.error(3);
            //             console.error(res);
            //         }
            //         ,complete:function (res) {
            //             alert(1);
            //             console.error(1);
            //             console.error(res);
            //         }
                
            //     });
            });

        wx.error(function(res){
            // config信息验证失败会执行 error 函数，如签名过期导致验证失败，具体错误信息可以打开 config 的debug模式查看，也可以在返回的 res 参数中查看，对于 SPA 可以在这里更新签名。
            console.error("config信息验证失败会执行 error 函数");
            console.error(res);

            // 获取微信配置  配置错误请求

            Laya.timer.frameOnce(24,this,this.df); 
        });
    }

    static df()
    {
        DockingServices.getWXConf(1);
    }
}