import React from 'react'
import styles from './Home.module.css'

const Home = () => {
  return (
    <main className={styles.homepage}>
      <div className={styles.background}></div>
      <section className={styles.herosection}>
        <div className={styles.herodetails}>
          <h1 className={styles.title}>LEARN <span style={{ color: '#F5F7FA', fontStyle: 'italic',fontWeight:'1000',opacity:'1' }}>SMARTER, </span> NOT HARDER</h1>
          <p className={styles.description}>Welcome to TechLearnAI Offline,your AI-powered education system that works even without the internet.Empower students and teachers with offline intelligent tools and dashbords</p>
        </div>
      </section>
    </main>
  )
}

export default Home;