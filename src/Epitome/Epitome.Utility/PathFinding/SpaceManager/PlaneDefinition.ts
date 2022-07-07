import { IPlaneData } from "../PathFindingData";

/** 平面定义 */
export class PlaneDefinition extends Laya.Script implements IPlaneData
{
    public LocalScope: Laya.Vector4;
    public PlaneHeight: number = 0;

	/** 确定X轴范围节点 */
	public rangeX:Laya.Sprite3D[] = [];

	/** 确定Z轴范围节点 */
	public rangeZ:Laya.Sprite3D[] = [];

	public Init()
	{
        this.rangeX[0] = this.rangeZ[0] = this.owner.getChildByName("X") as Laya.Sprite3D;
        this.rangeX[1] = this.rangeZ[1] = this.owner.getChildByName("Z") as Laya.Sprite3D;

        console.log(this.owner.getChildByName("X"));
		console.log(this.owner.getChildByName("Z"));

		this.UpdateLocalScope();

        console.log("平面定义");
        console.log(this.LocalScope);
	}

	/** 获取物体坐标 */
	private GetPos(sprite3D:Laya.Sprite3D):Laya.Vector3
	{
		return sprite3D.transform.position;
	}

    /** 更新区域范围 */
	public UpdateLocalScope()
	{
		// 计算平面范围
		this.LocalScope = new Laya.Vector4(this.GetPos(this.rangeX[0]).x, this.GetPos(this.rangeX[1]).x, this.GetPos(this.rangeZ[0]).z, this.GetPos(this.rangeZ[1]).z);
	}
}