

import { ui } from "../../../script/layaUI";
import {ConstEvent} from "../../../ConstEvent";

import {IJoystickBehavior} from "./BaseJoystickBehavior";

enum ScreenScopeType {
    Up, // 0
    Down,// 1
    Left,// 2
    Right// 3
}

/**
 * 操纵杆接口
 */
 export interface IJoystick
{
    // 设置屏幕范围
    // SetScopeType(scope:ScreenScopeType):void;
}

/**
 * 操纵杆数据
 */
export class JoystickData
{
    /**
     * 屏幕位置
     */
    screenPos:Laya.Vector2 = new Laya.Vector2 ();

    /**
     * 摇杆局部坐标
     */
    localPos:Laya.Vector2= new Laya.Vector2 ();

    /**
     * 摇杆移动比例
     */
     moveRatio:Laya.Vector2= new Laya.Vector2 ();
}

/**
 * 基础操纵杆
 */
 export class BaseJoystick implements IJoystick{
    public background:Laya.Image;
    public forground:Laya.Image;

    public Initialize(background:Laya.Image,forground:Laya.Image):void
    {
        this.background = background;
        this.forground = forground;
    }

    /**
     * 操纵杆行为
     */
     protected behavior:IJoystickBehavior;

     /**
      * 操纵杆数据
      */
     protected joystickData:JoystickData = new JoystickData();

     /**
      * 设置操纵杆行为
      * @param behavior 
      */
      public SetJoystickBehavior(behavior:IJoystickBehavior):void { this.behavior = behavior; this.behavior.InitBehavior(this); }


    /**
     * 开始操纵杆
     * @param data 操纵杆数据
     */
     protected BeginJoystick():void
     {
         if (this.behavior != null) this.behavior.BeginJoystick(this.joystickData);
     }
 
    /**
     * 操纵杆
     * @param data 操纵杆数据
     */
    protected Joystick():void
    {
        if (this.behavior != null) this.behavior.Joystick(this.joystickData);
    }

    /**
     * 结束操纵杆
     * @param data 操纵杆数据
     */
    protected FinishJoystick():void
    {
        if (this.behavior != null) this.behavior.FinishJoystick(this.joystickData);
    }
}