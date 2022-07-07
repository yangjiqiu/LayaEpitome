import { Singleton } from "../../../Common/SingletonModel";
import { DyadicArray } from "../../../Extensions/DyadicArray";
import { NodeItem } from "../PathFindingData";

/** 平面网格管理器 */
export class FlatGridManager extends Singleton<FlatGridManager>()
{
    /** 平面网格大小 */
    private flatGridSize:Laya.Vector2;
    /** 平面网格节点 */
    private gridNodeData:DyadicArray<NodeItem>;

    /** 初始化平面网格数据 */
    public InitGridNode(size:Laya.Vector2,grid:Number[][])
    {
        // 初始化格子
        this.flatGridSize = size;
        this.gridNodeData = new DyadicArray(size.x, size.y,null);
    }

    /** 更新平面网格数据 */
    public UpdataFlatGridData(gridNode:DyadicArray<NodeItem>)
    {
        this.gridNodeData = gridNode;
    }

    /** 根据坐标获得一个节点 SpaceManager.Instance.GetPlanePoint(pos)*/
    public GetItem(pos:Laya.Vector2):NodeItem
    {
        if (pos.x >= this.flatGridSize.x || pos.x<0 || pos.y >= this.flatGridSize.y || pos.y < 0 ) return null;

        return this.gridNodeData.getValue(pos.x,pos.y);
    }

    /** 获取周围的节点 */
    public GetNeibourhood(node:NodeItem):NodeItem[]
    {
        let nodeList:NodeItem[] = [];
        for (let i = -1; i <= 1; i++)
        {
            for (let j = -1; j <= 1; j++)
            {
                if (i == 0 && j == 0) continue;
                let x = node.x + i;
                let y = node.y + j;
                // 判断是否越界，如果没有，加到列表中
                if (x < this.flatGridSize.x && x >= 0 && y < this.flatGridSize.y && y >= 0)
                    nodeList.push(this.gridNodeData.getValue(x,y));
            }
        }
        return nodeList;
    }
}