import {SingletonCreator} from "./SingletonCreator"

/**
 * 单例s
 */
// export class Singleton<T extends Singleton<T>>
// {
//     private static instance: any = null;
//     public static get Instance(): any {
//         if (this.instance == null) {
//             this.instance = SingletonCreator.CreateSingleton<T>();
//         }
//         return this.instance;
//     }

//     public static Instance1<T>(c: { new(): T }): T {
//         if (this.instance == null) {
//             this.instance = new(T);
//         }
//         return this.instance;
//     }

//     public Update(dt: number) {

//     }
// }


export class BaseSigleton
{

    static Instance<T extends {}>(this: new () => T): T 
    { 
        if(!(<any>this)._Instance)
        {
            (<any>this)._Instance = new this(); 
        } 
        return (<any>this)._Instance; 
    }
    private static _Instance; 
}


export class BaseSigleton1
{ 
    static get i() 
    { 
        if(!this._i)
            this._i = new this();
         return this._i; 
    }
    private static _i; 
}

export function Singleton<E>() {
    class SingletonE {
        protected constructor() {}
        private static _Instance: SingletonE = null;
        public static get Instance(): E {
            if(SingletonE._Instance == null) {
                SingletonE._Instance = new this();
            }
            return SingletonE._Instance as E;
        }
    }

    return SingletonE;
}