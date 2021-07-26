let googleUser = null;
let category = null;

window.onload = () => {


  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // this code runs if the user is logged in
      console.log("logged in as", user.displayName);
      googleUser = user;
    }
    else {
      // this code runs if the user is not logged in
      console.log("not logged in");
    }
  })
  document.querySelector("#categoryDropdown").addEventListener("click", (e) => {
    category = e.target.value;
  })

  const createNoteButton = document.querySelector("#createNoteButton");
  createNoteButton.addEventListener("click", () => {
    // get values out of the form
    const noteTitle = document.querySelector("#noteTitle").value;
    const noteText = document.querySelector("#noteText").value;

    // write these values to the database
    firebase.database().ref(`users/${googleUser.uid}`).push({
      title: noteTitle,
      text: noteText,
      category: category,
      timestamp: new Date().getTime(),
    })
      .then(() => {
        console.log("db write successful");
        document.querySelector("#noteTitle").value = "";
        document.querySelector("#noteText").value = "";
      })
      .catch(error => {
        console.log("error writing new note:", error);
      });
  })
}