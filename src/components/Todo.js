import React from "react"
import classes from './App.module.css'
class Todo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            count: 100,
        };
    }
    render(){
            const {text,curUser,invUser,postDate} = this.props
            
        return(    
            <div>
                <img src={curUser['image']}　width="100" height="100" />
                <span>紹介した人{curUser.name}</span>
                <img src={invUser['image']}　width="100" height="100" />
                <span>紹介された人{invUser.name}</span><br></br>
                    <label>
                        { text }
                    </label>
                    <span className = {classes.postDate}>{postDate}</span>
            </div>
        );
    }
}

export default Todo;
