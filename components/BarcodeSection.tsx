import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import gsap from 'gsap'
import getbarcode from '../public/images/getbarcode.png'
import tapeLeft from '../public/images/tapeLeft.png'
import tapeRight from '../public/images/tapeRight.png'
import thanks from '../public/images/thanks.png'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Section = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: black;
`
const SectionOverlay = styled.div`
  z-index: 1;
  position: absolute;
  width: 100vw;
  min-height: 100vh;
`
const BackImage = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
`
const TapeLeft = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  z-index: 1;
`
const TapeRight = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  z-index: 1;
`
const Slide = styled.div`
  z-index: 2;
  width: 20rem;
  height: auto;
  position: fixed;
  margin-top: 3rem;
`
export default function BarcodeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const tapeLeftRef = useRef<HTMLDivElement>(null)
  const tapeRightRef = useRef<HTMLDivElement>(null)
  const barcodeRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)

  gsap.registerPlugin(ScrollTrigger)

  useLayoutEffect(() => {
    let Elem = sectionRef.current
    let overlayElem = overlayRef.current
    let LeftTapeElem = tapeLeftRef.current
    let RightTapeElem = tapeRightRef.current
    let BarcodeElem = barcodeRef.current
    let slideElem = slideRef.current
    //start end는 첫번째는 시작점 두번째는 시작점부터의 뷰포트
    //scrollTrigger은 start부터 end까지 scrollbar를 생성한다.
    //pin 생성된 scrollbar의 trigger을 고정시킨다.
    //fromto에서 일어나는 일은 생겨난 스크롤 동안 일어나는 변화를 감지
    //to는 순차적으로
    //fromto에서 key도 순차적으로 할 수 있음
    let t1 = gsap
      .timeline({
        scrollTrigger: {
          trigger: Elem,
          start: 'top top',
          end: `+=${Elem != null && Elem.offsetWidth + 1000}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      })
      .fromTo(
        overlayElem,
        { backgroundColor: 'rgb(0,0,0,0)', ease: 'none' },
        { backgroundColor: 'rgb(0,0,0,0.7)', ease: 'none' },
        'key1'
      )
      .fromTo(LeftTapeElem, { x: `${-Elem!.offsetWidth}` }, { x: '0' }, 'key1')
      .fromTo(RightTapeElem, { x: `${Elem!.offsetWidth}` }, { x: '0' }, 'key1')
      .fromTo(BarcodeElem, { scale: 1 }, { scale: 0.9 }, 'key1')
      .fromTo(slideElem, { y: '50%', opacity: '0' }, { y: '0', opacity: '1' }, 'key2')
    return () => {
      if (t1) t1.kill()
    }
  }, [])
  return (
    <Section ref={sectionRef}>
      <SectionOverlay ref={overlayRef} />

      <BackImage ref={barcodeRef}>
        <Image priority={false} src={getbarcode} fill alt="getbarcode" />
      </BackImage>

      <TapeLeft ref={tapeLeftRef}>
        <Image src={tapeLeft} fill alt="tapeaLeft" />
      </TapeLeft>

      <TapeRight ref={tapeRightRef}>
        <Image src={tapeRight} fill alt="tapeaRight" />
      </TapeRight>

      <Slide ref={slideRef}>
        <Image src={thanks} alt="slide" />
      </Slide>

    </Section>
  )
}
