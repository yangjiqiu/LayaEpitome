import { VERSION } from "../../../../bin/libs/json";
import { IPathFinding, NodeItem } from "./PathFindingData";
import { SpacePathCalculation } from "./SpaceManager/SpacePathCalculation";

/** 寻路基类 */
export class PathFindingBase extends Laya.Script implements IPathFinding
{
    public StartNode: Laya.Vector3;
    public TargetNode: Laya.Vector3;

    /** 路径节点集合 */
    public PathNodeList:NodeItem[];

    /** 寻路过程 */
    public isPathfindingPerform:boolean;

    public PathFinding(targetPoint:Laya.Vector3)
    {
        console.log("PathFinding");
        console.log(targetPoint);
        this.isPathfindingPerform = true;
        if (this.PathNodeList != null) this.PathNodeList = [];

        // 设置寻路节点
        this.StartNode = (this.owner as Laya.Sprite3D).transform.position;
        //this.StartNode.x = -this.StartNode.x; // 反转坐标系
        this.TargetNode = targetPoint;

        this.AStarPathFinding(this);
    }

    /** A*寻路 */
    public AStarPathFinding(finding:IPathFinding)
    {
        // let start:Laya.Vector3 = finding.StartNode.clone();
        // start.x = -start.x;
        // let target:Laya.Vector3 = finding.TargetNode.clone();
        var start:Laya.Vector3 = new Laya.Vector3(8,0,-3);
        start.x = -start.x;
        let target:Laya.Vector3 = new Laya.Vector3(5,0,-3);
        switch(this.owner.name)
        {
            case "Man01":
                start = new Laya.Vector3(8,0,-3);
                start.x = -start.x;
                target= new Laya.Vector3(5,0,-3);
                break;
            case "Robot":
                start = new Laya.Vector3(-2,0,1);
                start.x = -start.x;
                target= new Laya.Vector3(2,0,-2);
                break;
            case "Man02":
                start = new Laya.Vector3(4.5,0,1.8);
                start.x = -start.x;
                target= new Laya.Vector3(2,0,1.8);
                break;
        }
        
        // let start:Laya.Vector3 = new Laya.Vector3(8,0,-3);
        // start.x = -start.x;
        // let target:Laya.Vector3 = new Laya.Vector3(5,0,-3);
        // target.x = -target.x;
        console.log(target);

        this.PathNodeList = SpacePathCalculation.Instance.AStarPathFinding(start, target);
        console.log("A*寻路节点");
        console.log(this.PathNodeList);
        this.isPathfindingPerform = false;
    }

    public PathWalkTask() {}
}