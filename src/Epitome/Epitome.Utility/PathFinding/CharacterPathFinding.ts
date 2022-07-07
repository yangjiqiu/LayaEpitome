import { CharacterBase, CharacterHandleBase, CharacterState, ICharacter, ICharacterHandle } from "../CharacterModel";
import { PathFindingBase } from "./PathFindingBase";
import { IPathFinding } from "./PathFindingData";
import { PathFindingManager } from "./PathFindingManager";
import { SpaceManager } from "./SpaceManager/SpaceManager";

/** 角色寻路 */
export class CharacterPathFinding extends PathFindingBase
{
    /** 当前节点 */
    public currentNode:Laya.Vector3;
    /** 计算节点 */
    public countNode:number;
    /** 设定待机时间 */
    public standbyTime:number=0;
    /** 待机时间 */
    public currentStandbyTime:number =0;
    /** 是否偏离目标 */
    public isFromTheTarget:number=0;
    /** 游走速度 */
    private walkSpeed:number = 0.25;

    private lerpTime:number = 0;

    /** 暂停寻路 */
    public SuspendPathfinding:boolean;

    private character:ICharacter;

    private characterHandle:ICharacterHandle;

    private sprite3D:Laya.Sprite3D;

    public onAwake(): void {

        this.standbyTime = 3;

        // 获取角色接口
        this.character = this.owner.getComponent(CharacterBase);
        this.characterHandle = this.owner.getComponent(CharacterHandleBase);
        console.log("获取角色接口");
        console.log(this.character);
        console.log(this.characterHandle);
        this.sprite3D = this.owner as Laya.Sprite3D;


        PathFindingManager.Instance.AddPathFindingWalk(this);

        Laya.timer.once(1000,this,this.StartPathFinding);
    }

    private StartPathFinding()
    {
        this.countNode = 0;
        // 寻路  &&  置状态为寻路状态
        this.PathFinding(SpaceManager.Instance.GetBlankLocation());
        
        this.character.State = CharacterState.PathFinding;
    }

    public PathWalkTask()
    {
        if (this.SuspendPathfinding) return;

        switch (this.character.State)
        {
            case CharacterState.Standby:
                // 累计待机时间
                // console.log(Laya.timer.delta);
                this.currentStandbyTime += Laya.timer.delta * 0.001;
                // console.log(this.currentStandbyTime);
                // 待机时间结束
                if (this.currentStandbyTime > this.standbyTime)
                {
                    // 重置待机时间
                    this.currentStandbyTime = 0;
                    // 设定下一次待机时间
                    this.standbyTime = 3;
                    this.StartPathFinding();
                }
                break;
            case CharacterState.PathFinding:
                if (this.isPathfindingPerform) return;

                // 已在目标点
                if (Laya.Vector3.distance(this.TargetNode, this.sprite3D.transform.position) < 0.005)
                {
                    // 进入待机状态
                    this.character.State = CharacterState.Standby;
                    return;
                }

                // 判断是否已有寻路节点
                if (this.PathNodeList == null || this.PathNodeList.length == 0)
                {
                    this.StartPathFinding();
                    return;
                }

                // 开始移动改变状态
                this.characterHandle.BeganMove();
                break;
            case CharacterState.Walk:
                // 判断是否已有寻路节点
                if (this.PathNodeList == null || this.PathNodeList.length == 0)
                {
                    this.StartPathFinding();
                    return;
                }

                // 第一次设置路径节点
                if (this.countNode == 0)
                {
                    if (this.PathNodeList != null && this.PathNodeList.length != 0)
                    {
                        this.currentNode = this.PathNodeList[0].pos.clone();
                        this.currentNode.x = -this.currentNode.x;
                        this.countNode += 1;
                    }
                }

                // 判断是否达到目标
                if (Laya.Vector3.distance(this.currentNode, this.sprite3D.transform.position) > 0.01)
                {
                    // console.log(this.currentNode);
                    // console.log(this.sprite3D.transform.position);
                    // console.log(Laya.Vector3.distance(this.currentNode, this.sprite3D.transform.position));
                    //let subtract:Laya.Vector3 = new Laya.Vector3(0,0,0);
                    // Laya.Vector3.subtract(this.sprite3D.transform.position,this.currentNode,subtract);
                    // subtract.x *= this.walkSpeed;
                    // subtract.y *= this.walkSpeed;
                    // subtract.z *= this.walkSpeed;
                    this.lerpTime += Laya.timer.delta * 0.002;
                    let t = new Laya.Vector3(0,0,0);
                    Laya.Vector3.lerp(this.sprite3D.transform.position,this.currentNode,this.lerpTime,t);
                    // console.log("向目标移动");
                    // 向目标移动
                    this.characterHandle.CharacterMove(t, false);

                    // let subtract:Laya.Vector3= new Laya.Vector3(0,0,0);
                    // Laya.Vector3.subtract(this.sprite3D.transform.position,this.currentNode,subtract);
                    // Laya.Vector3.lerp(this.sprite3D.transform.position,this.currentNode,this.lerpTime,t);
                    // // 面向下个节点
                    // this.characterHandle.CharacterTowards(new Laya.Vector2(subtract.x*0.5,subtract.z*0.5),null);
                }
                else
                {
                    this.lerpTime = 0;
                    // 设定下一个路径节点
                    if (this.countNode < this.PathNodeList.length)
                    {
                        // 设置中间节点
                        this.currentNode = this.PathNodeList[this.countNode].pos.clone();
                        this.currentNode.x = - this.currentNode.x;
                        this.countNode += 1;
                        let subtract:Laya.Vector3= new Laya.Vector3(0,0,0);
                        Laya.Vector3.subtract(this.sprite3D.transform.position,this.currentNode,subtract);
                        // 面向下个节点
                        this.characterHandle.CharacterTowards(new Laya.Vector2(subtract.x,subtract.z),null);
                    }
                    // 路径完成 && 清除数据
                    else
                    {
                        // 结束移动改变状态
                        //this.characterHandle.FinishMove();
                        // 清除路径节点
                        //this.PathNodeList =[];
                        this.PathNodeList = this.PathNodeList.reverse();
                        this.countNode = 0;
                    }
                }
                break;
        }
    }
}