import React from 'react'
import Hero from './components/Hero.jsx' 
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
// import Disclaimers from './components/Disclaimers.jsx'
import Contact from './components/Contact.jsx'
import AboutStrengths from './components/AboutStrengths.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  return (
    <div>
      <Hero/>
      <Skills/>
      <Projects/>
      <AboutStrengths/>
     
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App