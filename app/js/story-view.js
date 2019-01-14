var toChapter = (n) => {
    story.methods.goChapter(n);
    changeChapter();
}
var prevChapter = () => {
    story.methods.prevChapter();
    changeChapter();
}
var nextChapter = () => {
    story.methods.nextChapter();
    changeChapter();
}

var audioPlaying = () => {
    if(!audio.paused){
        var active = story.data.chapterActive;
        let ctime = audio.currentTime;
        if(audio.currentTime > story.data.chapters[active].time_end){
            let n = -1;
            for (let i = story.data.chapters.length-1; i >= 0; i--) {
                let el = story.data.chapters[i];
                if(el.time_end > audio.currentTime)
                    n = i;
                else { break; }
            }
            if(n >= 0){
                toChapter(n);
            }
            audio.currentTime = ctime;
        }
        if(audio.duration - 2 < audio.currentTime)
            endPlaying();
    }
    //console.log(audio.currentTime);
}

var endPlaying = () => {
    let el = document.getElementById('play').classList;
    el.remove("play"); el.remove("pause"); el.add("reload");
    audio.pause();
    //audio.removeEventListener("timeupdate", audioPlaying())
}

var audio = document.getElementsByTagName("audio")[0];
audio.addEventListener("timeupdate", () => { audioPlaying(); }) ;
//audio.addEventListener("ended", () => { endPlaying(); }) ;

var changeChapter = () => {
    var n = story.data.chapterActive;
    let els = ["story-chapter", "story-step"];
    audio.pause();
    for(let i=0; i < els.length; i++){
        let chapters = document.getElementsByClassName(els[i]);
        for(let j=0; j < chapters.length; j++){
            chapters[j].classList.remove("active");
        }
        chapters[n].classList.add("active");
    }
    audio.currentTime = n>0 ? story.data.chapters[n-1].time_end : 0;
    audio.play();
};

document.getElementById('chapter-prev').addEventListener('click', function(){ prevChapter() } );
	
document.getElementById('chapter-next').addEventListener('click', function(){ nextChapter() } );

document.getElementById('volume').addEventListener('click', (ev) => {
    let el = ev.currentTarget;
    if(el.classList.contains('volume')){
        el.classList.remove('volume');
        el.classList.add('muted');
        audio.volume = 0;
    } else {
        el.classList.remove('muted');
        el.classList.add('volume');
        audio.volume = 1;
    }
});

document.getElementById('play').addEventListener('click', (ev) => {
    let el = ev.currentTarget;
    if(el.classList.contains('play')){
        el.classList.remove('play');
        el.classList.add('pause');
        audio.play();
    } else if(el.classList.contains('pause')){
        el.classList.remove('pause');
        el.classList.add('play');
        audio.pause();
    } else {
        el.classList.remove('reload');
        //audio.addEventListener("timeupdate", audioPlaying()) ;
        el.classList.add('pause');
        toChapter(0);
        audio.play();
    }
});

document.getElementById('story').addEventListener('mousemove', (ev) => {
    let el = ev.currentTarget.classList;
    el.add("controls");
    setTimeout(() => {
        el.remove("controls");
    }, 3000)
})

var initStory = () => {
    if(story.data.chapters.length == 0){
        let chapterPr = story.methods.getChapters();
        chapterPr.then( () => {
            story.data.chapters.forEach((el, i) => {
                createStep(i);
                createChapter(el, i);
            });
            toChapter(0);
        })
    } else { toChapter(0); }
    audio.play();
    let section = document.getElementById('story');
    section.classList.add("active");		
}

var createStep = (i) => {
    let storyEl = document.createElement("i");
    let storyNav = document.getElementsByClassName("story-steps")[0];
    //if(i == 0)
    //	storyEl.classList.add('active');
    storyEl.classList.add('story-step');
    storyEl.dataset.chapter = i;
    storyEl.addEventListener('click', function(){ toChapter(i) } );
    storyNav.append(storyEl);
}

var createChapter = (el, i) => {
    let storyEl = document.createElement("li");
    let storyNav = document.getElementsByClassName("story")[0];

    let storyPhr = document.createElement("p");
    storyPhr.classList.add("fade-in");
    storyPhr.innerHTML = el.text;

    let storyPic = document.createElement("picture");
    storyPic.classList.add("story-img");

    let storyImg = document.createElement("img");
    storyImg.setAttribute("src", el.image);

    storyPic.append(storyImg);
    storyEl.append(storyPhr);
    storyEl.append(storyPic);

    storyEl.classList.add('story-chapter');
    storyEl.dataset.chapter = i;
    storyNav.append(storyEl);
}