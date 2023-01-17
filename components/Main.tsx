import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import gsap from 'gsap'
import backgroundImg from '@images/backgroundImg.png'
import getBarcodeImg from '@images/getBarcode.png'
import tapeLeft from '@images/tapeLeft.png'
import tapeRight from '@images/tapeRight.png'
import slide from '@images/slide.png'
import thanks from '@images/thanks.png'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SelectSwiper from './SelectSwiper'
import 'animate.css'

interface GetBarcodeProps {
  getBarcode: boolean
}

const Section = styled.section`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: black;
  font-family: var(--fontR);
`
const SectionOverlay = styled.div<GetBarcodeProps>`
  z-index: 2;
  position: absolute;
  width: 100vw;
  min-height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
`
const BackImage = styled.div<GetBarcodeProps>`
  width: 100vw;
  height: 100%;
  position: fixed;
  transform: ${(props) => (props.getBarcode ? 'scale(1)' : 'scale(0.9)')};
  opacity: 1;
`
const GetBarcode = styled.div`
  position: absolute;
  width: 18vw;
  height: 18vh;
  bottom: 0;
  left: 8vw;
  z-index: 2;
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

const TapeLeft = styled.div<GetBarcodeProps>`
  width: 100vw;
  height: 100%;
  position: fixed;
  z-index: ${(props) => (props.getBarcode ? '3' : '1')};
`
const TapeRight = styled.div<GetBarcodeProps>`
  width: 100vw;
  height: 100%;
  position: fixed;
  z-index: ${(props) => (props.getBarcode ? '3' : '1')};
`
const Slide = styled.div`
  z-index: 2;
  width: 20rem;
  height: auto;
  position: fixed;
  margin-top: 3rem;
`
const Thanks = styled.div`
  z-index: 2;
  width: 20rem;
  height: auto;
  position: fixed;
`
const DivInner = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  z-index: 1;
  background-color: black;
`
export default function Main() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const divInnerRef = useRef<HTMLDivElement>(null)
  const tapeLeftRef = useRef<HTMLDivElement>(null)
  const tapeRightRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const getInfoRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const barcodeRef = useRef<HTMLDivElement>(null)
  const thanksRef = useRef<HTMLDivElement>(null)
  gsap.registerPlugin(ScrollTrigger)

  const [getBarcode, setGetBarcode] = useState<boolean>(false)

  useLayoutEffect(() => {
    let Elem = sectionRef.current
    let DivElem = divInnerRef.current
    let LeftTapeElem = tapeLeftRef.current
    let RightTapeElem = tapeRightRef.current
    let SlideElem = slideRef.current
    let OverlayElem = overlayRef.current
    let GetInfoElem = getInfoRef.current
    let InnerElem = innerRef.current
    let BarcodeElem = barcodeRef.current
    let ThanksElem = thanksRef.current

    //start end는 첫번째는 시작점 두번째는 시작점부터의 뷰포트
    //scrollTrigger은 start부터 end까지 scrollbar를 생성한다.
    //pin 생성된 scrollbar의 trigger을 고정시킨다.
    //fromto에서 일어나는 일은 생겨난 스크롤 동안 일어나는 변화를 감지
    //to는 순차적으로
    //fromto에서 key도 순차적으로 할 수 있음
    if (getBarcode) {
      window.scrollTo({
        top: DivElem?.scrollTop,
      })
      setTimeout(() => {
        gsap.to(BarcodeElem, {
          width: '100vw',
          height: '100vh',
          left: '0',
        })
        BarcodeElem?.classList.add('animate__animated', 'animate__flip')
      }, 1000)

      let t2 = gsap
        .timeline({
          scrollTrigger: {
            trigger: DivElem,
            start: 'top top',
            end: `+=${DivElem != null && DivElem.offsetWidth + 1000}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        })
        .to(
          OverlayElem,
          { backgroundColor: 'rgb(0,0,0,0.5)', ease: 'none', zIndex: '3' },
          'key1'
        )
        .to(LeftTapeElem, { x: '0' }, 'key1')
        .to(RightTapeElem, { x: '0' }, 'key1')
        .to(BarcodeElem, { scale: 0.9 }, 'key1')
        .to(GetInfoElem, { opacity: '0' }, 'key1')
        .to(OverlayElem, { zIndex: '4' }, 'key2')
        .fromTo(
          ThanksElem,
          { y: '50%', opacity: '0', zIndex: '0' },
          { y: '50%', opacity: '1', zIndex: '5' },
          'key2'
        )

      return () => {
        if (t2) t2.kill()
      }
    } else {
      let t1 = gsap
        .timeline({
          scrollTrigger: {
            trigger: Elem,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            start: 'top top',
            end: '+=3500',
            anticipatePin: 1,
            markers: true
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
    }
  }, [getBarcode])

  return (
    <>
      <Section ref={sectionRef}>
        <SectionOverlay getBarcode={getBarcode} ref={overlayRef} />

        <BackImage ref={getInfoRef} getBarcode={getBarcode}>
          <Image src={backgroundImg} fill alt="backgroundImg" quality={100} />
        </BackImage>

        <TapeLeft ref={tapeLeftRef} getBarcode={getBarcode}>
          <Image src={tapeLeft} fill alt="tapeaLeft" quality={100} />
        </TapeLeft>

        <TapeRight ref={tapeRightRef} getBarcode={getBarcode}>
          <Image src={tapeRight} fill alt="tapeaRight" quality={100} />
        </TapeRight>

        <Slide ref={slideRef}>
          <Image src={slide} alt="slide" quality={100} />
        </Slide>

        <SectionInner ref={innerRef}>
          {!getBarcode && (
            <SelectSwiper
              getBarcode={getBarcode}
              setGetBarcode={setGetBarcode}
            />
          )}
        </SectionInner>

        {getBarcode && (
          <>
            <DivInner ref={divInnerRef}>
              <BackImage ref={getInfoRef} getBarcode={getBarcode}>
                <Image
                  src={backgroundImg}
                  fill
                  alt="backgroundImg"
                  quality={100}
                />
              </BackImage>
            </DivInner>
            <GetBarcode ref={barcodeRef}>
              <Image src={getBarcodeImg} fill alt="getBarcode" quality={100} />
            </GetBarcode>
            <Thanks ref={thanksRef}>
              <Image src={thanks} alt="thanks" quality={100} />
            </Thanks>
          </>
        )}
      </Section>
    </>
  )
}
