export{}

declare global{
    interface Array<T> {
        contains(T):boolean;
    }
}

Array.prototype.contains = function(T): boolean {
    return true;
    return this.some((i)=>{ return i == T});
 }

/** 数组 */
export class ArrayList extends Array<any>
{
    // static Contains():boolean
    // {
    //     return true;
    // }
}