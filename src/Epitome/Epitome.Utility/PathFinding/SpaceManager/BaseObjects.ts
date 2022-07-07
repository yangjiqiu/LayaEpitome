import { ObjectProperties, Scale, ShapeType, SpaceData } from "../PathFindingData";
import { SpaceGlobalData } from "../SpaceGlobalData";
import { SpaceManager } from "./SpaceManager";


/** 物体基类 */
export class BaseObjects extends Laya.Script
{
    public objectProperties:ObjectProperties;

    public spaceData:SpaceData;

    public Init(trans:Laya.Transform3D)
    {
        this.spaceData = new SpaceData();
        this.spaceData.Shape = ShapeType.Rectangle;
        console.log(trans.owner.name);
        console.log(this.spaceData.Shape);
        this.spaceData.Scale = new Scale((trans.localScale.x/SpaceGlobalData.scalingRatio) * 2,
            trans.localScale.y/SpaceGlobalData.scalingRatio,(trans.localScale.z/SpaceGlobalData.scalingRatio) * 2);
        // this.spaceData.Scale = new Scale((trans.localScale.x/SpaceGlobalData.scalingRatio)*1.2,
        // trans.localScale.y/SpaceGlobalData.scalingRatio,(trans.localScale.z/SpaceGlobalData.scalingRatio)*1.2);
        console.log(this.spaceData.Scale);
        this.AddSpaceRect();
    }

    public AddSpaceRect()
    {
        this.spaceData.Pos = (this.owner as Laya.Sprite3D).transform.position;
        this.spaceData.Pos.x = -this.spaceData.Pos.x;
        // // 添加边缘区域  && 简单的防止人物和物体重合 && 加1米
        // this.spaceData.Scale.length += 60;
        // this.spaceData.Scale.width += 60;

        SpaceManager.Instance.AddSpaceRect(this.spaceData);
    }
}