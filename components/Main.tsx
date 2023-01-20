import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import gsap from 'gsap'
import backgroundImg from '@images/backgroundImg.png'
import tapeLeft from '@images/tapeLeft.png'
import tapeRight from '@images/tapeRight.png'
import slide from '@images/slide.png'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import 'animate.css'
import SelectSwiper from '@components/SelectSwiper'

const Section = styled.section`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  position: relative;
  overscroll-behavior: contain;
  font-family: var(--fontR);
`
const BackImage = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  transform: scale(0.9);
  opacity: 1;
`
const SectionOverlay = styled.div`
  z-index: 2;
  position: absolute;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgb(0, 0, 0, 0.5);
`
const SectionInner = styled.div`
  z-index: 1;
  position: absolute;
  width: 70vw;
  min-height: var(--vh, 1vh) * 50;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--fontR);
  opacity: 0;
`

const TapeLeft = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  z-index: 1;
`
const TapeRight = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
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

export default function Main() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const tapeLeftRef = useRef<HTMLDivElement>(null)
  const tapeRightRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const getInfoRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    let Elem = sectionRef.current
    let startY = 0

    //터치가 맨위 일
    Elem?.addEventListener(
      'touchstart',
      function (e: any) {
        startY = e.changedTouches[0].pageY
      },
      false
    )

    Elem?.addEventListener(
      'touchmove',
      function (e: any) {
        var currentY = e.changedTouches[0].pageY
        if (sectionRef.current?.scrollTop! <= 0 && startY <= currentY) {
          if (currentY < 2000) {
            e.preventDefault()
            return false
          }
        }
      },
      false
    )
  })

  useLayoutEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    let Elem = sectionRef.current
    let LeftTapeElem = tapeLeftRef.current
    let RightTapeElem = tapeRightRef.current
    let SlideElem = slideRef.current
    let OverlayElem = overlayRef.current
    let GetInfoElem = getInfoRef.current
    let InnerElem = innerRef.current

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
          scrub: 1,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          end: '+=2000',
        },
      })
      .to(SlideElem, { y: '50%', opacity: '0', zIndex: '0' }, 'key1')
      .to(OverlayElem, { zIndex: '1' }, 'key1')
      .to(LeftTapeElem, { x: `${-Elem!.offsetWidth}` }, 'key2')
      .to(RightTapeElem, { x: `${Elem!.offsetWidth}` }, 'key2')
      .to(InnerElem, { opacity: 1 }, 'key2')
      .to(
        OverlayElem,
        { backgroundColor: 'rgb(0,0,0,0)', ease: 'none' },
        'key2'
      )
      .to(GetInfoElem, { scale: 1 }, 'key2')

    return () => {
      if (t1) t1.kill()
    }
  }, [])

  return (
    <Section ref={sectionRef}>
      <SectionOverlay ref={overlayRef} />
      <TapeLeft ref={tapeLeftRef}>
        <Image src={tapeLeft} fill alt="tapeaLeft" quality={100} />
      </TapeLeft>

      <TapeRight ref={tapeRightRef}>
        <Image src={tapeRight} fill alt="tapeaRight" quality={100} />
      </TapeRight>

      <Slide ref={slideRef}>
        <Image src={slide} alt="slide" quality={100} />
      </Slide>

      <SectionInner ref={innerRef}>
        <SelectSwiper />
      </SectionInner>

      <BackImage ref={getInfoRef}>
        <Image src={backgroundImg} fill alt="backgroundImg" quality={100} />
      </BackImage>
    </Section>
  )
}
