import React from "react";
import DialChart from "./DialChart";

export default function CardContainer (props) {
    console.log(props)
    return (
<div className="main-cards">
       {/* <Card 
       name={[0]}
       data={[0]} 
       icon={[0]}
       color={[0]}
       /> */}

      <Card 
       name={'SEO'}
       data={currSeo}
       icon={'data_thresholding'} 
       color={'yellow'}
       />

      <Card 
       name={'Best Practices'}
       data={currBP} 
       icon={'heart_plus'}
       color={'green'}
       />

      <Card 
       name={'Accessibility'}
       data={currAcc} 
       icon={'settings_accessibility'}
       color={'red'}
       />

    {/* <!-- end of 4 cards --> */}
    </div>
    )
}