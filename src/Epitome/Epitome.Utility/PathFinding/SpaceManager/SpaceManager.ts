import { Singleton } from "../../../Common/SingletonModel";
import { Tool } from "../../../Extensions";
import { DyadicArray } from "../../../Extensions/DyadicArray";
import { IPlaneData, ItemType, NodeItem, Scale, ShapeType, SpaceData } from "../PathFindingData";
import { SpaceGlobalData } from "../SpaceGlobalData";
import { FlatGridManager } from "./FlatGridManager";

/** 空间管理器 */
export class SpaceManager extends Singleton<SpaceManager>()
{
    /** 平面起始点 */
    private originPoint:Laya.Vector2;

    /** 平面空间大小 */
    public planeSpaceSize:Laya.Vector2;
    /** 平面空间数据 */
    public planeSpaceData:DyadicArray<Number>;

    planeData:IPlaneData;

    /** 添加平面数据 */
    public AddPlaneData(planeData:IPlaneData)
    {
        this.planeData = planeData;
        console.log(planeData.LocalScope);
        // 通过世界坐标通过空间单位(spaceUnit)转化成一个自身尺寸
        let x = parseInt((Math.abs((-planeData.LocalScope.x) - (-planeData.LocalScope.y)) / SpaceGlobalData.spaceUnit).toString());
        let y = parseInt((Math.abs(planeData.LocalScope.z - planeData.LocalScope.w) / SpaceGlobalData.spaceUnit).toString());

        console.log(x);
        console.log(y);

        if (x * SpaceGlobalData.spaceUnit > 1)
        {
            // 记录平面尺寸
            this.planeSpaceSize = new Laya.Vector2(x + 1, y + 1);

            // 生成一个平面二维数组
            this.planeSpaceData = new DyadicArray(this.planeSpaceSize.x,this.planeSpaceSize.y,0);

            // 以平面左下角作为原点
            this.originPoint = new Laya.Vector2(-planeData.LocalScope.x, planeData.LocalScope.z);

            console.log(this.originPoint);
        }
    }

    /** 处理越界数据 */
    private ProcessingData(rect:Laya.Vector4):Laya.Vector4
    {
        rect.x = rect.x < 0 ? 0 : rect.x;
        rect.y = rect.y < 0 ? 0 : rect.y;
        rect.z = rect.z > this.planeSpaceSize.x - 1 ? this.planeSpaceSize.x - 1 : rect.z;
        rect.w = rect.w > this.planeSpaceSize.y - 1 ? this.planeSpaceSize.y - 1 : rect.w;
        return rect;
    }

    /** 添加空间区域信息 */
    public AddSpaceRect(data:SpaceData)
    {
        // 获取平面数据
        let centre = this.GetPlanePoint(data.Pos);
        let rect = this.GetRectRegion(centre, data.Scale);
        centre.x = centre.x >= this.planeSpaceSize.x ? this.planeSpaceSize.x - 1 : centre.x;
        centre.y = centre.y >= this.planeSpaceSize.y ? this.planeSpaceSize.y - 1 : centre.y;
        rect = this.ProcessingData(rect);

        // 超出范围
        if (this.BeyondIndex(rect)) 
        {
            console.log("超出范围");
            return;
        }
        console.log("添加空间区域信息");
        console.log(rect);
        switch (data.Shape)
        {
            case ShapeType.Rectangle:
                // 设置数据
                for (let i = parseInt(rect.x.toString()); i <= rect.z; ++i)
                    for (let j =  parseInt(rect.y.toString()); j <= rect.w; ++j)
                        this.planeSpaceData.setValue(i,j,1);
                break;
            case ShapeType.Circle:
                // 设置数据
                for (let i = parseInt(rect.x.toString()); i <= rect.z; ++i)
                    for (let j = parseInt(rect.y.toString()); j <= rect.w; ++j)
                    {
                        // 通过长宽计算该点是否在圆内
                        if (Laya.Vector3.distance(new Laya.Vector3(centre.x,0,centre.y), new Laya.Vector3(i, 0, j)) <= (rect.z - rect.x) / 2)
                        {
                            this.planeSpaceData.setValue(i,j,1);
                        }
                    }
                break;
        }

        this.UpdataFlatGridData();
    }

    
    /** 清除空间区域信息 */
    public ClearSpaceRect(data:SpaceData)
    {
        if (this.planeSpaceData == null) return;
        // 获取平面数据
        let centre = this.GetPlanePoint(data.Pos);
        let rect = this.GetRectRegion(centre, data.Scale);
        rect = this.ProcessingData(rect);

        // 超出范围
        if (this.BeyondIndex(rect)) return;
        
        // 设置数据  
        for (let i = parseInt(rect.x.toString()); i <= rect.z; ++i)
        {
            for (let j = parseInt(rect.y.toString()); j <= rect.w; ++j)
                this.planeSpaceData.setValue(i,j,0);
        }

        this.UpdataFlatGridData();
    }

    /** 更新平面网格数据 */
    public UpdataFlatGridData()
    {
        let data = this.planeSpaceData;
        console.log(data.getArray());

        let gridNodeData:DyadicArray<NodeItem> = new DyadicArray(data.getArray().length,data.getArray()[0].length,null);

        console.log(data.rowLength);
        console.log(data.columnLength);

        // 将信息写入格子中
        for (let x = 0; x < data.rowLength; x++)
        {
            for (let y = 0; y < data.columnLength; y++)
            {
                let type = data.getValue(x,y) == 1 ? ItemType.Wall : ItemType.No;
                let point = this.GetWorldPoint(new Laya.Vector2(x, y));
                gridNodeData.setValue(x,y,new NodeItem(type, point, x, y));
            }
        }

        FlatGridManager.Instance.UpdataFlatGridData(gridNodeData);
    }

    /** 根据坐标获得一个节点*/
    public GetItem(pos:Laya.Vector3):NodeItem
    {
        console.log(this.GetPlanePoint(pos));
        return FlatGridManager.Instance.GetItem(this.GetPlanePoint(pos));
    }

    /** 限制移动 */
    public MoveLimit(pos:Laya.Vector3):boolean
    {
        // 判断是否有障碍物
        let node = this.GetItem(pos);
        if (node == null) return true;
        return node.IsObstacle;
    }

    /** 将三维坐标转换为在平面上的二维坐标 */
    public GetPlanePoint(pos:Laya.Vector3):Laya.Vector2
    {
        let x = parseInt(((pos.x - this.originPoint.x) / SpaceGlobalData.spaceUnit).toString());
        let y = parseInt(((pos.z - this.originPoint.y) / SpaceGlobalData.spaceUnit).toString());
        if(isNaN(x) || x<0)x = 0;
        if(isNaN(y) || y<0)y = 0;
        return new Laya.Vector2(x, y);
    }

    /** 将二维坐标转换为在世界空间的三维坐标 */
    public GetWorldPoint(pos:Laya.Vector2):Laya.Vector3
    {
        let x = ((pos.x) * SpaceGlobalData.spaceUnit + this.originPoint.x);
        let y = ((pos.y) * SpaceGlobalData.spaceUnit + this.originPoint.y);
        return new Laya.Vector3(x, 0, y);
    }

    /** 获取物品在二维数组平面上的最小（左下）点和最大（右上）点的坐标 */
    public GetRectRegion(point:Laya.Vector2, scale:Scale):Laya.Vector4
    {
        let x = (scale.length * SpaceGlobalData.scalingRatio / SpaceGlobalData.spaceUnit / 2);
        let y = (scale.width * SpaceGlobalData.scalingRatio / SpaceGlobalData.spaceUnit / 2);

        return new Laya.Vector4(point.x - x, point.y - y, point.x + x, point.y + y);
    }

    /** 超出范围 */
    private BeyondIndex(rect:Laya.Vector4):boolean
    {
        return rect.x < 0 || rect.z > this.planeSpaceSize.x - 1 || rect.y < 0 || rect.w > this.planeSpaceSize.y - 1;
    }

    /** 获取房间任意位置 */
    public GetLocation():Laya.Vector3
    {
        //let pos = new Laya.Vector3(Tool.GetRandomNum(-this.planeData.LocalScope.x + 0.5,-this.planeData.LocalScope.y -0.5), 0, Tool.GetRandomNum(this.planeData.LocalScope.z + 0.5, this.planeData.LocalScope.w - 0.5));
        console.log(-this.planeData.LocalScope.x + 0.5);
        console.log(-this.planeData.LocalScope.y - 0.5);
        console.log(this.planeData.LocalScope.z + 0.5);
        console.log(this.planeData.LocalScope.w - 0.5);
        let pos = new Laya.Vector3(Tool.GetRandomNum(-this.planeData.LocalScope.x + 0.5,-this.planeData.LocalScope.y -0.5), 0, Tool.GetRandomNum(this.planeData.LocalScope.z + 0.5, this.planeData.LocalScope.w - 0.5));
        return pos;
    }
    SceneOffsetPosition:Laya.Vector3 = new Laya.Vector3(-10.41,0,6.62);
    /** 获取房间空白位置 */
    public GetBlankLocation():Laya.Vector3
    {
        let node;
        do
        {
            let pos = this.GetLocation();
            node = this.GetItem(pos);
        }
        while (node != null && node.IsObstacle);

        return node.pos;
    }
}