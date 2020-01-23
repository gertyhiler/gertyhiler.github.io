let fun ={
    clear(){
        document.getElementById("text").value = ""
        alert("Грехи отпущены!")
    }
}
document.addEventListener("keypress", doc=()=> event.key == "Enter"?fun.clear(): false)
