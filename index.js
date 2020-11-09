const container =document.querySelector('.container')
const loading =document.querySelector('.loading')

//store last document

let latestDoc=null
const getNextReviews = async () => {
    loading.classList.add('active')

    const ref=db.collection('reviews') 
    .orderBy('createdAt')
    .startAfter(latestDoc || 0) 
    .limit(3)
    
    const data=await ref.get()

    let template=''

    data.docs.forEach(doc=>{
        const review=doc.data()
        template +=`
        <div class="card">
        <h2>${review.title}</h2>
        <p>Written by ${review.author}</p>
        <p>Rating - ${review.rating} / 5</p>
        </div>
        `
        
    })
    loading.classList.remove('active')


    container.innerHTML+=template

      // update latest doc
  latestDoc = data.docs[data.docs.length - 1];


  if(data.empty){
      loadMore.removeEventListener('click',handleClick)
                       loadMore.innerHTML="no more data"
      loadMore.style='display:none'
      loading.classList.remove('active')
      container.removeEventListener('scroll',handleScroll)
            }
   

}

// wait for DOM content to load
window.addEventListener('DOMContentLoaded', () => getNextReviews());

//load more
const test="EE"

const loadMore=document.querySelector('.load-more button')


const handleClick=()=>{
    getNextReviews()
  

}

const handleScroll =()=>{
   let triggerHeight=container.scrollTop + container.offsetHeight

   if(triggerHeight >= container.scrollHeight){
       getNextReviews()
   }

}

container.addEventListener('scroll',handleScroll)
loadMore.addEventListener('click',handleClick)