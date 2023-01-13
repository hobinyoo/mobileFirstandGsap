import React, { Dispatch, SetStateAction } from 'react'
import styled from '@emotion/styled'
import selectInfoImg from '@images/selectInfo.png'
import selectedInfoImg from '@images/selectedInfo.png'
import Image from 'next/image'
import { useState } from 'react'
const QuestionText = styled.div`
  font-size: var(--fontsm);
  text-align: center;
  width: 90%;
  margin: auto;
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
  position: relative;
`
const TextInfo = styled.p`
  position: absolute;
  margin-left: 8vw;
`

const ImageWrapper = styled.div`
  position: relative;
  width: 65vw;
  height: 6vh;
  z-index: -1;
`

const CharacterSection = ({
  character,
  setCharacter,
}: {
  character: string
  setCharacter: Dispatch<SetStateAction<string>>
}) => {
  const Text = ['활동적인', '이타적인', '주목받는', '온화한']

  return (
    <>
      <QuestionText>
        다음 중 자신을 잘 나타낸다고 생각되는 단어를 고르세요.
      </QuestionText>

      <Selectul>
        {Text.map((value, index) => (
          <Selectli
            key={value}
            onClick={() => {
              setCharacter(value)
            }}
          >
            <TextInfo>{value}</TextInfo>
            {character != value ? (
              <ImageWrapper>
                <Image
                  priority
                  src={selectInfoImg}
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  alt="selectInfo"
                />
              </ImageWrapper>
            ) : (
              <ImageWrapper>
                <Image
                  priority
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  src={selectedInfoImg}
                  sizes="100%"
                  alt="selectedInfo"
                />
              </ImageWrapper>
            )}
          </Selectli>
        ))}
      </Selectul>
    </>
  )
}

export default CharacterSection
