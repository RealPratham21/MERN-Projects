import styles from "./Styles/About.module.css";
function About(){
    return(
        <>
            <div className={styles.parent}>
                <div className={styles.path}>
                    Home / About
                </div>
                <div className={styles.mainContent}>
                    <img src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f6786a3aca992.jpeg" className={styles.abtImage} alt="" />
                    <div className={styles.abtContent}>
                        <div className={styles.abtHeading}>
                            Our Story
                        </div>
                        <div className={styles.abtInfo}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat accusantium sapiente tempora sed dolore esse deserunt eaque excepturi, delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque dolore, obcaecati incidunt sequi blanditiis est exercitationem molestiae delectus saepe odio eligendi modi porro eaque in libero minus unde sapiente consectetur architecto. Ullam rerum, nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed quos similique amet. Ex, voluptate accusamus nesciunt totam vitae esse iste.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default About;