function FeaturesBox({image, title}:{image: string, title: string}){
    return(
        <div className="a-box">
            <div className="a-b-img">
                <img src={image}/>
            </div>
            <div className="s-b-text">
                <h2> {title} </h2>
                
            </div>
        </div>
    )
}

export default FeaturesBox;