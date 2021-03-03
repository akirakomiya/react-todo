
import React from "react"
import classes from './App.module.css'
class LikeButton extends React.Component {
    constructor(props){
        super(props);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            hovered: false,
            count: 0, //カウント数の状態を追加
            liked: false //押下の判定
    }

  }
      styles(){
        return {
            container: {
                fontFamily: "helvetica, arial, 'hiragino kaku gothic pro', meiryo, 'ms pgothic', sans-serif",
                fontSize: 11
              },
              like: {
                        display: "inline-block",
                padding: "0px 5px",
                borderRadius:2,
                color: "#ffffff",
                cursor: "pointer",
                float: "left",
                height:20,
                lineHeight: "20px"
              },
              likeHover: {
                background: "#444"
              },
              counterBefore: {
                        display: "block",
                float: "left",
                width: 6,
                height: 6,
                background: "#fafafa",
                marginLeft: "-12px",
                borderRight: 10,
                transform: "rotate(45deg)",
                WebkitTransform: "rotate(45deg)",
                marginTop: 6,
                borderLeft: "1px solid #aaa",
                borderBottom: "1px solid #aaa"
              },
              counter: {
                        display: "block",
                background: "#fafafa",
                boxSizing: "border-box",
                border: "1px solid #aaa",
                float: "left",
                padding: "0px 8px",
                marginLeft: 8,
                height: 20,
                lineHeight: "20px"
              }
            };
          }
  onMouseEnter(){
    const todo_id = this.props.todo_id
    const userList = this.props.users.map((user) =>
        <div>
              <span>{user.name}</span>
              <span>{ this.props.likes.filter(function(value) {
                    return (user.id === value.user_id && todo_id === value.todo_id);
                }).length}</span>
        </div>
        );
        if (this.setState({hovered:true})){
        return <div> 
              <p>拍手一覧</p>
              <div>
                {userList}
              </div>
            </div>};
        }
  onMouseLeave(){
      this.setState({hovered:false});
  }
  onClick(){
      this.props.onLkeButtonClick(this.props.curUser_id,this.props.todo_id)
      const todo_id = this.props.todo_id
      var data = this.props.likes;
            var result = data.filter(function(value) {
            return (todo_id === value.todo_id);
        });
      this.setState({
      count: result.length,
      liked: !this.state.liked
    })
  }
      render(){
        const todo_id = this.props.todo_id
        const userList = this.props.users.map((user) =>
        <div>
              <span>{user.name}</span>
              <span>{ this.props.likes.filter(function(value) {
                    return (user.id === value.user_id && todo_id === value.todo_id);
                }).length}</span>
        </div>
        );
        const styles = this.styles();
        const likeStyle = this.state.hovered ? {...styles.like,...styles.likeHover} : styles.like;
        return (
          <>
          <span style={styles.container}>
          
          <div className={classes.balloonoya}　style={likeStyle}
            onMouseEnter={this.onMouseEnter.bind(this)}
            onMouseLeave={this.onMouseLeave.bind(this)} 
            onClick={this.onClick.bind(this)}><img src="images/拍手.png"　width="20" height="20" />{this.state.liked ? "" :""} 
            <span　className={classes.balloon}>
            <p>拍手一覧</p>
            <div>
            {userList}
            </div>
            </span>
          </div>
          <span style={styles.counter}>
            <span style={styles.counterBefore}>{''}</span>
            { this.props.likes.filter(function(value) {
            return (todo_id === value.todo_id);
            }).length}
          </span>
        </span><br></br>
        
        </>
    )
  }
}
export default LikeButton;