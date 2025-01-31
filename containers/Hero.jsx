"use client"

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

const Hero = () => {
    const theme = useTheme();
    const [videoSrc, setVideoSrc] = useState('')

    const componentDidMount = () => {
        if (window.innerWidth < 450) {
            setVideoSrc(smallHeroVideo)
        } else {
            setVideoSrc(heroVideo)
        }
    }

    useEffect(() => {
        componentDidMount()
        window.addEventListener('resize', componentDidMount);

        return () => {
            window.removeEventListener('reisze', componentDidMount)
        }
    }, [])

    useGSAP(() => {
        gsap.to('#hero', { opacity: 1, delay: 2 })
        gsap.to('#cta', { opacity: 1, y: -50, delay: 3 })
    }, [])

    return (
        <section className={`w-full nav-heigh relative ${theme.tag === 'light' ? 'bg-white':'bg-black'}`}>
            <div className="h-5/6 w-full flex-center flex-col">
                <p id="hero" className="hero-title">iPhone 15 Pro</p>
                <div className="md:w-10/12 w-9/12">
                    <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>
            </div>

            <div
                id="cta"
                className="flex flex-col items-center opacity-0 translate-y-20 mt-2"
            >
                <a href="#highlights" className="btn">Buy</a>
                <p className="font-normal text-xl">From $199/month or $999</p>
            </div>
        </section>
    )
}

export default Hero