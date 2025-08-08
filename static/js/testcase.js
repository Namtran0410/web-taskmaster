let currentProject= null
document.addEventListener('DOMContentLoaded', ()=> {
    const projectList= document.getElementById('project-list')
    projectList.addEventListener('click', (e)=> {
        if (e.target.tagName=== 'LI') {
            projectList.querySelectorAll('li').forEach(item=> {
                item.classList.remove('active')
            })

            // Gán class active cho cái được chọn 
            e.target.classList.add('active')

            // lưu lại tên project được chọn 
            currentProject= e.target.textContent.trim()
        }
    })

    document.getElementById('add-testcase').addEventListener('click', ()=>{
        if (!currentProject) {
            alert("Vui lòng chọn dự án cần tạo test case")
            return
        } 
        document.getElementById('popup-form-test-case').style.display= 'flex'
        
    })
})

// Thêm tên test case
// các data cần lấy trong bảng 
// mã test case- tên test case - mô tả

document.getElementById('save-button-test-case').addEventListener('click', async (e)=> {
    e.preventDefault();  // <-- Ngăn submit mặc định
    const testId= document.getElementById('test-case-id-field').value
    const testName= document.getElementById('test-case-name-field').value
    const status= document.getElementById('status-selector').value
    const createdDate= document.getElementById('start-date').value
    const res= await fetch('/add-test-case', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify([{
            'project-name': currentProject,
            'test-id': testId,
            'test-name': testName,
            'status': status,
            'create-date': createdDate
        }])
    })
    if (res.ok) {
        const result = await res.json()
        console.log('✅ Test case saved:', result)
        // Optional: thông báo lưu thành công
    } else {
        console.error('❌ Failed to save test case', res.status)
    }

    closePopupProject()
})

// set appear in dashboard
document.addEventListener('DOMContentLoaded', async ()=> {
    const res= await fetch('/reload-test-case', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([])
    })
    const data= await res.json()

    // click vào dự án, lấy chữ của dự án 
    const projectList= document.getElementById('project-list')
    projectList.addEventListener('click', (e)=> {
        if (e.target.tagName === 'LI') {
            currentProject = e.target.textContent.trim()
                // Lấy các thông tin ở data 
            const tableData= document.getElementById('testcase-table')
            tableData.innerHTML = ''
        // lọc trong test.json, nếu là project-name === currentProject thì lấy cái item đó ra
            data.forEach(item => {
                if (item['project-name'] == currentProject) {
                    const row= document.createElement('tr')
                    row.innerHTML = `
                    <td>${item['test-id']}</td>
                    <td>${item['test-name']}</td>
                    <td>${item['status']}</td>
                    <td>${item['create-date'] || ''}</td>
                    <td>${item['end-date'] || ''}</td>
                    <td>
                    <button onclick="viewTestCase('TC001')" title="Xem">👁️</button>
                    <button onclick="editTestCase('TC001')" title="Sửa">✏️</button>
                    <button onclick="deleteTestCase('TC001')" title="Xoá">🗑️</button>
                    </td>
                    `
                    tableData.appendChild(row)
                }
            })
        }
    })


})