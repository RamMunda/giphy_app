import React from 'react'
import sample_avatar from "../images/sample_avatar.png";

export default function Postlist({allpost}) {
    return (
        <div className="posts_container">
            <div className="posts">
                <div className="posts_top_section">
                    <img src={sample_avatar} alt="avatar" />
                    <span>Abhay Mishra</span>
                </div>
                <div className="posts_content_section">
                    <p>this is my first post</p>
                    <img src="https://media3.giphy.com/media/dNvaBfoxWSowUpATQW/giphy.gif?cid=ecf05e47886b3902d4834646d3ed3407b076d653de5308c9&rid=giphy.gif&ct=g" alt="gif" />
                </div>
            </div>
            {allpost.length>0 ? allpost.map(a=>(
                <div className="posts">
                <div className="posts_top_section">
                    <img src={sample_avatar} alt="avatar" />
                    <span>Abhay Mishra</span>
                </div>
                <div className="posts_content_section">
                    <p>{a.message}</p>
                    <img src={a.urls} alt="gif" />
                </div>
            </div>
            )) : null}
        </div>
    )
}
