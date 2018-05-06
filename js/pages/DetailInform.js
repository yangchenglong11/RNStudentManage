import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {isAndroid, screenScaleWidth} from "../util/system";

const WIDTH = screenScaleWidth;
const HEIGHT = screenScaleWidth;
export default class DetailInformPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title_view}>
                    <Text style={styles.title_text}>
                        通知详情
                    </Text>
                </View>
                <View style={styles.source_view}>
                    <Text style={styles.source_text}>
                        四小时前
                    </Text>
                </View>
                <Text style={styles.content_title_text}>
                    班级管理制度
                </Text>
                <Text style={styles.content_text}>
                    为了营造我班更好的学习氛围，创造一个公平公正的班级风气，也为我班以后评优评先提供更好的评断依据。特制定了一道关于学生学习、活动方面奖惩制度。该制度采用计分制，每人每学期的基础分为10fen.具体执行内容如下：
                    一、学习条例
                    1.积极参加学校组织的学习方面的竞赛活动者加1分。根据赛后的成绩以及为班级争得的荣誉加2-3分。
                    2、上课积极活跃，主动配合老师者加1分。
                    3、无故旷课及未出示标准请假条者扣2分。
                    4、迟到早退者扣1分。
                    5、影响课堂记律及班级同学者扣2分。
                    6、故意拖欠或不交课后作业者扣1分。
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title_view:{
        marginTop: isAndroid() ? HEIGHT(30) : HEIGHT(90),
        flexDirection:'row',
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#27b5ee',
    },
    title_text:{
        color:'white',
        fontSize:22,
        textAlign:'center'
    },
    source_view:{
        flexDirection:'row',
        height:20,
        marginTop:10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'white',
    },
    source_text:{
        color:'#b1b1b1',
        fontSize:14,
        marginLeft:25,
        marginRight:25,
        textAlign:'center'
    },
    content_title_text:{
        color:'#343434',
        fontSize:20,
        marginTop:8,
        marginLeft:25,
        marginRight:25,
        textAlign:'left'
    },
    content_text:{
        color:'#b2b2b2',
        fontSize:16,
        marginTop:12,
        marginLeft:25,
        marginRight:25,
        textAlign:'left'
    },
});
