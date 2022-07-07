import {Singleton,BaseSigleton}  from "./../../Common/SingletonModel";
import {SceneManager}  from "./../../Common/ManagerModel";
import { UIBase } from "../UIBase/UIBase";

/**
 * UI管理器
 */
 export class UIManager extends Singleton<UIManager>()
 {
     /**
      * UI预制体路径
      */
    private UIPrefab_Paths=new Map<string,string>();

    /**
      * UI预制体脚本
      */
     private UIPrefab_Scripts=new Map<string,any>();

     /**
      * UI预制体字典：Map<string,Laya.Prefab>
      */
    private uiPrefabMap=new Map<string,Laya.Prefab>();

    constructor()
    {
        super();
    }

    /**
     * 获取UI预制体的完整路径
     * @param uiPrefabName UI预制体名称
     */
    public GetPrefabPath(uiPrefabName:string):string
    {
        return "prefab/UI/"+uiPrefabName+".prefab";
    }

    //=====================================< UIPanel >类型UI======================================= 

    /**
     * 找到名字对应的UI物体
     */
    public FindTargetUI<T extends Laya.UIComponent>(targetName:string,parent:Laya.Node):T
    {
        if(!parent){
            return null;
        }
        return parent.getChildByName(targetName)as T;
    }

    /**
     * 在场景中找到UI并销毁
     */
    public DestroyUI(uiName:string)
    {
        let sc2d=SceneManager.Instance.GetCurSc2D();
        console.log(sc2d);console.log(SceneManager.Instance.RootNode3D);
        if(sc2d){
            let ui=sc2d.getChildByName(uiName) as Laya.UIComponent;       
            console.log(ui);     
            if(ui){
                ui.destroy(true);
                console.log(ui);
            }
        }
    }

    /**
     * 设置UI visible
     */
    public SetUIVisible(uiName:string,visible:boolean)
    {
        let sc2d = SceneManager.Instance.GetCurSc2D();
        if(sc2d){
            let ui=sc2d.getChildByName(uiName)as Laya.UIComponent;
            if(ui){
                ui.visible=visible;
            }
        }
    }


    /**
     * 预加载UI
     * @param uiType UI类型
     * @param prefabPath 预制体路径
     * @param fatherNode 父节点
     */
    public PreloadUI(uiType:string,uiScript:any,prefabPath:string,fatherNode?:Laya.Node):void
    {
        // 已加载
        if (this.UIPrefab_Paths.has(uiType)) return;

        this.UIPrefab_Paths.set(uiType, prefabPath);
        this.UIPrefab_Scripts.set(uiType, uiScript);
        // if (fatherNode != null)
        // UIObject_FatherNodes.Add(uiTypes[i], fatherNode);
    }

    /**
     * 加载并打开UI面板（面板类型UI，不能打开多个）
     * @param uiCtlerScript  控制此界面的脚本类
     * @param callback 加载完回调(Laya.UIComponent)=>{}
     * @param parent 父级节点
     * @param isOnlyOne 是否只能存在一个
     */
     public OpenUI(uiType:string,callback:Function=(param:any)=>{},parent?:Laya.Node,isOnlyOne=true)
     {
        let uiScript=this.UIPrefab_Scripts.get(uiType);
        if(!parent){
            parent=SceneManager.Instance.GetCurSc2D();
            console.log(parent);
        }
        if(!parent){
            console.log(parent);
            return;
        }
        if(parent.getChildByName(uiType)){
            if(isOnlyOne==true){
                console.log("isOnlyOne"+isOnlyOne);
                return;
            }
        }
        if(this.uiPrefabMap.has(uiType))
        {
            let uiPrefab=this.uiPrefabMap.get(uiType) as Laya.Prefab;
            this.OpenUICommonOp(uiPrefab,uiScript,parent,callback);
            console.log("OpenUICommonOp" + uiPrefab);
        }
        else
        {
            this.LoadUIPrefab(uiType,(uiPrefab:Laya.Prefab)=>
            {
                this.OpenUICommonOp(uiPrefab,uiScript,parent,callback);
                console.log("OpenUICommonOp" + uiPrefab);
            });
        }
    }

    /**
     * 从字典中移除UI预制体并清理单个资源（最好在切换场景时使用，清理掉下个场景不再使用的UI预制体）
     * @param uiCtlerScript 控制此界面的脚本类(ui索引，预制体的名称)
     */
    public ClearRes(uiCtlerScript:any)
    {
        let k=uiCtlerScript.name;
        if(!this.uiPrefabMap.has(k))
        return;
        this.uiPrefabMap.delete(k);
        Laya.LoaderManager.prototype.clearRes(this.GetPrefabPath(k));
        Laya.Resource.destroyUnusedResources();
    }

    /**
     * 加载UI预制体
     * @param uiName 预制体UI名称
     * @param callback 加载完回调
     */
    private LoadUIPrefab(uiName:string,callback:Function=(uiPrefab:any)=>{})
    {
        console.log(uiName);
        let uiPath=this.GetPrefabPath(uiName);
        console.log(uiPath);
        Laya.loader.load(uiPath,Laya.Handler.create(this,(uiPrefab:Laya.Prefab)=>
        {    
            if(!uiPrefab){
                console.error("不存在目标预制体",uiName);
                return;
            }
            this.uiPrefabMap.set(uiName,uiPrefab);
            callback(uiPrefab);
        }));
    }

    /**
     * 加载面板的共有操作
     */
    private OpenUICommonOp(uiPrefab:Laya.Prefab,uiCtlerScript:any,parent:Laya.Node,callback:Function=(ui:any)=>{})
    {
        let uiName=uiCtlerScript.name;
        //let ui=uiPrefab.create()as Laya.UIComponent;
        let ui:Laya.Sprite=Laya.Pool.getItemByCreateFun(uiName,uiPrefab.create,uiPrefab);
        parent.addChild(ui);
        ui.name=uiName;
        this.AddSrcToNode(uiCtlerScript,ui);
        callback(ui);
    }
	
	private AddSrcToNode(src:any,targetNode:Laya.Node)
    {
        if(targetNode.getComponent(src))
        return;
        targetNode.addComponent(src);
    }
 
     /**
      * 打印字典
      */
    public LogUIMapInfo()
    {
        if(this.uiPrefabMap.size==0||!this.uiPrefabMap==null)
        {
            console.log("UI预制体资源Map为空");
            return;            
        }
        for (let [key, value] of this.uiPrefabMap) 
        {
            console.log("key:",key,"===","value:",value);
        }
    }
}