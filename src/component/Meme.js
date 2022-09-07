import React, { useEffect, useState } from "react";

export default function Meme() {
    
    const api_url = "https://api.imgflip.com/get_memes";

    const [formData, setFormData] = useState({topText: "", bottomText: "", imgUrl: "images/meme.png"})
    const [apiData, setApiData] = useState([])

    // async function getMemeImage(e) {
    //     e.preventDefault();
    //     const response = await fetch(api_url);
    //     const memeObject = await response.json();

    //     let random = Math.floor(Math.random() * memeObject.data.memes.length)
    //     let imgUrl = memeObject.data.memes[random].url;

    //     setUrl(imgUrl);
    // }
    useEffect(() => {
        fetch(api_url).then(res=>res.json()).then(data=>setApiData(data));
        
    },[]);


    function getMemeImage(e) {
        e.preventDefault();
        const random = Math.floor(Math.random() * apiData.data.memes.length);
        console.log(apiData.data.memes[random].url);
        setFormData(prevState => ({
            ...prevState,
            imgUrl: apiData.data.memes[random].url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target;
        console.log(name)
        setFormData(prevState =>({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className="meme-container">
            <form className="meme-form">
                <input 
                    type="input"
                    placeholder="Top Text"
                    className="input input-top"
                    name="topText"
                    onChange={handleChange}
                    value={formData.topText}
                />
                <input 
                    type="input"
                    placeholder="Bottom Text"
                    className="input input-bottom"
                    name="bottomText"
                    onChange={handleChange}
                    value={formData.bottomText}
                />
                <button
                    type="submit"
                    className="submit-button"
                    onClick={getMemeImage}
                    >
                    Get New Image
                </button>
            </form>
            <div className="img-container">
                <img src={formData.imgUrl} alt="meme-main" className="mame-image" />
                <div className="top-text">{formData.topText}</div>
                <div className="bottom-text">{formData.bottomText}</div>
            </div>
        </div>
    )
}