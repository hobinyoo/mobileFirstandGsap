import React, { Dispatch, SetStateAction } from 'react'
import styled from '@emotion/styled'
import selectInfoImg from '@images/selectInfo.png'
import selectedInfoImg from '@images/selectedInfo.png'
import Image from 'next/image'
import { useState } from 'react'
const QuestionText = styled.div`
  font-size: var(--fontsm);
  width: 80%;
  margin: auto;
  text-align: center;
`
const Selectul = styled.ul`
  margin-top: 3vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Selectli = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
  position: relative;
`
const TextInfo = styled.p`
  position: absolute;
  margin-left: 8vw;
`

const ItemSection = ({
  item,
  setItem,
}: {
  item: string
  setItem: Dispatch<SetStateAction<string>>
}) => {
  const Text = ['빛나는 반지', '편한 후드티', '무난한 티셔츠', '시크한 모자']

  return (
    <>
      <QuestionText>절대 포기할 수 없는 패션 아이템을 고르세요.</QuestionText>

      <Selectul>
        {Text.map((value, index) => (
          <Selectli
            key={value}
            onClick={() => {
              setItem(value)
            }}
          >
            <TextInfo>{value}</TextInfo>
            {item != value ? (
              <Image src={selectInfoImg} sizes="100%" alt="selectInfo" />
            ) : (
              <Image src={selectedInfoImg} sizes="100%" alt="selectedInfo" />
            )}
          </Selectli>
        ))}
      </Selectul>
    </>
  )
}

export default ItemSection
