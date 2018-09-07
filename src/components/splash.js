import React, { Component } from "react";
import axios from 'axios'


export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            loggedIn: '',
            students: [],
            degree: '',
            backpacks: [],
            major: 'all',
            studentsByDegree: [],
            profs: []
        }
        this.handleChangeUser = this.handleChangeUser.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
    }

    componentDidMount() {
        this.getStudents()
        this.getBackPack()
        this.selectByDegree()
        this.getProfs()
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevProps)
    //     console.log(prevState.students)
    //     if(this.state.major !== prevState.major){
    //         console.log("Changed", this.state.studentsByDegree)
    //         this.selectByDegree()
    //     }
    //     if (prevState.students.length) {
    //         for (let i = 0; i < this.state.students.length; i++) {
    //             if (this.state.students[i].degree !== prevState.students[i].degree) {
    //                 this.getStudents()
    //             } else {
    //                 return this.state.students
    //             }
    //         }
    //     }
    // }


    handleChangeDegree = (e) => {
        this.setState({
            degree: e.target.value
        })
    }

    handleChangeUser(e) {
        this.setState({
            username: e.target.value
        })
    }

    handleChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }


    postUsertoSession = () => {
        let loginDetails = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('/api/login', loginDetails).then(res => {
            console.log("Logged in", res)
            this.setState({
                loggedIn: res.data
            })
            console.log('logged in state', this.state.loggedIn)
        })
    }

    getStudents() {
        axios.get('/api/students').then(res => {
            this.setState({
                students: res.data
            })
            console.log(1111111, this.state.students[0])
        })
    }

    getBackPack() {
        axios.get('/api/backpack').then(res => {
            this.setState({
                backpacks: res.data
            })
            console.log(1111111, this.state.backpacks)
        })
    }

    updateStudent(id) {
        let degreeUpdate = {
            degree: this.state.degree
        }
        console.log('degreeupdate', degreeUpdate)
        axios.put(`/api/students/${id}`, degreeUpdate).then(res => {
            console.log("Successful put", res)
            this.setState({
                students: res.data
            })
        })
    }

    

    handleChangeDegree = (event) => {
        // console.log('E', event.target.value)
        this.setState({
            degree: event.target.value
        })
        
    }

    selectByDegree(){
        axios.get(`/api/degrees/?degree=${this.state.major}`).then(res=>{
            console.log('students with majors', res.data)
            this.setState({
                studentsByDegree: res.data
            })
        })
    }


    getProfs(){
        axios.get('http://localhost:4003/profs/course').then(res=>{
            this.setState({
                profs: res.data
            })
        })
    }





    render() {
        console.log('Major', this.state.major)
        console.log("Profs", this.state.profs)
        let years = this.state.profs.map(element => element.experience)
        let expTotal = years.reduce((a,b) => a+b, 0)
        let student = this.state.students.map(element => {
            return (
                <div key={element.id} >
                    <h4 > {element.name} </h4>
                    <p> {element.degree} </p>
                    <input placeholder='Change your degree' onChange={(e) => this.handleChangeDegree(e)} />
                    <button onClick={() => { this.updateStudent(element.id) }} > Edit Your Degree </button>
                </div>
            )
            
        })
        let degrees = this.state.studentsByDegree.map(element => {
            return(
                <div key={element.id}>
                    <p> {element.name} studies {element.degree} </p>
                    </div>
            )
        })
        return (
            <div>
                <input placeholder='username' onChange={(e) => this.handleChangeUser(e)} />
                <input placeholder='password' onChange={(e) => this.handleChangePassword(e)} />
                <button onClick={this.postUsertoSession}> Login </button>
                <h2> Our instructors have {expTotal} years of experience together! </h2>
                <div> Show students with major: </div>
                <select id="selectdegree" onChange={this.handleChangeDegree} value={this.state.major}>
                    <option value='biology' > biology </option>
                    <option value='chemistry' > chemistry </option>
                    <option value='science' > science </option>
                    <option value='math' > math </option>
                </select>
                {degrees}

                {student}
                {
                    this.state.backpacks.length
                    ?
                    <p> Daphne is a bit sketchy she is carrying a {this.state.backpacks[0].item1} and {this.state.backpacks[0].item2} in her backpack </p>
                    :
                    null
                }
            </div>
        )
    }
}