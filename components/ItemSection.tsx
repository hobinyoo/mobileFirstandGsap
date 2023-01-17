import React, { Dispatch, SetStateAction } from 'react'
import styled from '@emotion/styled'
import selectInfoImg from '@images/selectInfo.png'
import selectedInfoImg from '@images/selectedInfo.png'
import Image from 'next/image'
import { useState } from 'react'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
const QuestionText = styled.div`
  font-size: var(--fontsm);
  width: 80%;
  margin: auto;
  text-align: center;
`
const Selectul = styled.ul`
  margin-top: calc(var(--vh, 1vh) * 2);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Selectli = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  width: 65vw;
  height: calc(var(--vh, 1vh) * 6);
  margin-bottom: calc(var(--vh, 1vh) * 1);
`
const TextInfo = styled.p`
  position: absolute;
  margin-left: 8vw;
  z-index: 1;
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
    <Wrapper>
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
              <Image
                priority
                src={selectInfoImg}
                fill
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                alt="selectInfo"
              />
            ) : (
              <Image
                priority
                src={selectedInfoImg}
                fill
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                alt="selectedInfo"
              />
            )}
          </Selectli>
        ))}
      </Selectul>
    </Wrapper>
  )
}

export default ItemSection
