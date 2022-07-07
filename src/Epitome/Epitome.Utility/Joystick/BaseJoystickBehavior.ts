import Vector3 = Laya.Vector3;

import {IJoystick,JoystickData} from "./BaseJoystick";

/**
 * 操纵杆行为接口
 */
 export interface IJoystickBehavior
 {
     InitBehavior(joystick:IJoystick):void;
 
     BeginJoystick(data:JoystickData):void;
 
     Joystick(data:JoystickData):void;
 
     FinishJoystick(data:JoystickData):void;
 }

/**
 * 基础操纵杆行为
 */
 export class BaseJoystickBehavior implements IJoystickBehavior
 {
     InitBehavior(joystick: IJoystick): void {}
     BeginJoystick(data:JoystickData): void{}
     Joystick(data:JoystickData): void {}
     FinishJoystick(data:JoystickData): void {}
 }