import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

type PropsType = {
    onSelect: (selectedItem?:any, index?:number) => void
}

const DropList = (props: PropsType) => {
    const { onSelect } = props
    const emojisWithIcons = [
        { title: 2 },
        { title: 4 },
        { title: 10 },
        { title: 20 },
        { title: 50 },
        { title: 100 },
    ];

    return (


        <SelectDropdown
            data={emojisWithIcons}
            onSelect={(selectedItem, index) => {
                onSelect(selectedItem.title, index)
            }}
            renderButton={(selectedItem, isOpen) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && `${selectedItem.title} km radius`) || '2 km radius'}
                        </Text>
                        <FontAwesome name={isOpen ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View
                        style={{
                            ...styles.dropdownItemStyle,
                            ...(isSelected && { backgroundColor: '#D2D9DF' }),
                        }}>
                        <Text style={styles.dropdownItemTxtStyle}>{`${item.title} km radius`}</Text>
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
    );
};

export default DropList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 100,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 90,
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 90,
        backgroundColor: '#E9ECEF',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 16,
    },
    headerTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#151E26',
    },
    dropdownButtonStyle: {
        width: 200,
        height: 45,
        backgroundColor: "#DDE0E5",
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 18,
    },
    dropdownButtonIconStyle: {
        fontSize: 18,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});