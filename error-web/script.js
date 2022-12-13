let request = new XMLHttpRequest()
request.responseType = 'json'
request.open('GET', './bot.json')

request.onload = () =>
{
    const botToken = request.response.botToken
    const chatID = request.response.chatID

    let text = '<b>На сайте баг, бегом чинить!</b>'
    fetch
    (
        `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatID}&text=${encodeURI(text)}&parse_mode=HTML`
    )
}

request.send()