import GameDataConfig from "../../../script/GameDataConfig";



/**
 * UI基类
 */
export class UIBase extends Laya.Script
{
    constructor(){ super()}
        
    public allUIDic: Map<string, Laya.Node> = new Map<string, Laya.Node>();
    private prefixArray: string[] = ["img", "btn", "txt", "list", "box","hsld","ti","prog","lab","combo"]; //需要加入UI字典的UI前缀

    /**
     * 获取UI类型
     */
     public GetUIType():string{return "";}

    onAwake() {
        this.SetAllUINodesDic();
        this.Display();
    }

    /**
     * 销毁当前界面UI
     * @param cbOnClose 关闭时的回调
     */
    public CloseUI() {
        //this.Hiding();
        this.owner.destroy(true);
    }

    private GetNodeByMap<T extends Laya.Node>(nodeName:string,map:Map<string,Laya.Node>):T
    {
        if(!map.has(nodeName)){
            return null;
        }
        return map.get(nodeName) as T;
    }

    /**
     * 添加点击事件带有声音
     * @param btName 按钮名称
     * @param callback 回调
     * @param needPlayClickSound 是否播放点击音效
     * @param clickSoundPath 音效地址
     */
    public AddBtnEvent(btName: string, callback: Function,needPlayClickSound=true,clickSoundPath?:string) {
        let bt: Laya.Button = this.GetBtn(btName);
        if (!bt) return;
        bt.on(Laya.Event.CLICK,this,callback)
    }

    /**
     * 通过文本名称获取Tetx组件
     * @param txtName 文本组件名称
     * @returns Laya.Text
     */
    public GetTxt(txtName: string): Laya.Text {
        return this.GetNodeByMap<Laya.Text>(txtName, this.allUIDic);
    }

    /**
     * 通过文本名称获取Image组件
     * @param imgName Image组件名称
     * @returns Laya.Image
     */
    public GetImg(imgName: string): Laya.Image {
        return this.GetNodeByMap<Laya.Image>(imgName, this.allUIDic);
    }

    /**
     * 通过文本名称获取Image组件
     * @param btnName Image组件名称
     * @returns Laya.Image
     */
    public GetBtn(btnName: string): Laya.Button {
        return this.GetNodeByMap<Laya.Button>(btnName, this.allUIDic);
    }

    /**
     * 通过文本名称获取List组件
     * @param listName List组件名称
     * @returns Laya.List
     */
    public GetList(listName: string): Laya.List {
        return this.GetNodeByMap<Laya.List>(listName, this.allUIDic);
    }

    /**
     * 通过文本名称获取Box组件
     * @param boxName Box组件名称
     * @returns Laya.Box
     */
    public GetBox(boxName: string): Laya.Box {
        return this.GetNodeByMap<Laya.Box>(boxName, this.allUIDic);
    }

    /**
     * 通过文本名称获取HSlider组件
     */
    public GetHSlider(name: string): Laya.HSlider {
        return this.GetNodeByMap<Laya.HSlider>(name, this.allUIDic);
    }

    /**
     * 通过文本名称获取TextInput组件
     */
    public GetTextInput(name: string): Laya.TextInput {
        return this.GetNodeByMap<Laya.TextInput>(name, this.allUIDic);
    }
    
    /**
     * 通过文本名称获取TextInput组件
     */
     public GetProgressBar(name: string): Laya.ProgressBar {
        return this.GetNodeByMap<Laya.ProgressBar>(name, this.allUIDic);
    }

    /**
     * 通过文本名称获取Label组件
     * @param name 文本组件名称
     * @returns Laya.Label
     */
     public GetLabel(name: string): Laya.Label {
        return this.GetNodeByMap<Laya.Label>(name, this.allUIDic);
    }

    public GetComboBox(name: string): Laya.ComboBox
    {
        return this.GetNodeByMap<Laya.ComboBox>(name, this.allUIDic);
    }

    /**
     * 通过泛型名称获取UI组件
     * @param uiName UI组件名称
     * @returns Laya.UIComponent
     */
    public GetUIByT<T extends Laya.UIComponent>(uiName: string): T {
        return this.GetNodeByMap<T>(uiName, this.allUIDic);
    }

    /**
     * 设置UIvisible
     */
    public SetVisible<T extends Laya.UIComponent>(uiName: string,visible:boolean)
    {
        this.GetUIByT<T>(uiName).visible=visible;
    }

    /**
     * 设置文本内容
     */
    public SetText(uiName: string,content:string)
    {
        this.GetTxt(uiName).text=content;
    }

    /**
     * 设置图片的skin
     */
    public SetImgSkin(imgName:string,skin:string)
    {
        this.GetImg(imgName).skin=skin;
    }

    /**
     * 设置按钮的skin
     */
    public SetBtnSkin(btnName:string,skin:string)
    {
        this.GetImg(btnName).skin=skin;
    }

    //--------------------------------------------添加UI到字典-------------------------------------------------

    /**
     * 检查目标ui是否需要加入字典
     */
    private CheckNeedAddToDic(uiName: string) {
        for (let i = 0; i < this.prefixArray.length; i++) {
            if (uiName.startsWith(this.prefixArray[i])) {
                return true;
            }
        }
        return false;
    }

    /**
     * 将所有的UI节点装入字典（每个ui节点不能重名）
     */
    public SetAllUINodesDic() {
        this.allUIDic = this.GetAllChildrenMap(this.owner);
    }

    //获取目标节点的所有子节点，将所有子节点放入数组并返回
    private GetChildNodesArray(target: Laya.Node): Laya.Node[] {
        let nodeArray: Laya.Node[] = [];
        for (let i = 0; i < target.numChildren; i++) {
            let node = target.getChildAt(i);
            if (node) {
                nodeArray.push(node);
            }
        }
        return nodeArray;
    }

    //递归获取目标节点的所有子孙节点，并将他们全部放入数组并返回
    private FindAndGetAllChildren(parentNode: Laya.Node, outNodesArray: Laya.Node[]): Laya.Node[] {
        if (parentNode.numChildren > 0) {
            let nodeArray = this.GetChildNodesArray(parentNode);
            nodeArray.forEach(node => {
                if (this.CheckNeedAddToDic(node.name) == true) {
                    outNodesArray.push(node);
                }
                if (this.GetChildNodesArray(node).length > 0) {
                    this.FindAndGetAllChildren(node, outNodesArray);
                }
                else {
                    return outNodesArray;
                }
            });
        }
        return null;
    }

    //构建一个数组来存放获取的所有节点并返回此数组
    private GetAllChildrenArray(parentNode: Laya.Node): Laya.Node[] {
        let allChildrenArray: Laya.Node[] = [];
        this.FindAndGetAllChildren(parentNode, allChildrenArray);
        return allChildrenArray;
    }

    //将所有节点封装到字典里，方便获取
    private GetAllChildrenMap(parentNode: Laya.Node): Map<string, Laya.Node> {
        let allChildrenArray = this.GetAllChildrenArray(parentNode);
        let map = new Map();
        for (let i = 0; i < allChildrenArray.length; i++) {
            if (!map.has(allChildrenArray[i].name)) {
                map.set(allChildrenArray[i].name, (allChildrenArray[i]));
            }
        }
        return map;
    }

    /**
      * 打印UI字典
      */
    public LogUIMap() {
        if (this.allUIDic.size== 0||!this.allUIDic){
            console.log("UI预制体资源Map为空");
            return;
        }
        console.log("UI节点个数：", this.allUIDic.size);
        for (let [key, value] of this.allUIDic) {
            console.log("key:", key, "===", "value:", value);
        }
    }

    /**
     * 显示
     */
     Display()
     {
        // 播放视频声音
        let sound = Laya.SoundManager.playSound(GameDataConfig.VersionPrefix("res/audio/open.mp3"), 1, Laya.Handler.create(this, ()=>{console.log("播放完成");}),null,0);
     }

     /**
      * 冻结
      */
     Freeze(){}
 
     /**
      * 重新显示
      */
     Redisplay(){}
 
     /**
      * 隐藏
      */
     Hiding()
     {
        // // 播放视频声音
        // let sound = Laya.SoundManager.playSound("res/audio/close.mp3", 1, Laya.Handler.create(this, ()=>{console.log("播放完成");}),null,0);
     }
}