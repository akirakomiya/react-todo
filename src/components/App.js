import React from "react"
import Form from "./Form"
import Todo from "./Todo"
import LikeButton from "./LikeButton"
import classes from './App.module.css'


let currentId = 0
const APP_KEY = 'todos'
const USERS_KEY = 'users'
const LIKES_KEY = 'likes'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            todos: [],
            curUser: "",
            invUser: "",
            count: 100,
            users : [],
            likes: []
        };
    }

    // HTMLが読み込まれる時に呼び出されるメソッド
    // localStrageからの取得処理はここで呼び出す
    componentDidMount(){
        const likesState = localStorage.getItem(LIKES_KEY)
        const likeinitialState = likesState ? JSON.parse(likesState) : []
        this.setState({
            likes: likeinitialState
        })
        const usersState = localStorage.getItem(USERS_KEY)
        if (usersState == null){
            const users = [
                { id: 1, name: "Tanaka",image:"images/バッハ.jpeg",count: 100,counted:0},
                { id: 2, name: "Suzuki",image:"images/女の子.jpeg",count: 100,counted:0},
                { id: 3, name: "Okada",image:"images/男の子.jpeg",count: 100,counted:0},
                { id: 4, name: "Uzuki",image:"images/かっぱ.jpeg",count: 100,counted:0},
                { id: 5, name: "Hamada",image:"images/中二病.jpeg",count: 100,counted:0},
                { id: 6, name: "Yamada",image:"images/警備員.jpeg",count: 100,counted:0},
                { id: 7, name: "Tozuki",image:"images/配達員.jpeg",count: 100,counted:0},
                { id: 8, name: "Kanda",image:"images/会社員.jpeg",count: 100,counted:0},
                { id: 9, name: "Wakui",image:"images/大臣.jpeg",count: 100,counted:0},
                { id: 10, name: "onoda",image:"images/ピーターパン.jpeg",count: 100,counted:0}
            ];
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
            this.setState({
                users: users,
                curUser: users[0],
                invUser:users[0]
            })
        }else{
            const userinitialState = usersState ? JSON.parse(usersState) : []
            this.setState({
                users: userinitialState,
                curUser: userinitialState[0],
                invUser: userinitialState[0]
            })
        }

        const appState = localStorage.getItem(APP_KEY)
        const initialState = appState ? JSON.parse(appState) : []
        this.setState({
            todos: initialState
        })

        // localStrageに格納したデータのidと重複しない様にidを更新する
        currentId = initialState ? initialState.length : 0
    }

    render() {
        
        const {todos,filter} =this.state
        const filteredTodos = todos.filter(({ completed }) => {
            switch(filter) {
                case "all":
                    return true;
                case "uncompleted":
                    return !completed;
                case "completed":
                    return completed;
                default:
                    return true;
            }
        });
        return( 
        <div>
            <Form onSubmit={this.handleSubmit} handleCurUserSelectChange={this.handleCurUserSelectChange} handleInvUserSelectChange={this.handleInvUserSelectChange} curUser={this.state.curUser} invUser={this.state.invUser} users={this.state.users} />
            <ul>
                {filteredTodos.map( ({ id, text,curUser,invUser,postDate}) => 
                    (<li className = {classes.li} key ={id}>
                        <Todo id={id} text={text} postDate = {postDate} onChange ={this.handleChangeTodoAttribute} onEdit={this.handleChangeTodoAttribute} onDelete = {this.handleClickDelete} curUser = {curUser} invUser = {invUser}/>
                        <LikeButton onLkeButtonClick = {this.onLkeButtonClick} users = {this.state.users} likes = {this.state.likes} curUser_id = {this.state.curUser["id"]} todo_id = {id}/>
                    </li>
                ))}
            </ul>
        </div>
        );
    }
    onLkeButtonClick = (user_id,todo_id) => {
        let users = this.state.users
        var result = this.state.todos.filter(function(value) {
            return (todo_id === value.id);
        }); 
        const todo = result[0]
        const todoCurUser = todo['curUser']['id']
        const todoInvUser = todo['invUser']['id']

        console.log(todoCurUser)
        console.log(todoInvUser)
        console.log(this.state.likes)
        var data = this.state.likes;
            var result = data.filter(function(value) {
            return (user_id === value.user_id && todo_id === value.todo_id);
        });
        console.log(result.length);
        if (result.length >= 15){
            alert("15回以上押せません")
            return 
        }
        if (this.state.curUser['count'] == 0){
            alert("拍手できません")
            return
        }
        if ( todoCurUser== user_id){
            alert("拍手できません")
            return
        }
        if ( todoInvUser== user_id){
            alert("拍手できません")
            return
        }
        for (let y = 0;y < users.length;y++) {
            if (users[y].id === todoCurUser){
                users[y].counted++
            }
            if (users[y].id === todoInvUser){
                users[y].counted++
            }
        }
        this.setState({users:users})
        let countUser = this.state.curUser
        countUser['count'] -= 2
        this.setState({curUser:countUser})
        const like = {user_id:user_id,todo_id:todo_id}
        this.setState({likes:this.state.likes.concat(like)})
        setTimeout(() => ( localStorage.setItem(LIKES_KEY, JSON.stringify(this.state.likes))), 10)
        setTimeout(() => ( localStorage.setItem(USERS_KEY, JSON.stringify(this.state.users))), 10);
    }

    //日付から文字列に変換する関数
    getStringFromDate(date) {

        var year_str = date.getFullYear();
        //月だけ+1すること
        var month_str = 1 + date.getMonth();
        var day_str = date.getDate();
        var hour_str = date.getHours();
        var minute_str = date.getMinutes();
        var second_str = date.getSeconds();


        let format_str = 'YYYY-MM-DD hh:mm:ss';
        format_str = format_str.replace(/YYYY/g, year_str);
        format_str = format_str.replace(/MM/g, month_str);
        format_str = format_str.replace(/DD/g, day_str);
        format_str = format_str.replace(/hh/g, hour_str);
        format_str = format_str.replace(/mm/g, minute_str);
        format_str = format_str.replace(/ss/g, second_str);

        return format_str;
    };
    handleSubmit = (text,curUser,invUser) =>{
        const date = new Date()
        const newTodo = {
            id: currentId,
            text,
            curUser,
            invUser,
            completed: false,
            postDate: this.getStringFromDate(date)
        };

        if ( curUser== invUser){
            return
        };
        console.log(newTodo)
        const newTodos = [newTodo,...this.state.todos]
        this.setState({ todos: newTodos })
        // localStrageにtodoをセット
        localStorage.setItem(APP_KEY, JSON.stringify(newTodos));
        currentId++;
    };
    handleCurUserSelectChange = (curUser) =>{
        this.setState({curUser:curUser})
    }
    handleInvUserSelectChange = (invUser) =>{
        this.setState({invUser:invUser})
    }
    handleChangeFilter = filter => {
        this.setState({filter});
    };

}

export default App;