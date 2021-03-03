import React from "react"



class Form extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            input: "",
            isButtonDisable: true,
        };
    }

    render(){
        const userList = this.props.users.map((user) =>
            <option value={user.id}>{user.name}</option>
        );
        
        return(
            <form onSubmit={this.handleSubmit}>
                <span>
                <img src={this.props.curUser['image']}　width="100" height="100" />
                現在のユーザー<br></br>
                <select onChange={this.handleCurUserSelectChange}>
                    {userList}
                </select>
                </span>
                <p>拍手できる{this.props.curUser['count']}</p>
                <p>拍手された{this.props.curUser['counted']}</p>
                <span>
                <img src={this.props.invUser['image']}　width="100" height="100" />
                褒めたい人<br></br>
                <select onChange={this.handleInvUserSelectChange}>
                    {userList}
                </select>
                </span><br></br>
                <textarea value ={this.state.input} onChange={this.handleChange}/>
                <button disabled = {this.state.isButtonDisable}>
                    追加
                </button>
            </form>
        );
    }


    handleCurUserSelectChange = e =>{
        const curUser = this.props.users.filter((user) => {
            return (user['id'] == e.currentTarget.value);
        });
        this.props.handleCurUserSelectChange(curUser[0])
    }
    handleInvUserSelectChange = e =>{
        const invUser = this.props.users.filter((user) => {
            return (user['id'] == e.currentTarget.value);
        });
        this.props.handleInvUserSelectChange(invUser[0])
    }

    handleChange = e =>{
        this.setState({
            input: e.currentTarget.value,
            isButtonDisable: e.currentTarget.value.length < 5})
        console.log(e.currentTarget.value)
    }

    handleSubmit = e =>{
        e.preventDefault();
        if (!this.state.input) return;
        this.props.onSubmit(this.state.input,this.props.curUser,this.props.invUser)
        this.setState({input:""});
    }
}

export default Form;