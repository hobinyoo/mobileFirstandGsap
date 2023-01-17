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
  text-align: center;
  width: 80%;
  margin: auto;
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
  z-index: -1;
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
    <>
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
                fill
                priority
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                src={selectInfoImg}
                sizes="100%"
                alt="selectInfo"
              />
            ) : (
              <Image
                fill
                priority
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                src={selectedInfoImg}
                sizes="100%"
                alt="selectedInfo"
              />
            )}
          </Selectli>
        ))}
      </Selectul>
    </>
  )
}

export default WorthSection
