// add project
const projectData = [];
document.addEventListener('DOMContentLoaded', async ()=> {
    const addButton = document.getElementById('add-project')
    const projectList= document.querySelectorAll('#project-list li')
    
    projectList.forEach(li=>{
        const projectName= li.textContent.trim()
        projectData.push({project: projectName})
    })
    addButton.addEventListener('click', ()=> {
        document.getElementById('popup-form').style.display= 'flex'
    })

    //gửi data về backend
    const res= await fetch('/reload', {
        method: 'POST'
        ,headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
    })
    data= await res.json()
    data.forEach(value => {
        const projectValue= value['projectName']

        if (!projectValue) return 

        // tạo li và text content của li  
        const newProject= document.createElement('li')
        newProject.textContent= projectValue

        // tạo list để hiển thị
        const list= document.getElementById('project-list')
        list.appendChild(newProject)

    })
})

function closePopupProject(){
    document.getElementById('popup-form').style.display = 'none';
    document.getElementById('popup-form-test-case').style.display= 'none'
}

function savePopupProject(){
    const pName= document.querySelector('input[placeholder="Tên dự án"]')
    const name= pName.value.trim()

    if (!name) return 

    // tạo phần tử li mới
    const newProject= document.createElement('li')
    newProject.textContent= name

    // gắn vào danh sách dự án
    const list= document.getElementById('project-list')
    list.appendChild(newProject)


    document.getElementById('project-form').reset()
    closePopupProject()
}

document.getElementById('saveButtonProject').addEventListener('click', async function() {
    const prLi= document.querySelectorAll('#project-list li')
    prLi.forEach(li=> {
        const data= li.textContent.trim()

        const isDuplicate= projectData.some(p=> p.projectName == data)
        if (!isDuplicate){
            projectData.push({projectName: data})
        }
    })
    // gửi data lên backend để lưu trữ
    const res= await fetch('/save-project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(projectData[projectData.length - 1])
    })
})

