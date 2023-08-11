from flask import Flask, request, jsonify
import subprocess
import json

app = Flask(__name__)

@app.route('/api/createSummarize', methods=['POST'])
def summarize():
    data = request.get_json()
    video = data.get('video')
    language = data.get('language')
    noise = data.get('noise')
    summary = data.get('summary')
    sentence = data.get('sentence')

    # Gọi script Python từ Flask
    command = f'python3 recognize_final.py -l {language} -video ../public/videos/{video} -noise {noise} -summary {summary} -sentence {sentence}'
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