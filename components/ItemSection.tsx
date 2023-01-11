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

const ItemSection = ({
  setItem,
}: {
  setItem: Dispatch<SetStateAction<string>>
}) => {
  const Text = ['빛나는 반지', '편한 후드티', '무난한 티셔츠', '시크한 모자']

  return (
    <>
      <QuestionText>절대 포기할 수 없는 패션 아이템을 고르세요.</QuestionText>

      <Selectul>
        {Text.map((value, index) => (
          <Selectli key={value} onClick={() => setItem(value)}>
            {value}
          </Selectli>
        ))}
      </Selectul>
    </>
  )
}

export default ItemSection
