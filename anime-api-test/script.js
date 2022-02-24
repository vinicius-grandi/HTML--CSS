function test() {
  fetch('https://api.jikan.moe/v4/anime')
    .then((res) => res)
    .then((r) => console.log(r.json()))
}