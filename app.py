from flask import Flask, jsonify, render_template, request
import os, json
app = Flask(__name__)

@app.route('/', methods= ['GET','POST'])
def index():
    return render_template('index.html')

@app.route('/reload', methods= ['GET','POST'])
def loadingDataFromBegin():
    #1 mở liệu từ project.js

    #1.1. tạo thư mục nếu chưa có --> tạo đến data
    filePath= 'static/data/project.json'
    os.makedirs(os.path.dirname(filePath), exist_ok= True)

    #1.2. tạo file json nếu chưa có hoặc sai định dạng 
    if not os.path.exists(filePath):
        with open(filePath, 'w', encoding='utf-8') as f:
            json.dump([], f, indent=2, ensure_ascii= False)
    else:
        # Kiểm tra nếu có rồi thì phải đúng định dạng
        try: 
            with open(filePath, 'r', encoding='utf-8') as f:
                data= json.load(f)
        except json.JSONDecodeError:
            with open(filePath, 'w', encoding='utf-8') as f:
                json.dump([], f, indent= 2, ensure_ascii= False)
    
    #2. Load dịnh dạng dữ liệu
    with open(filePath, 'r', encoding= 'utf-8') as f:
        data= json.load(f)


    #3. Tạo file test.json
    testPath= 'static/data/test.json'
    os.makedirs(os.path.dirname(filePath), exist_ok= True)

    if not os.path.exists(testPath):
        with open(testPath, 'w', encoding='utf-8') as f:
            json.dump([], f, indent=2, ensure_ascii= False)
    else: 
        try: 
            with open(testPath, 'r', encoding= 'utf-8') as f:
                test_data= json.load(f)
        except json.JSONDecodeError:
            with open(testPath, 'w', encoding='utf-8') as f:
                json.dump([], f, indent= 2, ensure_ascii= False)


    return jsonify(data)

@app.route('/save-project', methods=['GET','POST'])
def savingDataProject():
    filePath= 'static/data/project.json'
    #1. load data từ FE
    res= request.get_json()
    
    #2. lưu data, lưu nối tiếp
    #2.1. Mở file: 
    with open(filePath, 'r', encoding='utf-8') as f:
        data= json.load(f)
    if not isinstance(data, list):
        data= [data]
    if not isinstance(res, list):
        res= [res]
    data.extend(res)
    with open(filePath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii= False)
    return jsonify(data)

@app.route('/add-test-case', methods= ['GET', 'POST'])
def savingDataTestCase():
    testPath= 'static/data/test.json'

    #1. load data từ FE 
    res= request.get_json()
    with open(testPath, 'r', encoding= 'utf-8') as f:
        data= json.load(f)
    if not isinstance(data, list):
        data= [data]
    if not isinstance(res, list):
        res= [res]
    data.extend(res)
    with open(testPath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    with open(testPath, 'r' ,encoding='utf-8') as f:
        return_data= json.load(f)
    return jsonify(return_data)

@app.route('/reload-test-case', methods= ['GET', 'POST'])
def reloadTestCase():
    testPath= 'static/data/test.json'
    with open(testPath, 'r', encoding='utf-8') as f:
        reloadData= json.load(f)
    return jsonify(reloadData)

if __name__ == '__main__':
    app.run(debug=True)
