import {CharacterBase} from "./CharacterBase";

/**
 * 角色行为状态
 */
export enum CharacterHandleState
{
    /// <summary>待机</summary>
    Standby,
    /// <summary>寻路</summary>
    PathFinding,
    /// <summary>行走</summary>
    Walk,
    /// <summary>受力</summary>
    Force,
    /// <summary>占据</summary>
    Occupy,
}

/**
 * 人物处理接口
 */
export interface ICharacterHandle
{
    /**
     * 角色行为状态
     */
     handleState:CharacterHandleState;

    /// <summary>开始移动</summary>
     BeganMove():void;

    /// <summary>结束移动</summary>
     FinishMove():void;

    /// <summary>开始受力</summary>
     BeganForce():void;

    /**
     * 角色移动
     * @param vector 
     * @param moveLimit 
     */
     CharacterMove(vector:Laya.Vector3, moveLimit:boolean):void;

    /**
     * 角色朝向
     * @param vector 
     * @param value 
     */
    CharacterTowards(vector:Laya.Vector3,  value:number):void;


    /**
     * 移动速度
     */
    moveSpeed:number;

    /**
     * 移动比率
     */
    moveRatio:Laya.Point;
}

/**
 * 角色处理基础
 */
 export class CharacterHandleBase extends CharacterBase implements ICharacterHandle
 {
    /**
     * 角色行为状态
     */
     handleState:CharacterHandleState;

     /**
      * 动画组件
      */
    private animtor:Laya.Animator;

    /**
     * 移动速度
     */
     public moveSpeed:number = 0.01;

     /**
      * 移动比率
      */
     public moveRatio:Laya.Point;

    public init(game:Laya.Sprite3D):void
    {
        super.init(game);
        this.animtor = this.gameobject.getChildAt(0).getComponent(Laya.Animator);
    }

    public TransformQuat( source:Laya.Vector3,  rotation:Laya.Quaternion):Laya.Vector3
    {
        var x = source.x;
        var y = source.y;
        var z = source.z;
        var qx = rotation.x;
        var qy = rotation.y;
        var qz = rotation.z;
        var qw = rotation.w;

        var ix = qw* x + qy* z - qz* y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;

        return new Laya.Vector3(ix * qw + iw * -qx + iy * -qz - iz * -qy, iy * qw + iw * -qy + iz * -qx - ix * -qz, iz * qw + iw * -qz + ix * -qy - iy * -qx);
    }

     BeganMove(): void {
         throw new Error("Method not implemented.");
     }
     FinishMove(): void {
         throw new Error("Method not implemented.");
     }
     BeganForce(): void {
         throw new Error("Method not implemented.");
     }

     CharacterMove(vector: Laya.Vector3, moveLimit: boolean): void
     {
        this.character.transform.translate(this.TransformQuat(target,this.character.transform.rotation));
     }

     CharacterTowards(vector: Laya.Vector3, value: number): void 
     {
        let angel = Math.atan2(vector.x, vector.z) * 180 / Math.PI -180; 
        if(angel < 0) angel += 360;
        this.character.transform.localRotationEuler =  new Laya.Vector3(0, angel + 180,0);
     }

     public onUpdate(): void
     {
         // 状态为行走时
         if(this.handleState == CharacterHandleState.Walk)
         {
            let target:Laya.Vector3 = new Laya.Vector3(-this.moveSpeed*this.moveRatio.x, 0,this.moveSpeed*this.moveRatio.y);
            this.CharacterMove(target,false);
      
            this.CharacterTowards();
         }
     }
 }