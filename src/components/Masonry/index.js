import { NativeModules } from 'react-native';
import React, { Component } from 'react';
import {
  View, StyleSheet, ScrollView, Dimensions
} from 'react-native';


export default class Masonry extends Component {

    constructor(props){
        super(props);
        this.pageSize = this.props.pageSize ? this.props.pageSize : 10;

        this.vpWidth = Dimensions.get('window').width;
        this.vpHeight = Dimensions.get('window').height;

        this.handleScroll = this.handleScroll.bind(this);
        this.logScrollViewSize = this.logScrollViewSize.bind(this);
        this.scrollViewHeight = 0;

        //add navigation
        this.navigation = this.props.navigation;

        //add await time to generate data
        this.awaitTime = true;

        this.state = {
            data: []
        };

        this.styles = StyleSheet.create({
            container: {
                width: this.vpWidth,
                flexDirection: 'row',
                justifyContent: 'center',
            }
        });

    }

    generateData(){

        const data = this.props.itemsProvider(this.pageSize);

        this.setState({
            data: [...this.state.data, ...data]
        });

    }

    async handleScroll(e){

            const { y } = e.nativeEvent.contentOffset;
            const height = this.scrollViewHeight;

            let lastScreenOffset = height - this.vpHeight * 1;
            if( y >= lastScreenOffset  && this.awaitTime){
                this.generateData(this.pageSize);
                /* setTimeout(() => this.awaitTime = true, 1000);
                this.awaitTime = false; */
            }
    }

    logScrollViewSize(width, height){
        this.scrollViewHeight = height;
    }

    componentDidMount(){

        this.generateData();

    }

    render(){
            const data = this.state.data;

            return (
                <ScrollView
                    onScroll={this.handleScroll}
                    scrollEventThrottle={1000}
                    onContentSizeChange={this.logScrollViewSize}
                    >
                     <View
                        style={this.styles.container}
                        >
                            <View>
                                {
                                    data.length ? data.slice(0, data.length / 2).map((di, i) => {
                                        return this.props.renderItem(di, i, this.navigation)
                                    }) :
                                        (<></>)
                                }
                            </View>
                            <View>
                                {
                                    data.length ? data.slice(data.length/2, data.length).map((di, i) => {
                                        return this.props.renderItem(di, i + data.length/2, this.navigation)
                                    }) : (<></>)
                                }
                            </View>
                    </View>
            </ScrollView>
        );
    }
}
