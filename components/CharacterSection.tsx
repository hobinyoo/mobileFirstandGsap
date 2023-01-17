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


const CharacterSection = ({
  character,
  setCharacter,
}: {
  character: string
  setCharacter: Dispatch<SetStateAction<string>>
}) => {
  const Text = ['활동적인', '이타적인', '주목받는', '온화한']

  return (
    <Wrapper>
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
                  fill
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

export default CharacterSection
