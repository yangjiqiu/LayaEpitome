import {ConstEvent} from "../../../ConstEvent";
import { SceneManager } from "../../Common/ManagerModel";

export class CharacterController extends Laya.Script{

    private gameobject:Laya.Sprite3D;
    private character:Laya.Sprite3D;
    private moveSpeed = 0.01;

    private moveRatio:Laya.Point;
    private isMove:boolean;

    private animtor:Laya.Animator;

    private characterController:Laya.CharacterController

    constructor(){
        super();
    }
    
    /**
    * 获取本地前方坐标
    * @param startPoint 起点位置
    * @param angle 角度
    * @param distance 长度 默认值:10
    * @return 本地坐标系前方坐标
    */
    public GetLocalForward(startPoint:Laya.Vector3,angle:number,distance:number = 10):Laya.Vector3
    {
        let localForward:Laya.Vector3 = new Laya.Vector3();
        let radian =(angle * Math.PI)/180;
        localForward.x = startPoint.x + distance * Math.sin(radian);
        localForward.y = startPoint.y;
        localForward.z = (startPoint.z+distance * Math.cos(radian));
        return localForward;
    }

     lineSprite:Laya.PixelLineSprite3D;
    public init(game:Laya.Sprite3D):void
    {
        this.gameobject = game;
        console.log(this.gameobject.getChildAt(0));
        this.character  = this.gameobject.getChildAt(0) as Laya.Sprite3D;
        this.animtor    =   this.gameobject.getChildAt(0).getComponent(Laya.Animator);
        console.log(this.animtor);

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

    public onAwake(): void {

    }  

    public onStart(): void
    {
        this.moveRatio = new Laya.Point();
        Laya.stage.on(ConstEvent.JOYSTICK_START,this, ()=>
        {
            this.isMove = true;
            console.log(this.animtor);
            console.log(this.animtor._getIndexInList);
            //this.animtor.play("走");
        });
        Laya.stage.on(ConstEvent.JOYSTICK_MOVE,this, this.onTouchMove);
        Laya.stage.on(ConstEvent.JOYSTICK_END,this, ()=>
        {
            this.isMove = false;
            //this.animtor.play("待机");
        });
    }

    private onTouchMove(move:Laya.Point) :void
    {
        this.moveRatio = move;
      
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
    /*检测移动区碰撞器的射线*/
    private ray:Laya.Ray;
    /*碰撞检测信息*/
    private outHitInfo:Laya.HitResult;
    public onUpdate(): void
    {
      
        if(this.isMove)
        {
            let targetPos:Laya.Vector3 = new Laya.Vector3( -this.moveSpeed*this.moveRatio.x, 0,this.moveSpeed*this.moveRatio.y)

            //行走区域碰撞检测，如未与行走区域模型碰撞，则不移动
            //射线原点
            // var rayOrigin:Laya.Vector3 = new Laya.Vector3(0,0,0);
            // //根据角色位置计算射线原点
            // Laya.Vector3.add(this.character.transform.position,new Laya.Vector3(targetPos.x,0.5,targetPos.z),rayOrigin);
            // //射线原点位置更新
            // this.ray.origin = rayOrigin;
            this.ray = new Laya.Ray(this.character.transform.position,new Laya.Vector3(targetPos.x,0.5,targetPos.z));
            //物理射线与碰撞器相交检测
            SceneManager.Instance.curOpen3dScene.physicsSimulation.rayCast(this.ray,this.outHitInfo,5);
            //如果未有碰撞则返回
            // if(this.outHitInfo.point < 0)speedX = speedZ = 0;
            // let pos1:Laya.Vector3;
            // Laya.Vector3.add(this.character.transform.position ,new Laya.Vector3(0,3,0),pos1);
            // let pos2:Laya.Vector3;
            // Laya.Vector3.add(this.character.transform.position ,new Laya.Vector3(0,3,100),pos2);
            // this.lineSprite.setLine(0,pos1,
            //     pos2, Laya.Color.RED, Laya.Color.RED);

        

            // this.character.transform.translate(this.TransformQuat(
            //     new Laya.Vector3( -this.moveSpeed*this.moveRatio.x, 0,this.moveSpeed*this.moveRatio.y),this.character.transform.rotation) 
            //     ,false);
            this.characterController.move(this.TransformQuat(new Laya.Vector3( -this.moveSpeed*this.moveRatio.x, 0,this.moveSpeed*this.moveRatio.y),this.character.transform.rotation));
            //this.gameobject.transform.rotate ( new Laya.Vector3(0, Math.atan2(this.moveRatio.y, this.moveRatio.x)  ,0),true,false );
            // this.angle = Math.atan2(this.deltaX,this.deltaY) * 180 / Math.PI; 
            // if(this.angle < 0) this.angle += 360;
            // //对角度取整
            // this.angle = Math.round(this.angle);


        //    let angel =   Math.atan2(this.moveRatio.x, this.moveRatio.y) * 180 / Math.PI -180; 
        //    if(angel < 0) angel += 360;
        //    this.character.transform.localRotationEuler =  new Laya.Vector3( 0, angel + 180,0);
        
            // let angel = Math.atan( this.moveRatio.x/ this.moveRatio.y)* 180 / Math.PI;
            // console.log(" angel:"+ angel);
        }
     
 
    }
}