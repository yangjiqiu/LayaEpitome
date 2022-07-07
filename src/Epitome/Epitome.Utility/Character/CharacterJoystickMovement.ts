import {BaseJoystickBehavior,IJoystick,JoystickData}  from "../JoystickModel";

import {ICharacterHandle} from "./CharacterHandleBase";

/**
 * 角色操纵杆移动
 */
export class CharacterJoystickMovement extends BaseJoystickBehavior
{
    /**
     * 角色处理
     */
     public characterHandle:ICharacterHandle;

     BeginJoystick(data:JoystickData): void
     {
        this.characterHandle.moveRatio = data.moveRatio;
        this.characterHandle.BeganMove();
     }

     FinishJoystick(data:JoystickData): void 
     {
        this.characterHandle.moveRatio = data.moveRatio;
        this.characterHandle.FinishMove();
     }

     Joystick(data:JoystickData): void
     {
         // 调用角色移动
         this.characterHandle.moveRatio= data.moveRatio;
     }
}