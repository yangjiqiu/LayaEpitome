import {CameraBehavior} from "./CameraBehavior";
import { IJoystick } from "../Joystick/BaseJoystick";
import {BaseJoystickBehavior,JoystickData}  from "../JoystickModel";

export enum PerspectiveType
{

    /**
     * 第一人称
     */
     FirstPerson,
    
     /**
      * 第三人称
      */
    ThirdPerson,
}

/**
 * 角色操纵杆移动
 */
 export class CharacterJoystickPerspective extends BaseJoystickBehavior
 {
    // 垂直轴
    public axle_Ver:Laya.Sprite3D;

    // 水平轴
    public axle_Hor:Laya.Sprite3D;

    private perspective:Laya.Sprite3D;

    /**
     * 视角状态
     */
    public perspectiveState:PerspectiveType;

    camera:Laya.Camera;

    // 对相机进行一定范围内的旋转限制 设定只能上下左右调整四十五度
    private  LimitedScope_Ver:Laya.Vector2 = new Laya.Vector2(-80, 80);
    private  LimitedScope_Hor:Laya.Vector2 = new Laya.Vector2(-20, 10);

    firstTouchPos:Laya.Vector2;
    oldPos :Laya.Vector2;

    // 旋转速度
    private  turnSpeed:number = 0.01;

    cameraBehavior:CameraBehavior;

    InitBehavior(joystick: IJoystick): void {
        super.InitBehavior(joystick);
        console.log(this.axle_Ver);
        // 获取摄像机
        this.camera = this.axle_Ver.getChildByName("Camera") as Laya.Camera;
        this.perspective = this.axle_Ver;

        this.cameraBehavior = (this.axle_Ver as Laya.Sprite3D).getComponent(CameraBehavior);
        console.log(this.cameraBehavior);
    }

    PerspectiveSwitch(type:PerspectiveType): void
    {
        this.perspectiveState = type;

        switch(this.perspectiveState)
        {
            case PerspectiveType.FirstPerson:
                //this.perspective.transform.localRotationEuler = new Laya.Vector3(0,0,0); Model
                this.camera.transform.localPosition= new Laya.Vector3(0,0,0);
                this.cameraBehavior.CameraOffset = new Laya.Vector3(0,-1.4,0);
                (this.axle_Hor.getChildByName(this.axle_Hor.name) as Laya.Sprite3D).transform.localScale = new Laya.Vector3(0,0,0);
                //this.camera.nearPlane = 0.15;
                //this.perspective = this.camera;
            break;
            case PerspectiveType.ThirdPerson:
                //this.perspective.transform.localRotationEuler = new Laya.Vector3(0,0,0);
                this.camera.transform.localPosition= new Laya.Vector3(0,0.1,-1);
                this.cameraBehavior.CameraOffset = new Laya.Vector3(0,-1.4,0);
                (this.axle_Hor.getChildByName(this.axle_Hor.name) as Laya.Sprite3D).transform.localScale = new Laya.Vector3(1,1,1);
                //this.camera.nearPlane = 0.01;
                //this.perspective = this.axle_Ver;
            break;
        }
    }

    stateJoystick:boolean;

    BeginJoystick(data:JoystickData): void
    {
        this.firstTouchPos = new Laya.Vector2(data.screenPos.x,data.screenPos.y);
        this.oldPos = Laya.Vector2.ZERO;

        this.stateJoystick = true;
    }

    FinishJoystick(data:JoystickData): void 
    {
        this.oldPos = Laya.Vector2.ZERO;

        this.stateJoystick = false;
    }

    // posV2:Laya.Vector2;

    Joystick(data:JoystickData): void
    {
        // 计算滑动距离
        let v2:Laya.Vector2 = new Laya.Vector2(data.screenPos.x -this.firstTouchPos.x,data.screenPos.y -this.firstTouchPos.y);

        // 根据滑动方向设置相机视角
        let posV2:Laya.Vector2 = new Laya.Vector2(v2.x - this.oldPos.x,v2.y -this.oldPos.y);
        posV2.x *= this.turnSpeed;
        posV2.y *= this.turnSpeed;
        this.oldPos = v2;


        // console.log(posV2);
        // 范围限制
        let vec:number = this.perspective.transform.localRotationEulerX;
        vec = vec > 180 ? vec - 360 : vec;
        vec = vec > this.LimitedScope_Ver.y ?this.LimitedScope_Ver.y : vec <this.LimitedScope_Ver.x ?this.LimitedScope_Ver.x  :vec;


        this.perspective.transform.localRotationEulerY  += -this.oldPos.x * 0.01;
        this.axle_Hor.transform.localRotationEulerY  += -this.oldPos.x * 0.01;


        this.perspective.transform.localRotationEulerX  +=  this.oldPos.y* 0.01;

        // 范围限制
        vec = this.perspective.transform.localRotationEulerX;
        vec = vec > 180 ? vec - 360 : vec;
        vec = vec > this.LimitedScope_Hor.y ?this.LimitedScope_Hor.y : vec <this.LimitedScope_Hor.x ?this.LimitedScope_Hor.x  :vec;

        this.perspective.transform.localRotationEulerX = vec;


        // CameraAngle.localEulerAngles += posV2.y * Vector3.left;

        // // 范围限制
        // Vector3 vec = CameraAngle.localEulerAngles;
        // vec.x = vec.x > 180 ? vec.x - 360 : vec.x;
        // vec.x = Mathf.Clamp(vec.x, LimitedScope_Hor.x, LimitedScope_Hor.y);

        // CameraAngle.localEulerAngles = vec;

        // Player.localEulerAngles += posV2.x * Vector3.up;

        //Laya.Vector3.add (new Laya.Vector3(-1 * posV2.y,posV2.x * 1,0),this.axle_Hor.transform.localRotationEuler,this.axle_Hor.transform.localRotationEuler);
        // console.log("this.axle_Hor.transform.localRotationEuler"+this.axle_Hor.transform.localRotationEuler);
        // console.log(this.axle_Hor.transform.localRotationEuler);
        // let pos:Laya.Vector3 =new Laya.Vector3();
        // Laya.Vector3.add (new Laya.Vector3(-1 * posV2.y,posV2.x * 1,0),this.axle_Hor.transform.localRotationEuler,pos);
        // console.log(this.axle_Hor.transform.localRotationEuler);
        // //Laya.Quaternion.createFromYawPitchRoll (pos.x,pos.y,pos.z,this.axle_Ver.transform.localRotation);
        // Laya.Quaternion.createFromYawPitchRoll (pos.x,pos.y,pos.x,this.axle_Ver.transform.localRotation);
        // console.log(new Laya.Vector3(-1 * posV2.y,posV2.x * 1,0));
        // console.log(pos);
    }

    public onUpdate(): void
    {
        //console.log("onUpdate");
        if(this.stateJoystick)
        {
            // 范围限制
            let vec:number = this.perspective.transform.localRotationEulerX;
            vec = vec > 180 ? vec - 360 : vec;
            vec = vec > this.LimitedScope_Ver.y ?this.LimitedScope_Ver.y : vec <this.LimitedScope_Ver.x ?this.LimitedScope_Ver.x  :vec;

            this.perspective.transform.localRotationEulerX  +=  this.oldPos.y * 0.001;


            this.perspective.transform.localRotationEulerY  += -this.oldPos.x * 0.001;
            this.axle_Hor.transform.localRotationEulerY  += -this.oldPos.x * 0.001;
        }
    }
 }