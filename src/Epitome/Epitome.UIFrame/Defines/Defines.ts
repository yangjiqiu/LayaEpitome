
/**
 * UI节点类型
 */
export enum UINodeType
{
    /**
     * 普通窗体节点
     */
    NormalNode,
    /**
     * 固定窗体节点
     */
    FixedNode,
    /**
    * 弹出窗体节点
    */
    PopUpNode,
    /**
    * 提示窗体节点
    */
    TipNode,
}

/**
 * UI遮罩类型
 */
export enum UIMaskType
{
    /**
     * 完全透明，不能穿透
     */
    Lucency,          
    /**
     * 半透明，不能穿透
     */
    Translucence,    
    /**
     * 低透明，不能穿透
     */
    ImPenetrable,      
    /**
     * 可以穿透
     */
    Pentrate,
}