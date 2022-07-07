import {Singleton,BaseSigleton}  from "./../../Common/SingletonModel";
import {UIMaskType} from "./../Defines/Defines";

/**
 * UI遮罩管理器
 */
 //export class UIMaskManager extends Singleton<UIMaskManager>
 export class UIMaskManager extends Singleton<UIMaskManager>()
 {
     /**
      * 
      */
    private topPanel:Laya.Sprite;

    /**
     * 遮罩面板
     */
    private maskPanel:Laya.Sprite;


     /**
      * 设置遮罩窗口
      * @param UIForms 
      * @param maskType 
      */
    public SetMaskWindow(UIForms:Laya.Sprite, maskType:UIMaskType = UIMaskType.Lucency)
    {
        switch (maskType)
        {
            //完全透明，不能穿透
            case UIMaskType.Lucency:
                this.maskPanel.visible = true;
                //maskImage.color = maskColors[0];
                break;
            //半透明，不能穿透
            case UIMaskType.Translucence:
                this.maskPanel.visible = true;
                //maskImage.color = maskColors[1];
                break;
            //低透明，不能穿透
            case UIMaskType.ImPenetrable:
                this.maskPanel.visible = true;
                //maskImage.color = maskColors[2];
                break;
            //可以穿透
            case UIMaskType.Pentrate:
                this.maskPanel.visible = false;
                break;
            default:
                break;
        }
    }

    /**
     * 取消遮罩窗口
     */
    public CancelMaskWindow()
    {
        this.maskPanel.visible = false;
    }
 }
