import React, { createContext, useState } from 'react'

const LanguageContext = createContext({
    language: 'en',
    changeLanguage: () => { },
})

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en')

    const changeLanguage = (val) => {
        setLanguage(val)
    }
    return (
        <LanguageContext.Provider
            value={{
                language: language,
                changeLanguage: changeLanguage
            }}
        >
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageContext
