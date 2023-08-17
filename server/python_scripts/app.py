from flask import Flask, request, jsonify
import subprocess
import json
import re
app = Flask(__name__)




@app.route('/api/createSubtitle', methods=['POST']) # POST http://localhost:5000/api/createSubtitle
def subtitle():
    data = request.get_json()
    video = data.get('video')
    sourceLanguage = data.get('sourceLanguage')
    targetLanguage = data.get('targetLanguage')
    algorithm = data.get('algorithm')
    
    # Gọi script Python từ Flask
    command = f'python3 subtitle.py  ../public/videos/{video} -s {sourceLanguage} -d {targetLanguage} -noise {algorithm}'
    output = subprocess.check_output(command, shell=True, text=True).strip()
    result_list = output.split(', ')
    keys = ['emty', 'dateTime', 'videoPath', 'kb', 'time', 'sourceLanguage', 'targetLanguage', 'algorithm', 'processingTime', 'wavPath', 'outputWavPath', 'txtPath', 'srtPath', 'outputVideoPath']
    # Tạo danh sách tuples (key, value) bằng cách kết hợp keys và result_list
    # Tạo một từ điển từ hai danh sách
    result_dict = {keys[i]: result_list[i] for i in range(len(keys))}

    # In ra đối tượng kết quả
    print(result_dict)
    return result_dict
@app.route('/api/createSummarize', methods=['POST']) # POST http://localhost:5000/api/createSummarize
def summarize():
    data = request.get_json()
    video = data.get('video')
    language = data.get('language')
    noise = data.get('noise')
    summary = data.get('summary')
    sentence = data.get('sentence')
    
    # Gọi script Python từ Flask
    command = f'python3 summary.py -l {language} -video ../public/videos/{video} -noise {noise} -summary {summary} -sentence {sentence}'
    output = subprocess.check_output(command, shell=True, text=True).strip()
    result_list = output.split(', ')
    keys = [
        'sourcePath', 'sumarySourcePath', 'dateTime', 'pathVideo','kb','time','language','pathText', 'aaaa',
        'a', 'aa', 'sentenceIP', 'wordIP', 'aaa',
        'sentenceOP', 'wordOP', 'noiseID', 'summaryID', 'aaa', 'processingTime', 'topic',
        'r1R','r1P','r1F','r2R','r2P','r2F','rlR','rlP','rlF'
    ]

    result_dict = dict(zip(keys, result_list))
    return jsonify(result_dict)

        
if __name__ == '__main__':
    app.run(port=6000) 
    app.run(debug=True)