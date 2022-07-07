import GameDataConfig from "../../../script/GameDataConfig";
import {Singleton,BaseSigleton}  from "./../../Common/SingletonModel"

/**
 * 场景管理器
 */
export class SceneManager extends Singleton<SceneManager>() {
    public curOpen2dScene: Laya.Scene;
    public curOpen3dScene: Laya.Scene3D;

    public RootNode3D:Laya.Sprite;

    constructor() {
        super();

        console.log("场景管理器");
    }

    public Initialize()
    {
        if(this.RootNode3D==null)
        {
            this.RootNode3D = new Laya.Sprite();
            this.RootNode3D.name = "RootNode3D";
            Laya.stage.addChild(this.RootNode3D);
            console.log(Laya.stage);
        }
    }

    /**
     * 初始化第一个打开的场景（必须执行，一般为Init游戏的场景）
     * @param starSceneName 
     */
    public InitStartScene(starSceneName: string) {
        this.curOpen2dScene = this.FindSc2dInStage(starSceneName);
        console.log(this.curOpen2dScene);
    }

    /**
     * 获取当前在打开的2d场景   
     */
    public GetCurSc2D(): Laya.Scene {
        return this.curOpen2dScene;
    }

    /**
     * 打开目标场景
     * @param targetSceneName 目标2d场景名字，只需传场景名字XXX，不需要XXX.scene
     */
    public OpenSc2D(targetSceneName: string) {
        Laya.Scene.open(targetSceneName, true, null, Laya.Handler.create(this, () => {
            let tempSc2d: Laya.Scene = this.curOpen2dScene;
            let list = targetSceneName.split('/');

            this.curOpen2dScene = this.FindSc2dInStage(list[list.length-1].split('.')[0]);
            // this.curOpen2dScene.width = Laya.Scene.root.width;
            // this.curOpen2dScene.height = Laya.Scene.root.height;
            console.log(this.curOpen2dScene);
            if (tempSc2d && tempSc2d!=this.curOpen2dScene) {
                console.log(tempSc2d);
                tempSc2d.destroy(true);
            }

            console.log(this.FindSc2dInStage(targetSceneName));
            console.log(Laya.Scene.root);
        }));
    }

    /**
     * 在Stage下找到目标2d场景
     * @param sc2dName 2d场景名称
     * @returns Laya.Scene/Laya.View
     */
    public FindSc2dInStage(sc2dName: string) {
        let sc2d = Laya.Scene.root.getChildByName(sc2dName);
        // Laya.stage.bgColor = "rgba(116, 116, 116, 1)";
        // console.error(Laya.stage.parent);
        // Laya.Scene.root.visible = false;
        // console.error((Laya.Browser.document.body.style as CSSStyleDeclaration).getPropertyValue("-webkit-tap-highlight-color"));
        // (Laya.Browser.document.body.style as CSSStyleDeclaration).setProperty("-webkit-tap-highlight-color","rgba(116, 116, 116, 1)");

        let document:Document =Laya.Browser.document;
        document.body.setAttribute("bgColor",GameDataConfig.bgColor);
        //document.bgColor = "rgba(116, 116, 116, 1)";
        // document.body.style.color = "rgba(116, 116, 116, 1)";

        if (sc2d) {
            return sc2d as Laya.Scene;
        }
        return null;
    }
}
