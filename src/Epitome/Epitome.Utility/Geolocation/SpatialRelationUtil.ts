
export class LatLng
{
    lat:number; 
    lng:number;

    constructor(lat:number,lng:number)
    {
        this.lat = lat;
        this.lng = lng;
    }
}

export class SpatialRelationUtil {

    /**
     * 返回一个点是否在一个多边形区域内（推荐）
     *
     * @param mPoints 多边形坐标点列表
     * @param point   待判断点
     * @return true 多边形包含这个点,false 多边形未包含这个点。
     */
    public static isPolygonContainsPoint1(pts:LatLng[], point:LatLng):Boolean {
        var N = pts.length;  //pts [{lat:xxx,lng:xxx},{lat:xxx,lng:xxx}]
        var boundOrVertex = true; //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true
        var intersectCount = 0;//cross points count of x
        var precision = 2e-10; //浮点类型计算时候与0比较时候的容差
        var p1, p2;//neighbour bound vertices
        var p = point; //point {lat:xxx,lng:xxx}

        p1 = pts[0];//left vertex
        for(var i = 1; i <= N; ++i){//check all rays
            if((p.lat==p1.lat)&&(p.lng==p1.lng)){
               return boundOrVertex;//p is an vertex
            }
            p2 = pts[i % N];//right vertex
            if(p.lat < Math.min(p1.lat, p2.lat) || p.lat > Math.max(p1.lat, p2.lat)){//ray is outside of our interests
               p1 = p2;
               continue;//next ray left point
            }
            if(p.lat > Math.min(p1.lat, p2.lat) && p.lat < Math.max(p1.lat, p2.lat)){//ray is crossing over by the algorithm (common part of)
                if(p.lng <= Math.max(p1.lng, p2.lng)){//x is before of ray
                   if(p1.lat == p2.lat && p.lng >= Math.min(p1.lng, p2.lng)){//overlies on a horizontal ray
                        return boundOrVertex;
                   }
                   if(p1.lng == p2.lng){//ray is vertical
                      if(p1.lng == p.lng){//overlies on a vertical ray
                           return boundOrVertex;
                       }else{//before ray
                          ++intersectCount;
                       }
                   }else{//cross point on the left side
                        var xinters = (p.lat - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat) + p1.lng;//cross point of lng
                        if(Math.abs(p.lng - xinters) < precision){//overlies on a ray
                            return boundOrVertex;
                        }
                        if(p.lng < xinters){//before ray
                           ++intersectCount;
                        }
                   }
                }
            }else{//special case when ray is crossing through the vertex
                if(p.lat == p2.lat && p.lng <= p2.lng){//p crossing over p2
                    var p3 = pts[(i+1) % N]; //next vertex
                    if(p.lat >= Math.min(p1.lat, p3.lat) && p.lat <= Math.max(p1.lat, p3.lat)){//p.lat lies between p1.lat & p3.lat
                        ++intersectCount;
                    }else{
                        intersectCount += 2;
                    }
                }
             }
             p1 = p2;//next ray left point
        }
        if(intersectCount % 2 == 0){//偶数在多边形外
           return false;
        } else { //奇数在多边形内
           return true;
        }
    }
}