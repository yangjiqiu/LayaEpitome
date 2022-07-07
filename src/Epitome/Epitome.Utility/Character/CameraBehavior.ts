

export class CameraBehavior extends Laya.Script{
    public gameobject:Laya.Sprite3D;
    //摄像机目标物体
    private target:Laya.Sprite3D;
    //摄像机的角度
    public angel:number     = 30;
    //摄像机和目标物体的距离
    public distance:number  = 25;

    public dis:Laya.Vector3 =new  Laya.Vector3();

    public  camera:Laya.Camera;

    public init(game:Laya.Sprite3D):void
    {
        this.gameobject = game;

        // 获取摄像机
        this.camera = this.gameobject.getChildByName("Camera") as Laya.Camera;
        this.camera.nearPlane = 0.01;
        //this.camera.enableHDR = false; //关闭HDR
        this.camera.transform.localPosition= new Laya.Vector3(0,0.1,-1);
    }

    public onAwake(): void{}

    public onStart(): void{}

    public onUpdate(): void
    {
        let nowPos :Laya.Vector3 = new  Laya.Vector3();
        //nowPos = this.target.transform.position;
        nowPos.x = this.target.transform.position.x - this.dis.x ;
        nowPos.y = this.target.transform.position.y - this.dis.y ;
        nowPos.z = this.target.transform.position.z  -this.dis.z ;

        this.gameobject.transform.position = nowPos;
    }


    public set Target( tar:Laya.Sprite3D )
    {
        this.target = tar;
    }
     

    public set CameraOffset(offset:Laya.Vector3)
    {
        this.dis = offset;
        if(this.target.name == "Woman") this.dis.y += 0.12;
    }
}