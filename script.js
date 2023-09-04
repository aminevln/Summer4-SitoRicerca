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
    document.getElementById('music-to-add').value = ""
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
}

function searchTracks(query, flag, queryF) {
    if(flag)
    {
        var resultsContainer = document.getElementById("search-results");
        resultsContainer.innerHTML = "";
        resultsContainer.style.backgroundColor = "#242425"
        for (var i = 0; i < albums.length; i++) {
            var track1 = albums[i].author.toLowerCase();
            if(track1.includes(query)){
                for(var j = 0; j < albums[i].tracks.length; j++){
                    var track = albums[i].tracks[j].toLowerCase();
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
                    
                }
            }
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

                    
                }
                
    
            }
        }

    }
}
    


function start(){
    var inputBox = document.getElementById("search-box");
    inputBox.value = ""
}
function checkFocus() {
    var inputBox = document.getElementById("search-box");
    if (document.activeElement === inputBox) {
        
    } else {
        var resultsContainer = document.getElementById("search-results");
        resultsContainer.innerHTML = "";
        resultsContainer.style.backgroundColor = "transparent"
    }
    if (document.activeElement === musicToAdd) {
        
    } else {
        var resultsContainer = document.getElementById("preview-add");
        resultsContainer.innerHTML = "";
        resultsContainer.style.backgroundColor = "transparent"
    }
}
setInterval(checkFocus, 3000);
setInterval(checkLibrary, 100);
function checkLibrary(){
    let h = document.getElementById('playlists')
    h.innerHTML=""
    for(let i=0; i<playlist.length; i++){
        let h4 = document.createElement('h4')
        h4.id = "name_pl"
        h4.textContent = playlist[i].title
        h.appendChild(h4)
    }
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