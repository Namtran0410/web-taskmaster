// mở lên test case và xem 
document.addEventListener('DOMContentLoaded', ()=> {
    const viewBtn= document.getElementById('testcase-table')
    viewBtn.addEventListener('click', (e)=> {
        const row= e.target.closest('tr')
        const cells= row.querySelectorAll('td');
        // Lấy dữ liệu từng ô 
        const rowData= Array.from(cells).map(cell => cell.innerText.trim())
        console.log(rowData)
    })
})