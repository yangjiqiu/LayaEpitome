
/**
 * 单例创建
 */
export class SingletonCreator
{
    public static CreateSingleton<T>():T 
    {
        // 获取私有构造函数
        // var ctors = typeof(T).GetConstructors(BindingFlags.Instance | BindingFlags.NonPublic);


        // T.
        // // 获取无参构造函数
        // var ctor = Array.Find(ctors, a => a.GetParameters().Length == 0);

        // if (ctor == null)
        // {
        //     throw new SingletonException("Non-Public Constructor() not found! in " + typeof(T));
        // }

        // T value = ctor.Invoke(null) as T;

        // value.OnSingletonInit();

        return null;
    }
    public CreateSingleton1(){}
}