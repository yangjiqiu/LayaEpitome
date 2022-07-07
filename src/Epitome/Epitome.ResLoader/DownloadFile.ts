
/**
 * 下载文件
 */
export class DownloadFile 
{
    private downloadFile(url:String,relativePath:String,onComplete:Handler,onError:Handler=null):void{
		
        // if(window.caches)
        // {
        //     var folder:String=window.caches.has+"/";
        //     var relativeFolder:String = folder+relativePath.substring(0,relativePath.lastIndexOf("/"));
        //     if (!window.fs_exists(relativeFolder)) {
        //         window.fs_mkdir(relativeFolder);
        //     }
     
        //     var cachepath:String = folder+relativePath;
        //     //判断文件是否存在
        //     if (window.fs_exists(cachepath)) {
        //         onComplete && onComplete.runWith("file://"+cachepath.replace(new RegExp('//','g'),"/"));
        //         return;
        //     }
        
        //     var f:* = new window.conch_File(url);
        //         var fr:* = new window.conch_FileReader();
        //     fr.setIgnoreError(true);
        //     fr.onload = function():void {
        //         if(fr.result){
        //             window.fs_writeFileSync(cachepath, fr.result);
        //             onComplete && onComplete.runWith("file://"+cachepath.replace(new RegExp('//','g'),"/"));
        //         }
        //         else
        //         {
        //             onError && onError.runWith("no data");
        //         }
        //     };
        //     // fr.onprogress = onprog;
        //     fr.onerror = function(e):void{ 
        //         onError && onError.runWith(e);
        //     };
        //     fr.readAsArrayBuffer(f);
        // }
        // else
        // {
        //     onComplete && onComplete.runWith(url);
        // }
    }

    private downloadFile1(url:String,onComplete:Handler,onError:Handler=null):void{
        // if(window.conch)
        // {
        //     var folder:String=window.conch.getCachePath()+"/download/";
        //     if (!window.fs_exists(folder)) {
        //         window.fs_mkdir(folder);
        //     }
    
        //     var fileName:String = url.replace("http","").replace(/:/g,"").replace(new RegExp('/','g'),"_");
        //     var cachepath:String = folder+fileName;
        //     //判断文件是否存在
        //     if (window.fs_exists(cachepath)) {
        //         onComplete && onComplete.runWith(cachepath);
        //         return;
        //     }
        
        //     var f:* = new window.conch_File(url);
        //        var fr:* = new window.conch_FileReader();
        //     fr.setIgnoreError(true);
        //     fr.onload = function():void {
        //         if(fr.result){
        //             window.fs_writeFileSync(cachepath, fr.result);
        //             onComplete && onComplete.runWith(cachepath);
        //         }
        //         else
        //         {
        //             onError && onError.runWith("no data");
        //         }
        //     };
        //     // fr.onprogress = onprog;
        //     fr.onerror = function(e):void{ 
        //         onError && onError.runWith(e);
        //     };
        //     fr.readAsArrayBuffer(f);
        // }
        // else
        // {
        //     onComplete && onComplete.runWith(url);
        // }
    }
}