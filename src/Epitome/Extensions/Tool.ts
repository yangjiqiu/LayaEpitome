/**
 * 工具
 */
 export class Tool
 {

    //步骤1：获取目标节点的所有子节点，将所有子节点放入数组并返回
    private static GetChildNodesArray(target:Laya.Node):Laya.Node[]
    {
        let nodeArray:Laya.Node[]=[];
        for (let i = 0; i < target.numChildren; i++)
        {
            let node=target.getChildAt(i);
            if(node)
            {
                nodeArray.push(node);
            }
        }
        return nodeArray;
    }
	
	//步骤二：递归获取目标节点的所有子孙节点，并将他们全部放入数组并返回
    private static FindAndGetAllChildren(parentNode:Laya.Node,outNodesArray:Laya.Node[]):Laya.Node[]
    {
        if(parentNode.numChildren > 0)
        {
            let nodeArray=Tool.GetChildNodesArray(parentNode);
            nodeArray.forEach(node => 
            {
                outNodesArray.push(node);
                if(Tool.GetChildNodesArray(node).length > 0)
                {
                    Tool.FindAndGetAllChildren(node,outNodesArray);
                }
                else
                {
                    return outNodesArray;
                }
            });
        }
        return null;
    }

	//第三步：构建一个数组来存放获取的所有节点并返回此数组
	public static GetAllChildrenArray(parentNode:Laya.Node):Laya.Node[]
    {
        let allChildrenArray:Laya.Node[]=[];
        Tool.FindAndGetAllChildren(parentNode,allChildrenArray);
        return allChildrenArray;
    }

	//最后一步：将所有节点封装到字典里，方便获取
	public static GetAllChildrenMap(parentNode:Laya.Node):Map<string,Laya.Node>
    {
        let allChildrenArray=Tool.GetAllChildrenArray(parentNode);
        let map=new Map();
        for (let i = 0; i < allChildrenArray.length; i++)
        {
            if(!map.has(allChildrenArray[i].name))
            {
                map.set(allChildrenArray[i].name,(allChildrenArray[i]));
            }
        }
        return map;
    }

	//为了方便获取各种类型的节点，可以在写一个泛型方法来获取
	public static GetNodeByMap<T extends Laya.Node>(nodeName:string,map:Map<string,Laya.Node>):T
    {
        if(!map.has(nodeName)){
            return null;
        }
        return map.get(nodeName) as T;
    }

    //为了方便获取各种类型的节点，可以在写一个泛型方法来获取
	public static GetComponentByMap<T extends Laya.Component>(type1:typeof Laya.Component,map:Map<string,Laya.Node>):Array<T>
    {
        let mapCom:Array<T> = new Array<T>();

        map.forEach(element => {
            let t:T = element.getComponent(type1) as T;
            if(t) mapCom.push(t);
        });

        return  mapCom;
    }

    /**
     * {0} - {n} 之间获取一个随机数
     * @param min 
     * @param max 
     * @returns 
     */
    public static GetRandomNum(min : number , max : number)
    {
        let num : number = min + (( max - min ) * Math.random());
        return num;
    }

    /**
     * 数据转换  num-int； str-to；str-float
     * @param num 
     * @returns 
     */
    public NumToInt(num: number) {
        return parseInt(num.toString());
    }
    
    public StrToInt(num: string) {
        return parseInt(num);
    }
    
    public StrToFloat(num: string) {
        return parseFloat(num);
    }
}