import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'

type propsType = {
   from:any,
   to:any
}

const CustomMarkers = (props:propsType) => {
    const {from,to} = props

    const fromCoordinate={
        latitude: from?.latitude,
        longitude:from?.longitude
    }

    const toCoordinate={
        latitude: to?.latitude,
        longitude:to?.longitude
    }
  return (
   <>
       <Marker
            focusable
            coordinate={fromCoordinate}
          />
            <Marker
                focusable
                coordinate={toCoordinate}
            />
   </>
  )
}

export default CustomMarkers

const styles = StyleSheet.create({})