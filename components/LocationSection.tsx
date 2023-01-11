import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import styled from '@emotion/styled'

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

const LocationSection = ({
  setLocation,
}: {
  setLocation: Dispatch<SetStateAction<string>>
}) => {
  const Text = ['서울', '대전', '광주', '부산']

  return (
    <>
      <QuestionText>본인 거주 지역과 가장 가까운 곳을 고르세요.</QuestionText>

      <Selectul>
        {Text.map((value, index) => (
          <Selectli key={value} onClick={() => setLocation(value)}>
            {value}
          </Selectli>
        ))}
      </Selectul>
    </>
  )
}

export default LocationSection
