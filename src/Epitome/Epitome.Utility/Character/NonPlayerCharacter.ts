import {CharacterHandleBase, CharacterHandleState} from "./CharacterHandleBase";
import {CharacterType} from "./CharacterBase";
/**
 * 非玩家角色
 */
 export class NonPlayerCharacter extends CharacterHandleBase
 {
    Initialization():void
    {
        this.characterType =  CharacterType.NonPlayerCharacter;
    }

    BeganMove(): void {
        super.BeganMove();
        console.log(this.animator);
        this.animator.play("走");
        this.animator.speed = 0.6;
     }

     FinishMove(): void {
        super.FinishMove();
        this.animator.play("待机");
        this.animator.speed = 1;
     }

     CharacterMove(vector: Laya.Vector3, moveLimit: boolean): void
     {
        //this.character.transform.translate(this.TransformQuat(vector,this.character.transform.rotation));
      //   console.log(vector);
        this.character.transform.position = (vector);
        //this.characterController.move(vector);
     }

     MotionSwitch(name:string):void
     {
        switch (name) {
            case "走":
                this.animator.crossFade(name, 0.2, 0);
                this.animator.crossFade(name, 0.2, 1);
                break;
            case "待机":
                this.animator.crossFade(name, 0.2, 0);
                this.animator.crossFade(name, 0.2, 1);
                break;
        }
     }

     public onUpdate(): void
     {         
        // super.onUpdate();

        // // 状态为行走时
        // if(this.handleState == CharacterHandleState.Walk)
        // {
        //     //this.CharacterMove(target,false);
        // }
    }
 }