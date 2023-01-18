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

const WorthSection = ({
  worth,
  setWorth,
}: {
  worth: string
  setWorth: Dispatch<SetStateAction<string>>
}) => {
  const Text = ['가족', '일', '외모', '재력']

  return (
    <Wrapper>
      <QuestionText>가장 중요하게 생각하는 가치를 고르세요.</QuestionText>

      <Selectul>
        {Text.map((value, index) => (
          <Selectli
            key={value}
            onClick={() => {
              setWorth(value)
            }}
          >
            <TextInfo>{value}</TextInfo>
            {worth != value ? (
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

export default WorthSection
