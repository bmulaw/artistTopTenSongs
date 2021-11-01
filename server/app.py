from flask import Flask
import config, requests

app = Flask(__name__)

@app.route('/test')
def test():
    return {"status": "working"}

@app.route('/<artist>')
def get_samples(artist):
    # topSongs is a map where key is song name and value is songID
    topSongs = get_artist_top_songs(artist)
    url = "https://genius.p.rapidapi.com/songs/"
    headers = {'x-rapidapi-host': config.host, 'x-rapidapi-key': config.api_key}    
    
    map_songs = {}
    for key in topSongs.keys():
        iD = str(topSongs[key])
        song_url = url + iD
        response = requests.request("GET", song_url, headers=headers)
        data = response.json()
        relations = data["response"]["song"]["song_relationships"]
        samples = get_samples(relations)
        map_songs[key] = samples
    return map_songs

def get_artist_top_songs(artist:str):
    # gets the id of the top songs of a given artist
    url = "https://genius.p.rapidapi.com/search"
    querystring = {"q": artist}
    headers = {'x-rapidapi-host': config.host, 'x-rapidapi-key': config.api_key}
    response = requests.request("GET", url, headers=headers, params=querystring)
    data = response.json()

    topSongs = {}
    for i in range(10):
        if (len(data["response"]["hits"])) == 0: 
            break
        songName = data["response"]["hits"][i]["result"]["title"]
        songId = data["response"]["hits"][i]["result"]["id"]
        topSongs[songName] = songId

    return topSongs

def get_samples(samples):
    all_songs = []
    for i in range(3):
        for j in range(len(samples[i]["songs"])):
            title = samples[i]["songs"][j]["full_title"]
            title = ' '.join(title.split())
            all_songs.append(title)
    return all_songs

if __name__ == "__main__":
    app.run(debug=True)