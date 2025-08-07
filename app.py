from flask import Flask, jsonify, render_template, request
import os, json
app = Flask(__name__)

@app.route('/', methods= ['GET','POST'])
def index():
    return render_template('index.html')

@app.route('/reload', methods= ['GET','POST'])
def loadingDataFromBegin():
    data= request.get_json()
    return jsonify(data)

@app.route('/save-project', methods=['GET','POST'])
def savingDataProject():
    data= request.get_json()
    
    # tạo file nếu không có
    file_path= 'static/data/project.json'
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    # nếu file không tồn tại 
    if not os.path.exists(file_path):
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump([], f, indent=2, ensure_ascii=False)
    
    # nếu file tồn tại nhưng sai định dạng json
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            fileDetail= json.load(f)

            if not isinstance(fileDetail, list):
                fileDetail= [fileDetail]

    except (json.JSONDecodeError, ValueError):
        fileDetail= []

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent= 2, ensure_ascii= False)
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
