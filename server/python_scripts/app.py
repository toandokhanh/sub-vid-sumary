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
    command = f'python3 recognize_final.py -l {language} -video ../public/video/{video} -noise {noise} -summary {summary} -sentence {sentence}'
    output = subprocess.check_output(command, shell=True, text=True).strip()
    result_list = output.split(', ')
    keys = [
        'sourcePath', 'sumarySourcePath', 'dateTime', 'pathVideo','kb','time','language','pathText', 'aaaaaaa',
        'aaaaaaaaa', 'aaaaaaaaaa', 'sentenceIP', 'wordIP', 'aaaaaaaaaaaaa',
        'sentenceOP', 'wordOP', 'noiseID', 'summaryID', 'aaaaaaaaaaaaaaaaaa', 'processingTime', 'topic',
        'r1R','r1P','r1F','r2R','r2P','r2F','rlR','rlP','rlF'
    ]

    result_dict = dict(zip(keys, result_list))
    return jsonify(result_dict)
if __name__ == '__main__':
    app.run(debug=True)