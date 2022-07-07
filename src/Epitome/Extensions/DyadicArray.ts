
/** 二维数组 */
export class DyadicArray<T>
{
    private my2DArray : Array<Array<T>> = new Array<Array<T>>();
    private rows :number;
    private columns :number;
 
    /** 初始化数组 */
    public constructor(rows:number,columns:number,value:T){
        this.rows = rows;
        this.columns = columns;
        this.initRows(rows);
        this.initColumns(columns,value);
    }
    
    
    /** 取数组中的值 */
    public getValue(rows:number,columns:number):T{
        if(rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns){
            return null;
        }
        return this.my2DArray[rows][columns];
    }

    /** 为数组赋值 */
    public setValue(rows:number,columns:number,value:T):void{
        if(rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns){
            return ;
        }
        this.my2DArray[rows][columns] = value;
    }
    
    /** 初始化行数 */
    private initRows(rows:number):void{
        if(rows < 1) {
            return;
        }
        for(let i = 0 ; i < rows ; i ++){
            this.my2DArray.push(new Array<T>());
        }
    }
    
    /** 初始化列数 */
    private initColumns(columns:number,value:T):void{
        if(columns < 1){
            return;
        }
        for(let i = 0 ; i < this.my2DArray.length ; i ++){
            for(let j = 0 ; j < columns ; j ++){
                this.my2DArray[i].push(value);
            }
        }
    }
    
    /** 获取数组 */
    public getArray():Array<Array<T>>{
        return this.my2DArray;
    }

    length(){}

    shape(): number[] {
        // 矩阵的长度就是矩阵的行数，矩阵中每个向量的维度就是其列数都相等，所以取其第0号元素的作为列数
        return [this.my2DArray.length, this.my2DArray[0].length];
    }

    /** 获取行数 */
    get rowLength(): number {
        return this.shape()[0];
    }

    /** 获取列数 */
    get columnLength(): number {
        return this.shape()[1];
    }
}
type Length<T extends any> = T extends DyadicArray<any> ? T["length"] : never