import React, { useState, useRef} from 'react';
import gif from "../images/gif.png";
import sample_gif from "../images/sample_gif.jpg";
import sample_photo_album from "../images/sample_photo_album.png";
import sample_videoicon from "../images/sample_videoicon.png";
import sample_avatar from "../images/sample_avatar.png";
import cross from "../images/cross.jpg";


export default function Createpost({updatepostList}) {
    const inputref = useRef(null);
    const [createposttrack,setcreateposttrack] = useState(true);
    const createpostwrapper_Handler = () =>{
        var createpost_wrapper =  document.querySelector('.createpost_wrapper');
        document.querySelector('.createpost_wrapper_container').classList.add('createpost_wrapper_container_addclass');
        setcreateposttrack({createposttrack:true});
        createpost_wrapper.classList.add('createpost_wrapper_addclass');
    }

    const [searchkeyword,setsearhkeyword] = useState("");
    const [Allsearchedgif,setAllsearchedgif] = useState([]);
    const [previewimage,setpreviewimage] = useState([]);
    const [gifbox,setgifbox] = useState(false);
    const [newgifurl,setnewgifurl] = useState([]);
    const [text,settext] = useState("");
    const [newpost,setnewpost] = useState({});

    const onchangeHandler= (e) =>{
         setsearhkeyword(e.target.value);
    }
    const debounce = (callback, ms) => {
        var timer = 0;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, ms || 0);
        };
    }
    const fetchgif = (k) =>{
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=07qWBKSltP9ajPCuclncPlomW5xNwneO&q=${k}&limit=12&offset=0&rating=g&lang=en`)
        .then(r =>r.json())
        .then(d => setAllsearchedgif(d.data));
    }

    var preview_image_attachment = document.querySelector(".preview_attachment");
    
    var newpost_object = {};
    var newpost_array = [];
    const addGifPreviewHandler = (imageurl,gifurl) =>{
       previewimage.push(imageurl);
       var newElement = document.createElement('div');
       var imageElement = document.createElement('img');
       imageElement.setAttribute("src",imageurl);
       imageElement.setAttribute("alt","previewimage");
       newElement.appendChild(imageElement);
       preview_image_attachment.appendChild(newElement);
       previewimage.push(imageurl);
       setgifbox(false);
       document.querySelector('.preview_attachment').classList.add('preview_attachment_appear');
       newpost_array.push(gifurl);
       setnewgifurl(...newgifurl,gifurl);
    }
    const fadeoutcreatepostHandler = () =>{
        var createpost_wrapper =  document.querySelector('.createpost_wrapper');
        createpost_wrapper.classList.remove('createpost_wrapper_addclass');
        document.querySelector(".postcreate").querySelector("input").value ="";            
        document.querySelector('.preview_attachment').classList.remove('preview_attachment_appear');
        document.querySelector('.createpost_wrapper_container').classList.remove('createpost_wrapper_container_addclass');
        setgifbox(false);

    }
    const gifsearchHandler = () =>{
        setgifbox(true);        
    }
    const inputonchangeHandler = (e) =>{
        settext(e.target.value);
    }
    const postHandler = () =>{
        if(searchkeyword.length>0){
            newpost_object["message"] = text; 
            newpost_object["urls"] = newgifurl;  
            setnewpost(newpost_object);
            updatepostList(newpost_object);
            settext("");
            setnewgifurl([]);
            var k = document.querySelector(".preview_attachment_appear").querySelectorAll("div");
            k.forEach(function(p){ 
                p.remove();
            });
            document.querySelector(".postcreate").querySelector("input").value ="";

            document.querySelector('.preview_attachment').classList.remove('preview_attachment_appear');
            document.querySelector('.createpost_wrapper_container').classList.remove('createpost_wrapper_container_addclass');

            fadeoutcreatepostHandler();          
        }
        else{
            alert('please write the message.....');
        }
    }
    const keypressHandler = () =>{
        debounce(fetchgif(searchkeyword,300));
        
    }
    
    return (
        <div className="post">
            <div className="post_categories">
                <div className="giph">
                    <span><img src={sample_gif} alt="giph"/></span>
                    <span>Gif</span>
                </div>
                <div className="giph">
                    <span><img src={sample_photo_album} alt="giph"/></span>
                    <span>Photo/album</span>
                </div>
                <div className="giph">
                    <span><img src={sample_videoicon} alt="giph"/></span>
                    <span>Live</span>
                </div>
            </div>
            <div className="postdata_input_container">
                <div className="postdata_input">
                    <img src={sample_avatar} alt="avatar" />
                    <input type="text" className="textinput" placeholder="write a post ........." ref={inputref} onClick={createpostwrapper_Handler} readOnly />
                </div>
            </div>
            <div className="createpost_wrapper_container">
                <div className="createpost_wrapper">
                    <div className="fadeout_createpost_wrapper">
                        <img src={cross} alt="cross" onClick={fadeoutcreatepostHandler}/>
                    </div>
                    <h1>Create post</h1>
                    <div className="postdata_input_container">
                        <div className="postdata_input postcreate">
                            <img src={sample_avatar} alt="avatar" />
                            <input type="text" placeholder="write a post ........." onChange={inputonchangeHandler}/>
                        </div>
                    </div>
                    <div className="preview_attachment">
                        
                    </div>
                    <div className="addigifandpost_button_wrapper">
                        <div  className="addgiph" onClick={gifsearchHandler}>
                            <img src={gif} alt="giph" />
                            <p>Add gif</p>
                        </div>
                        <button onClick={postHandler}>Post</button>
                    </div>

                    {
                        gifbox === false ? null :
                        <div className="giph_search">
                            <input type="text" placeholder="search gif" className="inp" onKeyUp={keypressHandler} onChange={onchangeHandler}/>
                            <div className="recommended_gif">
                            {Allsearchedgif.length>0 ? Allsearchedgif.map(d=><div className="suggestedgif" ><img key={d.id} src={d.images.downsized.url} onClick={() => addGifPreviewHandler(d.images.downsized_still.url,d.images.downsized.url)} alt="gif"/></div>): <p>loading...</p>}
                        </div>
                    </div>
                    }
    
            </div>
            </div>
        </div>
    )
}
