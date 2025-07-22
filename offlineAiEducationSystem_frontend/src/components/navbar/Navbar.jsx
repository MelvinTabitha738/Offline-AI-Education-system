import React from 'react'
import styles from './Navbar.module.css'
import{Link} from 'react-router-dom'
import Logo from '../../assets/Ai.png';


const Navbar = () => {
  return (
    <>
    <header>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.navlogo}>
       <img src={Logo} alt="nav-logo" /> 
     </Link> 
     <div className={styles.navmenu}>
      <Link to="/" className={styles.navlink}>Home</Link> 
     <Link className={styles.navlink} to="/about">About</Link> 
     <Link to="/features" className={styles.navlink}>Features</Link> 
     <Link to="/contact" className={styles.navlink}>Contact</Link> 
     <Link to="/loginsignup" className={styles.loginsignup}>Login / Sign Up</Link> 
     </div>
     
      </nav>
    </header>
    <main className={styles.homepage}>
      <section className={styles.herosection}>
        <div className={styles.herodetails}>
          <h1 className={styles.title}>LEARN SMARTER NOT HARDER</h1>
          <p className={styles.description}>Welcome to TechLearnAI Offline,your AI-powered education system that works even without the internet.Empower students and teachers with offline intelligent tools and dashbords</p>
        </div>
      </section>
    </main>
    </>
  )
}

export default Navbar