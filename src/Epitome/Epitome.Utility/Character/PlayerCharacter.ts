import {CharacterHandleBase, CharacterHandleState} from "./CharacterHandleBase";
import {CharacterType} from "./CharacterBase";
import {CharacterController} from "./CharacterController";
import { TreasureHunt } from "../../../script/TreasureHunt";
import { SceneManager } from "../../Common/ManagerModel";

/**
 * 玩家角色
 */
 export class PlayerCharacter extends CharacterHandleBase
 {
     Initialization():void
     {
         // 设置角色类型
         this.characterType =  CharacterType.PlayerCharacter;
     }

     BeganMove(): void {
        super.BeganMove();
        console.log(this.animator);
        this.animator.play("走");
     }
     FinishMove(): void {
        super.FinishMove();
        this.animator.play("待机");
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
         super.onUpdate();

         // 状态为行走时 && 活动开启
         if(this.handleState == CharacterHandleState.Walk && TreasureHunt.Instance.activitiesOpen)
         {            
            let target:Laya.Vector3 = new Laya.Vector3(this.moveSpeed*this.moveRatio.x, 0,this.moveSpeed*this.moveRatio.y);
            Laya.Vector3.scale(target,100,target);
            let ray = new Laya.Ray(this.character.transform.position,this.TransformQuat(target,this.character.transform.rotation));
            var result = new Laya.HitResult();
            // 物理射线与碰撞器相交检测
            if(SceneManager.Instance.curOpen3dScene.physicsSimulation.rayCast(ray,result,1.5,Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER4
                ,Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3))
            {
                //如果未有碰撞则返回
                if(result.hitFraction < 0.1)
                {
                    TreasureHunt.Instance.TriggerJudgment(result.collider);
                }
            }
         }
     }
 }