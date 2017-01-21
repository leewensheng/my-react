import paper from './paper'
import Point from './point'
import Path from './path'

paper.fn.extend({
    setViewBox:function(x,y,width,height,fit) {
        var a = [x,y,width,height];
        this.svg.attr("viewBox",a.join(" "));
        return this;
    },
    line:function(x1,y1,x2,y2){
        return this.append("line",{
            x1:x1,
            y1:y1,
            x2:x2,
            y2:y2
        });
    },
    angleLine:function(x,y,angle,len){
        var x2 = x + len*Math.cos(angle*Math.PI/180);
        var y2 = y + len*Math.sin(angle*Math.PI/180);
        return this.append("line",{
            x1:x,
            y1:y,
            x2:x2,
            y2:y2
        });
    },
    circle:function(cx,cy,r){
        return this.append("circle",{
            cx:cx,
            cy:cy,
            r:r
        });
    },
    circumCircle:function(points){

    },
    ellipse:function(cx,cy,rx,ry){
        return this.append("ellipse",{
            cx:cx,
            cy:cy,
            rx:rx,
            ry:ry
        })
    },
    diagonalEllipse:function(x1,y1,x2,y2){
        var minx,miny,maxx,maxy,cx,cy,rx,ry;
        minx = Math.min(x1,x2);
        miny = Math.min(y1,y2);
        maxx = Math.max(x1,x2);
        maxy = Math.max(y1,y2);
        rx = (maxx - minx)/2;
        ry = (maxy - miny)/2;
        cx = (x1+x2)/2;
        cy = (y1+y2)/2;
        return this.ellipse(cx,cy,rx,ry);
    },
    textPath:function(dom,id){
        var elem = this.createSVGElement("textPath");
        id&&elem.attr("xlink:href","#"+id);
        dom.append(elem);
        return elem;
    },
    text:function(x,y,content,option){
        option = paper.extend({
            fontSize:14,
            align:"left",
            baseline:"top",
            rotate:0,
            fontWeight:"normal"
        },option);
        var fontSize = option.fontSize,
            align = option.align,
            baseline = option.baseline,
            rotate = option.rotate,
            fontWeight = option.fontWeight;

        var elem = this.append("text",{stroke:"none"});
        elem.attr('x',x);
        elem.attr("font-size",fontSize);
        elem.attr('rotate',rotate);
        elem.attr("font-weight",fontWeight);
        if(option.color) {
            elem.attr("fill",option.color);
        }
        if(align=="left"||align =="start") {
            elem.attr("text-anchor",'start');
        } else if(align == "center"||align=="middle") {
            elem.attr("text-anchor",'middle');
        } else {
            elem.attr("text-anchor",'end');
        }
        if(baseline == "top") {
            elem.attr('y',y + 0.65*fontSize);
        } else if(baseline == "middle") {
            elem.attr('y',y + fontSize/2-0.15*fontSize);
        } else {
            elem.attr("y",y - 0.15*fontSize);
        }
        return elem.text(content);
    },
    rect:function(x,y,width,height,rx,ry){
        if(rx >= 0 &&!typeof ry == 'undefined') {
            ry = rx;
        }
        return this.append("rect",{
            x:x,
            y:y,
            width:width||0,
            height:height||0,
            rx:rx||0,
            ry:ry||0
        })
    },
    diagonalRect:function(x1,y1,x2,y2,rx,ry){
        var minx = Math.min(x1,x2);
        var miny = Math.min(y1,y2);
        var maxx = Math.max(x1,x2);
        var maxy = Math.max(y1,y2);
        var width = maxx - minx;
        var height = maxy - miny;
        if(rx>=0 && typeof ry == 'undefined') {
            ry = rx;
        }
        return this.append("rect",{
            x:minx,
            y:miny,
            width:width,
            height:height,
            rx:rx||0,
            ry:ry||0
        })
    } ,
    arc:function(cx,cy,radius,startAngle,endAngle,counterclockwise){
        var path = new cad.Path();
        path.arc(cx,cy,radius,startAngle,endAngle,counterclockwise);
        return this.path(path.toString());
    },
    path:function(path){
        if(typeof path == 'object') {
            path = path.toString();
        }
        return this.append("path",{d:path});
    },
    polygon:function(points){
        if(points instanceof Array) {
            var p = points.map(function(val){
                return val.x +","+ val.y;
            })
            return this.append("polygon").attr("points",p.join(" "));
        } else {
            return this.append("polygon");
        }
    },
    polyline:function(points){
        var p = points.map(function(val){
            return val.x +","+ val.y;
        })
        return this.append("polyline").attr("points",p.join(" "));
    },
    spline:function(points){
        var path = new Path().CurveToAll(points,true);
        return this.append("path").attr('d',path.toString())
    },
    sector:function(cx,cy,radius,startAngle,endAngle,innerRadius){
        return this.addShape("sector",cx,cy,{
            startAngle:startAngle,
            endAngle:endAngle,
            radius:radius,
            innerRadius:innerRadius
        })
    },
    image:function(x,y,width,height,url){
        return this.append("image",{
            "xlink:href":url,
            "src":url,
            "x":x,
            "y":y,
            "width":width,
            "height":height
        });
    },
    diagonalImage:function(x1,y1,x2,y2,url) {
        var minx = Math.min(x1,x2);
        var miny = Math.min(y1,y2);
        var maxx = Math.max(x1,x2);
        var maxy = Math.max(y1,y2);
        var width = maxx - minx;
        var height = maxy - miny;
        return this.append("image",{
            "xlink:href":url,
            "src":url,
            "x":minx,
            "y":miny,
            "width":width,
            "height":height
        })
    },
    title:function(text){
        return this.append("title").text(text);
    },
    use:function(id,x,y,width,height){
        return this.append("use",{
            "xlink:href":"#"+id,
            "x":x,
            "y":y,
            "width":width,
            "height":height
        });
    },
    g:function(){
        return this.append("g");
    }
})