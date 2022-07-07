import { Singleton } from "../../../Common/SingletonModel";
import { ArrayList } from "../../../Extensions/ArrayList";
import { NodeItem } from "../PathFindingData";
import { FlatGridManager } from "./FlatGridManager";
import { SpaceManager } from "./SpaceManager";

/** 空间路径计算 */
export class SpacePathCalculation extends Singleton<SpacePathCalculation>()
{
    /** 生成路径 */
    GeneratePath(startNode:NodeItem,endNode:NodeItem):NodeItem[]
    {
        let path:NodeItem[] = [];
        if (endNode != null)
        {
            let temp = endNode;
            while (temp != startNode)
            {
                path.push(temp);
                temp = temp.parent;
            }
            // 反转路径
            path.reverse();
        }
        return path;
    }

    /** 获取两个节点之间的距离 */
    GetDistanceNodes(a:NodeItem, b:NodeItem):number
    {
        return parseInt((this.Euclidian(a, b) * 10.0).toString());
    }

    _straightCost = 1;

    /** 几何估价法 */
    private Euclidian(a:NodeItem, b:NodeItem):number
    {
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    }

    /** A*寻路 */
    public AStarPathFinding(startPos:Laya.Vector3,endPos:Laya.Vector3):NodeItem[]
    {
        console.log("A*寻路");

        let startNode = SpaceManager.Instance.GetItem(startPos);
        let endNode = SpaceManager.Instance.GetItem(endPos);

        console.log(startNode);
        console.log(endNode);

        // 记录下所有被考虑来寻找最短路径的格子
        let openList:NodeItem[] = [];
        // 记录下不会再被考虑的格子
        let closedList:NodeItem[] = [];

        openList.push(startNode);

        let curNode:NodeItem;
        let neibourhoodNode:NodeItem[];
        let item:NodeItem;
        while (openList.length > 0)
        {
            // 从OPEN表中取估价值f最小的节点n;
            curNode = openList[0];

            if (curNode == endNode) break;
            openList.forEach(element => {
                if (element.fCost <= curNode.fCost && element.hCost < curNode.hCost)
                {
                    curNode = element;
                }
            });

            openList = openList.filter(item => item !== curNode);
            closedList.push(curNode);

            // 找到的目标节点
            if (curNode == endNode)
            {
                return this.GeneratePath(startNode, endNode);
            }

            neibourhoodNode = FlatGridManager.Instance.GetNeibourhood(curNode);
            
            //console.log(neibourhoodNode);

            // 判断周围节点，选择一个最优的节点

            //neibourhoodNode

            //foreach (var item in neibourhoodNode)
            for (let j = 0, max = neibourhoodNode.length; j < max; j++)
            {
                item = neibourhoodNode[j];

                //if(item.IsObstacle)console.log("如果是墙");
                // 如果是墙或者已经在关闭列表中
                if (item.IsObstacle || closedList.some((i)=>{ return i == item})) continue;
                //console.log("计算当前相领节点现开始节点距离");
                // 计算当前相领节点现开始节点距离
                let newCost = curNode.gCost + this.GetDistanceNodes(curNode, item);
                // 如果距离更小，或者原来不在开始列表中
                if (newCost < item.gCost || !openList.some((i)=>{ return i == item}))
                {
                    // 更新与开始节点的距离
                    item.gCost = newCost;
                    // 更新与终点的距离
                    item.hCost = this.GetDistanceNodes(item, endNode);
                    // 更新父节点为当前选定的节点
                    item.parent = curNode;
                    //console.log(item);
                    // 如果节点是新加入的，将它加入打开列表中
                    if (!openList.some((i)=>{ return i == item}))
                    {
                        //console.log("如果节点是新加入的，将它加入打开列表中");
                        openList.push(item);
                    }
                }
            }
            // console.log(openList);
            // console.log(closedList);
            // console.log(neibourhoodNode);
            // break;
        }

        return this.GeneratePath(startNode, null);
    }
}