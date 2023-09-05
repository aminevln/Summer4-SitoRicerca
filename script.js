var inputBox = document.getElementById("search-box");
inputBox.addEventListener("keydown", function(event) {
        searchTracks(inputBox.value.toLowerCase(), true, musicToAdd.value.toLowerCase());
    }
);
var musicToAdd = document.getElementById("music_to_add");
musicToAdd.addEventListener("keydown", function(event) {
        searchTracks(inputBox.value.toLowerCase(), false, musicToAdd.value.toLowerCase());
    }
);

var done = document.getElementById('save_pl')
done.addEventListener("click", function(event) {
    savePl()
}
);
let thxPl = []
function savePl(){
    let t = document.getElementById('su').value
    document.getElementById('su').value = ""
    let tx = document.getElementById('si').value
    document.getElementById('si').value = ""
    document.getElementById('pl-preview').innerHTML = ""
    if(t==="")
        t="Unamed Playlist"
    var nuovaplaylist =
    {
        "title": t,
        "description": tx,
        "tracks": thxPl
    }
    playlist.push(nuovaplaylist)
    thxPl = []
    checkLibrary()
}

function searchTracks(query, flag, queryF) {
    if(flag)
    {
        var resultsContainer = document.getElementById("search-results");
        resultsContainer.innerHTML = "";
        resultsContainer.style.backgroundColor = "#242425"
        for (var i = 0; i < albums.length; i++) {
            for (var j = 0; j < albums[i].tracks.length; j++) {
                var track = albums[i].tracks[j].toLowerCase();
                if (track.includes(query)) {
                    let rs = document.createElement('div')
                    rs.id = "result"
                    let cover = document.createElement('img')
                    cover.src = albums[i].cover
                    cover.style.width = "50px"
                    rs.appendChild(cover)
                    let rsc = document.createElement('div')
                    rsc.id = "lil-result"
                    let p = document.createElement('p')
                    p.textContent = track
                    p.id = "song"
                    let p2 = document.createElement('p')
                    p2.textContent = "Brano • "+albums[i].author
                    rsc.appendChild(p)
                    rsc.appendChild(p2)
                    rs.appendChild(rsc)
                    rs.addEventListener('click', function(event){
                        showSingle(this)
                    })
                    resultsContainer.appendChild(rs)
                    resultsContainer.appendChild(rs)
                }
                
    
            }
        }
    }
    else
    {
        var resultsContainer = document.getElementById("preview-add");
        resultsContainer.innerHTML = "";
        resultsContainer.style.backgroundColor = "#242425"
        for (var i = 0; i < albums.length; i++) {
            for (var j = 0; j < albums[i].tracks.length; j++) {
                var track = albums[i].tracks[j].toLowerCase();
                if (track.includes(queryF)) {
                    let rs = document.createElement('div')
                    rs.id = "result"
                    let cover = document.createElement('img')
                    cover.src = albums[i].cover
                    cover.style.width = "50px"
                    rs.appendChild(cover)
                    let rsc = document.createElement('div')
                    rsc.id = "lil-result"
                    let p = document.createElement('p')
                    p.textContent = track
                    p.id = "song"
                    let p2 = document.createElement('p')
                    p2.textContent = "Brano • "+albums[i].author
                    rsc.appendChild(p)
                    rsc.appendChild(p2)
                    rs.appendChild(rsc)
                    resultsContainer.appendChild(rs)
                    rs.style.cursor = "pointer"
                    let a = albums[i].author
                    rs.addEventListener("click", function(event) {
                        addToPl(this);
                    });
                    cover.addEventListener("click", function(event) {
                        addToPl(rs);
                    });

                    
                }
                
    
            }
        }

    }
}
    
function showSingle(song){
    let section = document.querySelector('section')
    let sng, album, data, cov, author
    let tracks = []
    section.innerHTML = ""
    for(let i=0; i<albums.length; i++){
        for(let j=0; j<albums[i].tracks.length; j++){
            if(albums[i].tracks[j].toLowerCase()===song.children[1].children[0].textContent.toLowerCase()){
                sng = albums[i].tracks[j]
                album = albums[i].title
                data = albums[i].date
                tracks = albums[i].tracks
                cov = albums[i].cover
                author = albums[i].author
            }
        }
    }
    let a = 
    `
            <div style="width: 100%; display: flex;">
                <article style:"max-width: 50%;">
                    <div id="preview-add"></div>
                    <img src="${cov}" style="margin:15px;">
                    <div id="pl-title">
                    <h1>${sng}</h1>
                    <h3>SONG BY ${author}</h3>
                    <button id="rmmm">Add to playlist</button>
                    <div id="elenco-pl-ex"></div>
                </article>
                <article id="album-completo">
                    <h5>ALBUM</h5>
                    <h6>${data}</h6>
                    <h2>${album}</h2>
                    <div id="tot-album">
                    </div>
                </article>
            </div>
            
    `
    section.innerHTML = a
    for(let i=0; i<tracks.length; i++){
        let container = document.createElement('div')
        container.id = 'cntr'
        let cover = document.createElement('img')
        cover.src = cov
        cover.style.width = "58px"
        cover.style.height = "58px"
        container.appendChild(cover)
        let container_title = document.createElement('div')
        container_title.id = 'cttl'

        let h1 = document.createElement('h4')
        h1.textContent = tracks[i]
        container_title.appendChild(h1)
        container.appendChild(container_title)
        document.getElementById('tot-album').appendChild(container)
        container.addEventListener('click', function(event){
            showSingle(this)
        })


    }
    document.getElementById('rmmm').addEventListener('click', function(event){
        addToPlEx(song.children[1].children[0].textContent)
    })

}
function addToPlEx(song){
    document.getElementById('elenco-pl-ex').innerHTML=""
    if(playlist.length===0)
    {
        let h3 = document.createElement('h3')
        h3.textContent = "You have no playlists"
        document.getElementById('elenco-pl-ex').appendChild(h3)
    }else{
        for(let i=0; i<playlist.length; i++){
            let h3 = document.createElement('h3')
            h3.textContent = playlist[i].title
            document.getElementById('elenco-pl-ex').appendChild(h3)
            h3.addEventListener('click', ()=>{
                for(let j=0; j<playlist.length; j++){
                    if(playlist[j].title === h3.textContent){
                        playlist[j].tracks.push(song)
                        alert('done')
                    }
                }
            })
        }
    }
}
function start(){
    var inputBox = document.getElementById("search-box");
    inputBox.value = ""
}
function checkFocus() {
    var inputBox = document.getElementById("search-box");
    var elemento = document.getElementById("search-results");
    var elementor = document.getElementById("preview-add");
    var inHover = false, inHoverr = false
    elemento.addEventListener('mouseenter', function() {
        inHover = true;
    });
    
    elemento.addEventListener('mouseleave', function() {
        inHover = false;
    });

    elementor.addEventListener('mouseenter', function() {
        inHoverr = true;
    });
    
    elementor.addEventListener('mouseleave', function() {
        inHoverr = false;
    });

    if (document.activeElement === inputBox) {
        
    } else if(document.activeElement != inputBox && !inHover) {
        var resultsContainer = document.getElementById("search-results");
        resultsContainer.innerHTML = "";
        resultsContainer.style.backgroundColor = "transparent"
    }
    if (document.activeElement === musicToAdd) {
        
    } else if(document.activeElement != musicToAdd && !inHoverr){
        var resultsContainer = document.getElementById("preview-add");
        resultsContainer.innerHTML = "";
        resultsContainer.style.backgroundColor = "transparent"
    }
}
setInterval(checkFocus, 1000);
function checkLibrary(){
    let h = document.getElementById('playlists')
    h.innerHTML=""
    for(let i=0; i<playlist.length; i++){
        let h4 = document.createElement('h4')
        h4.id = "name_pl"
        h4.classList.add('elenco-pl-ul')
        h4.textContent = playlist[i].title
        h4.addEventListener('click', function(event){
            showPlaylist(this.textContent)
        })
        h.appendChild(h4)
    }
}
function createPlaylist(){
    let section = document.querySelector('section')
    section.innerHTML = ""
    let a = 
    `
    <div id="pl-title">
    <h1>Create a playlist</h1>
    </div>
        <div id="add-pl">
            <div id="form-pl">
                <input type="text" name="" id="su" placeholder="Playlist title">
                <textarea name="" id="si" cols="30" rows="10" placeholder="Descrption"></textarea>
                <input type="text" name="" id="music_to_add" placeholder="Search music to add">
                <div id="preview-add"></div>
                <button id="save_pl">done</button>
            </div>
        <div id="pl-preview"></div>
    </div>
    `
    section.innerHTML = a
    var musicToAdd = document.getElementById("music_to_add");
        musicToAdd.addEventListener("keydown", function(event) {
        searchTracks(inputBox.value.toLowerCase(), false, musicToAdd.value.toLowerCase());
    });
    var done = document.getElementById('save_pl')
    done.addEventListener("click", function(event) {
    savePl()
    });
}
function showPlaylist(playlist_title){
    let section = document.querySelector('section')
    section.innerHTML = ""
    let description
    let tracks = []
    let k
    for(let i=0; i<playlist.length; i++){
        if(playlist[i].title === playlist_title){
            description = playlist[i].description
            tracks = playlist[i].tracks
            k=i
        }
    }
    let a = 
    `
        <div id="preview-add"></div>
        <div id="pl-title">
            <h1>${playlist_title}</h1>
        </div>
        <div id="add-pl">
            <div id="form-pl">
                <p>${description}</p>
            </div>
            <div id="pl-preview">
            </div>
            <button id="rm">remove</button>
            <button id="rmm">sort</button>
        </div>
        
    `
    
    section.innerHTML = a
    document.getElementById('rmm').addEventListener('click', function(event){
        sortSongs()
    })
    for(let i=0; i<playlist[k].tracks.length; i++){
        let songTitle = playlist[k].tracks[i]
        let coverSrc
        let author
        for(let g =0; g<albums.length; g++){
            for(let j=0; j<albums[g].tracks.length; j++){
                if(songTitle.toLowerCase() === albums[g].tracks[j].toLowerCase()){
                    coverSrc = albums[g].cover
                    author = albums[g].author
                    break
                }
            }
        }
        
        let resultsContainer = document.getElementById('pl-preview')
        let rs = document.createElement('div')
        rs.id = "result"
        rs.classList.add('selezionati') ///////////////////////////////////////////////////////////////////////////////////
        let cover = document.createElement('img')
        cover.src = coverSrc
        cover.style.width = "50px"
        rs.appendChild(cover)
        let rsc = document.createElement('div')
        rsc.id = "lil-result"
        let p = document.createElement('p')
        p.textContent = songTitle
        p.id = "song"
        let p2 = document.createElement('p')
        p2.textContent = author
        rsc.appendChild(p)
        rsc.appendChild(p2)
        rs.appendChild(rsc)
        rs.addEventListener('click', function(event){
            selectSong(this)
        })
        resultsContainer.appendChild(rs)

    }
}
function selectSong(song){
    if(song.style.border != "2px solid rgb(164, 67, 78)")
        song.style.border = "2px solid #a4434e"
    else if(song.style.border == "2px solid rgb(164, 67, 78)")
    {
        song.style.border = "none"
        song.style.borderTop = ".1px solid #4f4f4c"
        song.style.borderBottom = ".1px solid #4f4f4c"
    }
    document.getElementById('rm').addEventListener('click', function(event){
        removeSongs()
    })
    
}
function removeSongs(){
    let pl_title = document.getElementById('pl-title').children[0].textContent
    let a = document.getElementsByClassName('selezionati')
    let o = document.getElementsByClassName('elenco-pl-ul')
    for(let i=0; i<a.length; i++){
        if(a[i].style.border === "2px solid rgb(164, 67, 78)" || a[i].style.border === "2px solid #a4434e" ){
            let title = a[i].children[1].children[0].textContent
            for(let i=0; i<playlist.length; i++){
                if(pl_title == playlist[i].title){
                    let z = i
                    for(let k=0; k<playlist[z].tracks.length; k++){
                        if(title.toLowerCase() ==playlist[z].tracks[k].toLowerCase()){
                            playlist[z].tracks.splice(k,1)
                            showPlaylist(pl_title)
                        }
                    }
                }
            }
        }
    }
}
function sortSongs(){
    let pl_title = document.getElementById('pl-title').children[0].textContent
    let z
    for(let i=0; i<playlist.length; i++){
            if(pl_title == playlist[i].title){
                z = i
                break
            }
    }
    playlist[z].tracks.sort()
    showPlaylist(pl_title)
}
function addToPl(div){
    let coverr = div.children[0].src
    let x = div.children[1]
    let song = x.children[0].textContent
    let author = x.children[1].textContent
    let resultsContainer = document.getElementById('pl-preview')
    let rs = document.createElement('div')
    rs.id = "result"
    let cover = document.createElement('img')
    cover.src = coverr
    cover.style.width = "50px"
    rs.appendChild(cover)
    let rsc = document.createElement('div')
    rsc.id = "lil-result"
    let p = document.createElement('p')
    p.textContent = song
    p.id = "song"
    let p2 = document.createElement('p')
    p2.textContent = author
    rsc.appendChild(p)
    rsc.appendChild(p2)
    rs.appendChild(rsc)
    resultsContainer.appendChild(rs)
    thxPl.push(song)
}