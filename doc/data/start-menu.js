module.exports = {
    menus:[
        {
            title:'基础',
            links:[
                {
                    to:'/start/install',
                    text:'安装'
                },
                {
                    to:'/start',
                    text:'介绍',
                    isIndex:true,
                    anchors:['起步']
                },
                {
                    to:'/start/agreen',
                    text:'约定',
                    anchors:['坐标系','角度']
                },
                {
                    to:'/start/basic-shapes',
                    text:'基本图形',
                    anchors:'直线 矩形 圆 椭圆 多边形 折线 路径 文本 图片 内置图形'.split(/\s+/gi)
                },
                {
                    to:'/start/dom',
                    text:'图形操作',
                    anchors:['选择元素','属性','事件','描边和填充','transform变换','阵列拷贝']
                },
                {
                    to:'/start/layer',
                    text:'图层',
                    anchors:['概念','图层管理']
                }
            ]
        },
        {
            title:'进阶',
            links:[
                {
                    to:'/start/path',
                    text:'路径',
                    anchors:['标准指令','扩展指令','用法']
                },
                {
                    to:'/start/point',
                    text:'点'
                },
                {
                    to:'/start/line',
                    text:'线'
                },
                {
                    to:'/start/color',
                    text:'颜色'
                },
                {
                    to:'/start/animation',
                    text:'动画',
                    anchors:['svg动画','js动画']
                },
                {
                    to:'/start/filter',
                    text:'滤镜'
                },
                {
                    to:'/start/fill',
                    text:'渐变和填充',
                    anchors:['线性渐变','径向渐变','pattern']
                },
                {
                    to:'/start/reuse',
                    text:'复用',
                    anchors:['shape','block','symbol']
                },
                {
                    to:'/start/interpolate',
                    text:'插值、采样'
                }
            ]
        }
    ]
}