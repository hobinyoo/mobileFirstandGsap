import React, { Dispatch, SetStateAction } from 'react'
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

const CharacterSection = ({
  setCharacter,
}: {
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
          <Selectli key={value} onClick={() => setCharacter(value)}>
            {value}
          </Selectli>
        ))}
      </Selectul>
    </>
  )
}

export default CharacterSection
