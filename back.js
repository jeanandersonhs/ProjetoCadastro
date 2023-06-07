let usuarios = []
let bodyParser = require('body-parser');
let express = require('express')
let app = express()


// Passo 7
app.use(bodyParser.urlencoded({
    extended: true
})) // Para trabalhar com a codificação além da x-www-form-urlencoded


app.use(express.static('frontend')) // ENVIA DIRETO PARA PAGINA ESTATICA
app.post('/usuario', function (req, res) {
    let nome = req.body.nome // METODO POST UTILIZA-SE BODY EM VEZ DE QUERY
    let login = req.body.login
    let senha = req.body.senha

    usuarios.push({
        nome,
        login,
        senha
    })

    res.send(`
             <h1>Usuario cadastrado com sucesso</h1>
    `)
})

app.get('/usuarios', function (req, res) {
    let template = `<h1>Lista de Usuários Cadastrados</h1>
    <hr>`
    for (let i = 0; i < usuarios.length; i++) {
        template += `<b>Nome: </b>${usuarios[i].nome} <b>Login: </b>${usuarios[i].login} <b>Senha: </b>${usuarios[i].senha}
        <a href='http://localhost:3000/deluser/${i}'>Apagar</a>
        <hr>
        `
    }
    res.send(template)
})


app.get('/deluser/:id', function (req, res) {
    let id = parseInt(req.params.id)
    usuarios.splice(id, 1)
    res.send("<h1>Usuário apagado com sucesso!</h1>")
})

app.listen(3000)