from flask import Flask, request, jsonify
import subprocess
import json

app = Flask(__name__)

@app.route('/api/createSummarize', methods=['POST']) # POST http://localhost:5000/api/createSummarize
def summarize():
    data = request.get_json()
    video = data.get('video')
    language = data.get('language')
    noise = data.get('noise')
    summary = data.get('summary')
    sentence = data.get('sentence')
    
    # Gọi script Python từ Flask
    command = f'python3 recognize.py -l {language} -video ../public/videos/{video} -noise {noise} -summary {summary} -sentence {sentence}'
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

@app.route('/api/createSubtitle', methods=['POST']) # POST http://localhost:5000/api/createSubtitle
def subtitle():
    data = request.get_json()
    video = data.get('video')
    sourceLanguage = data.get('sourceLanguage')
    targetLanguage = data.get('targetLanguage')
    videoName = data.get('videoName')
    noise = data.get('noise')
    
    # Gọi script Python từ Flask
    command = f'python3 subtitle.py {video} -s {sourceLanguage} -d {targetLanguage} -n {videoName} -noise {noise}'
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
   
    return 0
if __name__ == '__main__':
    app.run(port=6000) 
    app.run(debug=True)