const story = {
    data: {
        chapters : [],
        chapterActive: 0
    },
    methods: {
        getChapters : () => {
            return fetch('js/base/tres-chanchitos.json')
                .then(response => response.json())
                .then(data => story.data.chapters = data.data )
        },
        prevChapter : () => {
            if(story.data.chapterActive > 0)
                story.data.chapterActive--
            else story.data.chapterActive = 0;
        },
        nextChapter : () => {
            if(story.data.chapterActive < story.data.chapters.length-1)
                story.data.chapterActive++;
            else story.data.chapterActive = story.data.chapters.length-1;
        },
        goChapter : (n) => {
            story.data.chapterActive = n;
        }
    }
}
