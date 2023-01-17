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
  width: 90%;
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

const LocationSection = ({
  location,
  setLocation,
}: {
  location: string
  setLocation: Dispatch<SetStateAction<string>>
}) => {
  const Text = ['서울', '대전', '광주', '부산']

  return (
    <Wrapper>
      <QuestionText>본인 거주 지역과 가장 가까운 곳을 고르세요.</QuestionText>

      <Selectul>
        {Text.map((value, index) => (
          <Selectli
            key={value}
            onClick={() => {
              setLocation(value)
            }}
          >
            <TextInfo>{value}</TextInfo>
            {location != value ? (
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
    </Wrapper>
  )
}

export default LocationSection
