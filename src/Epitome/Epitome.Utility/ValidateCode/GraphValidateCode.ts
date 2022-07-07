import { Tool } from "../../Extensions";

/**
 * 图形验证码
 */
 export class GraphValidateCode
 {
     /**
      * 生成一个随机色
      * @param min 
      * @param max 
      * @returns 
      */
      public  randomColor(min, max):string {
         var r = Tool.GetRandomNum(min, max);
         var g = Tool.GetRandomNum(min, max);
         var b = Tool.GetRandomNum(min, max);
         return "rgb(" + r + "," + g + "," + b + ")";
     }
 
     /**
      * 绘制验证码图片
      */
      public DrawValidateCode(sprite :Laya.Sprite,count:number):string {
        
        let graphics: Laya.Graphics = sprite.graphics;

        graphics.drawRect(0, 0,sprite.width, sprite.height,this.randomColor(180, 240));
        
        /**绘制文字**/
        let text = '';
        let str = 'ABCEFGHJKLMNPQRSTWXY123456789';
        for (let i = 0; i < count; i++) {
            let matrix:Laya.Matrix = new Laya.Matrix();
            let txt = str[Tool.GetRandomNum(0, str.length) | 0];

            let px = Tool.GetRandomNum(20, 26);

            let x = i * 20 + (sprite.width - (count -1) * 20) /2;
            let y = Tool.GetRandomNum(0, sprite.height/2);
            let deg = Tool.GetRandomNum(-20, 20);

            // // 修改旋转角度
            // matrix =  matrix.rotate(deg * Math.PI / 180);
            // matrix = graphics.transform(matrix,x,y).matrix;

            // 绘制文字
            graphics.fillText(txt,x, y,px + 'px SimHei',this.randomColor(40, 180),"center"); 
 
            // // 复原旋转角度
            // matrix =  matrix.rotate(-deg * Math.PI / 180);
            // matrix =  graphics.transform(matrix,x,y).matrix;

            // 记录验证码
            text = text + txt;
        }

        let margin:number = 3;

        /**绘制干扰线**/
        for (var i = 0; i < 4; i++) {
            graphics.drawLine(Tool.GetRandomNum(margin, sprite.width - margin), Tool.GetRandomNum(margin, sprite.height - margin), 
            Tool.GetRandomNum(margin, sprite.width-margin),Tool.GetRandomNum(margin, sprite.height-margin),this.randomColor(40, 180));
        }
        /**绘制干扰点**/
        for (var i = 0; i < 20; i++) {
            let w=Tool.GetRandomNum(margin, sprite.width- margin);
            let h= Tool.GetRandomNum(margin, sprite.height - margin);
            graphics.drawLine(w, h, w+1,h+1,this.randomColor(0, 255));
        }

        return text;
    }
}