import { createContext, useContext, useState } from "react";

const RfpContext = createContext(null);

export const RfpProvider = ({ children }) => {
  const [rfpdata, setRfpData] = useState(null);
  const [emailData, setEmailData] = useState(null);
  const [vendorsData,setVendorsData] = useState(null);

  return (
    <RfpContext.Provider value={{ rfpdata, setRfpData,emailData, setEmailData,vendorsData,setVendorsData }}>
      {children}
    </RfpContext.Provider>
  );
};

export const useRfpContext = () => {
  const context = useContext(RfpContext);
  if (!context) {
    throw new Error("useRfpContext must be used inside RfpProvider");
  }
  return context;
};
