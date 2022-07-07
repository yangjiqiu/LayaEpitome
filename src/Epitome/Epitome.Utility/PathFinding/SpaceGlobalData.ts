
/** 空间全局数据 */
export class SpaceGlobalData
{
    /** 空间单位 */
    public static spaceUnit:number = 0.05;   // 数字0.8最好，数值0.1以上地图数值太多，肉眼可见问题偏移。

    /** 场景模型比例 = 器材真实比例  * scalingRatio（场景模型 比例 200cm：1单位） */
    public static scalingRatio:number = 0.005;
}