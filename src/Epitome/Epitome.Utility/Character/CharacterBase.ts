
/** 角色类型 */
export enum CharacterType 
{
    /** 非玩家角色 */
    NonPlayerCharacter = "NonPlayerCharacter",

    /** 玩家角色 */
    PlayerCharacter = "PlayerCharacter",
}

/** 角色状态 */
export enum CharacterState
{
    /** 待机 */
    Standby = "Standby",
    /** 寻路 */
    PathFinding = "PathFinding",
    /** 行走 */
    Walk = "Walk",
    /** 受力 */
    Force = "Force",
    /** 占据 */
    Occupy = "Occupy",
}

/** 角色接口 */
export interface ICharacter
{
    /** 角色类型 */
    characterType:CharacterType;

    /** 角色状态 */
    State:CharacterState;
}


/**
 * 角色基类
 */
 export class CharacterBase extends Laya.Script implements ICharacter
 {
    public State: CharacterState;
    public characterType:CharacterType;

    public gameobject:Laya.Sprite3D;
    /**
     * 角色节点
     */
    public character:Laya.Sprite3D;
    /**
     * 模型节点
     */
    public model:Laya.Sprite3D;

    public init(game:Laya.Sprite3D):void
    {
        this.gameobject = game;
        this.character  = game;

        // 获取模型节点
        this.model = this.character.getChildByName(this.character.name).getChildByName("Model") as Laya.Sprite3D;
    }
 }