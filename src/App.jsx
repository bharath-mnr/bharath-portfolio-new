import React from 'react'
import Hero from './components/Hero.jsx' 
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Disclaimers from './components/Disclaimers.jsx'
import Contact from './components/Contact.jsx'

const App = () => {
  return (
    <div>
      <Hero/>
      <Skills/>
      <Projects/>
      <Disclaimers/>
      <Contact/>
    </div>
  )
}

export default App
