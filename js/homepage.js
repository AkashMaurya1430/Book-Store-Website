// function openModal() {
//   document.getElementById("bookModalParent").style.display = "block";
// }

// function closeModal() {
//   document.getElementById("bookModalParent").style.display = "none";
// }

function addChapter() {
  var col6 = document.createElement("div");
  col6.className = "col-6 mt-2";
  col6.innerHTML = `<div class="row no-gutters">
    <label for="chapterTitle">Chapter<span></span> Title</label>   
    <input type="text" class="form-control" id="chapterTitle" placeholder="Name Of Chapter"
      name="chapterName" >
    <div class="invalid-feedback">
      Give Chapter Title
    </div>
  </div>
  <div class="row no-gutters mt-2">
    <label for="story">Story</label>
    <textarea name="story" id="story" class="form-control col-12 p-1 pl-2" placeholder="Story" ></textarea>
    <div class="invalid-feedback">
      Type your Story
    </div>
  </div>`;

  document.getElementById("addChapterDiv").appendChild(col6);
  // document.getElementsByTagName("span").innerHTML = i;

}

// console.log(userData);
