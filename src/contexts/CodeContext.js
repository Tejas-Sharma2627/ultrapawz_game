import React, { useContext, useState, useEffect } from "react";
const CodeContext = React.createContext();

export function useCode(){
    return useContext(CodeContext)
}

export function CodeProvider({children}){
    const[userCode, setUserCode] = useState('');
    const [referralCounts, setReferralCounts] = useState(0);
    const value = {userCode, setUserCode, referralCounts, setReferralCounts};
    return(
        <CodeContext.Provider value={value}>
            {children}
        </CodeContext.Provider> 
    )
}