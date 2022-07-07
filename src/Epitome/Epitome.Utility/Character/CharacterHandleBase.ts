import { SceneManager } from "../../Common/ManagerModel";
import {CharacterBase, CharacterState} from "./CharacterBase";

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
    CharacterTowards(vector:Laya.Vector2,  value:number):void;


    /**
     * 移动速度
     */
    moveSpeed:number;

    /**
     * 移动比率
     */
    moveRatio:Laya.Vector2;
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
    protected animator:Laya.Animator;

    /**
     * 移动速度
     */
     public moveSpeed:number = 0.015;

     /**
      * 移动比率
      */
     public moveRatio:Laya.Vector2;

     private characterController:Laya.CharacterController

     lineSprite:Laya.PixelLineSprite3D;

    public init(game:Laya.Sprite3D):void
    {
        super.init(game);
        console.log(this.character);
        console.log(this.model);
        this.animator = this.model.getComponent(Laya.Animator);
        this.characterController = this.character.getComponent(Laya.CharacterController);


        this.lineSprite = SceneManager.Instance.curOpen3dScene.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
        console.log(this.character.layer);
        console.log(this.lineSprite.layer);
        let   pos:  Laya.Vector3 ;
        // Laya.Vector3.add(this.character.transform.position ,new Laya.Vector3(0,0,10),pos);
        // this.lineSprite.addLine(this.character.transform.position,
        //     pos, Laya.Color.RED, Laya.Color.RED);
        let pos1:Laya.Vector3=new Laya.Vector3(0,0,0);
        Laya.Vector3.add(new Laya.Vector3(0,0,0) ,new Laya.Vector3(0,0,0),pos1);
        let pos2:Laya.Vector3=new Laya.Vector3(0,0,0);
        Laya.Vector3.add(new Laya.Vector3(0,0,0) ,new Laya.Vector3(0,0,100),pos2);
        this.lineSprite.addLine(pos1,
            pos2, Laya.Color.RED, Laya.Color.RED);
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
        this.handleState = CharacterHandleState.Walk;
        this.State = CharacterState.Walk;
     }
     FinishMove(): void {
        this.handleState = CharacterHandleState.Standby;
        this.State = CharacterState.Standby;
     }
     BeganForce(): void {
         throw new Error("Method not implemented.");
     }

     /**
      * 切换动作
      * @param name 动作名称
      */
     MotionSwitch(name:string):void{}

     CharacterMove(vector: Laya.Vector3, moveLimit: boolean): void
     {
        //this.character.transform.translate(this.TransformQuat(vector,this.character.transform.rotation));
        this.character.transform.translate(vector);
        //this.characterController.move(vector);
     }

     CharacterTowards(vector: Laya.Vector2, value: number): void 
     {
        let angel = Math.atan2(vector.x, vector.y) * 180 / Math.PI -180; 
        if(angel < 0) angel += 360;
        this.character.transform.localRotationEuler =  new Laya.Vector3(0, angel + 180,0);
     }
    /*检测移动区碰撞器的射线*/
    private ray:Laya.Ray;
    /*碰撞检测信息*/
    private outHitInfo:Laya.HitResult[] = Laya.HitResult[0];
     public onUpdate(): void
     {
         // 状态为行走时
         if(this.handleState == CharacterHandleState.Walk)
         {
             
            let target:Laya.Vector3 = new Laya.Vector3(this.moveSpeed*this.moveRatio.x, 0,this.moveSpeed*this.moveRatio.y);
            Laya.Vector3.scale(target,100,target);
            

            this.ray = new Laya.Ray(this.character.transform.position,this.TransformQuat(target,this.character.transform.rotation));
            var result = new Laya.HitResult();
            //物理射线与碰撞器相交检测
            if(SceneManager.Instance.curOpen3dScene.physicsSimulation.rayCast(this.ray,result,1.5,Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER4
                ,Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2))
            {
                //如果未有碰撞则返回
                if(result.hitFraction < 0.1)target.x = target.z = 0;
            }
    //         //物理射线与碰撞器相交检测
    //         if(SceneManager.Instance.curOpen3dScene.physicsSimulation.raycastFromTo(this.character.transform.position,target,result))
    //         {
    //             console.log(result);
    //             //将检测到的物体设置为红色
    // ((result.collider.owner as Laya.MeshSprite3D).meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(1.0, 0.0, 0.0, 1.0);
    //         }
            Laya.Vector3.scale(target,0.01,target);
            this.CharacterMove(target,false);
      
        
            let pos1:Laya.Vector3=new Laya.Vector3(0,0,0);
            Laya.Vector3.add(this.character.transform.position,new Laya.Vector3(0,0,0),pos1);
            let pos2:Laya.Vector3=new Laya.Vector3(0,0,0);
            Laya.Vector3.scale(target,100,target);
            Laya.Vector3.add(this.character.transform.position,target,pos2);
            this.lineSprite.setLine(0,pos1,
                pos2, Laya.Color.RED, Laya.Color.RED);


            //this.CharacterTowards(this.moveRatio,0);
         }
     }
 }