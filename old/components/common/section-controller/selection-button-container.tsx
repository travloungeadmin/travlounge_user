import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { scale } from '@/lib/responsive-dimensions'

type PropsType={
    onPress:()=>void,
    isSelected:boolean,

}

const SelectionButtonContainer = (props:PropsType) => {
    const { onPress, isSelected,children } = props
    return (
        <Pressable onPress={onPress}>
            {isSelected ? <LinearGradient
                colors={["#6481DF", "#243E92"]}
                start={[0, 0.5]}
                end={[1, 1]}
                style={[
                    {
                        height: scale(36),
                        justifyContent: "center",
                        borderRadius: scale(10),
                        paddingHorizontal: scale(10),
                        borderWidth: 0,
                        minWidth: scale(60),
                        alignItems: "center",
                    },
                ]}
            >
                {children}
            </LinearGradient>
                : <View style={{
                    backgroundColor: "#DDE0E5",
                    height: scale(36),
                    justifyContent: "center",
                    borderRadius: scale(10),
                    paddingHorizontal: scale(10),
                    borderWidth: 0,
                    minWidth: scale(60),
                    alignItems: "center",
                }}>
                    {children}
                </View>

            }
        </Pressable>
    )
}

export default SelectionButtonContainer

const styles = StyleSheet.create({})