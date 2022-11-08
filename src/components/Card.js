import React from 'react'

const Card = (props) => {
  return (
    <div className="card">
        <div className="card_body">
            <img src={props.img} />
            <h2 className="card_title">{props.title}</h2>
            <p className="card_description">{props.description}</p>
            <button className="card_btn">{props.buttonDescription}</button>
        </div>
    </div>
  )
}

export default Card