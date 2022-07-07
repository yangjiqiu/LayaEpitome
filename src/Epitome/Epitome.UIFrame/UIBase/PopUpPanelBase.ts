import {PanelBase} from "./PanelBase";
import {UIMaskManager} from "./../Manager/UIMaskManager";
import {UIMaskType} from "./../Defines/Defines";

/**
 * 弹出面板基类
 */
 export class PopUpPanelBase extends PanelBase
 {
     /**
      * UI遮罩类型
      */
      protected  uiMaskType:UIMaskType = UIMaskType.Lucency;

      Display()
      {
          super.Display();

          //UIMaskManager.Instance.SetMaskWindow(this, this.uiMaskType);
      }

      Freeze()
      {
        super.Freeze();
      }

      Redisplay()
      {
        super.Redisplay();

          //UIMaskManager.Instance.SetMaskWindow(this,  this.uiMaskType);
      }

      Hiding()
      {
        super.Hiding();

          UIMaskManager.Instance.CancelMaskWindow();
      }
 }