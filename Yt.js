const key = 'AIzaSyCPsEuL3dXsUNEvekOVIr4vu_ve6Qh_NZ0'
const url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=' + key + '&q='

const input = document.querySelector('input')
const button = document.querySelector('button')
const container = document.querySelector('.container')
const iframe = document.querySelector('iframe')

let request = new XMLHttpRequest();








function showVideo(videos) {
    iframe.classList.remove('showIframe')
    input.value = ''
    const cardsDelete = document.querySelectorAll('.card')
    cardsDelete.forEach(e => e.remove())
    videos.items.map((e) => {

        const video = document.createElement('div')
        video.className = "card"
        const title = document.createElement('h2')
        const desc = document.createElement('p')
        const img = document.createElement('img')


        video.addEventListener('click', () => {

            iframe.setAttribute('src', 'https://www.youtube.com/embed/' + e.id.videoId)
            iframe.classList.add('showIframe')
            window.scrollTo({ top: 0, behavior: 'smooth' })
        })

        title.textContent = e.snippet.title
        desc.textContent = e.description
        img.setAttribute('src', e.snippet.thumbnails.medium.url)



        video.appendChild(title)
        video.appendChild(desc)
        video.appendChild(img)

        container.appendChild(video)

    })
}


function fetchData() {
    request.open('GET', url + input.value)
    request.send()
    request.onload = () => {

        if (request.status >= 200 && request.status < 400) {
            showVideo(JSON.parse(request.responseText))
        }
        else {
            alert('Something went wrong!')
        }
    }

}

button.addEventListener('click', fetchData)