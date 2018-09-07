let siteUsername = 'Forest'
let sitePassword = 'trees'

module.exports = {
    login: (req, res) => {
        let { username, password } = req.body
        if (siteUsername === username && password === sitePassword) {
            req.session.loggedIn = true;
            res.status(200).send('Logged in')
        }
        else {
            req.session.loggedIn = false
            res.status(403).send('Username and password did not match')
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send('Logged out')
    },
    getStudents: (req, res) => {
        let db = req.app.get('db')
        // var filterDecision
        // // console.log(db)
        // if (req.query.degree) {
        //     let degree = decodeURI(req.query.degree)
        //     if (degree) {
        //         filterDecision = db.getStudentsByDegree()
        //     } else {
        //         filterDecision = db.getAllStudents()
        //     }
        // } else{
        //     filterDecision=db.getAllStudents()
        // }
        //     filterDecision.then(response => res.status(200).send(response))
            // .catch (err => {
            // res.status(500).send({erorMessage: "Error fetching data"})
            // console.log(err)
            
        db.getAllStudents().then(response => res.status(200).send(response))
        },
    getStudentsByDegree: (req, res) => {
        // console.log(req.query)
        let {degree} = req.query
        let db = req.app.get('db')
        let filterDecision
        if (req.query.degree){
            if (req.query.degree !== 'all'){
                filterDecision = db.getStudentsByDegree({degree})
            } else {
                filterDecision = db.getAllStudents()
            }
        } else {
            filterDecision = db.getAllStudents()
        }
        filterDecision.then(response => res.status(200).send(response))
    },
    updateStudents: (req, res) => {
        let db = req.app.get('db')
        const {id} = req.params
        const {degree} = req.body
        console.log('degree', degree)
        db.updateStudents([degree, id]).then(response =>{
            res.status(200).send(response)
            console.log(response)
        })
        
    },
    getBackpack: (req, res) => {
        let db = req.app.get('db')
        db.getBackpack().then(response => res.status(200).send(response))
    },
    getProfs: (req,res)=>{
        let db = req.app.get('db')
        db.getProfs().then(response => res.status(200).send(response))
    }
}