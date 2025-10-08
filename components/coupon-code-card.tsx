import { ActivityIndicator, StyleSheet, } from 'react-native'
import React from 'react'
import { Box, Pressable, Row, Text } from '@/core'
import { shadow } from '@/constants'
import { colors } from '@/theme'
import { getCouponQuery } from '@/services/query/service'

type propsType={
  id:number,
  description:string,
  title:string
}

const CouponCodeCard = (props:propsType) => {
  const {id,description,title}=props

  const [isVisible, setIsVisible] = React.useState(false);
  const {data,isLoading,refetch,isFetching}=getCouponQuery({id:id})

  React.useEffect(() => {

    if(isVisible){
      refetch()

    }


  }, [isVisible]);


  return (
    <Box style={[
      {
        borderRadius: 8,
        // overflow: "hidden",
        marginHorizontal: 16,
        marginBottom: 20,
        backgroundColor: "#F8FAFC",
      },
      shadow,
    ]}><Row

  >
    <Box
      style={{
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: isVisible?0:8,
        width: 18,
        backgroundColor: "rgba(37, 61, 143, 1)",
      }}
    ></Box>
    <Box
      style={{
        backgroundColor: "#F8FAFC",
        padding: 16,
        paddingLeft: 10,
        flex: 1,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      }}
    >
      <Row
        style={{
          flex: 1,
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text preset="POP_16_SB" color="#333333">
        {title}
        </Text>
        <Pressable
          onPress={() => setIsVisible((prev) => !prev)}>
          <Text preset="POP_16_SB" color="#253D8F">
            View Code
          </Text>
        </Pressable>
      </Row>
      <Text preset="POP_12_R" color="rgba(51, 51, 51, 0.75)">
      {description}
      </Text>
    </Box>

  </Row>
 {isVisible&& <Box style={{backgroundColor:colors.cardBackgroundPrimary,alignItems:"center",justifyContent:"center",paddingVertical:8,  borderBottomRightRadius:8,borderTopWidth:1,borderColor:colors.textSecondaryDisable,height:40,
        borderBottomLeftRadius:8,}}>
  <Text preset='POP_14_M' color={colors.textPrimary}>
{ isFetching?  <ActivityIndicator size={14} color={colors.textPrimary} />:data?.data}
  </Text>
</Box>}
  </Box>
  )
}

export default CouponCodeCard

const styles = StyleSheet.create({})