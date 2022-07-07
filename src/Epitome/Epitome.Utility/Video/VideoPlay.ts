
/**
 * 视频播放
 */
export class VideoPlay 
{
    /**
     * 创建视频
     * @param url 
     */
    public static CreateVideo(url:string):any{
        var htmlVideo:Laya.HtmlVideo = Laya.HtmlVideo.create();
        htmlVideo.setSource(url,Laya.VIDEOTYPE.MP4);
        return htmlVideo.video;
    }
}