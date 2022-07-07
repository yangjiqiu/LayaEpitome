
/** 寻路接口 */
export interface IPathFinding
{
    /** 开始节点 */
    StartNode:Laya.Vector3;
    /** 目标节点 */
    TargetNode:Laya.Vector3;
    
    /** 路径行走 */
    PathWalkTask();
}

/** 物体类型 */
export enum ItemType
{
    No = "No",       // 空白
    Wall = "Wall",     // 墙
}

/** 节点 */
export class NodeItem
{
    // 节点物品类型
    public itemType:ItemType;

    /// <summary>中心节点（一般确定节点所在区域中心位置，得到中心位置保存的物品信息）</summary>
    public centerNode:NodeItem;

    /// <summary>区域节点用来人物占有位置</summary>
    public regionalNodes:NodeItem[];

    /// <summary>占有物品：可以是墙、家具、待机人物</summary>
    public item:Laya.Transform;

    // 位置
    public pos:Laya.Vector3;
    // 格子坐标
    public x:number;
    public y:number;

    /** 与起点的长度 */
    public gCost:number =0;
    /** 与目标点的长度 */
    public hCost:number=0;

    /** 阻碍物 */
    public get IsObstacle():boolean
    {
        return (this.itemType == ItemType.Wall);
    }

    // 总的路径长度
    public get fCost():number
    {
        return this.gCost + this.hCost;
    }

    // 父节点
    public parent:NodeItem;

    constructor(itemType:ItemType, pos:Laya.Vector3, x:number, y:number)
    {
        this.itemType = itemType;
        this.pos = pos;
        this.x = x;
        this.y = y;
    }
}

/** 平面数据 */
export interface IPlaneData
{
	/** 区域范围 */
	LocalScope:Laya.Vector4;

	/** 平面高度 */
	PlaneHeight:number;
}


/** 尺寸：厘米单位 */
export class Scale
{
    /** 长度 */
    public length:number;
    /** 宽度 */
    public width:number;
    /** 高度 */
    public height:number;

    constructor(_len:number,_wid:number,_hei:number)
    {
        this.length = _len;
        this.width = _wid;
        this.height = _hei;
    }
}

/** 形状类型 */
export enum ShapeType
{
    /** 矩形 */
    Rectangle = "Rectangle",
    /** 圆形 */
    Circle = "Circle",
}

/** 空间数据 */
export class SpaceData
{
    /** 位置 */
    public Pos:Laya.Vector3;
    /** 尺寸：厘米单位 */
    public Scale:Scale;
    /** 形状类型 */
    public Shape:ShapeType;
}

/** 物体属性 */
export class ObjectProperties
{
    public shapeType:ShapeType;
    public Scale:Scale;
    /** 旋转角度 */
    public Angle:number;
}