
/** 屏幕截图 */
export class ScreenCapture
{
    private static canvas:HTMLCanvasElement;

    constructor() {
        ScreenCapture.canvas = window.document.getElementById("layaCanvas") as HTMLCanvasElement;
    }

    
    public static Sprite3DCapture(scene3D:Laya.Scene3D,camera:Laya.Camera):Laya.Texture
    {
        // 强制WebGL同步刷新
        // Config.preserveDrawingBuffer = true;

        // 克隆相机
        var renderTargetCamera: Laya.Camera = scene3D.addChild(new Laya.Camera(camera.aspectRatio, camera.nearPlane, camera.farPlane)) as Laya.Camera;
        renderTargetCamera.transform.position = camera.transform.position;
        renderTargetCamera.transform.rotate(camera.transform.rotationEuler);
        //选择渲染目标为纹理
        renderTargetCamera.renderTarget = new Laya.RenderTexture(512, 512);  
        //渲染顺序
        renderTargetCamera.renderingOrder = -1;
        //清除标记
        renderTargetCamera.clearFlag = Laya.CameraClearFlags.Sky;
        var rtex = new Laya.Texture(((<Laya.Texture2D>(renderTargetCamera.renderTarget as any))), Laya.Texture.DEF_UV);
        return rtex;
    }

    public static CanvasCapture():string
    {
        ScreenCapture.canvas = window.document.getElementById("layaCanvas") as HTMLCanvasElement;
        console.error(ScreenCapture.canvas);
        return ScreenCapture.canvas.toDataURL("image/png",1);
    }

    // public static SpriteCapture():Laya.Texture
    // {
    //     return Laya.stage.drawToTexture(Laya.Browser.clientWidth,Laya.Browser.clientHeight,0,0) as Laya.Texture;
    // }

    public static SpriteCapture():string
    {
        var spr = new Laya.Sprite();
        spr.graphics.drawTexture(Laya.stage.drawToTexture(Laya.Browser.clientWidth,Laya.Browser.clientHeight,0,0) as Laya.Texture);
        var kk = spr.drawToCanvas(512, 512, 0, 0);
        return kk.toBase64("image/png", 1);
    }

    // public static SpriteToBase64(sprite:Laya.Sprite):string
    // {

    // }
}