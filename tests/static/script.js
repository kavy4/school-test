// админ панель

window.addEventListener('keydown', (event) =>
{
    if (event.shiftKey && event.code == 'Enter')
    {
        if (document.getElementById('admin-panel').style.display == 'block')
        {
            document.getElementById('admin-panel').style.display = 'none'
            document.getElementById('main').style.display = 'block'
        }
        else
        {
            document.getElementById('admin-panel').style.display = 'block'
            document.getElementById('main').style.display = 'none'
        }
    }
})

// админ панель

// рисовать

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let prevMouseX, prevMouseY

ctx.strokeStyle = 'white'
ctx.lineWidth = 5
let draw = false

window.addEventListener("mousedown", (event) =>
{
    draw = true
    prevMouseX = event.clientX
    prevMouseY = event.clientY
})
window.addEventListener("mouseup", () => draw = false)

window.addEventListener("mousemove", (event) =>
{
    if (draw)
    {
        let currentX = event.clientX
        let currentY = event.clientY

        ctx.beginPath()
        ctx.moveTo(prevMouseX, prevMouseY)
        ctx.lineTo(currentX, currentY)
        ctx.stroke()

        prevMouseX = currentX
        prevMouseY = currentY
    }
})

document.getElementById('draw-clear').addEventListener('click', () =>
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

// рисовать

// подкачка теста из фалйла

let questionLength

function LoadTest()
{
    let userClassNum
    if (userClass.indexOf('А') != '-1')
    {
        userClassNum = userClass.replace('А', '')
    }
    else
    {
        userClassNum = userClass.replace('Б', '')
    }

    let request = new XMLHttpRequest
    request.open('GET', `./text/test${userClassNum}.json`)
    request.responseType = 'json'
    
    request.onload = () => 
    {
        if (request.response == null)
        {
            console.log(window.location.href)
            window.location.href = 'school-test/error-web/index.html'
            return
        }
        let questions = request.response
        questionLength = questions.length

        let AnswerCardInput = document.getElementsByClassName('question-card-form-radio')
        let AnswerCardText = document.getElementsByClassName('question-card-form-text')

        let testAnswerText = new Array(), testAnswerState = new Array(), inputText = new Array(), inputAnswer = new Array()

        for (let index = 0; index < questions.length; index++)
        {
            document.getElementById('question-content').children[index].setAttribute('class', `question-card difficulty-${questions[index].type}`)
            document.getElementsByClassName('question-card-num-in')[index].textContent = index + 1

            if (questions[index].type == 'test')
            {
                // document.getElementsByClassName('user-input')[index].remove()
                let AnswerCount = 3
                
                document.getElementsByClassName('question-card-form-name')[index].textContent = questions[index].text

                for (let jndex = 0; jndex < AnswerCount; jndex++)
                {
                    testAnswerText.push(questions[index].answers[jndex].text)
                    testAnswerState.push(questions[index].answers[jndex].state)
                }
            }

            if (questions[index].type == 'user-input')
            {
                inputText.push(questions[index].text)
                inputAnswer.push(questions[index].answer)
            }
        }

        for (let index = 0; index < questionLength; index++)
        {
            if (questions[index].type == 'test')
            {
                document.getElementsByClassName('question-card')[index].children[2].remove()
            }

            if (questions[index].type == 'user-input')
            {
                document.getElementsByClassName('question-card')[index].children[1].remove()
            }
        }

        for (let index = 0; index < document.getElementsByClassName('question-card-form-text').length; index++)
        {
            AnswerCardText[index].textContent = testAnswerText[index]
            AnswerCardInput[index].setAttribute('value', testAnswerState[index])
        }

        for (let index = 0; index < inputText.length; index++)
        {
            inputText[index] = inputText[index].replace('|input|', `<input type="text" class="question-card-form-input" data-value="${inputAnswer[index]}">`)
            document.getElementsByClassName('question-card-form')[index].innerHTML = inputText[index]
        }
        
        // let questionCardArray = new Array()

        // for (let index = 0; index < questionLength; index++)
        // {
        //     questionCardArray.push(document.getElementsByClassName('question-card')[index])
        // }
        
        // questionCardArray.sort(() => Math.random() - 0.5)

        // console.log(questionCardArray)

        // for (let index = 0; index < questionLength; index++)
        // {
        //     document.getElementById('question-content').children[index] = questionCardArray[index]
        // }
    }
    request.send(null)

    // document.getElementsByClassName('question-card').sort(() => Math.random() - 0.5)

    

    // console.log(questionLength)

    // for (let index = 0; index < questionLength; index++)
    // {
    //     // questionCardArray.push(document.getElementsByClassName('question-card')[index])
    //     // console.log(document.getElementsByClassName('question-card')[index])
    //     console.log('а?')
    // }
    // for (let index = 0; index < questionCardArray.length; index++)
    // {
    //     // console.log(questionCardArray[index][1].className)
    //     console.log(questionCardArray[index])
    // }
    // console.log(questionCardArray)
}



// подкачка теста из фалйла

let questionCard = document.querySelectorAll('.question-card')  //

let cardButton = document.querySelectorAll('.question-card-form-button')

let userFirstName, userLastName, userClass, userGroup = null

document.getElementById('start-button').addEventListener('click', () =>
{
    userFirstName = document.getElementsByClassName('authentication-input')[0].value
    userLastName = document.getElementsByClassName('authentication-input')[1].value
    if (userFirstName == '' || userLastName == '')
    {
        for (let index = 0; index < document.getElementsByClassName('authentication-input').length; index++)
        {
            document.getElementsByClassName('authentication-input')[index].setAttribute('placeholder', 'А сюда')
        }
        return
    }

    userClass = document.getElementById('authentication-select1').value + document.getElementById('authentication-select2').value
    if (userClass.indexOf('-') != -1)
    {
        return
    }

    if (document.getElementById('authentication-select3'))
    {
        if (document.getElementById('authentication-select3').value != '----')
        {
            userGroup = document.getElementById('authentication-select3').value
        }
        else
        {
            return
        }
    }

    LoadTest()
    document.getElementById('authentication-card').style.display = 'none'

    questionCard[0].style.display = 'block'  //
    document.getElementById('start-button').style.display = 'none'
})

var truePoints = 0

var falsePoints = 0

let resultAnswer = new Array()

let userInputAnswer = new Array()

function ResultTest()
{
    let points = truePoints + falsePoints

    let circle = document.getElementById('progress-bar')
    let radiusCircle = circle.r.baseVal.value
    let circumference = 2 * Math.PI * radiusCircle

    circle.style.strokeDasharray = circumference + ' ' + circumference
    circle.style.strokeDashoffset = circumference

    let percentOffset = Math.round(truePoints / points * 100)
    let offset = circumference - percentOffset / 100 * circumference

    circle.style.strokeDashoffset = offset

    
    
    let resultAnswerBuff = '<b>Все ответы:</b>\n'

    for (let index = 0; index < resultAnswer.length; index++)
    {
        resultAnswerBuff += `Вопрос ${index + 1}: <b><i>${resultAnswer[index]}</i></b>\n`
    }

    let text = 
    `<b>${userFirstName} ${userLastName} ${userClass}</b>
    Кол-во вопросов: <b><i>${points}</i></b>
    Правильных ответов: <b><i>${truePoints}</i></b>
    Набранные проценты: <b><i>${percentOffset}%</i></b>
    
    ${resultAnswerBuff}`


    let request = new XMLHttpRequest
    request.open('GET', '../static/bot.json', true)
    request.responseType = 'json'

    request.onload = () =>
    {
        let settingsBot = request.response
        let apiToken = settingsBot.botToken, chatId = null

        if (document.title == 'Тест по англискому')
        {
            if (userGroup == 1)
            {
                chatId = settingsBot.chatIdEng1
            }
            else
            {
                chatId = settingsBot.chatIdEng2
            }
        }
        
        if (document.title == 'Тест по истории')
        {
            chatId = settingsBot.chatIdHistory
        }

        if (document.title == 'Тест по математике')
        {
            chatId = settingsBot.chatIdMath
        }

        fetch
        (
            `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${encodeURI(text)}&parse_mode=HTML`
        )
    }
    request.send(null)

    document.getElementById('question-result-percent').textContent = percentOffset + '%'
    document.getElementById('question-result-text').textContent = `Набранно ${truePoints}/${points} баллов`
    document.getElementById('question-result').style.display = 'flex'

    
}

function CheckUserAnswerInput(buff, questionNum)
{
    let input = document.getElementsByClassName('question-card-form-input')[buff]

    if (input.value.toLowerCase() == input.getAttribute('data-value'))
    {
        document.querySelectorAll('.question-card-form-success')[questionNum].style.display = 'block'
        truePoints++
        resultAnswer.push(`Правильно (${input.value})`)
    }
    else
    {
        document.querySelectorAll('.question-card-form-error')[questionNum].textContent = 'правильный ответ ' + input.getAttribute('data-value')
        document.querySelectorAll('.question-card-form-error')[questionNum].style.display = 'block'
        falsePoints++
        resultAnswer.push(`Не правильно (${input.value})`)
    }
}


function CheckUserAnswerTest(questionNum)
{
    let buff, buff1, buff2
    let data
    let Answer = questionCard[questionNum].children[1].children[0].children[1].children //
    for (let index = 0; index < Answer.length; index++)
    {
        buff = Answer[index].children[0].children[0]
        if (buff.checked)
        {
            data = buff.value
            buff2 = index + 1
        }

        if (buff.value == 'true')
        {
            buff1 = index + 1
        }
    }

    if (data == 'true')
    {
        document.querySelectorAll('.question-card-form-success')[questionNum].style.display = 'block'
        truePoints++
        resultAnswer.push(`Правильно (${buff2})`)
    }
    else
    {
        document.querySelectorAll('.question-card-form-error')[questionNum].textContent = 'правильный номер ' + buff1
        document.querySelectorAll('.question-card-form-error')[questionNum].style.display = 'block'
        falsePoints++
        resultAnswer.push(`Не правильно (${buff1})`)
    }
}

function RadioButtonOFF(questionNum)
{
    let Answer = questionCard[questionNum].children[1].children[0].children[1].children //
    for (let index = 0; index < Answer.length; index++)
    {
        buff = Answer[index].children[0].children[0]
        buff.setAttribute('disabled', 'disabled')
    }
}

function CardButton()
{
    let hideCard = 0, buff1 = 0
    for (let index = 0; index < cardButton.length; index++)
    {
        cardButton[index].addEventListener('click', () =>
        {
            let buff
            
            let questionNumBuff = 0

            for (let jndex = 0; jndex < questionCard[hideCard].classList.length; jndex++)   //
            {
                if (questionCard[hideCard].classList[jndex] == 'difficulty-test')   //
                {
                    buff = 'test'
                    break
                }

                if (questionCard[hideCard].classList[jndex] == 'difficulty-user-input')
                {
                    buff = 'userInput'
                    break
                }
            }

            if (buff == 'test')
            {
                CheckUserAnswerTest(index)
                RadioButtonOFF(index)
            }

            if (buff == 'userInput')
            {
                CheckUserAnswerInput(buff1, index)
                buff1++
            }
            
            if (hideCard < questionLength - 1)
            {
                hideCard++
                questionCard[hideCard].style.display = 'block'
            }
            else
            {
                ResultTest()
            }
        }, {once: true})
    }
}

CardButton()

// проверка ответа
