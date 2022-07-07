
import {UIBase} from "./UIBase";

/**
 * 面板基类
 */
 export class PanelBase extends UIBase
 {
    /**
     * 显示
     */
     Display()
     {
        this.owner.active = true;

        super.Display();
     }

     /**
      * 冻结
      */
     Freeze(){super.Freeze();}
 
     /**
      * 重新显示
      */
     Redisplay(){super.Redisplay();}
 
     /**
      * 隐藏
      */
     Hiding()
     {
        this.owner.active = false;
        
        super.Hiding();
     }
 }