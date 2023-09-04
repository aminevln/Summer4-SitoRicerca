var inputBox = document.getElementById("search-box");
inputBox.addEventListener("keydown", function(event) {
        searchTracks(inputBox.value.toLowerCase());
    }
);
function searchTracks(query) {
    if (document.activeElement != inputBox) {
        inputBox.value = ""
    }
    var resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = "";
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
    }
}
setInterval(checkFocus, 100);