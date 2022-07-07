import { Singleton } from "../../Common/SingletonModel";
import { IPathFinding } from "./PathFindingData";

/** 寻路管理器 */
export class PathFindingManager extends Singleton<PathFindingManager>()
{
    public PathFindingList:IPathFinding[] = [];


    public AddPathFindingWalk(pathFinding:IPathFinding)
    {
        this.PathFindingList.push(pathFinding);
    }

    public RemovePathFindingWalk(pathFinding:IPathFinding)
    {
        this.PathFindingList = this.PathFindingList.filter(item => item !== pathFinding);;
    }

    public NPCPathWalkTask()
    {
        if (this.PathFindingList != null)
        {
            // 遍历寻路集合执行游走逻辑
            for (let i = 0, max = this.PathFindingList.length; i < max; i++)
            {
                let item = this.PathFindingList[i];

                item.PathWalkTask();
            }
        }
    }
}