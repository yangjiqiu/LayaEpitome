 
 
export module LayaUtility {
 
    export enum ColliderTarget {
        /** 子弹 */
        Bullet = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1,
        /** 僵尸 */
        Zombie = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2,
        /** 观察点 */
        Sentry = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3,
        /** 军人 */
        Soldier = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CHARACTERFILTER,
        /** 地形 */
        Terrain = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER,
    }
 
    /** 获取节点上的3D刚体组件 */
    export function GetRigidBodyInstance(target: Laya.Node): Laya.Rigidbody3D {
        return target.getComponent(Laya.Rigidbody3D);
    }
 
    /** 获取节点上的3D碰撞器组件 */
    export function GetPhysicsColliderInstance(target: Laya.Node): Laya.PhysicsCollider {
        return target.getComponent(Laya.PhysicsCollider);
    }
 
    /** 设置碰撞组 */
    export function SetColliderGroup(target: Laya.Rigidbody3D | Laya.PhysicsCollider, group: ColliderTarget) {
        target.collisionGroup = group;
    }
 
    /** 包含碰撞组 */
    export function CanCollideWith(target: Laya.Rigidbody3D | Laya.PhysicsCollider, ...canGroups: ColliderTarget[]) {
        let canWith: number = 0;
        for (let group of canGroups) {
            canWith = canWith | group;
        }
        target.canCollideWith = canWith;
    }
 
    /*** 排除碰撞组 */
    export function IgnoreCollision(target: Laya.Rigidbody3D | Laya.PhysicsCollider, ...ignore: ColliderTarget[]) {
        let canWith: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER;
        for (let group of ignore) {
            canWith = canWith ^ group;
        }
 
        target.canCollideWith = canWith;
    }
 
 
    /** 数值无效 */
    export const EOF = -1;
 
    /** 水平180° 全局 */
    export const Horizontal180EulerY = new Laya.Vector3(0, 180, 0);
    /** 三维向量 Up标量 */
    export const Vec3Up = new Laya.Vector3(0, 1, 0);
 
    /**角色tag枚举 */
    export enum EGameActorTag {
        Zombie = 0xf0,
        Player
    }
 
 
    /**
     * 查找子节点-助手
     * 
     * @param node 
     * 
     * @param child_name 子节点名称 ( 唯一 如果有重命名的子节点 返回找到的第一个 );
     * @return  返回找到的节点 或者 null   
     */
    export function FindChildByNameHelper(node: Laya.Node, child_name: string) {
        if (node.name == child_name)
            return node;
        const numChild = node.numChildren;
        let result: Laya.Node = null;
        for (let i = 0; i < numChild; ++i) {
            result = FindChildByNameHelper(node.getChildAt(i), child_name);
            if (result)
                break;
        }
        return result;
    }
 
    /**
     * 
     * @param target sprite 对象
     * @param color  color   0xff00  ||  "#165613"
     */
    export function SetColor(target:Laya.Sprite,color:any) {
        var arr = Laya.ColorUtils.create(color).arrColor;
        var mt = [
            arr[0], 0, 0, 0, 0, 
            0,arr[1], 0, 0, 0, 
            0, 0,arr[2], 0, 0, 
            0, 0, 0, 1, 0
        ];
        let redFilter = new Laya.ColorFilter(mt);  
        target.filters = [redFilter];
    }
              
}