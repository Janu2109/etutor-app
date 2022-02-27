import FeaturesBox from "../FeaturesBox/featuresBox";
import featureImage from "../../images/feature_1.png";
import featureImage1 from "../../images/feature_2.png";
import featureImage2 from "../../images/feature_3.png";

function Features(){
    return(
        <div id="features">
            <div className="a-container">
            <FeaturesBox image={featureImage} title='Development Course'/>
            <FeaturesBox image={featureImage1} title='Ease Of Access'/>
            <FeaturesBox image={featureImage2} title='Usablity Interface'/>
            </div>
        </div>
    )
}

export default Features;