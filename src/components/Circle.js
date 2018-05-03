import React from 'react';
import { View, Animated } from 'react-native';

class Circle extends React.Component {

    componentWillMount() {

        this.position = new Animated.ValueXY(0, 0);

        Animated.spring(this.position, {
            toValue: { x: 0, y: 500 }
        }).start();
    }

    render() {
        return (
            <Animated.View style={this.position.getLayout()}>
                <View style={styles.circleStyle} />
            </Animated.View>
        );
    }
}

const styles = {
    circleStyle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'red'
    }
}

export default Circle;