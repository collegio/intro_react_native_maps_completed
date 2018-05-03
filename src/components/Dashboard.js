import React from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_W = Dimensions.get('window').width;

class Dashboard extends React.Component {

    constructor(props) {

        super(props);

        this.THRESHOLD = SCREEN_W * 0.3;
        this.position = new Animated.ValueXY();
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gesture) => {
                this.position.setValue({x: gesture.dx, y: 0});
            },
            onPanResponderRelease: (e, gesture) => {
                
                if (gesture.dx > this.THRESHOLD) {  // swipe to the right
                    
                    // move the card off the screen
                    Animated.timing(this.position, {
                        toValue: { x: SCREEN_W*1.5, y: 0 },
                        duration: 250
                    }).start(() => this.onSwipeRight());

                } else if (gesture.dx < -this.THRESHOLD) {  // swipe to the left
                    
                    // move the card off the screen
                    Animated.timing(this.position, {
                        toValue: { x: -SCREEN_W*1.5, y: 0 },
                        duration: 250
                    }).start(() => this.onSwipeLeft());
                }
                else {
                    this.resetCard();
                }
            }
        });

        this.state = {
            curIndex: 0
        }
    }

    onSwipeRight() {
        alert("Let's get him to join the team!");

        this.updateCardIndex();            
    }

    onSwipeLeft() {
        alert("No thanks");

        this.updateCardIndex();

    }

    updateCardIndex() {
        this.setState((prevState) => {
            let curIndex = 0;
            if (prevState.curIndex < (this.props.data.length-1)) {
                curIndex = prevState.curIndex + 1;
            }

            return {
                curIndex
            }
        });

        this.position.setValue({ x: 0, y: 0 });
    }

    resetCard() {
        Animated.spring(this.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardAnimationStyle() {

        const SCREEN_W = Dimensions.get('window').width;    // Gets the screen width
        const GESTURE_WIDTH = SCREEN_W * 2;
        const rotate = this.position.x.interpolate({
            inputRange: [-GESTURE_WIDTH, 0, GESTURE_WIDTH],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...this.position.getLayout(),
            transform: [{ rotate }]
        };
    }

    renderCards() {
        return this.props.data.map((item, index) => {
            if (index === this.state.curIndex) {
                return (
                    <Animated.View 
                        key={item.id}
                        style={this.getCardAnimationStyle()}
                        {...this.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
        });
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

export default Dashboard;