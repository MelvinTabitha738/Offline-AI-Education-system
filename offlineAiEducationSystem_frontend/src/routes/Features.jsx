import Styles from './Features.module.css';
import React from 'react';

function Features(){
    return(
      <div className={Styles.techContainer}>
        <div className={Styles.backgroundOverlay}>
          <div className={Styles.techHeader}>
            <h1 className={Styles.techTitle}>
              <span className={Styles.blackText}>
                <span className={Styles.Dot}>&bull;</span>Why
              </span>
              <span className={Styles.blueText}>TechLearn</span><span style={{color:'#10b981'}}>AI?</span>
            </h1>
            <p className={Styles.techSubtitle}>
               TechLearnAI is more than just a learning platform, it’s a step toward equal education for all. Here’s why our offline AI education system is making a difference in learners’ lives.
            </p>
          </div>

          <div className={Styles.techFeatures}>
            <div className={Styles.featureCard}>
              <div className={Styles.featureNumber}>01</div>
              <div className={Styles.featureContent}>
                <div className={Styles.line}></div>
                <h2 className={Styles.featureTitle}>Offline and Inclusive</h2>
      <p className={Styles.featureDescription}>
        Learners can access quality education without the need for internet. Our system is designed to support students in remote, rural, or low-income areas, helping to bridge the gap in digital learning.
      </p>
              </div>
            </div>

            <div className={Styles.featureCard}>
              <div className={Styles.featureNumber}>02</div>
              <div className={Styles.featureContent}>
                <div className={Styles.line}></div>
                <h2 className={Styles.featureTitle}>Personalized Learning</h2>
      <p className={Styles.featureDescription}>
        Every student learns at their own pace. Our platform adjusts learning paths to meet individual needs, making sure each learner understands clearly and makes progress comfortably.
      </p>
              </div>
            </div>

            <div className={Styles.featureCard}>
              <div className={Styles.featureNumber}>03</div>
              <div className={Styles.featureContent}>
                <div className={Styles.line}></div>
                <h2 className={Styles.featureTitle}>Progress Tracking</h2>
      <p className={Styles.featureDescription}>
        With built-in analytics, learners and teachers can see performance clearly. This helps identify areas for improvement and celebrate progress, making learning more effective and guided.
      </p>
              </div>
            </div>

            <div className={Styles.featureCard}>
              <div className={Styles.featureNumber}>04</div>
              <div className={Styles.featureContent}>
                <div className={Styles.line}></div>
                <h2 className={Styles.featureTitle}>Emotional Well-being Support</h2>
      <p className={Styles.featureDescription}>
        We believe learning goes beyond academics. That’s why our system includes mental health resources to help learners stay focused, confident, and emotionally healthy throughout their journey.
      </p>
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.lain}></div>
      </div>
    );
}
export default Features;
