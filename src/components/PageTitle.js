import React from 'react'
import styles from "../styles/modules/pageTitle.module.css"

const PageTitle = ({ children }) => {
    return (

        <p className={styles.title}>{children}</p>
    )
}

export default PageTitle