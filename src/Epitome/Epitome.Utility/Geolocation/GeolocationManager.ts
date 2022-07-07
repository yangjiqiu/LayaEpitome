import { Singleton } from "../../Common/SingletonModel";

// import { Singleton } from "../../Common/SingletonModel";
// loadLib("libs/laya.bdmini.js"); 

/**
 * 地理定位
 */
 export class GeolocationManager extends Singleton<GeolocationManager>()
 {
    // // 尝试获取当前位置
    // Laya.Geolocation.getCurrentPosition(Laya.Handler.create(this, onSuccess), Laya.Handler.create(this, onError));
    
    // 成功获取位置后触发
    // onSuccess(position):void{
    //     var text = '经纬度:(' + position.longitude + '°,' + position.latitude + '°),\r\n精度:'+position.accuracy + 'm';
        
    //     if(position.altitude != null){
    //         text += "\r\n海拔:"+ position.altitude + 'm' + (position.altitudeAccuracy != null ? (',精度:' + position.altitudeAccuracy + 'm') : '');
    //     }
    //     if(position.heading != null && !isNaN(position.heading)){
    //         text += '\r\n方向:' + position.heading + "°";    
    //     }
    //     if(position.speed != null && !isNaN(position.speed)){
    //         text += '速度:' + position.speed + "m/s";
    //     }
    //     console.log(text);
    // }
 
    // // 获取位置失败后触发
    // onError(err):void {
    //     var errType;
    //     if (err.code = Geolocation.PERMISSION_DENIED){
    //     errType = "Permission Denied";
    //     } else if (err.code == Geolocation.POSITION_UNAVAILABLE){
    //     errType = "Position Unavailable";
    //     } else if (err.code == Geolocation.TIMEOUT){
    //     errType = "Time Out";
    //     }
    //     infoText.text = 'ERROR(' + errType + '): ' + err.message;
    //     }
    // }
}