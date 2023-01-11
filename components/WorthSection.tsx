import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import gsap from 'gsap'
import backgroundImg from '../public/images/backgroundImg.png'

const QuestionText = styled.div`
  font-size: var(--fontsm);
  text-align: center;
  width: 70vw;
`
const Selectul = styled.ul`
  margin-top: 5vh;
`
const Selectli = styled.li`
  width: 70vw;
  height: 10vw;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WorthSection = ({
  setWorth,
}: {
  setWorth: Dispatch<SetStateAction<string>>
}) => {
  const Text = ['가족', '일', '외모', '재력']

  return (
    <>
      <QuestionText>가장 중요하게 생각하는 가치를 고르세요.</QuestionText>

      <Selectul>
        {Text.map((value, index) => (
          <Selectli key={value} onClick={() => setWorth(value)}>
            {value}
          </Selectli>
        ))}
      </Selectul>
    </>
  )
}

export default WorthSection
