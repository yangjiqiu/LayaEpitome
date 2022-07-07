import {BaseJoystick} from "./BaseJoystick";

/**
 * 基础鼠标操纵杆
 */
 export class BaseMouseJoystick extends BaseJoystick {
    // 当前事件ID
    private curTouchId:number;
    // 摇杆最大移动距离
    private maxDistance:number = 0;
    // 摇杆移动的比例
    private moveRatio:Laya.Point = new Laya.Point;
    // 摇杆移动显示位置
    private moveTargrt:Laya.Point = new Laya.Point;


    public Initialize(background:Laya.Image,forground:Laya.Image):void
    {
        super.Initialize(background,forground);

        this.forground.mouseThrough = true;
        this.forground.mouseEnabled = false;

        this.maxDistance = (this.background.width)/2 ; //摇杆最大距离实际上就是 虚拟摇杆的背景

        this.background.on(Laya.Event.MOUSE_DOWN,   this,this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP,          this,this.onMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT,         this,this.onMouseUp);
    }

    private onMouseDown(e:Laya.Event):void
    {
        this.curTouchId = e.touchId;    
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onTouchMove);
        //Laya.stage.event(ConstEvent.JOYSTICK_START);

        let mousePos: Laya.Point =  new Laya.Point(Laya.stage.mouseX,Laya.stage.mouseY);
        this.joystickData.screenPos.x = mousePos.x;
        this.joystickData.screenPos.y = mousePos.y;
        let localPos: Laya.Point =  this.background.globalToLocal(mousePos,false);
        this.joystickData.localPos.x = localPos.x;
        this.joystickData.localPos.y = localPos.y;
        this.joystickData.moveRatio.x = 0;
        this.joystickData.moveRatio.y = 0;
        this.BeginJoystick();
    }

    private onTouchMove(e:Laya.Event):void
    {
        //如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
        if(e.touchId != this.curTouchId) return;
        //将移动时的鼠标屏幕坐标转化为摇杆局部坐标
        let mousePos: Laya.Point =  new Laya.Point(Laya.stage.mouseX,Laya.stage.mouseY);
        this.joystickData.screenPos.x = mousePos.x;
        this.joystickData.screenPos.y = mousePos.y;
        let localPos: Laya.Point =  this.background.globalToLocal(mousePos,false);
        this.joystickData.localPos.x = localPos.x;
        this.joystickData.localPos.y = localPos.y;
  
        //更新摇杆控制点位置
        //摇杆移动位置在 背景里面
        if(this.maxDistance >= this.distance(localPos.x,localPos.y, this.background.x,this.background.y))
        {
            //this.forground.pos(locationPos.x,locationPos.y);
            this.moveTargrt.x  = localPos.x;
            this.moveTargrt.y  = localPos.y
        }else
        {
            //更新摇杆移动位置在 背景外边
            let  deltaX =  localPos.x - this.background.x;
            let  deltaY =  localPos.y - this.background.y;

            let angle = Math.atan2(deltaY, deltaX) 
            //this.forground.pos(this.background.x + Math.cos(angle)*this.maxDistance,   this.background.y + Math.sin(angle)*this.maxDistance);
            this.moveTargrt.x  = this.background.x + Math.cos(angle)*this.maxDistance;
            this.moveTargrt.y  = this.background.y + Math.sin(angle)*this.maxDistance;
        }

        //设置摇杆显示位置
        this.forground.pos(this.moveTargrt.x, this.moveTargrt.y);
        //计算摇杆移动比例
        this.moveRatio.x =  (this.forground.x - this.background.x)/this.maxDistance;
        this.moveRatio.y =  (this.forground.y - this.background.y)/this.maxDistance;

        //console.log("this.moveRatio.x:"+this.moveRatio.x);
        //console.log("this.moveRatio.y:"+this.moveRatio.y);
        //发送摇杆移动比例事件
        //Laya.stage.event(ConstEvent.JOYSTICK_MOVE, this.moveRatio);

        this.joystickData.moveRatio.x = this.moveRatio.x;
        this.joystickData.moveRatio.y = this.moveRatio.y;

        this.Joystick();
    }

    private onMouseUp(e:Laya.Event):void
    {
        //如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
        if(e.touchId != this.curTouchId)return;
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.onTouchMove);
        this.forground.pos(this.background.x,this.background.y);
        //Laya.stage.event(ConstEvent.JOYSTICK_END);s

        let mousePos: Laya.Point =  new Laya.Point(Laya.stage.mouseX,Laya.stage.mouseY);
        this.joystickData.screenPos.x = mousePos.x;
        this.joystickData.screenPos.y = mousePos.y;
        let localPos: Laya.Point =  this.background.globalToLocal(mousePos,false);
        this.joystickData.localPos.x = localPos.x;
        this.joystickData.localPos.y = localPos.y;
        this.joystickData.moveRatio.x = 0;
        this.joystickData.moveRatio.y = 0;

        this.FinishJoystick();
    }

    ///计算两个点的距离
    private distance(X,Y,mouseX,mouseY) :number
    {
        let dx:number = X - mouseX;
        let dy:number = Y - mouseY;
        let distance:number = Math.sqrt(dx*dx+dy*dy);
        return distance;
    }
}